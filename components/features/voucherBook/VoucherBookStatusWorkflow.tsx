'use client'

import { useState } from 'react'
import {
  Steps,
  Card,
  Button,
  Modal,
  Input,
  Alert,
  Typography,
  Divider,
} from 'antd'
import {
  Edit,
  Eye,
  FileText,
  Upload,
  Archive,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

import {
  VoucherBookStatus,
  type VoucherBookDomain,
} from '@/lib/api/mappers/voucherBook'

const { Title, Text, Paragraph } = Typography
const { TextArea } = Input

interface StatusTransition {
  from: VoucherBookStatus
  to: VoucherBookStatus
  label: string
  description: string
  requiresConfirmation: boolean
  requiresReason?: boolean
  icon: React.ReactNode
  color: string
  warning?: string
}

interface VoucherBookStatusWorkflowProps {
  book: VoucherBookDomain
  onStatusChange?: (newStatus: VoucherBookStatus, reason?: string) => void
  readOnly?: boolean
}

export function VoucherBookStatusWorkflow({
  book,
  onStatusChange,
  readOnly = false,
}: VoucherBookStatusWorkflowProps) {
  const t = useTranslations('voucherBooks')
  const [isTransitionModalOpen, setIsTransitionModalOpen] = useState(false)
  const [selectedTransition, setSelectedTransition] =
    useState<StatusTransition | null>(null)
  const [reason, setReason] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  // Define all possible status transitions
  const statusTransitions: StatusTransition[] = [
    {
      from: VoucherBookStatus.DRAFT,
      to: VoucherBookStatus.READY_FOR_PRINT,
      label: t('workflow.markReady'),
      description: t('workflow.markReadyDesc'),
      requiresConfirmation: true,
      icon: <FileText className="w-4 h-4" />,
      color: 'blue',
    },
    {
      from: VoucherBookStatus.READY_FOR_PRINT,
      to: VoucherBookStatus.PUBLISHED,
      label: t('workflow.publish'),
      description: t('workflow.publishDesc'),
      requiresConfirmation: true,
      requiresReason: true,
      icon: <Upload className="w-4 h-4" />,
      color: 'green',
      warning: t('workflow.publishWarning'),
    },
    {
      from: VoucherBookStatus.PUBLISHED,
      to: VoucherBookStatus.ARCHIVED,
      label: t('workflow.archive'),
      description: t('workflow.archiveDesc'),
      requiresConfirmation: true,
      requiresReason: true,
      icon: <Archive className="w-4 h-4" />,
      color: 'orange',
      warning: t('workflow.archiveWarning'),
    },
    {
      from: VoucherBookStatus.READY_FOR_PRINT,
      to: VoucherBookStatus.DRAFT,
      label: t('workflow.revertToDraft'),
      description: t('workflow.revertToDraftDesc'),
      requiresConfirmation: true,
      requiresReason: true,
      icon: <Edit className="w-4 h-4" />,
      color: 'gray',
    },
    {
      from: VoucherBookStatus.ARCHIVED,
      to: VoucherBookStatus.DRAFT,
      label: t('workflow.reactivate'),
      description: t('workflow.reactivateDesc'),
      requiresConfirmation: true,
      requiresReason: true,
      icon: <CheckCircle className="w-4 h-4" />,
      color: 'blue',
    },
  ]

  // Get available transitions for current status
  const availableTransitions = statusTransitions.filter(
    (transition) => transition.from === book.status
  )

  // Get workflow steps based on current status
  const getWorkflowSteps = () => {
    const allStatuses = [
      VoucherBookStatus.DRAFT,
      VoucherBookStatus.READY_FOR_PRINT,
      VoucherBookStatus.PUBLISHED,
      VoucherBookStatus.ARCHIVED,
    ]

    return allStatuses.map((status, index) => {
      let stepStatus: 'wait' | 'process' | 'finish' | 'error' = 'wait'

      if (status === book.status) {
        stepStatus = 'process'
      } else if (allStatuses.indexOf(book.status) > index) {
        stepStatus = 'finish'
      }

      return {
        title: t(`status.${status}`),
        status: stepStatus,
        icon: getStatusIcon(status),
        description: getStatusDescription(status),
      }
    })
  }

  const getStatusIcon = (status: VoucherBookStatus) => {
    switch (status) {
      case VoucherBookStatus.DRAFT:
        return <Edit className="w-4 h-4" />
      case VoucherBookStatus.READY_FOR_PRINT:
        return <Eye className="w-4 h-4" />
      case VoucherBookStatus.PUBLISHED:
        return <Upload className="w-4 h-4" />
      case VoucherBookStatus.ARCHIVED:
        return <Archive className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getStatusDescription = (status: VoucherBookStatus) => {
    switch (status) {
      case VoucherBookStatus.DRAFT:
        return t('workflow.statusDesc.draft')
      case VoucherBookStatus.READY_FOR_PRINT:
        return t('workflow.statusDesc.readyForPrint')
      case VoucherBookStatus.PUBLISHED:
        return t('workflow.statusDesc.published')
      case VoucherBookStatus.ARCHIVED:
        return t('workflow.statusDesc.archived')
      default:
        return ''
    }
  }

  const handleTransitionClick = (transition: StatusTransition) => {
    setSelectedTransition(transition)
    setReason('')
    setIsTransitionModalOpen(true)
  }

  const handleConfirmTransition = async () => {
    if (!selectedTransition) return

    if (selectedTransition.requiresReason && !reason.trim()) {
      return // Show validation error
    }

    setIsProcessing(true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      onStatusChange?.(selectedTransition.to, reason.trim() || undefined)
      setIsTransitionModalOpen(false)
      setSelectedTransition(null)
      setReason('')
    } catch (error) {
      console.error('Status transition failed:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const getCurrentStepIndex = () => {
    const statuses = [
      VoucherBookStatus.DRAFT,
      VoucherBookStatus.READY_FOR_PRINT,
      VoucherBookStatus.PUBLISHED,
      VoucherBookStatus.ARCHIVED,
    ]
    return statuses.indexOf(book.status)
  }

  return (
    <>
      <div className="space-y-6">
        {/* Current Status Overview */}
        <Card title={t('workflow.currentStatus')} className="shadow-sm">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-2 rounded-lg bg-blue-50">
              {getStatusIcon(book.status)}
            </div>
            <div>
              <Title level={4} className="mb-0">
                {t(`status.${book.status}`)}
              </Title>
              <Text type="secondary">{getStatusDescription(book.status)}</Text>
            </div>
          </div>

          {/* Status Requirements/Information */}
          {book.status === VoucherBookStatus.DRAFT && (
            <Alert
              message={t('workflow.draftInfo')}
              description={t('workflow.draftInfoDesc')}
              type="info"
              showIcon
              className="mb-4"
            />
          )}

          {book.status === VoucherBookStatus.READY_FOR_PRINT && (
            <Alert
              message={t('workflow.readyInfo')}
              description={t('workflow.readyInfoDesc')}
              type="warning"
              showIcon
              className="mb-4"
            />
          )}

          {book.status === VoucherBookStatus.PUBLISHED && (
            <Alert
              message={t('workflow.publishedInfo')}
              description={t('workflow.publishedInfoDesc')}
              type="success"
              showIcon
              className="mb-4"
            />
          )}
        </Card>

        {/* Workflow Progress */}
        <Card title={t('workflow.progress')} className="shadow-sm">
          <Steps
            current={getCurrentStepIndex()}
            items={getWorkflowSteps()}
            direction="vertical"
            size="small"
          />
        </Card>

        {/* Available Actions */}
        {availableTransitions.length > 0 && !readOnly && (
          <Card title={t('workflow.availableActions')} className="shadow-sm">
            <div className="grid gap-4 md:grid-cols-2">
              {availableTransitions.map((transition, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer transition-colors"
                  onClick={() => handleTransitionClick(transition)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg bg-${transition.color}-50`}>
                      {transition.icon}
                    </div>
                    <div className="flex-1">
                      <Title level={5} className="mb-1">
                        {transition.label}
                      </Title>
                      <Paragraph className="text-sm text-gray-600 mb-0">
                        {transition.description}
                      </Paragraph>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Requirements Checklist (for complex transitions) */}
        {book.status === VoucherBookStatus.DRAFT && (
          <Card title={t('workflow.requirements')} className="shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <Text>{t('workflow.req.basicInfo')}</Text>
              </div>
              <div className="flex items-center space-x-2">
                {book.coverImageUrl ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                )}
                <Text className={!book.coverImageUrl ? 'text-orange-600' : ''}>
                  {t('workflow.req.coverImage')}
                </Text>
              </div>
              <div className="flex items-center space-x-2">
                {book.totalPages > 0 ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                )}
                <Text
                  className={book.totalPages === 0 ? 'text-orange-600' : ''}
                >
                  {t('workflow.req.pages')}
                </Text>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Status Transition Modal */}
      <Modal
        title={t('workflow.confirmTransition')}
        open={isTransitionModalOpen}
        onCancel={() => {
          if (!isProcessing) {
            setIsTransitionModalOpen(false)
            setSelectedTransition(null)
            setReason('')
          }
        }}
        footer={null}
        maskClosable={!isProcessing}
        closable={!isProcessing}
      >
        {selectedTransition && (
          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-3">
              <div
                className={`p-2 rounded-lg bg-${selectedTransition.color}-50`}
              >
                {selectedTransition.icon}
              </div>
              <div>
                <Title level={4} className="mb-0">
                  {selectedTransition.label}
                </Title>
                <Text type="secondary">
                  {t(`status.${book.status}`)} →{' '}
                  {t(`status.${selectedTransition.to}`)}
                </Text>
              </div>
            </div>

            <Paragraph>{selectedTransition.description}</Paragraph>

            {selectedTransition.warning && (
              <Alert
                message={t('workflow.warning')}
                description={selectedTransition.warning}
                type="warning"
                showIcon
              />
            )}

            {selectedTransition.requiresReason && (
              <div className="space-y-2">
                <Text strong>{t('workflow.reasonRequired')}</Text>
                <TextArea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder={t('workflow.reasonPlaceholder')}
                  rows={3}
                  disabled={isProcessing}
                />
              </div>
            )}

            <Divider />

            <div className="flex justify-end space-x-2">
              <Button
                onClick={() => {
                  setIsTransitionModalOpen(false)
                  setSelectedTransition(null)
                  setReason('')
                }}
                disabled={isProcessing}
              >
                {t('actions.cancel')}
              </Button>
              <Button
                type="primary"
                onClick={handleConfirmTransition}
                loading={isProcessing}
                disabled={selectedTransition.requiresReason && !reason.trim()}
              >
                {t('workflow.confirm')}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
