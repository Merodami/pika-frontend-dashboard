import { requireAuth } from '@/app/services/authService'
import type { Locale } from '@/i18n/config'
import { DashboardRedirect } from './DashboardRedirect'

// Force dynamic rendering since we use cookies for authentication
export const dynamic = 'force-dynamic'

interface DashboardPageProps {
  params: Promise<{ locale: Locale }>
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const user = await requireAuth()
  const { locale } = await params

  return <DashboardRedirect userRole={user.role} locale={locale} />
}
