'use client'

import { SidebarNav, type NavItem } from './sidebarNav'

interface BusinessSidebarClientProps {
  navItems: NavItem[]
}

export function BusinessSidebarClient({
  navItems,
}: BusinessSidebarClientProps) {
  return <SidebarNav navItems={navItems} />
}
