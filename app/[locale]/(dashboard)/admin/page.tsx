import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

import { requireAdmin } from '@/app/services/authService'
import { AdminDashboardMetricsModern } from '@/components/features/adminDashboardMetricsModern'
import { RecentActivityFeed } from '@/components/features/recentActivityFeed'
import { SystemHealthStatus } from '@/components/features/systemHealthStatus'
import { DashboardPageLayout } from '@/components/layouts/dashboardPageLayout'
import { LoadingSkeleton } from '@/components/ui/loadingSkeleton'
import type { Locale } from '@/i18n/config'

// Force dynamic rendering since we use cookies for authentication
export const dynamic = 'force-dynamic'

interface AdminDashboardPageProps {
  params: Promise<{ locale: Locale }>
}

export default async function AdminDashboardPage({
  params,
}: AdminDashboardPageProps) {
  const user = await requireAdmin()
  const { locale } = await params
  const t = await getTranslations({ locale })

  return (
    <DashboardPageLayout
      title={t('dashboard.welcome', { name: user.firstName })}
      subtitle={t('dashboard.admin.subtitle')}
      metricsSection={<AdminDashboardMetricsModern />}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Suspense fallback={<LoadingSkeleton />}>
              <RecentActivityFeed locale={locale} />
            </Suspense>
          </div>

          {/* System Health */}
          <div>
            <Suspense fallback={<LoadingSkeleton />}>
              <SystemHealthStatus locale={locale} />
            </Suspense>
          </div>
        </div>
      </div>
    </DashboardPageLayout>
  )
}
