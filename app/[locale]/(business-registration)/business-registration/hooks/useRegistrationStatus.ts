'use client'

import { useQuery } from '@tanstack/react-query'
import { businessPublic } from '@merodami/pika-api'

// API function to get registration status
async function getRegistrationStatus() {
  const response = await fetch('/api/businesses/registration/status', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Auth token is handled by middleware/cookies
    },
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch registration status')
  }

  const data = await response.json()

  // Validate response with schema
  return businessPublic.BusinessRegistrationStatusResponse.parse(data)
}

export function useRegistrationStatus() {
  return useQuery({
    queryKey: ['business-registration-status'],
    queryFn: getRegistrationStatus,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

// Helper hook to check if user needs registration
export function useNeedsRegistration() {
  const { data, isLoading, error } = useRegistrationStatus()

  return {
    needsRegistration: data?.needsRegistration ?? false,
    canAccessDashboard: data?.canAccessDashboard ?? false,
    currentStep: data?.currentStep ?? 0,
    registrationStatus: data?.registrationStatus,
    registrationId: data?.registrationId,
    businessId: data?.businessId,
    isLoading,
    error,
  }
}
