'use client'

import { useTranslations } from 'next-intl'
import { Form, Input, Select, Button, Space, DatePicker } from 'antd'
import { Search } from 'lucide-react'
import { UserStatus, UserRole } from '@merodami/pika-types'

const { RangePicker } = DatePicker

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

  const handleReset = () => {
    onReset()
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <Form layout="inline" className="gap-2">
        <Form.Item label={t('user.filter.search')}>
          <Input
            placeholder={t('user.filter.searchPlaceholder')}
            value={values.search}
            onChange={(e) => handleChange('search', e.target.value)}
            prefix={<Search className="w-4 h-4 text-gray-400" />}
            allowClear
            style={{ width: 250 }}
          />
        </Form.Item>

        <Form.Item label={t('user.field.email')}>
          <Input
            placeholder={t('user.filter.emailPlaceholder')}
            value={values.email}
            onChange={(e) => handleChange('email', e.target.value)}
            allowClear
            style={{ width: 200 }}
          />
        </Form.Item>

        <Form.Item label={t('user.field.status')}>
          <Select
            placeholder={t('user.filter.statusPlaceholder')}
            value={values.status}
            onChange={(value) => handleChange('status', value)}
            allowClear
            style={{ width: 150 }}
          >
            <Select.Option value={UserStatus.ACTIVE}>
              {t('user.status.active')}
            </Select.Option>
            <Select.Option value={UserStatus.SUSPENDED}>
              {t('user.status.suspended')}
            </Select.Option>
            <Select.Option value={UserStatus.BANNED}>
              {t('user.status.banned')}
            </Select.Option>
            <Select.Option value={UserStatus.UNCONFIRMED}>
              {t('user.status.unconfirmed')}
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label={t('user.field.role')}>
          <Select
            placeholder={t('user.filter.rolePlaceholder')}
            value={values.role}
            onChange={(value) => handleChange('role', value)}
            allowClear
            style={{ width: 150 }}
          >
            <Select.Option value={UserRole.ADMIN}>
              {t('user.role.admin')}
            </Select.Option>
            <Select.Option value={UserRole.CUSTOMER}>
              {t('user.role.customer')}
            </Select.Option>
            <Select.Option value={UserRole.BUSINESS}>
              {t('user.role.business')}
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label={t('user.field.emailVerified')}>
          <Select
            placeholder={t('user.filter.emailVerifiedPlaceholder')}
            value={values.emailVerified}
            onChange={(value) => handleChange('emailVerified', value)}
            allowClear
            style={{ width: 120 }}
          >
            <Select.Option value={true}>{t('common.yes')}</Select.Option>
            <Select.Option value={false}>{t('common.no')}</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label={t('user.field.phoneVerified')}>
          <Select
            placeholder={t('user.filter.phoneVerifiedPlaceholder')}
            value={values.phoneVerified}
            onChange={(value) => handleChange('phoneVerified', value)}
            allowClear
            style={{ width: 120 }}
          >
            <Select.Option value={true}>{t('common.yes')}</Select.Option>
            <Select.Option value={false}>{t('common.no')}</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label={t('user.field.registrationDate')}>
          <RangePicker
            value={values.registeredRange}
            onChange={(dates) => handleChange('registeredRange', dates)}
            style={{ width: 250 }}
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              {t('filter.apply')}
            </Button>
            <Button onClick={handleReset}>{t('filter.reset')}</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}
