'use client'

import { useState } from 'react'
import {
  Drawer,
  Form,
  Input,
  Select,
  DatePicker,
  Switch,
  Button,
  Space,
  message,
  Divider,
  Alert,
} from 'antd'
import { X, Save, User, Mail, Phone, Calendar, Shield, Globe } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { omitBy, isUndefined } from 'lodash-es'

import { createAdminUser } from '@/lib/api/orval-client'
import type { CreateAdminUserBody } from '@/lib/api/orval-client'
import { UserRole, UserStatus } from '@merodami/pika-types'
import { getSupportedLanguages, getLanguageLabel } from '@/lib/config/languages'

interface AddUserDrawerProps {
  open: boolean
  onClose: () => void
  locale: string
}

export default function AddUserDrawer({ open, onClose, locale }: AddUserDrawerProps) {
  const t = useTranslations()
  const [form] = Form.useForm()
  const queryClient = useQueryClient()
  const [autoGeneratePassword, setAutoGeneratePassword] = useState(true)

  const createUserMutation = useMutation({
    mutationFn: (data: CreateAdminUserBody) => createAdminUser(data),
    onSuccess: () => {
      message.success(t('common.message.changesSaved'))
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
      form.resetFields()
      onClose()
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || t('common.message.errorOccurred')
      message.error(errorMessage)
    },
  })

  const handleSubmit = async (values: any) => {
    try {
      const userData: CreateAdminUserBody = omitBy(
        {
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: values.phoneNumber || undefined,
          dateOfBirth: values.dateOfBirth
            ? dayjs(values.dateOfBirth).format('YYYY-MM-DD')
            : undefined,
          password: !autoGeneratePassword ? values.password : undefined,
          role: values.role || UserRole.BUSINESS,
          status: values.status || UserStatus.ACTIVE,
          emailVerified: values.emailVerified || false,
          phoneVerified: values.phoneVerified || false,
          preferredLanguage: values.preferredLanguage || locale.substring(0, 2),
        },
        isUndefined
      )

      await createUserMutation.mutateAsync(userData)
    } catch (error) {
      console.error('Failed to create user:', error)
    }
  }

  const handleClose = () => {
    form.resetFields()
    setAutoGeneratePassword(true)
    onClose()
  }

  return (
    <Drawer
      title={
        <div className="flex items-center gap-2">
          <User className="w-5 h-5" />
          <span>{t('common.button.add')} {t('navigation.users')}</span>
        </div>
      }
      placement="right"
      onClose={handleClose}
      open={open}
      width={520}
      closeIcon={<X className="w-4 h-4" />}
      footer={
        <div className="flex justify-end gap-2">
          <Button onClick={handleClose}>
            {t('common.button.cancel')}
          </Button>
          <Button
            type="primary"
            icon={<Save className="w-4 h-4" />}
            onClick={() => form.submit()}
            loading={createUserMutation.isPending}
          >
            {t('common.button.save')}
          </Button>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          role: UserRole.BUSINESS,
          status: UserStatus.ACTIVE,
          emailVerified: false,
          phoneVerified: false,
          preferredLanguage: locale.substring(0, 2),
        }}
      >
        <div className="space-y-4">
          <div className="text-sm font-medium text-gray-700 mb-2">
            {t('profile.personalInfo.title')}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="firstName"
              label={t('profile.personalInfo.firstName')}
              rules={[
                { required: true, message: t('validation.required') },
                { max: 50, message: t('validation.maxLength', { max: 50 }) },
              ]}
            >
              <Input
                prefix={<User className="w-4 h-4 text-gray-400" />}
                placeholder={t('profile.personalInfo.firstName')}
              />
            </Form.Item>

            <Form.Item
              name="lastName"
              label={t('profile.personalInfo.lastName')}
              rules={[
                { required: true, message: t('validation.required') },
                { max: 50, message: t('validation.maxLength', { max: 50 }) },
              ]}
            >
              <Input placeholder={t('profile.personalInfo.lastName')} />
            </Form.Item>
          </div>

          <Form.Item
            name="email"
            label={t('profile.contactInfo.email')}
            rules={[
              { required: true, message: t('validation.required') },
              { type: 'email', message: t('validation.email') },
            ]}
          >
            <Input
              prefix={<Mail className="w-4 h-4 text-gray-400" />}
              placeholder="user@example.com"
            />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label={t('profile.contactInfo.phone')}
            rules={[
              {
                pattern: /^\+[1-9]\d{1,14}$/,
                message: t('validation.phoneFormat'),
              },
            ]}
          >
            <Input
              prefix={<Phone className="w-4 h-4 text-gray-400" />}
              placeholder="+1234567890"
            />
          </Form.Item>

          <Form.Item
            name="dateOfBirth"
            label={t('profile.personalInfo.dateOfBirth')}
          >
            <DatePicker
              className="w-full"
              format="YYYY-MM-DD"
              disabledDate={(current) =>
                current && current > dayjs().subtract(18, 'year')
              }
              placeholder={t('profile.personalInfo.dateOfBirth')}
              suffixIcon={<Calendar className="w-4 h-4 text-gray-400" />}
            />
          </Form.Item>

          <Divider />

          <div className="text-sm font-medium text-gray-700 mb-2">
            {t('profile.security.title')}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="role"
              label={t('profile.security.role')}
              rules={[{ required: true, message: t('validation.required') }]}
            >
              <Select
                placeholder={t('common.button.select')}
                suffixIcon={<Shield className="w-4 h-4 text-gray-400" />}
              >
                <Select.Option value={UserRole.ADMIN}>
                  {t('profile.role.admin')}
                </Select.Option>
                <Select.Option value={UserRole.BUSINESS}>
                  {t('profile.role.business')}
                </Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="status"
              label={t('businesses.fields.status')}
              rules={[{ required: true, message: t('validation.required') }]}
            >
              <Select placeholder={t('common.button.select')}>
                <Select.Option value={UserStatus.ACTIVE}>
                  {t('profile.status.active')}
                </Select.Option>
                <Select.Option value={UserStatus.UNCONFIRMED}>
                  {t('profile.status.unconfirmed')}
                </Select.Option>
                <Select.Option value={UserStatus.SUSPENDED}>
                  {t('profile.status.suspended')}
                </Select.Option>
              </Select>
            </Form.Item>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">{t('profile.security.emailVerified')}</span>
              <Form.Item name="emailVerified" valuePropName="checked" className="mb-0">
                <Switch />
              </Form.Item>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">{t('profile.security.phoneVerified')}</span>
              <Form.Item name="phoneVerified" valuePropName="checked" className="mb-0">
                <Switch />
              </Form.Item>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Auto-generate password</span>
              <Switch
                checked={autoGeneratePassword}
                onChange={setAutoGeneratePassword}
              />
            </div>
          </div>

          {!autoGeneratePassword && (
            <Form.Item
              name="password"
              label={t('profile.security.password')}
              rules={[
                { required: true, message: t('validation.required') },
                { min: 8, message: t('validation.minLength', { min: 8 }) },
                { max: 128, message: t('validation.maxLength', { max: 128 }) },
              ]}
            >
              <Input.Password placeholder={t('profile.security.password')} />
            </Form.Item>
          )}

          {autoGeneratePassword && (
            <Alert
              message="Password will be auto-generated"
              description="The user will receive an email to set their password on first login."
              type="info"
              showIcon
              className="mt-2"
            />
          )}

          <Divider />

          <div className="text-sm font-medium text-gray-700 mb-2">
            {t('profile.preferences.title')}
          </div>

          <Form.Item
            name="preferredLanguage"
            label={t('profile.preferences.language')}
          >
            <Select
              placeholder={t('common.button.select')}
              suffixIcon={<Globe className="w-4 h-4 text-gray-400" />}
            >
              {getSupportedLanguages().map((langCode) => (
                <Select.Option key={langCode} value={langCode}>
                  {getLanguageLabel(langCode, t)}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </Form>
    </Drawer>
  )
}