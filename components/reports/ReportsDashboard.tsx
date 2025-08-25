'use client'

import { useState } from 'react'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@tremor/react'
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Package,
  FileText,
} from 'lucide-react'
import { ReportBuilder } from './ReportBuilder'
import { generateTimeSeriesData, generateCategoryData } from '../charts/utils'
import type { DashboardSection } from '../charts/types'

// Pre-configured report templates
const salesReportSections: DashboardSection[] = [
  {
    id: 'sales-metrics',
    title: 'Sales Overview',
    description: 'Key performance indicators for sales',
    metrics: [
      {
        title: 'Total Revenue',
        metric: '$1,234,567',
        progress: 78,
        delta: 12.5,
        deltaType: 'increase',
        icon: <DollarSign className="w-5 h-5" />,
        color: 'blue',
      },
      {
        title: 'Orders',
        metric: '3,456',
        progress: 65,
        delta: 8.3,
        deltaType: 'increase',
        icon: <Package className="w-5 h-5" />,
        color: 'violet',
      },
      {
        title: 'Avg Order Value',
        metric: '$357',
        progress: 82,
        delta: -2.1,
        deltaType: 'decrease',
        icon: <TrendingUp className="w-5 h-5" />,
        color: 'cyan',
      },
      {
        title: 'Conversion Rate',
        metric: '3.4%',
        progress: 34,
        delta: 15.7,
        deltaType: 'increase',
        icon: <Users className="w-5 h-5" />,
        color: 'emerald',
      },
    ],
  },
  {
    id: 'sales-charts',
    title: 'Sales Trends',
    description: 'Historical sales data and projections',
    charts: [
      {
        config: {
          type: 'area',
          data: generateTimeSeriesData(30, ['Revenue', 'Profit']),
          index: 'date',
          categories: ['Revenue', 'Profit'],
          colors: ['blue', 'emerald'],
          showGradient: true,
        },
        options: {
          title: 'Revenue vs Profit',
          showRefresh: true,
          showExport: true,
        },
      },
      {
        config: {
          type: 'bar',
          data: generateCategoryData(),
          index: 'name',
          categories: ['value'],
          colors: ['violet'],
        },
        options: {
          title: 'Sales by Category',
          showExport: true,
        },
      },
    ],
  },
]

const customerReportSections: DashboardSection[] = [
  {
    id: 'customer-metrics',
    title: 'Customer Analytics',
    description: 'Customer behavior and engagement metrics',
    metrics: [
      {
        title: 'Total Customers',
        metric: '45,678',
        progress: 88,
        delta: 18.2,
        deltaType: 'increase',
        icon: <Users className="w-5 h-5" />,
        color: 'violet',
      },
      {
        title: 'Active Users',
        metric: '12,345',
        progress: 72,
        delta: 5.7,
        deltaType: 'increase',
        icon: <Users className="w-5 h-5" />,
        color: 'blue',
      },
      {
        title: 'Retention Rate',
        metric: '87%',
        progress: 87,
        delta: 3.2,
        deltaType: 'increase',
        icon: <TrendingUp className="w-5 h-5" />,
        color: 'emerald',
      },
      {
        title: 'Churn Rate',
        metric: '2.3%',
        progress: 23,
        delta: -12.5,
        deltaType: 'decrease',
        icon: <TrendingUp className="w-5 h-5" />,
        color: 'red',
      },
    ],
  },
  {
    id: 'customer-charts',
    title: 'Customer Insights',
    charts: [
      {
        config: {
          type: 'donut',
          data: [
            { name: 'New', value: 35, color: 'blue' },
            { name: 'Returning', value: 45, color: 'violet' },
            { name: 'Loyal', value: 20, color: 'emerald' },
          ],
        },
        options: {
          title: 'Customer Segments',
        },
      },
      {
        config: {
          type: 'funnel',
          data: [
            { stage: 'Visitors', value: 10000 },
            { stage: 'Sign-ups', value: 5500 },
            { stage: 'Active Users', value: 3200 },
            { stage: 'Paying Customers', value: 1200 },
            { stage: 'Loyal Customers', value: 450 },
          ],
        },
        options: {
          title: 'Customer Journey',
        },
      },
    ],
  },
]

const voucherReportSections: DashboardSection[] = [
  {
    id: 'voucher-metrics',
    title: 'Voucher Performance',
    description: 'Voucher usage and redemption analytics',
    metrics: [
      {
        title: 'Active Vouchers',
        metric: '234',
        progress: 75,
        delta: 22.5,
        deltaType: 'increase',
        icon: <FileText className="w-5 h-5" />,
        color: 'purple',
      },
      {
        title: 'Redemptions',
        metric: '8,765',
        progress: 68,
        delta: 15.3,
        deltaType: 'increase',
        icon: <TrendingUp className="w-5 h-5" />,
        color: 'blue',
      },
      {
        title: 'Redemption Rate',
        metric: '42%',
        progress: 42,
        delta: 8.7,
        deltaType: 'increase',
        icon: <BarChart3 className="w-5 h-5" />,
        color: 'cyan',
      },
      {
        title: 'Avg Discount',
        metric: '18%',
        progress: 36,
        delta: -3.2,
        deltaType: 'decrease',
        icon: <DollarSign className="w-5 h-5" />,
        color: 'orange',
      },
    ],
  },
  {
    id: 'voucher-heatmap',
    title: 'Voucher Usage Patterns',
    charts: [
      {
        config: {
          type: 'heatmap',
          data: Array.from({ length: 35 }, (_, i) => ({
            x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i % 7],
            y: `Week ${Math.floor(i / 7) + 1}`,
            value: Math.floor(Math.random() * 100),
          })),
        },
        options: {
          title: 'Weekly Redemption Heatmap',
          subtitle: 'Voucher redemptions by day and week',
        },
      },
      {
        config: {
          type: 'radial' as const,
          data: [],
          value: 75,
          maxValue: 100,
        },
        options: {
          title: 'Voucher Utilization',
          label: 'Used',
        },
      },
    ],
  },
]

interface ReportsDashboardProps {
  className?: string
}

export function ReportsDashboard({ className }: ReportsDashboardProps) {
  const [selectedTab, setSelectedTab] = useState(0)

  const handleSaveReport = (sections: DashboardSection[]) => {
    console.log('Saving report:', sections)
    // Implement save logic here
  }

  return (
    <div className={className}>
      <TabGroup index={selectedTab} onIndexChange={setSelectedTab}>
        <TabList className="mb-6">
          <Tab icon={DollarSign}>Sales Report</Tab>
          <Tab icon={Users}>Customer Report</Tab>
          <Tab icon={FileText}>Voucher Report</Tab>
          <Tab icon={BarChart3}>Custom Report</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ReportBuilder
              sections={salesReportSections}
              editable={false}
              onSave={handleSaveReport}
            />
          </TabPanel>

          <TabPanel>
            <ReportBuilder
              sections={customerReportSections}
              editable={false}
              onSave={handleSaveReport}
            />
          </TabPanel>

          <TabPanel>
            <ReportBuilder
              sections={voucherReportSections}
              editable={false}
              onSave={handleSaveReport}
            />
          </TabPanel>

          <TabPanel>
            <ReportBuilder
              sections={[]}
              editable={true}
              onSave={handleSaveReport}
            />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  )
}
