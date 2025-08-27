import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import { FileText, Download } from 'lucide-react'

import { requireAdmin } from '@/app/services/authService'
import { LoadingSkeleton } from '@/components/ui/loadingSkeleton'
import { ReportsMetricCards } from '@/components/features/reportsMetricCards'
import type { Locale } from '@/i18n/config'

export const dynamic = 'force-dynamic'

interface ReportsPageProps {
  params: Promise<{ locale: Locale }>
}

export default async function ReportsPage({ params }: ReportsPageProps) {
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
              {/* Modern Metric Cards */}
              <Suspense fallback={<LoadingSkeleton />}>
                <ReportsMetricCards />
              </Suspense>

              {/* Quick Actions */}
              <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('reports.quickActions')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <div className="flex items-center justify-between mb-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span className="text-xs text-gray-500">PDF</span>
                    </div>
                    <div className="font-medium text-gray-900">
                      {t('reports.types.voucherAnalytics')}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {t('reports.descriptions.monthlyPerformance')}
                    </div>
                  </button>
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <div className="flex items-center justify-between mb-2">
                      <FileText className="w-5 h-5 text-green-600" />
                      <span className="text-xs text-gray-500">Excel</span>
                    </div>
                    <div className="font-medium text-gray-900">
                      {t('reports.types.financialSummary')}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {t('reports.descriptions.revenueTransactions')}
                    </div>
                  </button>
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <div className="flex items-center justify-between mb-2">
                      <FileText className="w-5 h-5 text-purple-600" />
                      <span className="text-xs text-gray-500">CSV</span>
                    </div>
                    <div className="font-medium text-gray-900">
                      {t('reports.types.userActivity')}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {t('reports.descriptions.userEngagement')}
                    </div>
                  </button>
                </div>
              </div>

              {/* Recent Reports */}
              <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {t('reports.recentReports')}
                  </h2>
                </div>
                <Suspense fallback={<LoadingSkeleton />}>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t('reports.table.name')}
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t('reports.table.type')}
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t('reports.table.generated')}
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t('reports.table.status')}
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t('reports.table.actions')}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {[
                          {
                            name: t(
                              'reports.samples.monthlyVoucherPerformance'
                            ),
                            type: t('reports.types.analytics'),
                            date: '2024-01-15',
                            status: 'completed',
                          },
                          {
                            name: t('reports.samples.quarterlyFinancial'),
                            type: t('reports.types.financial'),
                            date: '2024-01-14',
                            status: 'completed',
                          },
                          {
                            name: t('reports.samples.userEngagementAnalysis'),
                            type: t('reports.types.activity'),
                            date: '2024-01-13',
                            status: 'processing',
                          },
                          {
                            name: t('reports.samples.businessGrowth'),
                            type: t('reports.types.business'),
                            date: '2024-01-12',
                            status: 'completed',
                          },
                        ].map((report, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {report.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {report.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {report.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                  report.status === 'completed'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {t(`reports.status.${report.status}`)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button className="text-blue-600 hover:text-blue-800 mr-3">
                                {t('actions.view')}
                              </button>
                              {report.status === 'completed' && (
                                <button className="text-gray-600 hover:text-gray-800">
                                  <Download className="w-4 h-4 inline" />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Suspense>
              </div>

              {/* Report Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {t('reports.keyMetricsThisMonth')}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {t('reports.metrics.totalRevenue')}
                      </span>
                      <span className="font-medium text-green-600">
                        $45,678
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {t('reports.metrics.activeVouchers')}
                      </span>
                      <span className="font-medium">234</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {t('reports.metrics.redemptionRate')}
                      </span>
                      <span className="font-medium">67.8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {t('reports.metrics.newBusinesses')}
                      </span>
                      <span className="font-medium">18</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {t('reports.metrics.customerSatisfaction')}
                      </span>
                      <span className="font-medium text-green-600">
                        4.8/5.0
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {t('reports.scheduledReports')}
                  </h3>
                  <div className="space-y-3">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <div className="font-medium text-gray-900">
                        {t('reports.scheduled.weeklyAnalytics')}
                      </div>
                      <div className="text-sm text-gray-500">
                        {t('reports.scheduled.weeklyAnalyticsTime')}
                      </div>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <div className="font-medium text-gray-900">
                        {t('reports.scheduled.monthlyFinancial')}
                      </div>
                      <div className="text-sm text-gray-500">
                        {t('reports.scheduled.monthlyFinancialTime')}
                      </div>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                      <div className="font-medium text-gray-900">
                        {t('reports.scheduled.quarterlyBusiness')}
                      </div>
                      <div className="text-sm text-gray-500">
                        {t('reports.scheduled.quarterlyBusinessTime')}
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
