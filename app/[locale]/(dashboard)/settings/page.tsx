import { Card } from 'antd'
import { Globe, Bell, Shield, User } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { requireAuth } from '@/app/services/authService'
import { LanguageSwitcher } from '@/components/ui/languageSwitcher'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'settings' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const user = await requireAuth()
  const t = await getTranslations({ locale, namespace: 'settings' })

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>

      {/* Language Settings */}
      <Card className="mb-6">
        <div className="flex items-start gap-4 mb-4">
          <Globe className="w-5 h-5 text-gray-500 mt-1" />
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-2">
              {t('language.title')}
            </h2>
            <p className="text-gray-600 mb-4">{t('language.description')}</p>
            <LanguageSwitcher />
          </div>
        </div>
      </Card>

      {/* Notifications Settings */}
      <Card className="mb-6">
        <div className="flex items-start gap-4">
          <Bell className="w-5 h-5 text-gray-500 mt-1" />
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-2">
              {t('notifications.title')}
            </h2>
            <p className="text-gray-600">{t('notifications.description')}</p>
            {/* Add notification settings here */}
          </div>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="mb-6">
        <div className="flex items-start gap-4">
          <Shield className="w-5 h-5 text-gray-500 mt-1" />
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-2">
              {t('security.title')}
            </h2>
            <p className="text-gray-600">{t('security.description')}</p>
            {/* Add security settings here */}
          </div>
        </div>
      </Card>

      {/* Profile Settings */}
      <Card>
        <div className="flex items-start gap-4">
          <User className="w-5 h-5 text-gray-500 mt-1" />
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-2">{t('profile.title')}</h2>
            <p className="text-gray-600">{t('profile.description')}</p>
            <div className="mt-4 text-sm text-gray-500">
              <p>Email: {user.email}</p>
              <p>
                Name: {user.firstName} {user.lastName}
              </p>
              <p>Role: {user.role}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
