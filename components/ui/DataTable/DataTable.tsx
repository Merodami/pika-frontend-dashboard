'use client'

import { Table, Card, Input, Space, Button, Tooltip, Empty } from 'antd'
import type { TableProps, ColumnType } from 'antd/es/table'
import { Search, Download, RefreshCw } from 'lucide-react'
import { ReactNode, useMemo } from 'react'
import { useTranslations } from 'next-intl'

export interface DataTableColumn<T = any> extends ColumnType<T> {
  exportable?: boolean
  searchable?: boolean
  hidden?: boolean
}

export interface DataTableProps<T = any>
  extends Omit<TableProps<T>, 'columns' | 'title'> {
  // Data
  columns: DataTableColumn<T>[]
  data: T[]
  loading?: boolean

  // Features
  searchable?: boolean
  searchPlaceholder?: string
  onSearch?: (value: string) => void

  // Actions
  actions?: ReactNode
  bulkActions?: ReactNode
  showRefresh?: boolean
  onRefresh?: () => void

  // Export
  exportable?: boolean
  onExport?: () => void

  // Customization
  title?: string
  description?: string
  emptyMessage?: string
  cardProps?: any
  compact?: boolean
}

export function DataTable<T extends Record<string, any>>({
  // Data
  columns,
  data,
  loading = false,

  // Features
  searchable = true,
  searchPlaceholder,
  onSearch,

  // Actions
  actions,
  bulkActions,
  showRefresh = false,
  onRefresh,

  // Export
  exportable = false,
  onExport,

  // Customization
  title,
  description,
  emptyMessage,
  cardProps,
  compact = false,

  // Table props
  rowSelection,
  pagination,
  onChange,
  ...tableProps
}: DataTableProps<T>) {
  const t = useTranslations('common')

  // Filter out hidden columns
  const visibleColumns = useMemo(
    () => columns.filter((col) => !col.hidden),
    [columns]
  )

  // Check if we have selected rows for bulk actions
  const hasSelection =
    rowSelection?.selectedRowKeys && rowSelection.selectedRowKeys.length > 0

  const tableHeader = (
    <div className="space-y-4">
      {/* Title and Description */}
      {(title || description) && (
        <div>
          {title && <h2 className="text-xl font-semibold">{title}</h2>}
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
        </div>
      )}

      {/* Controls Row */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        {/* Left side - Search and Filters */}
        <div className="flex flex-1 gap-2">
          {searchable && onSearch && (
            <Input
              placeholder={searchPlaceholder || t('button.search')}
              prefix={<Search className="w-4 h-4 text-gray-400" />}
              onChange={(e) => onSearch(e.target.value)}
              className="max-w-xs"
              allowClear
            />
          )}

          {/* Show bulk actions when items are selected */}
          {hasSelection && bulkActions && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {rowSelection?.selectedRowKeys?.length || 0} selected
              </span>
              {bulkActions}
            </div>
          )}
        </div>

        {/* Right side - Actions */}
        <Space>
          {actions}

          {showRefresh && onRefresh && (
            <Tooltip title={t('button.refresh')}>
              <Button
                icon={<RefreshCw className="w-4 h-4" />}
                onClick={onRefresh}
                loading={loading}
              />
            </Tooltip>
          )}

          {exportable && onExport && (
            <Tooltip title={t('button.export')}>
              <Button
                icon={<Download className="w-4 h-4" />}
                onClick={onExport}
              />
            </Tooltip>
          )}
        </Space>
      </div>
    </div>
  )

  const tableContent = (
    <Table<T>
      columns={visibleColumns}
      dataSource={data}
      loading={loading}
      rowSelection={rowSelection}
      pagination={pagination}
      onChange={onChange}
      size={compact ? 'small' : 'middle'}
      locale={{
        emptyText: emptyMessage || <Empty description={t('message.noData')} />,
      }}
      {...tableProps}
    />
  )

  // If we have a title, description, or controls, wrap in a card
  if (
    title ||
    description ||
    searchable ||
    actions ||
    showRefresh ||
    exportable
  ) {
    return (
      <Card className="shadow-sm" {...cardProps}>
        {tableHeader}
        <div className="mt-4">{tableContent}</div>
      </Card>
    )
  }

  // Otherwise, just return the table
  return tableContent
}

// Export column helpers
export function createColumns<T>(
  columns: DataTableColumn<T>[]
): DataTableColumn<T>[] {
  return columns
}

export function createActionColumn<T>(
  render: (text: any, record: T, index: number) => ReactNode,
  props?: Partial<DataTableColumn<T>>
): DataTableColumn<T> {
  return {
    title: 'Actions',
    key: 'actions',
    fixed: 'right',
    width: 100,
    exportable: false,
    render,
    ...props,
  }
}

export function createDateColumn<T>(
  dataIndex: keyof T | string,
  title: string,
  format?: (date: any) => string,
  props?: Partial<DataTableColumn<T>>
): DataTableColumn<T> {
  return {
    title,
    dataIndex: dataIndex as string,
    key: dataIndex as string,
    render: (date) =>
      format ? format(date) : new Date(date).toLocaleDateString(),
    sorter: true,
    ...props,
  }
}

export function createStatusColumn<T>(
  dataIndex: keyof T | string,
  title: string,
  statusMap: Record<string, { label: string; color: string }>,
  props?: Partial<DataTableColumn<T>>
): DataTableColumn<T> {
  return {
    title,
    dataIndex: dataIndex as string,
    key: dataIndex as string,
    render: (status) => {
      const config = statusMap[status] || { label: status, color: 'default' }
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
        >
          {config.label}
        </span>
      )
    },
    filters: Object.entries(statusMap).map(([value, config]) => ({
      text: config.label,
      value,
    })),
    ...props,
  }
}
