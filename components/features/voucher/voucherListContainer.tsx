'use client'

import { useState, useMemo } from 'react'
import { message } from 'antd'
import { Ticket } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { UserRole } from '@/lib/api/orval-client'

import {
  BulkActions,
  commonBulkActions,
} from '@/components/ui/DataGrid/actions/BulkActions'
import { ContextActionBar } from '@/components/ui/ContextActionBar'
import type { ActionItem } from '@/components/ui/ContextActionBar'
import {
  getAdminVoucherList,
  deleteAdminVoucher,
  publishAdminVoucher,
} from '@/lib/api/orval-client'
import type { Locale } from '@/i18n/config'
import { useServerDataTable } from '@/hooks/useDataTable'

import { VoucherTable } from './voucherTable'
import { VoucherFilters } from './voucherFilters'

interface VoucherListContainerProps {
  userRole: UserRole
  businessId?: string
  locale: Locale
}

export function VoucherListContainer({
  userRole,
  businessId,
  locale,
}: VoucherListContainerProps) {
  const router = useRouter()
  const t = useTranslations()
  const queryClient = useQueryClient()

  // Initialize data table with server-side support
  const dataTable = useServerDataTable({
    initialPageSize: 20,
    onFilter: (filters) => {
      console.log('Filter changed:', filters)
    },
    onSort: (field, order) => {
      console.log('Sort changed:', { field, order })
    },
  })

  // State to track query params from DataGrid
  const [gridQueryParams, setGridQueryParams] = useState<any>({})

  // Merge query params from both useServerDataTable and DataGridServer
  const finalQueryParams = useMemo(() => {
    // Prioritize grid params for pagination since DataGridServer controls it
    return {
      ...dataTable.queryParams,
      ...gridQueryParams,
      ...(businessId && { businessId }), // Include businessId if provided
      include: 'business', // Always include business data
    }
  }, [dataTable.queryParams, gridQueryParams, businessId])

  // Fetch vouchers data - driven by DataGrid's query params
  const { data, isLoading } = useQuery({
    queryKey: ['admin-vouchers', finalQueryParams],
    queryFn: async () => {
      console.log('🔄 Fetching vouchers with params:', finalQueryParams)
      return await getAdminVoucherList(finalQueryParams)
    },
    placeholderData: (previousData) => previousData,
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteAdminVoucher,
    onSuccess: () => {
      message.success(t('voucher.message.deleteSuccess'))
      queryClient.invalidateQueries({ queryKey: ['admin-vouchers'] })
      dataTable.clearSelection()
    },
    onError: () => {
      message.error(t('common.message.errorOccurred'))
    },
  })

  // Publish mutation
  const publishMutation = useMutation({
    mutationFn: publishAdminVoucher,
    onSuccess: () => {
      message.success(t('voucher.message.publishSuccess'))
      queryClient.invalidateQueries({ queryKey: ['admin-vouchers'] })
    },
    onError: () => {
      message.error(t('common.message.errorOccurred'))
    },
  })


  // Event handlers
  const handleViewVoucher = (id: string) => {
    const path =
      userRole === UserRole.ADMIN
        ? `/${locale}/admin/vouchers/${id}`
        : `/${locale}/business/vouchers/${id}`
    router.push(path)
  }

  const handleEditVoucher = (id: string) => {
    const path =
      userRole === UserRole.ADMIN
        ? `/${locale}/admin/vouchers/${id}/edit`
        : `/${locale}/business/vouchers/${id}/edit`
    router.push(path)
  }

  const handleDeleteVoucher = (id: string) => {
    deleteMutation.mutate(id)
  }

  const handlePublishVoucher = (id: string) => {
    publishMutation.mutate(id)
  }


  const handleCreateVoucher = () => {
    const path =
      userRole === UserRole.ADMIN
        ? `/${locale}/admin/vouchers/create`
        : `/${locale}/business/vouchers/create`
    router.push(path)
  }

  const handleBulkDelete = async (selectedKeys: React.Key[]) => {
    try {
      await Promise.all(
        selectedKeys.map((key) => deleteAdminVoucher(String(key)))
      )
      message.success(t('voucher.message.bulkDeleteSuccess'))
      queryClient.invalidateQueries({ queryKey: ['admin-vouchers'] })
      dataTable.clearSelection()
    } catch (error) {
      message.error(t('common.message.errorOccurred'))
    }
  }

  // Context actions
  const contextActions: ActionItem[] = [
    {
      key: 'add',
      label: t('voucher.action.create'),
      icon: <Ticket className="w-4 h-4" />,
      type: 'primary',
      onClick: handleCreateVoucher,
    },
  ]

  return (
    <div className="space-y-0">
      <ContextActionBar
        breadcrumbs={[
          {
            label: t('navigation.dashboard'),
            onClick: () => router.push(`/${locale}/admin`),
          },
          { label: t('navigation.vouchers') },
        ]}
        actions={contextActions}
      />

      <div className="p-4">
        {/* Filters */}
        <VoucherFilters
          values={dataTable.state.filters}
          onChange={dataTable.setFilters}
          onReset={dataTable.clearFilters}
        />

        {/* Bulk Actions */}
        <BulkActions
          selectedKeys={dataTable.state.selectedRowKeys}
          onClear={dataTable.clearSelection}
          actions={[commonBulkActions.deleteMultiple(handleBulkDelete)]}
        />

        {/* Vouchers Table */}
        <VoucherTable
          data={data?.data || []}
          loading={isLoading}
          pagination={dataTable.serverPagination(data?.pagination)}
          onView={handleViewVoucher}
          onEdit={handleEditVoucher}
          onDelete={handleDeleteVoucher}
          onPublish={handlePublishVoucher}
          onQueryChange={setGridQueryParams}
        />
      </div>
    </div>
  )
}
