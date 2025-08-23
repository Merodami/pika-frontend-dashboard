import { useState, useCallback, useEffect, useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { debounce } from 'lodash-es'
import type { SortConfig, FilterCondition } from '@/types/data-grid'

interface UseInfiniteDataGridOptions<T> {
  queryKey: string[]
  queryFn: (params: {
    page: number
    limit: number
    sort?: SortConfig
    filters?: FilterCondition[]
    search?: string
  }) => Promise<{
    data: T[]
    total: number
    hasMore: boolean
  }>
  limit?: number
  debounceMs?: number
  enabled?: boolean
}

// Simple state for infinite scrolling
interface InfiniteDataGridState {
  page: number
  limit: number
  sort?: SortConfig
  filters: FilterCondition[]
  search: string
  selectedRowKeys: React.Key[]
}

interface UseInfiniteDataGridReturn<T> {
  data: T[]
  isLoading: boolean
  isFetchingNextPage: boolean
  hasNextPage: boolean
  error: Error | null
  total: number
  fetchNextPage: () => void
  refetch: () => void
  state: InfiniteDataGridState
  updateSort: (sort: SortConfig) => void
  updateFilters: (filters: FilterCondition[]) => void
  updateSearch: (search: string) => void
  updatePage: (page: number) => void
  updateLimit: (limit: number) => void
  resetFilters: () => void
}

export function useInfiniteDataGrid<T>({
  queryKey,
  queryFn,
  limit = 50,
  debounceMs = 300,
  enabled = true,
}: UseInfiniteDataGridOptions<T>): UseInfiniteDataGridReturn<T> {
  const [state, setState] = useState<InfiniteDataGridState>({
    page: 1,
    limit,
    sort: undefined,
    filters: [],
    search: '',
    selectedRowKeys: [],
  })

  const debouncedSearchRef = useRef<string>(state.search)

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    error,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: [
      ...queryKey,
      state.sort,
      state.filters,
      debouncedSearchRef.current,
      state.limit,
    ],
    queryFn: async ({ pageParam = 1 }) => {
      return queryFn({
        page: pageParam as number,
        limit: state.limit,
        sort: state.sort,
        filters: state.filters,
        search: debouncedSearchRef.current,
      })
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasMore) return undefined
      return allPages.length + 1
    },
    enabled,
  })

  // Debounced search update
  const debouncedSearch = useCallback(
    debounce((search: string) => {
      debouncedSearchRef.current = search
      refetch()
    }, debounceMs),
    [refetch, debounceMs]
  )

  const updateSort = useCallback((sort: SortConfig) => {
    setState((prev) => ({ ...prev, sort, page: 1 }))
  }, [])

  const updateFilters = useCallback((filters: FilterCondition[]) => {
    setState((prev) => ({ ...prev, filters, page: 1 }))
  }, [])

  const updateSearch = useCallback(
    (search: string) => {
      setState((prev) => ({ ...prev, search }))
      debouncedSearch(search)
    },
    [debouncedSearch]
  )

  const updatePage = useCallback((page: number) => {
    setState((prev) => ({ ...prev, page }))
  }, [])

  const updateLimit = useCallback((limit: number) => {
    setState((prev) => ({ ...prev, limit, page: 1 }))
  }, [])

  const resetFilters = useCallback(() => {
    setState((prev) => ({
      ...prev,
      filters: [],
      search: '',
      page: 1,
    }))
    debouncedSearchRef.current = ''
  }, [])

  // Flatten all pages data
  const flatData = data?.pages.flatMap((page) => page.data) || []
  const total = data?.pages[0]?.total || 0

  // Auto-fetch next page when scrolling near bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const scrollTop = document.documentElement.scrollTop
      const clientHeight = document.documentElement.clientHeight

      if (scrollHeight - scrollTop <= clientHeight * 1.5) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  return {
    data: flatData,
    isLoading,
    isFetchingNextPage,
    hasNextPage: hasNextPage || false,
    error: error as Error | null,
    total,
    fetchNextPage,
    refetch,
    state,
    updateSort,
    updateFilters,
    updateSearch,
    updatePage,
    updateLimit,
    resetFilters,
  }
}
