import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { defaultLocale, locales } from './i18n/edge-config'

// Create the i18n middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: true,
})

// Public routes that don't require authentication
const publicRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // First, apply intl middleware to ensure locale is present
  const response = intlMiddleware(request)

  // Extract locale from pathname after intl middleware has normalized it
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // Get the pathname without locale (keep leading slash)
  const pathnameWithoutLocale = pathnameHasLocale
    ? pathname.substring(3) // Remove "/es" but keep the rest including leading slash
    : pathname

  // Check if it's a public route - exact match or with query params
  const isPublicRoute = publicRoutes.some((route) => {
    // Exact match or route with query params (e.g., /login?from=...)
    return (
      pathnameWithoutLocale === route ||
      pathnameWithoutLocale.startsWith(route + '?') ||
      pathnameWithoutLocale.startsWith(route + '/')
    )
  })

  // Modern auth check: Look for token in multiple places
  const accessToken =
    request.cookies.get('pika-access-token')?.value ||
    request.headers.get('Authorization')?.replace('Bearer ', '')

  // If not a public route and no token, redirect to login
  if (!isPublicRoute && !accessToken) {
    // Get locale for redirect - use the one from the normalized path
    const locale = pathnameHasLocale ? pathname.split('/')[1] : defaultLocale

    // Redirect to login if no token
    const url = new URL(`/${locale}/login`, request.url)

    // Only add 'from' parameter if not already on login page and not root
    if (
      !pathnameWithoutLocale.startsWith('/login') &&
      pathname !== '/' &&
      pathname !== `/${locale}`
    ) {
      url.searchParams.set('from', pathname)
    }

    // Use 307 temporary redirect to avoid browser caching
    return NextResponse.redirect(url, { status: 307 })
  }

  // Add comprehensive security headers
  const headers = new Headers(response.headers)

  // Prevent clickjacking attacks
  headers.set('X-Frame-Options', 'DENY')

  // Prevent MIME type sniffing
  headers.set('X-Content-Type-Options', 'nosniff')

  // Enable XSS protection (legacy browsers)
  headers.set('X-XSS-Protection', '1; mode=block')

  // Control referrer information
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Restrict browser features
  headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=()'
  )

  // Strict Transport Security (HSTS) for production
  if (process.env.NODE_ENV === 'production') {
    headers.set(
      'Strict-Transport-Security',
      'max-age=63072000; includeSubDomains; preload'
    )
  }

  // Content Security Policy for production
  if (process.env.NODE_ENV === 'production') {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5500'
    headers.set(
      'Content-Security-Policy',
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https: blob:",
        "font-src 'self' data:",
        `connect-src 'self' ${apiUrl} ws: wss:`,
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        'upgrade-insecure-requests',
      ].join('; ')
    )
  }

  return NextResponse.next({
    headers,
    request: {
      headers: request.headers,
    },
  })
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - public folder
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|public|api).*)',
  ],
}
