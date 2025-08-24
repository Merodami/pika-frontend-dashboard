import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { defaultLocale, locales } from '@/i18n/edge-config'

// Create the i18n middleware instance
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: true,
})

/**
 * Internationalization middleware handler
 * Ensures locale is present in the URL and handles locale detection
 */
export async function withI18n(request: NextRequest): Promise<NextResponse> {
  // Apply intl middleware to ensure locale is present
  return intlMiddleware(request)
}
