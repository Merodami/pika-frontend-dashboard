/**
 * Centralized route configuration for middleware
 */

// Public routes that don't require authentication
export const PUBLIC_ROUTES = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
] as const

// Routes that are accessible even if business registration is pending
export const REGISTRATION_EXEMPT_ROUTES = [
  '/business-registration',
  '/business-selector',
  '/logout',
  '/profile',
  '/settings',
] as const

// Admin-only routes
export const ADMIN_ROUTES = [
  '/admin',
  '/admin/users',
  '/admin/businesses',
  '/admin/analytics',
  '/admin/settings',
] as const

// Business owner routes
export const BUSINESS_ROUTES = [
  '/business',
  '/vouchers',
  '/customers',
  '/analytics',
  '/business/settings',
] as const

// API routes that should bypass middleware
export const API_ROUTES = [
  '/api',
  '/_next',
  '/favicon.ico',
  '/sitemap.xml',
  '/robots.txt',
] as const
