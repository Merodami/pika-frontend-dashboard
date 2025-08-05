import { getTranslations } from 'next-intl/server'

import { AuthPageLayout } from '@/components/layouts/authPageLayout'
import { RegisterForm } from './registerForm'

interface RegisterPageProps {
  params: Promise<{ locale: string }>
}

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'auth.register' })

  return (
    <AuthPageLayout title={t('title')} subtitle={t('subtitle')}>
      <RegisterForm />
    </AuthPageLayout>
  )
}
