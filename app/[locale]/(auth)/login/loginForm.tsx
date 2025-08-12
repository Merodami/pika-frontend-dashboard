'use client'

import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { authFrontend } from '@merodami/pika-api'
import { Button, Form, Input, Checkbox } from 'antd'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'

import { login } from '@/app/actions/auth'
import { useAppStore } from '@/store/app.store'
import { AuthFormWrapper } from '@/components/auth/authFormWrapper'
import { LocalizedLink } from '@/components/ui/LocalizedLink'
import { useLocalizedRouter } from '@/hooks/useLocalizedRouter'

// Use the admin/business login schema with enhanced password requirements
const loginSchema = authFrontend.AdminBusinessLoginFormSchema

// Extract input and output types for proper branded type handling
type LoginFormInput = z.input<typeof loginSchema>
type LoginFormOutput = z.output<typeof loginSchema>
type LoginFormData = LoginFormOutput

export function LoginForm() {
  const t = useTranslations('auth.login')
  const router = useLocalizedRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { formDrafts, saveFormDraft, clearFormDraft } = useAppStore()

  const isDevelopment = process.env.NODE_ENV === 'development'
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput, unknown, LoginFormOutput>({
    resolver: zodResolver(loginSchema),
    defaultValues: formDrafts['login'] || {
      email: isDevelopment ? 'admin@example.com' : '',
      password: isDevelopment ? 'AdminPassword123!' : '',
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    setError(null)
    setIsLoading(true)

    try {
      // Transform to backend format
      const tokenRequest = authFrontend.transformLoginToTokenRequest(data)
      const result = await login(tokenRequest)

      if (result?.error) {
        setError(result.error)
      } else if (result?.success) {
        // Clear form draft on success
        clearFormDraft('login')

        // Redirect based on user role
        const redirectPath = result.user?.role === 'admin' 
          ? `/${router.locale}/admin`
          : result.user?.role === 'business'
          ? `/${router.locale}/business`
          : `/${router.locale}/profile`

        // Force page reload to ensure cookies are properly set and middleware runs
        window.location.href = redirectPath
      }
    } catch {
      setError(t('error'))
    } finally {
      setIsLoading(false)
    }
  }

  // Save form draft on input change
  const handleInputChange = (
    field: keyof LoginFormData,
    value: string | boolean
  ) => {
    const currentData = (formDrafts['login'] as Record<string, any>) || {}
    saveFormDraft('login', { ...currentData, [field]: value })
  }

  return (
    <AuthFormWrapper
      error={error}
      onError={setError}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form.Item
        label={t('email')}
        validateStatus={errors.email ? 'error' : ''}
        help={errors.email?.message}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              prefix={<MailOutlined />}
              placeholder={t('email')}
              size="large"
              autoComplete="email"
              onChange={(e) => {
                field.onChange(e)
                handleInputChange('email', e.target.value)
              }}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label={t('password')}
        validateStatus={errors.password ? 'error' : ''}
        help={errors.password?.message}
      >
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input.Password
              {...field}
              prefix={<LockOutlined />}
              placeholder={t('password')}
              size="large"
              autoComplete="current-password"
              onChange={(e) => {
                field.onChange(e)
                handleInputChange('password', e.target.value)
              }}
            />
          )}
        />
      </Form.Item>

      <Form.Item>
        <div className="flex items-center justify-between">
          <Controller
            name="rememberMe"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Checkbox
                checked={value}
                onChange={(e) => {
                  onChange(e.target.checked)
                  handleInputChange('rememberMe', e.target.checked)
                }}
              >
                {t('rememberMe')}
              </Checkbox>
            )}
          />
          <LocalizedLink
            href="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            {t('forgotPassword')}
          </LocalizedLink>
        </div>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          size="large"
          className="w-full"
        >
          {t('button')}
        </Button>
      </Form.Item>

      <div className="text-center">
        <span className="text-gray-600">{t('noAccount')} </span>
        <LocalizedLink
          href="/register"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          {t('signUp')}
        </LocalizedLink>
      </div>
    </AuthFormWrapper>
  )
}
