'use client'

import { ReactNode } from 'react'
import { MobileFilterDrawer } from './MobileFilterDrawer'
import { FilterField, FilterChip, FilterGroup } from './FilterField'

interface ResponsiveFiltersProps {
  children: ReactNode
  activeFiltersCount?: number
  onReset?: () => void
  className?: string
  quickFilters?: Array<{
    label: string
    value: any
    isActive: boolean
    onClick: (value: any) => void
  }>
}

export function ResponsiveFilters({
  children,
  activeFiltersCount,
  onReset,
  className,
  quickFilters,
}: ResponsiveFiltersProps) {
  return (
    <div className={className}>
      {/* Quick Filters - Always visible */}
      {quickFilters && quickFilters.length > 0 && (
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
      )}

      {/* Main Filters */}
      <MobileFilterDrawer
        activeFiltersCount={activeFiltersCount}
        onReset={onReset}
        className={className}
      >
        {children}
      </MobileFilterDrawer>
    </div>
  )
}

// Export sub-components for easy access
ResponsiveFilters.Field = FilterField
ResponsiveFilters.Chip = FilterChip
ResponsiveFilters.Group = FilterGroup
ResponsiveFilters.Drawer = MobileFilterDrawer

export { FilterField, FilterChip, FilterGroup, MobileFilterDrawer }
