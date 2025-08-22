import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/**
 * Security headers middleware handler
 * Adds comprehensive security headers to all responses
 */
export async function withSecurityHeaders(
  request: NextRequest,
  response?: NextResponse
): Promise<NextResponse> {
  const headers = new Headers(response?.headers)

  // Apply security headers based on environment
  if (process.env.NODE_ENV === 'production') {
    applyProductionHeaders(headers)
  } else {
    applyDevelopmentHeaders(headers)
  }

  // Common headers for all environments
  applyCommonHeaders(headers)

  return NextResponse.next({
    headers,
    request: {
      headers: request.headers,
    },
  })
}

/**
 * Common security headers for all environments
 */
function applyCommonHeaders(headers: Headers) {
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
}

/**
 * Production-specific security headers
 */
function applyProductionHeaders(headers: Headers) {
  // Strict Transport Security (HSTS)
  headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  )

  // Content Security Policy
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5500'
  headers.set('Content-Security-Policy', generateCSP(apiUrl))
}

/**
 * Development-specific headers (more permissive)
 */
function applyDevelopmentHeaders(headers: Headers) {
  // More permissive CSP for development
  headers.set(
    'Content-Security-Policy',
    "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;"
  )
}

/**
 * Generate Content Security Policy
 */
function generateCSP(apiUrl: string): string {
  return [
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
}
