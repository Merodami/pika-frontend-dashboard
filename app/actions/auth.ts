'use server'

import { authPublic } from '@merodami/pika-api'
import { redirect } from 'next/navigation'
import type { z } from 'zod'

import { clearTokens, setTokens } from '@/app/services/authService'
import { authToken, authRegister } from '@/lib/api/orval-client'
import { AuthTokenBodyOneOfGrantType } from '@/lib/api/orval-client'

// Server action for login
export async function login(data: z.infer<typeof authPublic.TokenRequest>) {
  try {
    // Type guard to ensure it's a password grant
    if (data.grantType !== 'password') {
      throw new Error('Invalid grant type')
    }

    // With Orval, it's much cleaner - directly returns data or throws
    const tokenData = await authToken({
      grantType: AuthTokenBodyOneOfGrantType.password,
      username: data.username!,
      password: data.password!,
      scope: data.scope,
    })

    if (tokenData?.accessToken && tokenData?.refreshToken) {
      await setTokens(tokenData.accessToken, tokenData.refreshToken)
      return { success: true }
    }

    throw new Error('Invalid response from server')
  } catch (error) {
    console.error('Login error:', error)
    return {
      error: error instanceof Error ? error.message : 'Login failed',
    }
  }
}

// Server action for registration
export async function register(
  data: z.infer<typeof authPublic.RegisterRequest>
) {
  try {
    // With Orval, clean and simple
    await authRegister(data)

    // Registration successful - return success flag
    return { success: true }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Registration failed',
    }
  }
}

// Server action for logout
export async function logout(locale?: string) {
  await clearTokens()
  // Use provided locale or default to 'en'
  const redirectLocale = locale || 'en'
  redirect(`/${redirectLocale}/login`)
}
