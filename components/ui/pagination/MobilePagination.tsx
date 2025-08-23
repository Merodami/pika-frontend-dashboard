'use client'

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils/cn'
import { useResponsive } from '@/lib/hooks/useResponsive'

interface MobilePaginationProps {
  current: number
  total: number
  pageSize: number
  totalItems: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  className?: string
}

export function MobilePagination({
  current,
  total,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  className
}: MobilePaginationProps) {
  const t = useTranslations()
  const { isMobile } = useResponsive()

  const canPreviousPage = current > 1
  const canNextPage = current < total

  const startItem = (current - 1) * pageSize + 1
  const endItem = Math.min(current * pageSize, totalItems)

  // Debug logging
  console.log('📄 Pagination Debug:', { 
    current, 
    total, 
    pageSize, 
    totalItems, 
    canPreviousPage, 
    canNextPage,
    startItem,
    endItem 
  })

  // Mobile-first design
  if (isMobile) {
    return (
      <div className={cn('bg-white border-t border-gray-200', className)}>
        {/* Mobile Info Row */}
        <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-700">
          <span>
            {t('table.showingItems', {
              start: startItem,
              end: endItem,
              total: totalItems
            })}
          </span>
          
          {onPageSizeChange && (
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-sm bg-white"
            >
              {[10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size} / {t('common.page')}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <button
            onClick={() => {
              console.log('📄 Previous clicked:', { current, willGoTo: current - 1 })
              onPageChange(current - 1)
            }}
            disabled={!canPreviousPage}
            className={cn(
              'inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors',
              canPreviousPage
                ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                : 'text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed'
            )}
          >
            <ChevronLeft className="w-4 h-4" />
            {t('common.button.previous')}
          </button>

          <span className="text-sm font-medium text-gray-700">
            {t('table.pageOf', { current, total })}
          </span>

          <button
            onClick={() => {
              console.log('📄 Next clicked:', { current, willGoTo: current + 1 })
              onPageChange(current + 1)
            }}
            disabled={!canNextPage}
            className={cn(
              'inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors',
              canNextPage
                ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                : 'text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed'
            )}
          >
            {t('common.button.next')}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  // Desktop design - more comprehensive
  const getVisiblePages = () => {
    const pages = []
    const delta = 2 // Number of pages to show on each side of current page

    // Always show first page
    pages.push(1)

    // Show pages around current page
    const start = Math.max(2, current - delta)
    const end = Math.min(total - 1, current + delta)

    // Add ellipsis if needed
    if (start > 2) {
      pages.push('...')
    }

    // Add pages around current
    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== total) {
        pages.push(i)
      }
    }

    // Add ellipsis if needed
    if (end < total - 1) {
      pages.push('...')
    }

    // Always show last page (if more than 1 page)
    if (total > 1) {
      pages.push(total)
    }

    return pages
  }

  return (
    <div className={cn('flex items-center justify-between bg-white border-t border-gray-200 px-4 py-3 sm:px-6', className)}>
      <div className="flex-1 flex justify-between sm:hidden">
        {/* Mobile fallback */}
        <button
          onClick={() => onPageChange(current - 1)}
          disabled={!canPreviousPage}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t('common.button.previous')}
        </button>
        <button
          onClick={() => onPageChange(current + 1)}
          disabled={!canNextPage}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t('common.button.next')}
        </button>
      </div>

      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center space-x-4">
          <p className="text-sm text-gray-700">
            {t('table.showingItems', {
              start: startItem,
              end: endItem,
              total: totalItems
            })}
          </p>
          
          {onPageSizeChange && (
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-700">
                {t('table.itemsPerPage')}:
              </label>
              <select
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 text-sm bg-white"
              >
                {[10, 20, 30, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            {/* First page */}
            <button
              onClick={() => onPageChange(1)}
              disabled={!canPreviousPage}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>

            {/* Previous page */}
            <button
              onClick={() => onPageChange(current - 1)}
              disabled={!canPreviousPage}
              className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Page numbers */}
            {getVisiblePages().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' ? onPageChange(page) : undefined}
                disabled={page === '...'}
                className={cn(
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                  page === current
                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                    : page === '...'
                      ? 'bg-white border-gray-300 text-gray-700 cursor-default'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                )}
              >
                {page === '...' ? <MoreHorizontal className="w-4 h-4" /> : page}
              </button>
            ))}

            {/* Next page */}
            <button
              onClick={() => onPageChange(current + 1)}
              disabled={!canNextPage}
              className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Last page */}
            <button
              onClick={() => onPageChange(total)}
              disabled={!canNextPage}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}