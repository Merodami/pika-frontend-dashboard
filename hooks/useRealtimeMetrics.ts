import { useEffect, useState, useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'

interface MetricUpdate {
  id: string
  value: number | string
  delta?: number
  timestamp: Date
}

interface RealtimeConfig {
  endpoint?: string
  interval?: number
  enableSSE?: boolean
}

export function useRealtimeMetrics(config: RealtimeConfig = {}) {
  const {
    endpoint = '/api/metrics/stream',
    interval = 5000,
    enableSSE = false,
  } = config

  const queryClient = useQueryClient()
  const [isConnected, setIsConnected] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [metrics, setMetrics] = useState<Record<string, MetricUpdate>>({})

  // Server-Sent Events for real-time updates
  useEffect(() => {
    if (!enableSSE) return

    const eventSource = new EventSource(endpoint)

    eventSource.onopen = () => {
      setIsConnected(true)
      console.log('Connected to real-time metrics stream')
    }

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as MetricUpdate

        setMetrics((prev) => ({
          ...prev,
          [data.id]: data,
        }))

        setLastUpdate(new Date())

        // Update React Query cache
        queryClient.setQueryData(['metrics', data.id], data)
      } catch (error) {
        console.error('Failed to parse metric update:', error)
      }
    }

    eventSource.onerror = () => {
      setIsConnected(false)
      console.error('Lost connection to metrics stream')

      // Attempt to reconnect after 5 seconds
      setTimeout(() => {
        eventSource.close()
      }, 5000)
    }

    return () => {
      eventSource.close()
      setIsConnected(false)
    }
  }, [enableSSE, endpoint, queryClient])

  // Polling fallback for environments without SSE
  useEffect(() => {
    if (enableSSE) return

    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/metrics')
        if (!response.ok) throw new Error('Failed to fetch metrics')

        const data = await response.json()

        setMetrics(data)
        setLastUpdate(new Date())
        setIsConnected(true)

        // Update React Query cache
        Object.entries(data).forEach(([key, value]) => {
          queryClient.setQueryData(['metrics', key], value)
        })
      } catch (error) {
        console.error('Failed to fetch metrics:', error)
        setIsConnected(false)
      }
    }

    fetchMetrics()
    const intervalId = setInterval(fetchMetrics, interval)

    return () => clearInterval(intervalId)
  }, [enableSSE, interval, queryClient])

  const refetch = useCallback(async () => {
    try {
      const response = await fetch('/api/metrics')
      if (!response.ok) throw new Error('Failed to fetch metrics')

      const data = await response.json()
      setMetrics(data)
      setLastUpdate(new Date())

      return data
    } catch (error) {
      console.error('Failed to refetch metrics:', error)
      throw error
    }
  }, [])

  return {
    metrics,
    isConnected,
    lastUpdate,
    refetch,
  }
}

// Hook for simulated real-time data (for demo purposes)
export function useSimulatedRealtimeData<T>(
  generator: () => T,
  interval: number = 5000
) {
  const [data, setData] = useState<T>(generator())
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsUpdating(true)

      setTimeout(() => {
        setData(generator())
        setIsUpdating(false)
      }, 300) // Simulate network delay
    }, interval)

    return () => clearInterval(intervalId)
  }, [generator, interval])

  const refresh = useCallback(() => {
    setIsUpdating(true)
    setTimeout(() => {
      setData(generator())
      setIsUpdating(false)
    }, 300)
  }, [generator])

  return { data, isUpdating, refresh }
}
