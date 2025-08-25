'use client'

import { SparkAreaChart, SparkLineChart, SparkBarChart } from '@tremor/react'
import { motion } from 'framer-motion'

interface SparklineChartProps {
  data: Array<{ value: number; date?: string }>
  type?: 'area' | 'line' | 'bar'
  color?: string
  height?: string
  showGradient?: boolean
  animate?: boolean
}

export function SparklineChart({
  data,
  type = 'area',
  color = 'blue',
  height = 'h-10',
  showGradient = true,
  animate = true,
}: SparklineChartProps) {
  const ChartComponent = {
    area: SparkAreaChart,
    line: SparkLineChart,
    bar: SparkBarChart,
  }[type]

  const chartData = data.map((item, index) => ({
    ...item,
    index: item.date || index.toString(),
  }))

  const content = (
    <ChartComponent
      data={chartData}
      categories={['value']}
      index="index"
      colors={[color]}
      className={height}
      showGradient={type === 'area' && showGradient}
    />
  )

  if (animate) {
    return (
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ transformOrigin: 'left' }}
      >
        {content}
      </motion.div>
    )
  }

  return content
}
