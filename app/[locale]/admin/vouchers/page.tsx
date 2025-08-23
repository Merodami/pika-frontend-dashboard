import { Suspense } from 'react'
import { Metadata } from 'next'
import { UserRole } from '@merodami/pika-types'

import { getCurrentUser } from '@/app/services/authService'
import { VoucherListContainer } from '@/components/features/voucher/voucherListContainer'
import { LoadingSkeleton } from '@/components/ui/loadingSkeleton'
import type { Locale } from '@/i18n/config'

export const metadata: Metadata = {
  title: 'Vouchers | Admin Dashboard',
  description: 'Manage vouchers and promotional campaigns',
}

export default async function AdminVouchersPage({
  params,
}: {
  params: { locale: string }
}) {
  const user = await getCurrentUser()

  if (!user || user.role !== UserRole.ADMIN) {
    return null // Auth middleware should handle this
  }

  return (
    <div className="admin-vouchers-page">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Voucher Management</h1>
        <p className="text-gray-600">
          Create and manage promotional vouchers for businesses
        </p>
      </div>

      <Suspense fallback={<LoadingSkeleton />}>
        <VoucherListContainer
          userRole={UserRole.ADMIN}
          locale={params.locale as Locale}
        />
      </Suspense>
    </div>
  )
}
