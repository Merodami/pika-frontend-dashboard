# User Context Architecture - Deep Analysis & Implementation

## Current State Analysis

### 1. Authentication Flow

- **JWT Tokens**: System uses JWT with access/refresh token pattern
- **Token Payload**: Contains `userId`, `email`, `role`, `status`, `type`, `hasActiveBusinesses`
- **Middleware**: `authMiddleware` extracts user from JWT and attaches to `req.user`
- **Permissions**: Role-based permissions mapped via `mapRoleToPermissions()`

### 2. Current User Context in Backend

```typescript
// From authMiddleware - what's currently set on req.user
interface CurrentRequestUser {
  id: string // from payload.userId
  email: string // from payload.email
  role: UserRole // from payload.role
  type: string // role.toUpperCase()
  permissions: string[] // from mapRoleToPermissions
  sessionId?: string // undefined (not implemented)
  issuedAt?: Date // from payload.iat
  expiresAt?: Date // from payload.exp
  hasActiveBusinesses?: boolean // business users only
}
```

### 3. Data Sources

- **JWT Claims**: Minimal data (id, email, role, status)
- **Database**: Full user record with all fields
- **Cache**: Redis caching via `@Cache` decorator on UserService methods
- **No Session Store**: Currently no session management beyond JWT

### 4. Frontend State

- **No AuthContext**: Dashboard has no auth context provider
- **Zustand Store**: Basic app state (theme, locale, sidebar)
- **Token Storage**: Likely in cookies (server actions pattern)
- **No User Data**: Frontend doesn't store user profile data

## Industry Best Practices Analysis

### Leading Patterns (Based on AWS Cognito, Auth0, Firebase Auth)

1. **Three-Tier Context Strategy**:
   - **Identity Context** (from JWT): Minimal, immutable during session
   - **Profile Context** (from DB): Extended user data, cached
   - **Session Context** (runtime): Device info, preferences, active selections

2. **Context Loading Strategies**:
   - **Lazy Loading**: Load extended data only when needed
   - **Eager Loading**: Load common data on auth, cache aggressively
   - **Hybrid**: Core data eager, extended data lazy

3. **Context Propagation**:
   - **Backend**: Thread-local storage or request context
   - **Frontend**: React Context + State Management
   - **Cross-Service**: Headers or service mesh

## Recommended Architecture

### 1. UserContext Definition

```typescript
// packages/types/src/userContext.ts
import { UserRole, UserStatus } from './enum'

/**
 * Core identity from JWT - Available immediately after auth
 * Immutable during session lifetime
 */
export interface UserIdentity {
  userId: string
  email: string
  role: UserRole
  permissions: string[]
}

/**
 * User profile from database - Loaded on demand
 * Can be updated during session
 */
export interface UserProfile {
  firstName: string
  lastName: string
  phoneNumber?: string
  phoneVerified: boolean
  avatarUrl?: string
  status: UserStatus
  emailVerified: boolean
  lastLoginAt?: Date
  createdAt: Date
  dateOfBirth?: Date
  stripeUserId?: string
}

/**
 * User preferences - From settings JSON field
 * Frequently accessed, heavily cached
 */
export interface UserPreferences {
  language: string // ISO 639-1
  timezone?: string // IANA timezone
  theme?: 'light' | 'dark' | 'system'
  currency?: string // ISO 4217
  dateFormat?: string
  notifications?: {
    email: boolean
    push: boolean
    sms: boolean
  }
}

/**
 * Business context - For business users only
 * Loaded when role === 'business'
 */
export interface BusinessContext {
  primaryBusinessId?: string
  activeBusinessId?: string // Currently selected
  businesses?: Array<{
    id: string
    name: string
    verified: boolean
    approved: boolean
  }>
}

/**
 * Session context - Runtime state
 * Not persisted, rebuilt each session
 */
export interface SessionContext {
  sessionId: string
  deviceId?: string
  deviceType?: 'web' | 'mobile' | 'desktop'
  ipAddress?: string
  userAgent?: string
  loginAt: Date
  expiresAt: Date
}

/**
 * Complete UserContext - Composed of all contexts
 */
export interface UserContext {
  identity: UserIdentity // Always present (from JWT)
  profile?: UserProfile // Loaded on demand
  preferences?: UserPreferences // Loaded on demand, cached
  business?: BusinessContext // Only for business users
  session: SessionContext // Runtime info
}
```

### 2. Context Loading Strategy

```typescript
// packages/http/src/infrastructure/express/middleware/userContext.ts

/**
 * Enhanced middleware that builds complete UserContext
 * Uses hybrid loading strategy
 */
export function userContextMiddleware(
  userService: IUserService,
  cacheService: ICacheService
): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Skip if no authenticated user
      if (!req.user) {
        return next()
      }

      // 1. Identity context already set by authMiddleware
      const identity: UserIdentity = {
        userId: req.user.id,
        email: req.user.email,
        role: req.user.role,
        permissions: req.user.permissions,
      }

      // 2. Session context from request
      const session: SessionContext = {
        sessionId: req.headers['x-session-id'] || generateSessionId(),
        deviceId: req.headers['x-device-id'],
        deviceType: detectDeviceType(req.headers['user-agent']),
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
        loginAt: req.user.issuedAt,
        expiresAt: req.user.expiresAt,
      }

      // 3. Build initial context
      const context: UserContext = {
        identity,
        session,
      }

      // 4. Load preferences (always needed for language/theme)
      const preferencesKey = `user:preferences:${identity.userId}`
      let preferences = await cacheService.get<UserPreferences>(preferencesKey)

      if (!preferences) {
        const user = await userService.getUserById(identity.userId)
        preferences = extractPreferences(user)
        await cacheService.set(preferencesKey, preferences, 3600) // 1 hour
      }
      context.preferences = preferences

      // 5. Load business context if business user
      if (identity.role === UserRole.BUSINESS) {
        const businessKey = `user:business:${identity.userId}`
        let business = await cacheService.get<BusinessContext>(businessKey)

        if (!business) {
          business = await userService.getBusinessContext(identity.userId)
          await cacheService.set(businessKey, business, 300) // 5 minutes
        }
        context.business = business
      }

      // 6. Attach to request
      req.context = context

      // 7. Set context headers for downstream services
      res.setHeader('X-User-Id', identity.userId)
      res.setHeader('X-User-Role', identity.role)
      res.setHeader('X-User-Language', preferences?.language || 'en')
      if (context.business?.activeBusinessId) {
        res.setHeader('X-Business-Id', context.business.activeBusinessId)
      }

      next()
    } catch (error) {
      // Context loading failure shouldn't break request
      logger.error('Failed to load user context', error)
      next()
    }
  }
}
```

### 3. Backend Context Access Pattern

```typescript
// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: RequestUser // JWT claims (existing)
      context?: UserContext // Full context (new)
    }
  }
}

// In controllers
export class SomeController {
  async someMethod(req: Request, res: Response) {
    // Always available after auth
    const userId = req.context?.identity.userId
    const role = req.context?.identity.role

    // May be loaded
    const language = req.context?.preferences?.language || 'en'
    const businessId = req.context?.business?.activeBusinessId

    // Load profile on demand if needed
    if (!req.context?.profile) {
      req.context.profile = await this.userService.getUserProfile(userId)
    }
  }
}
```

### 4. Frontend Context Provider

```typescript
// pika-frontend-dashboard/contexts/UserContext.tsx
import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface UserContextValue {
  user: UserContext | null
  loading: boolean
  error: Error | null
  refreshProfile: () => Promise<void>
  updatePreferences: (prefs: Partial<UserPreferences>) => Promise<void>
  switchBusiness: (businessId: string) => Promise<void>
}

const UserContext = createContext<UserContextValue | null>(null)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserContext | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const router = useRouter()

  // Load initial context
  useEffect(() => {
    loadUserContext()
  }, [])

  const loadUserContext = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/auth/me')

      if (!response.ok) {
        throw new Error('Failed to load user context')
      }

      const data = await response.json()
      setUser(data)

      // Apply preferences
      applyUserPreferences(data.preferences)
    } catch (err) {
      setError(err as Error)
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  const applyUserPreferences = (prefs?: UserPreferences) => {
    if (!prefs) return

    // Apply language
    if (prefs.language) {
      document.documentElement.lang = prefs.language
    }

    // Apply theme
    if (prefs.theme) {
      document.documentElement.setAttribute('data-theme', prefs.theme)
    }
  }

  const refreshProfile = async () => {
    // Refresh just the profile portion
    const response = await fetch('/api/auth/profile')
    const profile = await response.json()
    setUser(prev => prev ? { ...prev, profile } : null)
  }

  const updatePreferences = async (prefs: Partial<UserPreferences>) => {
    const response = await fetch('/api/auth/preferences', {
      method: 'PATCH',
      body: JSON.stringify(prefs)
    })

    if (response.ok) {
      const updated = await response.json()
      setUser(prev => prev ? { ...prev, preferences: updated } : null)
      applyUserPreferences(updated)
    }
  }

  const switchBusiness = async (businessId: string) => {
    // Update active business
    await updatePreferences({ activeBusinessId: businessId })
    // Refresh context to get new business data
    await loadUserContext()
  }

  return (
    <UserContext.Provider value={{
      user,
      loading,
      error,
      refreshProfile,
      updatePreferences,
      switchBusiness
    }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within UserProvider')
  }
  return context
}
```

### 5. API Endpoint for Context

```typescript
// Backend: /auth/me endpoint
export class AuthController {
  async getCurrentUser(req: Request, res: Response) {
    // Return the full context built by middleware
    if (!req.context) {
      throw new NotAuthenticatedError('No user context')
    }

    // Ensure profile is loaded for /me endpoint
    if (!req.context.profile) {
      const profile = await this.userService.getUserProfile(
        req.context.identity.userId
      )
      req.context.profile = profile
    }

    res.json(req.context)
  }
}
```

## Implementation Plan

### Phase 1: Backend Foundation (Week 1)

1. Create UserContext types in @pika/types
2. Implement userContextMiddleware
3. Add context caching strategy
4. Update authMiddleware to work with context

### Phase 2: Service Integration (Week 1)

1. Update UserService with context methods
2. Add /auth/me endpoint
3. Add /auth/preferences endpoint
4. Update existing controllers to use context

### Phase 3: Frontend Integration (Week 2)

1. Create UserContext provider
2. Add useUser hook
3. Update components to use context
4. Implement preference application

### Phase 4: Business Context (Week 2)

1. Add business switching logic
2. Update business-related components
3. Add business context to headers
4. Test multi-business scenarios

## Performance Considerations

1. **Caching Strategy**:
   - Identity: No cache (from JWT)
   - Profile: 1 hour cache
   - Preferences: 1 hour cache
   - Business: 5 minute cache
   - Session: No cache (runtime)

2. **Lazy Loading**:
   - Load only what's needed
   - Use field projection in queries
   - Cache aggressively

3. **Context Size**:
   - Keep JWT minimal
   - Don't duplicate data
   - Use references where possible

## Security Considerations

1. **Token Security**:
   - Never store sensitive data in JWT
   - Validate all context data
   - Refresh context on permission changes

2. **Cache Security**:
   - Use user-specific cache keys
   - Clear cache on logout
   - Set appropriate TTLs

3. **Cross-Service Security**:
   - Sign context headers
   - Validate service-to-service calls
   - Don't trust client-provided context

## Migration Strategy

1. **Backward Compatibility**:
   - Keep req.user for compatibility
   - Add req.context as new field
   - Gradually migrate to context

2. **Rollout Plan**:
   - Deploy backend changes first
   - Update services incrementally
   - Frontend can adopt when ready

3. **Testing**:
   - Unit tests for context building
   - Integration tests for flow
   - Performance tests for caching
