'use client'

import { SidebarNav, type NavItem } from './sidebarNav'

interface AdminSidebarClientProps {
  navItems: NavItem[]
}

export function AdminSidebarClient({ navItems }: AdminSidebarClientProps) {
  return <SidebarNav navItems={navItems} />
}
