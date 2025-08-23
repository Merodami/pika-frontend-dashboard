import { Metadata } from 'next'
import { UserRole } from '@merodami/pika-types'

import { getCurrentUser } from '@/app/services/authService'
import { VoucherCreateForm } from '@/components/features/voucher/voucherCreateForm'

export const metadata: Metadata = {
  title: 'Create Voucher | Admin Dashboard',
  description: 'Create a new promotional voucher',
}

export default async function CreateVoucherPage() {
  const user = await getCurrentUser()

  if (!user || user.role !== UserRole.ADMIN) {
    return null // Auth middleware should handle this
  }

  return (
    <div className="create-voucher-page">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create New Voucher</h1>
        <p className="text-gray-600">
          Set up a new promotional voucher for businesses
        </p>
      </div>

      <VoucherCreateForm userRole={UserRole.ADMIN} />
    </div>
  )
}
