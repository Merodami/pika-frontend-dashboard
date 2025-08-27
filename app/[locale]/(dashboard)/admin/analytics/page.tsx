import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

import { requireAdmin } from '@/app/services/authService'
import { VoucherPerformance } from '@/components/features/voucherPerformance'
import { VoucherRealtimeStats } from '@/components/features/voucherRealtimeStats'
import { LoadingSkeleton } from '@/components/ui/loadingSkeleton'
import type { Locale } from '@/i18n/config'

export const dynamic = 'force-dynamic'

interface AnalyticsPageProps {
  params: Promise<{ locale: Locale }>
}

export default async function AnalyticsPage({ params }: AnalyticsPageProps) {
  await requireAdmin()
  const { locale } = await params
  const t = await getTranslations({ locale })

  return (
    <>
      {/* Full-width section below header */}
      <div className="-my-6 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="bg-white">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="space-y-6">
              {/* Real-time Stats */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('dashboard.analytics.realtimeStats')}
                </h2>
                <Suspense fallback={<LoadingSkeleton />}>
                  <VoucherRealtimeStats />
                </Suspense>
              </div>

              {/* Voucher Performance */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('dashboard.analytics.voucherPerformance')}
                </h2>
                <Suspense fallback={<LoadingSkeleton />}>
                  <VoucherPerformance locale={locale} businessId="admin-view" />
                </Suspense>
              </div>

              {/* Period Comparison */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {t('dashboard.analytics.periodComparison')}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {t('dashboard.analytics.thisWeek')}
                      </span>
                      <span className="font-medium">
                        1,234 {t('dashboard.analytics.redemptions')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {t('dashboard.analytics.lastWeek')}
                      </span>
                      <span className="font-medium">
                        1,087 {t('dashboard.analytics.redemptions')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-sm font-medium text-gray-900">
                        {t('dashboard.analytics.change')}
                      </span>
                      <span className="text-green-600 font-medium">+13.5%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {t('dashboard.analytics.topCategories')}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {t('dashboard.analytics.foodAndDining')}
                      </span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: '75%' }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">456</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {t('dashboard.analytics.shopping')}
                      </span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: '60%' }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">367</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {t('dashboard.analytics.entertainment')}
                      </span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-purple-600 h-2 rounded-full"
                            style={{ width: '45%' }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">234</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
