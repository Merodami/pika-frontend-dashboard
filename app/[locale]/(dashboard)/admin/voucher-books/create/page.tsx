import { Metadata } from 'next'
import { UserRole } from '@merodami/pika-types'
import { getTranslations } from 'next-intl/server'

import { getCurrentUser } from '@/app/services/authService'
import { VoucherBookCreateForm } from '@/components/features/voucherBook/voucherBookCreateForm'
import type { Locale } from '@/i18n/config'

interface PageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'voucherBooks' })

  return {
    title: t('create.title'),
    description: t('create.description'),
  }
}

export default async function CreateVoucherBookPage({ params }: PageProps) {
  const { locale } = await params
  const user = await getCurrentUser()
  const t = await getTranslations({ locale, namespace: 'voucherBooks' })

  if (!user || user.role !== UserRole.ADMIN) {
    return null // Auth middleware should handle this
  }

  return (
    <div className="create-voucher-book-page">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('create.title')}</h1>
        <p className="text-gray-600">{t('create.subtitle')}</p>
      </div>

      <VoucherBookCreateForm locale={locale} />
    </div>
  )
}