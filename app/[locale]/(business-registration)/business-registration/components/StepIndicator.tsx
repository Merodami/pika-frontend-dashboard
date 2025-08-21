'use client'

import { CheckCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface Step {
  number: number
  title: string
  description: string
}

interface StepIndicatorProps {
  currentStep: number
  completedSteps: number[]
  className?: string
}

export function StepIndicator({
  currentStep,
  completedSteps,
  className,
}: StepIndicatorProps) {
  const t = useTranslations('businessRegistration')

  const steps: Step[] = [
    {
      number: 1,
      title: t('steps.businessInfo.title'),
      description: t('steps.businessInfo.description'),
    },
    {
      number: 2,
      title: t('steps.contactDetails.title'),
      description: t('steps.contactDetails.description'),
    },
    {
      number: 3,
      title: t('steps.additionalInfo.title'),
      description: t('steps.additionalInfo.description'),
    },
    {
      number: 4,
      title: t('steps.review.title'),
      description: t('steps.review.description'),
    },
  ]

  return (
    <div className={cn('w-full py-8', className)}>
      {/* Mobile view - compact */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all',
                  completedSteps.includes(step.number)
                    ? 'bg-green-500 text-white'
                    : currentStep === step.number
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                      : 'bg-gray-200 text-gray-500'
                )}
              >
                {completedSteps.includes(step.number) ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'h-0.5 w-8 sm:w-12 transition-all',
                    completedSteps.includes(step.number)
                      ? 'bg-green-500'
                      : 'bg-gray-200'
                  )}
                />
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-900">
            {steps[currentStep - 1]?.title}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Step {currentStep} of {steps.length}
          </p>
        </div>
      </div>

      {/* Desktop view - detailed */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Progress line */}
          <div className="absolute top-12 left-0 w-full h-0.5 bg-gray-200">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-blue-600 transition-all duration-500"
              style={{
                width: `${(Math.max(...completedSteps, 0) / (steps.length - 1)) * 100}%`,
              }}
            />
          </div>

          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex flex-col items-center"
                style={{ flex: '1 1 0%' }}
              >
                <div className="relative z-10">
                  <div
                    className={cn(
                      'w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-300',
                      completedSteps.includes(step.number)
                        ? 'bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg shadow-green-200'
                        : currentStep === step.number
                          ? 'bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-200 ring-4 ring-blue-100'
                          : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                    )}
                  >
                    {completedSteps.includes(step.number) ? (
                      <CheckCircle className="w-12 h-12" />
                    ) : (
                      step.number
                    )}
                  </div>

                  {/* Active indicator */}
                  {currentStep === step.number && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                    </div>
                  )}
                </div>

                <div className="mt-4 text-center max-w-[150px]">
                  <p
                    className={cn(
                      'font-medium text-sm mb-1 transition-colors',
                      currentStep === step.number
                        ? 'text-blue-700'
                        : completedSteps.includes(step.number)
                          ? 'text-green-700'
                          : 'text-gray-500'
                    )}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-400 leading-tight">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
