import { useQueryClient } from '@tanstack/react-query'
import { isEmpty, isNil, omitBy } from 'lodash-es'

import {
  getAdminVoucherBookList,
  getAdminVoucherBookById,
  createAdminVoucherBook,
  updateAdminVoucherBook,
  deleteAdminVoucherBook,
  updateAdminVoucherBookStatus,
  generateAdminVoucherBookPdf,
  bulkArchiveAdminVoucherBooks,
  getAdminVoucherBookStatistics,
  type GetAdminVoucherBookListParams,
  type GetAdminVoucherBookList200,
  type GetAdminVoucherBookById200,
  type CreateAdminVoucherBookBody,
  type UpdateAdminVoucherBookBody,
  type UpdateAdminVoucherBookStatusBody,
  type GenerateAdminVoucherBookPdfBody,
  type BulkArchiveAdminVoucherBooksBody,
  type GetAdminVoucherBookStatistics200,
  type GenerateAdminVoucherBookPdf200,
} from '@/lib/api/orval-client'
import { queryKeys } from '@/lib/api/queryKeys'

import { useApiMutation } from '../base/useApiMutation'
import { useApiQuery } from '../base/useApiQuery'

/**
 * Clean filters by removing null/undefined/empty values
 */
const cleanFilters = (filters?: GetAdminVoucherBookListParams) =>
  omitBy(
    filters,
    (value) => isNil(value) || (typeof value === 'string' && isEmpty(value))
  )

/**
 * Hook to fetch voucher books list with filters
 */
export function useVoucherBooks(filters?: GetAdminVoucherBookListParams) {
  const cleaned = cleanFilters(filters)

  return useApiQuery<GetAdminVoucherBookList200>({
    queryKey: queryKeys.voucherBooks.list(cleaned),
    queryFn: () => getAdminVoucherBookList(cleaned),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    placeholderData: (previousData) => previousData,
  })
}

/**
 * Hook to fetch a single voucher book by ID
 */
export function useVoucherBook(id: string, options?: { enabled?: boolean }) {
  return useApiQuery<GetAdminVoucherBookById200>({
    queryKey: queryKeys.voucherBooks.detail(id),
    queryFn: () => getAdminVoucherBookById(id),
    enabled: options?.enabled ?? !!id,
  })
}

/**
 * Hook to fetch voucher book statistics
 */
export function useVoucherBookStatistics() {
  return useApiQuery<GetAdminVoucherBookStatistics200>({
    queryKey: queryKeys.voucherBooks.statistics(),
    queryFn: () => getAdminVoucherBookStatistics(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

/**
 * Hook to create a new voucher book
 */
export function useCreateVoucherBook(options?: {
  successMessage?: string
  errorMessage?: string
}) {
  const queryClient = useQueryClient()

  return useApiMutation<
    GetAdminVoucherBookById200,
    Error,
    CreateAdminVoucherBookBody
  >({
    mutationFn: (data) => createAdminVoucherBook(data),
    successMessage: options?.successMessage,
    errorMessage: options?.errorMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.voucherBooks.lists(),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.voucherBooks.statistics(),
      })
    },
  })
}

/**
 * Hook to update a voucher book
 */
export function useUpdateVoucherBook() {
  const queryClient = useQueryClient()

  return useApiMutation<
    GetAdminVoucherBookById200,
    Error,
    { id: string; data: UpdateAdminVoucherBookBody }
  >({
    mutationFn: ({ id, data }) => updateAdminVoucherBook(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.voucherBooks.detail(id),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.voucherBooks.lists(),
      })
    },
  })
}

/**
 * Hook to delete a voucher book
 */
export function useDeleteVoucherBook(options?: {
  successMessage?: string
  errorMessage?: string
}) {
  const queryClient = useQueryClient()

  return useApiMutation<null, Error, string>({
    mutationFn: (id) => deleteAdminVoucherBook(id),
    successMessage: options?.successMessage,
    errorMessage: options?.errorMessage,
    onSuccess: (_, id) => {
      queryClient.removeQueries({
        queryKey: queryKeys.voucherBooks.detail(id),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.voucherBooks.lists(),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.voucherBooks.statistics(),
      })
    },
  })
}

/**
 * Hook to update voucher book status
 */
export function useUpdateVoucherBookStatus() {
  const queryClient = useQueryClient()

  return useApiMutation<
    GetAdminVoucherBookById200,
    Error,
    { id: string; data: UpdateAdminVoucherBookStatusBody }
  >({
    mutationFn: ({ id, data }) => updateAdminVoucherBookStatus(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.voucherBooks.detail(id),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.voucherBooks.lists(),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.voucherBooks.statistics(),
      })
    },
  })
}

/**
 * Hook to generate PDF for voucher book
 */
export function useGenerateVoucherBookPdf() {
  const queryClient = useQueryClient()

  return useApiMutation<
    GenerateAdminVoucherBookPdf200,
    Error,
    { id: string; data: GenerateAdminVoucherBookPdfBody }
  >({
    mutationFn: ({ id, data }) => generateAdminVoucherBookPdf(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.voucherBooks.detail(id),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.voucherBooks.lists(),
      })
    },
  })
}

/**
 * Hook to bulk archive voucher books
 */
export function useBulkArchiveVoucherBooks() {
  const queryClient = useQueryClient()

  return useApiMutation<any, Error, BulkArchiveAdminVoucherBooksBody>({
    mutationFn: (data) => bulkArchiveAdminVoucherBooks(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.voucherBooks.all(),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.voucherBooks.statistics(),
      })
    },
  })
}
