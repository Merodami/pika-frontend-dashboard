'use client'

import { useEffect } from 'react'
import { Form, Input, Select, Button, message } from 'antd'
import { Building2 } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { businessPublic } from '@merodami/pika-api'
import { useCategoryTree } from '@/hooks/api/categories/useCategories'
import { useSubmitStep1 } from '@/hooks/api/businesses/useBusinessRegistration'
import { useRegistrationStore } from '../../store/registrationStore'
import { debounce } from 'lodash'

interface BusinessInfoStepProps {
  onComplete: () => void
}

type CategoryTreeNode = {
  id: string
  name: string
  slug: string
  parentId: string | null
  children?: CategoryTreeNode[]
}

export function BusinessInfoStep({ onComplete }: BusinessInfoStepProps) {
  const t = useTranslations('businessRegistration.steps.businessInfo')

  // Use React Query hook for categories
  const {
    data: categoryData,
    isLoading: loadingCategories,
    error: categoryError,
  } = useCategoryTree()
  const categories = categoryData?.categories || []

  const { step1Data, saveStep1Data, markStepCompleted } = useRegistrationStore()

  // React Query mutation for submitting step 1
  const submitStep1Mutation = useSubmitStep1()

  const form = useForm({
    resolver: zodResolver(businessPublic.BusinessRegistrationStep1Request),
    defaultValues: step1Data || {
      businessName: '',
      businessType: undefined,
      categoryId: undefined,
      primaryLanguage: 'en',
    },
  })

  // Show error if categories fail to load
  useEffect(() => {
    if (categoryError) {
      message.error('Failed to load categories')
    }
  }, [categoryError])

  // Auto-save progress
  const autoSave = debounce((data: any) => {
    try {
      saveStep1Data(data)
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
        businessPublic.BusinessRegistrationStep1Request.parse(data)

      // Submit via React Query
      submitStep1Mutation.mutate(validated, {
        onSuccess: () => {
          // Save to store
          saveStep1Data(validated)
          markStepCompleted(1)

          message.success(t('messages.stepCompleted', { step: 1 }))
          onComplete()
        },
        onError: (error) => {
          console.error('Step 1 submission failed:', error)
          message.error('Failed to save step 1. Please try again.')
        },
      })
    } catch (error) {
      message.error('Please complete all required fields')
    }
  }

  // Flatten category tree for select options
  const flattenCategories = (nodes: CategoryTreeNode[], level = 0): any[] => {
    let options: any[] = []

    nodes.forEach((node) => {
      options.push({
        value: node.id,
        label: `${'　'.repeat(level)}${node.name}`,
        disabled: false,
      })

      if (node.children && node.children.length > 0) {
        options = options.concat(flattenCategories(node.children, level + 1))
      }
    })

    return options
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-blue-100 rounded-lg">
          <Building2 className="w-6 h-6 text-blue-600" />
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
        <Controller
          name="businessName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Form.Item
              label={t('fields.businessName.label')}
              validateStatus={fieldState.error ? 'error' : ''}
              help={fieldState.error?.message}
              required
            >
              <Input
                {...field}
                size="large"
                placeholder={t('fields.businessName.placeholder')}
                className="w-full"
              />
              <div className="text-xs text-gray-500 mt-1">
                {t('fields.businessName.hint')}
              </div>
            </Form.Item>
          )}
        />

        <Controller
          name="businessType"
          control={form.control}
          render={({ field, fieldState }) => (
            <Form.Item
              label={t('fields.businessType.label')}
              validateStatus={fieldState.error ? 'error' : ''}
              help={fieldState.error?.message}
              required
            >
              <Select
                {...field}
                size="large"
                placeholder={t('fields.businessType.placeholder')}
                options={[
                  {
                    value: 'retail',
                    label: t('fields.businessType.options.retail'),
                  },
                  {
                    value: 'service',
                    label: t('fields.businessType.options.service'),
                  },
                  {
                    value: 'restaurant',
                    label: t('fields.businessType.options.restaurant'),
                  },
                  {
                    value: 'healthcare',
                    label: t('fields.businessType.options.healthcare'),
                  },
                  {
                    value: 'fitness',
                    label: t('fields.businessType.options.fitness'),
                  },
                  {
                    value: 'education',
                    label: t('fields.businessType.options.education'),
                  },
                  {
                    value: 'entertainment',
                    label: t('fields.businessType.options.entertainment'),
                  },
                  {
                    value: 'other',
                    label: t('fields.businessType.options.other'),
                  },
                ]}
              />
            </Form.Item>
          )}
        />

        <Controller
          name="categoryId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Form.Item
              label={t('fields.category.label')}
              validateStatus={fieldState.error ? 'error' : ''}
              help={fieldState.error?.message}
              required
            >
              <Select
                {...field}
                size="large"
                placeholder={t('fields.category.placeholder')}
                loading={loadingCategories}
                notFoundContent={
                  loadingCategories
                    ? t('fields.category.loading')
                    : 'No categories available'
                }
                options={flattenCategories(categories)}
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

        <Controller
          name="primaryLanguage"
          control={form.control}
          render={({ field, fieldState }) => (
            <Form.Item
              label={t('fields.primaryLanguage.label')}
              validateStatus={fieldState.error ? 'error' : ''}
              help={fieldState.error?.message}
              required
            >
              <Select
                {...field}
                size="large"
                placeholder={t('fields.primaryLanguage.placeholder')}
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'es', label: 'Español' },
                  { value: 'gn', label: 'Guaraní' },
                ]}
              />
              <div className="text-xs text-gray-500 mt-1">
                {t('fields.primaryLanguage.hint')}
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
            {t('common.button.next')}
          </Button>
        </div>
      </Form>
    </div>
  )
}
