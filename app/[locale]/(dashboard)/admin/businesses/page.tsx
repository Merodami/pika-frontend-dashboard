import { getTranslations } from 'next-intl/server'
import { requireAdmin } from '@/app/services/authService'
import { redirect } from 'next/navigation'
import BusinessesTable from './BusinessesTable'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'navigation' })

  return {
    title: t('businesses'),
    description: 'Manage businesses',
  }
}

export default async function BusinessesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Require admin role - will throw if not admin
  try {
    await requireAdmin()
  } catch (error) {
    // Redirect non-admins to dashboard
    redirect(`/${locale}/dashboard`)
  }

  return <BusinessesTable locale={locale} />
}
