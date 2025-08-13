import { getTranslations } from 'next-intl/server'

import type { User } from '@/app/services/authService'
import type { Locale } from '@/i18n/config'

import { BusinessSidebarClient } from './businessSidebarClient'

interface BusinessSidebarProps {
  user: User
  locale: Locale
}

export async function BusinessSidebar({ locale }: BusinessSidebarProps) {
  const t = await getTranslations({ locale, namespace: 'navigation' })

  const navItems = [
    {
      label: t('dashboard'),
      href: `/${locale}/business`,
      icon: 'LayoutDashboard' as const,
    },
    {
      label: t('myBusiness'),
      href: `/${locale}/business/profile`,
      icon: 'Store' as const,
    },
    {
      label: t('vouchers'),
      href: `/${locale}/business/vouchers`,
      icon: 'Ticket' as const,
    },
    {
      label: t('customers'),
      href: `/${locale}/business/customers`,
      icon: 'Users' as const,
    },
    {
      label: t('bookings'),
      href: `/${locale}/business/bookings`,
      icon: 'Calendar' as const,
    },
    {
      label: t('analytics'),
      href: `/${locale}/business/analytics`,
      icon: 'BarChart3' as const,
    },
    {
      label: t('messages'),
      href: `/${locale}/business/messages`,
      icon: 'MessageSquare' as const,
    },
    {
      label: t('settings'),
      href: `/${locale}/business/settings`,
      icon: 'Settings' as const,
    },
  ]

  return <BusinessSidebarClient navItems={navItems} />
}
