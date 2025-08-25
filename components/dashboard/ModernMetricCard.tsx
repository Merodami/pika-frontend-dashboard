'use client'

import { motion } from 'framer-motion'
import {
  Card,
  Metric,
  Text,
  Flex,
  ProgressBar,
  BadgeDelta,
} from '@tremor/react'
import { cn } from '@/lib/utils'
import type { ModernMetricCardProps, SimplifiedColor } from '@/types/analytics'

export function ModernMetricCard({
  title,
  metric,
  progress,
  progressLabel,
  delta,
  deltaType,
  icon,
  color = 'blue',
  className,
  onClick,
}: ModernMetricCardProps) {
  const colorClasses: Record<SimplifiedColor, string> = {
    // Very subtle brand color accents
    primary:
      'from-primary-500/5 via-primary-400/3 to-primary-600/5 hover:from-primary-500/10 hover:via-primary-400/5 hover:to-primary-600/10',
    secondary:
      'from-secondary-500/5 via-secondary-400/3 to-secondary-600/5 hover:from-secondary-500/10 hover:via-secondary-400/5 hover:to-secondary-600/10',
    // Keep some variety with complementary colors - very subtle
    blue: 'from-secondary-500/5 via-secondary-400/3 to-secondary-600/5 hover:from-secondary-500/10 hover:via-secondary-400/5 hover:to-secondary-600/10',
    violet:
      'from-violet-500/5 via-violet-400/3 to-violet-600/5 hover:from-violet-500/10 hover:via-violet-400/5 hover:to-violet-600/10',
    purple:
      'from-purple-500/5 via-purple-400/3 to-purple-600/5 hover:from-purple-500/10 hover:via-purple-400/5 hover:to-purple-600/10',
    cyan: 'from-cyan-500/5 via-cyan-400/3 to-cyan-600/5 hover:from-cyan-500/10 hover:via-cyan-400/5 hover:to-cyan-600/10',
    emerald:
      'from-emerald-500/5 via-emerald-400/3 to-emerald-600/5 hover:from-emerald-500/10 hover:via-emerald-400/5 hover:to-emerald-600/10',
    green:
      'from-green-500/5 via-green-400/3 to-green-600/5 hover:from-green-500/10 hover:via-green-400/5 hover:to-green-600/10',
    yellow:
      'from-yellow-500/5 via-yellow-400/3 to-yellow-600/5 hover:from-yellow-500/10 hover:via-yellow-400/5 hover:to-yellow-600/10',
    orange:
      'from-orange-500/5 via-orange-400/3 to-orange-600/5 hover:from-orange-500/10 hover:via-orange-400/5 hover:to-orange-600/10',
    red: 'from-primary-500/5 via-primary-400/3 to-primary-600/5 hover:from-primary-500/10 hover:via-primary-400/5 hover:to-primary-600/10',
  }

  const glowColors: Record<SimplifiedColor, string> = {
    primary: 'shadow-primary-500/20',
    secondary: 'shadow-secondary-500/20',
    blue: 'shadow-secondary-500/20',
    violet: 'shadow-violet-500/20',
    purple: 'shadow-purple-500/20',
    cyan: 'shadow-cyan-500/20',
    emerald: 'shadow-emerald-500/20',
    green: 'shadow-green-500/20',
    yellow: 'shadow-yellow-500/20',
    orange: 'shadow-orange-500/20',
    red: 'shadow-primary-500/20',
  }

  // Map our brand colors to Tremor colors for components
  const getTremorColor = (color: SimplifiedColor): any => {
    switch (color) {
      case 'primary':
        return 'red'
      case 'secondary':
        return 'blue'
      default:
        return color
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={cn(
          'relative overflow-hidden transition-all duration-300',
          // Light glass morphism effect
          'backdrop-blur-sm bg-white/90 dark:bg-white/10',
          'border border-white/30 dark:border-white/20',
          // Subtle background gradient with brand colors
          'bg-gradient-to-br',
          colorClasses[color],
          // Clean shadows
          'shadow-sm hover:shadow-lg',
          glowColors[color],
          onClick && 'cursor-pointer hover:scale-[1.01]',
          className
        )}
        onClick={onClick}
      >
        {/* Light animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent dark:from-white/10 dark:via-white/5 dark:to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />

        {/* Clean inner border for glass effect */}
        <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/20" />

        {/* Content */}
        <div className="relative z-10">
          <Flex>
            <div className="flex-1">
              <Flex className="items-center gap-2">
                {icon && (
                  <motion.div
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-gray-500 dark:text-gray-400"
                  >
                    {icon}
                  </motion.div>
                )}
                <Text className="text-gray-600 dark:text-gray-400">
                  {title}
                </Text>
              </Flex>

              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Metric className="mt-2 text-gray-900 dark:text-white">
                  {typeof metric === 'number'
                    ? metric.toLocaleString()
                    : metric}
                </Metric>
              </motion.div>
            </div>

            {delta !== undefined && deltaType && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <BadgeDelta deltaType={deltaType} size="sm" className="mt-1">
                  {delta > 0 ? '+' : ''}
                  {delta}%
                </BadgeDelta>
              </motion.div>
            )}
          </Flex>

          {progress !== undefined && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-4"
            >
              <Flex className="mt-2">
                <Text className="text-xs text-gray-500 dark:text-gray-400">
                  {progressLabel || `${progress}%`}
                </Text>
                <Text className="text-xs text-gray-500 dark:text-gray-400">
                  {progress}%
                </Text>
              </Flex>
              <ProgressBar
                value={progress}
                color={getTremorColor(color)}
                className="mt-1"
              />
            </motion.div>
          )}
        </div>

        {/* Floating animation effect */}
        <motion.div
          className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/10 blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </Card>
    </motion.div>
  )
}
