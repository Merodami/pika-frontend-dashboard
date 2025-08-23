'use client'

import React from 'react'
import Sidebar from '@/components/ui/sidebar'
import { cn } from '@/lib/utils/cn'

interface ResponsiveDashboardLayoutProps {
  children: React.ReactNode
  sidebar: React.ReactNode
  header: React.ReactNode
}

export function ResponsiveDashboardLayout({
  children,
  sidebar,
  header,
}: ResponsiveDashboardLayoutProps) {
  return (
    <Sidebar.Provider>
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar.Root>{sidebar}</Sidebar.Root>

        {/* Header */}
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
          <div
            className={cn(
              'container mx-auto',
              'px-4 sm:px-6 lg:px-8',
              'py-4 sm:py-6 lg:py-8',
              'max-w-7xl'
            )}
          >
            {children}
          </div>
        </main>
      </div>
    </Sidebar.Provider>
  )
}
