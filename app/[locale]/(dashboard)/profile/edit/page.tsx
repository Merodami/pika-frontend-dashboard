import { getTranslations } from 'next-intl/server'
import { requireAuth } from '@/app/services/authService'
import { getUserProfile } from '@/lib/api/server-client'
import EditProfileForm from './EditProfileForm'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'profile' })

  return {
    title: t('editProfile'),
    description: t('description'),
  }
}

export default async function EditProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  
  // Get current user and full profile
  await requireAuth()
  const profile = await getUserProfile()

  return <EditProfileForm locale={locale} initialData={profile} />
}