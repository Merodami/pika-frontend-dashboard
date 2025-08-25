import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

import { requireBusiness } from '@/app/services/authService'
import { BusinessDashboardMetrics } from '@/components/features/businessDashboardMetrics'
import { RecentCustomers } from '@/components/features/recentCustomers'
import { VoucherPerformance } from '@/components/features/voucherPerformance'
import { DashboardPageLayout } from '@/components/layouts/dashboardPageLayout'
import { LoadingSkeleton } from '@/components/ui/loadingSkeleton'
import type { Locale } from '@/i18n/config'

// Force dynamic rendering since we use cookies for authentication
export const dynamic = 'force-dynamic'

interface BusinessDashboardPageProps {
  params: Promise<{ locale: string }>
}

export default async function BusinessDashboardPage({
  params,
}: BusinessDashboardPageProps) {
  const user = await requireBusiness()
  // TODO: Fetch businessId from business service
  const businessId = 'placeholder-business-id'
  const { locale } = await params
  const typedLocale = locale as Locale
  const t = await getTranslations({ locale: typedLocale })

  return (
    <DashboardPageLayout
      title={t('dashboard.welcome', { name: user.firstName })}
      subtitle={t('dashboard.business.subtitle')}
      metricsSection={
        <BusinessDashboardMetrics
          businessId={businessId}
          locale={typedLocale}
        />
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Voucher Performance */}
        <Suspense fallback={<LoadingSkeleton />}>
          <VoucherPerformance businessId={businessId} locale={typedLocale} />
        </Suspense>

        {/* Recent Customers */}
        <Suspense fallback={<LoadingSkeleton />}>
          <RecentCustomers />
        </Suspense>
      </div>
    </DashboardPageLayout>
  )
}
