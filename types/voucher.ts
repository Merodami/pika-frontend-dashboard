// Frontend-specific voucher UI types
// These are for the voucher design/preview components

import { VoucherDiscountType } from '@merodami/pika-types'
import type { AdminVoucherQueryParams, AdminVoucherResponse, AdminCreateVoucherRequest, AdminUpdateVoucherRequest } from '@/lib/api/orval-generated/models'

export interface VoucherDesign {
  // Basic info
  title: string
  description: string
  category: string

  // Visual design settings
  colors?: {
    background: string
    text: string
    accent: string
  }
  primaryColor: string
  secondaryColor: string
  textColor: string
  backgroundColor: string
  template: 'classic' | 'modern' | 'minimal' | 'bold'

  // Business branding
  businessName: string
  businessAddress?: string
  businessPhone?: string
  businessWebsite?: string
  logo?: string
  banner?: string

  // Discount details
  discountType: VoucherDiscountType
  discountValue: number
  originalPrice?: number

  // Validity
  validFrom: Date | string
  validUntil: Date | string
  validityPeriod?: string
  expirationDate?: Date | string

  // Restrictions
  maxRedemptions?: number
  maxRedemptionsPerUser?: number
  minimumPurchase?: number

  // Legal/terms
  terms: string[]
}

// Voucher form data (what gets sent to the API)
export interface VoucherFormData {
  title: string
  description: string
  value: number
  validFrom: Date
  validUntil: Date
  quantity: number
  design: VoucherDesign
}

/**
 * Additional types for TypeScript compatibility
 */

// Import the properly mapped domain type
export type { VoucherDomain } from '@/lib/api/mappers/voucher'

// Use AdminVoucherQueryParams for search
export type VoucherSearchParams = AdminVoucherQueryParams

// Use AdminCreateVoucherRequest as the create data type
export type CreateVoucherData = AdminCreateVoucherRequest

// Use AdminUpdateVoucherRequest as the update data type
export type UpdateVoucherFormData = AdminUpdateVoucherRequest
