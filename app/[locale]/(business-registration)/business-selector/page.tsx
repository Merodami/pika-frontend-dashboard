'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Spin, Alert } from 'antd'
import { useTranslations } from 'next-intl'
import { Building2, AlertCircle } from 'lucide-react'
import { useMyBusiness } from '@/hooks/api/businesses/useMyBusiness'
import { BusinessCard } from './components/BusinessCard'
import { CreateBusinessCard } from './components/CreateBusinessCard'
import { EmptySlot } from './components/EmptySlot'

interface Business {
  id: string
  name: string
  status: 'active' | 'pending' | 'suspended'
  lastActivity?: string
  logo?: string
}

export default function BusinessSelectorPage() {
  const t = useTranslations()
  const router = useRouter()

  // Use React Query hook for data fetching
  const { data: business, isLoading, error } = useMyBusiness()

  // Redirect to registration if no business exists
  useEffect(() => {
    if (!isLoading && !business && error?.response?.status === 404) {
      router.push('/business-registration')
    }
  }, [isLoading, business, error, router])

  const handleSelectBusiness = (businessId: string) => {
    // Store selected business in session/cookie
    localStorage.setItem('selectedBusinessId', businessId)
    router.push('/dashboard')
  }

  const handleCreateNew = () => {
    router.push('/business-registration')
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" tip={t('businessSelector.loading')} />
      </div>
    )
  }

  // Error state (other than 404)
  if (error && error?.response?.status !== 404) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert
          type="error"
          message={t('businessSelector.errorLoading')}
          description={error.message}
          showIcon
          icon={<AlertCircle />}
        />
      </div>
    )
  }

  // Transform business data for display
  const businesses: Business[] = business
    ? [
        {
          id: business.id,
          name: business.businessNameKey, // This might need translation
          status: business.active ? 'active' : ('pending' as const),
          lastActivity: business.updatedAt,
        },
      ]
    : []

  // Calculate how many empty slots to show (always show at least 6 total slots)
  const totalSlots = 6
  const emptySlots = Math.max(0, totalSlots - businesses.length - 1) // -1 for create card

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {businesses.length > 0
              ? t('businessSelector.title.select')
              : t('businessSelector.title.create')}
          </h1>
          <p className="text-gray-600">
            {businesses.length > 0
              ? t('businessSelector.subtitle.select')
              : t('businessSelector.subtitle.create')}
          </p>
        </div>

        {/* Business Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Existing businesses */}
          {businesses.map((biz) => (
            <BusinessCard
              key={biz.id}
              business={biz}
              onSelect={handleSelectBusiness}
              isSelected={false}
            />
          ))}

          {/* Create new business card */}
          <CreateBusinessCard onClick={handleCreateNew} />

          {/* Empty slots for visual balance */}
          {Array.from({ length: emptySlots }).map((_, index) => (
            <EmptySlot key={`empty-${index}`} />
          ))}
        </div>

        {/* Footer info */}
        {businesses.length > 0 && (
          <div className="mt-12 text-center text-sm text-gray-500">
            {t('businessSelector.info.multipleBusinesses')}
          </div>
        )}
      </div>
    </div>
  )
}
