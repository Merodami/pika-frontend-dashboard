import { useState, useCallback, useMemo } from 'react'
import { TablePaginationConfig, SorterResult, FilterValue } from 'antd/es/table/interface'
import { debounce } from 'lodash-es'
import type { PaginationMetadata } from '@/lib/api/orval-client'

export interface DataTableState {
  page: number
  pageSize: number
  search: string
  sortField?: string
  sortOrder?: 'asc' | 'desc'
  filters: Record<string, any>
  selectedRowKeys: React.Key[]
}

export interface UseDataTableOptions {
  initialPageSize?: number
  debounceDelay?: number
  onSearch?: (search: string) => void
  onFilter?: (filters: Record<string, any>) => void
  onSort?: (field: string | undefined, order: 'asc' | 'desc' | undefined) => void
  onPageChange?: (page: number, pageSize: number) => void
  onSelectionChange?: (selectedRowKeys: React.Key[]) => void
}

export interface UseDataTableReturn<T = any> {
  // State
  state: DataTableState
  
  // Actions
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
  setSearch: (search: string) => void
  setSortField: (field: string | undefined) => void
  setSortOrder: (order: 'asc' | 'desc' | undefined) => void
  setFilters: (filters: Record<string, any>) => void
  setSelectedRowKeys: (keys: React.Key[]) => void
  clearFilters: () => void
  clearSelection: () => void
  reset: () => void
  
  // Handlers for Ant Design Table
  handleTableChange: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[]
  ) => void
  handleSearch: (value: string) => void
  handleFilter: (key: string, value: any) => void
  handleSelectionChange: (selectedRowKeys: React.Key[]) => void
  
  // Computed values
  pagination: TablePaginationConfig
  queryParams: Record<string, any>
}

export function useDataTable<T = any>(
  options: UseDataTableOptions = {}
): UseDataTableReturn<T> {
  const {
    initialPageSize = 10,
    debounceDelay = 300,
    onSearch,
    onFilter,
    onSort,
    onPageChange,
    onSelectionChange
  } = options

  // State
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [search, setSearchState] = useState('')
  const [sortField, setSortField] = useState<string | undefined>()
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>()
  const [filters, setFilters] = useState<Record<string, any>>({})
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  // Debounced search handler
  const debouncedSearch = useMemo(
    () => debounce((value: string) => {
      setSearchState(value)
      setPage(1) // Reset to first page on search
      onSearch?.(value)
    }, debounceDelay),
    [debounceDelay, onSearch]
  )

  // Handlers
  const handleTableChange = useCallback((
    pagination: TablePaginationConfig,
    tableFilters: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[]
  ) => {
    // Handle pagination
    if (pagination.current && pagination.current !== page) {
      setPage(pagination.current)
      onPageChange?.(pagination.current, pageSize)
    }
    if (pagination.pageSize && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize)
      setPage(1) // Reset to first page on page size change
      onPageChange?.(1, pagination.pageSize)
    }

    // Handle sorting
    if (!Array.isArray(sorter)) {
      const newSortField = sorter.field as string | undefined
      const newSortOrder = sorter.order === 'ascend' ? 'asc' : sorter.order === 'descend' ? 'desc' : undefined
      
      if (newSortField !== sortField || newSortOrder !== sortOrder) {
        setSortField(newSortField)
        setSortOrder(newSortOrder)
        setPage(1) // Reset to first page on sort change
        onSort?.(newSortField, newSortOrder)
      }
    }

    // Handle filters
    const processedFilters = Object.entries(tableFilters).reduce((acc, [key, value]) => {
      if (value !== null && value !== undefined) {
        acc[key] = Array.isArray(value) ? value : value
      }
      return acc
    }, {} as Record<string, any>)

    if (JSON.stringify(processedFilters) !== JSON.stringify(filters)) {
      setFilters(processedFilters)
      setPage(1) // Reset to first page on filter change
      onFilter?.(processedFilters)
    }
  }, [page, pageSize, sortField, sortOrder, filters, onPageChange, onSort, onFilter])

  const handleSearch = useCallback((value: string) => {
    debouncedSearch(value)
  }, [debouncedSearch])

  const handleFilter = useCallback((key: string, value: any) => {
    const newFilters = { ...filters }
    
    if (value === null || value === undefined || value === '') {
      delete newFilters[key]
    } else {
      newFilters[key] = value
    }
    
    setFilters(newFilters)
    setPage(1) // Reset to first page on filter change
    onFilter?.(newFilters)
  }, [filters, onFilter])

  const handleSelectionChange = useCallback((keys: React.Key[]) => {
    setSelectedRowKeys(keys)
    onSelectionChange?.(keys)
  }, [onSelectionChange])

  // Actions
  const clearFilters = useCallback(() => {
    setFilters({})
    setSearch('')
    setSortField(undefined)
    setSortOrder(undefined)
    setPage(1)
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedRowKeys([])
  }, [])

  const reset = useCallback(() => {
    setPage(1)
    setPageSize(initialPageSize)
    setSearch('')
    setSortField(undefined)
    setSortOrder(undefined)
    setFilters({})
    setSelectedRowKeys([])
  }, [initialPageSize])

  // Computed values
  const pagination: TablePaginationConfig = useMemo(() => ({
    current: page,
    pageSize,
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
    pageSizeOptions: ['10', '20', '50', '100']
  }), [page, pageSize])

  const queryParams = useMemo(() => {
    const params: Record<string, any> = {
      page,
      limit: pageSize
    }

    if (search) {
      params.search = search
    }

    if (sortField) {
      params.sortBy = sortField
      params.sortOrder = sortOrder
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params[key] = value
      }
    })

    return params
  }, [page, pageSize, search, sortField, sortOrder, filters])

  const state: DataTableState = {
    page,
    pageSize,
    search,
    sortField,
    sortOrder,
    filters,
    selectedRowKeys
  }

  const setSearch = useCallback((value: string) => {
    handleSearch(value)
  }, [handleSearch])

  return {
    // State
    state,
    
    // Actions
    setPage,
    setPageSize,
    setSearch,
    setSortField,
    setSortOrder,
    setFilters,
    setSelectedRowKeys,
    clearFilters,
    clearSelection,
    reset,
    
    // Handlers
    handleTableChange,
    handleSearch,
    handleFilter,
    handleSelectionChange,
    
    // Computed
    pagination,
    queryParams
  }
}

// Helper hook for server-side pagination
export function useServerDataTable<T = any>(
  options: UseDataTableOptions = {}
): UseDataTableReturn<T> & { 
  serverPagination: (metadata: PaginationMetadata | undefined) => TablePaginationConfig 
} {
  const dataTable = useDataTable<T>(options)

  const serverPagination = useCallback((metadata: PaginationMetadata | undefined) => ({
    ...dataTable.pagination,
    total: metadata?.total || 0,
    showTotal: (total: number, range: [number, number]) => `${range[0]}-${range[1]} of ${total}`,
  }), [dataTable.pagination])

  return {
    ...dataTable,
    serverPagination
  }
}