'use client'

import { Card, Tag } from 'antd'
import { Building2, Calendar, CheckCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

interface BusinessCardProps {
  business: {
    id: string
    name: string
    status: 'active' | 'pending' | 'suspended'
    lastActivity?: string
    logo?: string
  }
  onSelect: (id: string) => void
  isSelected?: boolean
}

export function BusinessCard({
  business,
  onSelect,
  isSelected,
}: BusinessCardProps) {
  const t = useTranslations('businessSelector')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'pending':
        return 'warning'
      case 'suspended':
        return 'error'
      default:
        return 'default'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return t('status.active')
      case 'pending':
        return t('status.pending')
      case 'suspended':
        return t('status.suspended')
      default:
        return status
    }
  }

  return (
    <Card
      hoverable
      className={cn(
        'h-full transition-all duration-200 cursor-pointer',
        'hover:shadow-lg hover:scale-105',
        isSelected && 'ring-2 ring-blue-500 ring-offset-2'
      )}
      onClick={() => onSelect(business.id)}
    >
      <div className="flex flex-col h-full">
        {/* Header with logo/icon */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {business.logo ? (
              <img
                src={business.logo}
                alt={business.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-lg line-clamp-1">
                {business.name}
              </h3>
            </div>
          </div>
          {isSelected && (
            <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
          )}
        </div>

        {/* Status */}
        <div className="mb-4">
          <Tag color={getStatusColor(business.status)}>
            {getStatusText(business.status)}
          </Tag>
        </div>

        {/* Last activity */}
        {business.lastActivity && (
          <div className="mt-auto pt-4 border-t border-gray-100">
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="w-3 h-3 mr-1" />
              <span>{t('lastActivity')}: </span>
              <span className="ml-1 font-medium">
                {format(new Date(business.lastActivity), 'MMM dd, yyyy')}
              </span>
            </div>
          </div>
        )}

        {/* Active indicator */}
        {business.status === 'active' && (
          <div className="absolute top-2 right-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
        )}
      </div>
    </Card>
  )
}
