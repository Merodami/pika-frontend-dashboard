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
  const t = await getTranslations({ locale, namespace: 'user' })

  if (!user || user.role !== UserRole.ADMIN) {
    redirect(`/${locale}/dashboard`)
  }

  return (
    <div className="admin-users-page">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <p className="text-gray-600">{t('subtitle')}</p>
      </div>

      <Suspense fallback={<LoadingSkeleton />}>
        <UserListContainer userRole={UserRole.ADMIN} locale={locale} />
      </Suspense>
    </div>
  )
}
