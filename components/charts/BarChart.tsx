'use client'

import { BarChart as TremorBarChart } from '@tremor/react'
import { ChartContainer } from './ChartContainer'
import type {
  BarChartConfig,
  ChartOptions,
  ChartContainerProps,
} from '@/types/analytics'

interface BarChartProps {
  config: BarChartConfig
  options?: ChartOptions
  containerProps?: Partial<ChartContainerProps>
}

export function BarChart({ config, options, containerProps }: BarChartProps) {
  const {
    data,
    index = 'name',
    categories = ['value'],
    colors = ['violet'],
    height = 'h-80',
    showAnimation = true,
    animationDuration = 1000,
    showLegend = true,
    showTooltip = true,
    showGrid = true,
    showXAxis = true,
    showYAxis = true,
    yAxisWidth = 65,
    stacked = false,
    className,
  } = config

  return (
    <ChartContainer options={options} {...containerProps}>
      <TremorBarChart
        className={`${height} ${className || ''}`}
        data={data}
        index={index}
        categories={categories}
        colors={colors}
        yAxisWidth={yAxisWidth}
        showAnimation={showAnimation}
        animationDuration={animationDuration}
        showLegend={showLegend}
        showTooltip={showTooltip}
        showGridLines={showGrid}
        showXAxis={showXAxis}
        showYAxis={showYAxis}
        stack={stacked}
      />
    </ChartContainer>
  )
}
