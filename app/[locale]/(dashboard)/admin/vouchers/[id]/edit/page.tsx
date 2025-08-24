import { Metadata } from 'next'
import { UserRole } from '@merodami/pika-types'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { getCurrentUser } from '@/app/services/authService'
import { VoucherEditForm } from '@/components/features/voucher/voucherEditForm'
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
    title: t('edit.title'),
    description: t('edit.subtitle'),
  }
}

export default async function AdminVoucherEditPage({ params }: PageProps) {
  const { locale, id } = await params
  const user = await getCurrentUser()
  const t = await getTranslations({ locale, namespace: 'vouchers' })

  if (!user || user.role !== UserRole.ADMIN) {
    notFound()
  }

  return (
    <div className="admin-voucher-edit-page">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('edit.title')}</h1>
        <p className="text-gray-600">{t('edit.subtitle')}</p>
      </div>

      <VoucherEditForm
        voucherId={id}
        userRole={UserRole.ADMIN}
        locale={locale}
      />
    </div>
  )
}
