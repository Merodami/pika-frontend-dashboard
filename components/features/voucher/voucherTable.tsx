'use client'

import { Tag, Avatar, Button, Dropdown, Progress } from 'antd'
import {
  Ticket,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Play,
  Pause,
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
import { VoucherState, VoucherDiscountType } from '@merodami/pika-types'

interface VoucherTableProps {
  data: GetAdminVoucherList200DataItem[]
  loading: boolean
  pagination: any
  onView: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onPublish: (id: string) => void
  onPause: (id: string) => void
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
  onPause,
  onQueryChange,
}: VoucherTableProps) {
  const t = useTranslations()

  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case VoucherState.ACTIVE:
        return 'green'
      case VoucherState.DRAFT:
        return 'orange'
      case VoucherState.PAUSED:
        return 'blue'
      case VoucherState.EXPIRED:
        return 'red'
      case VoucherState.ARCHIVED:
        return 'default'
      default:
        return 'default'
    }
  }

  // Discount type color mapping
  const getDiscountTypeColor = (type: string) => {
    switch (type) {
      case VoucherDiscountType.PERCENTAGE:
        return 'purple'
      case VoucherDiscountType.FIXED_AMOUNT:
        return 'blue'
      case VoucherDiscountType.BUY_ONE_GET_ONE:
        return 'orange'
      case VoucherDiscountType.FREE_SHIPPING:
        return 'green'
      default:
        return 'default'
    }
  }

  // Discount type icon mapping
  const getDiscountTypeIcon = (type: string) => {
    switch (type) {
      case VoucherDiscountType.PERCENTAGE:
        return <Percent className="w-4 h-4" />
      case VoucherDiscountType.FIXED_AMOUNT:
        return <DollarSign className="w-4 h-4" />
      case VoucherDiscountType.BUY_ONE_GET_ONE:
        return <Ticket className="w-4 h-4" />
      case VoucherDiscountType.FREE_SHIPPING:
        return <Ticket className="w-4 h-4" />
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
    ...(voucher.state === VoucherState.DRAFT ||
    voucher.state === VoucherState.PAUSED
      ? [
          {
            key: 'publish',
            label: t('voucher.action.publish'),
            icon: <Play className="w-4 h-4" />,
            onClick: () => onPublish(voucher.id),
          },
        ]
      : []),
    ...(voucher.state === VoucherState.ACTIVE
      ? [
          {
            key: 'pause',
            label: t('voucher.action.pause'),
            icon: <Pause className="w-4 h-4" />,
            onClick: () => onPause(voucher.id),
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
            {row.original.discountType === VoucherDiscountType.PERCENTAGE
              ? `${row.original.discountValue}%`
              : row.original.discountType === VoucherDiscountType.FIXED_AMOUNT
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
        const usagePercent = row.original.maxRedemptions
          ? (row.original.redemptionCount / row.original.maxRedemptions) * 100
          : 0
        return (
          <div className="space-y-1">
            <div className="text-sm">
              {row.original.redemptionCount || 0} /{' '}
              {row.original.maxRedemptions || '∞'}
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
            {formatDate(row.original.startDate)}
          </div>
          <div className="text-sm text-gray-500">
            → {formatDate(row.original.expiryDate)}
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
