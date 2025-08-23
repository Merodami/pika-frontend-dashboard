'use client'

import { Tag, Avatar, Button, Dropdown } from 'antd'
import {
  BookOpen,
  Download,
  Calendar,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { ColumnDef } from '@tanstack/react-table'
import type { MenuProps } from 'antd'

import { DataGridServer } from '@/components/ui/DataGrid/DataGridServer'
import { formatDate } from '@/lib/utils/date'
import {
  VoucherBookDomain,
  VoucherBookStatus,
  VoucherBookType,
} from '@/lib/api/mappers/voucherBook'

interface VoucherBookTableProps {
  data: VoucherBookDomain[]
  loading: boolean
  pagination: any
  onTableChange: (pagination: any, filters: any, sorter: any) => void
  onView: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onDownloadPdf: (pdfUrl: string) => void
}

export function VoucherBookTable({
  data,
  loading,
  pagination,
  onTableChange,
  onView,
  onEdit,
  onDelete,
  onDownloadPdf,
}: VoucherBookTableProps) {
  const t = useTranslations('voucherBooks')

  // Status color mapping
  const getStatusColor = (status: VoucherBookStatus) => {
    switch (status) {
      case VoucherBookStatus.DRAFT:
        return 'default'
      case VoucherBookStatus.READY_FOR_PRINT:
        return 'processing'
      case VoucherBookStatus.PUBLISHED:
        return 'success'
      case VoucherBookStatus.ARCHIVED:
        return 'warning'
      default:
        return 'default'
    }
  }

  // Book type color mapping
  const getBookTypeColor = (bookType: VoucherBookType) => {
    switch (bookType) {
      case VoucherBookType.MONTHLY:
        return 'blue'
      case VoucherBookType.SPECIAL_EDITION:
        return 'purple'
      case VoucherBookType.REGIONAL:
        return 'green'
      case VoucherBookType.SEASONAL:
        return 'orange'
      case VoucherBookType.PROMOTIONAL:
        return 'red'
      default:
        return 'default'
    }
  }

  // Table columns using DataGrid format
  const columns: ColumnDef<VoucherBookDomain>[] = [
    {
      id: 'coverImageUrl',
      header: t('fields.cover'),
      accessorKey: 'coverImageUrl',
      size: 80,
      cell: ({ getValue }) => (
        <Avatar
          src={getValue() as string}
          icon={<BookOpen className="w-4 h-4" />}
          shape="square"
          size={48}
          className="border border-gray-200"
        />
      ),
    },
    {
      id: 'title',
      header: t('fields.title'),
      accessorKey: 'title',
      cell: ({ row, getValue }) => (
        <div>
          <div className="font-medium">{getValue() as string}</div>
          {row.original.edition && (
            <div className="text-xs text-gray-500">{row.original.edition}</div>
          )}
        </div>
      ),
      enableSorting: true,
    },
    {
      id: 'bookType',
      header: t('fields.type'),
      accessorKey: 'bookType',
      cell: ({ getValue }) => (
        <Tag
          color={getBookTypeColor(getValue() as VoucherBookType)}
          icon={<BookOpen className="w-3 h-3" />}
        >
          {t(`bookType.${getValue()}`)}
        </Tag>
      ),
      filterFn: 'equals',
      enableColumnFilter: true,
    },
    {
      id: 'period',
      header: t('fields.period'),
      accessorFn: (row) =>
        `${row.month ? String(row.month).padStart(2, '0') + '/' : ''}${row.year}`,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3 text-gray-400" />
          <span>
            {row.original.month &&
              `${String(row.original.month).padStart(2, '0')}/`}
            {row.original.year}
          </span>
        </div>
      ),
    },
    {
      id: 'status',
      header: t('fields.status'),
      accessorKey: 'status',
      cell: ({ getValue }) => (
        <Tag color={getStatusColor(getValue() as VoucherBookStatus)}>
          {t(`status.${getValue()}`).toUpperCase()}
        </Tag>
      ),
      filterFn: 'equals',
      enableColumnFilter: true,
    },
    {
      id: 'pages',
      header: t('fields.pages'),
      accessorFn: (row) => `${row.pageCount}/${row.totalPages}`,
      cell: ({ row }) => (
        <div className="text-center">
          <div className="font-medium">{row.original.pageCount}</div>
          <div className="text-xs text-gray-500">
            of {row.original.totalPages}
          </div>
        </div>
      ),
    },
    {
      id: 'distributionCount',
      header: t('fields.distribution'),
      accessorKey: 'distributionCount',
      cell: ({ getValue }) => (getValue() as number).toLocaleString(),
      enableSorting: true,
    },
    {
      id: 'publishedAt',
      header: t('fields.publishedAt'),
      accessorKey: 'publishedAt',
      cell: ({ getValue }) => {
        const date = getValue() as string
        return date ? formatDate(new Date(date)) : '-'
      },
      enableSorting: true,
    },
    {
      id: 'actions',
      header: t('fields.actions'),
      cell: ({ row }) => {
        const record = row.original

        const menuItems: MenuProps['items'] = [
          {
            key: 'view',
            label: t('actions.view'),
            icon: <Eye className="w-4 h-4" />,
            onClick: () => onView(record.id),
          },
          {
            key: 'edit',
            label: t('actions.edit'),
            icon: <Edit className="w-4 h-4" />,
            onClick: () => onEdit(record.id),
            disabled:
              record.status === VoucherBookStatus.PUBLISHED ||
              record.status === VoucherBookStatus.ARCHIVED,
          },
          ...(record.pdfUrl
            ? [
                {
                  key: 'download',
                  label: t('actions.downloadPdf'),
                  icon: <Download className="w-4 h-4" />,
                  onClick: () => onDownloadPdf(record.pdfUrl!),
                },
              ]
            : []),
          {
            type: 'divider' as const,
          },
          {
            key: 'delete',
            label: t('actions.delete'),
            icon: <Trash2 className="w-4 h-4" />,
            danger: true,
            onClick: () => onDelete(record.id),
            disabled: record.status === VoucherBookStatus.PUBLISHED,
          },
        ]

        return (
          <Dropdown menu={{ items: menuItems }} placement="bottomRight">
            <Button
              type="text"
              icon={<MoreVertical className="w-4 h-4" />}
              size="small"
            />
          </Dropdown>
        )
      },
    },
  ]

  return (
    <DataGridServer
      name="voucher-books"
      data={data}
      columns={columns}
      loading={loading}
      pagination={pagination}
      onQueryChange={(params) => onTableChange(params, {}, {})}
      features={{
        virtualization: { enabled: false },
        columnManagement: {
          enabled: true,
          resizable: true,
          reorderable: true,
          hideable: true,
          pinnable: false,
        },
        filtering: {
          enabled: true,
          globalSearch: true,
          columnFilters: true,
          advancedFilters: false,
        },
        export: {
          enabled: false,
          formats: [],
        },
        realtime: { enabled: false },
      }}
      display={{
        responsive: true,
      }}
      onRowClick={(row) => onView(row.id)}
    />
  )
}
