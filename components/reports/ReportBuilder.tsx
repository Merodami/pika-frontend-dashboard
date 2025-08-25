'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Flex,
  Card,
  Title,
  Text,
  Button,
  DateRangePicker,
  DateRangePickerValue,
} from '@tremor/react'
import {
  Plus,
  Download,
  Save,
  Eye,
  Settings,
  LayoutGrid,
  BarChart3,
} from 'lucide-react'
import { ModernMetricCard } from '../dashboard/ModernMetricCard'
import { AreaChart } from '../charts/AreaChart'
import { BarChart } from '../charts/BarChart'
import { DonutChart } from '../charts/DonutChart'
import { LineChart } from '../charts/LineChart'
import { HeatmapChart } from '../charts/HeatmapChart'
import { FunnelChart } from '../charts/FunnelChart'
import { RadialChart } from '../charts/RadialChart'
import { ModernDataTable } from '../dashboard/ModernDataTable'
import {
  generateTimeSeriesData,
  generateCategoryData,
  exportToCSV,
} from '../charts/utils'
import type { DashboardSection } from '../charts/types'

interface ReportBuilderProps {
  sections?: DashboardSection[]
  editable?: boolean
  onSave?: (sections: DashboardSection[]) => void
  className?: string
}

export function ReportBuilder({
  sections: initialSections = [],
  editable = true,
  onSave,
  className,
}: ReportBuilderProps) {
  const [sections, setSections] = useState<DashboardSection[]>(initialSections)
  const [isPreview, setIsPreview] = useState(false)
  const [dateRange, setDateRange] = useState<DateRangePickerValue>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  })

  // Add new section
  const addSection = (type: 'metrics' | 'chart' | 'table') => {
    const newSection: DashboardSection = {
      id: `section-${Date.now()}`,
      title: `New ${type} section`,
      metrics:
        type === 'metrics'
          ? [
              {
                title: 'Sample Metric',
                metric: '0',
                color: 'blue',
              },
            ]
          : undefined,
      charts:
        type === 'chart'
          ? [
              {
                config: {
                  type: 'area',
                  data: generateTimeSeriesData(),
                  index: 'date',
                  categories: ['Revenue', 'Orders'],
                  colors: ['blue', 'violet'],
                },
                options: {
                  title: 'Sample Chart',
                  showRefresh: true,
                  showExport: true,
                },
              },
            ]
          : undefined,
      tables:
        type === 'table'
          ? [
              {
                title: 'Sample Table',
                data: generateCategoryData().map((item, index) => ({
                  id: index,
                  ...item,
                })),
                columns: [
                  { key: 'name', header: 'Name' },
                  { key: 'value', header: 'Value' },
                  { key: 'growth', header: 'Growth %' },
                ],
              },
            ]
          : undefined,
    }

    setSections([...sections, newSection])
  }

  // Remove section
  const removeSection = (id: string) => {
    setSections(sections.filter((s) => s.id !== id))
  }

  // Export report
  const handleExport = () => {
    // Collect all data from sections
    sections.forEach((section, index) => {
      section.charts?.forEach((chart, chartIndex) => {
        // Convert chart data to exportable format
        const exportData = chart.config.data as any[]
        if (exportData && exportData.length > 0) {
          exportToCSV(
            exportData,
            `report-section-${index}-chart-${chartIndex}.csv`
          )
        }
      })
      section.tables?.forEach((table, tableIndex) => {
        exportToCSV(
          table.data as any[],
          `report-section-${index}-table-${tableIndex}.csv`
        )
      })
    })
  }

  // Render chart based on type
  const renderChart = (config: any, options: any) => {
    const chartProps = { config, options }

    switch (config.type) {
      case 'area':
        return <AreaChart {...chartProps} />
      case 'bar':
        return <BarChart {...chartProps} />
      case 'line':
        return <LineChart {...chartProps} />
      case 'donut':
        return <DonutChart data={config.data} options={options} />
      case 'heatmap':
        return <HeatmapChart data={config.data} {...options} />
      case 'funnel':
        return <FunnelChart data={config.data} {...options} />
      case 'radial':
        return <RadialChart value={config.value || 75} {...options} />
      default:
        return null
    }
  }

  return (
    <div className={className}>
      {/* Header Controls */}
      <Card className="mb-6 backdrop-blur-xl bg-white/50 dark:bg-gray-900/50 border border-white/20">
        <Flex>
          <div>
            <Title>Report Builder</Title>
            <Text>Create custom reports with charts, metrics, and tables</Text>
          </div>

          <div className="flex items-center gap-2">
            <DateRangePicker
              value={dateRange}
              onValueChange={setDateRange}
              className="max-w-sm"
            />

            <Button
              icon={isPreview ? Settings : Eye}
              onClick={() => setIsPreview(!isPreview)}
              variant="secondary"
            >
              {isPreview ? 'Edit' : 'Preview'}
            </Button>

            <Button icon={Download} onClick={handleExport} variant="secondary">
              Export
            </Button>

            {onSave && (
              <Button
                icon={Save}
                onClick={() => onSave(sections)}
                variant="primary"
              >
                Save Report
              </Button>
            )}
          </div>
        </Flex>
      </Card>

      {/* Add Section Controls */}
      {editable && !isPreview && (
        <Card className="mb-6 backdrop-blur-xl bg-white/50 dark:bg-gray-900/50 border border-white/20">
          <Title>Add Section</Title>
          <div className="flex gap-2 mt-4">
            <Button
              icon={LayoutGrid}
              onClick={() => addSection('metrics')}
              variant="secondary"
            >
              Add Metrics
            </Button>
            <Button
              icon={BarChart3}
              onClick={() => addSection('chart')}
              variant="secondary"
            >
              Add Chart
            </Button>
            <Button
              icon={Plus}
              onClick={() => addSection('table')}
              variant="secondary"
            >
              Add Table
            </Button>
          </div>
        </Card>
      )}

      {/* Report Sections */}
      <AnimatePresence>
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1 }}
            className="mb-6"
          >
            <Card className="backdrop-blur-xl bg-white/50 dark:bg-gray-900/50 border border-white/20">
              {/* Section Header */}
              <Flex className="mb-4">
                <div>
                  <Title>{section.title}</Title>
                  {section.description && <Text>{section.description}</Text>}
                </div>

                {editable && !isPreview && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => removeSection(section.id)}
                  >
                    Remove
                  </Button>
                )}
              </Flex>

              {/* Metrics */}
              {section.metrics && section.metrics.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {section.metrics.map((metric, metricIndex) => (
                    <ModernMetricCard key={metricIndex} {...metric} />
                  ))}
                </div>
              )}

              {/* Charts */}
              {section.charts && section.charts.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {section.charts.map((chart, chartIndex) => (
                    <div key={chartIndex}>
                      {renderChart(chart.config, chart.options)}
                    </div>
                  ))}
                </div>
              )}

              {/* Tables */}
              {section.tables && section.tables.length > 0 && (
                <div className="space-y-6">
                  {section.tables.map((table, tableIndex) => (
                    <ModernDataTable
                      key={tableIndex}
                      title={table.title}
                      data={table.data}
                      columns={table.columns}
                    />
                  ))}
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Empty State */}
      {sections.length === 0 && (
        <Card className="backdrop-blur-xl bg-white/50 dark:bg-gray-900/50 border border-white/20">
          <div className="text-center py-12">
            <BarChart3 className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <Title>No sections yet</Title>
            <Text className="mt-2">
              Start building your report by adding sections above
            </Text>
          </div>
        </Card>
      )}
    </div>
  )
}
