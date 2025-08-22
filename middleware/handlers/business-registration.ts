import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { PUBLIC_ROUTES, REGISTRATION_EXEMPT_ROUTES } from '../config/routes'
import {
  RouteMatcher,
  getPathnameWithoutLocale,
  getLocaleFromPathname,
} from '../utils/route-matcher'
import { defaultLocale } from '@/i18n/edge-config'

const publicRouteMatcher = new RouteMatcher(
  PUBLIC_ROUTES as unknown as string[]
)
const exemptRouteMatcher = new RouteMatcher(
  REGISTRATION_EXEMPT_ROUTES as unknown as string[]
)

/**
 * Business registration middleware handler
 * Checks if business users need to complete registration
 */
export async function withBusinessRegistration(
  request: NextRequest,
  response?: NextResponse
): Promise<NextResponse> {
  const { pathname } = request.nextUrl
  const pathnameWithoutLocale = getPathnameWithoutLocale(pathname)

  // Skip for public routes
  if (publicRouteMatcher.matches(pathnameWithoutLocale)) {
    return response || NextResponse.next()
  }

  // Skip for registration-exempt routes
  if (exemptRouteMatcher.matches(pathnameWithoutLocale)) {
    return response || NextResponse.next()
  }

  // Check if user needs business registration
  const userRole = request.cookies.get('user-role')?.value
  const needsRegistration = request.cookies.get(
    'needs-business-registration'
  )?.value

  // Only redirect business users who need registration
  if (userRole === 'business' && needsRegistration === 'true') {
    const locale = getLocaleFromPathname(pathname, defaultLocale)
    const url = new URL(`/${locale}/business-selector`, request.url)
    return NextResponse.redirect(url, { status: 307 })
  }

  // Optional: Make API call to check registration status
  // This is more reliable than cookies but adds latency
  /*
  if (userRole === 'business') {
    const accessToken = request.cookies.get('pika-access-token')?.value
    const registrationStatus = await checkRegistrationStatus(accessToken)
    
    if (registrationStatus.needsRegistration) {
      const locale = getLocaleFromPathname(pathname, defaultLocale)
      const url = new URL(`/${locale}/business-selector`, request.url)
      return NextResponse.redirect(url, { status: 307 })
    }
  }
  */

  return response || NextResponse.next()
}

