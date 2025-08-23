'use client'

import { useCallback, useEffect, useRef } from 'react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table'
import { Spin, Empty, Checkbox, Button } from 'antd'
import { useTranslations } from 'next-intl'
import { ChevronUp, ChevronDown, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useIntersection } from '@/hooks/useIntersection'

interface InfiniteDataGridProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  loading?: boolean
  loadingMore?: boolean
  hasMore?: boolean
  onLoadMore?: () => void
  onRowClick?: (row: T) => void
  selectable?: boolean
  className?: string
  emptyMessage?: string
}

export function InfiniteDataGrid<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  loadingMore = false,
  hasMore = false,
  onLoadMore,
  onRowClick,
  selectable = false,
  className,
  emptyMessage,
}: InfiniteDataGridProps<T>) {
  const t = useTranslations()
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const isIntersecting = useIntersection(loadMoreRef, { threshold: 0.1 })

  // Load more when intersecting
  useEffect(() => {
    if (isIntersecting && hasMore && !loadingMore && onLoadMore) {
      onLoadMore()
    }
  }, [isIntersecting, hasMore, loadingMore, onLoadMore])

  // Add selection column if selectable
  const tableColumns = selectable
    ? [
        {
          id: 'select',
          header: ({ table }: { table: any }) => (
            <Checkbox
              checked={table.getIsAllPageRowsSelected()}
              indeterminate={table.getIsSomePageRowsSelected()}
              onChange={table.getToggleAllPageRowsSelectedHandler()}
            />
          ),
          cell: ({ row }: { row: any }) => (
            <Checkbox
              checked={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
              onClick={(e) => e.stopPropagation()}
            />
          ),
          size: 40,
        },
        ...columns,
      ]
    : columns

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: selectable,
    getRowId: (row) => row.id || JSON.stringify(row),
  })

  const handleRowClick = useCallback((row: T) => {
    if (onRowClick) {
      onRowClick(row)
    }
  }, [onRowClick])

  if (loading && data.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spin size="large" />
      </div>
    )
  }

  if (!loading && data.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <Empty description={emptyMessage || t('message.noData')} />
      </div>
    )
  }

  return (
    <div className={cn('relative bg-white rounded-lg border', className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="border-b bg-gray-50">
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className={cn(
                      'px-4 py-3 text-left font-medium text-gray-700',
                      header.column.getCanSort() && 'cursor-pointer hover:bg-gray-100'
                    )}
                    style={{
                      width: header.column.columnDef.size || 'auto',
                    }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <span className="ml-2">
                            {header.column.getIsSorted() === 'asc' ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : header.column.getIsSorted() === 'desc' ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : null}
                          </span>
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr
                key={row.id}
                className={cn(
                  'border-b hover:bg-gray-50 transition-colors',
                  onRowClick && 'cursor-pointer'
                )}
                onClick={() => handleRowClick(row.original)}
              >
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className="px-4 py-3"
                    style={{
                      width: cell.column.columnDef.size || 'auto',
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Load more trigger */}
      <div ref={loadMoreRef} className="h-1" />

      {/* Loading more indicator */}
      {loadingMore && (
        <div className="flex items-center justify-center py-4 border-t">
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
          <span className="text-sm text-gray-600">{t('common.loadingMore')}</span>
        </div>
      )}

      {/* Manual load more button */}
      {hasMore && !loadingMore && (
        <div className="flex items-center justify-center py-4 border-t">
          <Button onClick={onLoadMore} type="link">
            {t('common.loadMore')}
          </Button>
        </div>
      )}

      {/* End of list indicator */}
      {!hasMore && data.length > 0 && (
        <div className="flex items-center justify-center py-4 border-t">
          <span className="text-sm text-gray-500">{t('common.endOfList')}</span>
        </div>
      )}
    </div>
  )
}