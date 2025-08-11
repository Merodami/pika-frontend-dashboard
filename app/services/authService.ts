import 'server-only'

import { UserRole, type UserRoleType } from '@merodami/pika-types'
import { cache } from 'react'

import { getUserProfile } from '@/lib/api/orval-client'
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from './tokenService'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRoleType
  createdAt: string
  updatedAt: string
}

// Re-export token functions for backward compatibility
export { clearTokens, getAccessToken, getRefreshToken, setTokens }

// Cache the current user for the duration of the request
export const getCurrentUser = cache(async (): Promise<User | null> => {
  try {
    const token = await getAccessToken()

    if (!token) return null

    // With Orval, directly call the function - token is handled by interceptor
    const userData = await getUserProfile()

    return {
      id: userData.id,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: userData.role as UserRoleType,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    }
  } catch (error) {
    return null
  }
})

// Protect server actions and pages
export async function requireAuth() {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  return user
}

export async function requireRole(role: UserRoleType | UserRoleType[]) {
  const user = await requireAuth()
  const roles = Array.isArray(role) ? role : [role]

  if (!roles.includes(user.role)) {
    throw new Error('Forbidden')
  }

  return user
}

export async function requireBusiness() {
  const user = await requireAuth()

  if (user.role !== UserRole.BUSINESS) {
    throw new Error('Business access required')
  }

  return user
}

export async function requireAdmin() {
  return requireRole(UserRole.ADMIN)
}
