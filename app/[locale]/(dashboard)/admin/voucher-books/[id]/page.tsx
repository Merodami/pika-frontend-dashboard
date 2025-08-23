import { Metadata } from 'next'
import { UserRole } from '@merodami/pika-types'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { getCurrentUser } from '@/app/services/authService'
import { VoucherBookDetail } from '@/components/features/voucherBook/voucherBookDetail'
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
    title: t('detail.title'),
    description: t('detail.description'),
  }
}

export default async function VoucherBookDetailPage({ params }: PageProps) {
  const { locale, id } = await params
  const user = await getCurrentUser()

  if (!user || user.role !== UserRole.ADMIN) {
    return null // Auth middleware should handle this
  }

  if (!id) {
    notFound()
  }

  return (
    <div className="voucher-book-detail-page">
      <VoucherBookDetail bookId={id} locale={locale} />
    </div>
  )
}
