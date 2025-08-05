import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { defaultLocale, isValidLocale } from './i18n/config'
import type { Messages } from './types/messages'

export default getRequestConfig(async (context) => {
  // Handle the locale - in Next.js 15, requestLocale is a Promise
  let locale = context.locale
  if (!locale && context.requestLocale) {
    try {
      // If locale is not provided but requestLocale is, await it
      locale = await context.requestLocale
    } catch (error) {
      // Silent fallback on error
    }
  }

  // If still no locale, try to get it from the URL
  if (!locale) {
    // This is a fallback - in some cases next-intl might call this without proper context
    locale = defaultLocale
  }

  // Validate that the incoming `locale` parameter is valid
  if (!locale || !isValidLocale(locale)) {
    notFound()
  }

  try {
    const { default: messages }: { default: Messages } = await import(
      `./messages/${locale}.json`
    )
    return {
      locale,
      messages,
    }
  } catch (error) {
    notFound()
  }
})
