// Edge Runtime compatible i18n configuration
// This file avoids importing from @merodami/pika-types to prevent dynamic code evaluation errors

export type LanguageCode = 'es' | 'en' | 'gn'
export type Locale = LanguageCode

// Manually define supported languages to avoid importing from pika-types
export const SupportedLanguage = {
  SPANISH: 'es' as const,
  ENGLISH: 'en' as const,
  GUARANI: 'gn' as const,
}

export const locales: LanguageCode[] = ['es', 'en', 'gn']

// Dynamic default locale based on system preference (fallback to 'es')
export const getDefaultLocale = (): Locale => {
  // Server-side or when navigator is not available, return 'es'
  if (typeof window === 'undefined' || !navigator.language) {
    return 'es'
  }
  
  // Get browser language preference
  const browserLang = navigator.language.split('-')[0]?.toLowerCase()
  
  // Return if supported, otherwise fallback to 'es'
  return locales.includes(browserLang as Locale) ? (browserLang as Locale) : 'es'
}

export const defaultLocale: Locale = 'es' // Static fallback for server-side
