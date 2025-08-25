import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

import { requireAdmin } from '@/app/services/authService'
import { AdminDashboardMetrics } from '@/components/features/adminDashboardMetrics'
import { RecentActivityFeed } from '@/components/features/recentActivityFeed'
import { SystemHealthStatus } from '@/components/features/systemHealthStatus'
import { DashboardPageLayout } from '@/components/layouts/dashboardPageLayout'
import { LoadingSkeleton } from '@/components/ui/loadingSkeleton'
import type { Locale } from '@/i18n/config'

// Force dynamic rendering since we use cookies for authentication
export const dynamic = 'force-dynamic'

interface AdminDashboardPageProps {
  params: Promise<{ locale: string }>
}

export default async function AdminDashboardPage({
  params,
}: AdminDashboardPageProps) {
  const user = await requireAdmin()
  const { locale } = await params
  const typedLocale = locale as Locale
  const t = await getTranslations({ locale: typedLocale })

  return (
    <DashboardPageLayout
      title={t('dashboard.welcome', { name: user.firstName })}
      subtitle={t('dashboard.admin.subtitle')}
      metricsSection={<AdminDashboardMetrics locale={typedLocale} />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Suspense fallback={<LoadingSkeleton />}>
            <RecentActivityFeed locale={typedLocale} />
          </Suspense>
        </div>

        {/* System Health */}
        <div>
          <Suspense fallback={<LoadingSkeleton />}>
            <SystemHealthStatus locale={typedLocale} />
          </Suspense>
        </div>
      </div>
    </DashboardPageLayout>
  )
}
