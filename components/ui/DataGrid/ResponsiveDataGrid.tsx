'use client'

import { useEffect, useState } from 'react'
import { Card } from 'antd'
import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { ColumnDef } from '@tanstack/react-table'

interface ResponsiveDataGridProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  loading?: boolean
  onRowClick?: (row: T) => void
  mobileBreakpoint?: number
  renderMobileCard?: (item: T) => React.ReactNode
  keyExtractor?: (item: T) => string
}

export function ResponsiveDataGrid<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  onRowClick,
  mobileBreakpoint = 768,
  renderMobileCard,
  keyExtractor = (item) => item.id || JSON.stringify(item),
}: ResponsiveDataGridProps<T>) {
  const t = useTranslations()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [mobileBreakpoint])

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg h-24"></div>
          </div>
        ))}
      </div>
    )
  }

  if (!isMobile) {
    // Return null here as the desktop table will be rendered by the parent
    return null
  }

  // Mobile view with cards
  const defaultMobileCard = (item: T) => {
    // Extract primary info from columns
    const primaryColumn = columns[0]
    const secondaryColumn = columns[1]

    const getPrimaryValue = () => {
      if (primaryColumn && 'accessorKey' in primaryColumn) {
        return item[primaryColumn.accessorKey as keyof T]
      }
      return null
    }

    const getSecondaryValue = () => {
      if (secondaryColumn && 'accessorKey' in secondaryColumn) {
        return item[secondaryColumn.accessorKey as keyof T]
      }
      return null
    }

    return (
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium text-gray-900">
            {getPrimaryValue()?.toString() || 'N/A'}
          </div>
          <div className="text-sm text-gray-500">
            {getSecondaryValue()?.toString() || ''}
          </div>
        </div>
        {onRowClick && <ChevronRight className="w-5 h-5 text-gray-400" />}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {data.length === 0 ? (
        <Card className="text-center py-8">
          <div className="text-gray-500">{t('message.noData')}</div>
        </Card>
      ) : (
        data.map((item) => (
          <Card
            key={keyExtractor(item)}
            className={`${onRowClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
            onClick={() => onRowClick?.(item)}
            size="small"
          >
            {renderMobileCard
              ? renderMobileCard(item)
              : defaultMobileCard(item)}
          </Card>
        ))
      )}
    </div>
  )
}

// Hook to detect mobile viewport
export function useResponsive() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      setIsMobile(width < 640)
      setIsTablet(width >= 640 && width < 1024)
      setIsDesktop(width >= 1024)
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  return { isMobile, isTablet, isDesktop }
}
