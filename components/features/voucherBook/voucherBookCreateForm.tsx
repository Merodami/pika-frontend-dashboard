'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import {
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  Card,
  Row,
  Col,
  Upload,
  message,
  Space,
} from 'antd'
import { ArrowLeft, Save, Upload as UploadIcon } from 'lucide-react'
import type { UploadFile } from 'antd/es/upload'

import { useCreateVoucherBook } from '@/hooks/api/voucherBooks/useVoucherBooks'
import { VoucherBookType } from '@/lib/api/mappers/voucherBook'
import type { CreateAdminVoucherBookBody } from '@/lib/api/orval-client'
import type { Locale } from '@/i18n/config'

interface VoucherBookCreateFormProps {
  locale: Locale
}

export function VoucherBookCreateForm({ locale }: VoucherBookCreateFormProps) {
  const t = useTranslations('voucherBooks')
  const tCommon = useTranslations('common')
  const router = useRouter()
  const [form] = Form.useForm()
  const createVoucherBook = useCreateVoucherBook()

  const [coverFile, setCoverFile] = useState<UploadFile[]>([])
  const [backFile, setBackFile] = useState<UploadFile[]>([])

  const handleSubmit = async (values: any) => {
    try {
      const payload: CreateAdminVoucherBookBody = {
        title: values.title,
        bookType: values.bookType,
        year: values.year,
        edition: values.edition,
        month: values.month,
        totalPages: values.totalPages || 50,
        coverImageUrl: values.coverImageUrl,
        backImageUrl: values.backImageUrl,
        metadata: {
          description: values.description,
          targetAudience: values.targetAudience,
        },
      }

      await createVoucherBook.mutateAsync(payload)
      message.success(t('messages.createSuccess'))
      router.push(`/${locale}/admin/voucher-books`)
    } catch (error) {
      console.error('Failed to create voucher book:', error)
    }
  }

  const handleCancel = () => {
    router.push(`/${locale}/admin/voucher-books`)
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i)
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: t(`months.${i + 1}`),
  }))

  const uploadProps = {
    maxCount: 1,
    accept: 'image/*',
    beforeUpload: (file: File) => {
      const isImage = file.type.startsWith('image/')
      if (!isImage) {
        message.error(t('messages.onlyImages'))
      }
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        message.error(t('messages.imageSizeLimit'))
      }
      return false // Prevent auto upload
    },
  }

  return (
    <div className="voucher-book-create-form">
      <div className="mb-6">
        <Button
          icon={<ArrowLeft className="w-4 h-4" />}
          onClick={handleCancel}
          type="text"
        >
          {tCommon('button.back')}
        </Button>
      </div>

      <Card
        title={
          <div>
            <h2 className="text-xl font-semibold">{t('create.title')}</h2>
            <p className="text-sm text-gray-500 font-normal mt-1">
              {t('create.subtitle')}
            </p>
          </div>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            year: currentYear,
            bookType: VoucherBookType.MONTHLY,
            totalPages: 50,
          }}
        >
          <Row gutter={24}>
            {/* Basic Information */}
            <Col span={24}>
              <h3 className="text-lg font-medium mb-4">
                {t('create.sections.basicInfo')}
              </h3>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="title"
                label={t('fields.title')}
                rules={[
                  { required: true, message: t('validation.required') },
                  {
                    max: 255,
                    message: t('validation.maxLength', { max: 255 }),
                  },
                ]}
              >
                <Input placeholder={t('placeholders.title')} />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="edition"
                label={t('fields.edition')}
                rules={[
                  {
                    max: 100,
                    message: t('validation.maxLength', { max: 100 }),
                  },
                ]}
              >
                <Input placeholder={t('placeholders.edition')} />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item
                name="bookType"
                label={t('fields.type')}
                rules={[{ required: true, message: t('validation.required') }]}
              >
                <Select>
                  <Select.Option value={VoucherBookType.MONTHLY}>
                    {t('bookType.monthly')}
                  </Select.Option>
                  <Select.Option value={VoucherBookType.SPECIAL_EDITION}>
                    {t('bookType.specialEdition')}
                  </Select.Option>
                  <Select.Option value={VoucherBookType.REGIONAL}>
                    {t('bookType.regional')}
                  </Select.Option>
                  <Select.Option value={VoucherBookType.SEASONAL}>
                    {t('bookType.seasonal')}
                  </Select.Option>
                  <Select.Option value={VoucherBookType.PROMOTIONAL}>
                    {t('bookType.promotional')}
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item
                name="year"
                label={t('fields.year')}
                rules={[{ required: true, message: t('validation.required') }]}
              >
                <Select>
                  {years.map((year) => (
                    <Select.Option key={year} value={year}>
                      {year}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.bookType !== currentValues.bookType
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue('bookType') === VoucherBookType.MONTHLY ? (
                    <Form.Item
                      name="month"
                      label={t('fields.month')}
                      rules={[
                        { required: true, message: t('validation.required') },
                      ]}
                    >
                      <Select placeholder={t('placeholders.selectMonth')}>
                        {months.map((month) => (
                          <Select.Option key={month.value} value={month.value}>
                            {month.label}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  ) : null
                }
              </Form.Item>
            </Col>

            {/* Book Configuration */}
            <Col span={24}>
              <h3 className="text-lg font-medium mb-4 mt-6">
                {t('create.sections.configuration')}
              </h3>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item
                name="totalPages"
                label={t('fields.totalPages')}
                rules={[
                  {
                    type: 'number',
                    min: 1,
                    max: 100,
                    message: t('validation.pageRange'),
                  },
                ]}
              >
                <InputNumber
                  min={1}
                  max={100}
                  style={{ width: '100%' }}
                  placeholder={t('placeholders.totalPages')}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={16}>
              <Form.Item name="description" label={t('fields.description')}>
                <Input.TextArea
                  rows={3}
                  placeholder={t('placeholders.description')}
                />
              </Form.Item>
            </Col>

            {/* Images */}
            <Col span={24}>
              <h3 className="text-lg font-medium mb-4 mt-6">
                {t('create.sections.images')}
              </h3>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item name="coverImage" label={t('fields.coverImage')}>
                <Upload
                  {...uploadProps}
                  fileList={coverFile}
                  onChange={({ fileList }) => setCoverFile(fileList)}
                  listType="picture-card"
                >
                  {coverFile.length === 0 && (
                    <div>
                      <UploadIcon className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-xs">
                        {t('placeholders.uploadCover')}
                      </div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item name="backImage" label={t('fields.backImage')}>
                <Upload
                  {...uploadProps}
                  fileList={backFile}
                  onChange={({ fileList }) => setBackFile(fileList)}
                  listType="picture-card"
                >
                  {backFile.length === 0 && (
                    <div>
                      <UploadIcon className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-xs">
                        {t('placeholders.uploadBack')}
                      </div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            </Col>

            {/* Additional Information */}
            <Col span={24}>
              <h3 className="text-lg font-medium mb-4 mt-6">
                {t('create.sections.additional')}
              </h3>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="targetAudience"
                label={t('fields.targetAudience')}
              >
                <Input placeholder={t('placeholders.targetAudience')} />
              </Form.Item>
            </Col>
          </Row>

          {/* Form Actions */}
          <Row className="mt-8">
            <Col span={24}>
              <Space>
                <Button onClick={handleCancel}>
                  {tCommon('button.cancel')}
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={createVoucherBook.isPending}
                  icon={<Save className="w-4 h-4" />}
                >
                  {t('create.submitButton')}
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  )
}
