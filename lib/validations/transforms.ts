/**
 * Frontend Transform Functions
 *
 * Transform frontend form data to backend API requests
 * These functions handle the conversion between UI forms and API schemas
 */

import { authFrontend, authPublic } from '@merodami/pika-api'
import type { z } from 'zod'

// Type imports
type LoginFormData = z.infer<typeof authFrontend.LoginFormSchema>
type RegisterFormData = z.infer<typeof authFrontend.RegisterFormSchema>
type ResetPasswordFormData = z.infer<
  typeof authFrontend.ResetPasswordFormSchema
>
type RegistrationStep1Data = z.infer<
  typeof authFrontend.RegistrationStep1Schema
>
type RegistrationStep2Data = z.infer<
  typeof authFrontend.RegistrationStep2Schema
>
type RegistrationStep3Data = z.infer<
  typeof authFrontend.RegistrationStep3Schema
>

type TokenRequest = z.infer<typeof authPublic.TokenRequest>
type RegisterRequest = z.infer<typeof authPublic.RegisterRequest>
type ResetPasswordRequest = z.infer<typeof authPublic.ResetPasswordRequest>

/**
 * Transform login form data to OAuth token request
 */
export function transformLoginToTokenRequest(
  formData: LoginFormData
): TokenRequest {
  return {
    grantType: 'password',
    username: formData.email,
    password: formData.password,
    scope: 'read write',
    // rememberMe is handled by cookie settings, not sent to API
  }
}

/**
 * Transform registration form data to backend register request
 */
export function transformRegisterToAPI(
  formData: RegisterFormData
): RegisterRequest {
  const { confirmPassword, agreedToMarketing, ...apiData } = formData

  return {
    ...apiData,
    // Map frontend field to backend field
    marketingConsent: agreedToMarketing,
  }
}

/**
 * Transform reset password form data to backend request
 */
export function transformResetPasswordToAPI(
  formData: ResetPasswordFormData
): ResetPasswordRequest {
  return {
    token: formData.token,
    newPassword: formData.newPassword,
    // confirmPassword is only for frontend validation
  }
}

/**
 * Combine all registration steps into a single register request
 */
export function combineRegistrationSteps(
  step1: RegistrationStep1Data,
  step2: RegistrationStep2Data,
  step3: RegistrationStep3Data
): RegisterRequest {
  return {
    // From step 1
    email: step1.email,
    password: step1.password,
    firstName: step1.firstName,
    lastName: step1.lastName,

    // From step 2
    phoneNumber: step2.phoneNumber,
    dateOfBirth: step2.dateOfBirth,
    acceptTerms: step2.acceptTerms,
    marketingConsent: step2.marketingConsent,

    // From step 3
    registrationSource: step3.registrationSource,
    // Note: preferredLanguage, timezone, notifications are handled separately
    // as they're not part of the core user registration
  }
}

/**
 * Extract user preferences from step 3 for separate API calls
 */
export function extractUserPreferences(step3: RegistrationStep3Data) {
  return {
    preferredLanguage: step3.preferredLanguage,
    timezone: step3.timezone,
    notifications: step3.notifications,
  }
}
