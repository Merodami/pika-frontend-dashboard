import { Metadata } from 'next'
import { UserRole } from '@merodami/pika-types'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { getCurrentUser } from '@/app/services/authService'
import { VoucherDetail } from '@/components/features/voucher/voucherDetail'
import type { Locale } from '@/i18n/config'

interface PageProps {
  params: Promise<{ locale: Locale; id: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'vouchers' })

  return {
    title: t('detail.title'),
    description: t('detail.description'),
  }
}

export default async function AdminVoucherDetailPage({ params }: PageProps) {
  const { locale, id } = await params
  const user = await getCurrentUser()

  if (!user || user.role !== UserRole.ADMIN) {
    notFound()
  }

  return (
    <div className="admin-voucher-detail-page">
      <VoucherDetail voucherId={id} userRole={UserRole.ADMIN} locale={locale} />
    </div>
  )
}
