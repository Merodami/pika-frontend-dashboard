'use client'

import { Alert, Empty } from 'antd'
import { useTranslations } from 'next-intl'

import type { VoucherBookDomain } from '@/lib/api/mappers/voucherBook'

interface VoucherBookDistributionProps {
  book: VoucherBookDomain
}

export function VoucherBookDistribution({
  book,
}: VoucherBookDistributionProps) {
  const t = useTranslations('voucherBooks')

  if (book.distributionCount > 0) {
    return (
      <div className="space-y-4">
        <Alert
          message={t('detail.distributionInfo')}
          description={t('detail.distributionDescription', {
            count: book.distributionCount,
          })}
          type="info"
          showIcon
        />

        {/* TODO: Add distribution details when API is available */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">
            {t('detail.distributionDetailsComingSoon')}
          </p>
        </div>
      </div>
    )
  }

  return (
    <Empty
      description={t('detail.noDistribution')}
      image={Empty.PRESENTED_IMAGE_SIMPLE}
    />
  )
}
