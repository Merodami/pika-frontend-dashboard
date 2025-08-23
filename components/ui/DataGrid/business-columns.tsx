import type { ColumnDef } from '@tanstack/react-table'
import { Avatar, Tag } from 'antd'
import { CheckCircle, XCircle, Star, Store, User } from 'lucide-react'
import type { GetAdminBusinessList200DataItem } from '@/lib/api/orval-client'

export const createBusinessColumns = (
  t: (key: string) => string,
  locale: string
): ColumnDef<GetAdminBusinessList200DataItem>[] => [
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
    accessorKey: 'businessName',
    header: t('businesses.fields.name'),
    cell: ({ row }) => {
      const business = row.original
      return (
        <div className="flex items-center gap-3">
          <Avatar size="small" icon={<Store />} />
          <div>
            <div className="font-medium">{business.businessName}</div>
            {business.businessDescription && (
              <div className="text-xs text-gray-500 truncate max-w-xs">
                {business.businessDescription}
              </div>
            )}
          </div>
        </div>
      )
    },
    enableSorting: true,
  },
  {
    accessorKey: 'user',
    header: t('businesses.fields.owner'),
    cell: ({ row }) => {
      const business = row.original
      return business.user ? (
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-400" />
          <div>
            <div className="text-sm">
              {business.user.firstName} {business.user.lastName}
            </div>
            <div className="text-xs text-gray-500">{business.user.email}</div>
          </div>
        </div>
      ) : (
        <span className="text-gray-400">N/A</span>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'category',
    header: t('businesses.fields.category'),
    cell: ({ row }) => {
      const business = row.original
      return business.category ? (
        <Tag>{business.category.name}</Tag>
      ) : (
        <span className="text-gray-400">Uncategorized</span>
      )
    },
    enableSorting: false,
  },
  {
    id: 'status',
    header: t('businesses.fields.status'),
    cell: ({ row }) => {
      const business = row.original
      const getVerificationStatus = (
        verified?: boolean,
        approved?: boolean,
        active?: boolean
      ) => {
        if (!active)
          return { color: 'default', text: t('businesses.status.inactive') }
        if (verified && approved)
          return {
            color: 'success',
            text: t('businesses.status.verifiedApproved'),
          }
        if (verified && !approved)
          return {
            color: 'warning',
            text: t('businesses.status.verifiedPending'),
          }
        if (!verified && approved)
          return {
            color: 'processing',
            text: t('businesses.status.approvedNotVerified'),
          }
        return { color: 'default', text: t('businesses.status.pending') }
      }

      const status = getVerificationStatus(
        business.verified,
        business.approved,
        business.active
      )
      return <Tag color={status.color}>{status.text}</Tag>
    },
    enableSorting: false,
  },
  {
    id: 'verification',
    header: t('businesses.fields.verification'),
    cell: ({ row }) => {
      const business = row.original
      return (
        <div className="flex items-center gap-2">
          {business.verified ? (
            <CheckCircle className="w-4 h-4 text-green-500" />
          ) : (
            <XCircle className="w-4 h-4 text-gray-400" />
          )}
          <span className="text-sm">
            {business.verified
              ? t('businesses.status.verified')
              : t('businesses.status.notVerified')}
          </span>
        </div>
      )
    },
    enableSorting: false,
  },
  {
    id: 'approval',
    header: t('businesses.fields.approval'),
    cell: ({ row }) => {
      const business = row.original
      return (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            {business.approved ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <XCircle className="w-4 h-4 text-gray-400" />
            )}
            <span className="text-sm">
              {business.approved
                ? t('businesses.status.approved')
                : t('businesses.status.notApproved')}
            </span>
          </div>
          {business.approvedBy && business.approvedAt && (
            <div className="text-xs text-gray-500 mt-1">
              by {business.approvedBy} on{' '}
              {new Date(business.approvedAt).toLocaleDateString(locale)}
            </div>
          )}
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'avgRating',
    header: t('businesses.fields.rating'),
    cell: ({ getValue }) => {
      const rating = getValue() as number | null
      return rating ? (
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span>{rating.toFixed(1)}</span>
        </div>
      ) : (
        <span className="text-gray-400">No ratings</span>
      )
    },
    enableSorting: true,
  },
  {
    accessorKey: 'createdAt',
    header: t('businesses.fields.createdAt'),
    cell: ({ getValue }) => {
      const date = getValue() as string
      return new Date(date).toLocaleDateString(locale)
    },
    enableSorting: true,
  },
]
