'use client'

import { Button } from 'antd'
import { Grid3X3, List, Table } from 'lucide-react'

interface ViewToggleProps {
  view: 'table' | 'cards' | 'list'
  onChange: (view: 'table' | 'cards' | 'list') => void
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center rounded-lg border border-gray-200 bg-white p-1">
      <Button
        type={view === 'table' ? 'primary' : 'text'}
        size="small"
        icon={<Table className="w-4 h-4" />}
        onClick={() => onChange('table')}
        className={`rounded-md ${view === 'table' ? '' : 'hover:bg-gray-50'}`}
      >
        Table
      </Button>
      <Button
        type={view === 'cards' ? 'primary' : 'text'}
        size="small"
        icon={<Grid3X3 className="w-4 h-4" />}
        onClick={() => onChange('cards')}
        className={`rounded-md ${view === 'cards' ? '' : 'hover:bg-gray-50'}`}
      >
        Cards
      </Button>
      <Button
        type={view === 'list' ? 'primary' : 'text'}
        size="small"
        icon={<List className="w-4 h-4" />}
        onClick={() => onChange('list')}
        className={`rounded-md ${view === 'list' ? '' : 'hover:bg-gray-50'}`}
      >
        List
      </Button>
    </div>
  )
}
