'use client'

import { Timeline } from 'antd'
import { useTranslations } from 'next-intl'

import { formatDateTime } from '@/lib/utils/date'
import type { VoucherBookDomain } from '@/lib/api/mappers/voucherBook'

interface VoucherBookHistoryProps {
  book: VoucherBookDomain
}

export function VoucherBookHistory({ book }: VoucherBookHistoryProps) {
  const t = useTranslations('voucherBooks')

  const timelineItems = [
    {
      color: 'green',
      children: (
        <div>
          <p className="font-medium">{t('history.created')}</p>
          <p className="text-sm text-gray-500">
            {formatDateTime(new Date(book.createdAt))}
          </p>
        </div>
      ),
    },
    ...(book.publishedAt
      ? [
          {
            color: 'blue' as const,
            children: (
              <div>
                <p className="font-medium">{t('history.published')}</p>
                <p className="text-sm text-gray-500">
                  {formatDateTime(new Date(book.publishedAt))}
                </p>
              </div>
            ),
          },
        ]
      : []),
    {
      color: 'gray' as const,
      children: (
        <div>
          <p className="font-medium">{t('history.lastUpdated')}</p>
          <p className="text-sm text-gray-500">
            {formatDateTime(new Date(book.updatedAt))}
          </p>
        </div>
      ),
    },
  ]

  return (
    <div>
      <Timeline items={timelineItems} />
    </div>
  )
}
