'use client'

import React from 'react'
import Sidebar from '@/components/ui/sidebar'
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
          <div className="flex justify-center w-full">
            <h1 className="text-base text-gray-900 tracking-wide">
              <span className="font-black">THE VOUCHER</span>
              <span className="font-light">BOOK</span>
            </h1>
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
