'use server'

import { updateUserProfile } from '@/lib/api/orval-client'
import type { UpdateUserProfileBody } from '@/lib/api/orval-client'

export async function updateUserLanguage(language: string) {
  try {
    const result = await updateUserProfile({
      preferredLanguage: language.toLowerCase()
    })
    return { success: true, data: result }
  } catch (error) {
    console.error('Failed to update language preference:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update language' 
    }
  }
}

export async function updateProfile(data: UpdateUserProfileBody) {
  try {
    const result = await updateUserProfile(data)
    return { success: true, data: result }
  } catch (error) {
    console.error('Failed to update profile:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update profile' 
    }
  }
}