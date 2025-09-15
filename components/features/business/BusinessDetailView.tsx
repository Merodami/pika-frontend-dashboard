'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import {
  Drawer,
  Tabs,
  Tag,
  Button,
  Descriptions,
  Card,
  Avatar,
  Modal,
  Spin,
  Empty,
} from 'antd'
import {
  Building,
  Mail,
  Phone,
  Star,
  Edit,
  Trash2,
  X,
  CheckCircle,
  XCircle,
  Clock,
  User,
  FileText,
  TrendingUp,
  AlertCircle,
} from 'lucide-react'
import { format } from 'date-fns'

import {
  useBusiness,
  useDeleteBusiness,
  useApproveBusiness,
  useBusinessVoucherStats,
} from '@/hooks/api/businesses/useBusinesses'
import { ContextActionBar } from '@/components/ui/ContextActionBar'
import type { ActionItem } from '@/components/ui/ContextActionBar'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { MetricCard } from '@/components/ui/MetricCard'
import type { Locale } from '@/i18n/config'

interface BusinessDetailViewProps {
  businessId: string
  locale: Locale
  mode?: 'drawer' | 'page'
}

export function BusinessDetailView({
  businessId,
  locale,
  mode = 'drawer',
}: BusinessDetailViewProps) {
  const router = useRouter()
  const t = useTranslations()
  const [drawerOpen, setDrawerOpen] = useState(mode === 'drawer')
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  // Use custom hooks for business data
  const { data: business, isLoading, error } = useBusiness(businessId)

  // Use custom hook for business voucher statistics
  const { data: stats } = useBusinessVoucherStats(businessId, {
    enabled: !!business,
  })

  // Use custom hooks for mutations with translated messages
  const deleteMutation = useDeleteBusiness({
    successMessage: t('business.message.deleteSuccess'),
    errorMessage: t('common.message.errorOccurred'),
  })
  const approveMutation = useApproveBusiness({
    successMessage: (data) =>
      data.approved
        ? t('business.message.approveSuccess')
        : t('business.message.rejectSuccess'),
    errorMessage: t('common.message.errorOccurred'),
  })

  const handleClose = () => {
    if (mode === 'drawer') {
      setDrawerOpen(false)
      setTimeout(() => {
        router.push(`/${locale}/admin/businesses`)
      }, 300)
    } else {
      router.push(`/${locale}/admin/businesses`)
    }
  }

  const handleEdit = () => {
    router.push(`/${locale}/admin/businesses/${businessId}/edit`)
  }

  const handleDelete = () => {
    setDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    deleteMutation.mutate(businessId, {
      onSuccess: () => {
        setDeleteModalOpen(false)
        router.push(`/${locale}/admin/businesses`)
      },
    })
  }

  const handleApprove = () => {
    approveMutation.mutate({ id: businessId, approved: true })
  }

  const handleReject = () => {
    approveMutation.mutate({ id: businessId, approved: false })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spin size="large" />
      </div>
    )
  }

  if (error || !business) {
    return (
      <div className="flex items-center justify-center h-96">
        <Empty
          description={t('business.detail.notFound')}
          image={<AlertCircle className="w-16 h-16 text-gray-400" />}
        />
      </div>
    )
  }

  // Context actions
  const contextActions: ActionItem[] = [
    {
      key: 'edit',
      label: t('business.action.edit'),
      icon: <Edit className="w-4 h-4" />,
      onClick: handleEdit,
    },
    {
      key: 'delete',
      label: t('business.action.delete'),
      icon: <Trash2 className="w-4 h-4" />,
      danger: true,
      onClick: handleDelete,
    },
  ]

  // Add approve/reject actions if business is verified but not approved
  if (business.verified && !business.approved) {
    contextActions.unshift(
      {
        key: 'approve',
        label: t('business.action.approve'),
        icon: <CheckCircle className="w-4 h-4" />,
        type: 'primary',
        onClick: handleApprove,
      },
      {
        key: 'reject',
        label: t('business.action.reject'),
        icon: <XCircle className="w-4 h-4" />,
        danger: true,
        onClick: handleReject,
      }
    )
  }

  const tabItems = [
    {
      key: 'overview',
      label: t('business.detail.tabs.overview'),
      children: (
        <div className="space-y-6">
          {/* Business Information */}
          <Card title={t('business.detail.sections.basicInfo')}>
            <Descriptions column={{ xs: 1, sm: 2 }} bordered>
              <Descriptions.Item label={t('business.field.name')}>
                {business.businessName}
              </Descriptions.Item>
              <Descriptions.Item label={t('business.field.category')}>
                <Tag color="blue">
                  {business.category?.name || t('common.na')}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label={t('business.field.status')} span={2}>
                <StatusBadge
                  entityType="business"
                  verified={business.verified}
                  approved={business.approved}
                />
              </Descriptions.Item>
              <Descriptions.Item
                label={t('business.field.description')}
                span={2}
              >
                {business.businessDescription || t('common.na')}
              </Descriptions.Item>
              <Descriptions.Item label={t('business.field.createdAt')}>
                {format(new Date(business.createdAt), 'PPP')}
              </Descriptions.Item>
              <Descriptions.Item label={t('business.field.updatedAt')}>
                {format(new Date(business.updatedAt), 'PPP')}
              </Descriptions.Item>
              {business.approvedAt && (
                <Descriptions.Item label={t('business.field.approvedAt')}>
                  {format(new Date(business.approvedAt), 'PPP')}
                </Descriptions.Item>
              )}
              {business.approvedBy && (
                <Descriptions.Item label={t('business.field.approvedBy')}>
                  Admin #{business.approvedBy}
                </Descriptions.Item>
              )}
            </Descriptions>
          </Card>

          {/* Owner Information */}
          {business.user && (
            <Card title={t('business.detail.sections.ownerInfo')}>
              <Descriptions column={{ xs: 1, sm: 2 }} bordered>
                <Descriptions.Item label={t('business.field.owner')}>
                  <div className="flex items-center gap-2">
                    <Avatar icon={<User className="w-4 h-4" />} size="small" />
                    {business.user.firstName} {business.user.lastName}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label={t('business.field.email')}>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {business.user.email}
                    {business.user.emailVerified && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label={t('business.field.phone')}>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {business.user.phoneNumber || t('common.na')}
                    {business.user.phoneVerified && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label={t('business.field.userStatus')}>
                  <Tag
                    color={
                      business.user.status === 'active' ? 'green' : 'default'
                    }
                  >
                    {business.user.status?.toUpperCase() || 'UNKNOWN'}
                  </Tag>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          )}

          {/* Business Registration Details */}
          {business.businessRegistration && (
            <Card title={t('business.detail.sections.registrationInfo')}>
              <Descriptions column={{ xs: 1, sm: 2 }} bordered>
                <Descriptions.Item label={t('business.field.currentStep')}>
                  {business.businessRegistration.currentStep || t('common.na')}
                </Descriptions.Item>
                <Descriptions.Item
                  label={t('business.field.registrationStatus')}
                  span={2}
                >
                  <Tag>
                    {business.businessRegistration.registrationStatus ||
                      t('common.na')}
                  </Tag>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          )}
        </div>
      ),
    },
    {
      key: 'metrics',
      label: t('business.detail.tabs.metrics'),
      children: (
        <div className="space-y-6">
          <Card title={t('business.detail.sections.performance')}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MetricCard
                value={business.avgRating?.toFixed(1) || '0.0'}
                label={t('business.field.rating')}
                icon={<Star className="w-4 h-4" />}
                color="yellow"
              />
              <MetricCard
                value={stats?.totalVouchers || 0}
                label={t('business.detail.totalVouchers')}
                icon={<FileText className="w-4 h-4" />}
                color="green"
              />
              <MetricCard
                value={stats?.totalRedemptions || 0}
                label={t('business.detail.totalRedemptions')}
                icon={<TrendingUp className="w-4 h-4" />}
                color="purple"
              />
            </div>
          </Card>

          {/* Vouchers Stats */}
          {stats?.topPerformingVouchers &&
            stats.topPerformingVouchers.length > 0 && (
              <Card title={t('business.detail.sections.topVouchers')}>
                <div className="space-y-2">
                  {stats.topPerformingVouchers.map((voucher) => (
                    <div
                      key={voucher.voucherId}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{voucher.title}</div>
                        <div className="text-sm text-gray-500">
                          {t('business.detail.redemptions')}:{' '}
                          {voucher.redemptions}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          {(voucher.redemptionRate * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs text-gray-500">
                          {t('business.detail.conversionRate')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
        </div>
      ),
    },
    {
      key: 'activity',
      label: t('business.detail.tabs.activity'),
      children: (
        <div className="space-y-4">
          <Card>
            <Empty
              description={t('common.message.comingSoon')}
              image={<Clock className="w-12 h-12 text-gray-400" />}
            />
          </Card>
        </div>
      ),
    },
  ]

  const content = (
    <>
      <ContextActionBar
        breadcrumbs={[
          {
            label: t('navigation.dashboard'),
            onClick: () => router.push(`/${locale}/admin`),
          },
          {
            label: t('navigation.businesses'),
            onClick: () => router.push(`/${locale}/admin/businesses`),
          },
          { label: business.businessName },
        ]}
        actions={contextActions}
      />

      <div className={mode === 'page' ? 'p-6' : ''}>
        <Tabs defaultActiveKey="overview" items={tabItems} />
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        title={t('business.detail.confirmDelete.title')}
        open={deleteModalOpen}
        onOk={confirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
        okText={t('common.button.delete')}
        cancelText={t('common.button.cancel')}
        okButtonProps={{ danger: true, loading: deleteMutation.isPending }}
      >
        <p>
          {t('business.detail.confirmDelete.message').replace(
            '{name}',
            business.businessName
          )}
        </p>
      </Modal>
    </>
  )

  if (mode === 'drawer') {
    return (
      <Drawer
        title={
          <div className="flex items-center gap-3">
            <Avatar
              icon={<Building className="w-5 h-5" />}
              size="large"
              className="bg-blue-100"
            />
            <div>
              <div className="font-semibold text-lg">
                {business.businessName}
              </div>
              <div className="text-sm text-gray-500">
                {business.category?.name || t('common.na')}
              </div>
            </div>
          </div>
        }
        placement="right"
        width="80%"
        onClose={handleClose}
        open={drawerOpen}
        extra={
          <Button
            type="text"
            icon={<X className="w-4 h-4" />}
            onClick={handleClose}
          />
        }
      >
        {content}
      </Drawer>
    )
  }

  return content
}
