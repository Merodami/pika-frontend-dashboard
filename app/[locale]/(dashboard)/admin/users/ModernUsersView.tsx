'use client'

import { useState, useCallback, useEffect } from 'react'
import { message, Modal, Empty, Button, Input, Badge } from 'antd'
import { Plus, Filter, Search, Download, RefreshCw } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { debounce } from 'lodash-es'

import { ContextActionBar } from '@/components/ui/ContextActionBar'
import type { ActionItem } from '@/components/ui/ContextActionBar'
import AddUserDrawer from './AddUserDrawer'
import { UserCard } from './components/UserCard'
import { UserCardSkeletonGrid } from './components/UserCardSkeleton'
import { ViewToggle } from './components/ViewToggle'
import { FilterSidebar } from './components/FilterSidebar'
import UsersTable from './UsersTable'

import {
  useUsers,
  useBanUser,
  useUnbanUser,
  useDeleteUser,
  useResetBusinessRegistration,
} from '@/hooks/api/users/useUsers'
import { useServerDataTable } from '@/hooks/useDataTable'
import type { GetAdminUserList200DataItem } from '@/lib/api/orval-client'

interface ModernUsersViewProps {
  locale: string
}

export default function ModernUsersView({ locale }: ModernUsersViewProps) {
  const router = useRouter()
  const t = useTranslations()

  // State management
  const [viewMode, setViewMode] = useState<'table' | 'cards' | 'list'>('cards')
  const [isAddUserDrawerOpen, setIsAddUserDrawerOpen] = useState(false)
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<Record<string, any>>({})

  // Data table state management for server-side operations
  const dataTable = useServerDataTable<GetAdminUserList200DataItem>({
    initialPageSize: viewMode === 'cards' ? 12 : 20,
  })

  // Update page size when view mode changes
  useEffect(() => {
    dataTable.setPageSize(viewMode === 'cards' ? 12 : 20)
  }, [viewMode])

  // Build query params
  const queryParams = {
    page: dataTable.state.page,
    limit: dataTable.state.pageSize,
    search: searchQuery || undefined,
    status: filters.status,
    role: filters.role,
    emailVerified: filters.emailVerified,
    sortBy: dataTable.state.sortField as any,
    sortOrder: dataTable.state.sortOrder as any,
    registeredFrom: filters.registrationDate?.[0]?.toISOString(),
    registeredTo: filters.registrationDate?.[1]?.toISOString(),
  }

  // Fetch users data
  const { data, isLoading, refetch } = useUsers(queryParams)

  // Mutations
  const banUserMutation = useBanUser()
  const unbanUserMutation = useUnbanUser()
  const deleteUserMutation = useDeleteUser()
  const resetRegistrationMutation = useResetBusinessRegistration()

  // Debounced search
  const handleSearch = useCallback(
    debounce((value: string) => {
      setSearchQuery(value)
      dataTable.setPage(1) // Reset to first page on search
    }, 300),
    []
  )

  // User action handlers
  const handleViewUser = (userId: string) => {
    router.push(`/${locale}/admin/users/${userId}`)
  }

  const handleEditUser = (userId: string) => {
    router.push(`/${locale}/admin/users/${userId}/edit`)
  }

  const handleDeleteUser = (userId: string) => {
    Modal.confirm({
      title: t('common.message.confirmDelete'),
      onOk: () => deleteUserMutation.mutate(userId),
    })
  }

  const handleBanUser = (userId: string) => {
    Modal.confirm({
      title: t('users.action.ban'),
      content: 'Are you sure you want to ban this user?',
      onOk: () => banUserMutation.mutate({ userId }),
    })
  }

  const handleUnbanUser = (userId: string) => {
    unbanUserMutation.mutate({ userId })
  }

  const handleResetRegistration = (userId: string) => {
    Modal.confirm({
      title: t('users.resetRegistration.title'),
      content: t('users.resetRegistration.confirmMessage'),
      onOk: () => resetRegistrationMutation.mutate(userId),
    })
  }

  const handleExport = () => {
    message.info(t('common.message.featureComingSoon'))
  }

  // Count active filters
  const activeFiltersCount = Object.values(filters).filter(Boolean).length

  // Context action bar actions
  const contextActions: ActionItem[] = [
    {
      key: 'add',
      label: t('users.addUser'),
      icon: <Plus className="w-4 h-4" />,
      type: 'primary',
      onClick: () => setIsAddUserDrawerOpen(true),
    },
  ]

  // Render content based on view mode
  const renderContent = () => {
    if (isLoading && !data) {
      return viewMode === 'cards' ? (
        <UserCardSkeletonGrid count={12} />
      ) : (
        <div className="h-96 flex items-center justify-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      )
    }

    if (!data?.data || data.data.length === 0) {
      return (
        <Empty description={t('common.message.noData')} className="py-16">
          <Button
            type="primary"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddUserDrawerOpen(true)}
          >
            {t('users.addUser')}
          </Button>
        </Empty>
      )
    }

    if (viewMode === 'table') {
      return <UsersTable locale={locale} />
    }

    return (
      <div
        className={
          viewMode === 'cards'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
        }
      >
        {data.data.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onView={handleViewUser}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            onBan={handleBanUser}
            onUnban={handleUnbanUser}
            onResetRegistration={handleResetRegistration}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-0">
      <ContextActionBar
        breadcrumbs={[
          {
            label: t('navigation.dashboard'),
            onClick: () => router.push(`/${locale}/admin`),
          },
          { label: t('navigation.users') },
        ]}
        actions={contextActions}
      />

      <div className="p-6 space-y-6">
        {/* Header with search and actions */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex-1 max-w-xl">
            <Input
              size="large"
              placeholder={t('users.filters.search')}
              prefix={<Search className="w-4 h-4 text-gray-400" />}
              onChange={(e) => handleSearch(e.target.value)}
              allowClear
            />
          </div>

          <div className="flex items-center gap-3">
            <Button
              icon={<Filter className="w-4 h-4" />}
              onClick={() => setIsFilterSidebarOpen(true)}
              className="relative"
            >
              {t('common.button.filter')}
              {activeFiltersCount > 0 && (
                <Badge
                  count={activeFiltersCount}
                  size="small"
                  className="absolute -top-2 -right-2"
                />
              )}
            </Button>

            <ViewToggle view={viewMode} onChange={setViewMode} />

            <Button
              icon={<Download className="w-4 h-4" />}
              onClick={handleExport}
            >
              {t('common.button.export')}
            </Button>

            <Button
              icon={<RefreshCw className="w-4 h-4" />}
              onClick={() => refetch()}
              title={t('common.button.refresh')}
            />
          </div>
        </div>

        {/* Main content */}
        {renderContent()}

        {/* Pagination */}
        {data && data.pagination && (
          <div className="flex justify-center mt-8">
            {/* You can use Ant Design Pagination or custom pagination component */}
            <div className="text-sm text-gray-500">
              Showing{' '}
              {(dataTable.state.page - 1) * dataTable.state.pageSize + 1} to{' '}
              {Math.min(
                dataTable.state.page * dataTable.state.pageSize,
                data.pagination.total
              )}{' '}
              of {data.pagination.total} users
            </div>
          </div>
        )}
      </div>

      {/* Filter Sidebar */}
      <FilterSidebar
        open={isFilterSidebarOpen}
        onClose={() => setIsFilterSidebarOpen(false)}
        filters={filters}
        onFiltersChange={(newFilters) => {
          setFilters(newFilters)
          dataTable.setPage(1) // Reset to first page on filter change
        }}
        onClearFilters={() => {
          setFilters({})
          dataTable.setPage(1)
        }}
      />

      {/* Add User Drawer */}
      <AddUserDrawer
        open={isAddUserDrawerOpen}
        onClose={() => setIsAddUserDrawerOpen(false)}
        locale={locale}
      />
    </div>
  )
}
