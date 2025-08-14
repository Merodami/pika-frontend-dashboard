'use client'

import React from 'react'
import Sidebar from '@/components/ui/responsive-sidebar'
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

export function ModernSidebarNav({ navItems, footer }: ModernSidebarNavProps) {
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
        <Sidebar.Logo />
        <Sidebar.CollapseToggle />
      </Sidebar.Header>

      {/* Sidebar Content */}
      <Sidebar.Content>
        {Object.entries(sections).map(([sectionName, items]) => (
          <Sidebar.Section
            key={sectionName}
            title={sectionName !== 'main' ? sectionName : undefined}
          >
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
          </Sidebar.Section>
        ))}
      </Sidebar.Content>

      {/* Sidebar Footer */}
      {footer && <Sidebar.Footer>{footer}</Sidebar.Footer>}
    </>
  )
}
