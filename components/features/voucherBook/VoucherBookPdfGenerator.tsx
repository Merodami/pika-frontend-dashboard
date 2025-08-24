'use client'

import { useState, useEffect } from 'react'
import {
  Card,
  Button,
  Progress,
  Alert,
  Typography,
  Divider,
  Tag,
  Modal,
} from 'antd'
import {
  FileText,
  Download,
  RefreshCw,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

import type { VoucherBookDomain } from '@/lib/api/mappers/voucherBook'
import { useGenerateVoucherBookPdf } from '@/hooks/api/voucherBooks/useVoucherBooks'

const { Title, Text } = Typography

interface PDFGenerationStatus {
  status: 'idle' | 'generating' | 'completed' | 'failed'
  progress: number
  message?: string
  downloadUrl?: string
  generatedAt?: string
}

interface VoucherBookPdfGeneratorProps {
  book: VoucherBookDomain
  onGenerationComplete?: (downloadUrl: string) => void
}

export function VoucherBookPdfGenerator({
  book,
  onGenerationComplete,
}: VoucherBookPdfGeneratorProps) {
  const t = useTranslations('voucherBooks')
  const [generationStatus, setGenerationStatus] = useState<PDFGenerationStatus>(
    {
      status: book.pdfUrl ? 'completed' : 'idle',
      progress: book.pdfUrl ? 100 : 0,
      downloadUrl: book.pdfUrl,
      generatedAt: book.pdfGeneratedAt,
    }
  )
  const [isModalOpen, setIsModalOpen] = useState(false)

  const generatePdfMutation = useGenerateVoucherBookPdf()

  // Simulate progress updates during generation
  useEffect(() => {
    if (generationStatus.status === 'generating') {
      const interval = setInterval(() => {
        setGenerationStatus((prev) => {
          if (prev.progress >= 95) {
            return prev // Stop at 95% until real completion
          }
          return {
            ...prev,
            progress: Math.min(prev.progress + Math.random() * 10, 95),
          }
        })
      }, 1000)

      return () => clearInterval(interval)
    }
    return undefined
  }, [generationStatus.status])

  const handleGeneratePdf = async (
    priority: 'low' | 'normal' | 'high' = 'normal'
  ) => {
    try {
      setGenerationStatus({
        status: 'generating',
        progress: 0,
        message: t('pdf.generationStarted'),
      })

      await generatePdfMutation.mutateAsync({
        id: book.id,
        data: { priority },
      })

      // Simulate completion after API call
      setTimeout(() => {
        setGenerationStatus({
          status: 'completed',
          progress: 100,
          message: t('pdf.generationComplete'),
          downloadUrl: '#', // Mock URL for now - will be replaced with real URL from API
          generatedAt: new Date().toISOString(),
        })

        if (onGenerationComplete) {
          onGenerationComplete('#') // Mock URL for now
        }
      }, 2000)
    } catch (error) {
      setGenerationStatus({
        status: 'failed',
        progress: 0,
        message: t('pdf.generationFailed'),
      })
    }
  }

  const handleDownload = () => {
    if (generationStatus.downloadUrl) {
      window.open(generationStatus.downloadUrl, '_blank')
    }
  }

  const getStatusIcon = () => {
    switch (generationStatus.status) {
      case 'generating':
        return <Clock className="w-5 h-5 text-blue-500" />
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <FileText className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = () => {
    switch (generationStatus.status) {
      case 'generating':
        return 'processing'
      case 'completed':
        return 'success'
      case 'failed':
        return 'error'
      default:
        return 'default'
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString))
  }

  return (
    <>
      <Card
        title={
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>{t('pdf.title')}</span>
          </div>
        }
        className="shadow-sm"
      >
        <div className="space-y-4">
          {/* Status Display */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getStatusIcon()}
              <div>
                <Text strong>{t(`pdf.status.${generationStatus.status}`)}</Text>
                {generationStatus.generatedAt && (
                  <div className="text-sm text-gray-500">
                    {t('pdf.lastGenerated')}:{' '}
                    {formatDate(generationStatus.generatedAt)}
                  </div>
                )}
              </div>
            </div>
            <Tag color={getStatusColor()}>
              {t(`pdf.status.${generationStatus.status}`)}
            </Tag>
          </div>

          {/* Progress Bar (shown during generation) */}
          {generationStatus.status === 'generating' && (
            <div className="space-y-2">
              <Progress
                percent={Math.round(generationStatus.progress)}
                status="active"
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
              />
              {generationStatus.message && (
                <Text type="secondary" className="text-sm">
                  {generationStatus.message}
                </Text>
              )}
            </div>
          )}

          {/* Messages */}
          {generationStatus.status === 'failed' && (
            <Alert
              message={t('pdf.generationFailed')}
              description={t('pdf.generationFailedDescription')}
              type="error"
              showIcon
            />
          )}

          {generationStatus.status === 'completed' &&
            generationStatus.downloadUrl && (
              <Alert
                message={t('pdf.generationComplete')}
                description={t('pdf.readyForDownload')}
                type="success"
                showIcon
              />
            )}

          <Divider />

          {/* Actions */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Button
                icon={<FileText className="w-4 h-4" />}
                onClick={() => setIsModalOpen(true)}
                disabled={generationStatus.status === 'generating'}
              >
                {generationStatus.status === 'idle'
                  ? t('pdf.generate')
                  : t('pdf.regenerate')}
              </Button>

              {generationStatus.status === 'generating' && (
                <Button
                  icon={<RefreshCw className="w-4 h-4" />}
                  loading
                  disabled
                >
                  {t('pdf.generating')}
                </Button>
              )}
            </div>

            {generationStatus.downloadUrl &&
              generationStatus.status === 'completed' && (
                <Button
                  type="primary"
                  icon={<Download className="w-4 h-4" />}
                  onClick={handleDownload}
                >
                  {t('pdf.download')}
                </Button>
              )}
          </div>

          {/* Book Info Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mt-4">
            <Title level={5} className="mb-2">
              {t('pdf.bookSummary')}
            </Title>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <Text type="secondary">{t('fields.totalPages')}:</Text>
                <div className="font-medium">{book.totalPages}</div>
              </div>
              <div>
                <Text type="secondary">{t('fields.currentPages')}:</Text>
                <div className="font-medium">{book.pageCount}</div>
              </div>
              <div>
                <Text type="secondary">{t('fields.totalPlacements')}:</Text>
                <div className="font-medium">{book.totalPlacements}</div>
              </div>
              <div>
                <Text type="secondary">{t('pdf.estimatedSize')}:</Text>
                <div className="font-medium">
                  ~{Math.ceil(book.totalPages * 0.5)}MB
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Generation Options Modal */}
      <Modal
        title={t('pdf.generationOptions')}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={500}
      >
        <div className="space-y-4 py-4">
          <Alert
            message={t('pdf.optionsInfo')}
            description={t('pdf.optionsDescription')}
            type="info"
            showIcon
          />

          <div className="space-y-3">
            <Title level={5}>{t('pdf.priority')}</Title>

            <div className="space-y-2">
              <Button
                block
                size="large"
                onClick={() => {
                  handleGeneratePdf('high')
                  setIsModalOpen(false)
                }}
                className="text-left flex items-center justify-between"
              >
                <div>
                  <div className="font-medium">{t('pdf.priorityHigh')}</div>
                  <div className="text-sm text-gray-500">
                    {t('pdf.priorityHighDesc')}
                  </div>
                </div>
                <Tag color="red">~2-5 {t('pdf.minutes')}</Tag>
              </Button>

              <Button
                block
                size="large"
                type="primary"
                onClick={() => {
                  handleGeneratePdf('normal')
                  setIsModalOpen(false)
                }}
                className="text-left flex items-center justify-between"
              >
                <div>
                  <div className="font-medium">{t('pdf.priorityNormal')}</div>
                  <div className="text-sm text-gray-200">
                    {t('pdf.priorityNormalDesc')}
                  </div>
                </div>
                <Tag color="blue">~5-10 {t('pdf.minutes')}</Tag>
              </Button>

              <Button
                block
                size="large"
                onClick={() => {
                  handleGeneratePdf('low')
                  setIsModalOpen(false)
                }}
                className="text-left flex items-center justify-between"
              >
                <div>
                  <div className="font-medium">{t('pdf.priorityLow')}</div>
                  <div className="text-sm text-gray-500">
                    {t('pdf.priorityLowDesc')}
                  </div>
                </div>
                <Tag color="green">~10-30 {t('pdf.minutes')}</Tag>
              </Button>
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button block onClick={() => setIsModalOpen(false)}>
              {t('actions.cancel')}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
