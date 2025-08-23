import { useEffect, useState, RefObject } from 'react'

interface IntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
}

export function useIntersection(
  ref: RefObject<Element | null>,
  options: IntersectionObserverOptions = {}
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const target = ref.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      {
        threshold: options.threshold || 0,
        root: options.root || null,
        rootMargin: options.rootMargin || '0px',
      }
    )

    observer.observe(target)

    return () => {
      observer.unobserve(target)
      observer.disconnect()
    }
  }, [ref, options.threshold, options.root, options.rootMargin])

  return isIntersecting
}