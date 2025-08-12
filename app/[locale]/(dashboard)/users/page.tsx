import { getTranslations } from 'next-intl/server'
import { requireAdmin } from '@/app/services/authService'
import { redirect } from 'next/navigation'
import UsersTable from './UsersTable'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'navigation' })

  return {
    title: t('users'),
    description: 'Manage system users',
  }
}

export default async function UsersPage({
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

  return <UsersTable locale={locale} />
}