import { Suspense } from 'react'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { requireAdmin } from '@/app/services/authService'
import { LoadingSkeleton } from '@/components/ui/loadingSkeleton'
import type { Locale } from '@/i18n/config'

interface SettingsPageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({
  params,
}: SettingsPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'navigation' })

  return {
    title: t('settings'),
    description: 'System configuration and settings',
  }
}

export const dynamic = 'force-dynamic'

export default async function SettingsPage({}: SettingsPageProps) {
  await requireAdmin()

  return (
    <>
      {/* Full-width section below header */}
      <div className="-my-6 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="bg-white">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="space-y-6">
              {/* System Settings */}
              <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  System Configuration
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="Pika Dashboard"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default Language
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="es">Español</option>
                      <option value="en">English</option>
                      <option value="gn">Guaraní</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time Zone
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="America/Asuncion">America/Asuncion</option>
                      <option value="America/Buenos_Aires">
                        America/Buenos_Aires
                      </option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Currency
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="PYG">Guaraní (₲)</option>
                      <option value="USD">US Dollar ($)</option>
                      <option value="EUR">Euro (€)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Security Settings
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Two-Factor Authentication
                      </h3>
                      <p className="text-sm text-gray-500">
                        Require 2FA for admin accounts
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Session Timeout
                      </h3>
                      <p className="text-sm text-gray-500">
                        Auto-logout inactive users
                      </p>
                    </div>
                    <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60" selected>
                        1 hour
                      </option>
                      <option value="240">4 hours</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Password Policy
                      </h3>
                      <p className="text-sm text-gray-500">
                        Enforce strong passwords
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Email Configuration */}
              <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Email Configuration
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SMTP Host
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="smtp.example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SMTP Port
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="587"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      From Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="noreply@pikaapp.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      From Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Pika Team"
                    />
                  </div>
                </div>
              </div>

              {/* Feature Flags */}
              <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Feature Flags
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Voucher Books
                      </h3>
                      <p className="text-sm text-gray-500">
                        Enable voucher book creation and management
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Analytics
                      </h3>
                      <p className="text-sm text-gray-500">
                        Enable advanced analytics and reporting
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Payment Processing
                      </h3>
                      <p className="text-sm text-gray-500">
                        Enable online payment processing
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        API Access
                      </h3>
                      <p className="text-sm text-gray-500">
                        Allow third-party API integrations
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* System Information */}
              <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  System Information
                </h2>
                <Suspense fallback={<LoadingSkeleton />}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">
                        Application Version
                      </h3>
                      <p className="text-lg font-semibold text-gray-900">
                        v2.1.4
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">
                        Database Status
                      </h3>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm text-green-600">
                          Connected
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">
                        Last Backup
                      </h3>
                      <p className="text-sm text-gray-600">
                        2024-01-15 03:00 UTC
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">
                        Active Sessions
                      </h3>
                      <p className="text-lg font-semibold text-gray-900">24</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">
                        Storage Used
                      </h3>
                      <p className="text-lg font-semibold text-gray-900">
                        2.4 GB
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: '24%' }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">
                        Server Uptime
                      </h3>
                      <p className="text-sm text-gray-600">15 days, 8 hours</p>
                    </div>
                  </div>
                </Suspense>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4">
                <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Reset to Defaults
                </button>
                <button className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
