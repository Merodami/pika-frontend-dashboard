'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Card,
  Title,
  Text,
  Flex,
  Badge,
  Button,
  TextInput,
  MultiSelect,
  MultiSelectItem,
} from '@tremor/react'
import { Search, Download, ArrowUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ModernDataTableProps } from '@/types/analytics'

export function ModernDataTable<T extends { id: string | number }>({
  title,
  description,
  data,
  columns,
  searchable = true,
  searchKeys = [],
  filterable = true,
  filters = [],
  actions = [],
  onRowClick,
  pageSize = 10,
  className,
}: ModernDataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({})
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(
    new Set()
  )

  // Filter data based on search and filters
  let filteredData = [...data]

  if (searchTerm && searchKeys.length > 0) {
    filteredData = filteredData.filter((item) =>
      searchKeys.some((key) =>
        String(item[key]).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }

  Object.entries(selectedFilters).forEach(([key, values]) => {
    if (values.length > 0) {
      filteredData = filteredData.filter((item) =>
        values.includes(String(item[key as keyof T]))
      )
    }
  })

  // Sort data
  if (sortColumn) {
    filteredData.sort((a, b) => {
      const aVal = a[sortColumn]
      const bVal = b[sortColumn]

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }

  // Paginate data
  const totalPages = Math.ceil(filteredData.length / pageSize)
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const handleSort = (column: keyof T | string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column as keyof T)
      setSortDirection('asc')
    }
  }

  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(paginatedData.map((item) => item.id)))
    }
  }

  const handleSelectRow = (id: string | number) => {
    const newSelected = new Set(selectedRows)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedRows(newSelected)
  }

  return (
    <Card
      className={cn(
        'backdrop-blur-xl bg-white/50 dark:bg-gray-900/50 border border-white/20',
        className
      )}
    >
      {/* Header */}
      <Flex className="mb-6">
        <div>
          {title && <Title>{title}</Title>}
          {description && <Text className="mt-1">{description}</Text>}
        </div>

        <div className="flex items-center gap-2">
          {selectedRows.size > 0 && (
            <Badge color="blue">{selectedRows.size} selected</Badge>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Download className="w-4 h-4" />
          </motion.button>
        </div>
      </Flex>

      {/* Filters */}
      {(searchable || filterable) && (
        <div className="mb-4 space-y-4">
          <Flex className="gap-4">
            {searchable && (
              <div className="flex-1 max-w-sm">
                <TextInput
                  icon={Search}
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}

            {filterable &&
              filters.map((filter) => (
                <MultiSelect
                  key={String(filter.key)}
                  placeholder={filter.label}
                  onValueChange={(values) =>
                    setSelectedFilters((prev) => ({
                      ...prev,
                      [filter.key]: values,
                    }))
                  }
                >
                  {filter.options.map((option) => (
                    <MultiSelectItem key={option.value} value={option.value}>
                      {option.label}
                    </MultiSelectItem>
                  ))}
                </MultiSelect>
              ))}
          </Flex>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell className="w-12">
                <input
                  type="checkbox"
                  checked={
                    selectedRows.size === paginatedData.length &&
                    paginatedData.length > 0
                  }
                  onChange={handleSelectAll}
                  className="rounded border-gray-300"
                />
              </TableHeaderCell>

              {columns.map((column) => (
                <TableHeaderCell
                  key={String(column.key)}
                  className={cn(
                    column.width,
                    column.sortable &&
                      'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800'
                  )}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <Flex className="items-center gap-1">
                    <span>{column.header}</span>
                    {column.sortable && (
                      <ArrowUpDown
                        className={cn(
                          'w-4 h-4 text-gray-400',
                          sortColumn === column.key && 'text-blue-600'
                        )}
                      />
                    )}
                  </Flex>
                </TableHeaderCell>
              ))}

              {actions.length > 0 && (
                <TableHeaderCell className="w-20">Actions</TableHeaderCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            <AnimatePresence mode="wait">
              {paginatedData.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    'hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors',
                    onRowClick && 'cursor-pointer',
                    selectedRows.has(item.id) &&
                      'bg-blue-50 dark:bg-blue-900/20'
                  )}
                  onClick={() => onRowClick?.(item)}
                >
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedRows.has(item.id)}
                      onChange={() => handleSelectRow(item.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="rounded border-gray-300"
                    />
                  </TableCell>

                  {columns.map((column) => (
                    <TableCell key={String(column.key)}>
                      {column.render
                        ? column.render(item[column.key as keyof T], item)
                        : String(item[column.key as keyof T])}
                    </TableCell>
                  ))}

                  {actions.length > 0 && (
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {actions.map((action, actionIndex) => (
                          <motion.button
                            key={actionIndex}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation()
                              action.onClick(item)
                            }}
                            className={cn(
                              'p-1.5 rounded-lg transition-colors',
                              action.variant === 'danger'
                                ? 'hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600'
                            )}
                          >
                            {action.icon}
                          </motion.button>
                        ))}
                      </div>
                    </TableCell>
                  )}
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Flex className="mt-4 items-center justify-between">
          <Text className="text-sm text-gray-500">
            Showing {(currentPage - 1) * pageSize + 1} to{' '}
            {Math.min(currentPage * pageSize, filteredData.length)} of{' '}
            {filteredData.length} results
          </Text>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1
              return (
                <Button
                  key={page}
                  size="sm"
                  variant={currentPage === page ? 'primary' : 'secondary'}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              )
            })}

            {totalPages > 5 && <span className="px-2">...</span>}

            <Button
              size="sm"
              variant="secondary"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </Flex>
      )}
    </Card>
  )
}
