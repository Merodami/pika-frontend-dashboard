import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { compose } from './utils/compose'
import { withI18n } from './handlers/i18n'
import { withAuth } from './handlers/auth'
import { withBusinessRegistration } from './handlers/business-registration'
import { withSecurityHeaders } from './handlers/security-headers'
import { withRateLimit } from './handlers/rate-limit'

/**
 * Main middleware entry point
 * Composes multiple middleware handlers in a clean, maintainable way
 */
export async function middleware(request: NextRequest) {
  // Compose middleware handlers in order of execution
  // Each handler can modify the request/response or short-circuit the chain
  return compose(
    withI18n,
    withAuth,
    withBusinessRegistration,
    withSecurityHeaders,
    withRateLimit // Optional: Add rate limiting
  )(request)
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
