'use client'

import { ReactNode } from 'react'
import { Button, Tooltip } from 'antd'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export interface ActionItem {
  key: string
  label: string
  icon?: ReactNode
  onClick?: () => void
  type?: 'default' | 'primary' | 'text' | 'link' | 'dashed'
  danger?: boolean
  disabled?: boolean
  tooltip?: string
  loading?: boolean
  badge?: number | string
}

export interface BreadcrumbItem {
  label: string
  path?: string
  onClick?: () => void
}

interface ContextActionBarProps {
  breadcrumbs?: BreadcrumbItem[]
  actions?: ActionItem[]
  className?: string
  sticky?: boolean
}

export function ContextActionBar({
  breadcrumbs,
  actions,
  className,
  sticky = true,
}: ContextActionBarProps) {
  return (
    <div
      className={cn(
        'h-12 bg-white border-b border-gray-200 flex items-center',
        sticky && 'sticky top-0 z-20',
        className
      )}
    >
      <div className="w-full flex items-center justify-between px-4">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="flex items-center h-full">
            {breadcrumbs.map((item, index) => (
              <div key={index} className="flex items-center h-full">
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                )}
                {item.onClick ? (
                  <button
                    onClick={item.onClick}
                    className="text-sm text-gray-600 hover:text-primary transition-colors py-1"
                  >
                    {item.label}
                  </button>
                ) : (
                  <span className="text-sm text-gray-900 font-medium py-1">{item.label}</span>
                )}
              </div>
            ))}
          </div>
        )}

        {actions && actions.length > 0 && (
          <div className="flex items-center gap-2 h-full">
            {actions.map((action) => {
              const button = (
                <Button
                  key={action.key}
                  type={action.type || 'default'}
                  icon={action.icon}
                  onClick={action.onClick}
                  danger={action.danger}
                  disabled={action.disabled}
                  loading={action.loading}
                  size="small"
                >
                  {action.label}
                  {action.badge && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
                      {action.badge}
                    </span>
                  )}
                </Button>
              )

              return action.tooltip ? (
                <Tooltip key={action.key} title={action.tooltip}>
                  {button}
                </Tooltip>
              ) : (
                button
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}