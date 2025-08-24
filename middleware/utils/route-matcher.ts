import { locales } from '@/i18n/edge-config'

/**
 * Utility class for matching routes
 */
export class RouteMatcher {
  private routes: string[]

  constructor(routes: string[]) {
    this.routes = routes
  }

  /**
   * Check if a pathname matches any of the routes
   */
  matches(pathname: string): boolean {
    return this.routes.some((route) => {
      return (
        pathname === route ||
        pathname.startsWith(route + '?') ||
        pathname.startsWith(route + '/')
      )
    })
  }

  /**
   * Check if pathname matches with exact match only
   */
  matchesExact(pathname: string): boolean {
    return this.routes.includes(pathname)
  }
}

/**
 * Extract pathname without locale prefix
 */
export function getPathnameWithoutLocale(pathname: string): string {
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  return pathnameHasLocale
    ? pathname.substring(3) // Remove "/es" but keep the rest including leading slash
    : pathname
}

/**
 * Extract locale from pathname
 */
export function getLocaleFromPathname(
  pathname: string,
  defaultLocale: string
): string {
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  return pathnameHasLocale ? pathname.split('/')[1] : defaultLocale
}
