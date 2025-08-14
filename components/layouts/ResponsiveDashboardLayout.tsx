'use client'

import React from 'react'
import { useResponsive } from '@/lib/hooks/useResponsive'
import Sidebar from '@/components/ui/responsive-sidebar'
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
  const { isMobile } = useResponsive()

  return (
    <Sidebar.Provider>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Overlay */}
        <Sidebar.Overlay />
        
        {/* Header */}
        <header className={cn(
          'sticky top-0 z-30 h-16 bg-white border-b border-gray-200',
          'flex items-center px-4 sm:px-6 lg:px-8'
        )}>
          {/* Mobile Menu Toggle */}
          <Sidebar.Trigger className="mr-4" />
          
          {/* Header Content */}
          <div className="flex-1">{header}</div>
        </header>
        
        {/* Main Layout */}
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Sidebar */}
          <Sidebar.Root className="w-64">
            {sidebar}
          </Sidebar.Root>
          
          {/* Main Content */}
          <main className={cn(
            'flex-1 overflow-y-auto',
            'transition-all duration-300',
            !isMobile && 'lg:ml-0' // Adjust based on sidebar state
          )}>
            <div className={cn(
              'container mx-auto',
              'px-4 sm:px-6 lg:px-8',
              'py-4 sm:py-6 lg:py-8',
              'max-w-7xl'
            )}>
              {children}
            </div>
          </main>
        </div>
      </div>
    </Sidebar.Provider>
  )
}