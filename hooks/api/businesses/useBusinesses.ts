import { useQueryClient } from '@tanstack/react-query'
import { isEmpty, isNil, omitBy } from 'lodash-es'

import {
  getAdminBusinessList,
  getAdminBusinessById,
  createAdminBusiness,
  updateAdminBusiness,
  deleteAdminBusiness,
  activateAdminBusiness,
  deactivateAdminBusiness,
  updateAdminBusinessVerification,
  approveAdminBusiness,
  type GetAdminBusinessListParams,
  type GetAdminBusinessList200,
  type GetAdminBusinessById200,
  type CreateAdminBusinessBody,
  type UpdateAdminBusinessBody,
  type UpdateAdminBusinessVerificationBody,
  type ApproveAdminBusiness200,
} from '@/lib/api/orval-client'
import { queryKeys } from '@/lib/api/queryKeys'

import { useApiMutation } from '../base/useApiMutation'
import { useApiQuery } from '../base/useApiQuery'

/**
 * Clean filters by removing null/undefined/empty values
 */
const cleanFilters = (filters?: GetAdminBusinessListParams) =>
  omitBy(
    filters,
    (value) => isNil(value) || (typeof value === 'string' && isEmpty(value))
  )

/**
 * Hook to fetch businesses list with filters
 */
export function useBusinesses(filters?: GetAdminBusinessListParams) {
  const cleaned = cleanFilters(filters)

  return useApiQuery<GetAdminBusinessList200>({
    queryKey: queryKeys.businesses.list(cleaned),
    queryFn: () => getAdminBusinessList(cleaned),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

/**
 * Hook to fetch a single business by ID
 */
export function useBusiness(id: string, options?: { enabled?: boolean }) {
  return useApiQuery<GetAdminBusinessById200>({
    queryKey: queryKeys.businesses.detail(id),
    queryFn: () => getAdminBusinessById(id),
    enabled: options?.enabled ?? !!id,
  })
}

/**
 * Hook to create a new business
 */
export function useCreateBusiness() {
  const queryClient = useQueryClient()

  return useApiMutation<
    GetAdminBusinessById200,
    Error,
    CreateAdminBusinessBody
  >({
    mutationFn: (data) => createAdminBusiness(data),
    successMessage: 'Business created successfully',
    onSuccess: () => {
      // Invalidate lists
      queryClient.invalidateQueries({
        queryKey: queryKeys.businesses.lists(),
      })
    },
  })
}

/**
 * Hook to update a business
 */
export function useUpdateBusiness() {
  const queryClient = useQueryClient()

  return useApiMutation<
    GetAdminBusinessById200,
    Error,
    { id: string; data: UpdateAdminBusinessBody }
  >({
    mutationFn: ({ id, data }) => updateAdminBusiness(id, data),
    successMessage: 'Business updated successfully',
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.businesses.lists(),
      })
    },
  })
}

/**
 * Hook to verify a business
 */
export function useVerifyBusiness() {
  const queryClient = useQueryClient()

  return useApiMutation<
    null,
    Error,
    { id: string } & UpdateAdminBusinessVerificationBody
  >({
    mutationFn: ({ id, verified }) =>
      updateAdminBusinessVerification(id, { verified }),
    successMessage: 'Business verification status updated',
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.businesses.lists(),
      })
    },
  })
}

/**
 * Hook to activate/deactivate a business
 */
export function useToggleBusinessActive() {
  const queryClient = useQueryClient()

  return useApiMutation<null, Error, { id: string; active: boolean }>({
    mutationFn: ({ id, active }) =>
      active ? activateAdminBusiness(id) : deactivateAdminBusiness(id),
    successMessage: 'Business status updated successfully',
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.businesses.detail(id),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.businesses.lists(),
      })
    },
  })
}

/**
 * Hook to approve/unapprove a business
 * Uses the dedicated approval endpoint
 */
export function useApproveBusiness() {
  const queryClient = useQueryClient()

  return useApiMutation<
    ApproveAdminBusiness200,
    Error,
    { id: string; approved: boolean; reason?: string }
  >({
    mutationFn: ({ id, approved, reason }) =>
      approveAdminBusiness(id, { approved, reason }),
    successMessage: (data) =>
      data.approved ? 'Business approved successfully' : 'Business rejected',
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.businesses.detail(id),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.businesses.lists(),
      })
    },
  })
}

/**
 * Hook to delete a business
 */
export function useDeleteBusiness() {
  const queryClient = useQueryClient()

  return useApiMutation<null, Error, string>({
    mutationFn: (id) => deleteAdminBusiness(id),
    successMessage: 'Business deleted successfully',
    onSuccess: (_, id) => {
      // Remove from cache
      queryClient.removeQueries({
        queryKey: queryKeys.businesses.detail(id),
      })

      // Invalidate lists
      queryClient.invalidateQueries({
        queryKey: queryKeys.businesses.lists(),
      })
    },
  })
}

/**
 * Hook to get business statistics
 */
export function useBusinessStats(id: string, options?: { enabled?: boolean }) {
  return useApiQuery({
    queryKey: queryKeys.businesses.stats(id),
    queryFn: () => getAdminBusinessById(id),
    enabled: options?.enabled ?? !!id,
    staleTime: 1 * 60 * 1000, // 1 minute
  })
}

/**
 * Hook to bulk update businesses
 * Note: This endpoint might not exist in the API yet
 */
export function useBulkUpdateBusinesses() {
  const queryClient = useQueryClient()

  return useApiMutation({
    mutationFn: async (data: any) => {
      // TODO: Replace with actual bulk update endpoint when available
      console.warn('Bulk update endpoint not yet implemented')
      return Promise.resolve(data)
    },
    successMessage: (data: any) =>
      `${data.updated || 0} businesses updated successfully`,
    onSuccess: () => {
      // Invalidate all business queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.businesses.all(),
      })
    },
  })
}
