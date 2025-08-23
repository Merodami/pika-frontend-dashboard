'use client'

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'

import type { DataGridConfig, DataGridState } from '@/types/data-grid'

interface DataGridProps<T> extends DataGridConfig<T> {
  loading?: boolean
  className?: string
}

export function DataGrid<T>({
  data,
  columns,
  features = {},
  display = {},
  loading = false,
  onRowClick,
  onSelectionChange,
  className
}: DataGridProps<T>) {
  // Note: features will be used in future iterations
  console.log('Features config:', features)
  const t = useTranslations('common')
  
  // Table state
  const [state, setState] = useState<DataGridState>({
    sorting: [],
    columnFilters: [],
    columnVisibility: {},
    rowSelection: {},
    globalFilter: '',
    pagination: {
      pageIndex: 0,
      pageSize: 20,
    },
  })

  // Create table instance
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: state.sorting,
      columnFilters: state.columnFilters,
      columnVisibility: state.columnVisibility,
      rowSelection: state.rowSelection,
      globalFilter: state.globalFilter,
      pagination: state.pagination,
    },
    enableRowSelection: true,
    onSortingChange: (updater) => 
      setState((prev: DataGridState) => ({ 
        ...prev, 
        sorting: typeof updater === 'function' ? updater(prev.sorting) : updater 
      })),
    onColumnFiltersChange: (updater) => 
      setState((prev: DataGridState) => ({ 
        ...prev, 
        columnFilters: typeof updater === 'function' ? updater(prev.columnFilters) : updater 
      })),
    onColumnVisibilityChange: (updater) => 
      setState((prev: DataGridState) => ({ 
        ...prev, 
        columnVisibility: typeof updater === 'function' ? updater(prev.columnVisibility) : updater 
      })),
    onRowSelectionChange: (updater) => {
      const newSelection = typeof updater === 'function' ? updater(state.rowSelection) : updater
      setState((prev: DataGridState) => ({ ...prev, rowSelection: newSelection }))
      
      // Notify parent of selection changes
      if (onSelectionChange) {
        const selectedRows = Object.keys(newSelection)
          .map(index => data[parseInt(index)])
          .filter(Boolean)
        onSelectionChange(selectedRows)
      }
    },
    onGlobalFilterChange: (updater) => 
      setState((prev: DataGridState) => ({ 
        ...prev, 
        globalFilter: typeof updater === 'function' ? updater(prev.globalFilter) : updater 
      })),
    onPaginationChange: (updater) => 
      setState((prev: DataGridState) => ({ 
        ...prev, 
        pagination: typeof updater === 'function' ? updater(prev.pagination) : updater 
      })),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: process.env.NODE_ENV === 'development',
  })

  // Determine table density class
  const densityClass = useMemo(() => {
    switch (display.density) {
      case 'compact':
        return 'text-sm'
      case 'spacious':
        return 'text-base py-4'
      default:
        return 'text-sm py-2'
    }
  }, [display.density])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-10 bg-gray-200 animate-pulse rounded" />
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 animate-pulse rounded" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Toolbar will be added here */}
      <div className="space-y-2">
        <div className="text-sm text-gray-600">
          {t('table.showing', { 
            count: table.getFilteredRowModel().rows.length,
            total: data.length 
          })}
        </div>
        
        {/* Table */}
        <div className="overflow-hidden rounded-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                        header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                      }`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center space-x-2">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <span className="text-gray-400">
                            {{
                              asc: '↑',
                              desc: '↓',
                            }[header.column.getIsSorted() as string] ?? '↕'}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={`hover:bg-gray-50 transition-colors ${
                    onRowClick ? 'cursor-pointer' : ''
                  } ${row.getIsSelected() ? 'bg-blue-50' : ''} ${densityClass}`}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <button
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {'<<'}
            </button>
            <button
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {t('button.previous')}
            </button>
            <button
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {t('button.next')}
            </button>
            <button
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {'>>'}
            </button>
          </div>
          
          <span className="text-sm text-gray-700">
            {t('table.pagination', {
              current: table.getState().pagination.pageIndex + 1,
              total: table.getPageCount(),
            })}
          </span>
          
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {t('table.showRows', { count: pageSize })}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}