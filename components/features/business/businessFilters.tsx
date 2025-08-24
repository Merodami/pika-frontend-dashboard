'use client'

import { useTranslations } from 'next-intl'
import { BusinessVerificationStatus, BusinessType } from '@merodami/pika-types'
import { ResponsiveFilters } from '@/components/ui/filters'

interface BusinessFiltersProps {
  values: Record<string, any>
  onChange: (filters: Record<string, any>) => void
  onReset: () => void
}

export function BusinessFilters({
  values,
  onChange,
  onReset,
}: BusinessFiltersProps) {
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
      label: t('business.status.verified'),
      value: BusinessVerificationStatus.VERIFIED,
      isActive: values.status === BusinessVerificationStatus.VERIFIED,
      onClick: (value: any) => handleChange('status', value),
    },
    {
      label: t('business.status.pending'),
      value: BusinessVerificationStatus.PENDING,
      isActive: values.status === BusinessVerificationStatus.PENDING,
      onClick: (value: any) => handleChange('status', value),
    },
    {
      label: t('business.type.restaurant'),
      value: BusinessType.RESTAURANT,
      isActive: values.type === BusinessType.RESTAURANT,
      onClick: (value: any) => handleChange('type', value),
    },
  ]

  return (
    <ResponsiveFilters
      activeFiltersCount={activeFiltersCount}
      onReset={onReset}
      quickFilters={quickFilters}
    >
      {/* Basic Filters */}
      <ResponsiveFilters.Group title={t('business.filter.basic')}>
        <ResponsiveFilters.Field
          label={t('business.filter.search')}
          type="search"
          value={values.search}
          onChange={(value) => handleChange('search', value)}
          placeholder={t('business.filter.searchPlaceholder')}
        />

        <ResponsiveFilters.Field
          label={t('business.field.name')}
          type="input"
          value={values.name}
          onChange={(value) => handleChange('name', value)}
          placeholder={t('business.filter.namePlaceholder')}
        />

        <ResponsiveFilters.Field
          label={t('business.field.city')}
          type="input"
          value={values.city}
          onChange={(value) => handleChange('city', value)}
          placeholder={t('business.filter.cityPlaceholder')}
        />
      </ResponsiveFilters.Group>

      {/* Status & Type Filters */}
      <ResponsiveFilters.Group title={t('business.filter.statusAndType')}>
        <ResponsiveFilters.Field
          label={t('business.field.status')}
          type="select"
          value={values.status}
          onChange={(value) => handleChange('status', value)}
          placeholder={t('business.filter.statusPlaceholder')}
          options={[
            {
              label: t('business.status.verified'),
              value: BusinessVerificationStatus.VERIFIED,
            },
            {
              label: t('business.status.pending'),
              value: BusinessVerificationStatus.PENDING,
            },
            {
              label: t('business.status.rejected'),
              value: BusinessVerificationStatus.REJECTED,
            },
            {
              label: t('business.status.unverified'),
              value: BusinessVerificationStatus.UNVERIFIED,
            },
            {
              label: t('business.status.expired'),
              value: BusinessVerificationStatus.EXPIRED,
            },
          ]}
        />

        <ResponsiveFilters.Field
          label={t('business.field.type')}
          type="select"
          value={values.type}
          onChange={(value) => handleChange('type', value)}
          placeholder={t('business.filter.typePlaceholder')}
          options={[
            {
              label: t('business.type.restaurant'),
              value: BusinessType.RESTAURANT,
            },
            { label: t('business.type.retail'), value: BusinessType.RETAIL },
            { label: t('business.type.service'), value: BusinessType.SERVICE },
            {
              label: t('business.type.healthcare'),
              value: BusinessType.HEALTHCARE,
            },
            { label: t('business.type.fitness'), value: BusinessType.FITNESS },
            {
              label: t('business.type.education'),
              value: BusinessType.EDUCATION,
            },
            {
              label: t('business.type.entertainment'),
              value: BusinessType.ENTERTAINMENT,
            },
            { label: t('business.type.other'), value: BusinessType.OTHER },
          ]}
        />
      </ResponsiveFilters.Group>

      {/* Verification Filters */}
      <ResponsiveFilters.Group title={t('business.filter.verification')}>
        <ResponsiveFilters.Field
          label={t('business.field.phoneVerified')}
          type="select"
          value={values.phoneVerified}
          onChange={(value) => handleChange('phoneVerified', value)}
          placeholder={t('business.filter.phoneVerifiedPlaceholder')}
          options={[
            { label: t('common.yes'), value: true },
            { label: t('common.no'), value: false },
          ]}
        />

        <ResponsiveFilters.Field
          label={t('business.field.emailVerified')}
          type="select"
          value={values.emailVerified}
          onChange={(value) => handleChange('emailVerified', value)}
          placeholder={t('business.filter.emailVerifiedPlaceholder')}
          options={[
            { label: t('common.yes'), value: true },
            { label: t('common.no'), value: false },
          ]}
        />
      </ResponsiveFilters.Group>

      {/* Rating & Performance */}
      <ResponsiveFilters.Group title={t('business.filter.performance')}>
        <ResponsiveFilters.Field
          label={t('business.field.minRating')}
          type="select"
          value={values.minRating}
          onChange={(value) => handleChange('minRating', value)}
          placeholder={t('business.filter.minRatingPlaceholder')}
          options={[
            { label: '⭐ 1+', value: 1 },
            { label: '⭐ 2+', value: 2 },
            { label: '⭐ 3+', value: 3 },
            { label: '⭐ 4+', value: 4 },
            { label: '⭐ 4.5+', value: 4.5 },
          ]}
        />

        <ResponsiveFilters.Field
          label={t('business.field.hasReviews')}
          type="select"
          value={values.hasReviews}
          onChange={(value) => handleChange('hasReviews', value)}
          placeholder={t('business.filter.hasReviewsPlaceholder')}
          options={[
            { label: t('common.yes'), value: true },
            { label: t('common.no'), value: false },
          ]}
        />
      </ResponsiveFilters.Group>

      {/* Date Filters */}
      <ResponsiveFilters.Group title={t('business.filter.dates')}>
        <ResponsiveFilters.Field
          label={t('business.field.registrationDate')}
          type="date-range"
          value={values.registeredRange}
          onChange={(value) => handleChange('registeredRange', value)}
          placeholder={t('business.filter.registrationDatePlaceholder')}
        />

        <ResponsiveFilters.Field
          label={t('business.field.verificationDate')}
          type="date-range"
          value={values.verifiedRange}
          onChange={(value) => handleChange('verifiedRange', value)}
          placeholder={t('business.filter.verificationDatePlaceholder')}
        />
      </ResponsiveFilters.Group>
    </ResponsiveFilters>
  )
}
