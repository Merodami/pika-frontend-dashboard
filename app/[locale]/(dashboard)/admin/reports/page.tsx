import { Suspense } from 'react'

import { requireAdmin } from '@/app/services/authService'
import { ReportsDashboard } from '@/components/reports/ReportsDashboard'
import { LoadingSkeleton } from '@/components/ui/loadingSkeleton'

// Force dynamic rendering since we use cookies for authentication
export const dynamic = 'force-dynamic'

interface ReportsPageProps {
  params: Promise<{ locale: string }>
}

export default async function ReportsPage({ params }: ReportsPageProps) {
  await requireAdmin() // Ensure user has admin access
  await params // Ensure params are resolved

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ReportsDashboard />
    </Suspense>
  )
}
