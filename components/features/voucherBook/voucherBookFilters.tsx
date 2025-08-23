'use client'

import { useTranslations } from 'next-intl'

import { Form, Input, Select, Button, Space } from 'antd'
import { Search } from 'lucide-react'
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

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <Form layout="inline" className="gap-2">
        <Form.Item label={t('list.searchPlaceholder')}>
          <Input
            prefix={<Search className="w-4 h-4" />}
            placeholder={t('list.searchPlaceholder')}
            value={values.search}
            onChange={(e) => handleChange('search', e.target.value)}
            style={{ width: 200 }}
          />
        </Form.Item>

        <Form.Item label={t('list.filterByStatus')}>
          <Select
            value={values.status}
            onChange={(value) => handleChange('status', value)}
            style={{ width: 150 }}
            allowClear
            placeholder={t('list.filterByStatus')}
          >
            <Select.Option value={VoucherBookStatus.DRAFT}>
              {t('status.draft')}
            </Select.Option>
            <Select.Option value={VoucherBookStatus.READY_FOR_PRINT}>
              {t('status.readyForPrint')}
            </Select.Option>
            <Select.Option value={VoucherBookStatus.PUBLISHED}>
              {t('status.published')}
            </Select.Option>
            <Select.Option value={VoucherBookStatus.ARCHIVED}>
              {t('status.archived')}
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label={t('list.filterByType')}>
          <Select
            value={values.bookType}
            onChange={(value) => handleChange('bookType', value)}
            style={{ width: 180 }}
            allowClear
            placeholder={t('list.filterByType')}
          >
            <Select.Option value={VoucherBookType.MONTHLY}>
              {t('bookType.monthly')}
            </Select.Option>
            <Select.Option value={VoucherBookType.SPECIAL_EDITION}>
              {t('bookType.specialEdition')}
            </Select.Option>
            <Select.Option value={VoucherBookType.REGIONAL}>
              {t('bookType.regional')}
            </Select.Option>
            <Select.Option value={VoucherBookType.SEASONAL}>
              {t('bookType.seasonal')}
            </Select.Option>
            <Select.Option value={VoucherBookType.PROMOTIONAL}>
              {t('bookType.promotional')}
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label={t('list.filterByYear')}>
          <Select
            value={values.year}
            onChange={(value) => handleChange('year', value)}
            style={{ width: 100 }}
            allowClear
            placeholder={t('list.filterByYear')}
          >
            {Array.from({ length: 10 }, (_, i) => {
              const year = new Date().getFullYear() - i
              return (
                <Select.Option key={year} value={year}>
                  {year}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button onClick={onReset}>{t('common.button.reset')}</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}
