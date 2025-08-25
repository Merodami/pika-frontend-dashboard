'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, Users, DollarSign, ShoppingCart } from 'lucide-react'
import { ModernMetricCard } from './ModernMetricCard'
import type { MetricCardData } from '@/types/analytics'

export function ModernMetricsSection() {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
  )
}
