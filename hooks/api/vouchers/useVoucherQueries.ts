import { useQuery } from '@tanstack/react-query'
import { UserRole } from '@merodami/pika-types'
import type {
  AdminVoucherListResponse,
  AdminVoucherResponse,
  AdminVoucherQueryParams,
  AdminVoucherAnalyticsResponse,
  AdminBusinessVoucherStatsResponse,
} from '@/lib/api/orval-generated/models'

import {
  getAdminVoucherList,
  getAdminVoucherById,
  getAdminVoucherAnalytics,
  getAdminBusinessVoucherStats,
} from '@/lib/api/orval-generated/endpoints'

export function useVoucherQueries() {
  const useVouchersList = (
    params?: AdminVoucherQueryParams,
    userRole: UserRole = UserRole.ADMIN
  ) => {
    return useQuery<AdminVoucherListResponse>({
      queryKey: ['vouchers', params, userRole],
      queryFn: () =>
        userRole === UserRole.ADMIN
          ? getAdminVoucherList(params)
          : getAdminVoucherList({ ...params, businessId: params?.businessId }),
      staleTime: 5 * 60 * 1000, // 5 minutes
    })
  }

  const useVoucher = (id: string, userRole: UserRole = UserRole.ADMIN) => {
    return useQuery<AdminVoucherResponse>({
      queryKey: ['voucher', id, userRole],
      queryFn: () => getAdminVoucherById(id),
      enabled: !!id,
    })
  }

  const useVoucherAnalytics = (voucherId: string, params?: any) => {
    return useQuery<AdminVoucherAnalyticsResponse>({
      queryKey: ['voucher-analytics', voucherId, params],
      queryFn: () => getAdminVoucherAnalytics(voucherId, params),
      enabled: !!voucherId,
      staleTime: 10 * 60 * 1000, // 10 minutes
    })
  }

  const useBusinessVoucherStats = (businessId: string) => {
    return useQuery<AdminBusinessVoucherStatsResponse>({
      queryKey: ['business-voucher-stats', businessId],
      queryFn: () => getAdminBusinessVoucherStats(businessId),
      enabled: !!businessId,
      staleTime: 5 * 60 * 1000,
    })
  }

  return {
    useVouchersList,
    useVoucher,
    useVoucherAnalytics,
    useBusinessVoucherStats,
  }
}
