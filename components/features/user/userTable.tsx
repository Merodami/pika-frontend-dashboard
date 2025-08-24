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
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { ColumnDef } from '@tanstack/react-table'
import type { MenuProps } from 'antd'

import { DataGridServer } from '@/components/ui/DataGrid/DataGridServer'
import { formatDate } from '@/lib/utils/date'
import type { GetAdminUserList200DataItem } from '@/lib/api/orval-client'
import { UserStatus, UserRole } from '@/lib/api/orval-client'

interface UserTableProps {
  data: GetAdminUserList200DataItem[]
  loading: boolean
  pagination: any
  onView: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onSendEmail: () => void
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
  onQueryChange,
}: UserTableProps) {
  const t = useTranslations()

  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case UserStatus.active:
        return 'green'
      case UserStatus.suspended:
        return 'red'
      case UserStatus.banned:
        return 'volcano'
      case UserStatus.unconfirmed:
        return 'orange'
      default:
        return 'default'
    }
  }

  // Role color mapping
  const getRoleColor = (role: string) => {
    switch (role) {
      case UserRole.admin:
        return 'purple'
      case UserRole.business:
        return 'blue'
      case UserRole.customer:
        return 'cyan'
      default:
        return 'default'
    }
  }

  // Role icon mapping
  const getRoleIcon = (role: string) => {
    switch (role) {
      case UserRole.admin:
        return <Shield className="w-4 h-4" />
      case UserRole.business:
        return <User className="w-4 h-4" />
      case UserRole.customer:
        return <User className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  const getActions = (
    user: GetAdminUserList200DataItem
  ): MenuProps['items'] => [
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
      key: 'delete',
      label: t('user.action.delete'),
      icon: <Trash2 className="w-4 h-4" />,
      danger: true,
      onClick: () => onDelete(user.id),
    },
  ]

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
