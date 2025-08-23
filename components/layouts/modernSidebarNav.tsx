'use client'

import React from 'react'
import Sidebar from '@/components/ui/sidebar'
import { APP_CONFIG } from '@/lib/constants/app'
import {
  LayoutDashboard,
  Users,
  Building2,
  Ticket,
  BookOpen,
  BarChart3,
  Settings,
  FileText,
  CreditCard,
  MessageSquare,
  Store,
  Calendar,
  ChartColumn,
  type LucideIcon,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Users,
  Building2,
  Ticket,
  BookOpen,
  BarChart3,
  Settings,
  FileText,
  CreditCard,
  MessageSquare,
  Store,
  Calendar,
  ChartColumn,
}

export interface NavItem {
  href: string
  label: string
  icon: string | LucideIcon
  badge?: string | number
  section?: string
}

interface ModernSidebarNavProps {
  navItems: NavItem[]
  logo?: React.ReactNode
  footer?: React.ReactNode
}

export function ModernSidebarNav({ navItems, logo, footer }: ModernSidebarNavProps) {
  // Group items by section
  const sections = navItems.reduce(
    (acc, item) => {
      const section = item.section || 'main'
      if (!acc[section]) {
        acc[section] = []
      }
      acc[section].push(item)
      return acc
    },
    {} as Record<string, NavItem[]>
  )

  return (
    <>
      {/* Sidebar Header */}
      <Sidebar.Header>
        {logo || (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">
                {APP_CONFIG.branding.logo.icon}
              </span>
            </div>
            <span className="font-semibold text-gray-900">
              {APP_CONFIG.branding.logo.text}
            </span>
          </div>
        )}
      </Sidebar.Header>

      {/* Sidebar Content */}
      <Sidebar.Content>
        {Object.entries(sections).map(([sectionName, items]) => (
          <div key={sectionName} className="space-y-1">
            {sectionName !== 'main' && (
              <div className="px-3 py-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {sectionName}
                </h3>
              </div>
            )}
            {items.map((item) => {
              // Get the icon
              let Icon: LucideIcon | undefined
              if (typeof item.icon === 'string') {
                Icon = iconMap[item.icon]
              } else {
                Icon = item.icon
              }

              return (
                <Sidebar.Item
                  key={item.href}
                  href={item.href}
                  icon={Icon && <Icon className="w-5 h-5" />}
                  label={item.label}
                  badge={item.badge}
                />
              )
            })}
          </div>
        ))}
      </Sidebar.Content>

      {/* Sidebar Footer */}
      {footer && <Sidebar.Footer>{footer}</Sidebar.Footer>}
    </>
  )
}
