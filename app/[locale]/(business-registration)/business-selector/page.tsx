'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Spin, Alert, Button, Dropdown } from 'antd'
import { useTranslations } from 'next-intl'
import { Building2, AlertCircle, LogOut } from 'lucide-react'
import type { MenuProps } from 'antd'
import { useMyBusiness } from '@/hooks/api/businesses/useMyBusiness'
import { BusinessCard } from './components/BusinessCard'
import { CreateBusinessCard } from './components/CreateBusinessCard'
import { EmptySlot } from './components/EmptySlot'
import { useCurrentUser } from '@/hooks/api/users/useCurrentUser'

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
  const params = useParams()
  const locale = params.locale as string

  // Use React Query hook for data fetching
  const { data: businessResponse, isLoading, error } = useMyBusiness()
  const { data: currentUser } = useCurrentUser()

  // Extract the first business from the paginated response
  const business = businessResponse?.data?.[0] || null

  const handleLogout = () => {
    router.push(`/${locale}/logout`)
  }

  // User menu items
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'user-info',
      label: (
        <div className="py-2 px-2">
          <p className="font-medium text-gray-900">{currentUser?.email}</p>
          <p className="text-sm text-gray-500 capitalize">
            {currentUser?.role} Account
          </p>
        </div>
      ),
      disabled: true,
    },
    {
      key: 'divider-1',
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogOut className="w-4 h-4" />,
      label: 'Logout',
      danger: true,
      onClick: handleLogout,
    },
  ]

  // Redirect based on business status
  useEffect(() => {
    if (!isLoading) {
      console.log('Business data:', business)
      console.log('Business approved status:', business?.approved)
      console.log('Business active status:', business?.active)

      // No business exists - go to registration
      if (!business && error?.response?.status === 404) {
        router.push('/business-registration')
      }
      // Removed automatic redirect for approved businesses to prevent loop
      // User must click on the business card to navigate
    }
  }, [isLoading, business, error, router])

  const handleSelectBusiness = (businessId: string) => {
    console.log('Business clicked:', businessId)
    console.log('Business data in handler:', business)
    console.log('Business approved:', business?.approved)

    // Store selected business in session/cookie
    localStorage.setItem('selectedBusinessId', businessId)

    // Check if business is approved (from the original business data, not the transformed one)
    if (business && business.approved) {
      console.log('Business is approved - navigating to dashboard')
      // Approved business - go to dashboard (even if not active)
      router.push('/business')
    } else {
      console.log('Business not approved - navigating to status page')
      // Not approved - go to waiting status page
      router.push('/business-registration/status')
    }
  }

  const handleCreateNew = () => {
    router.push('/business-registration')
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
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
          name: business.businessName, // Now using resolved business name
          status: business.approved
            ? business.active
              ? 'active'
              : 'suspended' // Approved but not active
            : 'pending', // Not approved yet
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
        {/* User Menu - Top Right */}
        <div className="absolute top-4 right-4">
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            trigger={['click']}
          >
            <Button
              type="text"
              className="flex items-center gap-2 hover:bg-gray-100"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                {currentUser?.firstName?.[0] || 'U'}
                {currentUser?.lastName?.[0] || ''}
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">
                {currentUser?.firstName} {currentUser?.lastName}
              </span>
            </Button>
          </Dropdown>
        </div>

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
          <CreateBusinessCard key="create-new" onClick={handleCreateNew} />

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
