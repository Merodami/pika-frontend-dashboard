'use client'

import { LineChart as TremorLineChart } from '@tremor/react'
import { ChartContainer } from './ChartContainer'
import type {
  LineChartConfig,
  ChartOptions,
  ChartContainerProps,
} from '@/types/analytics'

interface LineChartProps {
  config: LineChartConfig
  options?: ChartOptions
  containerProps?: Partial<ChartContainerProps>
}

export function LineChart({ config, options, containerProps }: LineChartProps) {
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
    className,
  } = config

  return (
    <ChartContainer options={options} {...containerProps}>
      <TremorLineChart
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
      />
    </ChartContainer>
  )
}
