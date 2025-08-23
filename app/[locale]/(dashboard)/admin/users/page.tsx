import { Suspense } from 'react'
import { Metadata } from 'next'
import { UserRole } from '@merodami/pika-types'
import { getTranslations } from 'next-intl/server'
import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/app/services/authService'
import { UserListContainer } from '@/components/features/user/userListContainer'
import { LoadingSkeleton } from '@/components/ui/loadingSkeleton'
import type { Locale } from '@/i18n/config'

interface PageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'navigation' })

  return {
    title: t('users'),
    description: 'Manage system users',
  }
}

export default async function AdminUsersPage({ params }: PageProps) {
  const { locale } = await params
  const user = await getCurrentUser()

  if (!user || user.role !== UserRole.ADMIN) {
    redirect(`/${locale}/dashboard`)
  }

  return (
    <>
      {/* Full-width section below header */}
      <div className="-my-6 -mx-4 sm:-mx-6 lg:-mx-8">
        <Suspense fallback={<LoadingSkeleton />}>
          <UserListContainer userRole={UserRole.ADMIN} locale={locale} />
        </Suspense>
      </div>
    </>
  )
}
