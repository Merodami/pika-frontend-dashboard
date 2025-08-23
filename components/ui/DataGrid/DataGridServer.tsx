'use client'

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table'
import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { Search, RefreshCw } from 'lucide-react'

import type { DataGridConfig } from '@/types/data-grid'
import { useDataGrid } from '@/hooks/useDataGrid'
import { MobilePagination } from '@/components/ui/pagination'

// Server-side pagination metadata
interface ServerPaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}

interface DataGridServerProps<T>
  extends Omit<DataGridConfig<T>, 'onSelectionChange'> {
  loading?: boolean
  error?: Error | null
  pagination?: ServerPaginationMeta
  onRefresh?: () => void
  onQueryChange?: (params: any) => void
  onSelectionChange?: (
    selectedRows: T[],
    selectedRowData: Record<string, T>
  ) => void
  className?: string
}

export function DataGridServer<T>({
  data,
  columns,
  features = {},
  display = {},
  loading = false,
  error = null,
  pagination: serverPagination,
  onRefresh,
  onQueryChange,
  onRowClick,
  onSelectionChange,
  className,
}: DataGridServerProps<T>) {
  const t = useTranslations('common')

  // Use the data grid hook for state management
  const dataGrid = useDataGrid({
    initialPageSize: 20,
    enableServerSide: true,
    debounceMs: 300,
  })

  // Notify parent of query parameter changes
  useMemo(() => {
    if (onQueryChange) {
      onQueryChange(dataGrid.debouncedQueryParams)
    }
  }, [dataGrid.debouncedQueryParams, onQueryChange])

  // Create table instance with server-side configuration
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: dataGrid.sorting,
      columnFilters: dataGrid.columnFilters,
      columnVisibility: dataGrid.columnVisibility,
      rowSelection: dataGrid.rowSelection,
      globalFilter: dataGrid.globalFilter,
      pagination: dataGrid.pagination,
    },
    pageCount: serverPagination?.totalPages ?? -1, // -1 means unknown page count
    enableRowSelection: true,
    manualPagination: true, // Server-side pagination
    manualSorting: true, // Server-side sorting
    manualFiltering: true, // Server-side filtering
    onSortingChange: dataGrid.setSorting,
    onColumnFiltersChange: dataGrid.setColumnFilters,
    onColumnVisibilityChange: dataGrid.setColumnVisibility,
    onRowSelectionChange: (updater) => {
      const newSelection =
        typeof updater === 'function' ? updater(dataGrid.rowSelection) : updater
      dataGrid.setRowSelection(newSelection)

      // Notify parent of selection changes with both arrays and lookup object
      if (onSelectionChange) {
        const selectedRows = Object.keys(newSelection)
          .map((index) => data[parseInt(index)])
          .filter(Boolean)

        const selectedRowData = Object.keys(newSelection).reduce(
          (acc, index) => {
            const row = data[parseInt(index)]
            if (row && typeof row === 'object' && row !== null && 'id' in row) {
              const rowWithId = row as T & { id: string }
              acc[rowWithId.id] = row
            }
            return acc
          },
          {} as Record<string, T>
        )

        onSelectionChange(selectedRows, selectedRowData)
      }
    },
    onGlobalFilterChange: dataGrid.setGlobalFilter,
    onPaginationChange: dataGrid.setPagination,
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

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="text-sm text-red-700">
          {t('message.errorOccurred')}: {error.message}
        </div>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="mt-2 text-sm font-medium text-red-600 hover:text-red-500"
          >
            {t('button.retry')}
          </button>
        )}
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          {features.filtering?.globalSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={t('button.search')}
                value={dataGrid.globalFilter}
                onChange={(e) => dataGrid.setGlobalFilter(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}

          {/* Active filters count */}
          {dataGrid.columnFilters.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                {t('table.filtersActive', {
                  count: dataGrid.columnFilters.length,
                })}
              </span>
              <button
                onClick={dataGrid.clearFilters}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                {t('button.clearAll')}
              </button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Selected count */}
          {Object.keys(dataGrid.rowSelection).length > 0 && (
            <div className="text-sm text-gray-500">
              {t('table.selectedCount', {
                count: Object.keys(dataGrid.rowSelection).length,
              })}
            </div>
          )}

          {/* Refresh button */}
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
            >
              <RefreshCw
                className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`}
              />
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow -mx-4 sm:mx-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={`px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                        header.column.getCanSort()
                          ? 'cursor-pointer select-none hover:bg-gray-100'
                          : ''
                      }`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center space-x-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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
              {loading ? (
                // Loading skeleton
                [...Array(dataGrid.pagination.pageSize)].map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    {columns.map((_, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-3 sm:px-6 py-4 whitespace-nowrap"
                      >
                        <div className="h-4 bg-gray-200 rounded"></div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : table.getRowModel().rows.length === 0 ? (
                // Empty state
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-3 sm:px-6 py-12 text-center"
                  >
                    <div className="text-gray-500">
                      <div className="text-lg font-medium">
                        {t('message.noData')}
                      </div>
                      <div className="text-sm">
                        {t('message.noDataDescription')}
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                // Data rows
                table.getRowModel().rows.map((row) => (
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
                        className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile-Responsive Pagination */}
      {console.log('🔄 DataGrid Pagination Props:', {
        current: dataGrid.pagination.pageIndex + 1,
        total: serverPagination?.totalPages ?? 1,
        pageSize: dataGrid.pagination.pageSize,
        totalItems: serverPagination?.total ?? data.length,
        serverPagination,
        dataGridPagination: dataGrid.pagination
      })}
      <MobilePagination
        current={dataGrid.pagination.pageIndex + 1}
        total={serverPagination?.totalPages ?? 1}
        pageSize={dataGrid.pagination.pageSize}
        totalItems={serverPagination?.total ?? data.length}
        onPageChange={(page) => {
          console.log('🔄 DataGrid onPageChange:', { 
            requestedPage: page, 
            willSetPageIndex: page - 1,
            currentPagination: dataGrid.pagination
          })
          dataGrid.setPagination((prev) => ({
            ...prev,
            pageIndex: page - 1,
          }))
        }}
        onPageSizeChange={(pageSize) =>
          dataGrid.setPagination((prev) => ({
            ...prev,
            pageSize,
            pageIndex: 0, // Reset to first page
          }))
        }
      />
    </div>
  )
}
