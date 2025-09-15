import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

import { AuthPageLayout } from '@/components/layouts/authPageLayout'
import { ResetPasswordForm } from './resetPasswordForm'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'common.button' })

  return {
    title: t('reset'),
    description: t('reset'),
  }
}

interface ResetPasswordPageProps {
  params: Promise<{ locale: string }>
}

export default async function ResetPasswordPage({
  params,
}: ResetPasswordPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'common.button' })
  const tAuth = await getTranslations({ locale, namespace: 'auth.register' })

  return (
    <AuthPageLayout title={t('reset')} subtitle={tAuth('subtitle')}>
      <Suspense fallback={null}>
        <ResetPasswordForm />
      </Suspense>
    </AuthPageLayout>
  )
}