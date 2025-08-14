'use client'

import { useEffect, useState } from 'react'
import { useUIStore } from '@/lib/stores/ui-store'

// Breakpoint values (mobile-first)
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export function useResponsive() {
  const setResponsiveState = useUIStore((state) => state.setResponsiveState)
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined
    height: number | undefined
  }>({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      const width = window.innerWidth
      const height = window.innerHeight
      
      setWindowSize({ width, height })
      
      // Update Zustand store with responsive states
      setResponsiveState({
        isMobile: width < BREAKPOINTS.md,
        isTablet: width >= BREAKPOINTS.md && width < BREAKPOINTS.lg,
        isDesktop: width >= BREAKPOINTS.lg,
      })
    }

    // Add event listener
    window.addEventListener('resize', handleResize)
    
    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [setResponsiveState])

  return {
    ...windowSize,
    isMobile: windowSize.width ? windowSize.width < BREAKPOINTS.md : false,
    isTablet: windowSize.width 
      ? windowSize.width >= BREAKPOINTS.md && windowSize.width < BREAKPOINTS.lg 
      : false,
    isDesktop: windowSize.width ? windowSize.width >= BREAKPOINTS.lg : false,
    
    // Utility functions
    isAbove: (breakpoint: keyof typeof BREAKPOINTS) => 
      windowSize.width ? windowSize.width >= BREAKPOINTS[breakpoint] : false,
    isBelow: (breakpoint: keyof typeof BREAKPOINTS) => 
      windowSize.width ? windowSize.width < BREAKPOINTS[breakpoint] : false,
  }
}

// Hook for media queries
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches)
    
    // Modern browsers
    if (media.addEventListener) {
      media.addEventListener('change', listener)
      return () => media.removeEventListener('change', listener)
    } else {
      // Fallback for older browsers
      media.addListener(listener)
      return () => media.removeListener(listener)
    }
  }, [matches, query])

  return matches
}