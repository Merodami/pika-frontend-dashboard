'use client'

import { Card, Title, Text, ProgressBar, Flex, Metric } from '@tremor/react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FunnelData {
  stage: string
  value: number
  color?: string
}

interface FunnelChartProps {
  data: FunnelData[]
  title?: string
  subtitle?: string
  showPercentage?: boolean
  height?: string
  className?: string
}

export function FunnelChart({
  data,
  title,
  subtitle,
  showPercentage = true,
  height = 'h-80',
  className,
}: FunnelChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value))

  return (
    <Card
      className={cn(
        'backdrop-blur-xl bg-white/50 dark:bg-gray-900/50 border border-white/20',
        className
      )}
    >
      {title && <Title>{title}</Title>}
      {subtitle && <Text className="mt-1 mb-4">{subtitle}</Text>}

      <div className={cn('space-y-4', height)}>
        {data.map((item, index) => {
          const percentage = (item.value / maxValue) * 100
          const conversionRate =
            index > 0
              ? ((item.value / data[index - 1].value) * 100).toFixed(1)
              : '100'

          return (
            <motion.div
              key={item.stage}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              style={{ transformOrigin: 'left' }}
            >
              <Flex className="mb-2">
                <Text className="font-medium">{item.stage}</Text>
                <div className="flex items-center gap-2">
                  <Metric className="text-lg">
                    {item.value.toLocaleString()}
                  </Metric>
                  {showPercentage && index > 0 && (
                    <Text
                      className={cn(
                        'text-sm font-medium',
                        parseFloat(conversionRate) >= 50
                          ? 'text-green-600'
                          : 'text-orange-600'
                      )}
                    >
                      {conversionRate}%
                    </Text>
                  )}
                </div>
              </Flex>

              <div className="relative">
                <ProgressBar
                  value={percentage}
                  color={(item.color || 'blue') as any}
                  className="h-8"
                />

                {/* Funnel shape effect */}
                <div
                  className="absolute inset-y-0 right-0 bg-gradient-to-r from-transparent to-white dark:to-gray-900"
                  style={{ width: `${100 - percentage}%` }}
                />
              </div>

              {index < data.length - 1 && (
                <div className="flex justify-center my-2">
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="w-0.5 h-4 bg-gray-300 dark:bg-gray-600"
                  />
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </Card>
  )
}
