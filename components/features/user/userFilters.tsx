'use client'

import { useTranslations } from 'next-intl'
import { UserStatus, UserRole } from '@/lib/api/orval-client'
import { ResponsiveFilters } from '@/components/ui/filters'

interface UserFiltersProps {
  values: Record<string, any>
  onChange: (filters: Record<string, any>) => void
  onReset: () => void
}

export function UserFilters({ values, onChange, onReset }: UserFiltersProps) {
  const t = useTranslations()

  const handleChange = (field: string, value: any) => {
    onChange({ ...values, [field]: value })
  }

  // Count active filters
  const activeFiltersCount = Object.values(values).filter(
    (value) => value !== undefined && value !== null && value !== ''
  ).length

  // Quick filter options for common use cases
  const quickFilters = [
    {
      label: t('user.status.active'),
      value: UserStatus.active,
      isActive: values.status === UserStatus.active,
      onClick: (value: any) => handleChange('status', value),
    },
    {
      label: t('user.role.business'),
      value: UserRole.business,
      isActive: values.role === UserRole.business,
      onClick: (value: any) => handleChange('role', value),
    },
    {
      label: t('user.field.emailVerified'),
      value: true,
      isActive: values.emailVerified === true,
      onClick: (value: any) => handleChange('emailVerified', value),
    },
  ]

  return (
    <ResponsiveFilters
      activeFiltersCount={activeFiltersCount}
      onReset={onReset}
      quickFilters={quickFilters}
    >
      {/* Basic Filters */}
      <ResponsiveFilters.Group title={t('user.filter.basic')}>
        <ResponsiveFilters.Field
          label={t('user.filter.search')}
          type="search"
          value={values.search}
          onChange={(value) => handleChange('search', value)}
          placeholder={t('user.filter.searchPlaceholder')}
        />

        <ResponsiveFilters.Field
          label={t('user.field.email')}
          type="input"
          value={values.email}
          onChange={(value) => handleChange('email', value)}
          placeholder={t('user.filter.emailPlaceholder')}
        />
      </ResponsiveFilters.Group>

      {/* Status & Role Filters */}
      <ResponsiveFilters.Group title={t('user.filter.statusAndRole')}>
        <ResponsiveFilters.Field
          label={t('user.field.status')}
          type="select"
          value={values.status}
          onChange={(value) => handleChange('status', value)}
          placeholder={t('user.filter.statusPlaceholder')}
          options={[
            { label: t('user.status.active'), value: UserStatus.active },
            { label: t('user.status.suspended'), value: UserStatus.suspended },
            { label: t('user.status.banned'), value: UserStatus.banned },
            {
              label: t('user.status.unconfirmed'),
              value: UserStatus.unconfirmed,
            },
          ]}
        />

        <ResponsiveFilters.Field
          label={t('user.field.role')}
          type="select"
          value={values.role}
          onChange={(value) => handleChange('role', value)}
          placeholder={t('user.filter.rolePlaceholder')}
          options={[
            { label: t('user.role.admin'), value: UserRole.admin },
            { label: t('user.role.customer'), value: UserRole.customer },
            { label: t('user.role.business'), value: UserRole.business },
          ]}
        />
      </ResponsiveFilters.Group>

      {/* Verification Filters */}
      <ResponsiveFilters.Group title={t('user.filter.verification')}>
        <ResponsiveFilters.Field
          label={t('user.field.emailVerified')}
          type="select"
          value={values.emailVerified}
          onChange={(value) => handleChange('emailVerified', value)}
          placeholder={t('user.filter.emailVerifiedPlaceholder')}
          options={[
            { label: t('common.yes'), value: true },
            { label: t('common.no'), value: false },
          ]}
        />

        <ResponsiveFilters.Field
          label={t('user.field.phoneVerified')}
          type="select"
          value={values.phoneVerified}
          onChange={(value) => handleChange('phoneVerified', value)}
          placeholder={t('user.filter.phoneVerifiedPlaceholder')}
          options={[
            { label: t('common.yes'), value: true },
            { label: t('common.no'), value: false },
          ]}
        />
      </ResponsiveFilters.Group>

      {/* Date Filters */}
      <ResponsiveFilters.Group title={t('user.filter.dates')}>
        <ResponsiveFilters.Field
          label={t('user.field.registrationDate')}
          type="date-range"
          value={values.registeredRange}
          onChange={(value) => handleChange('registeredRange', value)}
          placeholder={t('user.filter.registrationDatePlaceholder')}
        />
      </ResponsiveFilters.Group>
    </ResponsiveFilters>
  )
}
