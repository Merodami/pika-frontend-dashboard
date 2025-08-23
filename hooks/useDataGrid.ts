'use client'

import { useState, useMemo, useCallback } from 'react'
import type {
  PaginationState,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  RowSelectionState,
} from '@tanstack/react-table'
import { debounce } from 'lodash-es'

// Server-side query parameters interface
export interface ServerQueryParams {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  [key: string]: any // Allow additional filters
}

// Hook configuration
interface UseDataGridConfig {
  initialPageSize?: number
  initialSorting?: SortingState
  enableServerSide?: boolean
  debounceMs?: number
}

// Return type for the hook
interface UseDataGridReturn {
  // TanStack Table states
  pagination: PaginationState
  sorting: SortingState
  columnFilters: ColumnFiltersState
  columnVisibility: VisibilityState
  rowSelection: RowSelectionState
  globalFilter: string

  // State setters
  setPagination: (
    state: PaginationState | ((old: PaginationState) => PaginationState)
  ) => void
  setSorting: (
    state: SortingState | ((old: SortingState) => SortingState)
  ) => void
  setColumnFilters: (
    state:
      | ColumnFiltersState
      | ((old: ColumnFiltersState) => ColumnFiltersState)
  ) => void
  setColumnVisibility: (
    state: VisibilityState | ((old: VisibilityState) => VisibilityState)
  ) => void
  setRowSelection: (
    state: RowSelectionState | ((old: RowSelectionState) => RowSelectionState)
  ) => void
  setGlobalFilter: (filter: string) => void

  // Server query helpers
  serverQueryParams: ServerQueryParams
  debouncedQueryParams: ServerQueryParams
  clearFilters: () => void
  clearSelection: () => void
  resetPagination: () => void
}

export const useDataGrid = (
  config: UseDataGridConfig = {}
): UseDataGridReturn => {
  const {
    initialPageSize = 20,
    initialSorting = [],
    enableServerSide = true,
    debounceMs = 300,
  } = config

  // TanStack Table states
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  })

  const [sorting, setSorting] = useState<SortingState>(initialSorting)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [globalFilter, setGlobalFilter] = useState<string>('')

  // Convert TanStack Table state to server query parameters
  const serverQueryParams = useMemo<ServerQueryParams>(() => {
    const params: ServerQueryParams = {}

    // Pagination
    if (enableServerSide) {
      params.page = pagination.pageIndex + 1 // Server expects 1-based indexing
      params.limit = pagination.pageSize
    }

    // Global search
    if (globalFilter) {
      params.search = globalFilter
    }

    // Sorting
    if (sorting.length > 0) {
      const sort = sorting[0] // Take the first sort (can be extended for multi-sort)
      params.sortBy = sort.id
      params.sortOrder = sort.desc ? 'desc' : 'asc'
    }

    // Column filters
    columnFilters.forEach((filter) => {
      if (
        filter.value !== undefined &&
        filter.value !== null &&
        filter.value !== ''
      ) {
        params[filter.id] = filter.value
      }
    })

    return params
  }, [pagination, sorting, columnFilters, globalFilter, enableServerSide])

  // Debounced version of query params for search and filters
  const debouncedQueryParams = useMemo(() => {
    const debouncedParams = { ...serverQueryParams }
    return debouncedParams
  }, [serverQueryParams])

  // Create debounced version of search updates
  const debouncedSetGlobalFilter = useMemo(
    () =>
      debounce((value: string) => {
        setGlobalFilter(value)
        // Reset to first page when searching
        setPagination((prev) => ({ ...prev, pageIndex: 0 }))
      }, debounceMs),
    [debounceMs]
  )

  // Enhanced setters that reset pagination when needed
  const enhancedSetSorting = useCallback(
    (state: SortingState | ((old: SortingState) => SortingState)) => {
      setSorting(state)
      // Reset to first page when sorting changes
      setPagination((prev) => ({ ...prev, pageIndex: 0 }))
    },
    []
  )

  const enhancedSetColumnFilters = useCallback(
    (
      state:
        | ColumnFiltersState
        | ((old: ColumnFiltersState) => ColumnFiltersState)
    ) => {
      setColumnFilters(state)
      // Reset to first page when filters change
      setPagination((prev) => ({ ...prev, pageIndex: 0 }))
    },
    []
  )

  // Helper functions
  const clearFilters = useCallback(() => {
    setColumnFilters([])
    setGlobalFilter('')
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }, [])

  const clearSelection = useCallback(() => {
    setRowSelection({})
  }, [])

  const resetPagination = useCallback(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }, [])

  return {
    // TanStack Table states
    pagination,
    sorting,
    columnFilters,
    columnVisibility,
    rowSelection,
    globalFilter,

    // State setters
    setPagination,
    setSorting: enhancedSetSorting,
    setColumnFilters: enhancedSetColumnFilters,
    setColumnVisibility,
    setRowSelection,
    setGlobalFilter: debouncedSetGlobalFilter,

    // Server query helpers
    serverQueryParams,
    debouncedQueryParams,
    clearFilters,
    clearSelection,
    resetPagination,
  }
}
