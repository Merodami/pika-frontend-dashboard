'use client'

import { useEffect } from 'react'
import { useUIStore } from './ui-store'

export function StoreHydration() {
  useEffect(() => {
    useUIStore.persist.rehydrate()
  }, [])

  return null
}
