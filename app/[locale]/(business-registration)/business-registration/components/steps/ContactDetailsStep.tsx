'use client'

import { useEffect } from 'react'
import { Form, Input, Select, Button, message } from 'antd'
import { MapPin, Phone, Mail, Globe } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { businessPublic } from '@merodami/pika-api'
import type { z } from 'zod'
import { useRegistrationStore } from '../../store/registrationStore'
import { debounce } from 'lodash'

interface ContactDetailsStepProps {
  onComplete: () => void
}

type BusinessRegistrationStep2Data = z.infer<
  typeof businessPublic.BusinessRegistrationStep2RequestSchema
>

const COUNTRIES = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'MX', label: 'Mexico' },
  { value: 'BR', label: 'Brazil' },
  { value: 'AR', label: 'Argentina' },
  { value: 'CL', label: 'Chile' },
  { value: 'CO', label: 'Colombia' },
  { value: 'PE', label: 'Peru' },
  { value: 'PY', label: 'Paraguay' },
  { value: 'UY', label: 'Uruguay' },
  { value: 'VE', label: 'Venezuela' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'FR', label: 'France' },
  { value: 'DE', label: 'Germany' },
  { value: 'ES', label: 'Spain' },
  { value: 'IT', label: 'Italy' },
  { value: 'PT', label: 'Portugal' },
]

export function ContactDetailsStep({ onComplete }: ContactDetailsStepProps) {
  const t = useTranslations('businessRegistration.steps.contactDetails')
  const tCommon = useTranslations('common')

  const { step2Data, saveStep2Data, markStepCompleted } = useRegistrationStore()

  const form = useForm<BusinessRegistrationStep2Data>({
    resolver: zodResolver(
      businessPublic.BusinessRegistrationStep2RequestSchema
    ),
    mode: 'onChange',
    defaultValues: step2Data || {
      description: '',
      address: {
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'US',
      },
      phone: '',
      email: '',
      website: '',
    },
  })

  // Auto-save progress
  const autoSave = debounce(async (data: any) => {
    try {
      saveStep2Data(data)
    } catch (error) {
      console.error('Auto-save failed:', error)
    }
  }, 1000)

  // Watch form changes for auto-save
  useEffect(() => {
    const subscription = form.watch((data) => {
      autoSave(data)
    })
    return () => subscription.unsubscribe()
  }, [form])

  const onSubmit = async (data: any) => {
    try {
      // Validate data
      const validated =
        businessPublic.BusinessRegistrationStep2RequestSchema.parse(data)

      // Save to store
      saveStep2Data(validated)
      markStepCompleted(2)

      // Data saved to store

      message.success(t('messages.stepCompleted', { step: 2 }))
      onComplete()
    } catch (error) {
      message.error('Please complete all required fields')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-green-100 rounded-lg">
          <MapPin className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t('title')}</h2>
          <p className="text-gray-500">{t('description')}</p>
        </div>
      </div>

      <Form
        layout="vertical"
        onFinish={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {/* Business Description */}
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Form.Item
              label={t('fields.description.label')}
              validateStatus={fieldState.error ? 'error' : ''}
              help={fieldState.error?.message}
              required
            >
              <Input.TextArea
                {...field}
                rows={4}
                placeholder={t('fields.description.placeholder')}
                maxLength={500}
                showCount
              />
              <div className="text-xs text-gray-500 mt-1">
                {t('fields.description.hint')}
              </div>
            </Form.Item>
          )}
        />

        {/* Address Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {t('fields.address.label')}
          </h3>

          <Controller
            name="address.street"
            control={form.control}
            render={({ field, fieldState }) => (
              <Form.Item
                label={t('fields.address.street.label')}
                validateStatus={fieldState.error ? 'error' : ''}
                help={fieldState.error?.message}
                required
              >
                <Input
                  {...field}
                  size="large"
                  placeholder={t('fields.address.street.placeholder')}
                  prefix={<MapPin className="w-4 h-4 text-gray-400" />}
                />
              </Form.Item>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="address.city"
              control={form.control}
              render={({ field, fieldState }) => (
                <Form.Item
                  label={t('fields.address.city.label')}
                  validateStatus={fieldState.error ? 'error' : ''}
                  help={fieldState.error?.message}
                  required
                >
                  <Input
                    {...field}
                    size="large"
                    placeholder={t('fields.address.city.placeholder')}
                  />
                </Form.Item>
              )}
            />

            <Controller
              name="address.state"
              control={form.control}
              render={({ field, fieldState }) => (
                <Form.Item
                  label={t('fields.address.state.label')}
                  validateStatus={fieldState.error ? 'error' : ''}
                  help={fieldState.error?.message}
                  required
                >
                  <Input
                    {...field}
                    size="large"
                    placeholder={t('fields.address.state.placeholder')}
                  />
                </Form.Item>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="address.postalCode"
              control={form.control}
              render={({ field, fieldState }) => (
                <Form.Item
                  label={t('fields.address.postalCode.label')}
                  validateStatus={fieldState.error ? 'error' : ''}
                  help={fieldState.error?.message}
                  required
                >
                  <Input
                    {...field}
                    size="large"
                    placeholder={t('fields.address.postalCode.placeholder')}
                  />
                </Form.Item>
              )}
            />

            <Controller
              name="address.country"
              control={form.control}
              render={({ field, fieldState }) => (
                <Form.Item
                  label={t('fields.address.country.label')}
                  validateStatus={fieldState.error ? 'error' : ''}
                  help={fieldState.error?.message}
                  required
                >
                  <Select
                    {...field}
                    size="large"
                    placeholder={t('fields.address.country.placeholder')}
                    options={COUNTRIES}
                    showSearch
                    filterOption={(input, option) =>
                      (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  />
                </Form.Item>
              )}
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Contact Information
          </h3>

          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Form.Item
                label={t('fields.phone.label')}
                validateStatus={fieldState.error ? 'error' : ''}
                help={fieldState.error?.message}
                required
              >
                <Input
                  {...field}
                  size="large"
                  placeholder={t('fields.phone.placeholder')}
                  prefix={<Phone className="w-4 h-4 text-gray-400" />}
                />
                <div className="text-xs text-gray-500 mt-1">
                  {t('fields.phone.hint')}
                </div>
              </Form.Item>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Form.Item
                label={t('fields.email.label')}
                validateStatus={fieldState.error ? 'error' : ''}
                help={fieldState.error?.message}
              >
                <Input
                  {...field}
                  size="large"
                  type="email"
                  placeholder={t('fields.email.placeholder')}
                  prefix={<Mail className="w-4 h-4 text-gray-400" />}
                />
                <div className="text-xs text-gray-500 mt-1">
                  {t('fields.email.hint')}
                </div>
              </Form.Item>
            )}
          />

          <Controller
            name="website"
            control={form.control}
            render={({ field, fieldState }) => (
              <Form.Item
                label={t('fields.website.label')}
                validateStatus={fieldState.error ? 'error' : ''}
                help={fieldState.error?.message}
              >
                <Input
                  {...field}
                  size="large"
                  placeholder={t('fields.website.placeholder')}
                  prefix={<Globe className="w-4 h-4 text-gray-400" />}
                />
                <div className="text-xs text-gray-500 mt-1">
                  {t('fields.website.hint')}
                </div>
              </Form.Item>
            )}
          />
        </div>

        <div className="pt-4">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full"
            loading={form.formState.isSubmitting}
          >
            {tCommon('button.next')}
          </Button>
        </div>
      </Form>
    </div>
  )
}
