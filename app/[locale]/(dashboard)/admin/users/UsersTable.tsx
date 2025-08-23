'use client'

import { useMemo, useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'

import { DataGridServer } from '@/components/ui/DataGrid/DataGridServer'
import { createUserColumns } from '@/components/ui/DataGrid/columns'
import { getAdminUserList } from '@/lib/api/orval-client'
import type { GetAdminUserList200DataItem, GetAdminUserList200 } from '@/lib/api/orval-client'
import type { ServerQueryParams } from '@/hooks/useDataGrid'
import { TableDensity, ExportFormat } from '@/types/data-grid'
import { ContextActionBar } from '@/components/ui/ContextActionBar'
import type { ActionItem } from '@/components/ui/ContextActionBar'

interface UsersTableProps {
  locale: string
}

export default function UsersTable({ locale }: UsersTableProps) {
  const t = useTranslations()
  const [queryParams, setQueryParams] = useState<ServerQueryParams>({
    page: 1,
    limit: 20,
  })

  // Fetch users data with server query parameters
  const { data, isLoading, error, refetch } = useQuery<GetAdminUserList200>({
    queryKey: ['admin-users', queryParams],
    queryFn: () => getAdminUserList({
      page: queryParams.page,
      limit: queryParams.limit,
      search: queryParams.search,
      sortBy: queryParams.sortBy as any, // API expects specific enum values
      sortOrder: queryParams.sortOrder,
      ...queryParams, // Include any additional filters
    }),
    placeholderData: (previousData) => previousData, // Keep previous data while loading new data
  })

  // Memoize columns to prevent recreation on every render
  const columns = useMemo(() => createUserColumns(t, locale), [t, locale])

  // Handle query parameter changes from the data grid
  const handleQueryChange = useCallback((newParams: ServerQueryParams) => {
    setQueryParams(newParams)
  }, [])

  // Handle row selection changes
  const handleSelectionChange = useCallback((selectedRows: GetAdminUserList200DataItem[], selectedRowData: Record<string, GetAdminUserList200DataItem>) => {
    console.log('Selection changed:', { selectedRows, selectedRowData })
    // TODO: Update bulk actions state
  }, [])

  // Handle row clicks
  const handleRowClick = useCallback((user: GetAdminUserList200DataItem) => {
    console.log('Row clicked:', user)
    // TODO: Navigate to user detail
  }, [])

  // Context actions
  const contextActions: ActionItem[] = [
    {
      key: 'add',
      label: t('common.button.create'),
      icon: <Plus className="w-4 h-4" />,
      type: 'primary',
      onClick: () => {
        console.log('Add user clicked')
        // TODO: Open add user drawer
      },
    },
  ]

  return (
    <div className="space-y-0">
      <ContextActionBar
        breadcrumbs={[
          {
            label: t('navigation.dashboard'),
            onClick: () => console.log('Navigate to dashboard'),
          },
          { label: t('navigation.users') },
        ]}
        actions={contextActions}
      />

      <div className="p-4">
        <DataGridServer
          name="users"
          data={data?.data || []}
          columns={columns}
          loading={isLoading}
          error={error}
          pagination={data?.pagination ? {
            total: data.pagination.total,
            page: data.pagination.page,
            limit: data.pagination.limit,
            totalPages: data.pagination.totalPages,
          } : undefined}
          onQueryChange={handleQueryChange}
          onRefresh={refetch}
          features={{
            virtualization: { enabled: false }, // Start simple
            columnManagement: { 
              enabled: true, 
              resizable: true, 
              reorderable: true, 
              hideable: true,
              pinnable: false 
            },
            filtering: { 
              enabled: true, 
              globalSearch: true, 
              columnFilters: true,
              advancedFilters: false 
            },
            export: { 
              enabled: true, 
              formats: [ExportFormat.CSV, ExportFormat.XLSX]
            },
            realtime: { enabled: false }
          }}
          display={{
            density: TableDensity.COMFORTABLE,
            responsive: true
          }}
          onRowClick={handleRowClick}
          onSelectionChange={handleSelectionChange}
        />
      </div>
    </div>
  )
}