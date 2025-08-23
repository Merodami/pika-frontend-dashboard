'use client'

import { Tag, Avatar, Button, Dropdown } from 'antd'
import {
  Building,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Shield,
  Mail,
  Phone,
  MapPin,
  Star,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { ColumnDef } from '@tanstack/react-table'
import type { MenuProps } from 'antd'

import { DataGridServer } from '@/components/ui/DataGrid/DataGridServer'
import { formatDate } from '@/lib/utils/date'
import type { GetAdminBusinessList200DataItem } from '@/lib/api/orval-client'

interface BusinessTableProps {
  data: GetAdminBusinessList200DataItem[]
  loading: boolean
  pagination: any
  onView: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onApprove: (id: string) => void
  onReject: (id: string) => void
  onQueryChange?: (params: any) => void
}

export function BusinessTable({
  data,
  loading,
  pagination,
  onView,
  onEdit,
  onDelete,
  onApprove,
  onReject,
  onQueryChange,
}: BusinessTableProps) {
  const t = useTranslations()


  const getActions = (
    business: GetAdminBusinessList200DataItem
  ): MenuProps['items'] => [
    {
      key: 'view',
      label: t('business.action.view'),
      icon: <Eye className="w-4 h-4" />,
      onClick: () => onView(business.id),
    },
    {
      key: 'edit',
      label: t('business.action.edit'),
      icon: <Edit className="w-4 h-4" />,
      onClick: () => onEdit(business.id),
    },
    {
      type: 'divider' as const,
    },
    ...(!business.approved && business.verified
      ? [
          {
            key: 'approve',
            label: t('business.action.approve'),
            icon: <Shield className="w-4 h-4" />,
            onClick: () => onApprove(business.id),
          },
          {
            key: 'reject',
            label: t('business.action.reject'),
            icon: <Shield className="w-4 h-4" />,
            danger: true,
            onClick: () => onReject(business.id),
          },
          {
            type: 'divider' as const,
          },
        ]
      : []),
    {
      key: 'delete',
      label: t('business.action.delete'),
      icon: <Trash2 className="w-4 h-4" />,
      danger: true,
      onClick: () => onDelete(business.id),
    },
  ]

  const columns: ColumnDef<GetAdminBusinessList200DataItem>[] = [
    {
      accessorKey: 'logo',
      header: '',
      size: 60,
      cell: () => (
        <Avatar
          src={undefined} // logoUrl not available in current API response
          icon={<Building className="w-4 h-4" />}
          size="small"
        />
      ),
    },
    {
      accessorKey: 'name',
      header: t('business.field.name'),
      enableSorting: true,
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.businessName}</div>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {row.original.businessDescription || t('common.na')}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'owner',
      header: t('business.field.owner'),
      cell: ({ row }) => (
        <div>
          <div className="font-medium">
            {row.original.user?.firstName} {row.original.user?.lastName}
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <Mail className="w-3 h-3" />
            {row.original.user?.email}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'category',
      header: t('business.field.category'),
      enableSorting: true,
      cell: ({ row }) => (
        <Tag color="blue">{row.original.category?.name || t('common.na')}</Tag>
      ),
    },
    {
      accessorKey: 'status',
      header: t('business.field.status'),
      enableSorting: true,
      cell: ({ row }) => (
        <Tag
          color={
            row.original.approved
              ? 'green'
              : row.original.verified
                ? 'orange'
                : 'default'
          }
        >
          {row.original.approved
            ? t('business.status.approved')
            : row.original.verified
              ? t('business.status.verified')
              : t('business.status.pending')}
        </Tag>
      ),
    },
    {
      accessorKey: 'rating',
      header: t('business.field.rating'),
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span>{row.original.avgRating?.toFixed(1) || t('common.na')}</span>
        </div>
      ),
    },
    {
      accessorKey: 'phone',
      header: t('business.field.phone'),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span>{row.original.user?.phoneNumber || t('common.na')}</span>
          {row.original.user?.phoneVerified && (
            <Phone className="w-4 h-4 text-green-500" />
          )}
        </div>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: t('business.field.createdAt'),
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
      name="businesses"
      data={data}
      columns={columns}
      loading={loading}
      pagination={pagination}
      onQueryChange={onQueryChange}
    />
  )
}
