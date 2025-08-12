'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Spin } from 'antd'
import { UserRole } from '@merodami/pika-types'

interface DashboardRedirectProps {
  userRole: string  // Use string since the server passes string values
  locale: string
}

export function DashboardRedirect({ userRole, locale }: DashboardRedirectProps) {
  const router = useRouter()

  useEffect(() => {
    const redirectUrl = 
      userRole === UserRole.ADMIN 
        ? `/${locale}/admin`
        : userRole === UserRole.BUSINESS
        ? `/${locale}/business`
        : `/${locale}/unauthorized`
    
    router.replace(redirectUrl)
  }, [userRole, locale, router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spin size="large" />
    </div>
  )
}