'use client'

import { useEffect } from 'react'
import { Form, Input, Select, Button, message } from 'antd'
import { Building2 } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { businessPublic } from '@merodami/pika-api'
import { BusinessType } from '@merodami/pika-types'
import type { z } from 'zod'
import { useCategoryTree } from '@/hooks/api/categories/useCategories'
import { useSubmitStep1 } from '@/hooks/api/businesses/useBusinessRegistration'
import { useRegistrationStore } from '../../store/registrationStore'
import { debounce } from 'lodash'
import { locales, type Locale } from '@/i18n/config'
import { useAppStore } from '@/store/app.store'

interface BusinessInfoStepProps {
  onComplete: () => void
  onPrevious?: () => void
}

type BusinessRegistrationStep1Data = z.infer<
  typeof businessPublic.BusinessRegistrationStep1RequestSchema
>

type CategoryTreeNode = {
  id: string
  name: string
  slug: string
  parentId: string | null
  children?: CategoryTreeNode[]
}

export function BusinessInfoStep({ onComplete }: BusinessInfoStepProps) {
  const t = useTranslations('businessRegistration.steps.businessInfo')
  const tCommon = useTranslations('common')
  const tMessages = useTranslations('businessRegistration.messages')
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()
  const { setLocale } = useAppStore()
  
  // Extract actual locale from pathname as fallback
  const actualLocale = pathname.split('/')[1] as Locale

  // Use React Query hook for categories
  const {
    data: categoryData,
    isLoading: loadingCategories,
    error: categoryError,
  } = useCategoryTree()
  const categories = categoryData?.data || []

  const { step1Data, saveStep1Data, markStepCompleted } = useRegistrationStore()

  // React Query mutation for submitting step 1
  const submitStep1Mutation = useSubmitStep1()

  const form = useForm<BusinessRegistrationStep1Data>({
    resolver: zodResolver(
      businessPublic.BusinessRegistrationStep1RequestSchema
    ),
    mode: 'onChange',
    defaultValues: {
      businessName: step1Data?.businessName || '',
      businessType: step1Data?.businessType || BusinessType.OTHER,
      categoryId: step1Data?.categoryId || '',
      // Always use actual locale from URL, not saved value
      primaryLanguage: actualLocale,
    },
  })

  // Update primaryLanguage field when locale changes (use actual locale from URL)
  useEffect(() => {
    form.setValue('primaryLanguage', actualLocale)
  }, [actualLocale, form])

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
      console.log('Submitting step 1 with data:', validated)
      submitStep1Mutation.mutate(validated, {
        onSuccess: () => {
          console.log('Step 1 submission successful!')
          // Save to store
          console.log('Saving step1 data to store...')
          saveStep1Data(validated)
          console.log('Marking step 1 as completed...')
          markStepCompleted(1)
          
          // Call onComplete first to ensure navigation happens
          console.log('Calling onComplete to navigate to next step...')
          onComplete()
          console.log('onComplete called successfully')
          
          // Then show success message (if this fails, navigation still happened)
          try {
            message.success(tMessages('stepCompleted', { step: 1 }))
          } catch (e) {
            console.log('Message notification failed:', e)
          }
        },
        onError: (error) => {
          console.error('Step 1 submission failed:', error)
          // Handle 409 conflict (step already submitted)
          if ((error as any)?.response?.status === 409) {
            // Step already completed on server, mark it locally and move forward
            markStepCompleted(1)
            onComplete()
          } else {
            message.error('Failed to save step 1. Please try again.')
          }
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
                options={flattenCategories(
                  categories.map((cat: any) => ({
                    id: cat.id,
                    name: cat.name || cat.title,
                    slug: cat.slug,
                    parentId: cat.parentId,
                    children: cat.children,
                  }))
                )}
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
                onChange={(value) => {
                  console.log('Language dropdown changed to:', value)
                  console.log('Current locale from hook:', currentLocale)
                  console.log('Actual locale from URL:', actualLocale)
                  console.log('Current pathname:', pathname)
                  
                  // Update form field
                  field.onChange(value)
                  
                  // Only change app language if different from actual current locale (from URL)
                  if (value !== actualLocale && locales.includes(value as Locale)) {
                    console.log('Changing language from', actualLocale, 'to', value)
                    
                    // Save ALL current form data to store before switching
                    const currentData = form.getValues()
                    saveStep1Data({
                      ...currentData,
                      primaryLanguage: value, // Ensure the new language is saved
                    })
                    
                    // Build new path with new locale
                    const newPath = pathname.replace(/^\/[^/]+/, `/${value}`)
                    console.log('Navigating to:', newPath)
                    
                    // Update locale in store
                    setLocale(value as Locale)
                    
                    // Use router.replace for immediate navigation
                    // This ensures the page reloads with new locale
                    router.replace(newPath)
                  } else {
                    console.log('Not changing language - same as current or not in locales')
                  }
                }}
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
            {tCommon('button.next')}
          </Button>
        </div>
      </Form>
    </div>
  )
}
