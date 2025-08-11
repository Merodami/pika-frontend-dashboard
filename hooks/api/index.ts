// Base hooks
export { useApiError } from './base/useApiError'
export { useApiMutation } from './base/useApiMutation'
export { useApiQuery } from './base/useApiQuery'

// Voucher hooks
export {
  useBulkVoucherOperations,
  useClaimVoucher,
  useCreateVoucher,
  useDeleteVoucher,
  useInfiniteVouchers,
  useOptimisticVoucherUpdate,
  usePrefetchVouchers,
  useRedeemVoucher,
  useScanVoucher,
  useSearchVouchers,
  useUpdateVoucher,
  useVoucher,
  useVouchers,
  useVoucherStats,
} from './vouchers/useVouchers'

// Business hooks
export {
  useBulkUpdateBusinesses,
  useBusiness,
  useBusinesses,
  useBusinessStats,
  useCreateBusiness,
  useDeleteBusiness,
  useToggleBusinessActive,
  useUpdateBusiness,
  useVerifyBusiness,
} from './businesses/useBusinesses'

// User hooks
export {
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
  useUser,
  useUsers,
  useUserStats,
} from './users/useUsers'
