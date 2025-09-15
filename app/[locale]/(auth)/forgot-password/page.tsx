import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

import { AuthPageLayout } from '@/components/layouts/authPageLayout'
import { ForgotPasswordForm } from './forgotPasswordForm'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'auth.login' })

  return {
    title: t('forgotPassword'),
    description: t('subtitle'),
  }
}

interface ForgotPasswordPageProps {
  params: Promise<{ locale: string }>
}

export default async function ForgotPasswordPage({
  params,
}: ForgotPasswordPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'auth.login' })

  return (
    <AuthPageLayout
      title={t('forgotPassword')}
      subtitle={t('forgotPasswordSubtitle')}
    >
      <Suspense fallback={null}>
        <ForgotPasswordForm />
      </Suspense>
    </AuthPageLayout>
  )
}