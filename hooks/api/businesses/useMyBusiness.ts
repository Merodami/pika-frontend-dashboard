import { useQueryClient } from '@tanstack/react-query'
import {
  getMyBusinesses,
  createMyBusiness,
  updateMyBusiness,
  deleteMyBusiness,
} from '@/lib/api/orval-client'
import { queryKeys } from '@/lib/api/queryKeys'
import { useApiQuery } from '../base/useApiQuery'
import { useApiMutation } from '../base/useApiMutation'

/**
 * Hook to fetch the current user's business
 */
export function useMyBusiness(options?: { enabled?: boolean }) {
  return useApiQuery({
    queryKey: [...queryKeys.businesses.all(), 'my'] as const,
    queryFn: () => getMyBusinesses(),
    enabled: options?.enabled ?? true,
    retry: (failureCount, error: any) => {
      // Don't retry on 404 (no business exists)
      if (error?.response?.status === 404) return false
      // Use default retry logic for other errors
      if (error?.status >= 400 && error?.status < 500) return false
      return failureCount < 3
    },
  })
}

/**
 * Hook to create user's business
 */
export function useCreateMyBusiness() {
  const queryClient = useQueryClient()

  return useApiMutation({
    mutationFn: (data: Parameters<typeof createMyBusiness>[0]) =>
      createMyBusiness(data),
    successMessage: 'Business created successfully',
    onSuccess: () => {
      // Invalidate my business query
      queryClient.invalidateQueries({
        queryKey: [...queryKeys.businesses.all(), 'my'] as const,
      })
    },
  })
}

/**
 * Hook to update user's business
 */
export function useUpdateMyBusiness() {
  const queryClient = useQueryClient()

  return useApiMutation({
    mutationFn: (data: Parameters<typeof updateMyBusiness>[0]) =>
      updateMyBusiness(data),
    successMessage: 'Business updated successfully',
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...queryKeys.businesses.all(), 'my'] as const,
      })
    },
  })
}

/**
 * Hook to delete user's business
 */
export function useDeleteMyBusiness() {
  const queryClient = useQueryClient()

  return useApiMutation({
    mutationFn: () => deleteMyBusiness(),
    successMessage: 'Business deleted successfully',
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...queryKeys.businesses.all(), 'my'] as const,
      })
    },
  })
}
