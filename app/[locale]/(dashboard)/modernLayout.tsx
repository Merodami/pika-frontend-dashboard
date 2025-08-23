import { UserRole } from '@merodami/pika-types'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

import { requireDashboardAccess } from '@/app/services/authService'
import { ResponsiveDashboardLayout } from '@/components/layouts/ResponsiveDashboardLayout'
import { ModernSidebarNav } from '@/components/layouts/modernSidebarNav'
import { DashboardHeader } from '@/components/layouts/dashboardHeader'
import { LoadingSkeleton } from '@/components/ui/loadingSkeleton'
import type { Locale } from '@/i18n/config'
import { APP_CONFIG } from '@/lib/constants/app'

// Force dynamic rendering for authenticated routes
export const dynamic = 'force-dynamic'

interface ModernDashboardLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}

export default async function ModernDashboardLayout({
  children,
  params,
}: ModernDashboardLayoutProps) {
  const user = await requireDashboardAccess()
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'navigation' })

  // Prepare nav items based on user role
  const navItems =
    user.role === UserRole.ADMIN
      ? [
          // Main Section
          {
            label: t('dashboard'),
            href: `/${locale}/admin`,
            icon: 'LayoutDashboard',
          },
          { label: t('users'), href: `/${locale}/admin/users`, icon: 'Users' },
          {
            label: t('businesses'),
            href: `/${locale}/admin/businesses`,
            icon: 'Building2',
          },

          // Management Section
          {
            label: t('vouchers'),
            href: `/${locale}/admin/vouchers`,
            icon: 'Ticket',
            section: t('management') || 'Management',
          },
          {
            label: t('voucherBooks'),
            href: `/${locale}/admin/voucher-books`,
            icon: 'BookOpen',
            section: t('management') || 'Management',
          },

          // Analytics Section
          {
            label: t('analytics'),
            href: `/${locale}/admin/analytics`,
            icon: 'BarChart3',
            section: t('analytics') || 'Analytics',
          },
          {
            label: t('reports'),
            href: `/${locale}/admin/reports`,
            icon: 'FileText',
            section: t('analytics') || 'Analytics',
          },

          // System Section
          {
            label: t('payments'),
            href: `/${locale}/admin/payments`,
            icon: 'CreditCard',
            section: t('system') || 'System',
          },
          {
            label: t('support'),
            href: `/${locale}/admin/support`,
            icon: 'MessageSquare',
            section: t('system') || 'System',
          },
          {
            label: t('settings'),
            href: `/${locale}/admin/settings`,
            icon: 'Settings',
            section: t('system') || 'System',
          },
        ]
      : [
          // Business Owner Items
          {
            label: t('dashboard'),
            href: `/${locale}/business`,
            icon: 'LayoutDashboard',
          },
          {
            label: t('myBusiness'),
            href: `/${locale}/business/profile`,
            icon: 'Store',
          },
          {
            label: t('vouchers'),
            href: `/${locale}/business/vouchers`,
            icon: 'Ticket',
          },
          {
            label: t('schedule'),
            href: `/${locale}/business/schedule`,
            icon: 'Calendar',
          },
          {
            label: t('analytics'),
            href: `/${locale}/business/analytics`,
            icon: 'ChartColumn',
          },
          {
            label: t('settings'),
            href: `/${locale}/business/settings`,
            icon: 'Settings',
          },
        ]

  const sidebarContent = (
    <ModernSidebarNav
      navItems={navItems}
      footer={<div className="text-xs text-gray-500">{APP_CONFIG.copyright}</div>}
    />
  )

  const headerContent = <DashboardHeader user={user} locale={locale} />

  return (
    <ResponsiveDashboardLayout sidebar={sidebarContent} header={headerContent}>
      <Suspense fallback={<LoadingSkeleton />}>{children}</Suspense>
    </ResponsiveDashboardLayout>
  )
}

// Metadata generation
export async function generateMetadata({ params }: ModernDashboardLayoutProps) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t('dashboard.title'),
    description: t('dashboard.description'),
  }
}
