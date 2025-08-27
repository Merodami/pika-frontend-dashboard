import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

import { requireBusiness } from '@/app/services/authService'
import { BusinessDashboardMetricsModern } from '@/components/features/businessDashboardMetricsModern'
import { RecentCustomers } from '@/components/features/recentCustomers'
import { VoucherPerformance } from '@/components/features/voucherPerformance'
import { DashboardPageLayout } from '@/components/layouts/dashboardPageLayout'
import { LoadingSkeleton } from '@/components/ui/loadingSkeleton'
import type { Locale } from '@/i18n/config'

// Force dynamic rendering since we use cookies for authentication
export const dynamic = 'force-dynamic'

interface BusinessDashboardPageProps {
  params: Promise<{ locale: Locale }>
}

export default async function BusinessDashboardPage({
  params,
}: BusinessDashboardPageProps) {
  const user = await requireBusiness()
  // TODO: Fetch businessId from business service
  const businessId = 'placeholder-business-id'
  const { locale } = await params
  const t = await getTranslations({ locale })

  return (
    <DashboardPageLayout
      title={t('dashboard.welcome', { name: user.firstName })}
      subtitle={t('dashboard.business.subtitle')}
    >
      <div className="space-y-6">
        {/* Modern Metrics Cards */}
        <Suspense fallback={<LoadingSkeleton />}>
          <BusinessDashboardMetricsModern businessId={businessId} />
        </Suspense>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Voucher Performance */}
        <Suspense fallback={<LoadingSkeleton />}>
          <VoucherPerformance businessId={businessId} locale={locale} />
        </Suspense>

        {/* Recent Customers */}
        <Suspense fallback={<LoadingSkeleton />}>
          <RecentCustomers />
        </Suspense>
      </div>
      </div>
    </DashboardPageLayout>
  )
}
