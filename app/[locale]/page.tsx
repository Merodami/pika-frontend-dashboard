import { UserRole } from '@merodami/pika-types'
import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/app/services/authService'

// Force dynamic rendering since we use cookies for authentication
export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  const user = await getCurrentUser()

  if (!user) {
    redirect(`/${locale}/login`)
  }

  // This dashboard is only for admin and business users
  switch (user.role) {
    case UserRole.ADMIN:
      redirect(`/${locale}/admin`)
      break
    case UserRole.BUSINESS:
      redirect(`/${locale}/business`)
      break
    default:
      // Any other role should not have access
      redirect(`/${locale}/login`)
  }
}
