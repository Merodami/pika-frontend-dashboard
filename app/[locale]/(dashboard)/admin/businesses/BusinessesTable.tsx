'use client'

import { useState, useCallback } from 'react'
import { Tag, Avatar, message } from 'antd'
import { Plus, Store, CheckCircle, XCircle, Star, User } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { debounce } from 'lodash-es'

import {
  DataTable,
  createColumns,
  createActionColumn,
  createDateColumn,
} from '@/components/ui/DataTable'
import { TableFilters, commonFilters } from '@/components/ui/DataTable'
import {
  BulkActions,
  commonBulkActions,
  TableActions,
  commonActions,
} from '@/components/ui/DataTable'
import { ContextActionBar } from '@/components/ui/ContextActionBar'
import type { ActionItem } from '@/components/ui/ContextActionBar'
import AddBusinessDrawer from './AddBusinessDrawer'
import { useServerDataTable } from '@/hooks/useDataTable'
import {
  useBusinesses,
  useVerifyBusiness,
  useToggleBusinessActive,
  useApproveBusiness,
  useDeleteBusiness,
  useBulkUpdateBusinesses,
} from '@/hooks/api/businesses/useBusinesses'
import type {
  GetAdminBusinessList200DataItem,
  GetAdminBusinessListParams,
} from '@/lib/api/orval-client'

interface BusinessesTableProps {
  locale: string
}

export default function BusinessesTable({ locale }: BusinessesTableProps) {
  const router = useRouter()
  const t = useTranslations()
  const [isAddBusinessDrawerOpen, setIsAddBusinessDrawerOpen] = useState(false)

  // Data table state management
  const dataTable = useServerDataTable<GetAdminBusinessList200DataItem>({
    initialPageSize: 20,
  })

  // Build query params from dataTable state
  const queryParams: GetAdminBusinessListParams = {
    page: dataTable.state.page,
    limit: dataTable.state.pageSize,
    search: dataTable.state.search || undefined,
    status: dataTable.state.filters.status,
    verified:
      dataTable.state.filters.verified === 'true'
        ? true
        : dataTable.state.filters.verified === 'false'
          ? false
          : undefined,
    active:
      dataTable.state.filters.active === 'true'
        ? true
        : dataTable.state.filters.active === 'false'
          ? false
          : undefined,
    categoryId: dataTable.state.filters.categoryId,
    sortBy: dataTable.state.sortField as any,
    sortOrder: dataTable.state.sortOrder as any,
    createdFrom: dataTable.state.filters.createdFrom,
    createdTo: dataTable.state.filters.createdTo,
    include: 'user,category,businessRegistration',
  }

  // Use custom hook for fetching businesses
  const { data, isLoading, refetch } = useBusinesses(queryParams)

  // Debug logs
  console.log('🔍 Debug BusinessesTable:', {
    queryParams,
    fullResponseData: data, // Show full response
    firstBusiness: data?.data?.[0], // Show complete structure of first business
    isLoading,
    totalBusinesses: data?.data?.length,
    businessRegistrationExists: data?.data?.map((b) => ({
      id: b.id,
      businessName: b.businessName,
      hasRegistration: !!b.businessRegistration,
      registrationId: b.businessRegistration?.id,
      registrationStatus: b.businessRegistration?.registrationStatus,
      allFields: Object.keys(b || {}), // Show all available fields
    })),
  })

  // Use custom hooks for mutations
  const verifyBusinessMutation = useVerifyBusiness()
  const toggleBusinessActiveMutation = useToggleBusinessActive()
  const approveBusinessMutation = useApproveBusiness()
  const deleteBusinessMutation = useDeleteBusiness()
  const bulkUpdateBusinessesMutation = useBulkUpdateBusinesses()

  // Status helpers using proper types
  const getVerificationStatus = (
    verified?: boolean,
    approved?: boolean,
    active?: boolean
  ) => {
    if (!active)
      return { color: 'default', text: t('businesses.status.inactive') }
    if (verified && approved)
      return { color: 'success', text: t('businesses.status.verifiedApproved') }
    if (verified && !approved)
      return { color: 'warning', text: t('businesses.status.verifiedPending') }
    if (!verified && approved)
      return {
        color: 'processing',
        text: t('businesses.status.approvedNotVerified'),
      }
    return { color: 'default', text: t('businesses.status.pending') }
  }

  // Table columns
  const columns = createColumns<GetAdminBusinessList200DataItem>([
    {
      title: t('businesses.fields.name'),
      dataIndex: 'businessName',
      key: 'businessName',
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar size="small" icon={<Store />} />
          <div>
            <div className="font-medium">{record.businessName}</div>
            {record.businessDescription && (
              <div className="text-xs text-gray-500 truncate max-w-xs">
                {record.businessDescription}
              </div>
            )}
          </div>
        </div>
      ),
      sorter: true,
    },
    {
      title: t('businesses.fields.owner'),
      dataIndex: 'user',
      key: 'user',
      render: (_, record) =>
        record.user ? (
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" />
            <div>
              <div className="text-sm">
                {record.user.firstName} {record.user.lastName}
              </div>
              <div className="text-xs text-gray-500">{record.user.email}</div>
            </div>
          </div>
        ) : (
          <span className="text-gray-400">N/A</span>
        ),
    },
    {
      title: t('businesses.fields.category'),
      dataIndex: 'category',
      key: 'category',
      render: (_, record) =>
        record.category ? (
          <Tag>{record.category.name}</Tag>
        ) : (
          <span className="text-gray-400">Uncategorized</span>
        ),
    },
    {
      title: t('businesses.fields.status'),
      key: 'status',
      render: (_, record) => {
        const status = getVerificationStatus(
          record.verified,
          record.approved,
          record.active
        )
        return <Tag color={status.color}>{status.text}</Tag>
      },
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
      ],
    },
    {
      title: t('businesses.fields.verification'),
      key: 'verification',
      render: (_, record) => (
        <div className="flex items-center gap-2">
          {record.verified ? (
            <CheckCircle className="w-4 h-4 text-green-500" />
          ) : (
            <XCircle className="w-4 h-4 text-gray-400" />
          )}
          <span className="text-sm">
            {record.verified
              ? t('businesses.status.verified')
              : t('businesses.status.notVerified')}
          </span>
        </div>
      ),
    },
    {
      title: t('businesses.fields.approval'),
      key: 'approval',
      render: (_, record) => (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            {record.approved ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <XCircle className="w-4 h-4 text-gray-400" />
            )}
            <span className="text-sm">
              {record.approved
                ? t('businesses.status.approved')
                : t('businesses.status.notApproved')}
            </span>
          </div>
          {record.approvedBy && record.approvedAt && (
            <div className="text-xs text-gray-500 mt-1">
              by {record.approvedBy} on{' '}
              {new Date(record.approvedAt).toLocaleDateString(locale)}
            </div>
          )}
        </div>
      ),
    },
    {
      title: t('businesses.fields.rating'),
      dataIndex: 'avgRating',
      key: 'avgRating',
      render: (rating) =>
        rating ? (
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span>{rating.toFixed(1)}</span>
          </div>
        ) : (
          <span className="text-gray-400">No ratings</span>
        ),
      sorter: true,
    },
    createDateColumn(
      'createdAt',
      t('businesses.fields.createdAt'),
      (date) => new Date(date).toLocaleDateString(locale),
      { sorter: true }
    ),
    createActionColumn<GetAdminBusinessList200DataItem>((_, record) => {
      // Debug log for each business record
      console.log('🔧 Action column for business:', {
        businessId: record.id,
        businessName: record.businessName,
        hasRegistration: !!record.businessRegistration,
        registration: record.businessRegistration,
        willShowResetButton: !!record.businessRegistration,
      })

      return (
        <TableActions
          actions={[
            commonActions.view(() =>
              router.push(`/${locale}/admin/businesses/${record.id}`)
            ),
            commonActions.edit(() =>
              router.push(`/${locale}/admin/businesses/${record.id}/edit`)
            ),
            {
              key: 'toggleVerification',
              label: record.verified
                ? t('businesses.action.unverify')
                : t('businesses.action.verify'),
              icon: record.verified ? (
                <XCircle className="w-4 h-4" />
              ) : (
                <CheckCircle className="w-4 h-4" />
              ),
              onClick: () =>
                handleToggleVerification(record.id, !record.verified),
            },
            {
              key: 'toggleApproval',
              label: record.approved
                ? t('businesses.action.unapprove')
                : t('businesses.action.approve'),
              icon: record.approved ? (
                <XCircle className="w-4 h-4" />
              ) : (
                <CheckCircle className="w-4 h-4" />
              ),
              onClick: () => handleToggleApproval(record.id, !record.approved),
            },
            record.active
              ? commonActions.deactivate(() =>
                  handleToggleActive(record.id, false)
                )
              : commonActions.activate(() =>
                  handleToggleActive(record.id, true)
                ),
            commonActions.delete(
              () => handleDelete(record.id),
              record.businessName
            ),
          ]}
        />
      )
    }),
  ])

  // Filter fields
  const filterFields = [
    commonFilters.search('search', t('common.button.search')),
    {
      name: 'verified',
      label: t('businesses.filters.verification'),
      type: 'select' as const,
      options: [
        { label: t('businesses.status.verified'), value: 'true' },
        { label: t('businesses.status.notVerified'), value: 'false' },
      ],
    },
    {
      name: 'approved',
      label: t('businesses.filters.approval'),
      type: 'select' as const,
      options: [
        { label: t('businesses.status.approved'), value: 'true' },
        { label: t('businesses.status.notApproved'), value: 'false' },
      ],
    },
    {
      name: 'active',
      label: t('businesses.filters.status'),
      type: 'select' as const,
      options: [
        { label: t('businesses.status.active'), value: 'true' },
        { label: t('businesses.status.inactive'), value: 'false' },
      ],
    },
    commonFilters.dateRange('created', t('businesses.filters.createdDate')),
  ]

  // Handlers with proper debouncing and error handling
  const handleToggleVerification = useCallback(
    debounce((businessId: string, verified: boolean) => {
      verifyBusinessMutation.mutate({ id: businessId, verified })
    }, 300),
    [verifyBusinessMutation]
  )

  const handleToggleActive = useCallback(
    (businessId: string, active: boolean) => {
      toggleBusinessActiveMutation.mutate({ id: businessId, active })
    },
    [toggleBusinessActiveMutation]
  )

  const handleToggleApproval = useCallback(
    (businessId: string, approved: boolean) => {
      approveBusinessMutation.mutate({ id: businessId, approved })
    },
    [approveBusinessMutation]
  )

  const handleDelete = useCallback(
    (businessId: string) => {
      deleteBusinessMutation.mutate(businessId)
    },
    [deleteBusinessMutation]
  )

  const handleBulkDelete = useCallback(
    async (selectedKeys: React.Key[]) => {
      // Use bulk update mutation for deletion
      const businessIds = selectedKeys as string[]
      try {
        await bulkUpdateBusinessesMutation.mutateAsync({
          businessIds,
          updates: { active: false }, // Soft delete by deactivating
        })
        dataTable.clearSelection()
      } catch (error) {
        console.error('Bulk delete failed:', error)
      }
    },
    [bulkUpdateBusinessesMutation, dataTable]
  )

  const handleBulkVerify = useCallback(
    async (selectedKeys: React.Key[], verified: boolean) => {
      try {
        // Use bulk update for verification status
        await bulkUpdateBusinessesMutation.mutateAsync({
          businessIds: selectedKeys as string[],
          updates: { verified },
        })

        message.success(
          t('businesses.message.bulkVerified', {
            count: selectedKeys.length,
            status: verified ? 'verified' : 'unverified',
          })
        )

        dataTable.clearSelection()
      } catch (error) {
        console.error('Bulk verify failed:', error)
        message.error(t('common.message.errorOccurred'))
      }
    },
    [bulkUpdateBusinessesMutation, dataTable, t]
  )

  const handleExport = useCallback(() => {
    // TODO: Implement export using backend endpoint when available
    message.info(t('common.message.featureComingSoon'))
  }, [t])

  // Context action bar actions
  const contextActions: ActionItem[] = [
    {
      key: 'add',
      label: t('common.button.create'),
      icon: <Plus className="w-4 h-4" />,
      type: 'primary',
      onClick: () => setIsAddBusinessDrawerOpen(true),
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

      <div className="space-y-3 p-4">
        <TableFilters
          fields={filterFields}
          values={dataTable.state.filters}
          onChange={(filters) => {
            const processedFilters = { ...filters }
            if (filters.createdFrom || filters.createdTo) {
              processedFilters.createdFrom = filters.createdFrom
              processedFilters.createdTo = filters.createdTo
            }
            dataTable.setFilters(processedFilters)
          }}
          onReset={dataTable.clearFilters}
        />

        <DataTable
          title={t('navigation.businesses')}
          description={t('businesses.description')}
          columns={columns}
          data={data?.data || []}
          loading={isLoading}
          searchable
          searchPlaceholder={t('common.button.search')}
          onSearch={dataTable.handleSearch}
          rowKey="id"
          rowSelection={{
            selectedRowKeys: dataTable.state.selectedRowKeys,
            onChange: dataTable.handleSelectionChange,
          }}
          pagination={dataTable.serverPagination(data?.pagination)}
          onChange={dataTable.handleTableChange}
          bulkActions={
            <BulkActions
              selectedKeys={dataTable.state.selectedRowKeys}
              onClear={dataTable.clearSelection}
              actions={[
                commonBulkActions.deleteMultiple(handleBulkDelete),
                {
                  key: 'verify',
                  label: t('businesses.action.verifySelected'),
                  icon: <CheckCircle className="w-4 h-4" />,
                  onClick: (keys) => handleBulkVerify(keys, true),
                },
                {
                  key: 'unverify',
                  label: t('businesses.action.unverifySelected'),
                  icon: <XCircle className="w-4 h-4" />,
                  onClick: (keys) => handleBulkVerify(keys, false),
                },
              ]}
            />
          }
          showRefresh
          onRefresh={() => refetch()}
          exportable
          onExport={handleExport}
        />
      </div>

      <AddBusinessDrawer
        open={isAddBusinessDrawerOpen}
        onClose={() => setIsAddBusinessDrawerOpen(false)}
        locale={locale}
      />
    </div>
  )
}
