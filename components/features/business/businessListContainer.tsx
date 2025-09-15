'use client'

import { useState, useMemo } from 'react'
import { message } from 'antd'
import { Building } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { UserRole } from '@/lib/api/orval-client'

import {
  BulkActions,
  commonBulkActions,
} from '@/components/ui/DataGrid/actions/BulkActions'
import { ContextActionBar } from '@/components/ui/ContextActionBar'
import type { ActionItem } from '@/components/ui/ContextActionBar'
import type { Locale } from '@/i18n/config'
import { useServerDataTable } from '@/hooks/useDataTable'
import {
  useBusinesses,
  useDeleteBusiness,
  useApproveBusiness,
} from '@/hooks/api/businesses/useBusinesses'

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
      include: 'user,category,businessRegistration,businessDetails', // Always include related data
    }
  }, [dataTable.queryParams, gridQueryParams])

  // Use custom hook for fetching businesses
  const { data, isLoading } = useBusinesses(finalQueryParams)

  // Use custom hooks for mutations with translated messages
  const deleteMutation = useDeleteBusiness({
    successMessage: t('business.message.deleteSuccess'),
    errorMessage: t('common.message.errorOccurred'),
  })
  const approveMutation = useApproveBusiness({
    successMessage: (data) =>
      data.approved
        ? t('business.message.approveSuccess')
        : t('business.message.rejectSuccess'),
    errorMessage: t('common.message.errorOccurred'),
  })

  // Event handlers
  const handleViewBusiness = (id: string) => {
    router.push(`/${locale}/admin/businesses/${id}`)
  }

  const handleEditBusiness = (id: string) => {
    router.push(`/${locale}/admin/businesses/${id}/edit`)
  }

  const handleDeleteBusiness = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        dataTable.clearSelection()
      },
    })
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
      // Use the delete mutation for each selected item
      await Promise.all(
        selectedKeys.map((key) => deleteMutation.mutateAsync(String(key)))
      )
      message.success(t('business.message.bulkDeleteSuccess'))
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
