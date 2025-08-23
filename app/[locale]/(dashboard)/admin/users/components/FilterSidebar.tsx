'use client'

import { useState } from 'react'
import {
  Drawer,
  Button,
  Input,
  Select,
  DatePicker,
  Badge,
  Collapse,
} from 'antd'
import {
  Filter,
  Search,
  X,
  Calendar,
  Users,
  Shield,
  CheckCircle,
  RefreshCw,
} from 'lucide-react'
import { UserRole, UserStatus } from '@merodami/pika-types'

const { RangePicker } = DatePicker
const { Option } = Select

interface FilterSidebarProps {
  open: boolean
  onClose: () => void
  filters: Record<string, any>
  onFiltersChange: (filters: Record<string, any>) => void
  onClearFilters: () => void
}

export function FilterSidebar({
  open,
  onClose,
  filters,
  onFiltersChange,
  onClearFilters,
}: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState(filters)

  const handleApplyFilters = () => {
    onFiltersChange(localFilters)
    onClose()
  }

  const handleClearAll = () => {
    setLocalFilters({})
    onClearFilters()
    onClose()
  }

  const updateFilter = (key: string, value: any) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }))
  }

  // Count active filters
  const activeFiltersCount = Object.values(localFilters).filter(Boolean).length

  const filterSections = [
    {
      key: 'basic',
      title: 'Basic Filters',
      icon: <Search className="w-4 h-4" />,
      items: [
        {
          key: 'search',
          label: 'Search Users',
          component: (
            <Input
              placeholder="Search by name, email..."
              value={localFilters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              prefix={<Search className="w-4 h-4 text-gray-400" />}
              allowClear
            />
          ),
        },
      ],
    },
    {
      key: 'status',
      title: 'Status & Role',
      icon: <Users className="w-4 h-4" />,
      items: [
        {
          key: 'status',
          label: 'Status',
          component: (
            <Select
              placeholder="Select status"
              value={localFilters.status}
              onChange={(value) => updateFilter('status', value)}
              allowClear
              className="w-full"
            >
              <Option value={UserStatus.ACTIVE}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Active
                </div>
              </Option>
              <Option value={UserStatus.UNCONFIRMED}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  Unconfirmed
                </div>
              </Option>
              <Option value={UserStatus.SUSPENDED}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  Suspended
                </div>
              </Option>
              <Option value={UserStatus.BANNED}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Banned
                </div>
              </Option>
            </Select>
          ),
        },
        {
          key: 'role',
          label: 'Role',
          component: (
            <Select
              placeholder="Select role"
              value={localFilters.role}
              onChange={(value) => updateFilter('role', value)}
              allowClear
              className="w-full"
            >
              <Option value={UserRole.ADMIN}>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-red-500" />
                  Admin
                </div>
              </Option>
              <Option value={UserRole.BUSINESS}>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  Business Owner
                </div>
              </Option>
              <Option value={UserRole.CUSTOMER}>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-green-500" />
                  Customer
                </div>
              </Option>
            </Select>
          ),
        },
      ],
    },
    {
      key: 'verification',
      title: 'Verification',
      icon: <CheckCircle className="w-4 h-4" />,
      items: [
        {
          key: 'emailVerified',
          label: 'Email Verification',
          component: (
            <Select
              placeholder="Email verification status"
              value={localFilters.emailVerified}
              onChange={(value) => updateFilter('emailVerified', value)}
              allowClear
              className="w-full"
            >
              <Option value="true">Verified</Option>
              <Option value="false">Not Verified</Option>
            </Select>
          ),
        },
      ],
    },
    {
      key: 'dates',
      title: 'Registration Date',
      icon: <Calendar className="w-4 h-4" />,
      items: [
        {
          key: 'registrationDate',
          label: 'Registration Period',
          component: (
            <RangePicker
              className="w-full"
              value={localFilters.registrationDate}
              onChange={(dates) => updateFilter('registrationDate', dates)}
              placeholder={['From date', 'To date']}
            />
          ),
        },
      ],
    },
  ]

  return (
    <Drawer
      title={
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <Badge count={activeFiltersCount} size="small" />
          )}
        </div>
      }
      open={open}
      onClose={onClose}
      width={360}
      extra={
        <Button
          type="text"
          icon={<X className="w-4 h-4" />}
          onClick={onClose}
        />
      }
      footer={
        <div className="flex items-center justify-between gap-3">
          <Button
            icon={<RefreshCw className="w-4 h-4" />}
            onClick={handleClearAll}
            disabled={activeFiltersCount === 0}
          >
            Clear All
          </Button>
          <Button
            type="primary"
            onClick={handleApplyFilters}
            className="flex-1"
          >
            Apply Filters
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <Collapse
          ghost
          defaultActiveKey={['basic', 'status']}
          items={filterSections.map((section) => ({
            key: section.key,
            label: (
              <div className="flex items-center gap-2 font-medium">
                {section.icon}
                {section.title}
              </div>
            ),
            children: (
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {item.label}
                    </label>
                    {item.component}
                  </div>
                ))}
              </div>
            ),
          }))}
        />
      </div>
    </Drawer>
  )
}
