'use client'

import { LockOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Form, Input, Alert } from 'antd'
import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useSearchParams } from 'next/navigation'
import { z } from 'zod'

import { LocalizedLink } from '@/components/ui/LocalizedLink'
import {
  ResetPasswordFormSchema,
  transformResetPasswordToAPI,
  type ResetPasswordFormData,
} from '@/lib/validations/auth'
import { resetPassword } from '@/lib/api/orval-generated/endpoints'

// Extract input and output types for proper branded type handling
type ResetPasswordFormInput = z.input<typeof ResetPasswordFormSchema>
type ResetPasswordFormOutput = z.output<typeof ResetPasswordFormSchema>

export function ResetPasswordForm() {
  const t = useTranslations('auth.register')
  const tLogin = useTranslations('auth.login')
  const tCommon = useTranslations('common')
  const tErrors = useTranslations('errors')
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const token = searchParams.get('token')

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormInput, unknown, ResetPasswordFormOutput>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      token: token || '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  useEffect(() => {
    if (!token) {
      setError(tErrors('invalidVerificationToken'))
    }
  }, [token, tErrors])

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      setError(tErrors('invalidVerificationToken'))
      return
    }

    setError(null)
    setIsLoading(true)

    try {
      const requestData = transformResetPasswordToAPI({
        ...data,
        token,
      })
      await resetPassword(requestData)
      setIsSuccess(true)
      // Removed automatic redirect
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
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <CheckCircleOutlined className="text-green-600 text-xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {tLogin('passwordResetSuccess')}
          </h2>
          <p className="text-gray-600 mb-6">
            {tLogin('passwordResetSuccessMessage')}
          </p>
          <LocalizedLink href="/login">
            <Button type="primary" size="large" block>
              {t('signIn')}
            </Button>
          </LocalizedLink>
        </div>
      </div>
    )
  }

  if (!token) {
    return (
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <Alert
          message={tErrors('invalidVerificationToken')}
          description={tErrors('verificationFailed')}
          type="error"
          showIcon
          className="mb-4"
        />
        <LocalizedLink href="/forgot-password">
          <Button type="primary" block>
            {tCommon('button.reset')}
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
          label={t('password')}
          validateStatus={errors.newPassword ? 'error' : ''}
          help={errors.newPassword?.message}
        >
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                size="large"
                prefix={<LockOutlined />}
                placeholder={t('password')}
                disabled={isLoading}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label={t('confirmPassword')}
          validateStatus={errors.confirmPassword ? 'error' : ''}
          help={errors.confirmPassword?.message}
        >
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                size="large"
                prefix={<LockOutlined />}
                placeholder={t('confirmPassword')}
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
            {tCommon('button.reset')}
          </Button>
        </Form.Item>

        <div className="text-center">
          <LocalizedLink href="/login">
            <Button type="link">{t('signIn')}</Button>
          </LocalizedLink>
        </div>
      </Form>
    </div>
  )
}