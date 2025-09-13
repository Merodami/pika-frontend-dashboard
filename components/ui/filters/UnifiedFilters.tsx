'use client'

import { ReactNode, useState } from 'react'
import { Collapse } from 'antd'
import { Filter, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils/cn'
import { useResponsive } from '@/lib/hooks/useResponsive'
import { ResponsiveFilters } from './ResponsiveFilters'
import { FilterField, FilterChip, FilterGroup } from './FilterField'

export interface UnifiedFiltersConfig {
  // Layout configuration
  layout?: 'default' | 'collapsible' | 'drawer' | 'inline'
  collapsible?: boolean
  defaultOpen?: boolean

  // Visual configuration
  bordered?: boolean
  showIcon?: boolean
  showActiveCount?: boolean
  expandIcon?: 'arrow' | 'chevron' | 'none'

  // Behavior configuration
  resetOnClose?: boolean
  persistState?: boolean
  mobileLayout?: 'drawer' | 'collapsible' | 'inline'

  // Custom labels
  title?: string
  resetLabel?: string

  // Style configuration
  className?: string
  containerClassName?: string
  headerClassName?: string
}

interface UnifiedFiltersProps extends UnifiedFiltersConfig {
  children: ReactNode
  values?: Record<string, any>
  onReset?: () => void
  quickFilters?: Array<{
    label: string
    value: any
    isActive: boolean
    onClick: (value: any) => void
  }>
}

/**
 * UnifiedFilters - A comprehensive filter component that handles all filter patterns
 *
 * Features:
 * - Collapsible accordion mode
 * - Mobile drawer support
 * - Quick filters
 * - Active filter count
 * - Responsive behavior
 * - Configurable layout
 */
export function UnifiedFilters({
  // Layout
  layout = 'default',
  defaultOpen = true,

  // Visual
  bordered = true,
  showIcon = true,
  showActiveCount = true,
  expandIcon = 'chevron',

  // Behavior
  mobileLayout = 'drawer',

  // Labels
  title,
  resetLabel,

  // Style
  className,
  containerClassName,
  headerClassName,

  // Core props
  children,
  values = {},
  onReset,
  quickFilters,
}: UnifiedFiltersProps) {
  const t = useTranslations()
  const { isMobile } = useResponsive()
  const [, setIsOpen] = useState(defaultOpen)

  // Calculate active filters count
  const activeFiltersCount = Object.values(values).filter(
    (value) => value !== undefined && value !== null && value !== ''
  ).length

  // Determine actual layout based on device and configuration
  const actualLayout = isMobile && mobileLayout ? mobileLayout : layout

  // Get expand icon component
  const getExpandIcon = () => {
    if (expandIcon === 'none' || !showIcon) return undefined
    if (expandIcon === 'arrow') return undefined // Use Ant Design default

    return ({ isActive }: { isActive?: boolean }) =>
      isActive ? (
        <ChevronUp className="w-4 h-4 text-gray-500" />
      ) : (
        <ChevronDown className="w-4 h-4 text-gray-500" />
      )
  }

  // Render filter header
  const renderHeader = () => (
    <div className={cn('flex items-center gap-2', headerClassName)}>
      {showIcon && <Filter className="w-4 h-4" />}
      <span className="font-medium">
        {title || t('common.filters')}
        {showActiveCount && activeFiltersCount > 0 && (
          <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">
            {activeFiltersCount}
          </span>
        )}
      </span>
    </div>
  )

  // Render reset button
  const renderReset = () => {
    if (!onReset || activeFiltersCount === 0) return null

    return (
      <button
        onClick={onReset}
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        {resetLabel || t('common.button.reset')}
      </button>
    )
  }

  // Render quick filters if provided
  const renderQuickFilters = () => {
    if (!quickFilters || quickFilters.length === 0) return null

    return (
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {quickFilters.map((filter, index) => (
            <FilterChip
              key={index}
              label={filter.label}
              value={filter.value}
              isActive={filter.isActive}
              onClick={filter.onClick}
            />
          ))}
        </div>
      </div>
    )
  }

  // Render based on layout
  switch (actualLayout) {
    case 'collapsible':
      return (
        <div className={className}>
          {renderQuickFilters()}
          <Collapse
            className={cn('mb-4', !bordered && 'border-0', containerClassName)}
            defaultActiveKey={defaultOpen ? ['filters'] : undefined}
            onChange={(keys) => setIsOpen(keys.includes('filters'))}
            expandIcon={getExpandIcon()}
            items={[
              {
                key: 'filters',
                label: renderHeader(),
                extra: renderReset(),
                children: <div className="pt-2">{children}</div>,
              },
            ]}
          />
        </div>
      )

    case 'drawer':
      return (
        <ResponsiveFilters
          activeFiltersCount={activeFiltersCount}
          onReset={onReset}
          quickFilters={quickFilters}
          className={className}
        >
          {children}
        </ResponsiveFilters>
      )

    case 'inline':
      return (
        <div className={cn('mb-4', className)}>
          {renderQuickFilters()}
          <div className={containerClassName}>{children}</div>
        </div>
      )

    default: // 'default' layout
      return (
        <div className={className}>
          {renderQuickFilters()}
          <div
            className={cn(
              'bg-white rounded-lg border border-gray-200 p-4 mb-4',
              !bordered && 'border-0',
              containerClassName
            )}
          >
            <div className="flex items-center justify-between mb-4">
              {renderHeader()}
              {renderReset()}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {children}
            </div>
          </div>
        </div>
      )
  }
}

// Re-export sub-components for composition
UnifiedFilters.Field = FilterField
UnifiedFilters.Chip = FilterChip
UnifiedFilters.Group = FilterGroup

// Configuration presets for common use cases
export const FilterPresets = {
  default: {
    layout: 'default',
    collapsible: false,
    bordered: true,
    showIcon: true,
    showActiveCount: true,
  } as UnifiedFiltersConfig,

  collapsible: {
    layout: 'collapsible',
    collapsible: true,
    defaultOpen: false,
    bordered: true,
    showIcon: true,
    showActiveCount: true,
    expandIcon: 'chevron',
  } as UnifiedFiltersConfig,

  drawer: {
    layout: 'drawer',
    mobileLayout: 'drawer',
    showIcon: true,
    showActiveCount: true,
  } as UnifiedFiltersConfig,

  inline: {
    layout: 'inline',
    bordered: false,
    showIcon: false,
    showActiveCount: false,
  } as UnifiedFiltersConfig,

  minimal: {
    layout: 'default',
    bordered: false,
    showIcon: false,
    showActiveCount: true,
  } as UnifiedFiltersConfig,
}

// HOC to convert existing filter components to use UnifiedFilters
export function withUnifiedFilters<P extends Record<string, any>>(
  FilterComponent: React.ComponentType<P>,
  config?: UnifiedFiltersConfig
) {
  return function UnifiedFilterWrapper(
    props: P & Partial<UnifiedFiltersConfig>
  ) {
    const {
      // Extract config props
      layout = config?.layout,
      collapsible = config?.collapsible,
      defaultOpen = config?.defaultOpen,
      bordered = config?.bordered,
      showIcon = config?.showIcon,
      showActiveCount = config?.showActiveCount,
      expandIcon = config?.expandIcon,
      resetOnClose = config?.resetOnClose,
      persistState = config?.persistState,
      mobileLayout = config?.mobileLayout,
      title = config?.title,
      resetLabel = config?.resetLabel,
      className = config?.className,
      containerClassName = config?.containerClassName,
      headerClassName = config?.headerClassName,
      ...filterProps
    } = props

    // Extract values and handlers from filter props
    const values = (filterProps as any).values || {}
    const onReset = (filterProps as any).onReset

    return (
      <UnifiedFilters
        {...config}
        layout={layout}
        collapsible={collapsible}
        defaultOpen={defaultOpen}
        bordered={bordered}
        showIcon={showIcon}
        showActiveCount={showActiveCount}
        expandIcon={expandIcon}
        resetOnClose={resetOnClose}
        persistState={persistState}
        mobileLayout={mobileLayout}
        title={title}
        resetLabel={resetLabel}
        className={className}
        containerClassName={containerClassName}
        headerClassName={headerClassName}
        values={values}
        onReset={onReset}
      >
        <FilterComponent {...(filterProps as P)} />
      </UnifiedFilters>
    )
  }
}
