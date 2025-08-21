'use client'

import React, { useEffect } from 'react'
import Sidebar from '@/components/ui/responsive-sidebar'
import { useUIStore } from '@/lib/stores/ui-store'

interface ResponsiveDashboardWrapperProps {
  children: React.ReactNode
  sidebar: React.ReactNode
  header: React.ReactNode
}

export function ResponsiveDashboardWrapper({
  children,
  sidebar,
  header,
}: ResponsiveDashboardWrapperProps) {
  // Hydrate the store on mount
  useEffect(() => {
    useUIStore.persist.rehydrate()
  }, [])

  return (
    <Sidebar.Provider>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Overlay */}
        <Sidebar.Overlay />

        {/* Header with Mobile Menu Toggle */}
        <header className="sticky top-0 z-30 h-12 bg-white border-b border-gray-200">
          <div className="flex items-center h-full px-3 sm:px-4 lg:px-6">
            {/* Mobile Menu Toggle - Dark color for visibility */}
            <Sidebar.Trigger />

            {/* Header Content */}
            <div className="flex-1">{header}</div>
          </div>
        </header>

        {/* Main Layout */}
        <div className="flex h-[calc(100vh-3rem)]">
          {/* Sidebar */}
          <Sidebar.Root>{sidebar}</Sidebar.Root>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="w-full">{children}</div>
          </main>
        </div>
      </div>
    </Sidebar.Provider>
  )
}
