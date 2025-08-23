'use client'

import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  Card,
  Row,
  Col,
  Space,
  message,
  Spin,
  Alert,
} from 'antd'
import { ArrowLeft, Save } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

import {
  VoucherBookType,
  mapApiVoucherBookToDomain,
} from '@/lib/api/mappers/voucherBook'
import { ImageUpload } from '@/components/ui/FileUpload/ImageUpload'
import {
  useVoucherBook,
  useUpdateVoucherBook,
} from '@/hooks/api/voucherBooks/useVoucherBooks'
import type { Locale } from '@/i18n/config'

// Validation schema for editing voucher books
const EditVoucherBookSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title too long'),
  edition: z.string().optional(),
  bookType: z.nativeEnum(VoucherBookType),
  month: z.number().min(1).max(12).optional(),
  year: z.number().min(2020).max(2100),
  totalPages: z.number().min(1).max(100),
  metadata: z
    .object({
      description: z.string().optional(),
      targetAudience: z.string().optional(),
      notes: z.string().optional(),
    })
    .optional(),
})

type EditVoucherBookFormData = z.infer<typeof EditVoucherBookSchema>

interface VoucherBookEditFormProps {
  bookId: string
  locale: Locale
}

export function VoucherBookEditForm({
  bookId,
  locale,
}: VoucherBookEditFormProps) {
  const t = useTranslations('voucherBooks')
  const tCommon = useTranslations('common')
  const router = useRouter()
  const [coverImageUrl, setCoverImageUrl] = useState<string | undefined>()
  const [backImageUrl, setBackImageUrl] = useState<string | undefined>()

  // API hooks
  const { data: apiBook, isLoading, error } = useVoucherBook(bookId)
  const updateBookMutation = useUpdateVoucherBook()

  // Convert API response to domain object
  const book = apiBook ? mapApiVoucherBookToDomain(apiBook) : null

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<EditVoucherBookFormData>({
    resolver: zodResolver(EditVoucherBookSchema),
  })

  const watchedBookType = watch('bookType')

  // Initialize form when book data loads
  useEffect(() => {
    if (book) {
      reset({
        title: book.title,
        edition: book.edition || '',
        bookType: book.bookType,
        month: book.month,
        year: book.year,
        totalPages: book.totalPages,
        metadata: {
          description: book.metadata?.description || '',
          targetAudience: book.metadata?.targetAudience || '',
          notes: book.metadata?.notes || '',
        },
      })
      setCoverImageUrl(book.coverImageUrl)
      setBackImageUrl(book.backImageUrl)
    }
  }, [book, reset])

  // Show month field only for monthly books
  const shouldShowMonth = watchedBookType === VoucherBookType.MONTHLY

  const handleCancel = () => {
    router.push(`/${locale}/admin/voucher-books/${bookId}`)
  }

  const handleCoverImageChange = (url?: string) => {
    setCoverImageUrl(url)
  }

  const handleBackImageChange = (url?: string) => {
    setBackImageUrl(url)
  }

  const onSubmit = async (data: EditVoucherBookFormData) => {
    try {
      const updateData = {
        ...data,
        month: shouldShowMonth ? data.month : undefined,
        coverImageUrl,
        backImageUrl,
        metadata:
          data.metadata &&
          Object.keys(data.metadata).some(
            (key) => data.metadata?.[key as keyof typeof data.metadata]
          )
            ? data.metadata
            : undefined,
      }

      await updateBookMutation.mutateAsync({
        id: bookId,
        data: updateData,
      })

      message.success(t('messages.updateSuccess'))
      router.push(`/${locale}/admin/voucher-books/${bookId}`)
    } catch (error) {
      console.error('Failed to update voucher book:', error)
      message.error(t('messages.updateError'))
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

  const bookTypeOptions = Object.values(VoucherBookType).map((type) => ({
    label: t(`bookType.${type}`),
    value: type,
  }))

  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    label: new Date(2024, i).toLocaleString('default', { month: 'long' }),
    value: i + 1,
  }))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              icon={<ArrowLeft className="w-4 h-4" />}
              onClick={handleCancel}
              type="text"
            >
              {tCommon('button.back')}
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {t('edit.title')}
              </h1>
              <p className="text-gray-500">
                {t('edit.subtitle', { title: book.title })}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            {/* Basic Information */}
            <Card title={t('sections.basicInfo')} className="shadow-sm">
              <Row gutter={[24, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label={t('fields.title')}
                    validateStatus={errors.title ? 'error' : ''}
                    help={errors.title?.message}
                    required
                  >
                    <Controller
                      name="title"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder={t('placeholders.title')}
                          size="large"
                        />
                      )}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label={t('fields.edition')}
                    validateStatus={errors.edition ? 'error' : ''}
                    help={errors.edition?.message}
                  >
                    <Controller
                      name="edition"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder={t('placeholders.edition')}
                          size="large"
                        />
                      )}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[24, 16]}>
                <Col xs={24} md={8}>
                  <Form.Item
                    label={t('fields.bookType')}
                    validateStatus={errors.bookType ? 'error' : ''}
                    help={errors.bookType?.message}
                    required
                  >
                    <Controller
                      name="bookType"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={bookTypeOptions}
                          placeholder={t('placeholders.bookType')}
                          size="large"
                        />
                      )}
                    />
                  </Form.Item>
                </Col>
                {shouldShowMonth && (
                  <Col xs={24} md={8}>
                    <Form.Item
                      label={t('fields.month')}
                      validateStatus={errors.month ? 'error' : ''}
                      help={errors.month?.message}
                    >
                      <Controller
                        name="month"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={monthOptions}
                            placeholder={t('placeholders.month')}
                            size="large"
                          />
                        )}
                      />
                    </Form.Item>
                  </Col>
                )}
                <Col xs={24} md={8}>
                  <Form.Item
                    label={t('fields.year')}
                    validateStatus={errors.year ? 'error' : ''}
                    help={errors.year?.message}
                    required
                  >
                    <Controller
                      name="year"
                      control={control}
                      render={({ field }) => (
                        <InputNumber
                          {...field}
                          min={2020}
                          max={2100}
                          placeholder={t('placeholders.year')}
                          size="large"
                          className="w-full"
                        />
                      )}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[24, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label={t('fields.totalPages')}
                    validateStatus={errors.totalPages ? 'error' : ''}
                    help={errors.totalPages?.message}
                    required
                  >
                    <Controller
                      name="totalPages"
                      control={control}
                      render={({ field }) => (
                        <InputNumber
                          {...field}
                          min={1}
                          max={100}
                          placeholder={t('placeholders.totalPages')}
                          size="large"
                          className="w-full"
                        />
                      )}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Images */}
            <Card title={t('sections.images')} className="shadow-sm">
              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <div className="space-y-2">
                    <ImageUpload
                      value={coverImageUrl}
                      onChange={handleCoverImageChange}
                      allowedFileTypes={['image/*']}
                      label={t('fields.coverImage')}
                    />
                  </div>
                </Col>
                <Col xs={24} md={12}>
                  <div className="space-y-2">
                    <ImageUpload
                      value={backImageUrl}
                      onChange={handleBackImageChange}
                      allowedFileTypes={['image/*']}
                      label={t('fields.backImage')}
                    />
                  </div>
                </Col>
              </Row>
            </Card>

            {/* Metadata */}
            <Card title={t('sections.metadata')} className="shadow-sm">
              <Row gutter={[24, 16]}>
                <Col xs={24}>
                  <Form.Item
                    label={t('fields.description')}
                    validateStatus={errors.metadata?.description ? 'error' : ''}
                    help={errors.metadata?.description?.message}
                  >
                    <Controller
                      name="metadata.description"
                      control={control}
                      render={({ field }) => (
                        <Input.TextArea
                          {...field}
                          placeholder={t('placeholders.description')}
                          rows={3}
                        />
                      )}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label={t('fields.targetAudience')}
                    validateStatus={
                      errors.metadata?.targetAudience ? 'error' : ''
                    }
                    help={errors.metadata?.targetAudience?.message}
                  >
                    <Controller
                      name="metadata.targetAudience"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder={t('placeholders.targetAudience')}
                        />
                      )}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label={t('fields.notes')}
                    validateStatus={errors.metadata?.notes ? 'error' : ''}
                    help={errors.metadata?.notes?.message}
                  >
                    <Controller
                      name="metadata.notes"
                      control={control}
                      render={({ field }) => (
                        <Input.TextArea
                          {...field}
                          placeholder={t('placeholders.notes')}
                          rows={2}
                        />
                      )}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end">
            <Space size="middle">
              <Button
                size="large"
                onClick={handleCancel}
                disabled={updateBookMutation.isPending}
              >
                {tCommon('button.cancel')}
              </Button>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={updateBookMutation.isPending}
                disabled={!isDirty}
                icon={<Save className="w-4 h-4" />}
              >
                {t('actions.saveChanges')}
              </Button>
            </Space>
          </div>
        </form>
      </div>
    </div>
  )
}
