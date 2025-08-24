'use client'

import { Button, Space, Dropdown } from 'antd'
import {
  ArrowLeft,
  Download,
  MoreVertical,
  Edit,
  FileText,
  RefreshCw,
  BookOpen,
  Archive,
  Trash2,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { MenuProps } from 'antd'

import type { VoucherBookDomain } from '@/lib/api/mappers/voucherBook'
import { VoucherBookStatus } from '@/lib/api/mappers/voucherBook'

interface VoucherBookHeaderProps {
  book: VoucherBookDomain
  onBack: () => void
  onEdit: () => void
  onDelete: () => void
  onGeneratePdf: () => void
  onStatusChange: (status: VoucherBookStatus) => void
  onArchive: () => void
  onDuplicate: () => void
}

export function VoucherBookHeader({
  book,
  onBack,
  onEdit,
  onDelete,
  onGeneratePdf,
  onStatusChange,
  onArchive,
  onDuplicate,
}: VoucherBookHeaderProps) {
  const t = useTranslations('voucherBooks')
  const tCommon = useTranslations('common')

  const actionMenuItems: MenuProps['items'] = [
    {
      key: 'edit',
      label: t('actions.edit'),
      icon: <Edit className="w-4 h-4" />,
      onClick: onEdit,
      disabled:
        book.status === VoucherBookStatus.PUBLISHED ||
        book.status === VoucherBookStatus.ARCHIVED,
    },
    {
      key: 'generatePdf',
      label: t('actions.generatePdf'),
      icon: <FileText className="w-4 h-4" />,
      onClick: onGeneratePdf,
      disabled: book.status === VoucherBookStatus.ARCHIVED,
    },
    {
      key: 'changeStatus',
      label: t('actions.changeStatus'),
      icon: <RefreshCw className="w-4 h-4" />,
      onClick: () => onStatusChange(VoucherBookStatus.PUBLISHED),
    },
    { type: 'divider' },
    {
      key: 'duplicate',
      label: t('actions.duplicate'),
      icon: <BookOpen className="w-4 h-4" />,
      onClick: onDuplicate,
    },
    {
      key: 'archive',
      label: t('actions.archive'),
      icon: <Archive className="w-4 h-4" />,
      onClick: onArchive,
      disabled: book.status === VoucherBookStatus.ARCHIVED,
    },
    { type: 'divider' },
    {
      key: 'delete',
      label: t('actions.delete'),
      icon: <Trash2 className="w-4 h-4" />,
      danger: true,
      onClick: onDelete,
      disabled: book.status === VoucherBookStatus.PUBLISHED,
    },
  ]

  return (
    <div className="mb-6 flex items-center justify-between">
      <Button
        icon={<ArrowLeft className="w-4 h-4" />}
        onClick={onBack}
        type="text"
      >
        {tCommon('button.back')}
      </Button>

      <Space>
        {book?.pdfUrl && (
          <Button
            icon={<Download className="w-4 h-4" />}
            onClick={() => window.open(book.pdfUrl!, '_blank')}
          >
            {t('actions.downloadPdf')}
          </Button>
        )}
        <Dropdown menu={{ items: actionMenuItems }} placement="bottomRight">
          <Button icon={<MoreVertical className="w-4 h-4" />}>
            {tCommon('button.actions')}
          </Button>
        </Dropdown>
      </Space>
    </div>
  )
}
