import { Suspense } from 'react'
import { Metadata } from 'next'
import { UserRole } from '@merodami/pika-types'
import { getTranslations } from 'next-intl/server'
import { redirect } from 'next/navigation'

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
    title: t('business.title'),
    description: t('business.description'),
  }
}

export default async function BusinessVouchersPage({ params }: PageProps) {
  const { locale } = await params
  const user = await getCurrentUser()
  const t = await getTranslations({ locale, namespace: 'vouchers' })

  if (!user || user.role !== UserRole.BUSINESS) {
    redirect(`/${locale}/login`)
  }

  // TODO: Get business ID from user context
  const businessId = user.businessId || ''

  return (
    <div className="business-vouchers-page">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('business.title')}</h1>
        <p className="text-gray-600">{t('business.subtitle')}</p>
      </div>

      <Suspense fallback={<LoadingSkeleton />}>
        <VoucherListContainer
          userRole={UserRole.BUSINESS}
          businessId={businessId}
          locale={locale}
        />
      </Suspense>
    </div>
  )
}
