import { useQueryClient } from '@tanstack/react-query'
import { useApiQuery } from '../base/useApiQuery'
import { useApiMutation } from '../base/useApiMutation'
import { queryKeys } from '@/lib/api/queryKeys'
import { customInstance } from '@/lib/api/orval-generated/custom-instance'
import { businessPublic } from '@merodami/pika-api'
import type { z } from 'zod'

// Type imports from API package
type BusinessRegistrationStatusResponse = z.infer<
  typeof businessPublic.BusinessRegistrationStatusResponse
>
type StartRegistrationResponse = z.infer<
  typeof businessPublic.StartRegistrationResponse
>
type RegistrationProgressResponse = z.infer<
  typeof businessPublic.RegistrationProgressResponse
>
type SubmitRegistrationStepResponse = z.infer<
  typeof businessPublic.SubmitRegistrationStepResponse
>
type CompleteBusinessRegistrationRequest = z.infer<
  typeof businessPublic.CompleteBusinessRegistrationRequest
>
type CompleteBusinessRegistrationResponse = z.infer<
  typeof businessPublic.CompleteBusinessRegistrationResponse
>
type Step1Request = z.infer<
  typeof businessPublic.BusinessRegistrationStep1Request
>
type Step2Request = z.infer<
  typeof businessPublic.BusinessRegistrationStep2Request
>
type Step3Request = z.infer<
  typeof businessPublic.BusinessRegistrationStep3Request
>

// Add registration keys to query keys
const registrationKeys = {
  all: () => [...queryKeys.businesses.all(), 'registration'] as const,
  status: () => [...registrationKeys.all(), 'status'] as const,
  progress: () => [...registrationKeys.all(), 'progress'] as const,
}

/**
 * Check if user needs business registration
 */
export function useRegistrationStatus() {
  return useApiQuery<BusinessRegistrationStatusResponse>({
    queryKey: registrationKeys.status(),
    queryFn: async () => {
      const response = await customInstance<BusinessRegistrationStatusResponse>(
        {
          url: '/businesses/registration/status',
          method: 'GET',
        }
      )
      return response
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

/**
 * Get saved registration progress
 */
export function useRegistrationProgress() {
  return useApiQuery<RegistrationProgressResponse>({
    queryKey: registrationKeys.progress(),
    queryFn: async () => {
      const response = await customInstance<RegistrationProgressResponse>({
        url: '/businesses/registration/progress',
        method: 'GET',
      })
      return response
    },
  })
}

/**
 * Start business registration
 */
export function useStartRegistration() {
  const queryClient = useQueryClient()

  return useApiMutation<StartRegistrationResponse, Error, void>({
    mutationFn: async () => {
      const response = await customInstance<StartRegistrationResponse>({
        url: '/businesses/registration/start',
        method: 'POST',
      })
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: registrationKeys.all(),
      })
    },
  })
}

/**
 * Submit registration step 1 - Business Information
 */
export function useSubmitStep1() {
  const queryClient = useQueryClient()

  return useApiMutation<SubmitRegistrationStepResponse, Error, Step1Request>({
    mutationFn: async (data) => {
      const response = await customInstance<SubmitRegistrationStepResponse>({
        url: '/businesses/registration/step1',
        method: 'POST',
        data,
      })
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: registrationKeys.progress(),
      })
    },
  })
}

/**
 * Submit registration step 2 - Contact Details
 */
export function useSubmitStep2() {
  const queryClient = useQueryClient()

  return useApiMutation<SubmitRegistrationStepResponse, Error, Step2Request>({
    mutationFn: async (data) => {
      const response = await customInstance<SubmitRegistrationStepResponse>({
        url: '/businesses/registration/step2',
        method: 'POST',
        data,
      })
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: registrationKeys.progress(),
      })
    },
  })
}

/**
 * Submit registration step 3 - Additional Information
 */
export function useSubmitStep3() {
  const queryClient = useQueryClient()

  return useApiMutation<SubmitRegistrationStepResponse, Error, Step3Request>({
    mutationFn: async (data) => {
      const response = await customInstance<SubmitRegistrationStepResponse>({
        url: '/businesses/registration/step3',
        method: 'POST',
        data,
      })
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: registrationKeys.progress(),
      })
    },
  })
}

/**
 * Complete business registration
 */
export function useCompleteRegistration() {
  const queryClient = useQueryClient()

  return useApiMutation<
    CompleteBusinessRegistrationResponse,
    Error,
    CompleteBusinessRegistrationRequest
  >({
    mutationFn: async (data) => {
      const response =
        await customInstance<CompleteBusinessRegistrationResponse>({
          url: '/businesses/registration/complete',
          method: 'POST',
          data,
        })
      return response
    },
    successMessage: 'Business registration completed successfully!',
    onSuccess: () => {
      // Invalidate all registration and business queries
      queryClient.invalidateQueries({
        queryKey: registrationKeys.all(),
      })
      queryClient.invalidateQueries({
        queryKey: registrationKeys.status(),
      })
      queryClient.invalidateQueries({
        queryKey: registrationKeys.progress(),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.businesses.all(),
      })
      // Also invalidate the old query key used by the page
      queryClient.invalidateQueries({
        queryKey: ['business-registration-status'],
      })
      // The backend will handle setting any necessary cookies/session data
      // The registration status will be updated via the API
    },
  })
}
