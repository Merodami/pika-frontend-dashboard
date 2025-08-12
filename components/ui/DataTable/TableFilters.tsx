'use client'

import { useState, useEffect } from 'react'
import { Form, Input, Select, DatePicker, Button, Space, Tag, Drawer } from 'antd'
import { Filter, RotateCcw } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { isEmpty, omitBy, isNil } from 'lodash-es'
import dayjs from 'dayjs'

const { RangePicker } = DatePicker
const { Option } = Select

export interface FilterField {
  name: string
  label: string
  type: 'text' | 'select' | 'multiselect' | 'date' | 'daterange' | 'number'
  placeholder?: string
  options?: Array<{ label: string; value: any }>
  defaultValue?: any
  rules?: any[]
}

export interface TableFiltersProps {
  fields: FilterField[]
  values?: Record<string, any>
  onChange?: (filters: Record<string, any>) => void
  onReset?: () => void
  inline?: boolean
  showActiveFilters?: boolean
  className?: string
}

export function TableFilters({
  fields,
  values = {},
  onChange,
  onReset,
  inline = false,
  showActiveFilters = true,
  className
}: TableFiltersProps) {
  const t = useTranslations('common')
  const [form] = Form.useForm()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({})

  // Sync form values with external values
  useEffect(() => {
    form.setFieldsValue(values)
    setActiveFilters(omitBy(values, isNil))
  }, [values, form])

  const handleSubmit = (formValues: Record<string, any>) => {
    // Process values based on field types
    const processedValues = fields.reduce((acc, field) => {
      const value = formValues[field.name]
      
      if (value === undefined || value === null || value === '') {
        return acc
      }
      
      // Handle date fields
      if (field.type === 'date' && value) {
        acc[field.name] = dayjs(value).format('YYYY-MM-DD')
      } else if (field.type === 'daterange' && value && Array.isArray(value)) {
        acc[`${field.name}From`] = dayjs(value[0]).format('YYYY-MM-DD')
        acc[`${field.name}To`] = dayjs(value[1]).format('YYYY-MM-DD')
      } else {
        acc[field.name] = value
      }
      
      return acc
    }, {} as Record<string, any>)
    
    setActiveFilters(processedValues)
    onChange?.(processedValues)
    
    if (!inline) {
      setDrawerOpen(false)
    }
  }

  const handleReset = () => {
    form.resetFields()
    setActiveFilters({})
    onReset?.()
    onChange?.({})
  }

  const removeFilter = (key: string) => {
    const newValues = { ...activeFilters }
    delete newValues[key]
    
    // Also remove related daterange fields
    if (key.endsWith('From') || key.endsWith('To')) {
      const baseKey = key.replace(/From$|To$/, '')
      delete newValues[`${baseKey}From`]
      delete newValues[`${baseKey}To`]
      form.setFieldValue(baseKey, undefined)
    } else {
      form.setFieldValue(key, undefined)
    }
    
    setActiveFilters(newValues)
    onChange?.(newValues)
  }

  const renderField = (field: FilterField) => {
    switch (field.type) {
      case 'text':
        return (
          <Input 
            placeholder={field.placeholder || field.label}
            allowClear
          />
        )
      
      case 'number':
        return (
          <Input 
            type="number"
            placeholder={field.placeholder || field.label}
            allowClear
          />
        )
      
      case 'select':
        return (
          <Select
            placeholder={field.placeholder || field.label}
            allowClear
            className="w-full"
          >
            {field.options?.map(option => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        )
      
      case 'multiselect':
        return (
          <Select
            mode="multiple"
            placeholder={field.placeholder || field.label}
            allowClear
            className="w-full"
          >
            {field.options?.map(option => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        )
      
      case 'date':
        return (
          <DatePicker
            className="w-full"
            format="YYYY-MM-DD"
            placeholder={field.placeholder || field.label}
          />
        )
      
      case 'daterange':
        return (
          <RangePicker
            className="w-full"
            format="YYYY-MM-DD"
            placeholder={[
              field.placeholder?.split(',')[0] || 'Start Date',
              field.placeholder?.split(',')[1] || 'End Date'
            ]}
          />
        )
      
      default:
        return null
    }
  }

  const filterForm = (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      className={className}
    >
      <div className={inline ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" : "space-y-4"}>
        {fields.map(field => (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={field.rules}
            initialValue={field.defaultValue}
          >
            {renderField(field)}
          </Form.Item>
        ))}
      </div>
      
      <Space className="mt-4">
        <Button type="primary" htmlType="submit" icon={<Filter className="w-4 h-4" />}>
          {t('button.filter')}
        </Button>
        <Button onClick={handleReset} icon={<RotateCcw className="w-4 h-4" />}>
          Reset
        </Button>
      </Space>
    </Form>
  )

  // Active filters display
  const activeFilterTags = showActiveFilters && !isEmpty(activeFilters) && (
    <div className="flex flex-wrap gap-2 mb-4">
      <span className="text-sm text-gray-500 self-center">Active filters:</span>
      {Object.entries(activeFilters).map(([key, value]) => {
        // Skip daterange sub-fields
        if (key.endsWith('From') || key.endsWith('To')) {
          const baseKey = key.replace(/From$|To$/, '')
          if (activeFilters[`${baseKey}From`] && activeFilters[`${baseKey}To`] && key.endsWith('To')) {
            return null // Skip the 'To' field, we'll show both in the 'From' tag
          }
          if (key.endsWith('From')) {
            const field = fields.find(f => f.name === baseKey)
            const label = field?.label || baseKey
            return (
              <Tag
                key={key}
                closable
                onClose={() => removeFilter(key)}
                className="flex items-center gap-1"
              >
                {label}: {activeFilters[`${baseKey}From`]} - {activeFilters[`${baseKey}To`]}
              </Tag>
            )
          }
        }
        
        const field = fields.find(f => f.name === key)
        const label = field?.label || key
        const displayValue = Array.isArray(value) ? value.join(', ') : value
        
        return (
          <Tag
            key={key}
            closable
            onClose={() => removeFilter(key)}
            className="flex items-center gap-1"
          >
            {label}: {displayValue}
          </Tag>
        )
      })}
      <Button
        size="small"
        type="link"
        onClick={handleReset}
        className="text-xs"
      >
        Clear all
      </Button>
    </div>
  )

  if (inline) {
    return (
      <div>
        {activeFilterTags}
        {filterForm}
      </div>
    )
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <Button
          icon={<Filter className="w-4 h-4" />}
          onClick={() => setDrawerOpen(true)}
        >
          Filters
          {!isEmpty(activeFilters) && (
            <span className="ml-2 px-2 py-0.5 bg-blue-500 text-white rounded-full text-xs">
              {Object.keys(activeFilters).length}
            </span>
          )}
        </Button>
        {activeFilterTags}
      </div>
      
      <Drawer
        title="Filters"
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={400}
      >
        {filterForm}
      </Drawer>
    </>
  )
}

// Preset filter configurations
export const commonFilters = {
  status: (options: Array<{ label: string; value: string }>): FilterField => ({
    name: 'status',
    label: 'Status',
    type: 'select',
    options
  }),
  
  dateRange: (name: string = 'created', label: string = 'Created Date'): FilterField => ({
    name,
    label,
    type: 'daterange',
    placeholder: 'Start Date,End Date'
  }),
  
  search: (name: string = 'search', label: string = 'Search'): FilterField => ({
    name,
    label,
    type: 'text',
    placeholder: 'Search...'
  }),
  
  role: (options: Array<{ label: string; value: string }>): FilterField => ({
    name: 'role',
    label: 'Role',
    type: 'select',
    options
  }),
  
  multiSelect: (
    name: string,
    label: string,
    options: Array<{ label: string; value: string }>
  ): FilterField => ({
    name,
    label,
    type: 'multiselect',
    options
  })
}