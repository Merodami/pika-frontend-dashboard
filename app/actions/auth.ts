'use server'

import { authPublic } from '@merodami/pika-api'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { clearTokens, setTokens } from '@/app/services/authService'
import { authToken, authRegister } from '@/lib/api/orval-client'
import { AuthTokenBodyOneOfGrantType, RegisterRequestRegistrationSource } from '@/lib/api/orval-client'

// Server action for login
export async function login(data: z.infer<typeof authPublic.TokenRequest>) {
  try {
    // Validate input with the same schema as API
    const validatedData = authPublic.TokenRequest.parse(data)
    
    // Type guard to ensure it's a password grant
    if (validatedData.grantType !== 'password') {
      throw new Error('Invalid grant type')
    }

    // Call API with validated data
    const tokenData = await authToken({
      grantType: AuthTokenBodyOneOfGrantType.password,
      username: validatedData.username!,
      password: validatedData.password!,
      scope: validatedData.scope,
    })

    if (tokenData?.accessToken && tokenData?.refreshToken) {
      await setTokens(tokenData.accessToken, tokenData.refreshToken)
      
      // Return user info from the token response
      return { 
        success: true,
        user: tokenData.user ? {
          role: tokenData.user.role
        } : undefined
      }
    }

    throw new Error('Invalid response from server')
  } catch (error: any) {
    console.error('Login error:', error)
    
    // Return validation errors directly from schema
    if (error instanceof z.ZodError) {
      return { error: error.issues[0]?.message || 'Validation failed', errorCode: 'validation' }
    }
    
    // Check for specific error types from API
    if (error?.response?.status === 401) {
      return { error: 'Invalid credentials', errorCode: 'invalidCredentials' }
    }
    
    if (error?.response?.status === 403) {
      return { error: 'Access denied', errorCode: 'accessDenied' }
    }
    
    if (error?.response?.status === 423) {
      return { error: 'Account locked', errorCode: 'accountLocked' }
    }
    
    // Return API error message with a generic error code
    if (error?.response?.data?.message) {
      return { error: error.response.data.message, errorCode: 'serverError' }
    }
    
    // Fallback for network errors
    if (error?.code === 'ECONNREFUSED' || error?.code === 'ETIMEDOUT') {
      return { error: 'Network error', errorCode: 'networkError' }
    }
    
    return { error: 'An unexpected error occurred', errorCode: 'somethingWentWrong' }
  }
}

// Server action for registration
export async function register(
  data: z.infer<typeof authPublic.RegisterRequest>
) {
  try {
    // Validate using the same schema as backend
    const validatedData = authPublic.RegisterRequest.parse(data)
    
    // Add registrationSource for admin dashboard registrations
    // Since this is an admin/business only app, all registrations come from admin dashboard
    const apiData = {
      ...validatedData,
      registrationSource: RegisterRequestRegistrationSource.admin_dashboard
    }
    
    // Call API with validated data including registration source
    await authRegister(apiData)

    // Registration successful - return success flag
    return { success: true }
  } catch (error: any) {
    console.error('Registration error:', error)
    
    // Return validation errors directly from schema
    if (error instanceof z.ZodError) {
      return { error: error.issues[0]?.message || 'Validation failed', errorCode: 'validation' }
    }
    
    // Check for specific error types from API
    if (error?.response?.status === 409) {
      return { error: 'Email already exists', errorCode: 'emailExists' }
    }
    
    if (error?.response?.status === 403) {
      return { error: 'Access denied', errorCode: 'accessDenied' }
    }
    
    // Return API error message with a generic error code
    if (error?.response?.data?.message) {
      return { error: error.response.data.message, errorCode: 'serverError' }
    }
    
    // Fallback for network errors
    if (error?.code === 'ECONNREFUSED' || error?.code === 'ETIMEDOUT') {
      return { error: 'Network error', errorCode: 'networkError' }
    }
    
    return { error: 'An unexpected error occurred', errorCode: 'somethingWentWrong' }
  }
}

// Server action for logout
export async function logout(locale?: string) {
  await clearTokens()
  // Use provided locale or default to 'en'
  const redirectLocale = locale || 'en'
  redirect(`/${redirectLocale}/login`)
}
