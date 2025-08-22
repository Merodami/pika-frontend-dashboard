'use client'

import { useEffect, useState } from 'react'
import { Form, Input, Select, Button, TimePicker, Card, message } from 'antd'
import { Clock, Globe, Info, Plus, X } from 'lucide-react'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { businessPublic } from '@merodami/pika-api'
import { useRegistrationStore } from '../../store/registrationStore'
import { useSubmitStep3 } from '@/hooks/api/businesses/useBusinessRegistration'
import { debounce } from 'lodash'
import dayjs from 'dayjs'

interface AdditionalInfoStepProps {
  onComplete: () => void
}

const SOCIAL_PLATFORMS = [
  {
    value: 'facebook',
    label: 'Facebook',
    placeholder: 'https://facebook.com/yourbusiness',
  },
  {
    value: 'instagram',
    label: 'Instagram',
    placeholder: 'https://instagram.com/yourbusiness',
  },
  {
    value: 'twitter',
    label: 'Twitter',
    placeholder: 'https://twitter.com/yourbusiness',
  },
  {
    value: 'linkedin',
    label: 'LinkedIn',
    placeholder: 'https://linkedin.com/company/yourbusiness',
  },
  {
    value: 'youtube',
    label: 'YouTube',
    placeholder: 'https://youtube.com/c/yourbusiness',
  },
  {
    value: 'tiktok',
    label: 'TikTok',
    placeholder: 'https://tiktok.com/@yourbusiness',
  },
]

const WEEKDAYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]

export function AdditionalInfoStep({ onComplete }: AdditionalInfoStepProps) {
  const t = useTranslations('businessRegistration.steps.additionalInfo')
  const tCommon = useTranslations('common')
  const tMessages = useTranslations('businessRegistration.messages')
  const [showOperatingHours, setShowOperatingHours] = useState(false)
  const [showSocialMedia, setShowSocialMedia] = useState(false)

  const { step3Data, saveStep3Data, markStepCompleted } = useRegistrationStore()
  const submitStep3Mutation = useSubmitStep3()

  const form = useForm({
    resolver: zodResolver(
      businessPublic.BusinessRegistrationStep3RequestSchema
    ),
    defaultValues: step3Data || {
      operatingHours: {},
      socialMedia: {},
      additionalInfo: {},
    },
  })

  const {
    fields: socialFields,
    append: appendSocial,
    remove: removeSocial,
  } = useFieldArray({
    control: form.control,
    name: 'socialMediaLinks' as any,
  })

  // Auto-save progress
  const autoSave = debounce(async (data: any) => {
    try {
      saveStep3Data(data)
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
        businessPublic.BusinessRegistrationStep3RequestSchema.parse(data)

      // Save to store first
      saveStep3Data(validated)

      // Submit to backend
      submitStep3Mutation.mutate(validated, {
        onSuccess: () => {
          // Only mark as completed after successful API call
          markStepCompleted(3)
          
          // Call onComplete first to ensure navigation happens
          onComplete()
          
          // Then show success message (if this fails, navigation still happened)
          try {
            message.success(tMessages('stepCompleted', { step: 3 }))
          } catch (e) {
            console.log('Message notification failed:', e)
          }
        },
        onError: (error) => {
          console.error('Failed to submit step 3:', error)
          // Handle 409 conflict (step already submitted)
          if (error?.response?.status === 409) {
            // Step already completed, just move forward
            markStepCompleted(3)
            onComplete()
          } else {
            message.error('Failed to save step 3. Please try again.')
          }
        },
      })
    } catch (error) {
      message.error('Please check your information')
    }
  }

  const handleAddSocialMedia = () => {
    appendSocial({ platform: '', url: '' })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-purple-100 rounded-lg">
          <Info className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t('title')}</h2>
          <p className="text-gray-500">{t('description')}</p>
        </div>
      </div>

      <Form
        layout="vertical"
        onFinish={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Operating Hours Section */}
        <Card
          title={
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>{t('fields.operatingHours.label')}</span>
            </div>
          }
          extra={
            <Button
              type="link"
              onClick={() => setShowOperatingHours(!showOperatingHours)}
            >
              {showOperatingHours
                ? 'Hide'
                : t('fields.operatingHours.addHours')}
            </Button>
          }
        >
          {showOperatingHours && (
            <div className="space-y-3">
              {WEEKDAYS.map((day) => (
                <div key={day} className="flex items-center space-x-4">
                  <div className="w-24 font-medium">
                    {t(`fields.operatingHours.days.${day}`)}
                  </div>
                  <Controller
                    name={`operatingHours.${day}.open` as any}
                    control={form.control}
                    render={({ field }) => (
                      <TimePicker
                        {...field}
                        format="HH:mm"
                        placeholder="Open"
                        value={field.value ? dayjs(field.value, 'HH:mm') : null}
                        onChange={(time) =>
                          field.onChange(time?.format('HH:mm'))
                        }
                      />
                    )}
                  />
                  <span>to</span>
                  <Controller
                    name={`operatingHours.${day}.close` as any}
                    control={form.control}
                    render={({ field }) => (
                      <TimePicker
                        {...field}
                        format="HH:mm"
                        placeholder="Close"
                        value={field.value ? dayjs(field.value, 'HH:mm') : null}
                        onChange={(time) =>
                          field.onChange(time?.format('HH:mm'))
                        }
                      />
                    )}
                  />
                  <Controller
                    name={`operatingHours.${day}.closed` as any}
                    control={form.control}
                    render={({ field }) => (
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          className="rounded"
                        />
                        <span>{t('fields.operatingHours.closed')}</span>
                      </label>
                    )}
                  />
                </div>
              ))}
              <div className="mt-4">
                <Controller
                  name="operatingHours.24hours"
                  control={form.control}
                  render={({ field }) => (
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="rounded"
                      />
                      <span>{t('fields.operatingHours.open24h')}</span>
                    </label>
                  )}
                />
              </div>
            </div>
          )}
        </Card>

        {/* Social Media Section */}
        <Card
          title={
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>{t('fields.socialMedia.label')}</span>
            </div>
          }
          extra={
            <Button
              type="link"
              onClick={() => setShowSocialMedia(!showSocialMedia)}
            >
              {showSocialMedia ? 'Hide' : t('fields.socialMedia.addLink')}
            </Button>
          }
        >
          {showSocialMedia && (
            <div className="space-y-4">
              {socialFields.map((field, index) => (
                <div key={field.id} className="flex items-start space-x-2">
                  <Controller
                    name={`socialMediaLinks.${index}.platform` as any}
                    control={form.control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        style={{ width: 150 }}
                        placeholder="Platform"
                        options={SOCIAL_PLATFORMS.map((p) => ({
                          value: p.value,
                          label: t(`fields.socialMedia.platforms.${p.value}`),
                        }))}
                      />
                    )}
                  />
                  <Controller
                    name={`socialMediaLinks.${index}.url` as any}
                    control={form.control}
                    render={({ field: urlField }) => {
                      const platform = form.watch(
                        `socialMediaLinks.${index}.platform` as any
                      )
                      const placeholder = SOCIAL_PLATFORMS.find(
                        (p) => p.value === platform
                      )?.placeholder

                      return (
                        <Input
                          {...urlField}
                          placeholder={placeholder || 'https://...'}
                          className="flex-1"
                        />
                      )
                    }}
                  />
                  <Button
                    type="text"
                    danger
                    icon={<X className="w-4 h-4" />}
                    onClick={() => removeSocial(index)}
                  />
                </div>
              ))}
              <Button
                type="dashed"
                icon={<Plus className="w-4 h-4" />}
                onClick={handleAddSocialMedia}
                className="w-full"
              >
                {t('fields.socialMedia.addLink')}
              </Button>
            </div>
          )}
        </Card>

        {/* Additional Information */}
        <Controller
          name="additionalInfo.notes"
          control={form.control}
          render={({ field }) => (
            <Form.Item label={t('fields.additionalInfo.label')}>
              <Input.TextArea
                {...field}
                rows={4}
                placeholder={t('fields.additionalInfo.placeholder')}
                maxLength={1000}
                showCount
              />
              <div className="text-xs text-gray-500 mt-1">
                {t('fields.additionalInfo.hint')}
              </div>
            </Form.Item>
          )}
        />

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
