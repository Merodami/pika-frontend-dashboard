'use client'

import { Card, Title, Text, Flex, Metric } from '@tremor/react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface RadialChartProps {
  value: number
  maxValue?: number
  title?: string
  subtitle?: string
  label?: string
  color?: string
  size?: 'sm' | 'md' | 'lg'
  showAnimation?: boolean
  className?: string
}

export function RadialChart({
  value,
  maxValue = 100,
  title,
  subtitle,
  label,
  color = 'blue',
  size = 'md',
  showAnimation = true,
  className,
}: RadialChartProps) {
  const percentage = (value / maxValue) * 100
  const radius = size === 'sm' ? 40 : size === 'md' ? 60 : 80
  const strokeWidth = size === 'sm' ? 6 : size === 'md' ? 8 : 10
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const colors = {
    blue: '#3b82f6',
    violet: '#8b5cf6',
    cyan: '#06b6d4',
    emerald: '#10b981',
    orange: '#f59e0b',
    red: '#ef4444',
  }

  const bgColors = {
    blue: '#dbeafe',
    violet: '#ede9fe',
    cyan: '#cffafe',
    emerald: '#d1fae5',
    orange: '#fed7aa',
    red: '#fee2e2',
  }

  return (
    <Card
      className={cn(
        'backdrop-blur-xl bg-white/50 dark:bg-gray-900/50 border border-white/20',
        className
      )}
    >
      {title && <Title>{title}</Title>}
      {subtitle && <Text className="mt-1 mb-4">{subtitle}</Text>}

      <Flex className="justify-center items-center">
        <div className="relative">
          <svg
            width={radius * 2 + strokeWidth * 2}
            height={radius * 2 + strokeWidth * 2}
            className="transform -rotate-90"
          >
            {/* Background circle */}
            <circle
              cx={radius + strokeWidth}
              cy={radius + strokeWidth}
              r={radius}
              stroke={bgColors[color as keyof typeof bgColors]}
              strokeWidth={strokeWidth}
              fill="none"
              className="opacity-20"
            />

            {/* Progress circle */}
            <motion.circle
              cx={radius + strokeWidth}
              cy={radius + strokeWidth}
              r={radius}
              stroke={colors[color as keyof typeof colors]}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={
                showAnimation
                  ? { strokeDashoffset: circumference }
                  : { strokeDashoffset }
              }
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Metric
              className={cn(
                size === 'sm' && 'text-lg',
                size === 'md' && 'text-2xl',
                size === 'lg' && 'text-3xl'
              )}
            >
              {percentage.toFixed(0)}%
            </Metric>
            {label && (
              <Text
                className={cn(
                  'text-center',
                  size === 'sm' && 'text-xs',
                  size === 'md' && 'text-sm',
                  size === 'lg' && 'text-base'
                )}
              >
                {label}
              </Text>
            )}
          </div>
        </div>
      </Flex>

      {/* Additional info */}
      <Flex className="mt-4 justify-center">
        <Text className="text-center">
          {value.toLocaleString()} / {maxValue.toLocaleString()}
        </Text>
      </Flex>
    </Card>
  )
}
