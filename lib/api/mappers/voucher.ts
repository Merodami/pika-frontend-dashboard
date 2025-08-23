/**
 * Voucher API Mappers
 * 
 * Converts between Orval-generated API types and @merodami/pika-types package types
 * This is the proper architectural layer for handling type conversions between
 * external API contracts and internal domain types.
 */

import { 
  VoucherState as PackageVoucherState, 
  VoucherDiscountType as PackageVoucherDiscountType 
} from '@merodami/pika-types'
import type { 
  VoucherState as OrvalVoucherState,
  VoucherDiscountType as OrvalVoucherDiscountType,
  AdminVoucherResponse,
  AdminCreateVoucherRequest,
  AdminUpdateVoucherRequest
} from '../orval-generated/models'

/**
 * Convert Orval API VoucherState to Package VoucherState
 */
export const mapOrvalVoucherStateToPackage = (orvalState: OrvalVoucherState): PackageVoucherState => {
  switch (orvalState) {
    case 'draft': return PackageVoucherState.DRAFT
    case 'published': return PackageVoucherState.PUBLISHED
    case 'claimed': return PackageVoucherState.CLAIMED
    case 'redeemed': return PackageVoucherState.REDEEMED
    case 'expired': return PackageVoucherState.EXPIRED
    case 'suspended': return PackageVoucherState.SUSPENDED
    default: return PackageVoucherState.DRAFT
  }
}

/**
 * Convert Package VoucherState to Orval API VoucherState
 */
export const mapPackageVoucherStateToOrval = (packageState: PackageVoucherState): OrvalVoucherState => {
  switch (packageState) {
    case PackageVoucherState.DRAFT: return 'draft'
    case PackageVoucherState.PUBLISHED: return 'published'
    case PackageVoucherState.CLAIMED: return 'claimed'
    case PackageVoucherState.REDEEMED: return 'redeemed'
    case PackageVoucherState.EXPIRED: return 'expired'
    case PackageVoucherState.SUSPENDED: return 'suspended'
    default: return 'draft'
  }
}

/**
 * Convert Orval API VoucherDiscountType to Package VoucherDiscountType
 */
export const mapOrvalVoucherDiscountTypeToPackage = (orvalType: OrvalVoucherDiscountType): PackageVoucherDiscountType => {
  switch (orvalType) {
    case 'fixed': return PackageVoucherDiscountType.FIXED
    case 'percentage': return PackageVoucherDiscountType.PERCENTAGE
    default: return PackageVoucherDiscountType.PERCENTAGE
  }
}

/**
 * Convert Package VoucherDiscountType to Orval API VoucherDiscountType
 */
export const mapPackageVoucherDiscountTypeToOrval = (packageType: PackageVoucherDiscountType): OrvalVoucherDiscountType => {
  switch (packageType) {
    case PackageVoucherDiscountType.FIXED: return 'fixed'
    case PackageVoucherDiscountType.PERCENTAGE: return 'percentage'
    default: return 'percentage'
  }
}

/**
 * Domain voucher interface using package types (the correct types for components)
 */
export interface VoucherDomain {
  id: string
  businessId: string
  categoryId: string
  title?: Record<string, string>
  description?: Record<string, string>
  state: PackageVoucherState  // Using package enum
  discountType: PackageVoucherDiscountType  // Using package enum
  discountValue: number
  currency: string
  validFrom: string
  expiresAt?: string
  maxRedemptions?: number
  maxRedemptionsPerUser: number
  currentRedemptions?: number
  scanCount?: number
  imageUrl?: string
  metadata?: Record<string, any>
  createdAt: string
  updatedAt: string
  business?: {
    id: string
    name: string
    description?: string
  }
  category?: {
    id: string
    name: string
    description?: string
  }
}

/**
 * Convert AdminVoucherResponse (Orval) to VoucherDomain (Package types)
 * This is the main mapper components should use
 */
export const mapAdminVoucherResponseToDomain = (response: AdminVoucherResponse): VoucherDomain => {
  return {
    ...response,
    state: mapOrvalVoucherStateToPackage(response.state),
    discountType: mapOrvalVoucherDiscountTypeToPackage(response.discountType),
  }
}

/**
 * Convert VoucherDomain to create request (Package types -> Orval types)
 */
export const mapDomainToCreateRequest = (domain: Partial<VoucherDomain>): Partial<AdminCreateVoucherRequest> => {
  const { state, discountType, ...rest } = domain
  return {
    ...rest,
    ...(state && { state: mapPackageVoucherStateToOrval(state) }),
    ...(discountType && { discountType: mapPackageVoucherDiscountTypeToOrval(discountType) }),
  }
}

/**
 * Convert VoucherDomain to update request (Package types -> Orval types)
 */
export const mapDomainToUpdateRequest = (domain: Partial<VoucherDomain>): Partial<AdminUpdateVoucherRequest> => {
  const { state, discountType, ...rest } = domain
  return {
    ...rest,
    ...(state && { state: mapPackageVoucherStateToOrval(state) }),
    ...(discountType && { discountType: mapPackageVoucherDiscountTypeToOrval(discountType) }),
  }
}