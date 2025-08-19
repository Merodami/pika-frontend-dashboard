'use client'

import React, { createContext, useContext, useEffect } from 'react'
import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import { useSidebarState } from '@/lib/stores/ui-store'
import { useResponsive } from '@/lib/hooks/useResponsive'
import {
  sidebarVariants,
  sidebarItemVariants,
  sidebarOverlayVariants,
} from './sidebar-variants'
import type { VariantProps } from 'class-variance-authority'

// Sidebar Context
interface SidebarContextValue {
  isOpen: boolean
  isCollapsed: boolean
  isMobile: boolean
  toggle: () => void
  close: () => void
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined)

const useSidebarContext = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('Sidebar components must be used within SidebarProvider')
  }
  return context
}

// Types
interface SidebarProviderProps extends VariantProps<typeof sidebarVariants> {
  children: React.ReactNode
  className?: string
}

interface SidebarItemProps extends VariantProps<typeof sidebarItemVariants> {
  href: string
  icon?: React.ReactNode
  label: string
  badge?: string | number
  onClick?: () => void
  className?: string
}

// Main Sidebar Provider Component
export function SidebarProvider({ children }: SidebarProviderProps) {
  const sidebar = useSidebarState()
  const { isMobile } = useResponsive()
  const pathname = usePathname()

  // Close mobile sidebar on route change
  useEffect(() => {
    if (isMobile) {
      sidebar.setMobileOpen(false)
    }
  }, [pathname, isMobile, sidebar])

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobile && sidebar.isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobile, sidebar.isMobileOpen])

  const contextValue: SidebarContextValue = {
    isOpen: isMobile ? sidebar.isMobileOpen : sidebar.isOpen,
    isCollapsed: !isMobile && sidebar.isCollapsed,
    isMobile,
    toggle: () => {
      if (isMobile) {
        sidebar.setMobileOpen(!sidebar.isMobileOpen)
      } else {
        sidebar.toggle()
      }
    },
    close: () => {
      if (isMobile) {
        sidebar.setMobileOpen(false)
      }
    },
  }

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  )
}

// Sidebar Trigger Button
export function SidebarTrigger({ className }: { className?: string }) {
  const { isOpen, toggle } = useSidebarContext()

  return (
    <button
      onClick={toggle}
      className={cn(
        'p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden',
        'text-gray-700 hover:text-gray-900', // Dark color for visibility
        className
      )}
      aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
    >
      {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
    </button>
  )
}

// Sidebar Collapse Toggle
export function SidebarCollapseToggle({ className }: { className?: string }) {
  const sidebar = useSidebarState()
  const { isMobile } = useSidebarContext()

  if (isMobile) return null

  return (
    <button
      onClick={() => sidebar.collapse(!sidebar.isCollapsed)}
      className={cn(
        'p-2 rounded-lg hover:bg-gray-100 transition-colors',
        className
      )}
      aria-label={sidebar.isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
    >
      {sidebar.isCollapsed ? (
        <ChevronRight className="w-5 h-5" />
      ) : (
        <ChevronLeft className="w-5 h-5" />
      )}
    </button>
  )
}

// Sidebar Overlay (for mobile)
export function SidebarOverlay() {
  const { isOpen, isMobile, close } = useSidebarContext()

  if (!isMobile) return null

  return (
    <div
      className={cn(sidebarOverlayVariants({ visible: isOpen }), 'lg:hidden')}
      onClick={close}
      aria-hidden="true"
    />
  )
}

// Main Sidebar Component
export function Sidebar({ children, className }: SidebarProviderProps) {
  const { isOpen, isCollapsed, isMobile } = useSidebarContext()

  return (
    <aside
      className={cn(
        // Base styles
        'flex flex-col bg-white border-r border-gray-200 transition-all duration-300',
        // Width
        isMobile ? 'w-64' : isCollapsed ? 'w-14' : 'w-48',
        // Position for mobile
        isMobile && [
          'fixed inset-y-0 left-0 z-50',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        ],
        // Position for desktop
        !isMobile && 'relative translate-x-0',
        // Custom styles
        className
      )}
    >
      {children}
    </aside>
  )
}

// Sidebar Logo
export function SidebarLogo({ className }: { className?: string }) {
  const { isCollapsed } = useSidebarContext()

  // Hide logo completely when collapsed
  if (isCollapsed) return null

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
        <span className="text-white font-bold">P</span>
      </div>
      <span className="font-semibold text-gray-900">Pika</span>
    </div>
  )
}

// Sidebar Header
export function SidebarHeader({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { isCollapsed } = useSidebarContext()

  return (
    <div
      className={cn(
        'relative flex items-center h-12 border-b border-gray-200',
        isCollapsed ? 'justify-center px-2' : 'justify-between px-3',
        className
      )}
    >
      {children}
    </div>
  )
}

// Sidebar Content
export function SidebarContent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <nav
      className={cn('flex-1 overflow-y-auto px-2 py-2 space-y-0.5', className)}
    >
      {children}
    </nav>
  )
}

// Sidebar Footer
export function SidebarFooter({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { isCollapsed } = useSidebarContext()

  return (
    <div
      className={cn(
        'border-t border-gray-200 px-3 py-2',
        isCollapsed && 'px-1',
        className
      )}
    >
      {children}
    </div>
  )
}

// Sidebar Item
export function SidebarItem({
  href,
  icon,
  label,
  badge,
  onClick,
  className,
  state: stateProp,
  size = 'md',
  variant = 'default',
}: SidebarItemProps) {
  const pathname = usePathname()
  const { isCollapsed, close } = useSidebarContext()

  // Check if this is the exact path or a subpath (but not a parent path)
  // For dashboard routes, only match exact path to prevent false positives
  const isDashboard = href.endsWith('/admin') || href.endsWith('/business')
  const isActive = isDashboard
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`)

  const state = stateProp || (isActive ? 'active' : 'inactive')

  const handleClick = () => {
    onClick?.()
    close() // Close mobile sidebar after navigation
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        sidebarItemVariants({ state, size, variant }),
        isCollapsed && 'justify-center px-2',
        className
      )}
      title={isCollapsed ? label : undefined}
    >
      {icon && (
        <span className={cn('flex-shrink-0', isCollapsed && 'mx-auto')}>
          {icon}
        </span>
      )}

      {!isCollapsed && (
        <>
          <span className="flex-1 truncate">{label}</span>
          {badge && (
            <span
              className={cn(
                'ml-auto text-xs font-medium px-2 py-0.5 rounded-full',
                state === 'active'
                  ? 'bg-gray-200 text-gray-700'
                  : 'bg-gray-100 text-gray-600'
              )}
            >
              {badge}
            </span>
          )}
        </>
      )}
    </Link>
  )
}

// Sidebar Section (for grouping items)
export function SidebarSection({
  title,
  children,
  className,
}: {
  title?: string
  children: React.ReactNode
  className?: string
}) {
  const { isCollapsed } = useSidebarContext()

  return (
    <div className={cn('space-y-0.5 mb-2', className)}>
      {title && !isCollapsed && (
        <h3 className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {title}
        </h3>
      )}
      {children}
    </div>
  )
}

// Export all components
// Export all components
const SidebarComponents = {
  Provider: SidebarProvider,
  Root: Sidebar,
  Trigger: SidebarTrigger,
  CollapseToggle: SidebarCollapseToggle,
  Overlay: SidebarOverlay,
  Logo: SidebarLogo,
  Header: SidebarHeader,
  Content: SidebarContent,
  Footer: SidebarFooter,
  Item: SidebarItem,
  Section: SidebarSection,
}

export default SidebarComponents
