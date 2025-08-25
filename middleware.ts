import type { NextRequest } from 'next/server'
import { compose } from './middleware/utils/compose'
import { withI18n } from './middleware/handlers/i18n'
import { withAuth } from './middleware/handlers/auth'
import { withBusinessRegistration } from './middleware/handlers/business-registration'
import { withSecurityHeaders } from './middleware/handlers/security-headers'
import { withRateLimit } from './middleware/handlers/rate-limit'

/**
 * Main middleware entry point
 *
 * This middleware handles:
 * 1. Internationalization (i18n) - Ensures locale is in URL
 * 2. Authentication - Validates user sessions and redirects
 * 3. Business Registration - Enforces mandatory registration flow
 * 4. Security Headers - Adds security headers to responses
 * 5. Rate Limiting - Handled by backend (pass-through)
 *
 * @see /middleware/handlers/* for individual handler implementations
 * @see /RATE_LIMITING_STRATEGY.md for rate limiting architecture decisions
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // CRITICAL: Skip middleware for Next.js internal routes
  // These can have locale prefixes, so we check if _next appears anywhere in the path
  if (pathname.includes('/_next/') || pathname.includes('/_next')) {
    return
  }

  // Compose middleware handlers in order of execution
  // Each handler can modify the request/response or short-circuit the chain
  return compose(
    withI18n,
    withAuth,
    withBusinessRegistration,
    withSecurityHeaders,
    withRateLimit
  )(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - /api routes (API routes should not have locale prefix)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - public folder
     *
     * Note: The matcher runs BEFORE the middleware function,
     * but with locales, paths like /es/_next/static still match
     * the pattern, so we need the additional check in the middleware
     */
    '/((?!api/|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|public).*)',
  ],
}
