import { Metadata } from 'next'
import { UserRole } from '@merodami/pika-types'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { getCurrentUser } from '@/app/services/authService'
import { VoucherBookEditForm } from '@/components/features/voucherBook/voucherBookEditForm'
import type { Locale } from '@/i18n/config'

interface PageProps {
  params: Promise<{ locale: Locale; id: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'voucherBooks' })

  return {
    title: t('edit.title'),
    description: t('edit.description'),
  }
}

export default async function EditVoucherBookPage({ params }: PageProps) {
  const { locale, id } = await params
  const user = await getCurrentUser()
  const t = await getTranslations({ locale, namespace: 'voucherBooks' })

  if (!user || user.role !== UserRole.ADMIN) {
    return null // Auth middleware should handle this
  }

  if (!id) {
    notFound()
  }

  return (
    <div className="edit-voucher-book-page">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('edit.title')}</h1>
        <p className="text-gray-600">{t('edit.subtitle')}</p>
      </div>

      <VoucherBookEditForm bookId={id} locale={locale} />
    </div>
  )
}