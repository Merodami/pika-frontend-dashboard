'use client'

import { getUserProfile, type GetUserProfile200 } from '@/lib/api/orval-client'
import { queryKeys } from '@/lib/api/queryKeys'
import { useApiQuery } from '../base/useApiQuery'
import { useAuthStore } from '@/store/authStore'
import { useQueryClient } from '@tanstack/react-query'

/**
 * Hook to fetch the current user's profile
 * Used for client-side components to get the authenticated user
 */
export function useCurrentUser(options?: { enabled?: boolean }) {
  const { isAuthenticated } = useAuthStore()

  return useApiQuery<GetUserProfile200>({
    queryKey: queryKeys.users.me(),
    queryFn: getUserProfile,
    enabled: (options?.enabled ?? true) && isAuthenticated,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    refetchOnWindowFocus: false, // Don't refetch user profile on window focus
  })
}

/**
 * Hook to invalidate and refetch current user
 */
export function useRefreshCurrentUser() {
  const queryClient = useQueryClient()

  return async () => {
    await queryClient.invalidateQueries({
      queryKey: queryKeys.users.me(),
    })
  }
}

/**
 * Hook to get user permissions based on role
 */
export function useUserPermissions() {
  const { data: user } = useCurrentUser()

  return {
    isAdmin: user?.role === 'admin',
    isBusiness: user?.role === 'business',
    isCustomer: user?.role === 'customer',
    canAccessDashboard: user?.role === 'admin' || user?.role === 'business',
    canManageUsers: user?.role === 'admin',
    canManageBusinesses: user?.role === 'admin',
    canManageVouchers: user?.role === 'business' || user?.role === 'admin',
    isEmailVerified: user?.emailVerified ?? false,
    isPhoneVerified: user?.phoneVerified ?? false,
  }
}

/**
 * Hook to get user's preferred language
 */
export function useUserLanguage() {
  const { data: user } = useCurrentUser()
  return user?.preferredLanguage || 'en'
}

/**
 * Hook to get user's business context
 */
export function useUserBusiness() {
  const { data: user } = useCurrentUser()

  return {
    businessId: user?.primaryBusinessId,
    hasBusiness: !!user?.primaryBusinessId,
    isBusinessUser: user?.role === 'business',
    needsBusinessSetup: user?.role === 'business' && !user?.primaryBusinessId,
  }
}

/**
 * Hook to get user's display information
 */
export function useUserDisplay() {
  const { data: user } = useCurrentUser()

  return {
    fullName:
      user?.name ||
      `${user?.firstName || ''} ${user?.lastName || ''}`.trim() ||
      user?.email ||
      'User',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    avatarUrl: user?.avatarUrl,
    initials: getInitials(user?.firstName, user?.lastName, user?.email),
  }
}

/**
 * Helper to get user initials
 */
function getInitials(
  firstName?: string,
  lastName?: string,
  email?: string
): string {
  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase()
  }
  if (firstName) {
    return firstName.substring(0, 2).toUpperCase()
  }
  if (email) {
    return email.substring(0, 2).toUpperCase()
  }
  return 'U'
}
