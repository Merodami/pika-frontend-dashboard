import { Suspense } from 'react'
import { Metadata } from 'next'
import { UserRole } from '@merodami/pika-types'
import { getTranslations } from 'next-intl/server'

import { getCurrentUser } from '@/app/services/authService'
import { VoucherListContainer } from '@/components/features/voucher/voucherListContainer'
import { LoadingSkeleton } from '@/components/ui/loadingSkeleton'
import type { Locale } from '@/i18n/config'

interface PageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'vouchers' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function AdminVouchersPage({ params }: PageProps) {
  const { locale } = await params
  const user = await getCurrentUser()
  const t = await getTranslations({ locale, namespace: 'vouchers' })

  if (!user || user.role !== UserRole.ADMIN) {
    return null // Auth middleware should handle this
  }

  return (
    <div className="admin-vouchers-page">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <p className="text-gray-600">{t('subtitle')}</p>
      </div>

      <Suspense fallback={<LoadingSkeleton />}>
        <VoucherListContainer userRole={UserRole.ADMIN} locale={locale} />
      </Suspense>
    </div>
  )
}
