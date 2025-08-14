'use client'

import { useSidebarState } from '@/lib/stores/ui-store'

export function SidebarDebug() {
  const sidebar = useSidebarState()
  
  if (process.env.NODE_ENV !== 'development') return null
  
  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-2 rounded text-xs z-[100]">
      <div>Mobile Open: {sidebar.isMobileOpen ? 'Yes' : 'No'}</div>
      <div>Desktop Open: {sidebar.isOpen ? 'Yes' : 'No'}</div>
      <div>Collapsed: {sidebar.isCollapsed ? 'Yes' : 'No'}</div>
    </div>
  )
}