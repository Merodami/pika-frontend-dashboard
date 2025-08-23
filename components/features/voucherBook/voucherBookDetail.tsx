'use client'

import { useState } from 'react'
import { Tabs, Modal, message, Spin, Alert } from 'antd'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import {
  VoucherBookStatus,
  mapApiVoucherBookToDomain,
} from '@/lib/api/mappers/voucherBook'
import { VoucherBookHeader } from './detail/VoucherBookHeader'
import { VoucherBookSummaryCard } from './detail/VoucherBookSummaryCard'
import { VoucherBookOverview } from './detail/VoucherBookOverview'
import { VoucherBookHistory } from './detail/VoucherBookHistory'
import { VoucherBookDistribution } from './detail/VoucherBookDistribution'
import { VoucherBookPdfGenerator } from './VoucherBookPdfGenerator'
import { VoucherBookStatusWorkflow } from './VoucherBookStatusWorkflow'
import {
  useVoucherBook,
  useDeleteVoucherBook,
  useGenerateVoucherBookPdf,
} from '@/hooks/api/voucherBooks/useVoucherBooks'
import type { Locale } from '@/i18n/config'

interface VoucherBookDetailProps {
  bookId: string
  locale: Locale
}

export function VoucherBookDetail({ bookId, locale }: VoucherBookDetailProps) {
  const t = useTranslations('voucherBooks')
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] =
    useState<VoucherBookStatus | null>(null)

  // API hooks
  const { data: apiBook, isLoading, error, refetch } = useVoucherBook(bookId)
  const deleteBookMutation = useDeleteVoucherBook()
  const generatePdfMutation = useGenerateVoucherBookPdf()

  // Convert API response to domain object
  const book = apiBook ? mapApiVoucherBookToDomain(apiBook) : null

  const handleBack = () => {
    router.push(`/${locale}/admin/voucher-books`)
  }

  const handleEdit = () => {
    router.push(`/${locale}/admin/voucher-books/${bookId}/edit`)
  }

  const handleDelete = () => {
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    try {
      await deleteBookMutation.mutateAsync(bookId)
      message.success(t('messages.deleteSuccess'))
      setIsDeleteModalOpen(false)
      router.push(`/${locale}/admin/voucher-books`)
    } catch (error) {
      message.error(t('messages.deleteError'))
    }
  }

  const handleStatusChange = (status: VoucherBookStatus) => {
    setSelectedStatus(status)
    setIsStatusModalOpen(true)
  }

  const confirmStatusChange = async () => {
    if (!selectedStatus || !book) return

    try {
      // TODO: Implement status change API call when available
      message.info(t('messages.statusChangeComingSoon'))
      setIsStatusModalOpen(false)
      setSelectedStatus(null)
      refetch()
    } catch (error) {
      message.error(t('messages.statusChangeError'))
    }
  }

  const handleGeneratePdf = async () => {
    try {
      await generatePdfMutation.mutateAsync({
        id: bookId,
        data: { priority: 'normal' },
      })
      message.success(t('messages.pdfGenerationStarted'))
      refetch()
    } catch (error) {
      message.error(t('messages.pdfGenerationError'))
    }
  }

  const handleArchive = async () => {
    await handleStatusChange(VoucherBookStatus.ARCHIVED)
  }

  const handleDuplicate = async () => {
    try {
      // TODO: Implement duplicate API call when available
      message.info(t('messages.duplicateComingSoon'))
    } catch (error) {
      message.error(t('messages.duplicateError'))
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spin size="large" />
      </div>
    )
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Alert
          message={t('messages.loadError')}
          description={t('messages.bookNotFound')}
          type="error"
          showIcon
        />
      </div>
    )
  }

  const tabItems = [
    {
      key: 'overview',
      label: t('detail.tabs.overview'),
      children: <VoucherBookOverview book={book} />,
    },
    {
      key: 'workflow',
      label: t('detail.tabs.workflow'),
      children: <VoucherBookStatusWorkflow book={book} onStatusChange={handleStatusChange} />,
    },
    {
      key: 'pdf',
      label: t('detail.tabs.pdf'),
      children: <VoucherBookPdfGenerator book={book} />,
    },
    {
      key: 'history',
      label: t('detail.tabs.history'),
      children: <VoucherBookHistory book={book} />,
    },
    {
      key: 'distribution',
      label: t('detail.tabs.distribution'),
      children: <VoucherBookDistribution book={book} />,
    },
  ]

  const getStatusChangeConfirmMessage = (status: VoucherBookStatus) => {
    switch (status) {
      case VoucherBookStatus.PUBLISHED:
        return t('detail.confirmPublish')
      case VoucherBookStatus.ARCHIVED:
        return t('detail.confirmArchive')
      case VoucherBookStatus.DRAFT:
        return t('detail.confirmRevertToDraft')
      default:
        return t('detail.confirmStatusChange', { status })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <VoucherBookHeader
          book={book}
          onBack={handleBack}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onGeneratePdf={handleGeneratePdf}
          onStatusChange={handleStatusChange}
          onArchive={handleArchive}
          onDuplicate={handleDuplicate}
        />

        {/* Summary Card */}
        <VoucherBookSummaryCard book={book} />

        {/* Tabs Content */}
        <div className="bg-white rounded-lg shadow-sm">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
            className="px-6"
          />
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        title={t('detail.deleteConfirmTitle')}
        open={isDeleteModalOpen}
        onOk={confirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        okText={t('actions.delete')}
        cancelText={t('actions.cancel')}
        okButtonProps={{
          danger: true,
          loading: deleteBookMutation.isPending,
        }}
        maskClosable={!deleteBookMutation.isPending}
        closable={!deleteBookMutation.isPending}
      >
        <div className="py-4">
          <p className="text-gray-600 mb-4">
            {t('detail.deleteConfirmMessage', { title: book.title })}
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-800 text-sm font-medium">
              {t('detail.deleteWarning')}
            </p>
          </div>
        </div>
      </Modal>

      {/* Status Change Confirmation Modal */}
      <Modal
        title={t('detail.statusChangeTitle')}
        open={isStatusModalOpen}
        onOk={confirmStatusChange}
        onCancel={() => {
          setIsStatusModalOpen(false)
          setSelectedStatus(null)
        }}
        okText={t('actions.confirm')}
        cancelText={t('actions.cancel')}
        maskClosable={true}
        closable={true}
      >
        <div className="py-4">
          {selectedStatus && (
            <>
              <p className="text-gray-600 mb-4">
                {getStatusChangeConfirmMessage(selectedStatus)}
              </p>
              {selectedStatus === VoucherBookStatus.PUBLISHED && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-blue-800 text-sm">
                    {t('detail.publishInfo')}
                  </p>
                </div>
              )}
              {selectedStatus === VoucherBookStatus.ARCHIVED && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <p className="text-orange-800 text-sm">
                    {t('detail.archiveInfo')}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </Modal>
    </div>
  )
}
