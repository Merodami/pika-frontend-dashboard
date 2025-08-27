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

  if (!user || user.role !== UserRole.ADMIN) {
    return null // Auth middleware should handle this
  }

  return (
    <>
      {/* Full-width section below header */}
      <div className="-my-6 -mx-4 sm:-mx-6 lg:-mx-8">
        <Suspense fallback={<LoadingSkeleton />}>
          <VoucherListContainer userRole={UserRole.ADMIN} locale={locale} />
        </Suspense>
      </div>
    </>
  )
}
