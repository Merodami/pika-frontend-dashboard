'use client'

import { getUserProfile, type GetUserProfile200 } from '@/lib/api/orval-client'
import { queryKeys } from '@/lib/api/queryKeys'
import { useApiQuery } from '../base/useApiQuery'

/**
 * Hook to fetch the current user's profile
 * Used for client-side components to get the authenticated user
 */
export function useCurrentUser(options?: { enabled?: boolean }) {
  return useApiQuery<GetUserProfile200>({
    queryKey: queryKeys.users.me(),
    queryFn: getUserProfile,
    enabled: options?.enabled ?? true,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  })
}