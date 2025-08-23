'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import {
  Table,
  Card,
  Button,
  Space,
  Tag,
  Input,
  Select,
  Dropdown,
  type MenuProps,
} from 'antd'
import {
  PlusOutlined,
  SearchOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons'
import {
  UserRole,
  VoucherState,
  VoucherDiscountType,
} from '@merodami/pika-types'
import type {
  AdminVoucherListResponse,
  AdminVoucherQueryParams,
} from '@/lib/api/orval-generated/models'
import type { ColumnsType } from 'antd/es/table'

import { useVoucherQueries } from '@/hooks/api/vouchers/useVoucherQueries'
import { useVoucherMutations } from '@/hooks/api/vouchers/useVoucherMutations'
import { formatDate } from '@/lib/utils/date'
import type { Locale } from '@/i18n/config'

const { Search } = Input

interface VoucherListContainerProps {
  userRole: UserRole
  businessId?: string
  locale: Locale
}

export function VoucherListContainer({
  userRole,
  businessId,
  locale,
}: VoucherListContainerProps) {
  const router = useRouter()
  const t = useTranslations('vouchers')
  const tCommon = useTranslations('common')

  const [searchParams, setSearchParams] = useState<VoucherSearchParams>({
    page: 1,
    limit: 10,
    ...(businessId && { businessId }),
  })

  const { useVouchersList } = useVoucherQueries()
  const { deleteVoucher, publishVoucher, expireVoucher } = useVoucherMutations()

  const { data, isLoading, refetch } = useVouchersList(searchParams, userRole)

  const handleSearch = (value: string) => {
    setSearchParams((prev) => ({ ...prev, search: value, page: 1 }))
  }

  const handleFilterChange = (field: keyof VoucherSearchParams, value: any) => {
    setSearchParams((prev) => ({ ...prev, [field]: value, page: 1 }))
  }

  const handlePageChange = (page: number, pageSize: number) => {
    setSearchParams((prev) => ({ ...prev, page, limit: pageSize }))
  }

  const handleCreateVoucher = () => {
    const path =
      userRole === UserRole.ADMIN
        ? `/${locale}/admin/vouchers/create`
        : `/${locale}/business/vouchers/create`
    router.push(path)
  }

  const handleViewVoucher = (id: string) => {
    const path =
      userRole === UserRole.ADMIN
        ? `/${locale}/admin/vouchers/${id}`
        : `/${locale}/business/vouchers/${id}`
    router.push(path)
  }

  const handleEditVoucher = (id: string) => {
    const path =
      userRole === UserRole.ADMIN
        ? `/${locale}/admin/vouchers/${id}/edit`
        : `/${locale}/business/vouchers/${id}/edit`
    router.push(path)
  }

  const handleDeleteVoucher = async (id: string) => {
    await deleteVoucher.mutateAsync(id)
    refetch()
  }

  const handlePublishVoucher = async (id: string) => {
    await publishVoucher.mutateAsync(id)
    refetch()
  }

  const handleExpireVoucher = async (id: string) => {
    await expireVoucher.mutateAsync(id)
    refetch()
  }

  const getStateColor = (state: VoucherState) => {
    switch (state) {
      case VoucherState.DRAFT:
        return 'default'
      case VoucherState.PUBLISHED:
        return 'success'
      case VoucherState.EXPIRED:
        return 'error'
      case VoucherState.SUSPENDED:
        return 'warning'
      default:
        return 'default'
    }
  }

  const getStateLabel = (state: VoucherState) => {
    switch (state) {
      case VoucherState.DRAFT:
        return t('status.draft')
      case VoucherState.PUBLISHED:
        return t('status.published')
      case VoucherState.EXPIRED:
        return t('status.expired')
      case VoucherState.SUSPENDED:
        return t('status.suspended')
      default:
        return state
    }
  }

  const getDiscountDisplay = (voucher: VoucherDomain) => {
    if (voucher.discountType === VoucherDiscountType.PERCENTAGE) {
      return `${voucher.discountValue}%`
    }
    return `Gs. ${voucher.discountValue?.toLocaleString()}`
  }

  const getActionItems = (voucher: VoucherDomain): MenuProps['items'] => {
    const items: MenuProps['items'] = [
      {
        key: 'view',
        label: tCommon('button.view'),
        icon: <EyeOutlined />,
        onClick: () => handleViewVoucher(voucher.id),
      },
      {
        key: 'edit',
        label: tCommon('button.edit'),
        icon: <EditOutlined />,
        onClick: () => handleEditVoucher(voucher.id),
        disabled: voucher.state !== VoucherState.DRAFT,
      },
    ]

    if (voucher.state === VoucherState.DRAFT) {
      items.push({
        key: 'publish',
        label: t('actions.publish'),
        icon: <CheckCircleOutlined />,
        onClick: () => handlePublishVoucher(voucher.id),
      })
    }

    if (voucher.state === VoucherState.PUBLISHED) {
      items.push({
        key: 'expire',
        label: t('actions.expire'),
        icon: <CloseCircleOutlined />,
        onClick: () => handleExpireVoucher(voucher.id),
      })
    }

    items.push(
      { type: 'divider' },
      {
        key: 'delete',
        label: tCommon('button.delete'),
        icon: <DeleteOutlined />,
        danger: true,
        onClick: () => handleDeleteVoucher(voucher.id),
        disabled: voucher.state === VoucherState.PUBLISHED,
      }
    )

    return items
  }

  const columns: ColumnsType<VoucherDomain> = [
    {
      title: t('fields.title'),
      dataIndex: 'title',
      key: 'title',
      render: (title: any) =>
        title?.es || title?.en || title?.gn || t('untitled'),
    },
    {
      title: t('fields.business'),
      dataIndex: 'businessName',
      key: 'businessName',
      render: (_, record) => record.businessId,
      hidden: userRole === UserRole.BUSINESS,
    },
    {
      title: t('fields.discount'),
      dataIndex: 'discountValue',
      key: 'discountValue',
      render: (_, record) => getDiscountDisplay(record),
    },
    {
      title: t('fields.state'),
      dataIndex: 'state',
      key: 'state',
      render: (state: VoucherState) => (
        <Tag color={getStateColor(state)}>
          {getStateLabel(state).toUpperCase()}
        </Tag>
      ),
    },
    {
      title: t('fields.validFrom'),
      dataIndex: 'validFrom',
      key: 'validFrom',
      render: (date: Date) => (date ? formatDate(date) : '-'),
    },
    {
      title: t('fields.validUntil'),
      dataIndex: 'expiresAt',
      key: 'expiresAt',
      render: (date: Date) => (date ? formatDate(date) : '-'),
    },
    {
      title: t('fields.redemptions'),
      key: 'redemptions',
      render: (_, record) =>
        `${record.currentRedemptions || 0}/${record.maxRedemptions || '∞'}`,
    },
    {
      title: t('fields.actions'),
      key: 'actions',
      render: (_, record) => (
        <Dropdown menu={{ items: getActionItems(record) }} trigger={['click']}>
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ].filter((col) => !col.hidden)

  return (
    <div className="voucher-list-container">
      {/* Actions Bar */}
      <Card className="mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Space>
            <Search
              placeholder={t('searchPlaceholder')}
              onSearch={handleSearch}
              style={{ width: 250 }}
              prefix={<SearchOutlined />}
            />

            <Select
              placeholder={t('filterByState')}
              style={{ width: 150 }}
              allowClear
              onChange={(value) => handleFilterChange('state', value)}
            >
              <Select.Option value={VoucherState.DRAFT}>
                {t('status.draft')}
              </Select.Option>
              <Select.Option value={VoucherState.PUBLISHED}>
                {t('status.published')}
              </Select.Option>
              <Select.Option value={VoucherState.EXPIRED}>
                {t('status.expired')}
              </Select.Option>
              <Select.Option value={VoucherState.SUSPENDED}>
                {t('status.suspended')}
              </Select.Option>
            </Select>

            <Select
              placeholder={t('filterByType')}
              style={{ width: 150 }}
              allowClear
              onChange={(value) => handleFilterChange('discountType', value)}
            >
              <Select.Option value={VoucherDiscountType.PERCENTAGE}>
                {t('discountType.percentage')}
              </Select.Option>
              <Select.Option value={VoucherDiscountType.FIXED}>
                {t('discountType.fixed')}
              </Select.Option>
            </Select>
          </Space>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreateVoucher}
          >
            {t('create.button')}
          </Button>
        </div>
      </Card>

      {/* Vouchers Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={data?.data || []}
          rowKey="id"
          loading={isLoading}
          pagination={{
            current: searchParams.page,
            pageSize: searchParams.limit,
            total: data?.pagination?.total || 0,
            onChange: handlePageChange,
            showSizeChanger: true,
            showTotal: (total) => t('totalVouchers', { count: total }),
          }}
        />
      </Card>
    </div>
  )
}
