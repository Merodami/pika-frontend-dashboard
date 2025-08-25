import { format, parseISO, subDays } from 'date-fns'
import type { TimeSeriesData } from './types'

/**
 * Generate mock time series data for testing/demo purposes
 */
export function generateTimeSeriesData(
  days: number = 30,
  categories: string[] = ['Revenue', 'Orders', 'Customers'],
  baseValues: Record<string, number> = {
    Revenue: 40000,
    Orders: 150,
    Customers: 100,
  }
): TimeSeriesData[] {
  const data: TimeSeriesData[] = []
  const now = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(now, i)
    const dayData: TimeSeriesData = {
      date: format(date, 'yyyy-MM-dd'),
    }

    categories.forEach((category) => {
      const base = baseValues[category] || 100
      const variation = 0.2 // 20% variation
      const min = base * (1 - variation)
      const max = base * (1 + variation)
      dayData[category] = Math.floor(Math.random() * (max - min) + min)
    })

    data.push(dayData)
  }

  return data
}

/**
 * Generate mock category data
 */
export function generateCategoryData(
  categories: string[] = ['Electronics', 'Clothing', 'Food', 'Home', 'Sports']
): Array<{ name: string; value: number; growth: number }> {
  return categories.map((name) => ({
    name,
    value: Math.floor(Math.random() * 50000 + 10000),
    growth: Math.random() * 30 - 10, // -10% to +20%
  }))
}

/**
 * Format chart values for display
 */
export function formatChartValue(
  value: number | string,
  type: 'currency' | 'number' | 'percent' = 'number'
): string {
  if (typeof value === 'string') return value

  switch (type) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value)

    case 'percent':
      return `${value.toFixed(1)}%`

    case 'number':
    default:
      return new Intl.NumberFormat('en-US').format(value)
  }
}

/**
 * Calculate growth percentage between two values
 */
export function calculateGrowth(current: number, previous: number): number {
  if (previous === 0) return 0
  return ((current - previous) / previous) * 100
}

/**
 * Aggregate data by time period
 */
export function aggregateByPeriod(
  data: TimeSeriesData[],
  period: 'day' | 'week' | 'month' = 'day'
): TimeSeriesData[] {
  if (period === 'day') return data

  // Group data by period
  const grouped: Record<string, TimeSeriesData[]> = {}

  data.forEach((item) => {
    const date = parseISO(item.date as string)
    let key: string

    if (period === 'week') {
      const weekStart = new Date(date)
      weekStart.setDate(date.getDate() - date.getDay())
      key = format(weekStart, 'yyyy-MM-dd')
    } else {
      key = format(date, 'yyyy-MM')
    }

    if (!grouped[key]) grouped[key] = []
    grouped[key].push(item)
  })

  // Aggregate grouped data
  return Object.entries(grouped).map(([date, items]) => {
    const aggregated: TimeSeriesData = { date }

    // Get all numeric keys from first item
    const numericKeys = Object.keys(items[0]).filter(
      (key) => key !== 'date' && typeof items[0][key] === 'number'
    )

    // Sum values for each numeric key
    numericKeys.forEach((key) => {
      aggregated[key] = items.reduce(
        (sum, item) => sum + (item[key] as number),
        0
      )
    })

    return aggregated
  })
}

/**
 * Export chart data to CSV
 */
export function exportToCSV(
  data: any[],
  filename: string = 'chart-data.csv'
): void {
  if (data.length === 0) return

  // Get headers from first item
  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(','),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header]
          // Handle values that might contain commas
          return typeof value === 'string' && value.includes(',')
            ? `"${value}"`
            : value
        })
        .join(',')
    ),
  ].join('\n')

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Get chart colors based on theme
 */
export function getChartColors(theme: 'light' | 'dark' = 'light') {
  const colors = {
    light: {
      primary: [
        '#3b82f6',
        '#8b5cf6',
        '#06b6d4',
        '#10b981',
        '#f59e0b',
        '#ef4444',
      ],
      background: 'rgba(255, 255, 255, 0.8)',
      grid: '#e5e7eb',
      text: '#374151',
    },
    dark: {
      primary: [
        '#60a5fa',
        '#a78bfa',
        '#22d3ee',
        '#34d399',
        '#fbbf24',
        '#f87171',
      ],
      background: 'rgba(17, 24, 39, 0.8)',
      grid: '#374151',
      text: '#d1d5db',
    },
  }

  return colors[theme]
}
