'use client'

import React from 'react'
import { Collapse } from 'antd'
import { Filter, ChevronDown, ChevronUp } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils/cn'

interface CollapsibleFiltersProps {
  children: React.ReactNode
  activeFiltersCount?: number
  defaultOpen?: boolean
  className?: string
  title?: string
  expandIcon?: 'arrow' | 'chevron' | 'none'
  bordered?: boolean
}

export function CollapsibleFilters({
  children,
  activeFiltersCount = 0,
  defaultOpen = false,
  className,
  title,
  expandIcon = 'chevron',
  bordered = true,
}: CollapsibleFiltersProps) {
  const t = useTranslations()

  const getExpandIcon = () => {
    if (expandIcon === 'none') return undefined
    if (expandIcon === 'arrow') return undefined // Use Ant Design default

    // Custom chevron icon
    return ({ isActive }: { isActive?: boolean }) =>
      isActive ? (
        <ChevronUp className="w-4 h-4 text-gray-500" />
      ) : (
        <ChevronDown className="w-4 h-4 text-gray-500" />
      )
  }

  return (
    <Collapse
      className={cn('mb-4', !bordered && 'border-0', className)}
      defaultActiveKey={defaultOpen ? ['filters'] : undefined}
      expandIcon={getExpandIcon()}
      items={[
        {
          key: 'filters',
          label: (
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span className="font-medium">
                {title || t('common.filters')}
                {activeFiltersCount > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </span>
            </div>
          ),
          children: <div className="pt-2">{children}</div>,
        },
      ]}
    />
  )
}

// HOC to wrap any existing filter component
export function withCollapsibleFilters<P extends Record<string, any>>(
  FilterComponent: React.ComponentType<P>,
  defaultOptions?: Partial<CollapsibleFiltersProps>
) {
  return function CollapsibleFilterWrapper(
    props: P & Partial<CollapsibleFiltersProps>
  ) {
    const {
      defaultOpen = defaultOptions?.defaultOpen ?? false,
      title = defaultOptions?.title,
      expandIcon = defaultOptions?.expandIcon ?? 'chevron',
      bordered = defaultOptions?.bordered ?? true,
      className = defaultOptions?.className,
      ...filterProps
    } = props

    // Try to extract activeFiltersCount from the filter props
    const activeFiltersCount =
      (filterProps as any).activeFiltersCount || (filterProps as any).values
        ? Object.values((filterProps as any).values || {}).filter(
            (value) => value !== undefined && value !== null && value !== ''
          ).length
        : 0

    return (
      <CollapsibleFilters
        activeFiltersCount={activeFiltersCount}
        defaultOpen={defaultOpen}
        title={title}
        expandIcon={expandIcon}
        bordered={bordered}
        className={className}
      >
        <FilterComponent {...(filterProps as P)} />
      </CollapsibleFilters>
    )
  }
}
