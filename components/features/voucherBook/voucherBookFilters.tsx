'use client'

import { useTranslations } from 'next-intl'
import {
  UnifiedFilters,
  FilterPresets,
} from '@/components/ui/filters/UnifiedFilters'
import { FilterField, FilterGroup } from '@/components/ui/filters'
import {
  VoucherBookStatus,
  VoucherBookType,
} from '@/lib/api/mappers/voucherBook'

interface VoucherBookFiltersProps {
  values: Record<string, any>
  onChange: (filters: Record<string, any>) => void
  onReset: () => void
}

export function VoucherBookFilters({
  values,
  onChange,
  onReset,
}: VoucherBookFiltersProps) {
  const t = useTranslations('voucherBooks')

  const handleChange = (field: string, value: any) => {
    onChange({ ...values, [field]: value })
  }

  // Quick filter options for common use cases
  const quickFilters = [
    {
      label: t('status.published'),
      value: VoucherBookStatus.PUBLISHED,
      isActive: values.status === VoucherBookStatus.PUBLISHED,
      onClick: (value: any) => handleChange('status', value),
    },
    {
      label: t('status.draft'),
      value: VoucherBookStatus.DRAFT,
      isActive: values.status === VoucherBookStatus.DRAFT,
      onClick: (value: any) => handleChange('status', value),
    },
    {
      label: t('bookType.monthly'),
      value: VoucherBookType.MONTHLY,
      isActive: values.bookType === VoucherBookType.MONTHLY,
      onClick: (value: any) => handleChange('bookType', value),
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
      <FilterGroup title={t('list.filters')}>
        <FilterField
          label={t('list.searchPlaceholder')}
          type="search"
          value={values.search}
          onChange={(value) => handleChange('search', value)}
          placeholder={t('list.searchPlaceholder')}
        />

        <FilterField
          label={t('list.filterByStatus')}
          type="select"
          value={values.status}
          onChange={(value) => handleChange('status', value)}
          placeholder={t('list.filterByStatus')}
          options={[
            {
              label: t('status.draft'),
              value: VoucherBookStatus.DRAFT,
            },
            {
              label: t('status.readyForPrint'),
              value: VoucherBookStatus.READY_FOR_PRINT,
            },
            {
              label: t('status.published'),
              value: VoucherBookStatus.PUBLISHED,
            },
            {
              label: t('status.archived'),
              value: VoucherBookStatus.ARCHIVED,
            },
          ]}
        />

        <FilterField
          label={t('list.filterByType')}
          type="select"
          value={values.bookType}
          onChange={(value) => handleChange('bookType', value)}
          placeholder={t('list.filterByType')}
          options={[
            {
              label: t('bookType.monthly'),
              value: VoucherBookType.MONTHLY,
            },
            {
              label: t('bookType.specialEdition'),
              value: VoucherBookType.SPECIAL_EDITION,
            },
            {
              label: t('bookType.regional'),
              value: VoucherBookType.REGIONAL,
            },
            {
              label: t('bookType.seasonal'),
              value: VoucherBookType.SEASONAL,
            },
            {
              label: t('bookType.promotional'),
              value: VoucherBookType.PROMOTIONAL,
            },
          ]}
        />

        <FilterField
          label={t('list.filterByYear')}
          type="select"
          value={values.year}
          onChange={(value) => handleChange('year', value)}
          placeholder={t('list.filterByYear')}
          options={Array.from({ length: 10 }, (_, i) => {
            const year = new Date().getFullYear() - i
            return {
              label: year.toString(),
              value: year,
            }
          })}
        />
      </FilterGroup>
    </UnifiedFilters>
  )
}
