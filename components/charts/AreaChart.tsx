'use client'

import { AreaChart as TremorAreaChart } from '@tremor/react'
import { ChartContainer } from './ChartContainer'
import type {
  AreaChartConfig,
  ChartOptions,
  ChartContainerProps,
} from '@/types/analytics'

interface AreaChartProps {
  config: AreaChartConfig
  options?: ChartOptions
  containerProps?: Partial<ChartContainerProps>
}

export function AreaChart({ config, options, containerProps }: AreaChartProps) {
  const {
    data,
    index = 'date',
    categories = [],
    colors = ['blue', 'violet'],
    height = 'h-80',
    showAnimation = true,
    animationDuration = 1000,
    showLegend = true,
    showTooltip = true,
    showGrid = true,
    showXAxis = true,
    showYAxis = true,
    yAxisWidth = 65,
    curveType = 'natural',
    showGradient = true,
    className,
  } = config

  return (
    <ChartContainer options={options} {...containerProps}>
      <TremorAreaChart
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
        curveType={curveType}
        showGradient={showGradient}
      />
    </ChartContainer>
  )
}
