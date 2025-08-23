'use client'

import { useTranslations } from 'next-intl'
import { VoucherState, VoucherDiscountType } from '@merodami/pika-types'
import { ResponsiveFilters } from '@/components/ui/filters'

interface VoucherFiltersProps {
  values: Record<string, any>
  onChange: (filters: Record<string, any>) => void
  onReset: () => void
}

export function VoucherFilters({
  values,
  onChange,
  onReset,
}: VoucherFiltersProps) {
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
      label: t('voucher.status.active'),
      value: VoucherState.ACTIVE,
      isActive: values.state === VoucherState.ACTIVE,
      onClick: (value: any) => handleChange('state', value),
    },
    {
      label: t('voucher.status.draft'),
      value: VoucherState.DRAFT,
      isActive: values.state === VoucherState.DRAFT,
      onClick: (value: any) => handleChange('state', value),
    },
    {
      label: t('voucher.discountType.percentage'),
      value: VoucherDiscountType.PERCENTAGE,
      isActive: values.discountType === VoucherDiscountType.PERCENTAGE,
      onClick: (value: any) => handleChange('discountType', value),
    },
  ]

  return (
    <ResponsiveFilters
      activeFiltersCount={activeFiltersCount}
      onReset={onReset}
      quickFilters={quickFilters}
    >
      {/* Basic Filters */}
      <ResponsiveFilters.Group title={t('voucher.filter.basic')}>
        <ResponsiveFilters.Field
          label={t('voucher.filter.search')}
          type="search"
          value={values.search}
          onChange={(value) => handleChange('search', value)}
          placeholder={t('voucher.filter.searchPlaceholder')}
        />

        <ResponsiveFilters.Field
          label={t('voucher.field.title')}
          type="input"
          value={values.title}
          onChange={(value) => handleChange('title', value)}
          placeholder={t('voucher.filter.titlePlaceholder')}
        />

        <ResponsiveFilters.Field
          label={t('voucher.field.code')}
          type="input"
          value={values.code}
          onChange={(value) => handleChange('code', value)}
          placeholder={t('voucher.filter.codePlaceholder')}
        />
      </ResponsiveFilters.Group>

      {/* Status & Type Filters */}
      <ResponsiveFilters.Group title={t('voucher.filter.statusAndType')}>
        <ResponsiveFilters.Field
          label={t('voucher.field.status')}
          type="select"
          value={values.state}
          onChange={(value) => handleChange('state', value)}
          placeholder={t('voucher.filter.statusPlaceholder')}
          options={[
            { label: t('voucher.status.active'), value: VoucherState.ACTIVE },
            { label: t('voucher.status.draft'), value: VoucherState.DRAFT },
            { label: t('voucher.status.paused'), value: VoucherState.PAUSED },
            { label: t('voucher.status.expired'), value: VoucherState.EXPIRED },
            {
              label: t('voucher.status.archived'),
              value: VoucherState.ARCHIVED,
            },
          ]}
        />

        <ResponsiveFilters.Field
          label={t('voucher.field.discountType')}
          type="select"
          value={values.discountType}
          onChange={(value) => handleChange('discountType', value)}
          placeholder={t('voucher.filter.discountTypePlaceholder')}
          options={[
            {
              label: t('voucher.discountType.percentage'),
              value: VoucherDiscountType.PERCENTAGE,
            },
            {
              label: t('voucher.discountType.fixedAmount'),
              value: VoucherDiscountType.FIXED_AMOUNT,
            },
            {
              label: t('voucher.discountType.buyOneGetOne'),
              value: VoucherDiscountType.BUY_ONE_GET_ONE,
            },
            {
              label: t('voucher.discountType.freeShipping'),
              value: VoucherDiscountType.FREE_SHIPPING,
            },
          ]}
        />
      </ResponsiveFilters.Group>

      {/* Business Filter */}
      <ResponsiveFilters.Group title={t('voucher.filter.business')}>
        <ResponsiveFilters.Field
          label={t('voucher.field.business')}
          type="input"
          value={values.businessName}
          onChange={(value) => handleChange('businessName', value)}
          placeholder={t('voucher.filter.businessPlaceholder')}
        />

        <ResponsiveFilters.Field
          label={t('voucher.field.businessId')}
          type="input"
          value={values.businessId}
          onChange={(value) => handleChange('businessId', value)}
          placeholder={t('voucher.filter.businessIdPlaceholder')}
        />
      </ResponsiveFilters.Group>

      {/* Value & Usage Filters */}
      <ResponsiveFilters.Group title={t('voucher.filter.valueAndUsage')}>
        <ResponsiveFilters.Field
          label={t('voucher.field.minDiscount')}
          type="number"
          value={values.minDiscountValue}
          onChange={(value) => handleChange('minDiscountValue', value)}
          placeholder={t('voucher.filter.minDiscountPlaceholder')}
        />

        <ResponsiveFilters.Field
          label={t('voucher.field.maxDiscount')}
          type="number"
          value={values.maxDiscountValue}
          onChange={(value) => handleChange('maxDiscountValue', value)}
          placeholder={t('voucher.filter.maxDiscountPlaceholder')}
        />

        <ResponsiveFilters.Field
          label={t('voucher.field.hasUsageLimit')}
          type="select"
          value={values.hasUsageLimit}
          onChange={(value) => handleChange('hasUsageLimit', value)}
          placeholder={t('voucher.filter.hasUsageLimitPlaceholder')}
          options={[
            { label: t('common.yes'), value: true },
            { label: t('common.no'), value: false },
          ]}
        />
      </ResponsiveFilters.Group>

      {/* Date Filters */}
      <ResponsiveFilters.Group title={t('voucher.filter.dates')}>
        <ResponsiveFilters.Field
          label={t('voucher.field.createdAt')}
          type="date-range"
          value={values.createdRange}
          onChange={(value) => handleChange('createdRange', value)}
          placeholder={t('voucher.filter.createdDatePlaceholder')}
        />

        <ResponsiveFilters.Field
          label={t('voucher.field.validityPeriod')}
          type="date-range"
          value={values.validityRange}
          onChange={(value) => handleChange('validityRange', value)}
          placeholder={t('voucher.filter.validityPeriodPlaceholder')}
        />

        <ResponsiveFilters.Field
          label={t('voucher.field.expiryDate')}
          type="date-range"
          value={values.expiryRange}
          onChange={(value) => handleChange('expiryRange', value)}
          placeholder={t('voucher.filter.expiryDatePlaceholder')}
        />
      </ResponsiveFilters.Group>
    </ResponsiveFilters>
  )
}
