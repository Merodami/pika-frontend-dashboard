'use client'

import {
  Card,
  Descriptions,
  Tag,
  Button,
  Space,
  Spin,
  Alert,
  Statistic,
  Row,
  Col,
} from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  QrcodeOutlined,
  EyeOutlined,
  DollarOutlined,
} from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import {
  UserRole,
  VoucherState,
  VoucherDiscountType,
} from '@/lib/api/orval-client'

import { useVoucherQueries } from '@/hooks/api/vouchers/useVoucherQueries'
import { useVoucherMutations } from '@/hooks/api/vouchers/useVoucherMutations'
import { formatDate } from '@/lib/utils/date'
import { VoucherPreview } from './voucherPreview'
import type { Locale } from '@/i18n/config'
import type { VoucherDesign, VoucherDomain } from '@/types/voucher'

interface VoucherDetailProps {
  voucherId: string
  userRole: UserRole
  locale: Locale
}

export function VoucherDetail({
  voucherId,
  userRole,
  locale,
}: VoucherDetailProps) {
  const router = useRouter()
  const t = useTranslations('vouchers')
  const tCommon = useTranslations('common')

  const { useVoucher } = useVoucherQueries()
  const { deleteVoucher, publishVoucher, expireVoucher } = useVoucherMutations()

  const { data: voucher, isLoading, error } = useVoucher(voucherId, userRole)

  const handleEdit = () => {
    const path =
      userRole === UserRole.admin
        ? `/${locale}/admin/vouchers/${voucherId}/edit`
        : `/${locale}/business/vouchers/${voucherId}/edit`
    router.push(path)
  }

  const handleDelete = async () => {
    await deleteVoucher.mutateAsync(voucherId)
    const path =
      userRole === UserRole.admin
        ? `/${locale}/admin/vouchers`
        : `/${locale}/business/vouchers`
    router.push(path)
  }

  const handlePublish = async () => {
    await publishVoucher.mutateAsync(voucherId)
  }

  const handleExpire = async () => {
    await expireVoucher.mutateAsync(voucherId)
  }

  const getStateColor = (state: VoucherState) => {
    switch (state) {
      case VoucherState.draft:
        return 'default'
      case VoucherState.published:
        return 'success'
      case VoucherState.expired:
        return 'error'
      case VoucherState.suspended:
        return 'warning'
      default:
        return 'default'
    }
  }

  const getStateLabel = (state: VoucherState) => {
    switch (state) {
      case VoucherState.draft:
        return t('status.draft')
      case VoucherState.published:
        return t('status.published')
      case VoucherState.expired:
        return t('status.expired')
      case VoucherState.suspended:
        return t('status.suspended')
      default:
        return state
    }
  }

  const getDiscountDisplay = () => {
    if (!voucher) return '-'
    if (voucher.discountType === VoucherDiscountType.percentage) {
      return `${voucher.discountValue}%`
    }
    return `Gs. ${voucher.discountValue?.toLocaleString()}`
  }

  const convertToVoucherDesign = (voucher: VoucherDomain): VoucherDesign => {
    return {
      title: voucher.title || '',
      description: voucher.description || '',
      category: voucher.categoryId || '',
      discountType: voucher.discountType,
      discountValue: voucher.discountValue || 0,
      originalPrice: 0,
      minimumPurchase: 0,
      validFrom: voucher.validFrom || '',
      validUntil: voucher.expiresAt || '',
      maxRedemptions: voucher.maxRedemptions || 0,
      maxRedemptionsPerUser: voucher.maxRedemptionsPerUser || 1,
      businessName: voucher.businessId,
      businessAddress: '',
      businessPhone: '',
      businessWebsite: '',
      primaryColor: '#1890ff',
      secondaryColor: '#f0f0f0',
      backgroundColor: '#ffffff',
      textColor: '#000000',
      colors: {
        background: '#ffffff',
        text: '#000000',
        accent: '#1890ff',
      },
      template: 'modern',
      terms: voucher.terms?.split(', ') || [],
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    )
  }

  if (error || !voucher) {
    return (
      <Alert
        message={t('error.notFound')}
        description={t('error.voucherNotFound')}
        type="error"
        showIcon
      />
    )
  }

  return (
    <div className="voucher-detail">
      {/* Header Actions */}
      <Card className="mb-4">
        <div className="flex justify-between items-center">
          <Space>
            <h2 className="text-xl font-semibold m-0">
              {voucher.title || t('untitled')}
            </h2>
            <Tag color={getStateColor(voucher.state)}>
              {getStateLabel(voucher.state).toUpperCase()}
            </Tag>
          </Space>

          <Space>
            {voucher.state === VoucherState.draft && (
              <>
                <Button
                  type="primary"
                  icon={<CheckCircleOutlined />}
                  onClick={handlePublish}
                  loading={publishVoucher.isPending}
                >
                  {t('actions.publish')}
                </Button>
                <Button icon={<EditOutlined />} onClick={handleEdit}>
                  {tCommon('button.edit')}
                </Button>
              </>
            )}

            {voucher.state === VoucherState.published && (
              <Button
                danger
                icon={<CloseCircleOutlined />}
                onClick={handleExpire}
                loading={expireVoucher.isPending}
              >
                {t('actions.expire')}
              </Button>
            )}

            {voucher.state !== VoucherState.published && (
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={handleDelete}
                loading={deleteVoucher.isPending}
              >
                {tCommon('button.delete')}
              </Button>
            )}
          </Space>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-4">
          {/* Statistics */}
          <Card>
            <Row gutter={16}>
              <Col span={6}>
                <Statistic
                  title={t('stats.scans')}
                  value={voucher.scanCount || 0}
                  prefix={<EyeOutlined />}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title={t('stats.claims')}
                  value={voucher.claimCount || 0}
                  prefix={<QrcodeOutlined />}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title={t('stats.redemptions')}
                  value={voucher.currentRedemptions || 0}
                  suffix={`/ ${voucher.maxRedemptions || '∞'}`}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title={t('stats.conversionRate')}
                  value={
                    voucher.scanCount
                      ? (
                          ((voucher.currentRedemptions || 0) /
                            voucher.scanCount) *
                          100
                        ).toFixed(1)
                      : 0
                  }
                  suffix="%"
                  prefix={<DollarOutlined />}
                />
              </Col>
            </Row>
          </Card>

          {/* Details */}
          <Card title={t('details.title')}>
            <Descriptions bordered column={1}>
              <Descriptions.Item label={t('fields.id')}>
                {voucher.id}
              </Descriptions.Item>

              <Descriptions.Item label={t('fields.title')}>
                {voucher.title}
              </Descriptions.Item>

              <Descriptions.Item label={t('fields.description')}>
                {voucher.description}
              </Descriptions.Item>

              <Descriptions.Item label={t('fields.discount')}>
                {getDiscountDisplay()}
              </Descriptions.Item>

              <Descriptions.Item label={t('fields.validFrom')}>
                {voucher.validFrom ? formatDate(voucher.validFrom) : '-'}
              </Descriptions.Item>

              <Descriptions.Item label={t('fields.validUntil')}>
                {voucher.expiresAt ? formatDate(voucher.expiresAt) : '-'}
              </Descriptions.Item>

              <Descriptions.Item label={t('fields.maxRedemptions')}>
                {voucher.maxRedemptions || t('unlimited')}
              </Descriptions.Item>

              <Descriptions.Item label={t('fields.maxRedemptionsPerUser')}>
                {voucher.maxRedemptionsPerUser}
              </Descriptions.Item>

              <Descriptions.Item label={t('fields.createdAt')}>
                {formatDate(voucher.createdAt)}
              </Descriptions.Item>

              <Descriptions.Item label={t('fields.updatedAt')}>
                {formatDate(voucher.updatedAt)}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {/* Terms & Conditions */}
          {voucher.terms && (
            <Card title={t('fields.termsAndConditions')}>
              <p>{voucher.terms}</p>
            </Card>
          )}
        </div>

        {/* Preview */}
        <div className="lg:col-span-1">
          <Card title={t('preview.title')} className="sticky top-4">
            <VoucherPreview
              voucherDesign={convertToVoucherDesign(voucher)}
              showQRCode={true}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}
