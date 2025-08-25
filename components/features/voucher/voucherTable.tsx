'use client'

import { Tag, Avatar, Button, Dropdown, Progress } from 'antd'
import {
  Ticket,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Play,
  Calendar,
  Percent,
  DollarSign,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { ColumnDef } from '@tanstack/react-table'
import type { MenuProps } from 'antd'

import { DataGridServer } from '@/components/ui/DataGrid/DataGridServer'
import { formatDate } from '@/lib/utils/date'
import type { GetAdminVoucherList200DataItem } from '@/lib/api/orval-client'
import { VoucherState, VoucherDiscountType } from '@/lib/api/orval-client'

interface VoucherTableProps {
  data: GetAdminVoucherList200DataItem[]
  loading: boolean
  pagination: any
  onView: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onPublish: (id: string) => void
  onQueryChange?: (params: any) => void
}

export function VoucherTable({
  data,
  loading,
  pagination,
  onView,
  onEdit,
  onDelete,
  onPublish,
  onQueryChange,
}: VoucherTableProps) {
  const t = useTranslations()

  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case VoucherState.published:
        return 'green'
      case VoucherState.draft:
        return 'orange'
      case VoucherState.suspended:
        return 'blue'
      case VoucherState.expired:
        return 'red'
      case VoucherState.claimed:
        return 'default'
      default:
        return 'default'
    }
  }

  // Discount type color mapping
  const getDiscountTypeColor = (type: string) => {
    switch (type) {
      case VoucherDiscountType.percentage:
        return 'purple'
      case VoucherDiscountType.fixed:
        return 'blue'
      default:
        return 'default'
    }
  }

  // Discount type icon mapping
  const getDiscountTypeIcon = (type: string) => {
    switch (type) {
      case VoucherDiscountType.percentage:
        return <Percent className="w-4 h-4" />
      case VoucherDiscountType.fixed:
        return <DollarSign className="w-4 h-4" />
      default:
        return <Ticket className="w-4 h-4" />
    }
  }

  const getActions = (
    voucher: GetAdminVoucherList200DataItem
  ): MenuProps['items'] => [
    {
      key: 'view',
      label: t('voucher.action.view'),
      icon: <Eye className="w-4 h-4" />,
      onClick: () => onView(voucher.id),
    },
    {
      key: 'edit',
      label: t('voucher.action.edit'),
      icon: <Edit className="w-4 h-4" />,
      onClick: () => onEdit(voucher.id),
    },
    {
      type: 'divider',
    },
    ...(voucher.state === VoucherState.draft ||
    voucher.state === VoucherState.suspended
      ? [
          {
            key: 'publish',
            label: t('voucher.action.publish'),
            icon: <Play className="w-4 h-4" />,
            onClick: () => onPublish(voucher.id),
          },
        ]
      : []),
    {
      type: 'divider',
    },
    {
      key: 'delete',
      label: t('voucher.action.delete'),
      icon: <Trash2 className="w-4 h-4" />,
      danger: true,
      onClick: () => onDelete(voucher.id),
    },
  ]

  const columns: ColumnDef<GetAdminVoucherList200DataItem>[] = [
    {
      accessorKey: 'image',
      header: '',
      size: 60,
      cell: ({ row }) => (
        <Avatar
          src={row.original.imageUrl}
          icon={<Ticket className="w-4 h-4" />}
          size="small"
        />
      ),
    },
    {
      accessorKey: 'title',
      header: t('voucher.field.title'),
      enableSorting: true,
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.title}</div>
          <div className="text-sm text-gray-500">
            {row.original.business?.name || t('common.na')}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'discountType',
      header: t('voucher.field.discount'),
      cell: ({ row }) => (
        <div className="space-y-1">
          <Tag
            color={getDiscountTypeColor(row.original.discountType)}
            icon={getDiscountTypeIcon(row.original.discountType)}
          >
            {t(`voucher.discountType.${row.original.discountType}`)}
          </Tag>
          <div className="text-sm font-mono">
            {row.original.discountType === VoucherDiscountType.percentage
              ? `${row.original.discountValue}%`
              : row.original.discountType === VoucherDiscountType.fixed
                ? `$${row.original.discountValue?.toFixed(2)}`
                : '-'}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'state',
      header: t('voucher.field.status'),
      enableSorting: true,
      cell: ({ row }) => (
        <Tag color={getStatusColor(row.original.state)}>
          {t(`voucher.status.${row.original.state}`)}
        </Tag>
      ),
    },
    {
      accessorKey: 'usage',
      header: t('voucher.field.usage'),
      cell: ({ row }) => {
        const redemptionCount = Array.isArray(row.original.redemptions)
          ? row.original.redemptions.length
          : row.original.redemptions || 0
        const usagePercent = row.original.maxRedemptions
          ? (redemptionCount / row.original.maxRedemptions) * 100
          : 0
        return (
          <div className="space-y-1">
            <div className="text-sm">
              {redemptionCount} / {row.original.maxRedemptions || '∞'}
            </div>
            {row.original.maxRedemptions && (
              <Progress
                percent={usagePercent}
                size="small"
                status={usagePercent >= 100 ? 'exception' : 'active'}
              />
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'validity',
      header: t('voucher.field.validity'),
      cell: ({ row }) => (
        <div className="space-y-1">
          <div className="text-sm flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(row.original.validFrom)}
          </div>
          <div className="text-sm text-gray-500">
            → {formatDate(row.original.expiresAt)}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: t('voucher.field.createdAt'),
      enableSorting: true,
      cell: ({ row }) => formatDate(row.original.createdAt),
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
      name="vouchers"
      data={data}
      columns={columns}
      loading={loading}
      pagination={pagination}
      onQueryChange={onQueryChange}
    />
  )
}
