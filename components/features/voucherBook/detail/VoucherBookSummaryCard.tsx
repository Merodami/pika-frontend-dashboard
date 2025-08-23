'use client'

import { Card, Row, Col, Tag, Space, Divider, Statistic, Progress } from 'antd'
import { Calendar, FileText, BookOpen, Users } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

import {
  VoucherBookStatus,
  VoucherBookType,
  type VoucherBookDomain,
} from '@/lib/api/mappers/voucherBook'

interface VoucherBookSummaryCardProps {
  book: VoucherBookDomain
}

export function VoucherBookSummaryCard({ book }: VoucherBookSummaryCardProps) {
  const t = useTranslations('voucherBooks')

  const getStatusColor = (status: VoucherBookStatus) => {
    switch (status) {
      case VoucherBookStatus.DRAFT:
        return 'default'
      case VoucherBookStatus.READY_FOR_PRINT:
        return 'processing'
      case VoucherBookStatus.PUBLISHED:
        return 'success'
      case VoucherBookStatus.ARCHIVED:
        return 'warning'
      default:
        return 'default'
    }
  }

  const getBookTypeColor = (bookType: VoucherBookType) => {
    switch (bookType) {
      case VoucherBookType.MONTHLY:
        return 'blue'
      case VoucherBookType.SPECIAL_EDITION:
        return 'purple'
      case VoucherBookType.REGIONAL:
        return 'green'
      case VoucherBookType.SEASONAL:
        return 'orange'
      case VoucherBookType.PROMOTIONAL:
        return 'red'
      default:
        return 'default'
    }
  }

  const completionRate = Math.round((book.pageCount / book.totalPages) * 100)

  return (
    <Card className="mb-6">
      <Row gutter={24}>
        <Col xs={24} md={6}>
          {book.coverImageUrl ? (
            <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden border border-gray-200">
              <Image
                src={book.coverImageUrl}
                alt={book.title}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-full aspect-[3/4] rounded-lg bg-gray-100 flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-gray-400" />
            </div>
          )}
        </Col>

        <Col xs={24} md={18}>
          <div className="h-full flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
                {book.edition && (
                  <p className="text-gray-500 mb-2">{book.edition}</p>
                )}
                <Space wrap>
                  <Tag color={getStatusColor(book.status)}>
                    {t(`status.${book.status}`)}
                  </Tag>
                  <Tag
                    color={getBookTypeColor(book.bookType)}
                    icon={<BookOpen className="w-3 h-3" />}
                  >
                    {t(`bookType.${book.bookType}`)}
                  </Tag>
                  <Tag icon={<Calendar className="w-3 h-3" />}>
                    {book.month && `${String(book.month).padStart(2, '0')}/`}
                    {book.year}
                  </Tag>
                </Space>
              </div>
            </div>

            <Divider />

            <Row gutter={[16, 16]}>
              <Col xs={12} sm={6}>
                <Statistic
                  title={t('fields.totalPages')}
                  value={book.totalPages}
                  prefix={<FileText className="w-4 h-4" />}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={t('fields.currentPages')}
                  value={book.pageCount}
                  prefix={<BookOpen className="w-4 h-4" />}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={t('fields.distributionCount')}
                  value={book.distributionCount}
                  prefix={<Users className="w-4 h-4" />}
                />
              </Col>
              <Col xs={12} sm={6}>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-2">
                    {t('fields.completionRate')}
                  </div>
                  <Progress
                    type="circle"
                    percent={completionRate}
                    size={60}
                    strokeWidth={8}
                  />
                </div>
              </Col>
            </Row>

            {book.metadata?.description && (
              <>
                <Divider />
                <p className="text-gray-600">{book.metadata.description}</p>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Card>
  )
}
