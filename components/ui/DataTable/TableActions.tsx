'use client'

import { ReactNode } from 'react'
import { Button, Dropdown, Space, Modal, message } from 'antd'
import type { MenuProps } from 'antd'
import {
  MoreVertical,
  Trash2,
  Edit,
  Eye,
  Download,
  Mail,
  UserCheck,
  UserX,
  Archive,
  Copy,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

export interface TableAction {
  key: string
  label: string
  icon?: ReactNode
  onClick: () => void | Promise<void>
  danger?: boolean
  disabled?: boolean
  hidden?: boolean
  confirm?: {
    title: string
    content?: string
  }
}

export interface TableActionsProps {
  actions: TableAction[]
  type?: 'dropdown' | 'buttons'
  size?: 'small' | 'middle' | 'large'
  className?: string
}

export function TableActions({
  actions,
  type = 'dropdown',
  size = 'middle',
  className,
}: TableActionsProps) {
  const t = useTranslations('common')

  const handleAction = async (action: TableAction) => {
    if (action.confirm) {
      Modal.confirm({
        title: action.confirm.title,
        content: action.confirm.content,
        okText: t('button.confirm'),
        cancelText: t('button.cancel'),
        okButtonProps: { danger: action.danger },
        onOk: async () => {
          try {
            await action.onClick()
          } catch (error) {
            message.error(t('message.errorOccurred'))
          }
        },
      })
    } else {
      try {
        await action.onClick()
      } catch (error) {
        message.error(t('message.errorOccurred'))
      }
    }
  }

  const visibleActions = actions.filter((action) => !action.hidden)

  if (type === 'buttons') {
    return (
      <Space size="small" className={className}>
        {visibleActions.map((action) => (
          <Button
            key={action.key}
            size={size}
            danger={action.danger}
            disabled={action.disabled}
            onClick={() => handleAction(action)}
            icon={action.icon}
          >
            {action.label}
          </Button>
        ))}
      </Space>
    )
  }

  const menuItems: MenuProps['items'] = visibleActions.map((action) => ({
    key: action.key,
    label: action.label,
    icon: action.icon,
    danger: action.danger,
    disabled: action.disabled,
    onClick: () => handleAction(action),
  }))

  return (
    <Dropdown
      menu={{ items: menuItems }}
      trigger={['click']}
      placement="bottomRight"
    >
      <Button
        size={size}
        icon={<MoreVertical className="w-4 h-4" />}
        className={className}
      />
    </Dropdown>
  )
}

// Bulk Actions Component
export interface BulkAction {
  key: string
  label: string
  icon?: ReactNode
  onClick: (selectedKeys: React.Key[]) => void | Promise<void>
  danger?: boolean
  disabled?: boolean
  confirm?: {
    title: string
    content?: string
  }
}

export interface BulkActionsProps {
  actions: BulkAction[]
  selectedKeys: React.Key[]
  onClear?: () => void
  className?: string
}

export function BulkActions({
  actions,
  selectedKeys,
  onClear,
  className,
}: BulkActionsProps) {
  const t = useTranslations('common')

  const handleAction = async (action: BulkAction) => {
    if (action.confirm) {
      Modal.confirm({
        title: action.confirm.title,
        content:
          action.confirm.content ||
          `This action will affect ${selectedKeys.length} item(s).`,
        okText: t('button.confirm'),
        cancelText: t('button.cancel'),
        okButtonProps: { danger: action.danger },
        onOk: async () => {
          try {
            await action.onClick(selectedKeys)
            onClear?.()
            message.success(t('message.changesSaved'))
          } catch (error) {
            message.error(t('message.errorOccurred'))
          }
        },
      })
    } else {
      try {
        await action.onClick(selectedKeys)
        onClear?.()
        message.success(t('message.changesSaved'))
      } catch (error) {
        message.error(t('message.errorOccurred'))
      }
    }
  }

  if (selectedKeys.length === 0) {
    return null
  }

  return (
    <Space size="small" className={className}>
      {actions.map((action) => (
        <Button
          key={action.key}
          size="small"
          danger={action.danger}
          disabled={action.disabled}
          onClick={() => handleAction(action)}
          icon={action.icon}
        >
          {action.label}
        </Button>
      ))}
    </Space>
  )
}

// Common action creators
export const commonActions = {
  view: (onClick: () => void): TableAction => ({
    key: 'view',
    label: 'View',
    icon: <Eye className="w-4 h-4" />,
    onClick,
  }),

  edit: (onClick: () => void): TableAction => ({
    key: 'edit',
    label: 'Edit',
    icon: <Edit className="w-4 h-4" />,
    onClick,
  }),

  delete: (onClick: () => void, itemName?: string): TableAction => ({
    key: 'delete',
    label: 'Delete',
    icon: <Trash2 className="w-4 h-4" />,
    onClick,
    danger: true,
    confirm: {
      title: `Delete ${itemName || 'item'}?`,
      content: 'This action cannot be undone.',
    },
  }),

  duplicate: (onClick: () => void): TableAction => ({
    key: 'duplicate',
    label: 'Duplicate',
    icon: <Copy className="w-4 h-4" />,
    onClick,
  }),

  archive: (onClick: () => void): TableAction => ({
    key: 'archive',
    label: 'Archive',
    icon: <Archive className="w-4 h-4" />,
    onClick,
  }),

  activate: (onClick: () => void): TableAction => ({
    key: 'activate',
    label: 'Activate',
    icon: <UserCheck className="w-4 h-4" />,
    onClick,
  }),

  deactivate: (onClick: () => void): TableAction => ({
    key: 'deactivate',
    label: 'Deactivate',
    icon: <UserX className="w-4 h-4" />,
    onClick,
  }),

  sendEmail: (onClick: () => void): TableAction => ({
    key: 'sendEmail',
    label: 'Send Email',
    icon: <Mail className="w-4 h-4" />,
    onClick,
  }),

  download: (onClick: () => void): TableAction => ({
    key: 'download',
    label: 'Download',
    icon: <Download className="w-4 h-4" />,
    onClick,
  }),
}

// Common bulk actions
export const commonBulkActions = {
  deleteMultiple: (onClick: (keys: React.Key[]) => void): BulkAction => ({
    key: 'deleteMultiple',
    label: 'Delete',
    icon: <Trash2 className="w-4 h-4" />,
    onClick,
    danger: true,
    confirm: {
      title: 'Delete selected items?',
      content: 'This action cannot be undone.',
    },
  }),

  archiveMultiple: (onClick: (keys: React.Key[]) => void): BulkAction => ({
    key: 'archiveMultiple',
    label: 'Archive',
    icon: <Archive className="w-4 h-4" />,
    onClick,
    confirm: {
      title: 'Archive selected items?',
    },
  }),

  activateMultiple: (onClick: (keys: React.Key[]) => void): BulkAction => ({
    key: 'activateMultiple',
    label: 'Activate',
    icon: <UserCheck className="w-4 h-4" />,
    onClick,
  }),

  deactivateMultiple: (onClick: (keys: React.Key[]) => void): BulkAction => ({
    key: 'deactivateMultiple',
    label: 'Deactivate',
    icon: <UserX className="w-4 h-4" />,
    onClick,
  }),

  exportSelected: (onClick: (keys: React.Key[]) => void): BulkAction => ({
    key: 'exportSelected',
    label: 'Export Selected',
    icon: <Download className="w-4 h-4" />,
    onClick,
  }),
}
