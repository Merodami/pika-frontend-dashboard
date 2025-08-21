/**
 * Simple API debugging helpers for development
 * These are exposed to the browser console in development mode
 */

interface ApiLog {
  timestamp: string
  method: string
  url: string
  status?: number
  duration?: string
  correlationId?: string
  error?: string
  body?: any
  response?: any
}

class ApiDebugger {
  private logs: ApiLog[] = []
  private enabled: boolean = true

  constructor() {
    if (
      typeof window !== 'undefined' &&
      process.env.NODE_ENV === 'development'
    ) {
      console.log(
        '%c🔍 API Debugger Ready',
        'background: #3b82f6; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;'
      )
      console.log('Commands:')
      console.log('  apiDebug.show()     - Show recent API calls')
      console.log('  apiDebug.clear()    - Clear API logs')
      console.log('  apiDebug.filter()   - Filter by status code')
      console.log('  apiDebug.errors()   - Show only errors')
      console.log('  apiDebug.slow()     - Show slow requests (>1s)')
      console.log('  apiDebug.toggle()   - Toggle logging on/off')
    }
  }

  addLog(log: ApiLog) {
    if (!this.enabled) return

    this.logs.push(log)
    // Keep only last 100 logs
    if (this.logs.length > 100) {
      this.logs.shift()
    }
  }

  show(count: number = 20) {
    const recent = this.logs.slice(-count)
    console.table(recent)
    return recent
  }

  clear() {
    this.logs = []
    console.log('✅ API logs cleared')
  }

  filter(statusCode?: number) {
    const filtered = statusCode
      ? this.logs.filter((log) => log.status === statusCode)
      : this.logs
    console.table(filtered)
    return filtered
  }

  errors() {
    const errors = this.logs.filter(
      (log) => (log.status && log.status >= 400) || log.error
    )
    console.table(errors)
    return errors
  }

  slow(thresholdMs: number = 1000) {
    const slowRequests = this.logs.filter((log) => {
      if (!log.duration) return false
      const ms = parseInt(log.duration)
      return ms > thresholdMs
    })
    console.table(slowRequests)
    return slowRequests
  }

  toggle() {
    this.enabled = !this.enabled
    console.log(`API logging ${this.enabled ? 'enabled' : 'disabled'}`)
    return this.enabled
  }

  stats() {
    const total = this.logs.length
    const errors = this.logs.filter(
      (log) => (log.status && log.status >= 400) || log.error
    ).length
    const avgDuration =
      this.logs.reduce((sum, log) => {
        return sum + (log.duration ? parseInt(log.duration) : 0)
      }, 0) / (total || 1)

    const stats = {
      totalRequests: total,
      errors,
      successRate: `${(((total - errors) / (total || 1)) * 100).toFixed(1)}%`,
      avgDuration: `${avgDuration.toFixed(0)}ms`,
    }

    console.table(stats)
    return stats
  }
}

// Create singleton instance
export const apiDebugger = new ApiDebugger()

// Expose to window in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  ;(window as any).apiDebug = apiDebugger
}
