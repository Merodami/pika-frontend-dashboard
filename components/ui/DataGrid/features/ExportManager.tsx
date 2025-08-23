'use client'

import { useState } from 'react'
import { Button, Dropdown, Modal, Checkbox, Space, message } from 'antd'
import { Download, FileText, FileSpreadsheet, FileJson } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { MenuProps } from 'antd'
import { ExportFormat } from '@/types/data-grid'
import * as XLSX from 'xlsx'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}

interface ExportManagerProps<T> {
  data: T[]
  columns: Array<{
    key: string
    label: string
    accessor?: (item: T) => any
  }>
  formats?: ExportFormat[]
  filename?: string
  onExport?: (format: ExportFormat, data: T[]) => void
}

export function ExportManager<T extends Record<string, any>>({
  data,
  columns,
  formats = [ExportFormat.CSV, ExportFormat.XLSX, ExportFormat.JSON],
  filename = 'export',
  onExport,
}: ExportManagerProps<T>) {
  const t = useTranslations()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFields, setSelectedFields] = useState<Set<string>>(
    new Set(columns.map((col) => col.key))
  )
  const [loading, setLoading] = useState(false)

  const handleFieldToggle = (key: string) => {
    const newSelected = new Set(selectedFields)
    if (newSelected.has(key)) {
      newSelected.delete(key)
    } else {
      newSelected.add(key)
    }
    setSelectedFields(newSelected)
  }

  const prepareData = () => {
    const selectedColumns = columns.filter((col) => selectedFields.has(col.key))

    return data.map((item) => {
      const row: Record<string, any> = {}
      selectedColumns.forEach((col) => {
        if (col.accessor) {
          row[col.label] = col.accessor(item)
        } else {
          row[col.label] = item[col.key]
        }
      })
      return row
    })
  }

  const exportToCSV = () => {
    const preparedData = prepareData()
    const headers = Object.keys(preparedData[0] || {})
    const csvContent = [
      headers.join(','),
      ...preparedData.map((row) =>
        headers
          .map((header) => {
            const value = row[header]
            // Escape commas and quotes in CSV
            if (
              typeof value === 'string' &&
              (value.includes(',') || value.includes('"'))
            ) {
              return `"${value.replace(/"/g, '""')}"`
            }
            return value ?? ''
          })
          .join(',')
      ),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  const exportToExcel = async () => {
    const preparedData = prepareData()
    const worksheet = XLSX.utils.json_to_sheet(preparedData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data')

    // Auto-size columns
    const maxWidths: Record<string, number> = {}
    preparedData.forEach((row) => {
      Object.entries(row).forEach(([key, value]) => {
        const length = String(value).length
        maxWidths[key] = Math.max(maxWidths[key] || 10, length)
      })
    })

    worksheet['!cols'] = Object.keys(preparedData[0] || {}).map((key) => ({
      wch: Math.min(maxWidths[key] || 10, 50),
    }))

    XLSX.writeFile(
      workbook,
      `${filename}-${new Date().toISOString().split('T')[0]}.xlsx`
    )
  }

  const exportToPDF = () => {
    const preparedData = prepareData()
    const doc = new jsPDF()

    const headers = Object.keys(preparedData[0] || {})
    const rows = preparedData.map((row) => headers.map((header) => row[header]))

    doc.autoTable({
      head: [headers],
      body: rows,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [66, 139, 202] },
    })

    doc.save(`${filename}-${new Date().toISOString().split('T')[0]}.pdf`)
  }

  const exportToJSON = () => {
    const preparedData = prepareData()
    const jsonContent = JSON.stringify(preparedData, null, 2)
    const blob = new Blob([jsonContent], { type: 'application/json' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${filename}-${new Date().toISOString().split('T')[0]}.json`
    link.click()
  }

  const handleExport = async (format: ExportFormat) => {
    setLoading(true)
    try {
      if (onExport) {
        onExport(format, data)
      }

      switch (format) {
        case ExportFormat.CSV:
          exportToCSV()
          break
        case ExportFormat.XLSX:
          await exportToExcel()
          break
        case ExportFormat.PDF:
          exportToPDF()
          break
        case ExportFormat.JSON:
          exportToJSON()
          break
      }

      message.success(t('export.success'))
      setIsModalOpen(false)
    } catch (error) {
      message.error(t('export.error'))
      console.error('Export error:', error)
    } finally {
      setLoading(false)
    }
  }

  const menuItems: MenuProps['items'] = formats.map((format) => ({
    key: format,
    label: t(`export.format.${format}`),
    icon: getFormatIcon(format),
    onClick: () => {
      if (columns.length > 5) {
        // Show field selection for complex exports
        setIsModalOpen(true)
      } else {
        handleExport(format)
      }
    },
  }))

  function getFormatIcon(format: ExportFormat) {
    switch (format) {
      case ExportFormat.CSV:
        return <FileText className="w-4 h-4" />
      case ExportFormat.XLSX:
        return <FileSpreadsheet className="w-4 h-4" />
      case ExportFormat.PDF:
        return <FileText className="w-4 h-4" />
      case ExportFormat.JSON:
        return <FileJson className="w-4 h-4" />
      default:
        return <Download className="w-4 h-4" />
    }
  }

  return (
    <>
      <Dropdown menu={{ items: menuItems }} placement="bottomRight">
        <Button icon={<Download className="w-4 h-4" />}>
          {t('export.button')}
        </Button>
      </Dropdown>

      <Modal
        title={t('export.selectFields')}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            {t('common.button.cancel')}
          </Button>,
          <Dropdown
            key="export"
            menu={{
              items: formats.map((format) => ({
                key: format,
                label: t(`export.format.${format}`),
                icon: getFormatIcon(format),
                onClick: () => handleExport(format),
              })),
            }}
            placement="topRight"
          >
            <Button type="primary" loading={loading}>
              {t('export.button')}
            </Button>
          </Dropdown>,
        ]}
      >
        <div className="space-y-4">
          <div className="flex justify-between mb-4">
            <span className="text-sm text-gray-600">
              {t('export.selectedFields', { count: selectedFields.size })}
            </span>
            <Space>
              <Button
                size="small"
                onClick={() =>
                  setSelectedFields(new Set(columns.map((col) => col.key)))
                }
              >
                {t('export.selectAll')}
              </Button>
              <Button size="small" onClick={() => setSelectedFields(new Set())}>
                {t('export.deselectAll')}
              </Button>
            </Space>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {columns.map((col) => (
              <Checkbox
                key={col.key}
                checked={selectedFields.has(col.key)}
                onChange={() => handleFieldToggle(col.key)}
              >
                {col.label}
              </Checkbox>
            ))}
          </div>
        </div>
      </Modal>
    </>
  )
}
