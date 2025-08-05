import { mapValues, isFunction } from 'lodash-es'
import { toast } from 'sonner'

import { ApiError } from './generated/core/ApiError'
import { OpenAPI } from './generated/core/OpenAPI'
import { AuthenticationService } from './generated/services/AuthenticationService'
import { BusinessManagementService } from './generated/services/BusinessManagementService'
import { CategoriesService } from './generated/services/CategoriesService'
import { CategoryManagementService } from './generated/services/CategoryManagementService'
import { CommunicationManagementService } from './generated/services/CommunicationManagementService'
import { FinancialManagementService } from './generated/services/FinancialManagementService'
import { MyBusinessService } from './generated/services/MyBusinessService'
import { StorageService } from './generated/services/StorageService'
import { SupportService } from './generated/services/SupportService'
import { UserManagementService } from './generated/services/UserManagementService'
import { UsersService } from './generated/services/UsersService'
import { VoucherManagementService } from './generated/services/VoucherManagementService'
import { VouchersService } from './generated/services/VouchersService'

// Configure OpenAPI client to use Next.js API routes as proxy
// This follows the BFF (Backend for Frontend) pattern for security
OpenAPI.BASE = '/api/proxy'
OpenAPI.WITH_CREDENTIALS = true

// No token management needed - handled server-side via httpOnly cookies
OpenAPI.TOKEN = async () => ''

// Dynamic headers resolver
OpenAPI.HEADERS = async () => ({
  'x-correlation-id': crypto.randomUUID(),
})

// Token refresh is handled server-side in the API route handler
// No client-side token management needed with BFF pattern

// Handle API errors with toast notifications
function handleApiError(error: unknown): never {
  if (error instanceof ApiError) {
    if (error.status && error.status >= 400 && error.status < 500) {
      const message =
        (error.body as { message?: string })?.message ||
        error.message ||
        'Request failed'
      toast.error(message)
    } else if (error.status && error.status >= 500) {
      toast.error('Server error. Please try again later.')
    } else if (error.message) {
      toast.error(error.message)
    }
  } else if (error instanceof Error) {
    toast.error(error.message)
  } else {
    toast.error('An unexpected error occurred')
  }
  throw error
}

// Create wrapper for 401 handling
function wrapWithAuth<T extends (...args: any[]) => Promise<any>>(fn: T): T {
  return (async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    try {
      return await fn(...args)
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        // Token expired, redirect to login
        window.location.href = '/login'
        throw error
      }
      handleApiError(error)
    }
  }) as T
}

// Wrap service methods with auth handling
function wrapService<T extends Record<string, any>>(service: T): T {
  // Use lodash mapValues to transform object properties
  return mapValues(service, (value) => {
    if (isFunction(value)) {
      // Wrap functions with auth handling
      const fn = value as (...args: any[]) => Promise<any>
      return wrapWithAuth(fn.bind(service))
    }
    return value
  }) as T
}

// Create API client interface
export const api = {
  auth: wrapService(AuthenticationService),
  categories: wrapService(CategoriesService),
  categoryManagement: wrapService(CategoryManagementService),
  businesses: wrapService(MyBusinessService),
  businessManagement: wrapService(BusinessManagementService),
  users: wrapService(UsersService),
  userManagement: wrapService(UserManagementService),
  vouchers: wrapService(VouchersService),
  voucherManagement: wrapService(VoucherManagementService),
  communication: wrapService(CommunicationManagementService),
  storage: wrapService(StorageService),
  support: wrapService(SupportService),
  financial: wrapService(FinancialManagementService),
}

// Helper to reset the client (useful for logout)
export function resetApiClient() {
  // Clear any cached data if needed
  OpenAPI.TOKEN = async () => ''
}

// Re-export common types from generated SDK
export type {
  AuthTokensResponse,
  AuthUserResponse,
  BusinessListResponse,
  BusinessResponse,
  CategoryListResponse,
  CategoryResponse,
  RegisterRequest,
  TokenRequest,
  UserProfileResponse,
  VoucherListResponse,
  VoucherResponse,
} from './generated'
