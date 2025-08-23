'use client'

import { useState } from 'react'
import { Filter, X, RotateCcw } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils/cn'
import { useResponsive } from '@/lib/hooks/useResponsive'

interface MobileFilterDrawerProps {
  children: React.ReactNode
  activeFiltersCount?: number
  onReset?: () => void
  className?: string
}

export function MobileFilterDrawer({ 
  children, 
  activeFiltersCount = 0, 
  onReset,
  className 
}: MobileFilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { isMobile } = useResponsive()
  const t = useTranslations()

  // On desktop, render filters directly without drawer
  if (!isMobile) {
    return (
      <div className={cn('bg-white rounded-lg border border-gray-200 p-4 mb-4', className)}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">
            {t('common.filters')} 
            {activeFiltersCount > 0 && (
              <span className="ml-2 text-sm text-blue-600">
                ({activeFiltersCount})
              </span>
            )}
          </h3>
          {onReset && activeFiltersCount > 0 && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              {t('common.button.reset')}
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {children}
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="mb-4">
        <button
          onClick={() => setIsOpen(true)}
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm',
            'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
            'transition-colors duration-200',
            activeFiltersCount > 0 && 'border-blue-500 bg-blue-50 text-blue-700'
          )}
        >
          <Filter className="w-4 h-4" />
          <span className="font-medium">
            {t('common.filters')}
            {activeFiltersCount > 0 && ` (${activeFiltersCount})`}
          </span>
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Drawer */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-xl max-h-[80vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-lg font-semibold text-gray-900">
                {t('common.filters')}
                {activeFiltersCount > 0 && (
                  <span className="ml-2 text-sm text-blue-600">
                    ({activeFiltersCount} {t('common.active')})
                  </span>
                )}
              </h2>
              
              <div className="flex items-center gap-2">
                {onReset && activeFiltersCount > 0 && (
                  <button
                    onClick={onReset}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    {t('common.button.reset')}
                  </button>
                )}
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {children}
              </div>
            </div>
            
            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                {t('common.button.cancel')}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                {t('common.button.apply')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}