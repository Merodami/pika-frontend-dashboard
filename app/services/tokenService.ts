import 'server-only'

import { cookies } from 'next/headers'

// Constants
const ACCESS_TOKEN_COOKIE = 'pika-access-token'
const REFRESH_TOKEN_COOKIE = 'pika-refresh-token'

export async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get(ACCESS_TOKEN_COOKIE)?.value ?? null
}

export async function getRefreshToken(): Promise<string | null> {
  const cookieStore = await cookies()

  return cookieStore.get(REFRESH_TOKEN_COOKIE)?.value ?? null
}

export async function setTokens(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies()

  // Production-ready secure cookie settings
  const isProduction = process.env.NODE_ENV === 'production'
  
  cookieStore.set(ACCESS_TOKEN_COOKIE, accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
    // In production, consider adding domain restriction
    ...(isProduction && process.env.COOKIE_DOMAIN && { domain: process.env.COOKIE_DOMAIN })
  })

  cookieStore.set(REFRESH_TOKEN_COOKIE, refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    ...(isProduction && process.env.COOKIE_DOMAIN && { domain: process.env.COOKIE_DOMAIN })
  })
}

export async function clearTokens() {
  const cookieStore = await cookies()

  cookieStore.delete(ACCESS_TOKEN_COOKIE)
  cookieStore.delete(REFRESH_TOKEN_COOKIE)
}
