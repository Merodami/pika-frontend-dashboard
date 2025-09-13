import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

import { AuthPageLayout } from '@/components/layouts/authPageLayout'
import { LoginForm } from './loginForm'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'auth.login' })

  return {
    title: t('title'),
    description: t('subtitle'),
  }
}

interface LoginPageProps {
  params: Promise<{ locale: string }>
}

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'auth.login' })

  return (
    <AuthPageLayout title={t('title')} subtitle={t('subtitle')}>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </AuthPageLayout>
  )
}
