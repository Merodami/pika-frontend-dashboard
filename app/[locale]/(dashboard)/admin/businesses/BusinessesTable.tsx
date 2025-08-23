'use client'

import { useMemo, useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'

import { DataGridServer } from '@/components/ui/DataGrid/DataGridServer'
import { createBusinessColumns } from '@/components/ui/DataGrid/business-columns'
import { getAdminBusinessList } from '@/lib/api/orval-client'
import type {
  GetAdminBusinessList200DataItem,
  GetAdminBusinessList200,
} from '@/lib/api/orval-client'
import type { ServerQueryParams } from '@/hooks/useDataGrid'
import { TableDensity, ExportFormat } from '@/types/data-grid'
import { ContextActionBar } from '@/components/ui/ContextActionBar'
import type { ActionItem } from '@/components/ui/ContextActionBar'

interface BusinessesTableProps {
  locale: string
}

export default function BusinessesTable({ locale }: BusinessesTableProps) {
  const t = useTranslations()
  const router = useRouter()
  const [queryParams, setQueryParams] = useState<ServerQueryParams>({
    page: 1,
    limit: 20,
    include: 'user,category,businessRegistration',
  })

  // Fetch businesses data with server query parameters
  const { data, isLoading, error, refetch } = useQuery<GetAdminBusinessList200>(
    {
      queryKey: ['admin-businesses', queryParams],
      queryFn: () =>
        getAdminBusinessList({
          page: queryParams.page,
          limit: queryParams.limit,
          search: queryParams.search,
          sortBy: queryParams.sortBy as any, // API expects specific enum values
          sortOrder: queryParams.sortOrder,
          include: (queryParams as any).include,
          ...queryParams, // Include any additional filters
        }),
      placeholderData: (previousData) => previousData, // Keep previous data while loading new data
    }
  )

  // Memoize columns to prevent recreation on every render
  const columns = useMemo(() => createBusinessColumns(t, locale), [t, locale])

  // Handle query parameter changes from the data grid
  const handleQueryChange = useCallback((newParams: ServerQueryParams) => {
    setQueryParams((prev) => ({
      ...newParams,
      include: prev.include, // Always include related data
    }))
  }, [])

  // Handle row selection changes
  const handleSelectionChange = useCallback(
    (
      selectedRows: GetAdminBusinessList200DataItem[],
      selectedRowData: Record<string, GetAdminBusinessList200DataItem>
    ) => {
      console.log('Selection changed:', { selectedRows, selectedRowData })
      // TODO: Update bulk actions state
    },
    []
  )

  // Handle row clicks
  const handleRowClick = useCallback(
    (business: GetAdminBusinessList200DataItem) => {
      router.push(`/${locale}/admin/businesses/${business.id}`)
    },
    [router, locale]
  )

  // Context actions
  const contextActions: ActionItem[] = [
    {
      key: 'add',
      label: t('common.button.create'),
      icon: <Plus className="w-4 h-4" />,
      type: 'primary',
      onClick: () => {
        console.log('Add business clicked')
        // TODO: Open add business drawer
      },
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
          { label: t('navigation.businesses') },
        ]}
        actions={contextActions}
      />

      <div className="p-4">
        <DataGridServer
          name="businesses"
          data={data?.data || []}
          columns={columns}
          loading={isLoading}
          error={error}
          pagination={
            data?.pagination
              ? {
                  total: data.pagination.total,
                  page: data.pagination.page,
                  limit: data.pagination.limit,
                  totalPages: data.pagination.totalPages,
                }
              : undefined
          }
          onQueryChange={handleQueryChange}
          onRefresh={refetch}
          features={{
            virtualization: { enabled: false },
            columnManagement: {
              enabled: true,
              resizable: true,
              reorderable: true,
              hideable: true,
              pinnable: false,
            },
            filtering: {
              enabled: true,
              globalSearch: true,
              columnFilters: true,
              advancedFilters: false,
            },
            export: {
              enabled: true,
              formats: [ExportFormat.CSV, ExportFormat.XLSX],
            },
            realtime: { enabled: false },
          }}
          display={{
            density: TableDensity.COMFORTABLE,
            responsive: true,
          }}
          onRowClick={handleRowClick}
          onSelectionChange={handleSelectionChange}
        />
      </div>
    </div>
  )
}
