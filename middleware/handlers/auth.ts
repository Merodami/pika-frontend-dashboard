import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { PUBLIC_ROUTES } from '../config/routes'
import {
  RouteMatcher,
  getPathnameWithoutLocale,
  getLocaleFromPathname,
} from '../utils/route-matcher'
import { defaultLocale } from '@/i18n/edge-config'

const publicRouteMatcher = new RouteMatcher(
  PUBLIC_ROUTES as unknown as string[]
)

/**
 * Authentication middleware handler
 * Checks if user is authenticated and redirects to login if not
 */
export async function withAuth(
  request: NextRequest,
  response?: NextResponse
): Promise<NextResponse> {
  const { pathname } = request.nextUrl
  const pathnameWithoutLocale = getPathnameWithoutLocale(pathname)

  // Skip auth check for public routes
  if (publicRouteMatcher.matches(pathnameWithoutLocale)) {
    return response || NextResponse.next()
  }

  // Check for authentication token
  const accessToken = getAccessToken(request)

  if (!accessToken) {
    return redirectToLogin(request, pathname)
  }

  // Optional: Validate token (could make an API call here)
  // const isValid = await validateToken(accessToken)
  // if (!isValid) {
  //   return redirectToLogin(request, pathname)
  // }

  // Add user info to headers for downstream use
  const headers = new Headers(response?.headers)
  headers.set('X-User-Authenticated', 'true')

  return NextResponse.next({
    headers,
    request: {
      headers: request.headers,
    },
  })
}

/**
 * Extract access token from request
 */
function getAccessToken(request: NextRequest): string | null {
  return (
    request.cookies.get('pika-access-token')?.value ||
    request.headers.get('Authorization')?.replace('Bearer ', '') ||
    null
  )
}

/**
 * Redirect to login page with return URL
 */
function redirectToLogin(request: NextRequest, pathname: string): NextResponse {
  const locale = getLocaleFromPathname(pathname, defaultLocale)
  const url = new URL(`/${locale}/login`, request.url)

  // Add return URL for post-login redirect
  if (pathname !== '/' && pathname !== `/${locale}`) {
    url.searchParams.set('from', pathname)
  }

  return NextResponse.redirect(url, { status: 307 })
}
