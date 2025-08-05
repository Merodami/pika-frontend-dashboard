import { Suspense, type ReactNode } from 'react'

import { LoadingSkeleton } from '@/components/ui/loadingSkeleton'

interface DashboardPageLayoutProps {
  title: string
  subtitle: string
  metricsSection: ReactNode
  children: ReactNode
}

export function DashboardPageLayout({
  title,
  subtitle,
  metricsSection,
  children,
}: DashboardPageLayoutProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-1">{subtitle}</p>
      </div>

      {/* Metrics Overview */}
      <Suspense fallback={<LoadingSkeleton />}>{metricsSection}</Suspense>

      {children}
    </div>
  )
}
