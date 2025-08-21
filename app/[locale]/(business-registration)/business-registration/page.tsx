'use client'

import { useEffect } from 'react'
import { Card, Alert, Spin } from 'antd'
import { AlertCircle, Building2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import { useNeedsRegistration } from './hooks/useRegistrationStatus'
import { useRegistrationStore } from './store/registrationStore'
import { StepIndicator } from './components/StepIndicator'
import { RegistrationWizard } from './components/RegistrationWizard'

export default function BusinessRegistrationPage() {
  const t = useTranslations('businessRegistration')
  const router = useRouter()

  // Check registration status
  const {
    needsRegistration,
    canAccessDashboard,
    isLoading: statusLoading,
    error: statusError,
  } = useNeedsRegistration()

  // Get registration store
  const { currentStep, completedSteps, status } = useRegistrationStore()

  // Progress loading is now handled by React Query hooks in components

  // Redirect if registration not needed
  useEffect(() => {
    if (!statusLoading && !needsRegistration && canAccessDashboard) {
      router.push('/dashboard')
    }
  }, [needsRegistration, canAccessDashboard, statusLoading, router])

  // Loading state
  if (statusLoading || status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" tip={t('messages.loading')} />
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
        <Spin size="large" tip={t('messages.redirecting')} />
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
