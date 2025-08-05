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

  // Set secure, httpOnly cookies
  cookieStore.set(ACCESS_TOKEN_COOKIE, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
  })

  cookieStore.set(REFRESH_TOKEN_COOKIE, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })
}

export async function clearTokens() {
  const cookieStore = await cookies()

  cookieStore.delete(ACCESS_TOKEN_COOKIE)
  cookieStore.delete(REFRESH_TOKEN_COOKIE)
}
