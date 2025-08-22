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
  userId: string | null // Track which user owns this data

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
  setUserId: (userId: string | null) => void

  // Save step data
  saveStep1Data: (data: Partial<Step1Data>) => void
  saveStep2Data: (data: Partial<Step2Data>) => void
  saveStep3Data: (data: Partial<Step3Data>) => void

  // Mark step as completed
  markStepCompleted: (step: number) => void
  
  // Set completed steps from backend
  setCompletedSteps: (steps: number[]) => void

  // Navigation helpers
  canGoToStep: (step: number) => boolean
  goToNextStep: () => void
  goToPreviousStep: () => void

  // Reset store
  reset: () => void
  
  // Initialize store based on persisted data
  initializeStep: () => void
  
  // Check and reset if different user
  checkAndResetForUser: (currentUserId: string) => void
}

const initialState = {
  currentStep: 1,
  registrationId: null,
  status: 'idle' as const,
  error: null,
  userId: null,
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
        setUserId: (userId) => set({ userId }),

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

        // Set completed steps from backend
        setCompletedSteps: (steps) => set({ completedSteps: steps.sort() }),

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

        // Initialize step based on completed steps
        initializeStep: () => {
          const state = get()
          // If all 3 steps are completed, go to review step (4)
          if (state.completedSteps.includes(1) && 
              state.completedSteps.includes(2) && 
              state.completedSteps.includes(3)) {
            set({ currentStep: 4 })
          }
          // If steps 1 and 2 are completed, go to step 3
          else if (state.completedSteps.includes(1) && 
                   state.completedSteps.includes(2)) {
            set({ currentStep: 3 })
          }
          // If step 1 is completed, go to step 2
          else if (state.completedSteps.includes(1)) {
            set({ currentStep: 2 })
          }
          // Otherwise stay on step 1
          else {
            set({ currentStep: 1 })
          }
        },
        
        // Check and reset if different user
        checkAndResetForUser: (currentUserId) => {
          const state = get()
          // If the userId in the store doesn't match the current user, reset everything
          if (state.userId && state.userId !== currentUserId) {
            set(initialState)
          }
          // Update the userId to the current user
          set({ userId: currentUserId })
        },
      }),
      {
        name: 'business-registration-store',
        // Persist form data, completed steps, and current step
        partialize: (state) => ({
          currentStep: state.currentStep,
          step1Data: state.step1Data,
          step2Data: state.step2Data,
          step3Data: state.step3Data,
          completedSteps: state.completedSteps,
          registrationId: state.registrationId,
          userId: state.userId, // Also persist userId to detect user changes
        }),
      }
    )
  )
)
