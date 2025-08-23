'use client'

import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import type { Locale } from '@/i18n/config'

interface VoucherBookDetailProps {
  bookId: string
  locale: Locale
  readOnly?: boolean
}

export function VoucherBookDetail({
  bookId,
  locale,
  readOnly = false,
}: VoucherBookDetailProps) {
  const t = useTranslations('voucherBooks')
  const router = useRouter()

  const handleEdit = () => {
    router.push(`/${locale}/admin/voucher-books/${bookId}/edit`)
  }

  const handleBack = () => {
    router.push(`/${locale}/admin/voucher-books`)
  }

  return (
    <div className="voucher-book-detail">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="text-gray-500 hover:text-gray-700"
            >
              ← {t('common.back')}
            </button>
            <div>
              <h1 className="text-2xl font-bold">{t('detail.title')}</h1>
              <p className="text-gray-600">{t('detail.subtitle')}</p>
            </div>
          </div>
          {!readOnly && (
            <button
              onClick={handleEdit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              {t('detail.editButton')}
            </button>
          )}
        </div>
      </div>

      {/* TODO: Implement voucher book detail view */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <p className="text-gray-500">{t('detail.comingSoon')}</p>
        <p className="text-sm text-gray-400 mt-2">{t('detail.comingSoonDescription')}</p>
        <p className="text-xs text-gray-300 mt-2">Book ID: {bookId}</p>
      </div>
    </div>
  )
}