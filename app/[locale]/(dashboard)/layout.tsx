import { UserRole } from '@merodami/pika-types'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

import { requireDashboardAccess } from '@/app/services/authService'
import { ResponsiveDashboardWrapper } from '@/components/layouts/ResponsiveDashboardWrapper'
import { ModernSidebarNav } from '@/components/layouts/modernSidebarNav'
import { DashboardHeader } from '@/components/layouts/dashboardHeader'
import { LoadingSkeleton } from '@/components/ui/loadingSkeleton'
import type { Locale } from '@/i18n/config'
import { APP_CONFIG } from '@/lib/constants/app'

// Force dynamic rendering for authenticated routes
export const dynamic = 'force-dynamic'

interface DashboardLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  // Ensure user has dashboard access (admin or business only)
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
            section: 'Management',
          },
          {
            label: t('voucherBooks'),
            href: `/${locale}/admin/voucher-books`,
            icon: 'BookOpen',
            section: 'Management',
          },

          // Analytics Section
          {
            label: t('analytics'),
            href: `/${locale}/admin/analytics`,
            icon: 'BarChart3',
            section: 'Analytics',
          },
          {
            label: t('reports'),
            href: `/${locale}/admin/reports`,
            icon: 'FileText',
            section: 'Analytics',
          },

          // System Section
          {
            label: t('payments'),
            href: `/${locale}/admin/payments`,
            icon: 'CreditCard',
            section: 'System',
          },
          {
            label: t('support'),
            href: `/${locale}/admin/support`,
            icon: 'MessageSquare',
            section: 'System',
          },
          {
            label: t('settings'),
            href: `/${locale}/admin/settings`,
            icon: 'Settings',
            section: 'System',
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
      footer={
        <div className="text-xs text-gray-500 text-center">
          {APP_CONFIG.copyright}
        </div>
      }
    />
  )

  const headerContent = <DashboardHeader user={user} locale={locale} />

  return (
    <ResponsiveDashboardWrapper sidebar={sidebarContent} header={headerContent}>
      <Suspense fallback={<LoadingSkeleton />}>{children}</Suspense>
    </ResponsiveDashboardWrapper>
  )
}

// Parallel route for role-specific dashboards
export async function generateMetadata({ params }: DashboardLayoutProps) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t('dashboard.title'),
    description: t('dashboard.description'),
  }
}
