# Email Verification Flow & User Context Design

## Industry Standard Analysis

### Current Flow Issues

1. Backend API directly returns JSON response after verification
2. No redirect to dashboard with success message
3. Language preference hardcoded in redirect URLs
4. No user context persistence across verification

### Industry Best Practices

#### Email Verification Flow Options

**Option 1: Auto-Login After Verification (High Trust)**

- User clicks verification link → Backend verifies → Creates session → Redirects to dashboard
- Examples: Slack, Discord, GitHub
- Pros: Better UX, one less step
- Cons: Security concern if email compromised

**Option 2: Manual Login Required (High Security)**

- User clicks verification link → Backend verifies → Redirects to login with success message
- Examples: Banking apps, AWS, Google Workspace
- Pros: More secure, explicit authentication
- Cons: Extra step for user

**Recommendation**: Option 2 for business dashboard (higher security requirements)

## Proposed Implementation

### 1. User Context System (Based on Actual Database Schema)

After analyzing the User table and related models, here are the actual fields available:

#### Core User Fields (from `users` table)

- `id`: UUID
- `email`: string (unique)
- `emailVerified`: boolean
- `firstName`: string
- `lastName`: string
- `phoneNumber`: string (optional)
- `phoneVerified`: boolean
- `avatarUrl`: string (optional)
- `role`: UserRole (customer | business | admin)
- `status`: UserStatus (active | inactive | suspended)
- `lastLoginAt`: DateTime
- `dateOfBirth`: Date (optional)
- `stripeUserId`: string (optional)
- `preferredLanguage`: string (2-char ISO 639-1, optional)
- `primaryBusinessId`: UUID (optional, for business users)
- `settings`: JSON (flexible user preferences)

#### Related Context Models

**UserLanguagePreference** (separate i18n table):

- `userId`: UUID
- `languageCode`: string (references Language table)

**UserDevice** (for device tracking):

- `deviceId`: string (fingerprint)
- `deviceName`: string
- `deviceType`: DeviceType
- `browserInfo`: JSON
- `lastIpAddress`: string
- `lastLocation`: JSON {lat, lng, city, country}
- `isTrusted`: boolean
- `fcmToken`: string (for push notifications)

**Business Context** (for business users):

- `businesses[]`: Array of owned businesses
- `primaryBusiness`: Main business reference
- `businessRegistration`: Registration status

```typescript
// UserContext with only existing DB fields
import { UserRole, UserStatus } from '@pika/types'

interface UserContext {
  // Core fields from User table (all these exist)
  id: string
  email: string
  emailVerified: boolean
  firstName: string
  lastName: string
  phoneNumber?: string
  phoneVerified: boolean
  avatarUrl?: string
  role: UserRole
  status: UserStatus
  lastLoginAt?: Date
  createdAt: Date

  // Language preference (exists in User table)
  preferredLanguage?: string // ISO 639-1 code from User.preferredLanguage field

  // Business context (exists in User table)
  primaryBusinessId?: string // User.primaryBusinessId field

  // Settings JSON field (exists but structure is flexible)
  settings?: any // User.settings JSON field - structure TBD
}
```

#### Important Discoveries:

1. **Two Language Systems**:
   - `User.preferredLanguage`: Simple 2-char field in user table
   - `UserLanguagePreference`: Separate i18n relation with full language data
2. **Settings JSON Field**:
   - Flexible storage for UI preferences
   - Can store any preference without schema changes
3. **Business Context**:
   - `primaryBusinessId` for default business
   - Can own multiple businesses
   - Need to track "active" business in session/settings

4. **Device Tracking**:
   - Comprehensive device management system
   - Can track trusted devices
   - Location and browser info available

5. **Security Features**:
   - MFA settings available
   - Device trust management
   - Security event logging

### 2. Email Verification Flow

#### Backend Changes

```typescript
// AuthController.ts
async verifyEmail(
  request: Request<VerifyEmailRequest>,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { token } = request.params

    // 1. Verify the token
    const result = await this.authService.verifyEmail(token)

    if (!result.success || !result.userId) {
      // Redirect with error
      const errorUrl = new URL(`${FRONTEND_URL}/login`)
      errorUrl.searchParams.set('error', 'invalid_verification_token')
      return response.redirect(302, errorUrl.toString())
    }

    // 2. Get user to determine language preference
    const user = await this.userService.findById(result.userId)
    const language = user?.preferredLanguage || 'en'

    // 3. Build redirect URL with language and success params
    const successUrl = new URL(`${FRONTEND_URL}/${language}/login`)
    successUrl.searchParams.set('verified', 'true')
    successUrl.searchParams.set('email', user?.email || '')

    // 4. Log the verification event
    logger.info('Email verification successful', {
      userId: result.userId,
      email: user?.email,
      redirectUrl: successUrl.toString()
    })

    // 5. Redirect to dashboard login
    response.redirect(302, successUrl.toString())

  } catch (error) {
    logger.error('Email verification failed', error)

    // Generic error redirect
    const errorUrl = new URL(`${FRONTEND_URL}/en/login`)
    errorUrl.searchParams.set('error', 'verification_failed')
    response.redirect(302, errorUrl.toString())
  }
}
```

#### Dashboard Changes

```typescript
// loginForm.tsx
export function LoginForm() {
  const searchParams = useSearchParams()
  const [showMessage, setShowMessage] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  useEffect(() => {
    // Check for verification success
    if (searchParams.get('verified') === 'true') {
      const email = searchParams.get('email')
      setShowMessage({
        type: 'success',
        message: t('emailVerified', { email })
      })
      // Prefill email field
      if (email) {
        form.setValue('email', email)
      }
    }

    // Check for errors
    const error = searchParams.get('error')
    if (error) {
      setShowMessage({
        type: 'error',
        message: t(`errors.${error}`, t('errors.generic'))
      })
    }

    // Clean URL after processing
    const url = new URL(window.location.href)
    url.searchParams.delete('verified')
    url.searchParams.delete('email')
    url.searchParams.delete('error')
    window.history.replaceState({}, '', url)
  }, [searchParams])

  return (
    <>
      {showMessage && (
        <Alert
          type={showMessage.type}
          message={showMessage.message}
          closable
          onClose={() => setShowMessage(null)}
        />
      )}
      {/* Rest of login form */}
    </>
  )
}
```

### 3. User Context Loading

#### Backend - User Service Enhancement

```typescript
// UserService.ts
async getUserWithContext(userId: string): Promise<UserWithContext> {
  const user = await this.repository.findById(userId)

  if (!user) {
    throw ErrorFactory.notFound('User')
  }

  // Build context from existing fields
  const context: UserContext = {
    id: user.id,
    email: user.email,
    emailVerified: user.emailVerified,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    phoneVerified: user.phoneVerified,
    avatarUrl: user.avatarUrl,
    role: user.role,
    status: user.status,
    lastLoginAt: user.lastLoginAt,
    createdAt: user.createdAt,
    preferredLanguage: user.preferredLanguage,
    primaryBusinessId: user.primaryBusinessId,
    settings: user.settings // Pass through as-is for now
  }

  return {
    ...user,
    context
  }
}
```

#### Dashboard - Context Provider

```typescript
// UserContextProvider.tsx
export const UserContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [userContext, setUserContext] = useState<UserContext | null>(null)

  useEffect(() => {
    // Load user context on auth
    const loadUserContext = async () => {
      const token = getAuthToken()
      if (!token) return

      const response = await fetch('/api/v1/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.ok) {
        const data = await response.json()
        setUserContext(data.context)

        // Apply preferences
        applyUserPreferences(data.context)
      }
    }

    loadUserContext()
  }, [])

  const applyUserPreferences = (context: UserContext) => {
    // Set language
    if (context.preferredLanguage) {
      setLocale(context.preferredLanguage)
    }

    // Set theme
    if (context.theme) {
      document.documentElement.setAttribute('data-theme', context.theme)
    }

    // Set other preferences...
  }

  return (
    <UserContext.Provider value={{ userContext, setUserContext }}>
      {children}
    </UserContext.Provider>
  )
}
```

### 4. Language Detection Strategy

Priority order for language detection:

1. User's `preferredLanguage` from database (if logged in)
2. URL path segment (e.g., `/es/login`)
3. Browser's Accept-Language header
4. Default to 'en'

```typescript
// Backend language detection
function detectUserLanguage(
  user?: User,
  request?: Request,
  urlLanguage?: string
): string {
  // 1. User preference (highest priority)
  if (user?.preferredLanguage) {
    return user.preferredLanguage
  }

  // 2. URL language
  if (urlLanguage && SUPPORTED_LANGUAGES.includes(urlLanguage)) {
    return urlLanguage
  }

  // 3. Browser preference
  if (request) {
    const acceptLanguage = request.headers['accept-language']
    const browserLang = acceptLanguage?.split(',')[0]?.split('-')[0]
    if (browserLang && SUPPORTED_LANGUAGES.includes(browserLang)) {
      return browserLang
    }
  }

  // 4. Default
  return DEFAULT_LANGUAGE
}
```

## Implementation Steps

### Phase 1: Backend Email Verification

1. ✅ User model already has `preferredLanguage` and `settings` fields
2. Modify `AuthController.verifyEmail` to redirect instead of JSON response
3. Add user lookup to get language preference
4. Build proper redirect URL with parameters

### Phase 2: Dashboard Verification Handling

1. Update login page to handle URL parameters
2. Show success/error messages based on parameters
3. Prefill email field when provided
4. Clean URL after processing parameters

### Phase 3: User Context System

1. Create UserContext interface
2. Enhance UserService to build context
3. Add `/auth/me` endpoint to return user with context
4. Create UserContextProvider in dashboard

### Phase 4: Language Persistence

1. Save language preference on registration
2. Update language preference in user settings
3. Apply language on login/session restore
4. Sync language across all user sessions

## Security Considerations

1. **Token Validation**: Ensure verification tokens expire (24 hours)
2. **Rate Limiting**: Limit verification attempts per token
3. **URL Parameters**: Sanitize and validate all URL parameters
4. **Session Management**: Don't auto-login on verification
5. **Audit Logging**: Log all verification attempts

## Migration Strategy

1. Deploy backend changes first (backward compatible)
2. Update dashboard to handle new parameters
3. Update email templates with new verification URLs
4. Monitor logs for any issues
5. Clean up old code after stable

## Testing Requirements

1. Test verification with valid/invalid tokens
2. Test language detection priority
3. Test redirect URLs with various languages
4. Test error handling and messages
5. Test user context loading
6. Test preference persistence
