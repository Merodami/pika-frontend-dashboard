import { cookies } from 'next/headers'
import { getRequestConfig } from 'next-intl/server'

import { defaultLocale, isValidLocale, type Locale } from './config'
import type { Messages } from '../types/messages'

export default getRequestConfig(async ({ requestLocale }) => {
  // Determine the locale
  let locale = await requestLocale

  // Validate locale
  if (!locale || !isValidLocale(locale)) {
    // Try to get from cookie
    const cookieStore = await cookies()
    const savedLocale = cookieStore.get('pika-locale')?.value

    if (savedLocale && isValidLocale(savedLocale)) {
      locale = savedLocale
    } else {
      locale = defaultLocale
    }
  }

  const { default: messages }: { default: Messages } = await import(
    `../messages/${locale}.json`
  )

  return {
    locale: locale as Locale,
    messages,
    // Optional: Configure time zone, formats, etc.
    timeZone: 'America/Asuncion', // Paraguay timezone
    now: new Date(),
  }
})
