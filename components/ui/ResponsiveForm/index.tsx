'use client'

import React from 'react'
import { Form, Button } from 'antd'
import type { FormProps, FormItemProps } from 'antd'
import { cn } from '@/lib/utils/cn'
import { useResponsive } from '@/lib/hooks/useResponsive'

// Responsive Form Wrapper
interface ResponsiveFormProps extends Omit<FormProps, 'variant'> {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'inline' | 'floating'
}

export function ResponsiveForm({
  children,
  className,
  variant = 'default',
  layout: layoutProp,
  ...props
}: ResponsiveFormProps) {
  const { isMobile } = useResponsive()

  // Force vertical layout on mobile
  const layout = isMobile ? 'vertical' : layoutProp || 'horizontal'

  const variantClasses = {
    default: '',
    inline: 'sm:flex sm:flex-wrap sm:gap-4',
    floating: 'space-y-6',
  }

  return (
    <Form
      layout={layout}
      className={cn(variantClasses[variant], className)}
      labelCol={!isMobile && layout === 'horizontal' ? { span: 6 } : undefined}
      wrapperCol={
        !isMobile && layout === 'horizontal' ? { span: 18 } : undefined
      }
      {...props}
    >
      {children}
    </Form>
  )
}

// Responsive Form Item
interface ResponsiveFormItemProps extends FormItemProps {
  responsive?: {
    xs?: { span: number; offset?: number }
    sm?: { span: number; offset?: number }
    md?: { span: number; offset?: number }
    lg?: { span: number; offset?: number }
  }
}

export function ResponsiveFormItem({
  children,
  className,
  responsive,
  ...props
}: ResponsiveFormItemProps) {
  const { isMobile, isTablet } = useResponsive()

  // Calculate responsive classes
  const responsiveClasses = responsive
    ? [
        responsive.xs && `col-span-${responsive.xs.span}`,
        responsive.sm && !isMobile && `sm:col-span-${responsive.sm.span}`,
        responsive.md && !isTablet && `md:col-span-${responsive.md.span}`,
        responsive.lg && `lg:col-span-${responsive.lg.span}`,
      ]
        .filter(Boolean)
        .join(' ')
    : ''

  return (
    <Form.Item className={cn(responsiveClasses, className)} {...props}>
      {children}
    </Form.Item>
  )
}

// Form Grid Layout
interface FormGridProps {
  children: React.ReactNode
  columns?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
  }
  gap?: number
  className?: string
}

export function FormGrid({
  children,
  columns = { xs: 1, sm: 1, md: 2, lg: 2 },
  gap = 16,
  className,
}: FormGridProps) {
  const gridClasses = [
    `grid-cols-${columns.xs || 1}`,
    columns.sm && `sm:grid-cols-${columns.sm}`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg}`,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={cn('grid', gridClasses, className)}
      style={{ gap: `${gap}px` }}
    >
      {children}
    </div>
  )
}

// Responsive Modal Form
interface ResponsiveModalProps {
  visible: boolean
  onCancel: () => void
  onOk?: () => void
  title: string
  children: React.ReactNode
  width?: number | string
  loading?: boolean
  className?: string
}

export function ResponsiveModal({
  visible,
  onCancel,
  onOk,
  title,
  children,
  width,
  loading = false,
  className,
}: ResponsiveModalProps) {
  const { isMobile } = useResponsive()

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-end sm:items-center justify-center',
        'transition-all duration-300',
        visible ? 'visible' : 'invisible',
        className
      )}
    >
      {/* Backdrop */}
      <div
        className={cn(
          'absolute inset-0 bg-black/50 transition-opacity',
          visible ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onCancel}
      />

      {/* Modal Content */}
      <div
        className={cn(
          'relative bg-white rounded-t-2xl sm:rounded-lg',
          'w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl',
          'max-h-[90vh] sm:max-h-[80vh] overflow-hidden',
          'transform transition-transform duration-300',
          visible
            ? 'translate-y-0 sm:scale-100'
            : 'translate-y-full sm:scale-95',
          isMobile && 'pb-safe' // Account for mobile safe area
        )}
        style={{ width: !isMobile ? width : undefined }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-4 sm:px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="px-4 sm:px-6 py-4 overflow-y-auto max-h-[60vh]">
          {children}
        </div>

        {/* Footer */}
        {onOk && (
          <div className="sticky bottom-0 bg-white border-t px-4 sm:px-6 py-4 flex gap-3 justify-end">
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="primary" onClick={onOk} loading={loading}>
              Save
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

// Responsive Field Group
interface FieldGroupProps {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
  collapsible?: boolean
}

export function FieldGroup({
  title,
  description,
  children,
  className,
  collapsible = false,
}: FieldGroupProps) {
  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <div className={cn('bg-gray-50 rounded-lg p-4 sm:p-6', className)}>
      {title && (
        <div
          className={cn('mb-4', collapsible && 'cursor-pointer select-none')}
          onClick={() => collapsible && setCollapsed(!collapsed)}
        >
          <h3 className="text-base font-medium text-gray-900 flex items-center justify-between">
            {title}
            {collapsible && (
              <span className="text-gray-400">{collapsed ? '▶' : '▼'}</span>
            )}
          </h3>
          {description && !collapsed && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>
      )}

      {!collapsed && <div className="space-y-4">{children}</div>}
    </div>
  )
}

// Responsive Input Group
interface InputGroupProps {
  children: React.ReactNode
  className?: string
  compact?: boolean
}

export function InputGroup({
  children,
  className,
  compact = false,
}: InputGroupProps) {
  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row',
        compact ? 'gap-0' : 'gap-2 sm:gap-4',
        className
      )}
    >
      {React.Children.map(children, (child, index) => (
        <div
          className={cn(
            'flex-1',
            compact && index > 0 && 'sm:-ml-px',
            compact && index === 0 && 'sm:rounded-r-none',
            compact &&
              index === React.Children.count(children) - 1 &&
              'sm:rounded-l-none',
            compact &&
              index > 0 &&
              index < React.Children.count(children) - 1 &&
              'sm:rounded-none'
          )}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

// Form Actions (Footer)
interface FormActionsProps {
  onCancel?: () => void
  onSave?: () => void
  onReset?: () => void
  saveText?: string
  cancelText?: string
  loading?: boolean
  className?: string
  align?: 'left' | 'center' | 'right'
  sticky?: boolean
}

export function FormActions({
  onCancel,
  onSave,
  onReset,
  saveText = 'Save',
  cancelText = 'Cancel',
  loading = false,
  className,
  align = 'right',
  sticky = false,
}: FormActionsProps) {
  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }

  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row gap-3',
        alignClasses[align],
        sticky &&
          'sticky bottom-0 bg-white border-t pt-4 -mx-4 px-4 sm:-mx-6 sm:px-6',
        className
      )}
    >
      {onReset && (
        <Button onClick={onReset} className="sm:mr-auto">
          Reset
        </Button>
      )}
      {onCancel && (
        <Button onClick={onCancel} className="order-2 sm:order-1">
          {cancelText}
        </Button>
      )}
      {onSave && (
        <Button
          type="primary"
          onClick={onSave}
          loading={loading}
          className="order-1 sm:order-2"
        >
          {saveText}
        </Button>
      )}
    </div>
  )
}
