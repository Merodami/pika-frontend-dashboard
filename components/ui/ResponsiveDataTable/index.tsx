'use client'

import React, { useState } from 'react'
import { Table, Card, Button, Space, Empty, Skeleton } from 'antd'
import type { TableProps, ColumnType } from 'antd/es/table'
import { MoreVertical, Download, RefreshCw } from 'lucide-react'
import { useResponsive } from '@/lib/hooks/useResponsive'
import { cn } from '@/lib/utils/cn'

interface ResponsiveDataTableProps<T> extends Omit<TableProps<T>, 'title'> {
  title?: string
  description?: string
  actions?: React.ReactNode
  bulkActions?: React.ReactNode
  showRefresh?: boolean
  onRefresh?: () => void
  exportable?: boolean
  onExport?: () => void
  mobileCardRender?: (record: T) => React.ReactNode
  searchable?: boolean
  searchPlaceholder?: string
  onSearch?: (value: string) => void
}

export function ResponsiveDataTable<T extends Record<string, any>>({
  title,
  description,
  actions,
  bulkActions,
  showRefresh,
  onRefresh,
  exportable,
  onExport,
  mobileCardRender,
  searchable,
  searchPlaceholder,
  onSearch,
  columns = [],
  dataSource = [],
  loading = false,
  ...tableProps
}: ResponsiveDataTableProps<T>) {
  const { isMobile, isTablet } = useResponsive()
  const [searchValue, setSearchValue] = useState('')

  // Mobile view - Card layout
  if (isMobile && mobileCardRender) {
    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col space-y-4">
          <div>
            {title && (
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            )}
            {description && (
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex flex-wrap gap-2">
            {searchable && (
              <input
                type="search"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value)
                  onSearch?.(e.target.value)
                }}
                className={cn(
                  'flex-1 min-w-[200px] px-3 py-2 text-sm',
                  'border border-gray-300 rounded-lg',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500'
                )}
              />
            )}
            {actions}
            {showRefresh && (
              <Button
                icon={<RefreshCw className="w-4 h-4" />}
                onClick={onRefresh}
                className="shrink-0"
              />
            )}
          </div>
        </div>

        {/* Bulk Actions */}
        {bulkActions && (
          <div className="sticky top-16 z-10 bg-white p-2 border rounded-lg shadow-sm">
            {bulkActions}
          </div>
        )}

        {/* Cards */}
        <div className="space-y-3">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 5 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <Skeleton active paragraph={{ rows: 3 }} />
              </Card>
            ))
          ) : dataSource.length === 0 ? (
            <Empty description="No data" />
          ) : (
            dataSource.map((record, index) => (
              <Card
                key={
                  typeof tableProps.rowKey === 'function'
                    ? tableProps.rowKey(record)
                    : tableProps.rowKey
                      ? record[tableProps.rowKey as keyof T]
                      : index
                }
                className={cn(
                  'transition-all duration-200',
                  'hover:shadow-md hover:border-blue-200'
                )}
              >
                {mobileCardRender(record)}
              </Card>
            ))
          )}
        </div>

        {/* Mobile Pagination */}
        {tableProps.pagination && (
          <div className="flex justify-center">
            <Table
              {...tableProps}
              dataSource={[]}
              columns={[]}
              showHeader={false}
              className="mobile-pagination-only"
            />
          </div>
        )}
      </div>
    )
  }

  // Tablet view - Simplified columns
  const responsiveColumns = isTablet
    ? columns.filter((col: any) => !col.hideOnTablet)
    : columns

  // Desktop and Tablet view - Table layout
  return (
    <div className="space-y-4">
      {/* Header */}
      <div
        className={cn(
          'flex flex-col gap-4',
          'sm:flex-row sm:items-center sm:justify-between'
        )}
      >
        <div>
          {title && (
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          )}
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
        </div>

        {/* Desktop Actions */}
        <Space wrap>
          {searchable && (
            <input
              type="search"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value)
                onSearch?.(e.target.value)
              }}
              className={cn(
                'px-3 py-1.5 text-sm',
                'border border-gray-300 rounded-lg',
                'focus:outline-none focus:ring-2 focus:ring-blue-500',
                'w-48 lg:w-64'
              )}
            />
          )}
          {actions}
          {exportable && (
            <Button icon={<Download className="w-4 h-4" />} onClick={onExport}>
              Export
            </Button>
          )}
          {showRefresh && (
            <Button
              icon={<RefreshCw className="w-4 h-4" />}
              onClick={onRefresh}
            />
          )}
        </Space>
      </div>

      {/* Bulk Actions */}
      {bulkActions && (
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
          {bulkActions}
        </div>
      )}

      {/* Table */}
      <div
        className={cn(
          'overflow-x-auto',
          isTablet && 'scrollbar-thin scrollbar-thumb-gray-300'
        )}
      >
        <Table
          {...tableProps}
          columns={responsiveColumns}
          dataSource={dataSource}
          loading={loading}
          className={cn('whitespace-nowrap', isTablet && 'min-w-[600px]')}
        />
      </div>
    </div>
  )
}

// Helper component for mobile card actions
export function MobileCardActions({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className={cn('relative', className)}>
      <Button
        type="text"
        icon={<MoreVertical className="w-4 h-4" />}
        onClick={() => setOpen(!open)}
        className="p-1"
      />
      {open && (
        <div
          className={cn(
            'absolute right-0 top-8 z-10',
            'bg-white rounded-lg shadow-lg border',
            'py-1 min-w-[150px]'
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}

// Helper function to create mobile card from table columns
export function createMobileCard<T extends Record<string, any>>(
  columns: ColumnType<T>[],
  actions?: (record: T) => React.ReactNode
) {
  return (record: T) => (
    <div className="space-y-3">
      {/* Primary info - usually first 2-3 columns */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          {columns.slice(0, 3).map((col: any) => {
            const dataIndex = col.dataIndex as keyof T
            return (
              <div key={col.key || String(dataIndex)}>
                <span className="text-xs text-gray-500">{col.title}: </span>
                <span className="text-sm font-medium">
                  {col.render
                    ? col.render(record[dataIndex], record, 0)
                    : record[dataIndex]}
                </span>
              </div>
            )
          })}
        </div>

        {/* Actions */}
        {actions && <MobileCardActions>{actions(record)}</MobileCardActions>}
      </div>

      {/* Secondary info - remaining columns */}
      {columns.length > 3 && (
        <div className="pt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
          {columns.slice(3).map((col: any) => {
            const dataIndex = col.dataIndex as keyof T
            return (
              <div key={col.key || String(dataIndex)} className="text-sm">
                <span className="text-gray-500">{col.title}: </span>
                <span>
                  {col.render
                    ? col.render(record[dataIndex], record, 0)
                    : record[dataIndex]}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
