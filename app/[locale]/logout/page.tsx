import { logout } from '@/app/actions/auth'
import { Spin } from 'antd'

interface LogoutPageProps {
  params: Promise<{ locale: string }>
}

export default async function LogoutPage({ params }: LogoutPageProps) {
  const { locale } = await params
  
  // This will clear tokens and redirect to login
  await logout(locale)
  
  // This will never render because logout redirects
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spin size="large" />
    </div>
  )
}