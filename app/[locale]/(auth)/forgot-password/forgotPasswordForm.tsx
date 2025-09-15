'use client'

import { MailOutlined } from '@ant-design/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Form, Input, Alert } from 'antd'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'

import { LocalizedLink } from '@/components/ui/LocalizedLink'
import {
  ForgotPasswordFormSchema,
  type ForgotPasswordFormData,
} from '@/lib/validations/auth'
import { forgotPassword } from '@/lib/api/orval-generated/endpoints'

// Extract input and output types for proper branded type handling
type ForgotPasswordFormInput = z.input<typeof ForgotPasswordFormSchema>
type ForgotPasswordFormOutput = z.output<typeof ForgotPasswordFormSchema>

export function ForgotPasswordForm() {
  const t = useTranslations('auth.login')
  const tErrors = useTranslations('errors')
  const tMessages = useTranslations('messages')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInput, unknown, ForgotPasswordFormOutput>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setError(null)
    setIsLoading(true)

    try {
      await forgotPassword(data)
      setIsSuccess(true)
    } catch (error: any) {
      if (error?.response?.data?.message) {
        setError(error.response.data.message)
      } else {
        setError(tErrors('somethingWentWrong'))
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <Alert
          message={tMessages('passwordResetSent')}
          type="success"
          showIcon
          className="mb-6"
        />
        <LocalizedLink href="/login">
          <Button type="primary" size="large" block>
            {t('backToLogin')}
          </Button>
        </LocalizedLink>
      </div>
    )
  }

  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
        {error && (
          <Alert message={error} type="error" showIcon className="mb-4" />
        )}

        <Form.Item
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                size="large"
                prefix={<MailOutlined />}
                placeholder={t('email')}
                disabled={isLoading}
              />
            )}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={isLoading}
            block
          >
            {t('sendResetLink')}
          </Button>
        </Form.Item>

        <div className="text-center">
          <LocalizedLink href="/login">
            <Button type="link">{t('backToLogin')}</Button>
          </LocalizedLink>
        </div>
      </Form>
    </div>
  )
}