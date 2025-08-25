'use client'

import { ScatterChart as TremorScatterChart } from '@tremor/react'
import { ChartContainer } from './ChartContainer'
import type { ChartOptions } from './types'

interface ScatterChartProps {
  data: Array<{ x: number; y: number; size?: number; category?: string }>
  options?: ChartOptions
  xLabel?: string
  yLabel?: string
  sizeLabel?: string
  colors?: string[]
  height?: string
  containerProps?: {
    className?: string
    glassmorphism?: boolean
  }
}

export function ScatterChart({
  data,
  options,
  xLabel = 'X',
  yLabel = 'Y',
  sizeLabel = 'Size',
  colors = ['blue', 'violet', 'cyan'],
  height = 'h-80',
  containerProps,
}: ScatterChartProps) {
  // Transform data for Tremor format
  const chartData = data.map((point, index) => ({
    [`${xLabel}`]: point.x,
    [`${yLabel}`]: point.y,
    [`${sizeLabel}`]: point.size || 10,
    category: point.category || `Group ${index}`,
  }))

  return (
    <ChartContainer options={options} {...containerProps}>
      <TremorScatterChart
        className={height}
        data={chartData}
        x={xLabel}
        y={yLabel}
        size={sizeLabel}
        category="category"
        colors={colors}
        showAnimation
        animationDuration={1000}
        showLegend
        showTooltip
      />
    </ChartContainer>
  )
}
