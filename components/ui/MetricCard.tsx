import { ReactNode } from 'react'
import clsx from 'clsx'

interface MetricCardProps {
  value: string | number
  label: string
  icon?: ReactNode
  color?: 'blue' | 'green' | 'purple' | 'red' | 'yellow' | 'gray'
  trend?: {
    value: number
    direction: 'up' | 'down'
  }
  className?: string
}

/**
 * Reusable metric card component for displaying KPIs and statistics
 */
export function MetricCard({
  value,
  label,
  icon,
  color = 'blue',
  trend,
  className,
}: MetricCardProps) {
  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    red: 'text-red-600',
    yellow: 'text-yellow-600',
    gray: 'text-gray-600',
  }

  return (
    <div
      className={clsx(
        'text-center p-4 border rounded-lg hover:shadow-md transition-shadow',
        className
      )}
    >
      <div className={clsx('text-3xl font-bold', colorClasses[color])}>
        {value}
      </div>
      {trend && (
        <div
          className={clsx(
            'text-sm mt-1',
            trend.direction === 'up' ? 'text-green-500' : 'text-red-500'
          )}
        >
          {trend.direction === 'up' ? '↑' : '↓'} {trend.value}%
        </div>
      )}
      <div className="text-sm text-gray-500 mt-1 flex items-center justify-center gap-1">
        {icon}
        {label}
      </div>
    </div>
  )
}
