'use client'

import { useState, useTransition } from 'react'
import { Card, Form, Input, Button, DatePicker, Select, message } from 'antd'
import { Save, ArrowLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import { omitBy, isUndefined } from 'lodash-es'

import { updateProfile } from '@/app/actions/user'
import type {
  GetUserProfile200,
  UpdateUserProfileBody,
} from '@/lib/api/orval-client'

const { Option } = Select

interface EditProfileFormProps {
  locale: string
  initialData: GetUserProfile200
}

export default function EditProfileForm({
  locale,
  initialData,
}: EditProfileFormProps) {
  const router = useRouter()
  const t = useTranslations('profile')
  const tCommon = useTranslations('common')
  const [form] = Form.useForm()
  const [isPending, startTransition] = useTransition()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Set initial form values
  const initialValues = {
    firstName: initialData.firstName,
    lastName: initialData.lastName,
    phoneNumber: initialData.phoneNumber || '',
    dateOfBirth: initialData.dateOfBirth
      ? dayjs(initialData.dateOfBirth)
      : null,
    preferredLanguage: initialData.preferredLanguage || 'en',
  }

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true)

    try {
      // Prepare data for API
      const updateData: UpdateUserProfileBody = omitBy(
        {
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: values.phoneNumber || undefined,
          dateOfBirth: values.dateOfBirth
            ? dayjs(values.dateOfBirth).format('YYYY-MM-DD')
            : undefined,
          preferredLanguage: values.preferredLanguage,
        },
        isUndefined
      )

      const result = await updateProfile(updateData)

      if (result.success) {
        message.success(tCommon('message.changesSaved'))
        startTransition(() => {
          router.push(`/${locale}/profile`)
          router.refresh()
        })
      } else {
        message.error(result.error || tCommon('message.errorOccurred'))
      }
    } catch (error) {
      console.error('Failed to update profile:', error)
      message.error(tCommon('message.errorOccurred'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    router.push(`/${locale}/profile`)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Button
          icon={<ArrowLeft className="w-4 h-4" />}
          onClick={handleCancel}
          disabled={isPending || isSubmitting}
        >
          {tCommon('button.back')}
        </Button>
        <h1 className="text-3xl font-bold">{t('editProfile')}</h1>
      </div>

      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={initialValues}
          disabled={isPending || isSubmitting}
        >
          {/* Personal Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">
              {t('personalInfo.title')}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="firstName"
                label={t('personalInfo.firstName')}
                rules={[
                  { required: true, message: tCommon('message.required') },
                  { max: 50, message: 'Maximum 50 characters' },
                ]}
              >
                <Input placeholder={t('personalInfo.firstName')} />
              </Form.Item>

              <Form.Item
                name="lastName"
                label={t('personalInfo.lastName')}
                rules={[
                  { required: true, message: tCommon('message.required') },
                  { max: 50, message: 'Maximum 50 characters' },
                ]}
              >
                <Input placeholder={t('personalInfo.lastName')} />
              </Form.Item>

              <Form.Item
                name="dateOfBirth"
                label={t('personalInfo.dateOfBirth')}
              >
                <DatePicker
                  className="w-full"
                  format="YYYY-MM-DD"
                  disabledDate={(current) =>
                    current && current > dayjs().endOf('day')
                  }
                />
              </Form.Item>

              <Form.Item
                name="preferredLanguage"
                label={t('personalInfo.preferredLanguage')}
              >
                <Select>
                  <Option value="en">{t('languages.en')}</Option>
                  <Option value="es">{t('languages.es')}</Option>
                  <Option value="gn">{t('languages.gn')}</Option>
                </Select>
              </Form.Item>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">
              {t('contactInfo.title')}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item label={t('contactInfo.email')}>
                <Input value={initialData.email} disabled />
                <span className="text-xs text-gray-500 mt-1">
                  Email cannot be changed from this form
                </span>
              </Form.Item>

              <Form.Item
                name="phoneNumber"
                label={t('contactInfo.phone')}
                rules={[
                  {
                    pattern: /^\+[1-9]\d{1,14}$/,
                    message:
                      'Please enter a valid phone number in E.164 format (e.g., +1234567890)',
                  },
                ]}
              >
                <Input placeholder="+1234567890" />
              </Form.Item>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4">
            <Button onClick={handleCancel} disabled={isPending || isSubmitting}>
              {tCommon('button.cancel')}
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isPending || isSubmitting}
              icon={<Save className="w-4 h-4" />}
            >
              {tCommon('button.save')}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  )
}
