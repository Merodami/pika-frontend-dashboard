'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Card,
  Button,
  Space,
  notification,
  Spin,
  Alert,
  Form,
  Input,
  Select,
  InputNumber,
  DatePicker,
  Row,
  Col,
} from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import dayjs from 'dayjs'
import { Currency } from '@merodami/pika-types'
import {
  VoucherDiscountType,
  VoucherState,
  UserRole,
} from '@/lib/api/orval-client'

import { VoucherPreview } from './voucherPreview'
import { useVoucherMutations } from '@/hooks/api/vouchers/useVoucherMutations'
import { useVoucherQueries } from '@/hooks/api/vouchers/useVoucherQueries'
import type { VoucherDesign, UpdateVoucherFormData } from '@/types/voucher'
import type { Locale } from '@/i18n/config'

interface VoucherEditFormProps {
  voucherId: string
  userRole: UserRole
  locale: Locale
}

export function VoucherEditForm({
  voucherId,
  userRole,
  locale,
}: VoucherEditFormProps) {
  const router = useRouter()
  const t = useTranslations('vouchers')
  const tCommon = useTranslations('common')

  const { useVoucher } = useVoucherQueries()
  const { updateVoucher } = useVoucherMutations()

  const { data: voucher, isLoading, error } = useVoucher(voucherId, userRole)

  // Form with backend schema validation
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<UpdateVoucherFormData>({
    defaultValues: {
      discountType: VoucherDiscountType.percentage,
      currency: Currency.PYG,
    },
  })

  // Watch form values for preview
  const watchedValues = watch()

  // Load voucher data into form
  useEffect(() => {
    if (voucher) {
      reset({
        title: { es: voucher.title, en: voucher.title, gn: voucher.title },
        description: {
          es: voucher.description,
          en: voucher.description,
          gn: voucher.description,
        },
        termsAndConditions: {
          es: voucher.terms || '',
          en: voucher.terms || '',
          gn: voucher.terms || '',
        },
        discountType: voucher.discountType,
        discountValue: voucher.discountValue,
        currency: voucher.currency || Currency.PYG,
        validFrom: voucher.validFrom,
        expiresAt: voucher.expiresAt,
        maxRedemptions: voucher.maxRedemptions,
        maxRedemptionsPerUser: voucher.maxRedemptionsPerUser,
        imageUrl: voucher.imageUrl,
        metadata: voucher.metadata,
      })
    }
  }, [voucher, reset])

  const handleCancel = () => {
    const path =
      userRole === UserRole.admin
        ? `/${locale}/admin/vouchers/${voucherId}`
        : `/${locale}/business/vouchers/${voucherId}`
    router.push(path)
  }

  const onSubmit = async (data: UpdateVoucherFormData) => {
    try {
      await updateVoucher.mutateAsync({ id: voucherId, data })

      notification.success({
        message: tCommon('status.success'),
        description: tCommon('message.changesSaved'),
      })

      // Navigate back to detail page
      const redirectPath =
        userRole === UserRole.admin
          ? `/${locale}/admin/vouchers/${voucherId}`
          : `/${locale}/business/vouchers/${voucherId}`

      router.push(redirectPath)
    } catch (error: any) {
      notification.error({
        message: tCommon('status.error'),
        description: error.message || t('error.updateFailed'),
      })
    }
  }

  // Convert form data to voucher design for preview
  const convertToVoucherDesign = (): VoucherDesign => {
    return {
      title: watchedValues.title?.es || watchedValues.title?.en || '',
      description:
        watchedValues.description?.es || watchedValues.description?.en || '',
      category: voucher?.categoryId || '',
      discountType: voucher?.discountType || VoucherDiscountType.percentage,
      discountValue: watchedValues.discountValue || 0,
      originalPrice: 0,
      minimumPurchase: 0,
      validFrom: watchedValues.validFrom?.toString() || '',
      validUntil: watchedValues.expiresAt?.toString() || '',
      maxRedemptions: watchedValues.maxRedemptions || 100,
      maxRedemptionsPerUser: watchedValues.maxRedemptionsPerUser || 1,
      businessName: voucher?.businessId || '',
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
      terms: watchedValues.termsAndConditions?.es?.split(', ') || [],
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

  // Can only edit draft vouchers
  if (voucher.state !== VoucherState.draft) {
    return (
      <Alert
        message={t('error.cannotEdit')}
        description={t('error.onlyDraftEditable')}
        type="warning"
        showIcon
      />
    )
  }

  return (
    <div className="voucher-edit-form">
      <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card title={t('edit.title')}>
              <div className="space-y-6">
                {/* Category Selection - TODO: Uncomment when API supports categoryId in AdminUpdateVoucherRequest
                <Controller
                  name="categoryId"
                  control={control}
                  render={({ field }) => (
                    <Form.Item
                      label={t('fields.category')}
                      validateStatus={errors.categoryId ? 'error' : ''}
                      help={errors.categoryId?.message}
                    >
                      <Select {...field} placeholder={t('selectCategory')}>
                        CategorySelector options would be rendered here
                      </Select>
                    </Form.Item>
                  )}
                />
                */}

                {/* Multi-language Titles */}
                <div>
                  <h4>{t('fields.title')}</h4>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Controller
                        name="title.es"
                        control={control}
                        render={({ field }) => (
                          <Form.Item
                            label="Español"
                            validateStatus={errors.title?.es ? 'error' : ''}
                            help={errors.title?.es?.message}
                          >
                            <Input {...field} placeholder="Título en español" />
                          </Form.Item>
                        )}
                      />
                    </Col>
                    <Col span={8}>
                      <Controller
                        name="title.en"
                        control={control}
                        render={({ field }) => (
                          <Form.Item label="English">
                            <Input {...field} placeholder="Title in English" />
                          </Form.Item>
                        )}
                      />
                    </Col>
                    <Col span={8}>
                      <Controller
                        name="title.gn"
                        control={control}
                        render={({ field }) => (
                          <Form.Item label="Guaraní">
                            <Input {...field} placeholder="Teýi guaraníme" />
                          </Form.Item>
                        )}
                      />
                    </Col>
                  </Row>
                </div>

                {/* Multi-language Descriptions */}
                <div>
                  <h4>{t('fields.description')}</h4>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Controller
                        name="description.es"
                        control={control}
                        render={({ field }) => (
                          <Form.Item
                            label="Español"
                            validateStatus={
                              errors.description?.es ? 'error' : ''
                            }
                            help={errors.description?.es?.message}
                          >
                            <Input.TextArea
                              {...field}
                              rows={3}
                              placeholder="Descripción en español"
                            />
                          </Form.Item>
                        )}
                      />
                    </Col>
                    <Col span={8}>
                      <Controller
                        name="description.en"
                        control={control}
                        render={({ field }) => (
                          <Form.Item label="English">
                            <Input.TextArea
                              {...field}
                              rows={3}
                              placeholder="Description in English"
                            />
                          </Form.Item>
                        )}
                      />
                    </Col>
                    <Col span={8}>
                      <Controller
                        name="description.gn"
                        control={control}
                        render={({ field }) => (
                          <Form.Item label="Guaraní">
                            <Input.TextArea
                              {...field}
                              rows={3}
                              placeholder="Ñemombe'u guaraníme"
                            />
                          </Form.Item>
                        )}
                      />
                    </Col>
                  </Row>
                </div>

                {/* Discount Configuration */}
                <Row gutter={16}>
                  <Col span={12}>
                    <Controller
                      name="discountType"
                      control={control}
                      render={({ field }) => (
                        <Form.Item
                          label={t('fields.discountType')}
                          validateStatus={errors.discountType ? 'error' : ''}
                          help={errors.discountType?.message}
                        >
                          <Select {...field}>
                            <Select.Option
                              value={VoucherDiscountType.percentage}
                            >
                              {t('discountType.percentage')}
                            </Select.Option>
                            <Select.Option value={VoucherDiscountType.fixed}>
                              {t('discountType.fixed')}
                            </Select.Option>
                          </Select>
                        </Form.Item>
                      )}
                    />
                  </Col>
                  <Col span={12}>
                    <Controller
                      name="discountValue"
                      control={control}
                      render={({ field }) => (
                        <Form.Item
                          label={t('fields.discountValue')}
                          validateStatus={errors.discountValue ? 'error' : ''}
                          help={errors.discountValue?.message}
                        >
                          <InputNumber
                            {...field}
                            style={{ width: '100%' }}
                            min={
                              watchedValues.discountType ===
                              VoucherDiscountType.percentage
                                ? 1
                                : 100
                            }
                            max={
                              watchedValues.discountType ===
                              VoucherDiscountType.percentage
                                ? 100
                                : undefined
                            }
                            addonAfter={
                              watchedValues.discountType ===
                              VoucherDiscountType.percentage
                                ? '%'
                                : 'Gs.'
                            }
                          />
                        </Form.Item>
                      )}
                    />
                  </Col>
                </Row>

                {/* Validity Period */}
                <Row gutter={16}>
                  <Col span={12}>
                    <Controller
                      name="validFrom"
                      control={control}
                      render={({ field }) => (
                        <Form.Item
                          label={t('fields.validFrom')}
                          validateStatus={errors.validFrom ? 'error' : ''}
                          help={errors.validFrom?.message}
                        >
                          <DatePicker
                            {...field}
                            value={field.value ? dayjs(field.value) : null}
                            onChange={(date) => field.onChange(date?.toDate())}
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                      )}
                    />
                  </Col>
                  <Col span={12}>
                    <Controller
                      name="expiresAt"
                      control={control}
                      render={({ field }) => (
                        <Form.Item
                          label={t('fields.validUntil')}
                          validateStatus={errors.expiresAt ? 'error' : ''}
                          help={errors.expiresAt?.message}
                        >
                          <DatePicker
                            {...field}
                            value={field.value ? dayjs(field.value) : null}
                            onChange={(date) => field.onChange(date?.toDate())}
                            style={{ width: '100%' }}
                            disabledDate={(current) => {
                              if (!current || !watchedValues.validFrom)
                                return false
                              return current < dayjs(watchedValues.validFrom)
                            }}
                          />
                        </Form.Item>
                      )}
                    />
                  </Col>
                </Row>

                {/* Redemption Limits */}
                <Row gutter={16}>
                  <Col span={12}>
                    <Controller
                      name="maxRedemptions"
                      control={control}
                      render={({ field }) => (
                        <Form.Item
                          label={t('fields.maxRedemptions')}
                          validateStatus={errors.maxRedemptions ? 'error' : ''}
                          help={errors.maxRedemptions?.message}
                        >
                          <InputNumber
                            {...field}
                            style={{ width: '100%' }}
                            min={1}
                            placeholder={t('unlimited')}
                          />
                        </Form.Item>
                      )}
                    />
                  </Col>
                  <Col span={12}>
                    <Controller
                      name="maxRedemptionsPerUser"
                      control={control}
                      render={({ field }) => (
                        <Form.Item
                          label={t('fields.maxRedemptionsPerUser')}
                          validateStatus={
                            errors.maxRedemptionsPerUser ? 'error' : ''
                          }
                          help={errors.maxRedemptionsPerUser?.message}
                        >
                          <InputNumber
                            {...field}
                            style={{ width: '100%' }}
                            min={1}
                            max={watchedValues.maxRedemptions || undefined}
                          />
                        </Form.Item>
                      )}
                    />
                  </Col>
                </Row>
              </div>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1">
            <Card title={t('preview.title')} className="sticky top-4">
              <VoucherPreview
                voucherDesign={convertToVoucherDesign()}
                showQRCode={false}
              />
            </Card>
          </div>
        </div>

        {/* Actions */}
        <Card className="mt-6">
          <div className="flex justify-end">
            <Space>
              <Button onClick={handleCancel}>{tCommon('button.cancel')}</Button>
              <Button type="primary" htmlType="submit" loading={isSubmitting}>
                {tCommon('button.save')}
              </Button>
            </Space>
          </div>
        </Card>
      </Form>
    </div>
  )
}
