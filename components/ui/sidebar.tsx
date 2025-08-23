'use client'

import React, { createContext, useContext, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import { useSidebarState } from '@/lib/stores/ui-store'
import { useResponsive } from '@/lib/hooks/useResponsive'
import { APP_CONFIG } from '@/lib/constants/app'

// Types
interface SidebarContextType {
  isOpen: boolean
  isMobile: boolean
  toggle: () => void
  close: () => void
}

interface SidebarItemProps {
  href: string
  icon?: React.ReactNode
  label: string
  badge?: string | number
  className?: string
}

// Context
const SidebarContext = createContext<SidebarContextType | null>(null)

const useSidebarContext = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('Sidebar components must be used within SidebarProvider')
  }
  return context
}

// Provider Component
export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const { isMobile } = useResponsive()
  const { 
    isOpen, 
    isMobileOpen, 
    toggle, 
    setMobileOpen 
  } = useSidebarState()
  const pathname = usePathname()
  

  // Close mobile sidebar on route change
  useEffect(() => {
    if (isMobile && isMobileOpen) {
      setMobileOpen(false)
    }
  }, [pathname, isMobile, setMobileOpen])

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobile && isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobile, isMobileOpen])

  const contextValue: SidebarContextType = {
    isOpen: isMobile ? isMobileOpen : isOpen,
    isMobile,
    toggle: () => {
      if (isMobile) {
        setMobileOpen(!isMobileOpen)
      } else {
        toggle()
      }
    },
    close: () => {
      if (isMobile) {
        setMobileOpen(false)
      }
    }
  }

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  )
}

// Mobile Overlay
function SidebarOverlay() {
  const { isOpen, isMobile, close } = useSidebarContext()

  const handleOverlayClick = () => {
    close()
  }

  if (!isMobile || !isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-40 bg-black/50 lg:hidden"
      onClick={handleOverlayClick}
      aria-hidden="true"
    />
  )
}

// Mobile Toggle Button
function SidebarToggle({ className }: { className?: string }) {
  const { toggle } = useSidebarContext()

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggle()
  }

  return (
    <button
      onClick={handleToggle}
      className={cn(
        'inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500',
        className
      )}
      aria-label="Toggle sidebar"
    >
      <Menu className="h-6 w-6" />
    </button>
  )
}

// Main Sidebar
function Sidebar({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  const { isOpen } = useSidebarContext()

  return (
    <>
      <SidebarOverlay />
      
      {/* Desktop Sidebar */}
      <div
        className={cn(
          'hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0',
          className
        )}
      >
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          {children}
        </div>
      </div>

      {/* Mobile Sidebar - Full Width */}
      <div
        className={cn(
          'lg:hidden',
          'fixed inset-0 z-50',
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        <div
          className={cn(
            'relative w-full h-full bg-white transition-transform duration-300 ease-in-out flex flex-col',
            isOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          {/* Mobile Header with Centered Brand and Close Button */}
          <div className="relative flex items-center p-4 border-b border-gray-200">            
            {/* Centered Brand - Absolutely positioned for true centering */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">{APP_CONFIG.branding.logo.icon}</span>
              </div>
              <span className="font-semibold text-gray-900 text-lg">{APP_CONFIG.branding.logo.text}</span>
            </div>
            
            {/* Close Button - Right aligned */}
            <button
              type="button"
              className="ml-auto inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => useSidebarContext().close()}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

// Sidebar Header
function SidebarHeader({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  const { isMobile } = useResponsive() // Use the hook directly for more responsive updates
  
  // On mobile, don't render the header since we show the brand in the mobile header
  if (isMobile) {
    return null
  }
  
  return (
    <div className={cn('flex h-16 flex-shrink-0 items-center px-4', className)}>
      {children}
    </div>
  )
}

// Sidebar Content/Navigation
function SidebarContent({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <nav className={cn('mt-5 flex-1 space-y-1 px-2', className)}>
      {children}
    </nav>
  )
}

// Sidebar Navigation Item
function SidebarItem({ 
  href, 
  icon, 
  label, 
  badge,
  className 
}: SidebarItemProps) {
  const pathname = usePathname()
  const { close } = useSidebarContext()
  
  const isActive = pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      onClick={close}
      className={cn(
        'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
        isActive
          ? 'bg-gray-100 text-gray-900'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
        className
      )}
    >
      {icon && (
        <div className={cn(
          'mr-3 flex-shrink-0 h-6 w-6',
          isActive ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'
        )}>
          {icon}
        </div>
      )}
      
      <span className="flex-1">{label}</span>
      
      {badge && (
        <span className={cn(
          'ml-3 inline-block py-0.5 px-3 text-xs font-medium rounded-full',
          isActive
            ? 'bg-white text-gray-900'
            : 'bg-gray-100 text-gray-900 group-hover:bg-gray-200'
        )}>
          {badge}
        </span>
      )}
    </Link>
  )
}

// Sidebar Footer
function SidebarFooter({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <div className={cn('flex flex-shrink-0 border-t border-gray-200 p-4', className)}>
      {children}
    </div>
  )
}

// Export compound component
export const SidebarComponents = {
  Provider: SidebarProvider,
  Root: Sidebar,
  Header: SidebarHeader,
  Content: SidebarContent,
  Item: SidebarItem,
  Footer: SidebarFooter,
  Toggle: SidebarToggle,
}

export default SidebarComponents