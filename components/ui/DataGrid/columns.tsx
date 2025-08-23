import type { ColumnDef } from '@tanstack/react-table'
import { Avatar, Tag } from 'antd'
import { UserCheck } from 'lucide-react'
import type { GetAdminUserList200DataItem } from '@/lib/api/orval-client'
import { UserRole, UserStatus } from '@/types/data-grid'

export const createUserColumns = (
  t: (key: string) => string,
  locale: string
): ColumnDef<GetAdminUserList200DataItem>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
        className="rounded border-gray-300"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        className="rounded border-gray-300"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'firstName',
    header: t('profile.personalInfo.firstName'),
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="flex items-center gap-3">
          <Avatar size="small">
            {user.firstName?.[0]}
            {user.lastName?.[0]}
          </Avatar>
          <div>
            <div className="font-medium">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-xs text-gray-500">{user.email}</div>
          </div>
        </div>
      )
    },
    enableSorting: true,
  },
  {
    accessorKey: 'email',
    header: t('profile.contactInfo.email'),
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="flex items-center gap-2">
          <span>{user.email}</span>
          {user.emailVerified && (
            <UserCheck className="w-4 h-4 text-green-500" />
          )}
        </div>
      )
    },
    enableSorting: true,
  },
  {
    accessorKey: 'role',
    header: t('profile.security.role'),
    cell: ({ getValue }) => {
      const role = getValue() as string
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

      return (
        <Tag color={getRoleColor(role)}>
          {t(`profile.role.${role.toLowerCase()}`)}
        </Tag>
      )
    },
    filterFn: 'equals',
    enableSorting: true,
  },
  {
    accessorKey: 'status',
    header: t('businesses.fields.status'),
    cell: ({ getValue }) => {
      const status = getValue() as string
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

      return (
        <Tag color={getStatusColor(status)}>
          {t(`profile.status.${status.toLowerCase()}`)}
        </Tag>
      )
    },
    filterFn: 'equals',
    enableSorting: true,
  },
  {
    accessorKey: 'lastLoginAt',
    header: t('profile.security.lastLogin'),
    cell: ({ getValue }) => {
      const date = getValue() as string
      return date
        ? new Date(date).toLocaleDateString(locale)
        : t('profile.never')
    },
    enableSorting: true,
  },
  {
    accessorKey: 'createdAt',
    header: t('profile.security.memberSince'),
    cell: ({ getValue }) => {
      const date = getValue() as string
      return new Date(date).toLocaleDateString(locale)
    },
    enableSorting: true,
  },
]
