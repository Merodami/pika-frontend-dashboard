'use client'

import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { zodResolver } from '@hookform/resolvers/zod'
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
import {
  LoginFormSchema,
  transformLoginToTokenRequest,
  type LoginFormData,
} from '@/lib/validations/auth'

// Extract input and output types for proper branded type handling
type LoginFormInput = z.input<typeof LoginFormSchema>
type LoginFormOutput = z.output<typeof LoginFormSchema>

export function LoginForm() {
  const t = useTranslations('auth.login')
  const tErrors = useTranslations('errors')
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
    resolver: zodResolver(LoginFormSchema),
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
      const tokenRequest = transformLoginToTokenRequest(data)
      const result = await login(tokenRequest)

      if (result?.error) {
        // Use error code for translation if available, otherwise use the error message
        const errorMessage = result.errorCode
          ? tErrors(result.errorCode as any)
          : result.error
        setError(errorMessage)
      } else if (result?.success) {
        // Check if user has access to the dashboard
        if (result.user?.role !== 'admin' && result.user?.role !== 'business') {
          setError(tErrors('accessDenied'))
          return
        }

        // Clear form draft on success
        clearFormDraft('login')

        // For business users, check if they need registration
        if (result.user?.role === 'business') {
          // First, hit the registration status endpoint to set cookies
          try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5500/api/v1'
            // The auth cookies should already be set from the login response
            // We need to pass the access token in the Authorization header
            const statusResponse = await fetch(`${apiUrl}/businesses/registration/status`, {
              method: 'GET',
              credentials: 'include',
              headers: {
                'Authorization': `Bearer ${result.accessToken}`,
                'Content-Type': 'application/json',
              },
            })
            
            if (statusResponse.ok) {
              const statusData = await statusResponse.json()
              
              // Redirect based on registration status
              const redirectPath = statusData.needsRegistration
                ? `/${router.locale}/business-selector`
                : `/${router.locale}/business`
              
              // Force page reload to ensure cookies are properly set and middleware runs
              window.location.href = redirectPath
            } else {
              // If status check fails, redirect to business dashboard anyway
              window.location.href = `/${router.locale}/business`
            }
          } catch {
            // If status check fails, redirect to business dashboard anyway
            window.location.href = `/${router.locale}/business`
          }
        } else {
          // Admin users go directly to admin dashboard
          const redirectPath = `/${router.locale}/admin`
          // Force page reload to ensure cookies are properly set and middleware runs
          window.location.href = redirectPath
        }
      }
    } catch {
      setError(tErrors('invalidCredentials'))
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
