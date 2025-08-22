'use client'

import { useEffect, useState } from 'react'
import { Button, message } from 'antd'
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import { useRegistrationStore } from '../store/registrationStore'
import {
  useStartRegistration,
  useCompleteRegistration,
  useRegistrationStatus,
  useRegistrationProgress,
} from '@/hooks/api/businesses/useBusinessRegistration'
import { BusinessInfoStep } from './steps/BusinessInfoStep'
import { ContactDetailsStep } from './steps/ContactDetailsStep'
import { AdditionalInfoStep } from './steps/AdditionalInfoStep'
import { ReviewStep } from './steps/ReviewStep'

export function RegistrationWizard() {
  const t = useTranslations()
  const router = useRouter()
  const [isSubmitting] = useState(false)

  const {
    currentStep,
    completedSteps,
    goToNextStep,
    goToPreviousStep,
    setCurrentStep,
    initializeStep,
    setCompletedSteps,
  } = useRegistrationStore()

  // React Query hooks for API calls
  const { data: registrationStatus, isLoading: statusLoading } =
    useRegistrationStatus()
  const { data: registrationProgress, isLoading: progressLoading } =
    useRegistrationProgress()
  const startRegistrationMutation = useStartRegistration()
  const completeRegistrationMutation = useCompleteRegistration()

  // Sync frontend state with backend state
  useEffect(() => {
    if (!statusLoading && registrationStatus) {
      if (
        registrationStatus.needsRegistration &&
        registrationStatus.currentStep === 0
      ) {
        // Reset store for fresh registration
        const { reset } = useRegistrationStore.getState()
        reset()

        // If registration needs to be started, start it
        startRegistrationMutation.mutate(undefined, {
          onSuccess: () => {
            setCurrentStep(1)
          },
          onError: (error) => {
            console.error('Failed to start registration:', error)
            message.error(t('businessRegistration.messages.errorStarting'))
          },
        })
      } else if (
        registrationStatus.needsRegistration &&
        registrationStatus.currentStep > 0
      ) {
        // If registration is in progress, sync with backend's current step
        setCurrentStep(registrationStatus.currentStep)
      }
    }
  }, [
    registrationStatus,
    statusLoading,
    setCurrentStep,
    t,
    startRegistrationMutation,
  ])

  // Sync completed steps with backend progress
  useEffect(() => {
    if (!progressLoading && registrationProgress) {
      setCompletedSteps(registrationProgress.stepsCompleted)
    }
  }, [registrationProgress, progressLoading, setCompletedSteps])

  // Initialize step based on persisted data only if we don't have backend status yet
  useEffect(() => {
    if (statusLoading) {
      initializeStep()
    }
  }, [initializeStep, statusLoading])

  // Handle step submission
  const handleStepComplete = async () => {
    if (currentStep < 4) {
      goToNextStep()
    }
  }

  // Handle final submission
  const handleFinalSubmit = async () => {
    completeRegistrationMutation.mutate(
      { confirmAllDataAccurate: true, agreedToTerms: true }, // Add required fields for final submit
      {
        onSuccess: () => {
          message.success(
            t('businessRegistration.messages.registrationComplete')
          )

          // Reset the store after successful registration
          const { reset } = useRegistrationStore.getState()
          reset()

          // Redirect to status page to wait for approval
          setTimeout(() => {
            router.push('/business-registration/status')
          }, 2000)
        },
        onError: (error) => {
          console.error('Failed to complete registration:', error)
          message.error(t('businessRegistration.messages.errorSubmitting'))
        },
      }
    )
  }

  // Render current step component
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BusinessInfoStep onComplete={handleStepComplete} />
      case 2:
        return <ContactDetailsStep onComplete={handleStepComplete} />
      case 3:
        return <AdditionalInfoStep onComplete={handleStepComplete} />
      case 4:
        return <ReviewStep onSubmit={handleFinalSubmit} />
      default:
        return null
    }
  }

  // Check if current step is complete
  const isCurrentStepComplete = completedSteps.includes(currentStep)
  const canProceed = currentStep === 4 ? true : isCurrentStepComplete

  return (
    <div className="space-y-6">
      {/* Error display */}
      {(startRegistrationMutation.error ||
        completeRegistrationMutation.error) && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {startRegistrationMutation.error?.message ||
            completeRegistrationMutation.error?.message}
        </div>
      )}

      {/* Step content */}
      <div className="min-h-[400px]">{renderStep()}</div>

      {/* Navigation buttons */}
      <div className="flex justify-between items-center pt-6 border-t">
        <Button
          size="large"
          icon={<ArrowLeft className="w-4 h-4" />}
          onClick={goToPreviousStep}
          disabled={currentStep === 1 || status === 'submitting'}
        >
          {t('common.button.previous')}
        </Button>

        <div className="text-sm text-gray-500">
          {t('businessRegistration.progress', {
            current: currentStep,
            total: 4,
          })}
        </div>

        {currentStep < 4 ? (
          <Button
            type="primary"
            size="large"
            icon={<ArrowRight className="w-4 h-4" />}
            onClick={handleStepComplete}
            disabled={!canProceed || status === 'submitting'}
            loading={status === 'submitting'}
          >
            {t('common.button.next')}
          </Button>
        ) : (
          <Button
            type="primary"
            size="large"
            icon={
              isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )
            }
            onClick={handleFinalSubmit}
            disabled={!canProceed || isSubmitting}
            loading={isSubmitting}
          >
            {t('common.button.submit')}
          </Button>
        )}
      </div>
    </div>
  )
}
