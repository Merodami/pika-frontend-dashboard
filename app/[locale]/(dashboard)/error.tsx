'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from 'antd'
import { useTranslations } from 'next-intl'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()
  const t = useTranslations('errors')
  const tCommon = useTranslations('common')

  useEffect(() => {
    // Log error for debugging
    console.error('Dashboard error:', error)

    // If it's an auth/access error, redirect to login after a short delay
    if (
      error.message.includes('Unauthorized') ||
      error.message.includes('Dashboard access denied') ||
      error.message.includes('401')
    ) {
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    }
  }, [error, router])

  // For access denied errors, show a friendly message
  if (error.message.includes('Dashboard access denied')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{t('forbidden')}</h2>
          <p className="text-gray-600 mb-6">{t('dashboardAccessDenied')}</p>
          <Button type="primary" onClick={() => router.push('/login')}>
            {tCommon('button.back')}
          </Button>
        </div>
      </div>
    )
  }

  // For other errors, show generic error message
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">{t('somethingWentWrong')}</h2>
        <p className="text-gray-600 mb-6">{t('contactAdmin')}</p>
        <div className="space-x-4">
          <Button onClick={() => reset()}>{t('tryAgain')}</Button>
          <Button type="primary" onClick={() => router.push('/login')}>
            {tCommon('button.back')}
          </Button>
        </div>
      </div>
    </div>
  )
}
