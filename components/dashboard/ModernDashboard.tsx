'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AreaChart,
  BarChart,
  DonutChart,
  Card,
  Title,
  Text,
  Flex,
  Metric,
  ProgressBar,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  DateRangePicker,
  DateRangePickerValue,
  Select,
  SelectItem,
} from '@tremor/react'
import {
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  Activity,
  BarChart3,
  Download,
  RefreshCw,
} from 'lucide-react'
import { ModernMetricCard } from './ModernMetricCard'
import { cn } from '@/lib/utils'
import type { ModernDashboardProps, MetricCardData } from '@/types/analytics'

// Mock data generators
const generateTimeSeriesData = () => {
  const data = []
  const now = new Date()

  for (let i = 30; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toISOString().split('T')[0],
      Revenue: Math.floor(Math.random() * 50000 + 30000),
      Orders: Math.floor(Math.random() * 200 + 100),
      Customers: Math.floor(Math.random() * 150 + 50),
    })
  }
  return data
}

const generateCategoryData = () => [
  { name: 'Electronics', value: 45600, growth: 12.5 },
  { name: 'Clothing', value: 38200, growth: 8.3 },
  { name: 'Food & Beverage', value: 28900, growth: -2.1 },
  { name: 'Home & Garden', value: 22100, growth: 15.7 },
  { name: 'Sports', value: 18700, growth: 5.2 },
]

const generateDonutData = () => [
  { name: 'Desktop', value: 45, color: 'blue' },
  { name: 'Mobile', value: 38, color: 'violet' },
  { name: 'Tablet', value: 17, color: 'cyan' },
]

export function ModernDashboard({
  className,
  realtimeEnabled = true,
}: ModernDashboardProps = {}) {
  const [timeSeriesData, setTimeSeriesData] = useState(generateTimeSeriesData())
  const [categoryData, setCategoryData] = useState(generateCategoryData())
  const [donutData, setDonutData] = useState(generateDonutData())
  const [selectedTab, setSelectedTab] = useState(0)
  const [dateRange, setDateRange] = useState<DateRangePickerValue>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  })
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Simulate real-time updates
  useEffect(() => {
    if (!realtimeEnabled) return

    const interval = setInterval(() => {
      setTimeSeriesData(generateTimeSeriesData())
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [realtimeEnabled])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setTimeSeriesData(generateTimeSeriesData())
      setCategoryData(generateCategoryData())
      setDonutData(generateDonutData())
      setIsRefreshing(false)
    }, 1000)
  }

  const metrics: MetricCardData[] = [
    {
      title: 'Total Revenue',
      metric: '$425,231',
      progress: 75,
      delta: 12.5,
      deltaType: 'increase' as const,
      icon: <DollarSign className="w-5 h-5" />,
      color: 'primary' as const,
    },
    {
      title: 'Active Users',
      metric: '8,723',
      progress: 82,
      delta: 8.3,
      deltaType: 'increase' as const,
      icon: <Users className="w-5 h-5" />,
      color: 'secondary' as const,
    },
    {
      title: 'Total Orders',
      metric: '3,421',
      progress: 68,
      delta: -2.1,
      deltaType: 'decrease' as const,
      icon: <ShoppingCart className="w-5 h-5" />,
      color: 'cyan' as const,
    },
    {
      title: 'Conversion Rate',
      metric: '4.8%',
      progress: 48,
      delta: 15.7,
      deltaType: 'increase' as const,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'emerald' as const,
    },
  ]

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header with controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Real-time insights and performance metrics
          </p>
        </div>

        <div className="flex items-center gap-2">
          <DateRangePicker
            value={dateRange}
            onValueChange={setDateRange}
            className="max-w-sm"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <RefreshCw
              className={cn('w-5 h-5', isRefreshing && 'animate-spin')}
            />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Download className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatePresence>
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ModernMetricCard {...metric} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Time Series Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="backdrop-blur-sm bg-white/90 dark:bg-white/10 border border-white/30 dark:border-white/20 shadow-sm">
            <Flex>
              <div>
                <Title>Performance Over Time</Title>
                <Text>Daily metrics for the last 30 days</Text>
              </div>
              <TabGroup index={selectedTab} onIndexChange={setSelectedTab}>
                <TabList variant="solid">
                  <Tab icon={BarChart3}>Chart</Tab>
                  <Tab icon={Activity}>Metrics</Tab>
                </TabList>
              </TabGroup>
            </Flex>

            <TabGroup index={selectedTab} onIndexChange={setSelectedTab}>
              <TabPanels>
                <TabPanel>
                  <AreaChart
                    className="mt-6 h-80"
                    data={timeSeriesData}
                    index="date"
                    categories={['Revenue', 'Orders']}
                    colors={['blue', 'violet']}
                    yAxisWidth={65}
                    showAnimation
                    animationDuration={1000}
                    showGradient
                    curveType="natural"
                  />
                </TabPanel>
                <TabPanel>
                  <div className="mt-6 space-y-4">
                    {['Revenue', 'Orders', 'Customers'].map((category) => {
                      const latest = (
                        timeSeriesData[timeSeriesData.length - 1] as any
                      )[category]
                      const previous = (
                        timeSeriesData[timeSeriesData.length - 2] as any
                      )[category]
                      const change = (
                        ((latest - previous) / previous) *
                        100
                      ).toFixed(1)

                      return (
                        <div
                          key={category}
                          className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                        >
                          <div>
                            <Text className="font-medium">{category}</Text>
                            <Metric className="mt-1">
                              {latest.toLocaleString()}
                            </Metric>
                          </div>
                          <div
                            className={cn(
                              'text-sm font-medium',
                              Number(change) > 0
                                ? 'text-green-600'
                                : 'text-red-600'
                            )}
                          >
                            {Number(change) > 0 ? '+' : ''}
                            {change}%
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </Card>
        </motion.div>

        {/* Donut Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="backdrop-blur-sm bg-white/90 dark:bg-white/10 border border-white/30 dark:border-white/20 shadow-sm h-full">
            <Title>Traffic Sources</Title>
            <Text>User distribution by device</Text>
            <DonutChart
              className="mt-6 h-60"
              data={donutData}
              category="value"
              index="name"
              colors={['blue', 'violet', 'cyan']}
              showAnimation
              animationDuration={1000}
              showTooltip
              label={`${donutData.reduce((acc, item) => acc + item.value, 0)}%`}
            />
            <div className="mt-6 space-y-2">
              {donutData.map((item) => (
                <Flex key={item.name} className="items-center">
                  <div className="flex items-center gap-2 flex-1">
                    <div
                      className={cn('w-3 h-3 rounded-full', {
                        'bg-blue-500': item.color === 'blue',
                        'bg-violet-500': item.color === 'violet',
                        'bg-cyan-500': item.color === 'cyan',
                      })}
                    />
                    <Text>{item.name}</Text>
                  </div>
                  <Text className="font-medium">{item.value}%</Text>
                </Flex>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Category Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="backdrop-blur-sm bg-white/90 dark:bg-white/10 border border-white/30 dark:border-white/20 shadow-sm">
          <Flex>
            <div>
              <Title>Category Performance</Title>
              <Text>Revenue by product category</Text>
            </div>
            <Select defaultValue="all" className="max-w-xs">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
            </Select>
          </Flex>

          <BarChart
            className="mt-6 h-80"
            data={categoryData}
            index="name"
            categories={['value']}
            colors={['violet']}
            yAxisWidth={65}
            showAnimation
            animationDuration={1000}
            showGridLines
            showXAxis
            showYAxis
          />

          {/* Category Details */}
          <div className="mt-6 space-y-4">
            {categoryData.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-800/30 dark:to-transparent"
              >
                <div className="flex-1">
                  <Text className="font-medium">{category.name}</Text>
                  <div className="mt-2">
                    <ProgressBar
                      value={(category.value / 50000) * 100}
                      color="violet"
                    />
                  </div>
                </div>
                <div className="text-right ml-4">
                  <Metric className="text-lg">
                    ${(category.value / 1000).toFixed(1)}k
                  </Metric>
                  <div
                    className={cn(
                      'text-sm font-medium mt-1',
                      category.growth > 0 ? 'text-green-600' : 'text-red-600'
                    )}
                  >
                    {category.growth > 0 ? '+' : ''}
                    {category.growth}%
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
