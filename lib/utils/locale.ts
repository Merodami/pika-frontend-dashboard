import {
  locales,
  defaultLocale,
  getDefaultLocale,
  type Locale,
} from '@/i18n/edge-config'

/**
 * Get the user's preferred locale from browser/system settings
 */
export function getSystemLocale(): Locale {
  return getDefaultLocale()
}

/**
 * Get the current locale from URL, localStorage, or system preference
 */
export function getCurrentLocale(): Locale {
  // Server-side fallback
  if (typeof window === 'undefined') {
    return defaultLocale
  }

  // Try to get from URL path
  const pathname = window.location.pathname
  const urlLocale = pathname.split('/')[1]
  if (urlLocale && locales.includes(urlLocale as Locale)) {
    return urlLocale as Locale
  }

  // Try to get from localStorage
  const savedLocale = localStorage.getItem('pika-locale')
  if (savedLocale && locales.includes(savedLocale as Locale)) {
    return savedLocale as Locale
  }

  // Fallback to system locale
  return getSystemLocale()
}

/**
 * Save locale preference to localStorage
 */
export function saveLocalePreference(locale: Locale): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('pika-locale', locale)
  }
}
