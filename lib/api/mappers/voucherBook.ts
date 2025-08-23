/**
 * VoucherBook API Mappers
 *
 * Converts between Orval-generated API types and domain types
 * This layer handles type conversions between external API contracts and internal domain types.
 */

import type {
  GetAdminVoucherBookList200DataItem,
  GetAdminVoucherBookList200,
  GetAdminVoucherBookList200DataItemStatus,
  GetAdminVoucherBookList200DataItemBookType,
} from '../orval-client'

/**
 * Domain voucher book interface - cleaner types for components
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
 * Domain types for better component usage
 */
export enum VoucherBookStatus {
  DRAFT = 'draft',
  READY_FOR_PRINT = 'readyForPrint',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export enum VoucherBookType {
  MONTHLY = 'monthly',
  SPECIAL_EDITION = 'specialEdition',
  REGIONAL = 'regional',
  SEASONAL = 'seasonal',
  PROMOTIONAL = 'promotional',
}

/**
 * Convert API status to domain enum
 */
export const mapApiStatusToDomain = (
  apiStatus: GetAdminVoucherBookList200DataItemStatus
): VoucherBookStatus => {
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
 * Convert API book type to domain enum
 */
export const mapApiBookTypeToDomain = (
  apiType: GetAdminVoucherBookList200DataItemBookType
): VoucherBookType => {
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
 * Convert API item to domain object
 */
export const mapApiVoucherBookToDomain = (
  apiBook: GetAdminVoucherBookList200DataItem
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