'use client'

import { useState } from 'react'
import { X, Plus, Filter } from 'lucide-react'
import { Button } from 'antd'
import { useTranslations } from 'next-intl'
import {
  FilterOperator,
  FilterLogic,
  FieldType,
  type FilterCondition,
  type FilterField,
} from '@/types/data-grid'

interface FilterBuilderProps {
  fields: FilterField[]
  conditions: FilterCondition[]
  onChange: (conditions: FilterCondition[]) => void
  onApply?: () => void
  onClear?: () => void
}

export function FilterBuilder({
  fields,
  conditions,
  onChange,
  onApply,
  onClear,
}: FilterBuilderProps) {
  const t = useTranslations()
  const [isOpen, setIsOpen] = useState(false)

  const addCondition = () => {
    const newCondition: FilterCondition = {
      id: Date.now().toString(),
      field: fields[0]?.key || '',
      operator: FilterOperator.EQUALS,
      value: '',
      logic: FilterLogic.AND,
    }
    onChange([...conditions, newCondition])
  }

  const updateCondition = (id: string, updates: Partial<FilterCondition>) => {
    onChange(conditions.map((c) => (c.id === id ? { ...c, ...updates } : c)))
  }

  const removeCondition = (id: string) => {
    onChange(conditions.filter((c) => c.id !== id))
  }

  const getOperatorsForType = (type: FieldType) => {
    switch (type) {
      case FieldType.TEXT:
        return [
          {
            label: t('filters.operators.equals'),
            value: FilterOperator.EQUALS,
          },
          {
            label: t('filters.operators.notEquals'),
            value: FilterOperator.NOT_EQUALS,
          },
          {
            label: t('filters.operators.contains'),
            value: FilterOperator.CONTAINS,
          },
          {
            label: t('filters.operators.notContains'),
            value: FilterOperator.NOT_CONTAINS,
          },
          {
            label: t('filters.operators.startsWith'),
            value: FilterOperator.STARTS_WITH,
          },
          {
            label: t('filters.operators.endsWith'),
            value: FilterOperator.ENDS_WITH,
          },
          {
            label: t('filters.operators.isEmpty'),
            value: FilterOperator.IS_EMPTY,
          },
          {
            label: t('filters.operators.isNotEmpty'),
            value: FilterOperator.IS_NOT_EMPTY,
          },
        ]
      case FieldType.NUMBER:
      case FieldType.DATE:
        return [
          {
            label: t('filters.operators.equals'),
            value: FilterOperator.EQUALS,
          },
          {
            label: t('filters.operators.notEquals'),
            value: FilterOperator.NOT_EQUALS,
          },
          {
            label: t('filters.operators.greaterThan'),
            value: FilterOperator.GREATER_THAN,
          },
          {
            label: t('filters.operators.lessThan'),
            value: FilterOperator.LESS_THAN,
          },
          {
            label: t('filters.operators.between'),
            value: FilterOperator.BETWEEN,
          },
        ]
      case FieldType.SELECT:
      case FieldType.BOOLEAN:
        return [
          {
            label: t('filters.operators.equals'),
            value: FilterOperator.EQUALS,
          },
          {
            label: t('filters.operators.notEquals'),
            value: FilterOperator.NOT_EQUALS,
          },
        ]
      default:
        return []
    }
  }

  if (!isOpen) {
    return (
      <Button
        icon={<Filter className="w-4 h-4" />}
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2"
      >
        {t('filters.button')}{' '}
        {conditions.length > 0 && `(${conditions.length})`}
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{t('filters.title')}</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-gray-100 rounded"
            aria-label={t('common.button.close')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {conditions.map((condition, index) => {
            const field = fields.find((f) => f.key === condition.field)
            const operators = field ? getOperatorsForType(field.type) : []

            return (
              <div key={condition.id} className="flex items-center gap-2">
                {index > 0 && (
                  <select
                    value={condition.logic}
                    onChange={(e) =>
                      updateCondition(condition.id, {
                        logic: e.target.value as FilterLogic,
                      })
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    aria-label={t('filters.logic')}
                  >
                    <option value={FilterLogic.AND}>{t('filters.and')}</option>
                    <option value={FilterLogic.OR}>{t('filters.or')}</option>
                  </select>
                )}

                <select
                  value={condition.field}
                  onChange={(e) =>
                    updateCondition(condition.id, {
                      field: e.target.value,
                    })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  aria-label={t('filters.field')}
                >
                  {fields.map((field) => (
                    <option key={field.key} value={field.key}>
                      {field.label}
                    </option>
                  ))}
                </select>

                <select
                  value={condition.operator}
                  onChange={(e) =>
                    updateCondition(condition.id, {
                      operator: e.target.value as FilterOperator,
                    })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  aria-label={t('filters.operator')}
                >
                  {operators.map((op) => (
                    <option key={op.value} value={op.value}>
                      {op.label}
                    </option>
                  ))}
                </select>

                {condition.operator !== FilterOperator.IS_EMPTY &&
                  condition.operator !== FilterOperator.IS_NOT_EMPTY &&
                  (field?.type === FieldType.SELECT && field.options ? (
                    <select
                      value={condition.value}
                      onChange={(e) =>
                        updateCondition(condition.id, {
                          value: e.target.value,
                        })
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md flex-1"
                      aria-label={t('filters.value')}
                    >
                      <option value="">{t('common.select.placeholder')}</option>
                      {field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={
                        field?.type === FieldType.NUMBER
                          ? 'number'
                          : field?.type === FieldType.DATE
                            ? 'date'
                            : 'text'
                      }
                      value={condition.value}
                      onChange={(e) =>
                        updateCondition(condition.id, {
                          value: e.target.value,
                        })
                      }
                      placeholder={t('filters.valuePlaceholder')}
                      className="px-3 py-2 border border-gray-300 rounded-md flex-1"
                      aria-label={t('filters.value')}
                    />
                  ))}

                <button
                  onClick={() => removeCondition(condition.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                  aria-label={t('filters.removeCondition')}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )
          })}

          <button
            onClick={addCondition}
            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md"
          >
            <Plus className="w-4 h-4" />
            {t('filters.addCondition')}
          </button>
        </div>

        <div className="flex justify-between mt-6 pt-4 border-t">
          <button
            onClick={() => {
              onChange([])
              onClear?.()
            }}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            {t('filters.clearAll')}
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              {t('common.button.cancel')}
            </button>
            <button
              onClick={() => {
                onApply?.()
                setIsOpen(false)
              }}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md"
            >
              {t('filters.apply')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
