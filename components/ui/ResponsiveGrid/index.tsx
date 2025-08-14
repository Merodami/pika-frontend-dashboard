'use client'

import React from 'react'
import { cn } from '@/lib/utils/cn'
import { cva, type VariantProps } from 'class-variance-authority'

// Grid Container Variants
const gridVariants = cva(
  'grid gap-4',
  {
    variants: {
      cols: {
        1: 'grid-cols-1',
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
        6: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6',
        auto: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]',
      },
      gap: {
        none: 'gap-0',
        xs: 'gap-2',
        sm: 'gap-4',
        md: 'gap-6',
        lg: 'gap-8',
        xl: 'gap-10',
      },
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
      },
      justify: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
      },
    },
    defaultVariants: {
      cols: 3,
      gap: 'sm',
      align: 'stretch',
      justify: 'start',
    },
  }
)

// Responsive Grid Component
interface ResponsiveGridProps extends VariantProps<typeof gridVariants> {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export function ResponsiveGrid({
  children,
  className,
  cols,
  gap,
  align,
  justify,
  as: Component = 'div',
  ...props
}: ResponsiveGridProps) {
  return (
    <Component
      className={cn(gridVariants({ cols, gap, align, justify }), className)}
      {...props}
    >
      {children}
    </Component>
  )
}

// Flexible Grid with custom breakpoints
interface FlexGridProps {
  children: React.ReactNode
  className?: string
  minWidth?: string
  maxCols?: number
  gap?: string | number
}

export function FlexGrid({
  children,
  className,
  minWidth = '250px',
  maxCols = 5,
  gap = '1rem',
}: FlexGridProps) {
  return (
    <div
      className={cn('grid', className)}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(min(${minWidth}, 100%), 1fr))`,
        gap: typeof gap === 'number' ? `${gap}px` : gap,
        maxWidth: maxCols ? `calc(${maxCols} * ${minWidth} + ${maxCols - 1} * ${gap})` : undefined,
      }}
    >
      {children}
    </div>
  )
}

// Masonry Grid Component
interface MasonryGridProps {
  children: React.ReactNode
  columns?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: number
  className?: string
}

export function MasonryGrid({
  children,
  columns = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = 16,
  className,
}: MasonryGridProps) {
  const columnClasses = [
    columns.xs && `columns-${columns.xs}`,
    columns.sm && `sm:columns-${columns.sm}`,
    columns.md && `md:columns-${columns.md}`,
    columns.lg && `lg:columns-${columns.lg}`,
    columns.xl && `xl:columns-${columns.xl}`,
  ].filter(Boolean).join(' ')

  return (
    <div
      className={cn(columnClasses, className)}
      style={{ columnGap: `${gap}px` }}
    >
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className="break-inside-avoid"
          style={{ marginBottom: `${gap}px` }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

// Stats Grid Component
interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
}: StatCardProps) {
  return (
    <div className={cn(
      'bg-white rounded-lg border border-gray-200 p-4 sm:p-6',
      'hover:shadow-md transition-shadow duration-200',
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">
            {value}
          </p>
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
          {trend && (
            <div className="mt-2 flex items-center text-sm">
              <span className={cn(
                'font-medium',
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              )}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="ml-2 text-gray-500">vs last period</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="ml-4 flex-shrink-0">
            <div className="p-3 bg-gray-50 rounded-lg">
              {icon}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Responsive Card Grid
interface CardGridProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'compact' | 'spacious'
}

export function CardGrid({
  children,
  className,
  variant = 'default',
}: CardGridProps) {
  const variantClasses = {
    default: 'gap-4 sm:gap-6',
    compact: 'gap-2 sm:gap-3',
    spacious: 'gap-6 sm:gap-8 lg:gap-10',
  }

  return (
    <div className={cn(
      'grid grid-cols-1',
      'sm:grid-cols-2',
      'lg:grid-cols-3',
      'xl:grid-cols-4',
      variantClasses[variant],
      className
    )}>
      {children}
    </div>
  )
}

// Feature Grid Component
interface FeatureCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  action?: React.ReactNode
  className?: string
}

export function FeatureCard({
  title,
  description,
  icon,
  action,
  className,
}: FeatureCardProps) {
  return (
    <div className={cn(
      'relative bg-white rounded-lg border border-gray-200',
      'p-6 hover:shadow-lg transition-all duration-200',
      'group hover:border-blue-200',
      className
    )}>
      {icon && (
        <div className="mb-4 inline-flex p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {action && (
        <div className="mt-auto">{action}</div>
      )}
    </div>
  )
}

// Responsive Container Component
interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: boolean
}

export function ResponsiveContainer({
  children,
  className,
  maxWidth = 'xl',
  padding = true,
}: ResponsiveContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
  }

  return (
    <div className={cn(
      'mx-auto',
      maxWidthClasses[maxWidth],
      padding && 'px-4 sm:px-6 lg:px-8',
      className
    )}>
      {children}
    </div>
  )
}