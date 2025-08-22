'use client'

import { useEffect } from 'react'
import { Card, Result, Button, Spin } from 'antd'
import { Clock, CheckCircle, Building2, LogOut } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'

import { useNeedsRegistration } from '../hooks/useRegistrationStatus'

export default function RegistrationStatusPage() {
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string
  
  const handleLogout = () => {
    // Navigate to logout page which will handle the server action
    router.push(`/${locale}/logout`)
  }

  const {
    needsRegistration,
    canAccessDashboard,
    registrationStatus,
    isLoading: statusLoading,
  } = useNeedsRegistration()

  // Redirect logic
  useEffect(() => {
    if (!statusLoading) {
      if (needsRegistration) {
        // Still needs registration - go back to registration flow
        router.push('/business-registration')
      } else if (canAccessDashboard) {
        // Registration approved - go to business dashboard
        router.push('/business')
      }
    }
  }, [needsRegistration, canAccessDashboard, statusLoading, router])

  // Loading state
  if (statusLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" tip="Checking registration status..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <Card className="shadow-xl border-0">
          <Result
            icon={<Clock className="w-16 h-16 text-blue-600 mx-auto" />}
            title="Registration Submitted Successfully"
            subTitle="Your business registration has been submitted and is under review by our admin team."
            extra={[
              <div key="status" className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-900">
                        Current Status: {registrationStatus}
                      </p>
                      <p className="text-blue-700 text-sm">
                        Estimated review time: 24-48 hours
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">
                    What happens next?
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Your registration has been submitted</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-yellow-500" />
                      <span>Admin team is reviewing your information</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>
                        You'll receive an email notification once approved
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => router.push('/business-selector')}
                    className="w-full"
                  >
                    Return to Dashboard
                  </Button>
                  
                  <Button
                    type="default"
                    size="large"
                    icon={<LogOut className="w-4 h-4" />}
                    onClick={handleLogout}
                    className="w-full"
                  >
                    Logout
                  </Button>
                </div>
              </div>,
            ]}
          />
        </Card>
      </div>
    </div>
  )
}
