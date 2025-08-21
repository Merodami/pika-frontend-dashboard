import { SupportedLanguage, LanguageCode } from '@merodami/pika-types'

// Map language codes to their display labels (fallback if translation not found)
export const LANGUAGE_LABELS: Record<string, string> = {
  [SupportedLanguage.ENGLISH]: 'English',
  [SupportedLanguage.SPANISH]: 'Español',
  [SupportedLanguage.GUARANI]: 'Guaraní',
}

// Get all supported languages as an array for iteration
export const getSupportedLanguages = () => {
  return Object.values(SupportedLanguage)
}

// Get language label with translation support
export const getLanguageLabel = (code: string, t: any): string => {
  // Try to get translation first
  const translationKey = `common.languages.${code}`
  const translated = t(translationKey)

  // If translation exists and is not the key itself, use it
  if (
    translated &&
    translated !== translationKey &&
    !translated.includes('common.languages')
  ) {
    return translated
  }

  // Fallback to hardcoded label or uppercase code
  return LANGUAGE_LABELS[code] || code.toUpperCase()
}

export { SupportedLanguage, LanguageCode } from '@merodami/pika-types'
