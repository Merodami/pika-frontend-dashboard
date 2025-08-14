'use client'

import React from 'react'
import { Bell, Search, User, Settings, LogOut, ChevronDown } from 'lucide-react'
import { Dropdown, Badge, Avatar, Input } from 'antd'
import type { MenuProps } from 'antd'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils/cn'
import { useResponsive } from '@/lib/hooks/useResponsive'
import type { User as UserType } from '@/app/services/authService'

interface ResponsiveDashboardHeaderProps {
  user: UserType
  locale: string
  title?: string
  showSearch?: boolean
  notifications?: {
    count: number
    items?: Array<{
      id: string
      title: string
      description: string
      time: string
      read: boolean
    }>
  }
}

export function ResponsiveDashboardHeader({
  user,
  locale,
  title = 'Dashboard',
  showSearch = false,
  notifications,
}: ResponsiveDashboardHeaderProps) {
  const router = useRouter()
  const { isMobile } = useResponsive()
  const [searchVisible, setSearchVisible] = React.useState(false)

  // User menu items
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: (
        <div className="py-2">
          <p className="font-medium text-gray-900">{user.email}</p>
          <p className="text-sm text-gray-500 capitalize">{user.role} Account</p>
        </div>
      ),
      disabled: true,
    },
    { type: 'divider' },
    {
      key: 'settings',
      icon: <Settings className="w-4 h-4" />,
      label: 'Settings',
      onClick: () => router.push(`/${locale}/settings`),
    },
    {
      key: 'profile-page',
      icon: <User className="w-4 h-4" />,
      label: 'Profile',
      onClick: () => router.push(`/${locale}/profile`),
    },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogOut className="w-4 h-4" />,
      label: 'Logout',
      danger: true,
      onClick: () => router.push(`/${locale}/logout`),
    },
  ]

  // Notification menu items
  const notificationMenuItems: MenuProps['items'] = notifications?.items?.map(
    (item) => ({
      key: item.id,
      label: (
        <div className={cn(
          'py-2 pr-4',
          !item.read && 'bg-blue-50 -mx-3 px-3'
        )}>
          <p className="font-medium text-gray-900 text-sm">{item.title}</p>
          <p className="text-xs text-gray-500 mt-1">{item.description}</p>
          <p className="text-xs text-gray-400 mt-1">{item.time}</p>
        </div>
      ),
    })
  ) || [
    {
      key: 'empty',
      label: (
        <div className="py-4 text-center text-gray-500">
          No new notifications
        </div>
      ),
    },
  ]

  return (
    <div className="flex items-center justify-between h-full">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {!isMobile && (
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        )}
        
        {/* Search - Desktop */}
        {showSearch && !isMobile && (
          <div className="relative">
            <Input
              placeholder="Search..."
              prefix={<Search className="w-4 h-4 text-gray-400" />}
              className="w-64"
            />
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Search - Mobile */}
        {showSearch && isMobile && (
          <>
            {searchVisible ? (
              <div className="absolute inset-x-0 top-16 bg-white border-b p-4 z-20">
                <Input
                  placeholder="Search..."
                  prefix={<Search className="w-4 h-4 text-gray-400" />}
                  onBlur={() => setTimeout(() => setSearchVisible(false), 200)}
                  autoFocus
                />
              </div>
            ) : (
              <button
                onClick={() => setSearchVisible(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Search className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </>
        )}

        {/* Notifications */}
        <Dropdown
          menu={{ items: notificationMenuItems }}
          placement="bottomRight"
          trigger={['click']}
          overlayClassName="w-80"
        >
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
            <Badge
              count={notifications?.count || 0}
              size="small"
              className="absolute -top-1 -right-1"
            >
              <Bell className="w-5 h-5 text-gray-600" />
            </Badge>
          </button>
        </Dropdown>

        {/* User Menu */}
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          trigger={['click']}
        >
          <button className={cn(
            'flex items-center gap-2 p-1.5 sm:pr-3',
            'hover:bg-gray-100 rounded-lg transition-colors'
          )}>
            <Avatar size={isMobile ? 32 : 36} className="bg-blue-500">
              {user.email?.[0]?.toUpperCase()}
            </Avatar>
            {!isMobile && (
              <>
                <span className="text-sm font-medium text-gray-700">
                  {user.email?.split('@')[0]}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </>
            )}
          </button>
        </Dropdown>
      </div>
    </div>
  )
}