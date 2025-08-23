'use client'

import { useEffect, useRef, useState } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from '@tanstack/react-table'
import { Spin, Empty, Checkbox } from 'antd'
import { useTranslations } from 'next-intl'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VirtualizedDataGridProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  loading?: boolean
  rowHeight?: number
  overscan?: number
  onRowClick?: (row: T) => void
  selectable?: boolean
  selectedRowKeys?: React.Key[]
  onSelectionChange?: (keys: React.Key[]) => void
  className?: string
}

export function VirtualizedDataGrid<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  rowHeight = 50,
  overscan = 5,
  onRowClick,
  selectable = false,
  selectedRowKeys = [],
  onSelectionChange,
  className,
}: VirtualizedDataGridProps<T>) {
  const t = useTranslations()
  const parentRef = useRef<HTMLDivElement>(null)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})

  // Convert selectedRowKeys to rowSelection format
  useEffect(() => {
    if (selectable && selectedRowKeys) {
      const newSelection: Record<string, boolean> = {}
      selectedRowKeys.forEach(key => {
        newSelection[String(key)] = true
      })
      setRowSelection(newSelection)
    }
  }, [selectedRowKeys, selectable])

  // Add selection column if selectable
  const tableColumns = selectable
    ? [
        {
          id: 'select',
          header: ({ table }: { table: any }) => (
            <Checkbox
              checked={table.getIsAllRowsSelected()}
              indeterminate={table.getIsSomeRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
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
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: selectable,
  })

  const { rows } = table.getRowModel()

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan,
  })

  const virtualRows = virtualizer.getVirtualItems()
  const totalSize = virtualizer.getTotalSize()

  // Handle selection changes
  useEffect(() => {
    if (selectable && onSelectionChange) {
      const selectedKeys = Object.keys(rowSelection).filter(key => rowSelection[key])
      onSelectionChange(selectedKeys)
    }
  }, [rowSelection, selectable, onSelectionChange])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spin size="large" />
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <Empty description={t('message.noData')} />
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden bg-white rounded-lg border', className)}>
      {/* Table Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="flex">
          {table.getHeaderGroups().map(headerGroup => (
            headerGroup.headers.map(header => (
              <div
                key={header.id}
                className={cn(
                  'flex items-center px-4 py-3 font-medium text-gray-700 bg-gray-50',
                  header.column.getCanSort() && 'cursor-pointer hover:bg-gray-100'
                )}
                style={{
                  width: header.getSize() || 'auto',
                  flex: header.column.columnDef.size ? `0 0 ${header.column.columnDef.size}px` : '1 1 auto',
                }}
                onClick={header.column.getToggleSortingHandler()}
              >
                {header.isPlaceholder ? null : (
                  <>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getCanSort() && (
                      <span className="ml-2">
                        {header.column.getIsSorted() === 'asc' ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : header.column.getIsSorted() === 'desc' ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <div className="w-4 h-4" />
                        )}
                      </span>
                    )}
                  </>
                )}
              </div>
            ))
          ))}
        </div>
      </div>

      {/* Virtual Scrolling Container */}
      <div
        ref={parentRef}
        className="overflow-auto"
        style={{ height: '600px' }}
      >
        <div
          style={{
            height: `${totalSize}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualRows.map(virtualRow => {
            const row = rows[virtualRow.index]
            return (
              <div
                key={row.id}
                className={cn(
                  'absolute top-0 left-0 w-full flex border-b hover:bg-gray-50',
                  onRowClick && 'cursor-pointer'
                )}
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                onClick={() => onRowClick?.(row.original)}
              >
                {row.getVisibleCells().map(cell => (
                  <div
                    key={cell.id}
                    className="flex items-center px-4 py-2"
                    style={{
                      width: cell.column.getSize() || 'auto',
                      flex: cell.column.columnDef.size ? `0 0 ${cell.column.columnDef.size}px` : '1 1 auto',
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer with row count */}
      <div className="sticky bottom-0 z-10 bg-white border-t px-4 py-2">
        <div className="text-sm text-gray-600">
          {t('table.totalRows', { count: rows.length })}
          {selectable && Object.keys(rowSelection).length > 0 && (
            <span className="ml-4">
              {t('table.selectedCount', { count: Object.keys(rowSelection).length })}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}