'use client'

import { DonutChart as TremorDonutChart, Text, Flex } from '@tremor/react'
import { ChartContainer } from './ChartContainer'
import { cn } from '@/lib/utils'
import type {
  DonutDataPoint,
  ChartOptions,
  ChartContainerProps,
} from '@/types/analytics'

interface DonutChartProps {
  data: DonutDataPoint[]
  options?: ChartOptions
  showLegend?: boolean
  label?: string
  height?: string
  containerProps?: Partial<ChartContainerProps>
}

export function DonutChart({
  data,
  options,
  showLegend = true,
  label,
  height = 'h-60',
  containerProps,
}: DonutChartProps) {
  const total = data.reduce((acc, item) => acc + item.value, 0)
  const colors = data.map((item) => item.color || 'blue')

  return (
    <ChartContainer options={options} {...containerProps}>
      <TremorDonutChart
        className={height}
        data={data}
        category="value"
        index="name"
        colors={colors}
        showAnimation
        animationDuration={1000}
        showTooltip
        label={label || `${total}`}
      />

      {showLegend && (
        <div className="mt-6 space-y-2">
          {data.map((item) => (
            <Flex key={item.name} className="items-center">
              <div className="flex items-center gap-2 flex-1">
                <div
                  className={cn('w-3 h-3 rounded-full', {
                    'bg-blue-500': item.color === 'blue',
                    'bg-violet-500': item.color === 'violet',
                    'bg-cyan-500': item.color === 'cyan',
                    'bg-emerald-500': item.color === 'emerald',
                    'bg-orange-500': item.color === 'orange',
                    'bg-red-500': item.color === 'red',
                  })}
                />
                <Text>{item.name}</Text>
              </div>
              <Text className="font-medium">
                {typeof item.value === 'number'
                  ? `${((item.value / total) * 100).toFixed(1)}%`
                  : item.value}
              </Text>
            </Flex>
          ))}
        </div>
      )}
    </ChartContainer>
  )
}
