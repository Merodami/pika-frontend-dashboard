'use client'

import { useTranslations } from 'next-intl'
import { VoucherState, VoucherDiscountType } from '@/lib/api/orval-client'
import {
  UnifiedFilters,
  FilterPresets,
} from '@/components/ui/filters/UnifiedFilters'
import { FilterField, FilterGroup } from '@/components/ui/filters'

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

  // Quick filter options for common use cases
  const quickFilters = [
    {
      label: t('voucher.status.published'),
      value: VoucherState.published,
      isActive: values.state === VoucherState.published,
      onClick: (value: any) => handleChange('state', value),
    },
    {
      label: t('voucher.status.draft'),
      value: VoucherState.draft,
      isActive: values.state === VoucherState.draft,
      onClick: (value: any) => handleChange('state', value),
    },
    {
      label: t('voucher.discountType.percentage'),
      value: VoucherDiscountType.percentage,
      isActive: values.discountType === VoucherDiscountType.percentage,
      onClick: (value: any) => handleChange('discountType', value),
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
      <FilterGroup title={t('voucher.filter.basic')}>
        <FilterField
          label={t('voucher.filter.search')}
          type="search"
          value={values.search}
          onChange={(value) => handleChange('search', value)}
          placeholder={t('voucher.filter.searchPlaceholder')}
        />

        <FilterField
          label={t('voucher.field.title')}
          type="input"
          value={values.title}
          onChange={(value) => handleChange('title', value)}
          placeholder={t('voucher.filter.titlePlaceholder')}
        />

        <FilterField
          label={t('voucher.field.code')}
          type="input"
          value={values.code}
          onChange={(value) => handleChange('code', value)}
          placeholder={t('voucher.filter.codePlaceholder')}
        />
      </FilterGroup>

      {/* Status & Type Filters */}
      <FilterGroup title={t('voucher.filter.statusAndType')}>
        <FilterField
          label={t('voucher.field.status')}
          type="select"
          value={values.state}
          onChange={(value) => handleChange('state', value)}
          placeholder={t('voucher.filter.statusPlaceholder')}
          options={[
            {
              label: t('voucher.status.published'),
              value: VoucherState.published,
            },
            { label: t('voucher.status.draft'), value: VoucherState.draft },
            { label: t('voucher.status.claimed'), value: VoucherState.claimed },
            { label: t('voucher.status.expired'), value: VoucherState.expired },
            {
              label: t('voucher.status.suspended'),
              value: VoucherState.suspended,
            },
          ]}
        />

        <FilterField
          label={t('voucher.field.discountType')}
          type="select"
          value={values.discountType}
          onChange={(value) => handleChange('discountType', value)}
          placeholder={t('voucher.filter.discountTypePlaceholder')}
          options={[
            {
              label: t('voucher.discountType.percentage'),
              value: VoucherDiscountType.percentage,
            },
            {
              label: t('voucher.discountType.fixedAmount'),
              value: VoucherDiscountType.fixed,
            },
          ]}
        />
      </FilterGroup>

      {/* Business Filter */}
      <FilterGroup title={t('voucher.filter.business')}>
        <FilterField
          label={t('voucher.field.business')}
          type="input"
          value={values.businessName}
          onChange={(value) => handleChange('businessName', value)}
          placeholder={t('voucher.filter.businessPlaceholder')}
        />

        <FilterField
          label={t('voucher.field.businessId')}
          type="input"
          value={values.businessId}
          onChange={(value) => handleChange('businessId', value)}
          placeholder={t('voucher.filter.businessIdPlaceholder')}
        />
      </FilterGroup>

      {/* Value & Usage Filters */}
      <FilterGroup title={t('voucher.filter.valueAndUsage')}>
        <FilterField
          label={t('voucher.field.minDiscount')}
          type="input"
          value={values.minDiscountValue}
          onChange={(value) => handleChange('minDiscountValue', value)}
          placeholder={t('voucher.filter.minDiscountPlaceholder')}
        />

        <FilterField
          label={t('voucher.field.maxDiscount')}
          type="input"
          value={values.maxDiscountValue}
          onChange={(value) => handleChange('maxDiscountValue', value)}
          placeholder={t('voucher.filter.maxDiscountPlaceholder')}
        />

        <FilterField
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
      </FilterGroup>

      {/* Date Filters */}
      <FilterGroup title={t('voucher.filter.dates')}>
        <FilterField
          label={t('voucher.field.createdAt')}
          type="date-range"
          value={values.createdRange}
          onChange={(value) => handleChange('createdRange', value)}
          placeholder={t('voucher.filter.createdDatePlaceholder')}
        />

        <FilterField
          label={t('voucher.field.validityPeriod')}
          type="date-range"
          value={values.validityRange}
          onChange={(value) => handleChange('validityRange', value)}
          placeholder={t('voucher.filter.validityPeriodPlaceholder')}
        />

        <FilterField
          label={t('voucher.field.expiryDate')}
          type="date-range"
          value={values.expiryRange}
          onChange={(value) => handleChange('expiryRange', value)}
          placeholder={t('voucher.filter.expiryDatePlaceholder')}
        />
      </FilterGroup>
    </UnifiedFilters>
  )
}
