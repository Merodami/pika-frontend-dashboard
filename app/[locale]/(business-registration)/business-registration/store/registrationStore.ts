'use client'

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { businessPublic } from '@merodami/pika-api'
import { z } from 'zod'

// Note: This store handles UI state only.
// API calls are handled by React Query hooks in the components

// Type definitions from API schemas
type Step1Data = z.infer<typeof businessPublic.BusinessRegistrationStep1Request>
type Step2Data = z.infer<typeof businessPublic.BusinessRegistrationStep2Request>
type Step3Data = z.infer<typeof businessPublic.BusinessRegistrationStep3Request>

interface RegistrationState {
  // Current state
  currentStep: number
  registrationId: string | null
  status: 'idle' | 'loading' | 'error' | 'success' | 'submitting'
  error: string | null

  // Form data for each step
  step1Data: Partial<Step1Data> | null
  step2Data: Partial<Step2Data> | null
  step3Data: Partial<Step3Data> | null

  // Completed steps tracking
  completedSteps: number[]

  // Actions
  setCurrentStep: (step: number) => void
  setRegistrationId: (id: string) => void
  setStatus: (status: RegistrationState['status']) => void
  setError: (error: string | null) => void

  // Save step data
  saveStep1Data: (data: Partial<Step1Data>) => void
  saveStep2Data: (data: Partial<Step2Data>) => void
  saveStep3Data: (data: Partial<Step3Data>) => void

  // Mark step as completed
  markStepCompleted: (step: number) => void

  // Navigation helpers
  canGoToStep: (step: number) => boolean
  goToNextStep: () => void
  goToPreviousStep: () => void

  // Reset store
  reset: () => void
}

const initialState = {
  currentStep: 1,
  registrationId: null,
  status: 'idle' as const,
  error: null,
  step1Data: null,
  step2Data: null,
  step3Data: null,
  completedSteps: [],
}

export const useRegistrationStore = create<RegistrationState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // Basic setters
        setCurrentStep: (step) => set({ currentStep: step }),
        setRegistrationId: (id) => set({ registrationId: id }),
        setStatus: (status) => set({ status }),
        setError: (error) => set({ error, status: error ? 'error' : 'idle' }),

        // Save step data
        saveStep1Data: (data) => set({ step1Data: data }),
        saveStep2Data: (data) => set({ step2Data: data }),
        saveStep3Data: (data) => set({ step3Data: data }),

        // Mark step completed
        markStepCompleted: (step) =>
          set((state) => ({
            completedSteps: [
              ...new Set([...state.completedSteps, step]),
            ].sort(),
          })),

        // Navigation
        canGoToStep: (step) => {
          const state = get()
          // Can always go to step 1
          if (step === 1) return true
          // Can only go to a step if the previous step is completed
          return state.completedSteps.includes(step - 1)
        },

        goToNextStep: () => {
          const state = get()
          const nextStep = Math.min(state.currentStep + 1, 4) // 4 is review step
          if (state.canGoToStep(nextStep)) {
            set({ currentStep: nextStep })
          }
        },

        goToPreviousStep: () =>
          set((state) => ({
            currentStep: Math.max(state.currentStep - 1, 1),
          })),

        // Reset store
        reset: () => set(initialState),
      }),
      {
        name: 'business-registration-store',
        // Only persist form data, not status
        partialize: (state) => ({
          step1Data: state.step1Data,
          step2Data: state.step2Data,
          step3Data: state.step3Data,
          completedSteps: state.completedSteps,
          registrationId: state.registrationId,
        }),
      }
    )
  )
)
