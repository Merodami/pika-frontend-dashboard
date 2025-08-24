'use client'

import { useState, useMemo } from 'react'
import { message } from 'antd'
import { Building } from 'lucide-react'
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
  getAdminBusinessList,
  deleteAdminBusiness,
  approveAdminBusiness,
} from '@/lib/api/orval-client'
import type { Locale } from '@/i18n/config'
import { useServerDataTable } from '@/hooks/useDataTable'

import { BusinessTable } from './businessTable'
import { BusinessFilters } from './businessFilters'
import AddBusinessDrawer from '@/app/[locale]/(dashboard)/admin/businesses/AddBusinessDrawer'

interface BusinessListContainerProps {
  userRole: UserRole
  locale: Locale
}

export function BusinessListContainer({ locale }: BusinessListContainerProps) {
  const router = useRouter()
  const t = useTranslations()
  const queryClient = useQueryClient()
  const [isAddBusinessDrawerOpen, setIsAddBusinessDrawerOpen] = useState(false)

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
      include: 'user,category,businessRegistration', // Always include related data
    }
  }, [dataTable.queryParams, gridQueryParams])

  // Fetch businesses data - driven by DataGrid's query params
  const { data, isLoading } = useQuery({
    queryKey: ['admin-businesses', finalQueryParams],
    queryFn: async () => {
      console.log('🔄 Fetching businesses with params:', finalQueryParams)
      return await getAdminBusinessList(finalQueryParams)
    },
    placeholderData: (previousData) => previousData,
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteAdminBusiness,
    onSuccess: () => {
      message.success(t('business.message.deleteSuccess'))
      queryClient.invalidateQueries({ queryKey: ['admin-businesses'] })
      dataTable.clearSelection()
    },
    onError: () => {
      message.error(t('common.message.errorOccurred'))
    },
  })

  // Approve mutation
  const approveMutation = useMutation({
    mutationFn: ({ id, approved }: { id: string; approved: boolean }) =>
      approveAdminBusiness(id, { approved }),
    onSuccess: () => {
      message.success(t('business.message.approveSuccess'))
      queryClient.invalidateQueries({ queryKey: ['admin-businesses'] })
    },
    onError: () => {
      message.error(t('common.message.errorOccurred'))
    },
  })

  // Event handlers
  const handleViewBusiness = (id: string) => {
    router.push(`/${locale}/admin/businesses/${id}`)
  }

  const handleEditBusiness = (id: string) => {
    router.push(`/${locale}/admin/businesses/${id}/edit`)
  }

  const handleDeleteBusiness = (id: string) => {
    deleteMutation.mutate(id)
  }

  const handleApproveBusiness = (id: string) => {
    approveMutation.mutate({ id, approved: true })
  }

  const handleRejectBusiness = (id: string) => {
    approveMutation.mutate({ id, approved: false })
  }

  const handleAddBusiness = () => {
    setIsAddBusinessDrawerOpen(true)
  }

  const handleBulkDelete = async (selectedKeys: React.Key[]) => {
    try {
      await Promise.all(
        selectedKeys.map((key) => deleteAdminBusiness(String(key)))
      )
      message.success(t('business.message.bulkDeleteSuccess'))
      queryClient.invalidateQueries({ queryKey: ['admin-businesses'] })
      dataTable.clearSelection()
    } catch (error) {
      message.error(t('common.message.errorOccurred'))
    }
  }

  // Context actions
  const contextActions: ActionItem[] = [
    {
      key: 'add',
      label: t('business.action.create'),
      icon: <Building className="w-4 h-4" />,
      type: 'primary',
      onClick: handleAddBusiness,
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
          { label: t('navigation.businesses') },
        ]}
        actions={contextActions}
      />

      <div className="p-4">
        {/* Filters */}
        <BusinessFilters
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

        {/* Businesses Table */}
        <BusinessTable
          data={data?.data || []}
          loading={isLoading}
          pagination={dataTable.serverPagination(data?.pagination)}
          onView={handleViewBusiness}
          onEdit={handleEditBusiness}
          onDelete={handleDeleteBusiness}
          onApprove={handleApproveBusiness}
          onReject={handleRejectBusiness}
          onQueryChange={setGridQueryParams}
        />
      </div>

      {/* Add Business Drawer */}
      <AddBusinessDrawer
        open={isAddBusinessDrawerOpen}
        onClose={() => setIsAddBusinessDrawerOpen(false)}
        locale={locale}
      />
    </div>
  )
}
