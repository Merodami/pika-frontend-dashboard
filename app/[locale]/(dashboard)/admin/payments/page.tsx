import { Suspense } from 'react'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { requireAdmin } from '@/app/services/authService'
import { LoadingSkeleton } from '@/components/ui/loadingSkeleton'
import type { Locale } from '@/i18n/config'

interface PaymentsPageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({
  params,
}: PaymentsPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'navigation' })

  return {
    title: t('payments'),
    description: 'Manage payments and transactions',
  }
}

export const dynamic = 'force-dynamic'

export default async function PaymentsPage({}: PaymentsPageProps) {
  await requireAdmin()

  return (
    <>
      {/* Full-width section below header */}
      <div className="-my-6 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="bg-white">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="space-y-6">
              {/* Payment Overview */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Payment Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-green-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-5">
                        <p className="text-sm font-medium text-gray-500">
                          Total Revenue
                        </p>
                        <p className="text-2xl font-semibold text-gray-900">
                          $12,845
                        </p>
                        <p className="text-sm text-green-600">
                          +8.2% from last month
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-blue-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-5">
                        <p className="text-sm font-medium text-gray-500">
                          Transactions
                        </p>
                        <p className="text-2xl font-semibold text-gray-900">
                          1,432
                        </p>
                        <p className="text-sm text-blue-600">
                          +12.5% from last month
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-yellow-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-5">
                        <p className="text-sm font-medium text-gray-500">
                          Pending
                        </p>
                        <p className="text-2xl font-semibold text-gray-900">
                          28
                        </p>
                        <p className="text-sm text-yellow-600">
                          Awaiting processing
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Recent Transactions
                  </h2>
                </div>
                <Suspense fallback={<LoadingSkeleton />}>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Transaction ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Business
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {[
                          {
                            id: 'TXN-001234',
                            business: 'Pizza Palace',
                            amount: '$45.50',
                            status: 'completed',
                            date: '2024-01-15 14:30',
                          },
                          {
                            id: 'TXN-001235',
                            business: 'Coffee Corner',
                            amount: '$12.75',
                            status: 'completed',
                            date: '2024-01-15 13:15',
                          },
                          {
                            id: 'TXN-001236',
                            business: 'Burger Barn',
                            amount: '$28.90',
                            status: 'pending',
                            date: '2024-01-15 12:45',
                          },
                          {
                            id: 'TXN-001237',
                            business: 'Ice Cream Shop',
                            amount: '$8.25',
                            status: 'completed',
                            date: '2024-01-15 11:20',
                          },
                          {
                            id: 'TXN-001238',
                            business: 'Bakery Delights',
                            amount: '$15.60',
                            status: 'failed',
                            date: '2024-01-15 10:30',
                          },
                        ].map((transaction, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {transaction.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {transaction.business}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                              {transaction.amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                  transaction.status === 'completed'
                                    ? 'bg-green-100 text-green-800'
                                    : transaction.status === 'pending'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {transaction.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {transaction.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button className="text-blue-600 hover:text-blue-800">
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Suspense>
              </div>

              {/* Payment Methods */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Payment Methods
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Credit Cards
                      </span>
                      <span className="font-medium">78.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Digital Wallets
                      </span>
                      <span className="font-medium">15.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Bank Transfers
                      </span>
                      <span className="font-medium">4.8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Other</span>
                      <span className="font-medium">1.5%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Payment Processing
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Processing Rate</span>
                        <span className="text-gray-900">98.2%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: '98.2%' }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">
                          Average Processing Time
                        </span>
                        <span className="text-gray-900">2.3 seconds</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">
                          Failed Transactions
                        </span>
                        <span className="text-red-600">1.8%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-600 h-2 rounded-full"
                          style={{ width: '1.8%' }}
                        ></div>
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
