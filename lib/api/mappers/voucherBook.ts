/**
 * VoucherBook API Mappers
 *
 * Converts between Orval-generated API types and domain types
 * Uses backend shared types for consistency
 */

import type {
  GetAdminVoucherBookList200DataItem,
  GetAdminVoucherBookList200,
  GetAdminVoucherBookById200,
} from '../orval-client'

// Use backend types instead of creating our own
import { VoucherBookStatus, VoucherBookType } from '@merodami/pika-types'
import type {
  VoucherBookStatusType,
  VoucherBookTypeType,
} from '@merodami/pika-types'

export { VoucherBookStatus, VoucherBookType }
export type { VoucherBookStatusType, VoucherBookTypeType }

/**
 * Domain voucher book interface that works with both list and single item API responses
 */
export interface VoucherBookDomain {
  id: string
  title: string
  edition?: string
  bookType: VoucherBookType
  month?: number
  year: number
  status: VoucherBookStatus
  totalPages: number
  pageCount: number
  totalPlacements: number
  distributionCount: number
  publishedAt?: string
  coverImageUrl?: string
  backImageUrl?: string
  pdfUrl?: string
  pdfGeneratedAt?: string
  metadata?: Record<string, any>
  createdBy: string
  updatedBy?: string
  createdAt: string
  updatedAt: string
}

/**
 * Convert API status string to domain enum
 */
export const mapApiStatusToDomain = (apiStatus: string): VoucherBookStatus => {
  switch (apiStatus) {
    case 'draft':
      return VoucherBookStatus.DRAFT
    case 'readyForPrint':
      return VoucherBookStatus.READY_FOR_PRINT
    case 'published':
      return VoucherBookStatus.PUBLISHED
    case 'archived':
      return VoucherBookStatus.ARCHIVED
    default:
      return VoucherBookStatus.DRAFT
  }
}

/**
 * Convert API book type string to domain enum
 */
export const mapApiBookTypeToDomain = (apiType: string): VoucherBookType => {
  switch (apiType) {
    case 'monthly':
      return VoucherBookType.MONTHLY
    case 'specialEdition':
      return VoucherBookType.SPECIAL_EDITION
    case 'regional':
      return VoucherBookType.REGIONAL
    case 'seasonal':
      return VoucherBookType.SEASONAL
    case 'promotional':
      return VoucherBookType.PROMOTIONAL
    default:
      return VoucherBookType.MONTHLY
  }
}

/**
 * Convert API response to domain object (works with both list item and single item responses)
 */
export const mapApiVoucherBookToDomain = (
  apiBook: GetAdminVoucherBookList200DataItem | GetAdminVoucherBookById200
): VoucherBookDomain => {
  return {
    ...apiBook,
    status: mapApiStatusToDomain(apiBook.status),
    bookType: mapApiBookTypeToDomain(apiBook.bookType),
  }
}

/**
 * Domain voucher book list type
 */
export type VoucherBookListDomain = Omit<GetAdminVoucherBookList200, 'data'> & {
  data: VoucherBookDomain[]
}

/**
 * Convert API list response to domain list
 */
export const mapApiVoucherBookListToDomain = (
  response: GetAdminVoucherBookList200
): VoucherBookListDomain => {
  return {
    ...response,
    data: response.data?.map(mapApiVoucherBookToDomain) || [],
  }
}
