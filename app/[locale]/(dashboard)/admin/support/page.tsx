import { Suspense } from 'react'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { requireAdmin } from '@/app/services/authService'
import { LoadingSkeleton } from '@/components/ui/loadingSkeleton'
import type { Locale } from '@/i18n/config'

interface SupportPageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({
  params,
}: SupportPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'navigation' })

  return {
    title: t('support'),
    description: 'Support tickets and customer service',
  }
}

export const dynamic = 'force-dynamic'

export default async function SupportPage({}: SupportPageProps) {
  await requireAdmin()

  return (
    <>
      {/* Full-width section below header */}
      <div className="-my-6 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="bg-white">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="space-y-6">
              {/* Support Overview */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Support Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-5">
                        <p className="text-sm font-medium text-gray-500">
                          Open Tickets
                        </p>
                        <p className="text-2xl font-semibold text-gray-900">
                          23
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
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
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
                          12
                        </p>
                      </div>
                    </div>
                  </div>

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
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-5">
                        <p className="text-sm font-medium text-gray-500">
                          Resolved
                        </p>
                        <p className="text-2xl font-semibold text-gray-900">
                          156
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-purple-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-5">
                        <p className="text-sm font-medium text-gray-500">
                          Satisfaction
                        </p>
                        <p className="text-2xl font-semibold text-gray-900">
                          4.8/5
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Support Tickets */}
              <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Recent Support Tickets
                    </h2>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                      Create Ticket
                    </button>
                  </div>
                </div>
                <Suspense fallback={<LoadingSkeleton />}>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ticket ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Subject
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Priority
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Created
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {[
                          {
                            id: 'SUP-001234',
                            subject: 'Voucher not working properly',
                            user: 'john@example.com',
                            priority: 'high',
                            status: 'open',
                            created: '2024-01-15 14:30',
                          },
                          {
                            id: 'SUP-001235',
                            subject: 'Unable to redeem coupon',
                            user: 'sarah@business.com',
                            priority: 'medium',
                            status: 'pending',
                            created: '2024-01-15 13:15',
                          },
                          {
                            id: 'SUP-001236',
                            subject: 'Payment processing issue',
                            user: 'mike@company.com',
                            priority: 'high',
                            status: 'in_progress',
                            created: '2024-01-15 12:45',
                          },
                          {
                            id: 'SUP-001237',
                            subject: 'Account access problem',
                            user: 'lisa@store.com',
                            priority: 'low',
                            status: 'resolved',
                            created: '2024-01-15 11:20',
                          },
                          {
                            id: 'SUP-001238',
                            subject: 'Feature request - bulk upload',
                            user: 'david@restaurant.com',
                            priority: 'low',
                            status: 'open',
                            created: '2024-01-15 10:30',
                          },
                        ].map((ticket, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {ticket.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {ticket.subject}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {ticket.user}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                  ticket.priority === 'high'
                                    ? 'bg-red-100 text-red-800'
                                    : ticket.priority === 'medium'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                {ticket.priority}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                  ticket.status === 'resolved'
                                    ? 'bg-green-100 text-green-800'
                                    : ticket.status === 'in_progress'
                                      ? 'bg-blue-100 text-blue-800'
                                      : ticket.status === 'pending'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                {ticket.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {ticket.created}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button className="text-blue-600 hover:text-blue-800 mr-2">
                                View
                              </button>
                              <button className="text-gray-600 hover:text-gray-800">
                                Assign
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Suspense>
              </div>

              {/* Support Categories & Knowledge Base */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Support Categories
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Payment Issues
                      </span>
                      <span className="font-medium">32%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Voucher Problems
                      </span>
                      <span className="font-medium">28%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Account Access
                      </span>
                      <span className="font-medium">18%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Feature Requests
                      </span>
                      <span className="font-medium">12%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Other</span>
                      <span className="font-medium">10%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Response Times
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">
                          Average First Response
                        </span>
                        <span className="text-gray-900">2.4 hours</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: '85%' }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">
                          Average Resolution Time
                        </span>
                        <span className="text-gray-900">18.6 hours</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: '78%' }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">SLA Compliance</span>
                        <span className="text-green-600">94.2%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: '94.2%' }}
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
