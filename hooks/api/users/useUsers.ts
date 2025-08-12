import { useQueryClient } from '@tanstack/react-query'
import { isEmpty, isNil, omitBy } from 'lodash-es'

import {
  getAdminUserList,
  getAdminUserById,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
  type GetAdminUserListParams,
  type GetAdminUserList200,
  type GetAdminUserById200,
  type CreateAdminUserBody,
  type UpdateAdminUserBody,
} from '@/lib/api/orval-client'
import { queryKeys } from '@/lib/api/queryKeys'

import { useApiMutation } from '../base/useApiMutation'
import { useApiQuery } from '../base/useApiQuery'

// Helper function to invalidate user queries
function invalidateUserQueries(
  queryClient: ReturnType<typeof useQueryClient>,
  userId: string
) {
  queryClient.invalidateQueries({
    queryKey: queryKeys.users.detail(userId),
  })
  queryClient.invalidateQueries({
    queryKey: queryKeys.users.lists(),
  })
}

/**
 * Clean filters by removing null/undefined/empty values
 */
const cleanFilters = (filters?: GetAdminUserListParams) =>
  omitBy(
    filters,
    (value) => isNil(value) || (typeof value === 'string' && isEmpty(value))
  )

/**
 * Hook to fetch users list with filters
 */
export function useUsers(filters?: GetAdminUserListParams) {
  const cleaned = cleanFilters(filters)

  return useApiQuery<GetAdminUserList200>({
    queryKey: queryKeys.users.list(cleaned),
    queryFn: () => getAdminUserList(cleaned),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

/**
 * Hook to fetch a single user by ID
 */
export function useUser(id: string, options?: { enabled?: boolean }) {
  return useApiQuery<GetAdminUserById200>({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => getAdminUserById(id),
    enabled: options?.enabled ?? !!id,
  })
}

/**
 * Hook to create a new user
 */
export function useCreateUser() {
  const queryClient = useQueryClient()

  return useApiMutation<GetAdminUserById200, Error, CreateAdminUserBody>({
    mutationFn: (data) => createAdminUser(data),
    successMessage: 'User created successfully',
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.lists(),
      })
    },
  })
}

/**
 * Hook to update a user
 */
export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useApiMutation<
    GetAdminUserById200,
    Error,
    { id: string; data: UpdateAdminUserBody }
  >({
    mutationFn: ({ id, data }) => updateAdminUser(id, data),
    successMessage: 'User updated successfully',
    onSuccess: (_, { id }) => {
      invalidateUserQueries(queryClient, id)
    },
  })
}

/**
 * Hook to delete a user
 */
export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useApiMutation<null, Error, string>({
    mutationFn: (id) => deleteAdminUser(id),
    successMessage: 'User deleted successfully',
    onSuccess: (_, id) => {
      queryClient.removeQueries({
        queryKey: queryKeys.users.detail(id),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.lists(),
      })
    },
  })
}

/**
 * Hook to get user statistics
 */
export function useUserStats(id: string, options?: { enabled?: boolean }) {
  return useApiQuery({
    queryKey: queryKeys.users.stats(id),
    queryFn: () => getAdminUserById(id),
    enabled: options?.enabled ?? !!id,
    staleTime: 1 * 60 * 1000, // 1 minute
  })
}