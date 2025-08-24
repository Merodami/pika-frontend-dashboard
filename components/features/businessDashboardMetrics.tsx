import { Ticket, Users, TrendingUp, QrCode } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { MetricCard } from '@/components/ui/MetricCard'
import type { LocaleProps } from '@/types/common'

interface BusinessDashboardMetricsProps extends LocaleProps {
  businessId: string
}

export async function BusinessDashboardMetrics({
  locale,
}: BusinessDashboardMetricsProps) {
  const t = await getTranslations({ locale, namespace: 'dashboard.metrics' })

  // Fetch business-specific metrics
  // In production, these would come from the API
  const metrics = {
    activeVouchers: 8,
    totalRedemptions: 234,
    totalScans: 567,
    uniqueCustomers: 89,
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        label={t('activeVouchers')}
        value={metrics.activeVouchers.toString()}
        icon={<Ticket className="w-4 h-4" />}
        trend={{ value: 5.2, direction: 'up' }}
        color="blue"
      />
      <MetricCard
        label={t('totalRedemptions')}
        value={metrics.totalRedemptions.toLocaleString()}
        icon={<TrendingUp className="w-4 h-4" />}
        trend={{ value: 12.8, direction: 'up' }}
        color="green"
      />
      <MetricCard
        label={t('totalScans')}
        value={metrics.totalScans.toLocaleString()}
        icon={<QrCode className="w-4 h-4" />}
        trend={{ value: 18.3, direction: 'up' }}
        color="purple"
      />
      <MetricCard
        label={t('uniqueCustomers')}
        value={metrics.uniqueCustomers.toString()}
        icon={<Users className="w-4 h-4" />}
        trend={{ value: 22.5, direction: 'up' }}
        color="yellow"
      />
    </div>
  )
}
