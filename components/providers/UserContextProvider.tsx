'use client'

import { createContext, useContext, ReactNode } from 'react'
import {
  useCurrentUser,
  useRefreshCurrentUser,
  useUserPermissions,
  useUserLanguage,
  useUserBusiness,
  useUserDisplay,
} from '@/hooks/api/users/useCurrentUser'
import type { GetUserProfile200 } from '@/lib/api/orval-client'

interface UserContextValue {
  user: GetUserProfile200 | undefined
  isLoading: boolean
  error: Error | null
  refreshUser: () => Promise<void>
  permissions: ReturnType<typeof useUserPermissions>
  language: string
  business: ReturnType<typeof useUserBusiness>
  display: ReturnType<typeof useUserDisplay>
}

const UserContext = createContext<UserContextValue | undefined>(undefined)

/**
 * UserContext Provider
 *
 * Provides user context throughout the application using React Query
 * for server state management. This follows the industry standard pattern
 * of using React Query for data fetching and caching, while providing
 * a convenient context API for components that need it.
 *
 * Most components should use the hooks directly (useCurrentUser, etc.)
 * but this context is available for deeply nested components or
 * components that need all user data at once.
 */
export function UserContextProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading, error } = useCurrentUser()
  const refreshUser = useRefreshCurrentUser()
  const permissions = useUserPermissions()
  const language = useUserLanguage()
  const business = useUserBusiness()
  const display = useUserDisplay()

  const value: UserContextValue = {
    user,
    isLoading,
    error: error as Error | null,
    refreshUser,
    permissions,
    language,
    business,
    display,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

/**
 * Hook to use the UserContext
 *
 * Note: In most cases, you should use the specific hooks directly
 * (useCurrentUser, useUserPermissions, etc.) instead of this context.
 * This context is mainly for convenience when multiple user properties
 * are needed in a single component.
 */
export function useUserContext() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserContextProvider')
  }
  return context
}

/**
 * HOC to wrap components that require user context
 */
export function withUserContext<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> {
  return function WithUserContextComponent(props: P) {
    return (
      <UserContextProvider>
        <Component {...props} />
      </UserContextProvider>
    )
  }
}
