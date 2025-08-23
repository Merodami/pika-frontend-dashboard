import type { ColumnDef, SortingState, ColumnFiltersState, VisibilityState, RowSelectionState } from '@tanstack/react-table'
import type { ReactNode } from 'react'

// Re-export enums from pika-types to avoid string literals
export { UserRole, UserStatus } from '@merodami/pika-types'

export interface DataGridConfig<T = any> {
  name: string
  data: T[]
  columns: ColumnDef<T>[]
  
  // Features
  features?: {
    virtualization?: VirtualizationConfig
    columnManagement?: ColumnManagementConfig
    filtering?: FilteringConfig
    export?: ExportConfig
    realtime?: RealtimeConfig
  }
  
  // UI Configuration
  display?: {
    density?: TableDensity
    theme?: TableTheme
    responsive?: boolean
  }
  
  // Callbacks
  onRowClick?: (row: T) => void
  onSelectionChange?: (selectedRows: T[]) => void
  onDataChange?: (data: T[]) => void
}

export interface VirtualizationConfig {
  enabled: boolean
  estimateSize?: () => number
  overscan?: number
}

export interface ColumnManagementConfig {
  enabled: boolean
  resizable: boolean
  reorderable: boolean
  hideable: boolean
  pinnable: boolean
}

export interface FilteringConfig {
  enabled: boolean
  globalSearch: boolean
  columnFilters: boolean
  advancedFilters: boolean
}

export interface ExportConfig {
  enabled: boolean
  formats: ExportFormat[]
  customFields?: boolean
}

export interface RealtimeConfig {
  enabled: boolean
  channel?: string
  events?: string[]
}

// Use enums instead of string literals for type safety
export enum ExportFormat {
  CSV = 'csv',
  XLSX = 'xlsx',
  PDF = 'pdf',
  JSON = 'json'
}

export enum TableDensity {
  COMPACT = 'compact',
  COMFORTABLE = 'comfortable',
  SPACIOUS = 'spacious'
}

export enum TableTheme {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto'
}

export enum ActionVariant {
  DEFAULT = 'default',
  DESTRUCTIVE = 'destructive',
  OUTLINE = 'outline',
  SECONDARY = 'secondary',
  GHOST = 'ghost',
  LINK = 'link'
}

// Filter types
export enum FilterOperator {
  EQUALS = 'equals',
  NOT_EQUALS = 'not_equals',
  CONTAINS = 'contains',
  NOT_CONTAINS = 'not_contains',
  STARTS_WITH = 'starts_with',
  ENDS_WITH = 'ends_with',
  GREATER_THAN = 'greater_than',
  LESS_THAN = 'less_than',
  BETWEEN = 'between',
  IS_EMPTY = 'is_empty',
  IS_NOT_EMPTY = 'is_not_empty',
}

export enum FilterLogic {
  AND = 'AND',
  OR = 'OR',
}

export enum FieldType {
  TEXT = 'text',
  NUMBER = 'number',
  DATE = 'date',
  SELECT = 'select',
  BOOLEAN = 'boolean',
}

export interface FilterCondition {
  id: string
  field: string
  operator: FilterOperator
  value: any
  logic?: FilterLogic
}

export interface FilterField {
  key: string
  label: string
  type: FieldType
  options?: Array<{ label: string; value: any }>
}

export interface SortConfig {
  field: string
  order: 'asc' | 'desc'
}

export interface DataGridState {
  sorting: SortingState
  columnFilters: ColumnFiltersState
  columnVisibility: VisibilityState
  rowSelection: RowSelectionState
  globalFilter: string
  pagination: {
    pageIndex: number
    pageSize: number
  }
  // Server-side specific state
  page?: number
  limit?: number
  sort?: SortConfig
  filters?: FilterCondition[]
  search?: string
  selectedRowKeys?: React.Key[]
}

export interface DataGridAction<T = any> {
  key: string
  label: string
  icon?: ReactNode
  variant?: ActionVariant
  onClick: (rows: T[]) => void | Promise<void>
  disabled?: boolean | ((rows: T[]) => boolean)
  loading?: boolean
}

export interface BulkAction<T = any> extends DataGridAction<T> {
  confirmMessage?: string
  confirmTitle?: string
}

export interface RowAction<T = any> {
  key: string
  label: string
  icon?: ReactNode
  variant?: ActionVariant
  onClick: (row: T) => void | Promise<void>
  disabled?: boolean | ((row: T) => boolean)
  loading?: boolean
  danger?: boolean
}