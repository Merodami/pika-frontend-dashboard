'use client'

import { Card } from 'antd'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface CreateBusinessCardProps {
  onClick: () => void
}

export function CreateBusinessCard({ onClick }: CreateBusinessCardProps) {
  const t = useTranslations('businessSelector')

  return (
    <Card
      hoverable
      className={cn(
        'h-full transition-all duration-200 cursor-pointer',
        'hover:shadow-lg hover:scale-105',
        'border-2 border-dashed border-gray-300',
        'hover:border-blue-500 hover:bg-blue-50/50'
      )}
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center">
        <div className="mb-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto transition-colors duration-200 hover:bg-blue-200">
            <Plus className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <h3 className="font-semibold text-gray-900 text-lg mb-2">
          {t('createNew.title')}
        </h3>

        <p className="text-sm text-gray-500 max-w-[200px]">
          {t('createNew.description')}
        </p>
      </div>
    </Card>
  )
}
