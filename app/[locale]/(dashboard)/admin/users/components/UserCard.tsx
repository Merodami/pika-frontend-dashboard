'use client'

import { useState } from 'react'
import { Avatar, Badge, Dropdown, Button, Tag, Tooltip } from 'antd'
import {
  Mail,
  Shield,
  UserCheck,
  MoreVertical,
  Calendar,
  Clock,
  Ban,
  CheckCircle,
  Trash2,
  Edit,
  Eye,
  RotateCcw,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { formatDate, formatRelativeDate } from '@/lib/utils/date'
import {
  getUserStatusColor,
  getUserRoleColor,
  getUserDisplayName,
  getUserInitials,
} from '@/lib/utils/user'
import type { GetAdminUserList200DataItem } from '@/lib/api/orval-client'
import { UserRole, UserStatus } from '@merodami/pika-types'

interface UserCardProps {
  user: GetAdminUserList200DataItem
  onEdit: (userId: string) => void
  onView: (userId: string) => void
  onDelete: (userId: string) => void
  onBan: (userId: string) => void
  onUnban: (userId: string) => void
  onResetRegistration: (userId: string) => void
}

export function UserCard({
  user,
  onEdit,
  onView,
  onDelete,
  onBan,
  onUnban,
  onResetRegistration,
}: UserCardProps) {
  const t = useTranslations()
  const [isHovered, setIsHovered] = useState(false)

  const getRoleIcon = (role?: string) => {
    switch (role) {
      case UserRole.ADMIN:
        return <Shield className="w-3 h-3" />
      case UserRole.BUSINESS:
        return <UserCheck className="w-3 h-3" />
      default:
        return null
    }
  }

  // Dropdown menu items
  const menuItems = [
    {
      key: 'view',
      label: t('common.button.view'),
      icon: <Eye className="w-4 h-4" />,
      onClick: () => onView(user.id),
    },
    {
      key: 'edit',
      label: t('common.button.edit'),
      icon: <Edit className="w-4 h-4" />,
      onClick: () => onEdit(user.id),
    },
    { type: 'divider' as const },
    ...(user.status === UserStatus.BANNED
      ? [
          {
            key: 'unban',
            label: t('users.action.unban'),
            icon: <CheckCircle className="w-4 h-4" />,
            onClick: () => onUnban(user.id),
          },
        ]
      : [
          {
            key: 'ban',
            label: t('users.action.ban'),
            icon: <Ban className="w-4 h-4" />,
            danger: true,
            onClick: () => onBan(user.id),
          },
        ]),
    {
      key: 'resetRegistration',
      label: t('users.action.resetRegistration'),
      icon: <RotateCcw className="w-4 h-4" />,
      onClick: () => onResetRegistration(user.id),
    },
    { type: 'divider' as const },
    {
      key: 'delete',
      label: t('common.button.delete'),
      icon: <Trash2 className="w-4 h-4" />,
      danger: true,
      onClick: () => onDelete(user.id),
    },
  ]

  return (
    <div
      className={`
        relative bg-white rounded-xl border transition-all duration-200 hover:shadow-lg
        ${isHovered ? 'border-blue-200 shadow-md' : 'border-gray-200'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header with Avatar and Actions */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <Badge
              dot
              status={user.status === UserStatus.ACTIVE ? 'success' : 'error'}
              offset={[-2, 2]}
            >
              <Avatar
                size={48}
                className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold"
              >
                {getUserInitials(user)}
              </Avatar>
            </Badge>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                {getUserDisplayName(user)}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Mail className="w-4 h-4" />
                {user.email}
              </div>
            </div>
          </div>

          <Dropdown
            menu={{ items: menuItems }}
            trigger={['click']}
            placement="bottomRight"
          >
            <Button
              type="text"
              icon={<MoreVertical className="w-4 h-4" />}
              className="opacity-60 hover:opacity-100"
            />
          </Dropdown>
        </div>

        {/* Status and Role Tags */}
        <div className="flex items-center gap-2 mb-4">
          <Tag
            color={getUserStatusColor(user.status)}
            className="flex items-center gap-1"
          >
            {t(`users.status.${user.status?.toLowerCase()}`)}
          </Tag>
          <Tag
            color={getUserRoleColor(user.role)}
            className="flex items-center gap-1"
          >
            {getRoleIcon(user.role)}
            {t(`users.role.${user.role?.toLowerCase().replace('_', '')}`)}
          </Tag>
          {user.emailVerified && (
            <Tooltip title={t('users.fields.emailVerified')}>
              <CheckCircle className="w-4 h-4 text-green-500" />
            </Tooltip>
          )}
        </div>

        {/* User Details */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            {t('users.fields.joined')} {formatDate(user.createdAt)}
          </div>

          {user.lastLoginAt && (
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              {t('users.fields.lastSeen')}{' '}
              {formatRelativeDate(user.lastLoginAt)}
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-6 py-4 bg-gray-50 rounded-b-xl border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">ID: {user.id.slice(-8)}</div>

          <div className="flex items-center gap-2">
            <Button
              size="small"
              onClick={() => onView(user.id)}
              className="text-xs"
            >
              {t('common.button.viewDetails')}
            </Button>
            <Button
              size="small"
              type="primary"
              onClick={() => onEdit(user.id)}
              className="text-xs"
            >
              {t('common.button.edit')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
