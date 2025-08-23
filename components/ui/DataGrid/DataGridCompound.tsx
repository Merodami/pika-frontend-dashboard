'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import type { Table } from '@tanstack/react-table'

// Context for sharing table instance between compound components
interface DataGridContextValue<T = any> {
  table: Table<T> | null
  loading?: boolean
  error?: Error | null
}

const DataGridContext = createContext<DataGridContextValue>({
  table: null,
})

export const useDataGridContext = <T,>() => {
  const context = useContext(DataGridContext) as DataGridContextValue<T>
  if (!context.table) {
    throw new Error('DataGrid compound components must be used within DataGrid.Root')
  }
  return context
}

// Root component that provides context
interface DataGridRootProps<T> {
  table: Table<T>
  loading?: boolean
  error?: Error | null
  children: ReactNode
  className?: string
}

export function DataGridRoot<T>({
  table,
  loading,
  error,
  children,
  className = '',
}: DataGridRootProps<T>) {
  return (
    <DataGridContext.Provider value={{ table, loading, error }}>
      <div className={`space-y-4 ${className}`}>
        {children}
      </div>
    </DataGridContext.Provider>
  )
}

// Toolbar component
interface DataGridToolbarProps {
  children?: ReactNode
  className?: string
}

export function DataGridToolbar({ 
  children, 
  className = '' 
}: DataGridToolbarProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      {children}
    </div>
  )
}

// Search component
interface DataGridSearchProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
}

export function DataGridSearch({ 
  placeholder = 'Search...', 
  value = '',
  onChange,
  className = '' 
}: DataGridSearchProps) {
  const { table } = useDataGridContext()
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (onChange) {
      onChange(newValue)
    } else if (table) {
      table.setGlobalFilter(newValue)
    }
  }
  
  return (
    <div className={`relative ${className}`}>
      <svg
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        placeholder={placeholder}
        value={value || table?.getState().globalFilter || ''}
        onChange={handleChange}
        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full"
      />
    </div>
  )
}

// Filter component
interface DataGridFiltersProps {
  children?: ReactNode
  className?: string
}

export function DataGridFilters({ 
  children, 
  className = '' 
}: DataGridFiltersProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {children}
    </div>
  )
}

// Actions component
interface DataGridActionsProps {
  children?: ReactNode
  className?: string
}

export function DataGridActions({ 
  children, 
  className = '' 
}: DataGridActionsProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {children}
    </div>
  )
}

// Export the compound components as a single object
export const DataGrid = {
  Root: DataGridRoot,
  Toolbar: DataGridToolbar,
  Search: DataGridSearch,
  Filters: DataGridFilters,
  Actions: DataGridActions,
}