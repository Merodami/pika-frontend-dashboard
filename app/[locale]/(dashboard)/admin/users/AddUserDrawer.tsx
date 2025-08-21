'use client'

import {
  Drawer,
  Form,
  Input,
  Select,
  DatePicker,
  Switch,
  Button,
  Alert,
  Divider,
  message,
} from 'antd'
import { X, Save, User, Mail, Phone, Globe, Lock, Calendar } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import dayjs from 'dayjs'

import { createAdminUser } from '@/lib/api/orval-client'
import { UserRole, UserStatus } from '@merodami/pika-types'
import { getSupportedLanguages, getLanguageLabel } from '@/lib/config/languages'
import { userAdmin } from '@merodami/pika-api'

// Use the backend schema directly from userAdmin - this is the single source of truth
const { AdminCreateUserRequest } = userAdmin

// Extend the backend schema with UI-only fields for form handling
const CreateUserFormSchema = AdminCreateUserRequest.extend({
  // UI-specific field for password handling
  autoGeneratePassword: z.boolean().default(true),
  confirmPassword: z.string().optional(),
}).refine(
  (data) => {
    // If not auto-generating, password is required
    if (!data.autoGeneratePassword && !data.password) {
      return false
    }
    // If password is provided, confirm password must match
    if (data.password && data.password !== data.confirmPassword) {
      return false
    }
    return true
  },
  {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  }
)

type CreateUserFormData = z.infer<typeof CreateUserFormSchema>

interface AddUserDrawerProps {
  open: boolean
  onClose: () => void
  locale: string
}

export default function AddUserDrawer({
  open,
  onClose,
  locale,
}: AddUserDrawerProps) {
  const t = useTranslations()
  const queryClient = useQueryClient()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(CreateUserFormSchema),
    defaultValues: {
      // Required fields
      email: '',
      firstName: '',
      lastName: '',
      // Optional fields from schema
      phoneNumber: '',
      dateOfBirth: undefined,
      password: undefined,
      // Admin-settable fields with defaults
      role: UserRole.BUSINESS,
      status: UserStatus.ACTIVE,
      emailVerified: false,
      phoneVerified: false,
      preferredLanguage: locale.substring(0, 2),
      // UI-only fields
      autoGeneratePassword: true,
      confirmPassword: '',
    },
  })

  const watchAutoGenerate = watch('autoGeneratePassword')

  const createUserMutation = useMutation({
    mutationFn: async (data: CreateUserFormData) => {
      // Build the request data conforming to AdminCreateUserRequest schema
      const requestData: z.infer<typeof AdminCreateUserRequest> = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber || undefined,
        dateOfBirth: data.dateOfBirth || undefined,
        password: !data.autoGeneratePassword ? data.password : undefined,
        role: data.role || UserRole.BUSINESS,
        status: data.status || UserStatus.ACTIVE,
        emailVerified: data.emailVerified,
        phoneVerified: data.phoneVerified,
        preferredLanguage: data.preferredLanguage,
      }

      // Remove undefined values to avoid sending empty fields
      const cleanedData = Object.fromEntries(
        Object.entries(requestData).filter(
          ([_, v]) => v !== undefined && v !== ''
        )
      )

      return createAdminUser(cleanedData as any)
    },
    onSuccess: () => {
      message.success(t('common.message.changesSaved'))
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
      handleClose()
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || t('common.message.errorOccurred')
      message.error(errorMessage)
    },
  })

  const onSubmit = async (data: CreateUserFormData) => {
    await createUserMutation.mutateAsync(data)
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Drawer
      title={
        <div className="flex items-center gap-2">
          <User className="w-5 h-5" />
          <span>
            {t('common.button.create')} {t('navigation.users')}
          </span>
        </div>
      }
      placement="right"
      onClose={handleClose}
      open={open}
      width={520}
      closeIcon={<X className="w-4 h-4" />}
      footer={
        <div className="flex justify-end gap-2">
          <Button onClick={handleClose} disabled={isSubmitting}>
            {t('common.button.cancel')}
          </Button>
          <Button
            type="primary"
            icon={<Save className="w-4 h-4" />}
            onClick={handleSubmit(onSubmit)}
            loading={isSubmitting}
          >
            {t('common.button.save')}
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="text-sm font-medium text-gray-700 mb-2">
          {t('profile.personalInfo.title')}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label={t('profile.personalInfo.firstName')}
            validateStatus={errors.firstName ? 'error' : ''}
            help={errors.firstName?.message}
          >
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  prefix={<User className="w-4 h-4 text-gray-400" />}
                  placeholder={t('profile.personalInfo.firstName')}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label={t('profile.personalInfo.lastName')}
            validateStatus={errors.lastName ? 'error' : ''}
            help={errors.lastName?.message}
          >
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={t('profile.personalInfo.lastName')}
                />
              )}
            />
          </Form.Item>
        </div>

        <Form.Item
          label={t('profile.contactInfo.email')}
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                prefix={<Mail className="w-4 h-4 text-gray-400" />}
                placeholder="user@example.com"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label={t('profile.contactInfo.phone')}
          validateStatus={errors.phoneNumber ? 'error' : ''}
          help={errors.phoneNumber?.message}
        >
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                prefix={<Phone className="w-4 h-4 text-gray-400" />}
                placeholder="+1234567890"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label={t('profile.personalInfo.dateOfBirth')}
          validateStatus={errors.dateOfBirth ? 'error' : ''}
          help={errors.dateOfBirth?.message}
        >
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => field.onChange(date?.toISOString())}
                className="w-full"
                format="YYYY-MM-DD"
                disabledDate={(current) =>
                  current && current > dayjs().endOf('day')
                }
                placeholder={t('profile.personalInfo.dateOfBirth')}
                suffixIcon={<Calendar className="w-4 h-4 text-gray-400" />}
              />
            )}
          />
        </Form.Item>

        <Divider />

        <div className="text-sm font-medium text-gray-700 mb-2">
          {t('profile.security.title')}
        </div>

        <Alert
          message="User will be created as Business User with Active status"
          description="The user will automatically be assigned the Business role and Active status as per the business registration flow."
          type="info"
          showIcon
          className="mb-4"
        />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">
              {t('profile.security.emailVerified')}
            </span>
            <Controller
              name="emailVerified"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Switch checked={value} onChange={onChange} />
              )}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">
              {t('profile.security.phoneVerified')}
            </span>
            <Controller
              name="phoneVerified"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Switch checked={value} onChange={onChange} />
              )}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Auto-generate password</span>
            <Controller
              name="autoGeneratePassword"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Switch checked={value} onChange={onChange} />
              )}
            />
          </div>
        </div>

        {!watchAutoGenerate && (
          <>
            <Form.Item
              label={t('profile.security.password')}
              validateStatus={errors.password ? 'error' : ''}
              help={errors.password?.message}
            >
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    prefix={<Lock className="w-4 h-4 text-gray-400" />}
                    placeholder={t('profile.security.password')}
                  />
                )}
              />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              validateStatus={errors.confirmPassword ? 'error' : ''}
              help={errors.confirmPassword?.message}
            >
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    prefix={<Lock className="w-4 h-4 text-gray-400" />}
                    placeholder="Confirm password"
                  />
                )}
              />
            </Form.Item>
          </>
        )}

        {watchAutoGenerate && (
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
          label={t('profile.preferences.language')}
          validateStatus={errors.preferredLanguage ? 'error' : ''}
          help={errors.preferredLanguage?.message}
        >
          <Controller
            name="preferredLanguage"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder={t('common.button.select')}
                suffixIcon={<Globe className="w-4 h-4 text-gray-400" />}
              >
                {getSupportedLanguages().map((langCode) => (
                  <Select.Option key={langCode} value={langCode}>
                    {getLanguageLabel(langCode, t)}
                  </Select.Option>
                ))}
              </Select>
            )}
          />
        </Form.Item>
      </form>
    </Drawer>
  )
}
