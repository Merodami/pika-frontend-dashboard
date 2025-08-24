import { UserRole } from '@merodami/pika-types'
import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/app/services/authService'
import { defaultLocale } from '@/i18n/config'

// Force dynamic rendering since we use cookies for authentication
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(`/${defaultLocale}/login`)
  }

  // This dashboard is only for admin and business users
  switch (user.role) {
    case UserRole.ADMIN:
      redirect(`/${defaultLocale}/admin`)
      break
    case UserRole.BUSINESS:
      redirect(`/${defaultLocale}/business`)
      break
    default:
      // Any other role should not have access
      redirect(`/${defaultLocale}/login`)
  }
}
