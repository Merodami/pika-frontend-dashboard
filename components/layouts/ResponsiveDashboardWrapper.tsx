'use client'

import React, { useEffect } from 'react'
import Sidebar from '@/components/ui/sidebar'
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
  // Hydrate the store on mount and ensure it's properly initialized
  useEffect(() => {
    useUIStore.persist.rehydrate()
  }, [])

  return (
    <Sidebar.Provider>
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar.Root>{sidebar}</Sidebar.Root>

        {/* Header with Mobile Menu Toggle */}
        <header className="lg:pl-64 sticky top-0 z-30 h-16 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">
            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <Sidebar.Toggle />
            </div>

            {/* Header Content */}
            <div className="flex-1">{header}</div>
          </div>
        </header>

        {/* Main Content */}
        <main className="lg:pl-64">
          <div className="py-6">
            <div className="px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </Sidebar.Provider>
  )
}
