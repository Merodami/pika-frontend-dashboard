'use client'

import { useEffect } from 'react'
import { message } from 'antd'
import { useTranslations } from 'next-intl'

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
        registrationStatus.currentStep === 0 &&
        !startRegistrationMutation.isPending &&
        !startRegistrationMutation.isSuccess
      ) {
        // Reset store for fresh registration only once
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
        registrationStatus.currentStep > 0 &&
        registrationStatus.currentStep > currentStep &&
        !completeRegistrationMutation.isSuccess
      ) {
        // If registration is in progress, sync with backend's current step
        // Only sync if backend is AHEAD of local step (not behind)
        // Don't sync if registration was just completed
        console.log('Syncing currentStep from backend:', registrationStatus.currentStep)
        setCurrentStep(registrationStatus.currentStep)
      }
    }
  }, [
    registrationStatus,
    statusLoading,
    currentStep,
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
    console.log('handleStepComplete called! Current step:', currentStep)
    if (currentStep < 4) {
      console.log('Calling goToNextStep...')
      goToNextStep()
      console.log('goToNextStep called')
    } else {
      console.log('Already at step 4, not advancing')
    }
  }

  // Handle final submission
  const handleFinalSubmit = async () => {
    console.log('handleFinalSubmit called')
    completeRegistrationMutation.mutate(
      { confirmAllDataAccurate: true, agreedToTerms: true }, // Add required fields for final submit
      {
        onSuccess: () => {
          console.log('Final submission successful!')
          try {
            message.success(
              t('businessRegistration.messages.registrationComplete')
            )
          } catch (e) {
            console.log('Message notification failed:', e)
          }
          
          // Don't manually redirect - let the page-level logic handle it
          // when needsRegistration becomes false
          console.log('Registration completed, page will handle redirect')
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
        return <ContactDetailsStep onComplete={handleStepComplete} onPrevious={goToPreviousStep} />
      case 3:
        return <AdditionalInfoStep onComplete={handleStepComplete} onPrevious={goToPreviousStep} />
      case 4:
        return <ReviewStep onSubmit={handleFinalSubmit} onPrevious={goToPreviousStep} />
      default:
        return null
    }
  }

  console.log('RegistrationWizard render - currentStep:', currentStep, 'completedSteps:', completedSteps)

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

      {/* Progress indicator only */}
      <div className="flex justify-center items-center pt-6 border-t">
        <div className="text-sm text-gray-500">
          {t('businessRegistration.progress', {
            current: currentStep,
            total: 4,
          })}
        </div>
      </div>
    </div>
  )
}
