import { Metadata } from 'next'
import { UserRole } from '@merodami/pika-types'
import { getTranslations } from 'next-intl/server'
import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/app/services/authService'
import { VoucherCreateForm } from '@/components/features/voucher/voucherCreateForm'
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
    title: t('business.create.title'),
    description: t('business.create.description'),
  }
}

export default async function BusinessCreateVoucherPage({ params }: PageProps) {
  const { locale } = await params
  const user = await getCurrentUser()
  const t = await getTranslations({ locale, namespace: 'vouchers' })

  if (!user || user.role !== UserRole.BUSINESS) {
    redirect(`/${locale}/login`)
  }

  // TODO: Get business ID from user context
  const businessId = user.businessId || ''

  if (!businessId) {
    // Redirect to business profile if no business ID
    redirect(`/${locale}/business/profile`)
  }

  return (
    <div className="business-create-voucher-page">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('business.create.title')}</h1>
        <p className="text-gray-600">{t('business.create.subtitle')}</p>
      </div>

      <VoucherCreateForm userRole={UserRole.BUSINESS} businessId={businessId} />
    </div>
  )
}
