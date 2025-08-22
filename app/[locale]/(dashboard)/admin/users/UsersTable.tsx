'use client'

import { useState } from 'react'
import { Tag, Avatar, message, Modal } from 'antd'
import { Plus, Mail, Shield, UserCheck, RotateCcw } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useResetBusinessRegistration } from '@/hooks/api/users/useUsers'

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
import AddUserDrawer from './AddUserDrawer'
import { useServerDataTable } from '@/hooks/useDataTable'
import { UserStatus, UserRole } from '@merodami/pika-types'
import {
  getAdminUserList,
  updateAdminUserStatus,
  banAdminUser,
  unbanAdminUser,
  deleteAdminUser,
} from '@/lib/api/orval-client'
import type {
  GetAdminUserList200DataItem,
  GetAdminUserList200,
  UpdateAdminUserStatusBodyStatus,
} from '@/lib/api/orval-client'
import { UpdateAdminUserStatusBodyStatus as StatusEnum } from '@/lib/api/orval-client'

interface UsersTableProps {
  locale: string
}

export default function UsersTable({ locale }: UsersTableProps) {
  const router = useRouter()
  const t = useTranslations()
  const queryClient = useQueryClient()
  const [isAddUserDrawerOpen, setIsAddUserDrawerOpen] = useState(false)

  // Data table state management
  const dataTable = useServerDataTable<GetAdminUserList200DataItem>({
    initialPageSize: 20,
  })

  // Fetch users data
  const { data, isLoading, refetch } = useQuery<GetAdminUserList200>({
    queryKey: ['admin-users', dataTable.queryParams],
    queryFn: () =>
      getAdminUserList({
        page: dataTable.state.page,
        limit: dataTable.state.pageSize,
        search: dataTable.state.search || undefined,
        status: dataTable.state.filters.status,
        role: dataTable.state.filters.role,
        emailVerified: dataTable.state.filters.emailVerified,
        sortBy: dataTable.state.sortField as any,
        sortOrder: dataTable.state.sortOrder as any,
        registeredFrom: dataTable.state.filters.registeredFrom,
        registeredTo: dataTable.state.filters.registeredTo,
      }),
  })

  // Mutations for user management
  const updateStatusMutation = useMutation({
    mutationFn: ({
      userId,
      status,
    }: {
      userId: string
      status: UpdateAdminUserStatusBodyStatus
    }) => updateAdminUserStatus(userId, { status }),
    onSuccess: () => {
      message.success(t('common.message.changesSaved'))
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
    },
    onError: () => {
      message.error(t('common.message.errorOccurred'))
    },
  })

  const banUserMutation = useMutation({
    mutationFn: ({ userId, reason }: { userId: string; reason?: string }) =>
      banAdminUser(userId, { reason }),
    onSuccess: () => {
      message.success('User banned successfully')
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
    },
    onError: () => {
      message.error(t('common.message.errorOccurred'))
    },
  })

  const unbanUserMutation = useMutation({
    mutationFn: (userId: string) => unbanAdminUser(userId, {}),
    onSuccess: () => {
      message.success('User unbanned successfully')
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
    },
    onError: () => {
      message.error(t('common.message.errorOccurred'))
    },
  })

  const deleteUserMutation = useMutation({
    mutationFn: (userId: string) => deleteAdminUser(userId),
    onSuccess: () => {
      message.success('User deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
    },
    onError: () => {
      message.error(t('common.message.errorOccurred'))
    },
  })

  const resetRegistrationMutation = useResetBusinessRegistration()

  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case UserStatus.ACTIVE:
        return 'success'
      case UserStatus.UNCONFIRMED:
        return 'warning'
      case UserStatus.SUSPENDED:
        return 'error'
      case UserStatus.BANNED:
        return 'error'
      default:
        return 'default'
    }
  }

  // Role color mapping
  const getRoleColor = (role: string) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'purple'
      case UserRole.BUSINESS:
        return 'blue'
      default:
        return 'default'
    }
  }

  // Table columns
  const columns = createColumns<GetAdminUserList200DataItem>([
    {
      title: t('profile.personalInfo.firstName'),
      dataIndex: 'firstName',
      key: 'firstName',
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar size="small">
            {record.firstName?.[0]}
            {record.lastName?.[0]}
          </Avatar>
          <div>
            <div className="font-medium">
              {record.firstName} {record.lastName}
            </div>
            <div className="text-xs text-gray-500">{record.email}</div>
          </div>
        </div>
      ),
      sorter: true,
    },
    {
      title: t('profile.contactInfo.email'),
      dataIndex: 'email',
      key: 'email',
      render: (email, record) => (
        <div className="flex items-center gap-2">
          <span>{email}</span>
          {record.emailVerified && (
            <UserCheck className="w-4 h-4 text-green-500" />
          )}
        </div>
      ),
      sorter: true,
    },
    {
      title: t('profile.security.role'),
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={getRoleColor(role)}>
          {t(`profile.role.${role.toLowerCase()}`)}
        </Tag>
      ),
      filters: [
        { text: t('profile.role.admin'), value: UserRole.ADMIN },
        { text: t('profile.role.business'), value: UserRole.BUSINESS },
      ],
    },
    {
      title: t('businesses.fields.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {t(`profile.status.${status.toLowerCase()}`)}
        </Tag>
      ),
      filters: [
        { text: t('profile.status.active'), value: UserStatus.ACTIVE },
        {
          text: t('profile.status.unconfirmed'),
          value: UserStatus.UNCONFIRMED,
        },
        { text: t('profile.status.suspended'), value: UserStatus.SUSPENDED },
        { text: t('profile.status.banned'), value: UserStatus.BANNED },
      ],
    },
    {
      title: t('profile.security.lastLogin'),
      dataIndex: 'lastLoginAt',
      key: 'lastLoginAt',
      render: (date) =>
        date ? new Date(date).toLocaleDateString(locale) : t('profile.never'),
      sorter: true,
    },
    createDateColumn(
      'createdAt',
      t('profile.security.memberSince'),
      (date) => new Date(date).toLocaleDateString(locale),
      { sorter: true }
    ),
    createActionColumn<GetAdminUserList200DataItem>((_, record) => (
      <TableActions
        actions={[
          commonActions.view(() =>
            router.push(`/${locale}/users/${record.id}`)
          ),
          commonActions.edit(() =>
            router.push(`/${locale}/users/${record.id}/edit`)
          ),
          {
            key: 'sendEmail',
            label: t('common.button.email', { defaultValue: 'Send Email' }),
            icon: <Mail className="w-4 h-4" />,
            onClick: () => {
              message.info('Email feature coming soon')
            },
          },
          record.status === UserStatus.ACTIVE
            ? commonActions.deactivate(() =>
                handleStatusChange(record.id, StatusEnum.suspended)
              )
            : commonActions.activate(() =>
                handleStatusChange(record.id, StatusEnum.active)
              ),
          {
            key: 'ban',
            label: record.status === UserStatus.BANNED ? 'Unban' : 'Ban',
            icon: <Shield className="w-4 h-4" />,
            onClick: () =>
              record.status === UserStatus.BANNED
                ? handleUnbanUser(record.id)
                : handleBanUser(record.id, 'Banned by admin'),
            danger: record.status !== UserStatus.BANNED,
          },
          // Only show reset registration for business users
          ...(record.role === UserRole.BUSINESS ? [{
            key: 'resetRegistration',
            label: t('users.resetRegistration.action', { defaultValue: 'Reset Registration' }),
            icon: <RotateCcw className="w-4 h-4" />,
            onClick: () => handleResetRegistration(record.id),
            danger: true,
          }] : []),
          commonActions.delete(() => handleDelete(record.id), record.email),
        ]}
      />
    )),
  ])

  // Filter fields
  const filterFields = [
    commonFilters.search('search', t('common.button.search')),
    commonFilters.status([
      { label: t('profile.status.active'), value: UserStatus.ACTIVE },
      { label: t('profile.status.unconfirmed'), value: UserStatus.UNCONFIRMED },
      { label: t('profile.status.suspended'), value: UserStatus.SUSPENDED },
      { label: t('profile.status.banned'), value: UserStatus.BANNED },
    ]),
    commonFilters.role([
      { label: t('profile.role.admin'), value: UserRole.ADMIN },
      { label: t('profile.role.business'), value: UserRole.BUSINESS },
    ]),
    {
      name: 'emailVerified',
      label: 'Email Verified',
      type: 'select' as const,
      options: [
        { label: 'Verified', value: 'true' },
        { label: 'Not Verified', value: 'false' },
      ],
    },
    commonFilters.dateRange('registered', 'Registration Date'),
  ]

  // Handlers
  const handleStatusChange = async (
    userId: string,
    status: UpdateAdminUserStatusBodyStatus
  ) => {
    updateStatusMutation.mutate({ userId, status })
  }

  const handleBanUser = async (userId: string, reason?: string) => {
    banUserMutation.mutate({ userId, reason })
  }

  const handleUnbanUser = async (userId: string) => {
    unbanUserMutation.mutate(userId)
  }

  const handleDelete = async (userId: string) => {
    deleteUserMutation.mutate(userId)
  }

  const handleResetRegistration = async (userId: string) => {
    Modal.confirm({
      title: t('users.resetRegistration.title'),
      content: t('users.resetRegistration.confirmMessage'),
      okText: t('common.button.confirm'),
      cancelText: t('common.button.cancel'),
      okType: 'danger',
      onOk: () => {
        resetRegistrationMutation.mutate({
          userId,
          data: {
            reason: 'Reset by admin',
            notifyUser: true
          }
        })
      },
    })
  }

  const handleBulkDelete = async (selectedKeys: React.Key[]) => {
    // For now, handle individual deletes in sequence
    // TODO: Implement bulk delete API if available
    for (const key of selectedKeys) {
      await deleteUserMutation.mutateAsync(key as string)
    }
    dataTable.clearSelection()
  }

  const handleBulkStatusChange = async (
    selectedKeys: React.Key[],
    status: UpdateAdminUserStatusBodyStatus
  ) => {
    // For now, handle individual updates in sequence
    // TODO: Implement bulk update API if available
    for (const key of selectedKeys) {
      await updateStatusMutation.mutateAsync({ userId: key as string, status })
    }
    dataTable.clearSelection()
  }

  const handleExport = () => {
    message.info('Export functionality coming soon')
    // TODO: Implement export
  }

  // Context action bar actions - only essential actions
  const contextActions: ActionItem[] = [
    {
      key: 'add',
      label: t('common.button.create'),
      icon: <Plus className="w-4 h-4" />,
      type: 'primary',
      onClick: () => setIsAddUserDrawerOpen(true),
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

      <div className="space-y-3 p-4">
        <TableFilters
          fields={filterFields}
          values={dataTable.state.filters}
          onChange={(filters) => {
            // Map daterange to API format
            const processedFilters = { ...filters }
            if (filters.registeredFrom || filters.registeredTo) {
              processedFilters.registeredFrom = filters.registeredFrom
              processedFilters.registeredTo = filters.registeredTo
            }
            dataTable.setFilters(processedFilters)
          }}
          onReset={dataTable.clearFilters}
        />

        <DataTable
          title={t('navigation.users')}
          description="Manage user accounts and permissions"
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
                commonBulkActions.activateMultiple((keys) =>
                  handleBulkStatusChange(keys, UserStatus.ACTIVE)
                ),
                commonBulkActions.deactivateMultiple((keys) =>
                  handleBulkStatusChange(keys, UserStatus.SUSPENDED)
                ),
              ]}
            />
          }
          showRefresh
          onRefresh={() => refetch()}
          exportable
          onExport={handleExport}
        />
      </div>

      <AddUserDrawer
        open={isAddUserDrawerOpen}
        onClose={() => setIsAddUserDrawerOpen(false)}
        locale={locale}
      />
    </div>
  )
}
