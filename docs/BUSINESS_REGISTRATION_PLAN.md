# Business Owner Registration Flow - Implementation Plan

## 📋 Overview

Business owners follow this complete journey:

1. **Public Registration** → User registers with email/password (role: BUSINESS)
2. **Email Confirmation** → User confirms email via link
3. **First Login** → User logs in and sees **Business Selector** interface
4. **Business Selector** → Shows existing businesses or create new (users can have multiple businesses)
5. **Business Registration** → 3-step mandatory process for new business
6. **Dashboard Access** → Only after registration is approved

### 🆕 Multiple Business Support

**NEW REQUIREMENT**: Users can own multiple businesses in our system. The Business Selector interface:

- Shows a grid of business cards
- Displays existing businesses for selection
- Shows a "Create New Business" card with a plus icon
- Has empty/invisible placeholder cards for future businesses
- This interface is reused for:
  - First-time users (forced to create first business)
  - Returning users (select existing or create new)
  - Adding additional businesses later

## 🔄 Current System Analysis

### Backend Flow

- **Registration Status API**: `/businesses/registration/status`
  - Returns `needsRegistration: true` and `canAccessDashboard: false` for new business users
  - Registration has 3 steps that must be completed sequentially
  - Status moves from `IN_PROGRESS` → `SUBMITTED` → `APPROVED`

### Key Schemas Available

```typescript
// Step 1: Business Basics
BusinessRegistrationStep1Request {
  businessName: string
  businessType: BusinessType (enum)
  categoryId: UUID
  primaryLanguage: string
}

// Step 2: Contact & Location
BusinessRegistrationStep2Request {
  description: string
  address: { street, city, state, postalCode, country }
  phone: string
  website?: string
  email?: string
}

// Step 3: Additional Info
BusinessRegistrationStep3Request {
  operatingHours?: Record<string, any>
  socialMedia?: Record<string, string>
  additionalInfo?: Record<string, any>
}
```

## 🎯 Implementation Strategy

### 1. **Middleware Enhancement**

Add business registration check after authentication:

```typescript
// middleware.ts additions
- Check if user role is BUSINESS
- Call registration status API
- If needsRegistration: true → redirect to /business-registration
- Block all dashboard routes until registration complete
```

### 2. **Folder Structure**

```
app/[locale]/
├── (business-registration)/           # Separate layout group
│   ├── layout.tsx                    # Minimal layout (no sidebar)
│   ├── business-selector/            # Business selection interface
│   │   ├── page.tsx                  # Grid of businesses + create new
│   │   └── components/
│   │       ├── BusinessCard.tsx      # Individual business card
│   │       ├── CreateBusinessCard.tsx # Card with plus icon
│   │       └── EmptySlot.tsx         # Invisible placeholder
│   └── business-registration/
│       ├── page.tsx                  # Main registration container
│       ├── components/
│       │   ├── RegistrationWizard.tsx
│       │   ├── StepIndicator.tsx
│       │   ├── ProgressBar.tsx
│       │   └── steps/
│       │       ├── BusinessInfoStep.tsx
│       │       ├── ContactDetailsStep.tsx
│       │       ├── AdditionalInfoStep.tsx
│       │       └── ReviewStep.tsx
│       ├── hooks/
│       │   ├── useRegistrationStatus.ts
│       │   ├── useStepValidation.ts
│       │   ├── useRegistrationSubmit.ts
│       │   └── useUserBusinesses.ts    # Fetch user's businesses
│       └── store/
│           └── registrationStore.ts
```

### 3. **State Management (Zustand)**

```typescript
interface RegistrationStore {
  // Current state
  currentStep: number
  registrationId: string | null
  status: 'idle' | 'loading' | 'error' | 'success'

  // Form data
  step1Data: BusinessRegistrationStep1Request | null
  step2Data: BusinessRegistrationStep2Request | null
  step3Data: BusinessRegistrationStep3Request | null

  // Actions
  setStep: (step: number) => void
  saveStepData: (step: number, data: any) => void
  submitStep: (step: number) => Promise<void>
  completeRegistration: () => Promise<void>

  // Navigation
  canProceed: (step: number) => boolean
  goToNextStep: () => void
  goToPreviousStep: () => void
}
```

### 4. **Component Architecture**

#### BusinessSelector (NEW)

- **BusinessCard.tsx**: Shows existing business with name, status, last activity
- **CreateBusinessCard.tsx**: Plus icon card for creating new business
- **EmptySlot.tsx**: Invisible placeholder cards to maintain grid layout
- Grid layout: 3-4 cards per row on desktop, 2 on tablet, 1 on mobile
- First-time users: Only see create card + empty slots
- Returning users: See their businesses + create option

#### RegistrationWizard.tsx

- Main container managing the multi-step flow
- Handles API calls and error states
- Prevents navigation away until complete

#### StepIndicator.tsx

- Visual progress indicator
- Shows completed, current, and upcoming steps
- Non-clickable (sequential only)

#### Individual Step Components

- Use React Hook Form with Zod validation
- Direct use of API schemas from `@merodami/pika-api`
- Auto-save on step completion
- Clear error messaging

### 5. **API Integration**

```typescript
// API calls needed
GET / businesses / my // Get user's businesses (NEW)
GET / businesses / registration / status // Check if needs registration
POST / businesses / registration / start // Start registration process
GET / businesses / registration / progress // Get saved data
POST / businesses / registration / step / 1 // Submit step 1
POST / businesses / registration / step / 2 // Submit step 2
POST / businesses / registration / step / 3 // Submit step 3
POST / businesses / registration / complete // Final submission
```

### 6. **UX Features**

#### Forced Registration Screen

- **Cannot skip**: No close button, no navigation away
- **Clear messaging**: "Complete your business registration to access the dashboard"
- **Progress saving**: Auto-save on each step
- **Session persistence**: Can logout and resume later
- **Error recovery**: Retry failed submissions

#### Visual Design

- Clean, focused interface (no distractions)
- Mobile-responsive stepper
- Clear validation messages
- Loading states for API calls
- Success celebration on completion

### 7. **Security & Validation**

- **Frontend validation**: Using Zod schemas from API package
- **Backend validation**: Server validates all data
- **Session management**: Registration tied to authenticated user
- **Rate limiting**: Prevent spam submissions
- **Data persistence**: Save progress in backend

### 8. **Edge Cases**

1. **Partial completion**: User can logout and resume
2. **Network errors**: Retry mechanisms with exponential backoff
3. **Validation errors**: Clear field-level error messages
4. **Browser back button**: Warn about losing unsaved changes
5. **Session expiry**: Redirect to login, then back to registration

## 🚀 Implementation Steps

1. **Create registration status hook**
2. **Update middleware with registration check**
3. **Build Zustand store for state management**
4. **Create layout and page structure**
5. **Create Business Selector interface** (NEW)
   - Build BusinessCard component
   - Build CreateBusinessCard with plus icon
   - Build EmptySlot component
   - Implement grid layout
   - Add useUserBusinesses hook
6. **Implement StepIndicator component**
7. **Build Step 1: Business Info form**
8. **Build Step 2: Contact Details form**
9. **Build Step 3: Additional Info form**
10. **Add Review step with summary**
11. **Implement API integration**
12. **Add error handling and retry logic**
13. **Test complete flow with multiple businesses**
14. **Add analytics tracking**

## 📊 Success Metrics

- Registration completion rate > 90%
- Average time to complete < 5 minutes
- Error rate < 2%
- User satisfaction score > 4.5/5

## 🎨 UI/UX Best Practices

1. **Progressive disclosure**: Only show relevant fields
2. **Inline validation**: Validate as user types
3. **Smart defaults**: Pre-fill where possible
4. **Mobile-first**: Optimize for mobile devices
5. **Accessibility**: WCAG 2.1 AA compliance
6. **Internationalization**: Support multiple languages

## 🔧 Technical Stack

- **Framework**: Next.js 15 with App Router
- **State**: Zustand for registration state
- **Forms**: React Hook Form + Zod
- **UI**: Ant Design + Tailwind CSS
- **API**: REST with type-safe client
- **Validation**: Zod schemas from @merodami/pika-api
