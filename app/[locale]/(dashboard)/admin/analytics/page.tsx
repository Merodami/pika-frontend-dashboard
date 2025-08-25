import { Suspense } from 'react'

import { requireAdmin } from '@/app/services/authService'
import { DashboardPageLayout } from '@/components/layouts/dashboardPageLayout'
import { ModernMetricsSection } from '@/components/dashboard/ModernMetricsSection'
import { ModernChartsSection } from '@/components/dashboard/ModernChartsSection'
import { LoadingSkeleton } from '@/components/ui/loadingSkeleton'

// Force dynamic rendering since we use cookies for authentication
export const dynamic = 'force-dynamic'

interface AnalyticsPageProps {
  params: Promise<{ locale: string }>
}

export default async function AnalyticsPage({ params }: AnalyticsPageProps) {
  await requireAdmin() // Ensure user has admin access
  await params // Ensure params are resolved

  return (
    <DashboardPageLayout
      title="Analytics Dashboard"
      subtitle="Real-time insights and performance metrics"
      metricsSection={<ModernMetricsSection />}
    >
      <Suspense fallback={<LoadingSkeleton />}>
        <ModernChartsSection />
      </Suspense>
    </DashboardPageLayout>
  )
}
