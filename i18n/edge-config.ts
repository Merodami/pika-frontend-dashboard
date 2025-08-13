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
export const defaultLocale: Locale = 'es'