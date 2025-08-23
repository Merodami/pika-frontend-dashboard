import { useQuery } from '@tanstack/react-query'
import { UserRole } from '@/lib/api/orval-client'
import type {
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

import {
  mapAdminVoucherResponseToDomain,
  mapAdminVoucherListResponseToDomain,
  type VoucherDomain,
  type VoucherListDomain,
} from '@/lib/api/mappers/voucher'

export function useVoucherQueries() {
  const useVouchersList = (
    params?: AdminVoucherQueryParams,
    userRole: UserRole = UserRole.admin
  ) => {
    return useQuery<VoucherListDomain>({
      queryKey: ['vouchers', params, userRole],
      queryFn: async () => {
        const response =
          userRole === UserRole.admin
            ? await getAdminVoucherList(params)
            : await getAdminVoucherList({
                ...params,
                businessId: params?.businessId,
              })
        return mapAdminVoucherListResponseToDomain(response)
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    })
  }

  const useVoucher = (id: string, userRole: UserRole = UserRole.admin) => {
    return useQuery<VoucherDomain>({
      queryKey: ['voucher', id, userRole],
      queryFn: async () => {
        const response = await getAdminVoucherById(id)
        return mapAdminVoucherResponseToDomain(response)
      },
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
