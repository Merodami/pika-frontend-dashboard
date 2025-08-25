'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Card,
  Title,
  Text,
  Flex,
  DateRangePicker,
  DateRangePickerValue,
} from '@tremor/react'
import { Download, RefreshCw, Maximize2, Filter } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ChartOptions } from './types'

interface ChartContainerProps {
  children: React.ReactNode
  options?: ChartOptions
  className?: string
  glassmorphism?: boolean
}

export function ChartContainer({
  children,
  options,
  className,
  glassmorphism = true,
}: ChartContainerProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [dateRange, setDateRange] = useState<DateRangePickerValue>(
    options?.dateRange
      ? { from: options.dateRange.from, to: options.dateRange.to }
      : {
          from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          to: new Date(),
        }
  )

  const handleRefresh = async () => {
    if (!options?.onRefresh) return

    setIsRefreshing(true)
    try {
      await options.onRefresh()
    } finally {
      setTimeout(() => setIsRefreshing(false), 500)
    }
  }

  const handleExport = (format: 'png' | 'svg' | 'csv') => {
    if (options?.onExport) {
      options.onExport(format)
    }
  }

  const containerClasses = cn(
    glassmorphism
      ? 'backdrop-blur-xl bg-white/50 dark:bg-gray-900/50 border border-white/20'
      : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700',
    'transition-all duration-300',
    isFullscreen && 'fixed inset-4 z-50',
    className
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={
        isFullscreen
          ? 'fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4'
          : ''
      }
    >
      <Card className={containerClasses}>
        {/* Header */}
        {(options?.title || options?.showExport || options?.showRefresh) && (
          <Flex className="mb-4">
            <div className="flex-1">
              {options?.title && <Title>{options.title}</Title>}
              {options?.subtitle && (
                <Text className="mt-1">{options.subtitle}</Text>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Date Range Picker */}
              {options?.dateRange && (
                <DateRangePicker
                  value={dateRange}
                  onValueChange={setDateRange}
                  className="max-w-sm"
                />
              )}

              {/* Filter Button */}
              {options?.filters && options.filters.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                </motion.button>
              )}

              {/* Refresh Button */}
              {options?.showRefresh && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  <RefreshCw
                    className={cn('w-4 h-4', isRefreshing && 'animate-spin')}
                  />
                </motion.button>
              )}

              {/* Fullscreen Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Maximize2 className="w-4 h-4" />
              </motion.button>

              {/* Export Button */}
              {options?.showExport && (
                <div className="relative group">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </motion.button>

                  {/* Export Dropdown */}
                  <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <button
                      onClick={() => handleExport('png')}
                      className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-t-lg"
                    >
                      Export PNG
                    </button>
                    <button
                      onClick={() => handleExport('svg')}
                      className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Export SVG
                    </button>
                    <button
                      onClick={() => handleExport('csv')}
                      className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-b-lg"
                    >
                      Export CSV
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Flex>
        )}

        {/* Chart Content */}
        <div className={cn(isRefreshing && 'opacity-50 transition-opacity')}>
          {children}
        </div>

        {/* Loading Overlay */}
        {isRefreshing && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-900/50 rounded-lg">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        )}
      </Card>
    </motion.div>
  )
}
