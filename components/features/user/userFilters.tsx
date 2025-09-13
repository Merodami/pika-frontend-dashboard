'use client'

import { useTranslations } from 'next-intl'
import { UserStatus, UserRole } from '@/lib/api/orval-client'
import {
  UnifiedFilters,
  FilterPresets,
} from '@/components/ui/filters/UnifiedFilters'
import { FilterField, FilterGroup } from '@/components/ui/filters'

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
    <UnifiedFilters
      {...FilterPresets.collapsible}
      values={values}
      onReset={onReset}
      quickFilters={quickFilters}
    >
      {/* Basic Filters */}
      <FilterGroup title={t('user.filter.basic')}>
        <FilterField
          label={t('user.filter.search')}
          type="search"
          value={values.search}
          onChange={(value) => handleChange('search', value)}
          placeholder={t('user.filter.searchPlaceholder')}
        />

        <FilterField
          label={t('user.field.email')}
          type="input"
          value={values.email}
          onChange={(value) => handleChange('email', value)}
          placeholder={t('user.filter.emailPlaceholder')}
        />
      </FilterGroup>

      {/* Status & Role Filters */}
      <FilterGroup title={t('user.filter.statusAndRole')}>
        <FilterField
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

        <FilterField
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
      </FilterGroup>

      {/* Verification Filters */}
      <FilterGroup title={t('user.filter.verification')}>
        <FilterField
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

        <FilterField
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
      </FilterGroup>

      {/* Date Filters */}
      <FilterGroup title={t('user.filter.dates')}>
        <FilterField
          label={t('user.field.registrationDate')}
          type="date-range"
          value={values.registeredRange}
          onChange={(value) => handleChange('registeredRange', value)}
          placeholder={t('user.filter.registrationDatePlaceholder')}
        />
      </FilterGroup>
    </UnifiedFilters>
  )
}
