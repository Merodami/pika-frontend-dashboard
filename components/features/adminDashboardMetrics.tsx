import { Ticket, Building2, BookOpen, AlertTriangle } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { MetricCard } from '@/components/ui/MetricCard'
import type { LocaleProps } from '@/types/common'

type AdminDashboardMetricsProps = LocaleProps

export async function AdminDashboardMetrics({
  locale,
}: AdminDashboardMetricsProps) {
  const t = await getTranslations({ locale, namespace: 'dashboard.metrics' })

  // Fetch real metrics from API
  try {
    // These would be real API calls
    const metrics = {
      totalVouchers: 1234,
      activeBusinesses: 567,
      voucherBooks: 12,
      pendingFraudCases: 3,
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          label={t('totalVouchers')}
          value={metrics.totalVouchers.toLocaleString()}
          icon={<Ticket className="w-4 h-4" />}
          trend={{ value: 8.2, direction: 'up' }}
          color="blue"
        />
        <MetricCard
          label={t('activeBusinesses')}
          value={metrics.activeBusinesses.toLocaleString()}
          icon={<Building2 className="w-4 h-4" />}
          trend={{ value: 3.4, direction: 'up' }}
          color="green"
        />
        <MetricCard
          label={t('voucherBooks')}
          value={metrics.voucherBooks.toString()}
          icon={<BookOpen className="w-4 h-4" />}
          trend={{ value: 1, direction: 'up' }}
          color="purple"
        />
        <MetricCard
          label={t('pendingFraudCases')}
          value={metrics.pendingFraudCases.toString()}
          icon={<AlertTriangle className="w-4 h-4" />}
          trend={{ value: 2, direction: 'down' }}
          color="red"
        />
      </div>
    )
  } catch (error) {
    console.error('Failed to fetch metrics:', error)
    return <div>Failed to load metrics</div>
  }
}
