'use client'

import {
  Drawer,
  Form,
  Input,
  Select,
  Switch,
  Button,
  Alert,
  message,
} from 'antd'
import { X, Save, Store, User, FileText, Tag } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState, useEffect } from 'react'

import { useCreateBusiness } from '@/hooks/api/businesses/useBusinesses'
import { getAdminUserList, getAdminCategoryTree } from '@/lib/api/orval-client'
import { businessAdmin } from '@merodami/pika-api'
import { UserRole } from '@merodami/pika-types'

// Use the backend schema directly - this is the single source of truth
const { AdminCreateBusinessRequest } = businessAdmin

// Use the schema as-is from the backend
type CreateBusinessFormData = z.infer<typeof AdminCreateBusinessRequest>

interface AddBusinessDrawerProps {
  open: boolean
  onClose: () => void
  locale: string
}

export default function AddBusinessDrawer({
  open,
  onClose,
  locale,
}: AddBusinessDrawerProps) {
  const t = useTranslations()
  const queryClient = useQueryClient()
  const [searchingUser, setSearchingUser] = useState('')

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateBusinessFormData>({
    resolver: zodResolver(AdminCreateBusinessRequest),
    defaultValues: {
      userId: '',
      businessName: '',
      businessDescription: '',
      categoryId: '',
      verified: false,
      active: true,
    },
  })

  // Fetch users for the dropdown (business owners only)
  const { data: usersData, isLoading: loadingUsers } = useQuery({
    queryKey: ['admin-users-select', searchingUser],
    queryFn: () =>
      getAdminUserList({
        search: searchingUser || undefined,
        role: UserRole.BUSINESS,
        limit: 50,
      }),
    enabled: open,
  })

  // Fetch categories for the dropdown
  const { data: categoriesData, isLoading: loadingCategories } = useQuery({
    queryKey: ['admin-categories-tree'],
    queryFn: () => getAdminCategoryTree(),
    enabled: open,
  })

  // Create business mutation using the custom hook
  const createBusinessMutation = useCreateBusiness()

  const onSubmit = async (data: CreateBusinessFormData) => {
    try {
      await createBusinessMutation.mutateAsync(data)
      message.success(t('businesses.message.created'))
      reset()
      onClose()
    } catch (error) {
      // Error is handled by the mutation hook
      console.error('Failed to create business:', error)
    }
  }

  // Reset form when drawer closes
  useEffect(() => {
    if (!open) {
      reset()
      setSearchingUser('')
    }
  }, [open, reset])

  return (
    <Drawer
      title={
        <div className="flex items-center gap-2">
          <Store className="w-5 h-5" />
          <span>{t('businesses.action.addNew')}</span>
        </div>
      }
      placement="right"
      onClose={onClose}
      open={open}
      width={480}
      closeIcon={<X className="w-4 h-4" />}
      footer={
        <div className="flex gap-2 justify-end">
          <Button onClick={onClose}>{t('common.button.cancel')}</Button>
          <Button
            type="primary"
            icon={<Save className="w-4 h-4" />}
            onClick={handleSubmit(onSubmit)}
            loading={isSubmitting || createBusinessMutation.isPending}
          >
            {t('common.button.create')}
          </Button>
        </div>
      }
    >
      <Form layout="vertical" className="space-y-4">
        {/* Business Owner */}
        <Controller
          name="userId"
          control={control}
          render={({ field }) => (
            <Form.Item
              label={
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {t('businesses.fields.owner')}
                </span>
              }
              validateStatus={errors.userId ? 'error' : ''}
              help={errors.userId?.message}
              required
            >
              <Select
                {...field}
                placeholder={t('businesses.placeholder.selectOwner')}
                showSearch
                loading={loadingUsers}
                onSearch={setSearchingUser}
                filterOption={false}
                notFoundContent={loadingUsers ? 'Loading...' : 'No users found'}
                options={
                  usersData?.data?.map((user) => ({
                    label: `${user.firstName} ${user.lastName} (${user.email})`,
                    value: user.id,
                  })) || []
                }
              />
            </Form.Item>
          )}
        />

        {/* Business Name */}
        <Controller
          name="businessName"
          control={control}
          render={({ field }) => (
            <Form.Item
              label={
                <span className="flex items-center gap-2">
                  <Store className="w-4 h-4" />
                  {t('businesses.fields.name')}
                </span>
              }
              validateStatus={errors.businessName ? 'error' : ''}
              help={errors.businessName?.message}
              required
            >
              <Input
                {...field}
                placeholder={t('businesses.placeholder.enterName')}
              />
            </Form.Item>
          )}
        />

        {/* Business Description */}
        <Controller
          name="businessDescription"
          control={control}
          render={({ field }) => (
            <Form.Item
              label={
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  {t('businesses.fields.description')}
                </span>
              }
              validateStatus={errors.businessDescription ? 'error' : ''}
              help={errors.businessDescription?.message}
            >
              <Input.TextArea
                {...field}
                rows={4}
                placeholder={t('businesses.placeholder.enterDescription')}
              />
            </Form.Item>
          )}
        />

        {/* Category */}
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <Form.Item
              label={
                <span className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  {t('businesses.fields.category')}
                </span>
              }
              validateStatus={errors.categoryId ? 'error' : ''}
              help={errors.categoryId?.message}
              required
            >
              <Select
                {...field}
                placeholder={t('businesses.placeholder.selectCategory')}
                showSearch
                loading={loadingCategories}
                filterOption={(input, option) =>
                  (option?.label as string)
                    ?.toLowerCase()
                    .includes(input.toLowerCase())
                }
                notFoundContent={
                  loadingCategories ? 'Loading...' : 'No categories found'
                }
                options={
                  categoriesData?.map((category: any) => ({
                    label: category.nameKey,
                    value: category.id,
                    children: category.children?.map((child: any) => ({
                      label: child.nameKey,
                      value: child.id,
                    })),
                  })) || []
                }
              />
            </Form.Item>
          )}
        />

        {/* Status Switches */}
        <div className="space-y-3 pt-4 border-t">
          <Controller
            name="verified"
            control={control}
            render={({ field }) => (
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">
                    {t('businesses.fields.verified')}
                  </div>
                  <div className="text-xs text-gray-500">
                    {t('businesses.help.verified')}
                  </div>
                </div>
                <Switch checked={field.value} onChange={field.onChange} />
              </div>
            )}
          />

          <Controller
            name="active"
            control={control}
            render={({ field }) => (
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">
                    {t('businesses.fields.active')}
                  </div>
                  <div className="text-xs text-gray-500">
                    {t('businesses.help.active')}
                  </div>
                </div>
                <Switch checked={field.value} onChange={field.onChange} />
              </div>
            )}
          />
        </div>

        {/* Info Alert */}
        <Alert
          message={t('businesses.info.adminCreate')}
          type="info"
          showIcon
        />
      </Form>
    </Drawer>
  )
}
