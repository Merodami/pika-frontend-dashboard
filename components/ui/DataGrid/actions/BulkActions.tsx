'use client'

import { useState } from 'react'
import { Dropdown, Button, Modal, message } from 'antd'
import { MoreVertical, Trash2, Eye, CheckCircle, XCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { MenuProps } from 'antd'

export interface BulkActionItem {
  key: string
  label: string
  icon?: React.ReactNode
  danger?: boolean
  disabled?: boolean
  onClick: (selectedKeys: React.Key[]) => void | Promise<void>
  confirmMessage?: string
  confirmTitle?: string
}

interface BulkActionsProps {
  selectedKeys: React.Key[]
  actions: BulkActionItem[]
  onClear?: () => void
}

export function BulkActions({
  selectedKeys,
  actions,
  onClear,
}: BulkActionsProps) {
  const t = useTranslations()
  const [loading, setLoading] = useState<string | null>(null)

  const handleAction = async (action: BulkActionItem) => {
    if (action.confirmMessage || action.confirmTitle) {
      Modal.confirm({
        title: action.confirmTitle || t('common.confirm.title'),
        content: action.confirmMessage || t('common.confirm.message'),
        okText: t('common.button.confirm'),
        cancelText: t('common.button.cancel'),
        okType: action.danger ? 'danger' : 'primary',
        onOk: async () => {
          setLoading(action.key)
          try {
            await action.onClick(selectedKeys)
            message.success(t('common.message.success'))
            onClear?.()
          } catch (error) {
            message.error(t('common.message.errorOccurred'))
          } finally {
            setLoading(null)
          }
        },
      })
    } else {
      setLoading(action.key)
      try {
        await action.onClick(selectedKeys)
        message.success(t('common.message.success'))
        onClear?.()
      } catch (error) {
        message.error(t('common.message.errorOccurred'))
      } finally {
        setLoading(null)
      }
    }
  }

  const menuItems: MenuProps['items'] = actions.map((action) => ({
    key: action.key,
    label: action.label,
    icon: action.icon,
    danger: action.danger,
    disabled: action.disabled || loading !== null,
    onClick: () => handleAction(action),
  }))

  if (selectedKeys.length === 0) {
    return null
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">
        {t('table.selectedCount', { count: selectedKeys.length })}
      </span>

      <Dropdown menu={{ items: menuItems }} placement="bottomRight">
        <Button
          type="primary"
          loading={loading !== null}
          icon={<MoreVertical className="w-4 h-4" />}
        >
          {t('common.button.actions')}
        </Button>
      </Dropdown>

      {onClear && (
        <Button type="text" size="small" onClick={onClear}>
          {t('common.button.clearSelection')}
        </Button>
      )}
    </div>
  )
}

// Common bulk action builders
export const commonBulkActions = {
  deleteMultiple: (
    handler: (keys: React.Key[]) => void | Promise<void>
  ): BulkActionItem => ({
    key: 'delete',
    label: 'Delete Selected',
    icon: <Trash2 className="w-4 h-4" />,
    danger: true,
    onClick: handler,
    confirmTitle: 'Delete Items',
    confirmMessage:
      'Are you sure you want to delete the selected items? This action cannot be undone.',
  }),

  activateMultiple: (
    handler: (keys: React.Key[]) => void | Promise<void>
  ): BulkActionItem => ({
    key: 'activate',
    label: 'Activate Selected',
    icon: <CheckCircle className="w-4 h-4" />,
    onClick: handler,
  }),

  deactivateMultiple: (
    handler: (keys: React.Key[]) => void | Promise<void>
  ): BulkActionItem => ({
    key: 'deactivate',
    label: 'Deactivate Selected',
    icon: <XCircle className="w-4 h-4" />,
    onClick: handler,
  }),

  exportSelected: (
    handler: (keys: React.Key[]) => void | Promise<void>
  ): BulkActionItem => ({
    key: 'export',
    label: 'Export Selected',
    icon: <Eye className="w-4 h-4" />,
    onClick: handler,
  }),
}
