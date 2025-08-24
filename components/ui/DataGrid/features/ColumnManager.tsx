'use client'

import { useState, useCallback } from 'react'
import { Drawer, Switch, Button, Space } from 'antd'
import { Settings, GripVertical, Eye, EyeOff, Pin } from 'lucide-react'
import { useTranslations } from 'next-intl'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface Column {
  id: string
  label: string
  visible: boolean
  pinned?: 'left' | 'right' | null
  width?: number
}

interface ColumnManagerProps {
  columns: Column[]
  onChange: (columns: Column[]) => void
  onReset?: () => void
}

// Sortable column item
function SortableColumnItem({
  column,
  onToggle,
  onPin,
}: {
  column: Column
  onToggle: (id: string) => void
  onPin: (id: string, position: 'left' | 'right' | null) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: column.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between p-3 bg-white border rounded-lg hover:shadow-sm"
    >
      <div className="flex items-center gap-3">
        <button
          {...attributes}
          {...listeners}
          className="cursor-move text-gray-400 hover:text-gray-600"
        >
          <GripVertical className="w-4 h-4" />
        </button>

        <Switch
          checked={column.visible}
          onChange={() => onToggle(column.id)}
          size="small"
        />

        <span className={`${!column.visible ? 'text-gray-400' : ''}`}>
          {column.label}
        </span>
      </div>

      <Space>
        {column.pinned === 'left' && (
          <Button
            type="text"
            size="small"
            icon={<Pin className="w-4 h-4 rotate-45" />}
            onClick={() => onPin(column.id, null)}
          />
        )}
        {column.pinned === 'right' && (
          <Button
            type="text"
            size="small"
            icon={<Pin className="w-4 h-4 rotate-45" />}
            onClick={() => onPin(column.id, null)}
          />
        )}
        {!column.pinned && column.visible && (
          <>
            <Button
              type="text"
              size="small"
              icon={<Pin className="w-4 h-4 rotate-90" />}
              onClick={() => onPin(column.id, 'left')}
            />
            <Button
              type="text"
              size="small"
              icon={<Pin className="w-4 h-4 -rotate-90" />}
              onClick={() => onPin(column.id, 'right')}
            />
          </>
        )}
      </Space>
    </div>
  )
}

export function ColumnManager({
  columns,
  onChange,
  onReset,
}: ColumnManagerProps) {
  const t = useTranslations()
  const [isOpen, setIsOpen] = useState(false)
  const [localColumns, setLocalColumns] = useState(columns)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setLocalColumns((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }, [])

  const handleToggle = useCallback((id: string) => {
    setLocalColumns((cols) =>
      cols.map((col) =>
        col.id === id ? { ...col, visible: !col.visible } : col
      )
    )
  }, [])

  const handlePin = useCallback(
    (id: string, position: 'left' | 'right' | null) => {
      setLocalColumns((cols) =>
        cols.map((col) => (col.id === id ? { ...col, pinned: position } : col))
      )
    },
    []
  )

  const handleShowAll = useCallback(() => {
    setLocalColumns((cols) => cols.map((col) => ({ ...col, visible: true })))
  }, [])

  const handleHideAll = useCallback(() => {
    setLocalColumns((cols) => cols.map((col) => ({ ...col, visible: false })))
  }, [])

  const handleApply = useCallback(() => {
    onChange(localColumns)
    setIsOpen(false)
  }, [localColumns, onChange])

  const handleCancel = useCallback(() => {
    setLocalColumns(columns)
    setIsOpen(false)
  }, [columns])

  const handleReset = useCallback(() => {
    if (onReset) {
      onReset()
      setLocalColumns(columns)
    }
  }, [columns, onReset])

  const visibleCount = localColumns.filter((col) => col.visible).length
  const totalCount = localColumns.length

  return (
    <>
      <Button
        icon={<Settings className="w-4 h-4" />}
        onClick={() => setIsOpen(true)}
      >
        {t('columns.manage')}
      </Button>

      <Drawer
        title={t('columns.title')}
        placement="right"
        onClose={handleCancel}
        open={isOpen}
        width={400}
        footer={
          <div className="flex justify-between">
            <Button onClick={handleReset} disabled={!onReset}>
              {t('columns.reset')}
            </Button>
            <Space>
              <Button onClick={handleCancel}>
                {t('common.button.cancel')}
              </Button>
              <Button type="primary" onClick={handleApply}>
                {t('common.button.apply')}
              </Button>
            </Space>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">
              {t('columns.showing', {
                visible: visibleCount,
                total: totalCount,
              })}
            </span>
            <Space>
              <Button size="small" onClick={handleShowAll}>
                <Eye className="w-4 h-4 mr-1" />
                {t('columns.showAll')}
              </Button>
              <Button size="small" onClick={handleHideAll}>
                <EyeOff className="w-4 h-4 mr-1" />
                {t('columns.hideAll')}
              </Button>
            </Space>
          </div>

          <div className="text-sm text-gray-500 mb-2">
            {t('columns.dragToReorder')}
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={localColumns.map((col) => col.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {localColumns.map((column) => (
                  <SortableColumnItem
                    key={column.id}
                    column={column}
                    onToggle={handleToggle}
                    onPin={handlePin}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">{t('columns.pinnedColumns')}</h4>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-medium">{t('columns.pinnedLeft')}:</span>
                <span className="ml-2 text-gray-600">
                  {localColumns
                    .filter((c) => c.pinned === 'left')
                    .map((c) => c.label)
                    .join(', ') || t('common.none')}
                </span>
              </div>
              <div className="text-sm">
                <span className="font-medium">{t('columns.pinnedRight')}:</span>
                <span className="ml-2 text-gray-600">
                  {localColumns
                    .filter((c) => c.pinned === 'right')
                    .map((c) => c.label)
                    .join(', ') || t('common.none')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  )
}
