# Business Registration Flow - Test Plan

## Overview

This document outlines the complete testing strategy for the business registration flow implementation, covering both frontend and backend components.

## Test Scenarios

### 1. Authentication & Cookie Management

#### 1.1 Business User Login

**Test**: Verify business user login sets appropriate cookies

- **Steps**:
  1. Register a business user account
  2. Login via `/auth/token` endpoint
  3. Check response includes auth cookies
  4. Verify `user-role=business` cookie is set
  5. Verify `needs-business-registration=true` cookie is set initially

**Expected Result**: Auth cookies properly set, business user identified

#### 1.2 Non-Business User Login

**Test**: Verify customer/admin users don't get business registration cookies

- **Steps**:
  1. Register a customer user account
  2. Login via `/auth/token` endpoint
  3. Check cookies don't include business registration flags

**Expected Result**: Only basic auth cookies set, no business registration cookies

#### 1.3 Logout Cookie Cleanup

**Test**: Verify all cookies are cleared on logout

- **Steps**:
  1. Login as business user
  2. Call `/auth/revoke` endpoint
  3. Verify all auth and registration cookies are cleared

**Expected Result**: All cookies properly cleared

### 2. Middleware Redirects

#### 2.1 Business User Redirect

**Test**: Business users needing registration are redirected

- **Steps**:
  1. Login as business user (new account)
  2. Navigate to `/dashboard`
  3. Verify redirect to `/business-selector`

**Expected Result**: Automatic redirect to business selector

#### 2.2 Completed Registration Access

**Test**: Business users with completed registration can access dashboard

- **Steps**:
  1. Complete business registration flow
  2. Navigate to `/dashboard`
  3. Verify no redirect occurs

**Expected Result**: Direct access to dashboard

#### 2.3 Public Route Access

**Test**: Public routes remain accessible

- **Steps**:
  1. Navigate to `/auth/login`, `/auth/register`
  2. Verify no redirects occur

**Expected Result**: Public routes accessible without redirects

### 3. Business Registration API Flow

#### 3.1 Start Registration

**Test**: `/businesses/registration/start` endpoint

- **Steps**:
  1. Login as business user
  2. POST to `/businesses/registration/start`
  3. Verify response includes registration ID and current step

**Expected Result**: Registration started successfully

#### 3.2 Step Submission

**Test**: Submit each registration step

- **Steps**:
  1. Submit Step 1 via `/businesses/registration/step1`
  2. Submit Step 2 via `/businesses/registration/step2`
  3. Submit Step 3 via `/businesses/registration/step3`
  4. Verify each returns updated progress

**Expected Result**: Each step saves successfully and advances progress

#### 3.3 Registration Status Check

**Test**: Status endpoint returns correct data

- **Steps**:
  1. Call `/businesses/registration/status`
  2. Verify response includes `needsRegistration`, `currentStep`, etc.
  3. Check cookies are updated with status

**Expected Result**: Accurate status returned and cookies updated

#### 3.4 Complete Registration

**Test**: Complete registration flow

- **Steps**:
  1. Complete all 3 steps
  2. POST to `/businesses/registration/complete` with consent
  3. Verify `needsRegistration=false` cookie is set
  4. Verify business is created in database

**Expected Result**: Registration completed, cookies updated, business created

### 4. Frontend Components

#### 4.1 Business Selector Page

**Test**: Business selector renders correctly

- **Steps**:
  1. Navigate to `/business-selector`
  2. Verify page loads with create business card
  3. If business exists, verify existing business cards show
  4. Test create new business button

**Expected Result**: Page renders correctly with appropriate options

#### 4.2 Registration Wizard

**Test**: Multi-step registration form

- **Steps**:
  1. Navigate to `/business-registration`
  2. Complete Step 1 (Business Info)
  3. Complete Step 2 (Contact Details)
  4. Complete Step 3 (Additional Info)
  5. Review and submit
  6. Verify redirect to dashboard

**Expected Result**: Complete flow works end-to-end

#### 4.3 Form Validation

**Test**: Zod schema validation

- **Steps**:
  1. Submit forms with invalid data
  2. Verify proper error messages show
  3. Test required field validation
  4. Test email/URL format validation

**Expected Result**: Proper validation and error handling

#### 4.4 Auto-save Functionality

**Test**: Form data persistence

- **Steps**:
  1. Fill form partially
  2. Navigate away and return
  3. Verify data persisted in Zustand store

**Expected Result**: Form data persisted between sessions

### 5. React Query Integration

#### 5.1 Data Fetching

**Test**: Proper use of React Query hooks

- **Steps**:
  1. Verify `useRegistrationStatus()` works
  2. Verify `useRegistrationProgress()` works
  3. Test loading states and error handling

**Expected Result**: Data fetched correctly with proper states

#### 5.2 Mutations

**Test**: API mutations via React Query

- **Steps**:
  1. Test `useSubmitStep1()`, `useSubmitStep2()`, `useSubmitStep3()`
  2. Test `useCompleteRegistration()`
  3. Verify optimistic updates and cache invalidation

**Expected Result**: Mutations work correctly with proper cache management

#### 5.3 Error Handling

**Test**: Network error scenarios

- **Steps**:
  1. Simulate network failures
  2. Test retry logic
  3. Verify error messages displayed to user

**Expected Result**: Graceful error handling and user feedback

### 6. Internationalization

#### 6.1 Multi-language Support

**Test**: Translation system

- **Steps**:
  1. Switch between locales
  2. Verify all text is translated
  3. Test form validation messages in different languages

**Expected Result**: Complete i18n support

### 7. Security & Performance

#### 7.1 Cookie Security

**Test**: Cookie security attributes

- **Steps**:
  1. Verify HTTP-only flag set
  2. Verify Secure flag in production
  3. Verify SameSite=strict
  4. Test cookie expiration

**Expected Result**: Secure cookie configuration

#### 7.2 API Authentication

**Test**: Protected endpoint access

- **Steps**:
  1. Test endpoints without auth token
  2. Test with expired token
  3. Test with invalid token

**Expected Result**: Proper authentication enforcement

#### 7.3 Performance

**Test**: Application performance

- **Steps**:
  1. Measure page load times
  2. Test with large category trees
  3. Monitor API response times

**Expected Result**: Acceptable performance metrics

## Test Environment Setup

### Prerequisites

- Backend services running (Auth, Business, User)
- Database with test data
- Frontend development server
- Test user accounts (business and customer roles)

### Test Data

- Create test business user accounts
- Set up category tree data
- Configure test environment variables

## Manual Testing Checklist

### Happy Path

- [ ] Business user can register account
- [ ] Business user gets redirected to registration on first login
- [ ] Complete registration flow works end-to-end
- [ ] User can access dashboard after completion
- [ ] Multiple businesses supported (if applicable)

### Edge Cases

- [ ] Network failures handled gracefully
- [ ] Form validation works correctly
- [ ] Auto-save functions properly
- [ ] Cookie handling works across browser sessions
- [ ] Middleware redirects work correctly

### Cross-browser Testing

- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari (if applicable)
- [ ] Mobile browsers

## Automated Testing

### Unit Tests

- Component rendering tests
- Form validation tests
- Utility function tests
- Hook behavior tests

### Integration Tests

- API endpoint tests
- Database interaction tests
- Authentication flow tests
- Cookie management tests

### E2E Tests

- Complete registration flow
- User journey scenarios
- Cross-browser compatibility

## Success Criteria

✅ **All test scenarios pass**
✅ **No console errors or warnings**
✅ **Proper error handling and user feedback**
✅ **Performance meets requirements**
✅ **Security best practices followed**
✅ **Accessibility standards met**
✅ **Mobile responsive design**
✅ **Internationalization works correctly**

## Known Issues & Limitations

1. **Rate Limiting**: Currently handled by backend only
2. **Session Management**: Uses cookie-based approach
3. **File Uploads**: Not yet implemented for business logos
4. **Real-time Updates**: Not implemented for registration status
5. **Offline Support**: Not currently supported

## Future Enhancements

1. **Progressive Web App** features
2. **Real-time notifications** for registration status
3. **Advanced file upload** with image processing
4. **Social media integration** for business profiles
5. **Analytics and reporting** for registration funnel
