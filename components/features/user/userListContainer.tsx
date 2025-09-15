'use client'

import React, { useState, useMemo } from 'react'
import { message, Form, Input, InputNumber, Switch, Select, App } from 'antd'
import { UserPlus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { UserRole } from '@/lib/api/orval-client'

import {
  BulkActions,
  commonBulkActions,
} from '@/components/ui/DataGrid/actions/BulkActions'
import { ContextActionBar } from '@/components/ui/ContextActionBar'
import type { ActionItem } from '@/components/ui/ContextActionBar'
import {
  type GetAdminUserList200DataItem,
  type BanAdminUserBody,
  type UpdateAdminUserStatusBody,
  type VerifyAdminUserBody,
  type ResendAdminUserVerificationBody,
  UpdateAdminUserStatusBodyStatus,
} from '@/lib/api/orval-client'
import type { Locale } from '@/i18n/config'
import { useServerDataTable } from '@/hooks/useDataTable'
import {
  useUsers,
  useDeleteUser,
  useBanUser,
  useUnbanUser,
  useUpdateUserStatus,
  useVerifyUser,
  useVerifyUserBoth,
  useResendUserVerification,
} from '@/hooks/api/users/useUsers'

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
  const { modal } = App.useApp()
  const [isAddUserDrawerOpen, setIsAddUserDrawerOpen] = useState(false)
  const [verifyForm] = Form.useForm()
  const [statusForm] = Form.useForm()
  const [banForm] = Form.useForm()

  // Initialize data table with server-side support
  const dataTable = useServerDataTable({
    initialPageSize: 20,
  })

  // State to track query params from DataGrid
  const [gridQueryParams, setGridQueryParams] = useState<any>({})

  // Merge query params from both useServerDataTable and DataGridServer
  const finalQueryParams = useMemo(() => {
    return {
      ...dataTable.queryParams,
      ...gridQueryParams,
    }
  }, [dataTable.queryParams, gridQueryParams])

  // Use hooks for API calls
  const { data, isLoading } = useUsers(finalQueryParams)
  const deleteUserMutation = useDeleteUser()
  const banUserMutation = useBanUser()
  const unbanUserMutation = useUnbanUser()
  const updateStatusMutation = useUpdateUserStatus()
  const verifyUserMutation = useVerifyUser()
  const verifyUserBothMutation = useVerifyUserBoth()
  const resendVerificationMutation = useResendUserVerification()

  // Event handlers
  const handleViewUser = (id: string) => {
    router.push(`/${locale}/admin/users/${id}`)
  }

  const handleEditUser = (id: string) => {
    router.push(`/${locale}/admin/users/${id}/edit`)
  }

  const handleDeleteUser = (id: string) => {
    modal.confirm({
      title: t('user.modal.deleteUser'),
      content: t('user.message.confirmDelete'),
      okText: t('common.button.delete'),
      okType: 'danger',
      cancelText: t('common.button.cancel'),
      onOk: () => {
        deleteUserMutation.mutate(id, {
          onSuccess: () => {
            dataTable.clearSelection()
          },
        })
      },
    })
  }

  const handleSendEmail = () => {
    // TODO: Implement email functionality
    message.info(t('common.message.comingSoon'))
  }

  const handleAddUser = () => {
    setIsAddUserDrawerOpen(true)
  }

  // Ban user handler
  const handleBanUser = (user: GetAdminUserList200DataItem) => {
    banForm.resetFields()
    banForm.setFieldsValue({ notifyUser: true })

    modal.confirm({
      title: t('user.modal.banUser'),
      width: 500,
      content: (
        <Form form={banForm} layout="vertical" className="mt-4">
          <Form.Item
            name="reason"
            label={t('user.field.banReason')}
            rules={[
              { required: true, message: t('user.validation.reasonRequired') },
            ]}
          >
            <Input.TextArea rows={3} maxLength={500} showCount />
          </Form.Item>
          <Form.Item
            name="duration"
            label={t('user.field.banDuration')}
            extra={t('user.field.banDurationHint')}
          >
            <InputNumber
              min={1}
              max={365}
              placeholder={t('user.field.daysPlaceholder')}
            />
          </Form.Item>
          <Form.Item
            name="notifyUser"
            label={t('user.field.notifyUser')}
            valuePropName="checked"
            initialValue={true}
          >
            <Switch />
          </Form.Item>
        </Form>
      ),
      okText: t('user.action.ban'),
      okType: 'danger',
      cancelText: t('common.button.cancel'),
      onOk: async () => {
        try {
          const values = await banForm.validateFields()
          const data: BanAdminUserBody = {
            reason: values.reason,
            duration: values.duration,
            notifyUser: values.notifyUser,
          }
          await banUserMutation.mutateAsync({ userId: user.id, data })
        } catch (error) {
          // Validation error or mutation error is handled by the hook
          throw error
        }
      },
    })
  }

  // Unban user handler
  const handleUnbanUser = (user: GetAdminUserList200DataItem) => {
    modal.confirm({
      title: t('user.modal.unbanUser'),
      content: t('user.message.confirmUnban', {
        name: `${user.firstName} ${user.lastName}`,
      }),
      okText: t('user.action.unban'),
      cancelText: t('common.button.cancel'),
      onOk: async () => {
        await unbanUserMutation.mutateAsync({ userId: user.id, data: {} })
      },
    })
  }

  // Change user status handler
  const handleChangeStatus = (user: GetAdminUserList200DataItem) => {
    statusForm.resetFields()
    statusForm.setFieldsValue({ status: user.status, notifyUser: true })

    modal.confirm({
      title: t('user.modal.changeStatus'),
      width: 500,
      content: (
        <Form form={statusForm} layout="vertical" className="mt-4">
          <Form.Item
            name="status"
            label={t('user.field.status')}
            rules={[
              { required: true, message: t('user.validation.statusRequired') },
            ]}
          >
            <Select>
              {Object.values(UpdateAdminUserStatusBodyStatus).map((status) => (
                <Select.Option key={status} value={status}>
                  {t(`user.status.${status}`)}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="reason" label={t('user.field.reason')}>
            <Input.TextArea rows={3} maxLength={500} showCount />
          </Form.Item>
          <Form.Item
            name="duration"
            label={t('user.field.suspensionDuration')}
            extra={t('user.field.suspensionDurationHint')}
          >
            <InputNumber
              min={1}
              max={365}
              placeholder={t('user.field.daysPlaceholder')}
            />
          </Form.Item>
          <Form.Item
            name="notifyUser"
            label={t('user.field.notifyUser')}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      ),
      okText: t('common.button.save'),
      cancelText: t('common.button.cancel'),
      onOk: async () => {
        try {
          const values = await statusForm.validateFields()
          const data: UpdateAdminUserStatusBody = {
            status: values.status,
            reason: values.reason,
            duration: values.duration,
            notifyUser: values.notifyUser,
          }
          await updateStatusMutation.mutateAsync({ userId: user.id, data })
        } catch (error) {
          throw error
        }
      },
    })
  }

  // Verify user handler
  const handleVerifyUser = (user: GetAdminUserList200DataItem) => {
    verifyForm.resetFields()

    modal.confirm({
      title: t('user.modal.verifyUser'),
      width: 500,
      content: (
        <Form form={verifyForm} layout="vertical" className="mt-4">
          <Form.Item
            name="type"
            label={t('user.field.verificationType')}
            rules={[{ required: true }]}
            initialValue="email"
          >
            <Select>
              <Select.Option value="email">
                {t('user.verification.email')}
              </Select.Option>
              <Select.Option value="phone">
                {t('user.verification.phone')}
              </Select.Option>
              <Select.Option value="both">
                {t('user.verification.both')}
              </Select.Option>
            </Select>
          </Form.Item>
        </Form>
      ),
      okText: t('user.action.verify'),
      cancelText: t('common.button.cancel'),
      onOk: async () => {
        try {
          const values = await verifyForm.validateFields()

          if (values.type === 'both') {
            // Use the dedicated hook for verifying both
            await verifyUserBothMutation.mutateAsync({
              userId: user.id,
              email: user.email,
              phoneNumber: user.phoneNumber,
            })
          } else {
            // Single verification (email or phone)
            const data: VerifyAdminUserBody = {
              type: values.type,
              userId: user.id,
              email: user.email,
              phoneNumber: user.phoneNumber,
            }
            await verifyUserMutation.mutateAsync(data)
          }
        } catch (error) {
          throw error
        }
      },
    })
  }

  // Resend verification handler
  const handleResendVerification = (user: GetAdminUserList200DataItem) => {
    modal.confirm({
      title: t('user.modal.resendVerification'),
      content: t('user.message.confirmResendVerification', {
        email: user.email,
      }),
      okText: t('user.action.resend'),
      cancelText: t('common.button.cancel'),
      onOk: async () => {
        const data: ResendAdminUserVerificationBody = {
          userId: user.id,
          type: !user.emailVerified ? 'email' : 'phone',
        }
        await resendVerificationMutation.mutateAsync(data)
      },
    })
  }

  // Activate business account handler
  const handleActivateBusinessAccount = (user: GetAdminUserList200DataItem) => {
    modal.confirm({
      title: t('user.modal.activateBusinessAccount'),
      content: t('user.message.confirmActivateBusinessAccount', {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      }),
      okText: t('user.action.activate'),
      okType: 'primary',
      cancelText: t('common.button.cancel'),
      onOk: async () => {
        // Change status to active for business owner
        const data: UpdateAdminUserStatusBody = {
          status: UpdateAdminUserStatusBodyStatus.active,
          reason: 'Business account activated by admin',
          notifyUser: true,
        }
        await updateStatusMutation.mutateAsync({ userId: user.id, data })
        message.success(t('user.message.businessAccountActivated'))
      },
    })
  }

  const handleBulkDelete = async (selectedKeys: React.Key[]) => {
    modal.confirm({
      title: t('user.modal.bulkDelete'),
      content: t('user.message.confirmBulkDelete', {
        count: selectedKeys.length,
      }),
      okText: t('common.button.delete'),
      okType: 'danger',
      cancelText: t('common.button.cancel'),
      onOk: async () => {
        for (const key of selectedKeys) {
          await deleteUserMutation.mutateAsync(String(key))
        }
        dataTable.clearSelection()
      },
    })
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
          onBan={handleBanUser}
          onUnban={handleUnbanUser}
          onChangeStatus={handleChangeStatus}
          onVerify={handleVerifyUser}
          onResendVerification={handleResendVerification}
          onActivateBusinessAccount={handleActivateBusinessAccount}
          onQueryChange={setGridQueryParams}
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
