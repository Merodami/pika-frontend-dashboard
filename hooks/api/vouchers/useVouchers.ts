import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import {
  VoucherState,
  VoucherScanSource,
  BulkOperationType,
  VoucherScanOptions,
  VoucherClaimOptions,
  VoucherRedeemOptions,
} from '@merodami/pika-types'
import {
  isEmpty,
  isNil,
  omitBy,
  throttle,
} from 'lodash-es'
import { useEffect, useMemo, useState } from 'react'

import {
  getAdminVoucherList,
  getAdminVoucherById,
  createAdminVoucher,
  updateAdminVoucher,
  deleteAdminVoucher,
  claimVoucher,
  redeemVoucher,
  scanVoucher,
  type GetAdminVoucherListParams,
  type GetAdminVoucherList200,
  type GetAdminVoucherById200,
  type CreateAdminVoucherBody,
  type UpdateAdminVoucherBody,
  type ClaimVoucher200,
  type RedeemVoucher200,
  type ScanVoucher200,
} from '@/lib/api/orval-client'
import { queryKeys } from '@/lib/api/queryKeys'

import { useApiMutation } from '../base/useApiMutation'
import { useApiQuery } from '../base/useApiQuery'

/**
 * Clean filters by removing null/undefined/empty values
 */
const cleanFilters = (filters?: GetAdminVoucherListParams) =>
  omitBy(
    filters,
    (value) => isNil(value) || (typeof value === 'string' && isEmpty(value))
  )

/**
 * Hook to fetch vouchers list with filters
 */
export function useVouchers(filters?: GetAdminVoucherListParams) {
  const cleaned = cleanFilters(filters)

  return useApiQuery<GetAdminVoucherList200>({
    queryKey: queryKeys.vouchers.list(cleaned),
    queryFn: () => getAdminVoucherList(cleaned),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    placeholderData: (previousData) => previousData,
  })
}

/**
 * Hook to fetch a single voucher by ID
 */
export function useVoucher(id: string, options?: { enabled?: boolean }) {
  return useApiQuery<GetAdminVoucherById200>({
    queryKey: queryKeys.vouchers.detail(id),
    queryFn: () => getAdminVoucherById(id),
    enabled: options?.enabled ?? !!id,
  })
}

/**
 * Hook to create a new voucher
 */
export function useCreateVoucher() {
  const queryClient = useQueryClient()

  return useApiMutation<GetAdminVoucherById200, Error, CreateAdminVoucherBody>({
    mutationFn: (data) => createAdminVoucher(data),
    successMessage: 'Voucher created successfully',
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.vouchers.lists(),
      })
    },
  })
}

/**
 * Hook to update a voucher
 */
export function useUpdateVoucher() {
  const queryClient = useQueryClient()

  return useApiMutation<
    GetAdminVoucherById200,
    Error,
    { id: string; data: UpdateAdminVoucherBody }
  >({
    mutationFn: ({ id, data }) => updateAdminVoucher(id, data),
    successMessage: 'Voucher updated successfully',
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.vouchers.detail(id),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.vouchers.lists(),
      })
    },
  })
}

/**
 * Hook to delete a voucher
 */
export function useDeleteVoucher() {
  const queryClient = useQueryClient()

  return useApiMutation<null, Error, string>({
    mutationFn: (id) => deleteAdminVoucher(id),
    successMessage: 'Voucher deleted successfully',
    onSuccess: (_, id) => {
      queryClient.removeQueries({
        queryKey: queryKeys.vouchers.detail(id),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.vouchers.lists(),
      })
    },
  })
}

/**
 * Hook to claim a voucher with proper types
 */
export function useClaimVoucher() {
  const queryClient = useQueryClient()

  return useApiMutation<ClaimVoucher200, Error, { id: string; options?: VoucherClaimOptions }>(
    {
      mutationFn: ({ id, options }) => claimVoucher(id, options || {}),
      successMessage: 'Voucher claimed successfully',
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.vouchers.detail(id),
        })
        queryClient.invalidateQueries({
          queryKey: queryKeys.vouchers.lists(),
        })
      },
    }
  )
}

/**
 * Hook to redeem a voucher with proper types
 */
export function useRedeemVoucher() {
  const queryClient = useQueryClient()

  return useApiMutation<RedeemVoucher200, Error, { id: string; options: VoucherRedeemOptions }>(
    {
      mutationFn: ({ id, options }) => redeemVoucher(id, options), // Now types match directly!
      successMessage: 'Voucher redeemed successfully',
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.vouchers.detail(id),
        })
        queryClient.invalidateQueries({
          queryKey: queryKeys.vouchers.lists(),
        })
      },
    }
  )
}

/**
 * Hook to scan a voucher with proper scan source type
 */
export function useScanVoucher() {
  const queryClient = useQueryClient()

  return useApiMutation<
    ScanVoucher200,
    Error,
    { id: string; options?: VoucherScanOptions }
  >({
    mutationFn: ({ id, options }) => {
      // Types now match except enum values (still lowercase in API)
      const body = {
        scanSource: options?.scanSource || VoucherScanSource.LINK,
        location: options?.location, // Coordinates type matches!
        deviceInfo: options?.deviceInfo, // DeviceInfo type matches!
      }
      return scanVoucher(id, body)
    },
    successMessage: 'Voucher scanned successfully',
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.vouchers.detail(id),
      })
    },
  })
}

/**
 * Hook for infinite scrolling vouchers
 */
export function useInfiniteVouchers(baseFilters?: GetAdminVoucherListParams) {
  const cleaned = cleanFilters(baseFilters)

  return useInfiniteQuery({
    queryKey: queryKeys.vouchers.infinite(cleaned),
    queryFn: ({ pageParam = 1 }) => {
      return getAdminVoucherList({
        ...cleaned,
        page: pageParam as number,
        limit: cleaned?.limit || 20,
      } as GetAdminVoucherListParams)
    },
    getNextPageParam: (lastPage, allPages) => {
      const total = lastPage.pagination?.total || 0
      const limit = lastPage.pagination?.limit || 20
      const totalPages = Math.ceil(total / limit)
      const nextPage = allPages.length + 1
      return nextPage <= totalPages ? nextPage : undefined
    },
    initialPageParam: 1,
  })
}

/**
 * Hook to prefetch vouchers
 */
export function usePrefetchVouchers(filters?: GetAdminVoucherListParams) {
  const queryClient = useQueryClient()
  const cleaned = cleanFilters(filters)

  const prefetch = useMemo(
    () =>
      throttle(
        () => {
          queryClient.prefetchQuery({
            queryKey: queryKeys.vouchers.list(cleaned),
            queryFn: () => getAdminVoucherList(cleaned),
            staleTime: 5 * 60 * 1000,
          })
        },
        1000,
        { leading: true, trailing: false }
      ),
    [queryClient, cleaned]
  )

  return prefetch
}

/**
 * Hook to search vouchers with debouncing
 */
export function useSearchVouchers(
  searchTerm: string,
  additionalFilters?: GetAdminVoucherListParams
) {
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const filters = useMemo(
    () => ({
      ...additionalFilters,
      search: debouncedSearchTerm,
    }),
    [debouncedSearchTerm, additionalFilters]
  )

  return useVouchers(debouncedSearchTerm ? filters : additionalFilters)
}

/**
 * Hook for debouncing values
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * Hook for optimistic updates
 */
export function useOptimisticVoucherUpdate() {
  const queryClient = useQueryClient()

  return {
    updateOptimistically: <T extends GetAdminVoucherById200>(
      id: string,
      updater: (old: T) => T
    ) => {
      queryClient.setQueryData<T>(
        queryKeys.vouchers.detail(id),
        (old) => (old ? updater(old) : old)
      )
    },
    rollback: (id: string) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.vouchers.detail(id),
      })
    },
  }
}

/**
 * Hook for bulk voucher operations using proper types
 */
export function useBulkVoucherOperations() {
  const queryClient = useQueryClient()

  return useApiMutation({
    mutationFn: async (data: {
      ids: string[]
      operation: BulkOperationType
    }) => {
      // TODO: Implement bulk operations when available in API
      console.warn('Bulk operations not yet implemented')
      return Promise.resolve({ updated: data.ids.length })
    },
    successMessage: (data: any) =>
      `${data.updated || 0} vouchers updated successfully`,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.vouchers.all(),
      })
    },
  })
}

/**
 * Hook for voucher statistics
 */
export function useVoucherStats(businessId?: string) {
  return useApiQuery({
    queryKey: queryKeys.vouchers.stats(businessId),
    queryFn: async () => {
      // TODO: Implement stats endpoint when available
      const vouchers = await getAdminVoucherList({
        businessId,
        limit: 1000,
      })
      
      // Calculate stats from vouchers list using proper enum values
      const stats = {
        total: vouchers.pagination?.total || 0,
        active: 0,
        claimed: 0,
        redeemed: 0,
        expired: 0,
        draft: 0,
        suspended: 0,
      }

      if (vouchers.data) {
        vouchers.data.forEach((voucher) => {
          switch (voucher.state) {
            case VoucherState.PUBLISHED:
              stats.active++
              break
            case VoucherState.CLAIMED:
              stats.claimed++
              break
            case VoucherState.REDEEMED:
              stats.redeemed++
              break
            case VoucherState.EXPIRED:
              stats.expired++
              break
            case VoucherState.DRAFT:
              stats.draft++
              break
            case VoucherState.SUSPENDED:
              stats.suspended++
              break
          }
        })
      }

      return stats
    },
    enabled: !!businessId,
    staleTime: 1 * 60 * 1000, // 1 minute
  })
}