'use client'

import { useState } from 'react'
import { message } from 'antd'
import { UserPlus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { UserRole } from '@merodami/pika-types'

import {
  BulkActions,
  commonBulkActions,
} from '@/components/ui/DataGrid/actions/BulkActions'
import { ContextActionBar } from '@/components/ui/ContextActionBar'
import type { ActionItem } from '@/components/ui/ContextActionBar'
import { useServerDataTable } from '@/hooks/useDataTable'
import { getAdminUserList, deleteAdminUser } from '@/lib/api/orval-client'
import type { GetAdminUserList200DataItem } from '@/lib/api/orval-client'
import type { Locale } from '@/i18n/config'

import { UserTable } from './userTable'
import { UserFilters } from './userFilters'
import AddUserDrawer from '@/app/[locale]/(dashboard)/admin/users/AddUserDrawer'

interface UserListContainerProps {
  userRole: UserRole
  locale: Locale
}

export function UserListContainer({ locale }: UserListContainerProps) {
  const router = useRouter()
  const t = useTranslations()
  const queryClient = useQueryClient()
  const [isAddUserDrawerOpen, setIsAddUserDrawerOpen] = useState(false)

  // Data table state management
  const dataTable = useServerDataTable<GetAdminUserList200DataItem>({
    initialPageSize: 20,
  })

  // Fetch users data
  const { data, isLoading } = useQuery({
    queryKey: ['admin-users', dataTable.queryParams],
    queryFn: async () => {
      return await getAdminUserList({
        page: dataTable.state.page,
        limit: dataTable.state.pageSize,
        search: dataTable.state.search || undefined,
        status: dataTable.state.filters.status,
        role: dataTable.state.filters.role,
        emailVerified: dataTable.state.filters.emailVerified,
        phoneVerified: dataTable.state.filters.phoneVerified,
        registeredFrom:
          dataTable.state.filters.registeredRange?.[0]?.format('YYYY-MM-DD'),
        registeredTo:
          dataTable.state.filters.registeredRange?.[1]?.format('YYYY-MM-DD'),
        sortBy: dataTable.state.sortField as any,
        sortOrder: dataTable.state.sortOrder as any,
      })
    },
    placeholderData: (previousData) => previousData,
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteAdminUser,
    onSuccess: () => {
      message.success(t('user.message.deleteSuccess'))
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
      dataTable.clearSelection()
    },
    onError: () => {
      message.error(t('common.message.errorOccurred'))
    },
  })

  // Event handlers
  const handleViewUser = (id: string) => {
    router.push(`/${locale}/admin/users/${id}`)
  }

  const handleEditUser = (id: string) => {
    router.push(`/${locale}/admin/users/${id}/edit`)
  }

  const handleDeleteUser = (id: string) => {
    deleteMutation.mutate(id)
  }

  const handleSendEmail = () => {
    // TODO: Implement email functionality
    message.info(t('common.message.comingSoon'))
  }

  const handleAddUser = () => {
    setIsAddUserDrawerOpen(true)
  }

  const handleBulkDelete = async (selectedKeys: React.Key[]) => {
    try {
      await Promise.all(selectedKeys.map((key) => deleteAdminUser(String(key))))
      message.success(t('user.message.bulkDeleteSuccess'))
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
      dataTable.clearSelection()
    } catch (error) {
      message.error(t('common.message.errorOccurred'))
    }
  }

  // Context actions
  const contextActions: ActionItem[] = [
    {
      key: 'add',
      label: t('user.action.create'),
      icon: <UserPlus className="w-4 h-4" />,
      type: 'primary',
      onClick: handleAddUser,
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
          { label: t('navigation.users') },
        ]}
        actions={contextActions}
      />

      <div className="p-4">
        {/* Filters */}
        <UserFilters
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

        {/* Users Table */}
        <UserTable
          data={data?.data || []}
          loading={isLoading}
          pagination={dataTable.serverPagination(data?.pagination)}
          onView={handleViewUser}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
          onSendEmail={handleSendEmail}
        />
      </div>

      {/* Add User Drawer */}
      <AddUserDrawer
        open={isAddUserDrawerOpen}
        onClose={() => setIsAddUserDrawerOpen(false)}
        locale={locale}
      />
    </div>
  )
}
