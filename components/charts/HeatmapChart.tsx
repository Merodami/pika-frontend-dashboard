'use client'

import { Card, Title, Text } from '@tremor/react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface HeatmapData {
  x: string
  y: string
  value: number
}

interface HeatmapChartProps {
  data: HeatmapData[]
  title?: string
  subtitle?: string
  colorScale?: string[]
  height?: string
  className?: string
}

export function HeatmapChart({
  data,
  title,
  subtitle,
  colorScale = ['#eff6ff', '#dbeafe', '#93c5fd', '#3b82f6', '#1e40af'],
  height = 'h-80',
  className,
}: HeatmapChartProps) {
  // Get unique x and y values
  const xValues = [...new Set(data.map((d) => d.x))].sort()
  const yValues = [...new Set(data.map((d) => d.y))].sort()

  // Create value map for quick lookup
  const valueMap = new Map(data.map((d) => [`${d.x}-${d.y}`, d.value]))

  // Find min and max values for color scaling
  const values = data.map((d) => d.value)
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)

  const getColor = (value: number) => {
    const normalized = (value - minValue) / (maxValue - minValue)
    const index = Math.floor(normalized * (colorScale.length - 1))
    return colorScale[index]
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

      <div className={cn('overflow-auto', height)}>
        <div className="inline-block min-w-full">
          <div
            className="grid gap-1"
            style={{
              gridTemplateColumns: `auto repeat(${xValues.length}, 1fr)`,
            }}
          >
            {/* Header row */}
            <div /> {/* Empty cell for top-left */}
            {xValues.map((x) => (
              <div key={x} className="text-xs text-gray-500 text-center p-1">
                {x}
              </div>
            ))}
            {/* Data rows */}
            {yValues.map((y, yIndex) => (
              <motion.div
                key={y}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: yIndex * 0.05 }}
                className="contents"
              >
                <div className="text-xs text-gray-500 pr-2 flex items-center justify-end">
                  {y}
                </div>
                {xValues.map((x, xIndex) => {
                  const value = valueMap.get(`${x}-${y}`) || 0
                  return (
                    <motion.div
                      key={`${x}-${y}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: (yIndex * xValues.length + xIndex) * 0.01,
                      }}
                      className="aspect-square rounded flex items-center justify-center text-xs font-medium cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all"
                      style={{ backgroundColor: getColor(value) }}
                      title={`${x}, ${y}: ${value}`}
                    >
                      {value}
                    </motion.div>
                  )
                })}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Color scale legend */}
      <div className="mt-4 flex items-center gap-2">
        <Text className="text-xs">Low</Text>
        <div className="flex-1 h-4 rounded flex overflow-hidden">
          {colorScale.map((color, index) => (
            <div
              key={index}
              className="flex-1"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <Text className="text-xs">High</Text>
      </div>
    </Card>
  )
}
