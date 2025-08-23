'use client'

import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import type { Locale } from '@/i18n/config'

interface VoucherBookEditFormProps {
  bookId: string
  locale: Locale
}

export function VoucherBookEditForm({
  bookId,
  locale,
}: VoucherBookEditFormProps) {
  const t = useTranslations('voucherBooks')
  const router = useRouter()

  const handleCancel = () => {
    router.push(`/${locale}/admin/voucher-books/${bookId}`)
  }

  const handleSave = () => {
    // TODO: Implement save logic
    console.log('Save voucher book', bookId)
  }

  return (
    <div className="voucher-book-edit-form">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">{t('edit.formTitle')}</h3>
              <p className="text-sm text-gray-600">{t('edit.formSubtitle')}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg border border-gray-300"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                {t('common.save')}
              </button>
            </div>
          </div>

          {/* TODO: Implement edit form */}
          <div className="border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-500">{t('edit.comingSoon')}</p>
            <p className="text-sm text-gray-400 mt-2">
              {t('edit.comingSoonDescription')}
            </p>
            <p className="text-xs text-gray-300 mt-2">Book ID: {bookId}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
