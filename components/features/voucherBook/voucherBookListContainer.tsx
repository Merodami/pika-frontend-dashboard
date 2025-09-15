'use client'

import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { UserRole } from '@/lib/api/orval-client'

import {
  BulkActions,
  commonBulkActions,
} from '@/components/ui/DataGrid/actions/BulkActions'
import { ContextActionBar } from '@/components/ui/ContextActionBar'
import type { ActionItem } from '@/components/ui/ContextActionBar'
import { useServerDataTable } from '@/hooks/useDataTable'
import {
  useVoucherBooks,
  useDeleteVoucherBook,
} from '@/hooks/api/voucherBooks/useVoucherBooks'
import {
  mapApiVoucherBookListToDomain,
  VoucherBookDomain,
} from '@/lib/api/mappers/voucherBook'
import type { Locale } from '@/i18n/config'

import { VoucherBookTable } from './voucherBookTable'
import { VoucherBookFilters } from './voucherBookFilters'

interface VoucherBookListContainerProps {
  userRole: UserRole
  locale: Locale
}

export function VoucherBookListContainer({
  userRole,
  locale,
}: VoucherBookListContainerProps) {
  const router = useRouter()
  const t = useTranslations('voucherBooks')

  // Data table state management
  const dataTable = useServerDataTable<VoucherBookDomain>({
    initialPageSize: 20,
  })

  // Prepare query params for the hook
  const queryParams = {
    page: dataTable.state.page,
    limit: dataTable.state.pageSize,
    search: dataTable.state.search || undefined,
    status: dataTable.state.filters.status,
    bookType: dataTable.state.filters.bookType,
    year: dataTable.state.filters.year,
    sortBy: dataTable.state.sortField as any,
    sortOrder: dataTable.state.sortOrder as any,
  }

  // Use custom hooks for API calls with translated messages
  const { data: apiData, isLoading } = useVoucherBooks(queryParams)
  const deleteBookMutation = useDeleteVoucherBook({
    successMessage: t('messages.deleteSuccess'),
    errorMessage: t('messages.deleteError'),
  })

  // Map the API response to domain model
  const data = apiData ? mapApiVoucherBookListToDomain(apiData) : undefined

  // Handlers
  const handleViewBook = (id: string) => {
    const basePath = userRole === UserRole.admin ? 'admin' : 'business'
    router.push(`/${locale}/${basePath}/voucher-books/${id}`)
  }

  const handleEditBook = (id: string) => {
    const basePath = userRole === UserRole.admin ? 'admin' : 'business'
    router.push(`/${locale}/${basePath}/voucher-books/${id}/edit`)
  }

  const handleDelete = async (id: string) => {
    deleteBookMutation.mutate(id)
  }

  const handleDownloadPdf = (pdfUrl: string) => {
    window.open(pdfUrl, '_blank')
  }

  const handleCreateBook = () => {
    const basePath = userRole === UserRole.admin ? 'admin' : 'business'
    router.push(`/${locale}/${basePath}/voucher-books/create`)
  }

  const handleBulkDelete = async (selectedKeys: React.Key[]) => {
    for (const key of selectedKeys) {
      await deleteBookMutation.mutateAsync(key as string)
    }
    dataTable.clearSelection()
  }

  // Context action bar actions
  const contextActions: ActionItem[] = [
    {
      key: 'create',
      label: t('list.createButton'),
      icon: <Plus className="w-4 h-4" />,
      type: 'primary',
      onClick: handleCreateBook,
    },
  ]

  return (
    <div className="space-y-0">
      <ContextActionBar
        breadcrumbs={[
          {
            label: t('navigation.dashboard'),
            onClick: () => router.push(`/${locale}/admin`),
          },
          { label: t('navigation.voucherBooks') },
        ]}
        actions={contextActions}
      />

      <div className="space-y-3 p-4">
        <VoucherBookFilters
          values={dataTable.state.filters}
          onChange={dataTable.setFilters}
          onReset={dataTable.clearFilters}
        />

        <VoucherBookTable
          data={data?.data || []}
          loading={isLoading}
          pagination={dataTable.serverPagination(data?.pagination)}
          onTableChange={dataTable.handleTableChange}
          onView={handleViewBook}
          onEdit={handleEditBook}
          onDelete={handleDelete}
          onDownloadPdf={handleDownloadPdf}
        />

        <BulkActions
          selectedKeys={dataTable.state.selectedRowKeys}
          onClear={dataTable.clearSelection}
          actions={[commonBulkActions.deleteMultiple(handleBulkDelete)]}
        />
      </div>
    </div>
  )
}
