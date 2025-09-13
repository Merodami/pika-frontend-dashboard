'use client'

import { Tag, Avatar, Button, Dropdown } from 'antd'
import {
  User,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Shield,
  Mail,
  Phone,
  Ban,
  CheckCircle,
  RefreshCw,
  UserCheck,
  AlertCircle,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { ColumnDef } from '@tanstack/react-table'
import type { MenuProps } from 'antd'

import { DataGridServer } from '@/components/ui/DataGrid/DataGridServer'
import { formatDate } from '@/lib/utils/date'
import type { GetAdminUserList200DataItem } from '@/lib/api/orval-client'
import {
  GetAdminUserList200DataItemStatus,
  GetAdminUserList200DataItemRole,
} from '@/lib/api/orval-client'

interface UserTableProps {
  data: GetAdminUserList200DataItem[]
  loading: boolean
  pagination: any
  onView: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onSendEmail: () => void
  onBan: (user: GetAdminUserList200DataItem) => void
  onUnban: (user: GetAdminUserList200DataItem) => void
  onChangeStatus: (user: GetAdminUserList200DataItem) => void
  onVerify: (user: GetAdminUserList200DataItem) => void
  onResendVerification: (user: GetAdminUserList200DataItem) => void
  onActivateBusinessAccount?: (user: GetAdminUserList200DataItem) => void
  onQueryChange?: (params: any) => void
}

export function UserTable({
  data,
  loading,
  pagination,
  onView,
  onEdit,
  onDelete,
  onSendEmail,
  onBan,
  onUnban,
  onChangeStatus,
  onVerify,
  onResendVerification,
  onActivateBusinessAccount,
  onQueryChange,
}: UserTableProps) {
  const t = useTranslations()

  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case GetAdminUserList200DataItemStatus.active:
        return 'green'
      case GetAdminUserList200DataItemStatus.suspended:
        return 'red'
      case GetAdminUserList200DataItemStatus.banned:
        return 'volcano'
      case GetAdminUserList200DataItemStatus.unconfirmed:
        return 'orange'
      default:
        return 'default'
    }
  }

  // Role color mapping
  const getRoleColor = (role: string) => {
    switch (role) {
      case GetAdminUserList200DataItemRole.admin:
        return 'purple'
      case GetAdminUserList200DataItemRole.business:
        return 'blue'
      case GetAdminUserList200DataItemRole.customer:
        return 'cyan'
      default:
        return 'default'
    }
  }

  // Role icon mapping
  const getRoleIcon = (role: string) => {
    switch (role) {
      case GetAdminUserList200DataItemRole.admin:
        return <Shield className="w-4 h-4" />
      case GetAdminUserList200DataItemRole.business:
        return <User className="w-4 h-4" />
      case GetAdminUserList200DataItemRole.customer:
        return <User className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  const getActions = (
    user: GetAdminUserList200DataItem
  ): MenuProps['items'] => {
    const items: MenuProps['items'] = [
      {
        key: 'view',
        label: t('user.action.view'),
        icon: <Eye className="w-4 h-4" />,
        onClick: () => onView(user.id),
      },
      {
        key: 'edit',
        label: t('user.action.edit'),
        icon: <Edit className="w-4 h-4" />,
        onClick: () => onEdit(user.id),
      },
      {
        key: 'email',
        label: t('user.action.sendEmail'),
        icon: <Mail className="w-4 h-4" />,
        onClick: () => onSendEmail(),
      },
      {
        type: 'divider',
      },
      {
        key: 'status',
        label: t('user.action.changeStatus'),
        icon: <AlertCircle className="w-4 h-4" />,
        onClick: () => onChangeStatus(user),
      },
    ]

    // Add activate action for business users who are unconfirmed
    if (
      user.role === GetAdminUserList200DataItemRole.business &&
      user.status === GetAdminUserList200DataItemStatus.unconfirmed
    ) {
      items.push({
        key: 'activate',
        label: t('user.action.activateBusinessAccount'),
        icon: <Shield className="w-4 h-4" />,
        onClick: () => onActivateBusinessAccount?.(user),
        className: 'text-green-600',
      })
    }

    // Add ban/unban based on current status
    if (user.status === GetAdminUserList200DataItemStatus.banned) {
      items.push({
        key: 'unban',
        label: t('user.action.unban'),
        icon: <CheckCircle className="w-4 h-4" />,
        onClick: () => onUnban(user),
      })
    } else {
      items.push({
        key: 'ban',
        label: t('user.action.ban'),
        icon: <Ban className="w-4 h-4" />,
        danger: true,
        onClick: () => onBan(user),
      })
    }

    // Add verification actions if not verified
    if (!user.emailVerified || !user.phoneVerified) {
      items.push(
        {
          type: 'divider',
        },
        {
          key: 'verify',
          label: t('user.action.verify'),
          icon: <UserCheck className="w-4 h-4" />,
          onClick: () => onVerify(user),
        },
        {
          key: 'resendVerification',
          label: t('user.action.resendVerification'),
          icon: <RefreshCw className="w-4 h-4" />,
          onClick: () => onResendVerification(user),
        }
      )
    }

    items.push(
      {
        type: 'divider',
      },
      {
        key: 'delete',
        label: t('user.action.delete'),
        icon: <Trash2 className="w-4 h-4" />,
        danger: true,
        onClick: () => onDelete(user.id),
      }
    )

    return items
  }

  const columns: ColumnDef<GetAdminUserList200DataItem>[] = [
    {
      accessorKey: 'avatar',
      header: '',
      size: 60,
      cell: ({ row }) => (
        <Avatar
          src={row.original.avatarUrl}
          icon={<User className="w-4 h-4" />}
          size="small"
        />
      ),
    },
    {
      accessorKey: 'fullName',
      header: t('user.field.name'),
      enableSorting: true,
      cell: ({ row }) => (
        <div>
          <div className="font-medium">
            {row.original.firstName} {row.original.lastName}
          </div>
          <div className="text-sm text-gray-500">{row.original.email}</div>
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: t('user.field.email'),
      enableSorting: true,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span>{row.original.email}</span>
          {row.original.emailVerified && (
            <Mail className="w-4 h-4 text-green-500" />
          )}
        </div>
      ),
    },
    {
      accessorKey: 'phone',
      header: t('user.field.phone'),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span>{row.original.phoneNumber || t('common.na')}</span>
          {row.original.phoneVerified && (
            <Phone className="w-4 h-4 text-green-500" />
          )}
        </div>
      ),
    },
    {
      accessorKey: 'role',
      header: t('user.field.role'),
      enableSorting: true,
      cell: ({ row }) => (
        <Tag
          color={getRoleColor(row.original.role)}
          icon={getRoleIcon(row.original.role)}
        >
          {t(`user.role.${row.original.role}`)}
        </Tag>
      ),
    },
    {
      accessorKey: 'status',
      header: t('user.field.status'),
      enableSorting: true,
      cell: ({ row }) => (
        <Tag color={getStatusColor(row.original.status)}>
          {t(`user.status.${row.original.status}`)}
        </Tag>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: t('user.field.createdAt'),
      enableSorting: true,
      cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
      accessorKey: 'lastLoginAt',
      header: t('user.field.lastLogin'),
      enableSorting: true,
      cell: ({ row }) =>
        row.original.lastLoginAt
          ? formatDate(row.original.lastLoginAt)
          : t('common.never'),
    },
    {
      id: 'actions',
      header: '',
      size: 60,
      cell: ({ row }) => (
        <Dropdown
          menu={{ items: getActions(row.original) }}
          placement="bottomRight"
          trigger={['click']}
        >
          <Button
            type="text"
            icon={<MoreVertical className="w-4 h-4" />}
            size="small"
          />
        </Dropdown>
      ),
    },
  ]

  return (
    <DataGridServer
      name="users"
      data={data}
      columns={columns}
      loading={loading}
      pagination={pagination}
      onQueryChange={onQueryChange}
    />
  )
}
