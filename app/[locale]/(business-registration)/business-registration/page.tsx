'use client'

import { useEffect } from 'react'
import { Card, Alert, Spin } from 'antd'
import { AlertCircle, Building2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import { useCurrentUser } from '@/hooks/api/users/useCurrentUser'
import { useRegistrationStatus } from '@/hooks/api/businesses/useBusinessRegistration'
import { useRegistrationStore } from './store/registrationStore'
import { StepIndicator } from './components/StepIndicator'
import { RegistrationWizard } from './components/RegistrationWizard'

export default function BusinessRegistrationPage() {
  const t = useTranslations('businessRegistration')
  const router = useRouter()

  // Get current user to check for user changes
  const { data: currentUser } = useCurrentUser()

  // Check registration status
  const {
    data: registrationStatus,
    isLoading: statusLoading,
    error: statusError,
  } = useRegistrationStatus()
  
  const needsRegistration = registrationStatus?.needsRegistration ?? false
  const canAccessDashboard = registrationStatus?.canAccessDashboard ?? false

  // Get registration store
  const { currentStep, completedSteps, status, checkAndResetForUser, reset } =
    useRegistrationStore()

  // Check if user has changed and reset store if needed
  useEffect(() => {
    if (currentUser?.id) {
      checkAndResetForUser(currentUser.id)
    }
  }, [currentUser?.id, checkAndResetForUser])

  // Reset store when starting fresh registration
  useEffect(() => {
    if (needsRegistration && statusLoading === false) {
      // If backend says we need registration but we have old data, clear it
      const state = useRegistrationStore.getState()
      if (state.registrationId && !currentUser?.id) {
        reset()
      }
    }
  }, [needsRegistration, statusLoading, currentUser?.id, reset])

  // Progress loading is now handled by React Query hooks in components

  // Redirect if registration not needed
  useEffect(() => {
    if (!statusLoading && !needsRegistration) {
      if (canAccessDashboard) {
        // Registration approved - go to business dashboard
        router.push('/business')
      } else {
        // Registration submitted but not approved - show waiting page
        router.push('/business-registration/status')
      }
    }
  }, [needsRegistration, canAccessDashboard, statusLoading, router])

  // Loading state
  if (statusLoading || status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    )
  }

  // Error state
  if (statusError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert
          type="error"
          message={t('messages.errorLoading')}
          description={statusError.message}
          showIcon
          icon={<AlertCircle />}
        />
      </div>
    )
  }

  // If they don't need registration, show loading while redirecting
  if (!needsRegistration) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('title')}
          </h1>
          <p className="text-gray-600">{t('subtitle')}</p>
        </div>

        {/* Mandatory Notice */}
        <Alert
          type="info"
          message={t('mandatory')}
          description={t('cannotSkip')}
          showIcon
          className="mb-6"
        />

        {/* Progress Indicator */}
        <StepIndicator
          currentStep={currentStep}
          completedSteps={completedSteps}
        />

        {/* Main Registration Card */}
        <Card className="shadow-xl border-0">
          <RegistrationWizard />
        </Card>
      </div>
    </div>
  )
}
