'use client'

import { ReactNode } from 'react'
import { Input, Select, DatePicker } from 'antd'
import { Search, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import dayjs from 'dayjs'

const { RangePicker } = DatePicker

interface FilterFieldProps {
  label: string
  type: 'search' | 'select' | 'input' | 'date-range' | 'date'
  value?: any
  onChange?: (value: any) => void
  options?: Array<{ label: string; value: any }>
  placeholder?: string
  className?: string
  allowClear?: boolean
  icon?: ReactNode
}

export function FilterField({
  label,
  type,
  value,
  onChange,
  options,
  placeholder,
  className,
  allowClear = true,
  icon,
}: FilterFieldProps) {
  const renderInput = () => {
    switch (type) {
      case 'search':
        return (
          <Input
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            prefix={icon || <Search className="w-4 h-4 text-gray-400" />}
            allowClear={allowClear}
            className="h-10"
          />
        )

      case 'input':
        return (
          <Input
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            prefix={icon}
            allowClear={allowClear}
            className="h-10"
          />
        )

      case 'select':
        return (
          <Select
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            allowClear={allowClear}
            className="w-full"
            size="large"
          >
            {options?.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        )

      case 'date':
        return (
          <DatePicker
            value={value ? dayjs(value) : null}
            onChange={(date) => onChange?.(date?.toISOString())}
            placeholder={placeholder}
            className="w-full h-10"
            suffixIcon={<Calendar className="w-4 h-4 text-gray-400" />}
          />
        )

      case 'date-range':
        return (
          <RangePicker
            value={value}
            onChange={onChange}
            placeholder={[placeholder || 'Start date', 'End date']}
            className="w-full h-10"
          />
        )

      default:
        return null
    }
  }

  return (
    <div className={cn('space-y-2', className)}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {renderInput()}
    </div>
  )
}

// Quick filter chips for common values
interface FilterChipProps {
  label: string
  value: any
  isActive: boolean
  onClick: (value: any) => void
  className?: string
}

export function FilterChip({
  label,
  value,
  isActive,
  onClick,
  className,
}: FilterChipProps) {
  return (
    <button
      onClick={() => onClick(isActive ? null : value)}
      className={cn(
        'inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full border transition-colors',
        isActive
          ? 'bg-blue-100 text-blue-800 border-blue-200'
          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50',
        className
      )}
    >
      {label}
    </button>
  )
}

// Filter group for related filters
interface FilterGroupProps {
  title?: string
  children: ReactNode
  className?: string
}

export function FilterGroup({ title, children, className }: FilterGroupProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {title && (
        <h4 className="text-sm font-semibold text-gray-900 border-b border-gray-200 pb-2">
          {title}
        </h4>
      )}
      <div className="space-y-4">{children}</div>
    </div>
  )
}
