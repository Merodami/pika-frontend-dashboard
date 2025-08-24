'use client'

import { Row, Col, Button } from 'antd'
import { Eye } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { formatDateTime } from '@/lib/utils/date'
import type { VoucherBookDomain } from '@/lib/api/mappers/voucherBook'

interface VoucherBookOverviewProps {
  book: VoucherBookDomain
}

export function VoucherBookOverview({ book }: VoucherBookOverviewProps) {
  const t = useTranslations('voucherBooks')

  return (
    <div className="space-y-6">
      {/* Book Information */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          {t('detail.sections.information')}
        </h3>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <div className="text-gray-500 text-sm mb-1">{t('fields.id')}</div>
            <div className="font-medium">{book.id}</div>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <div className="text-gray-500 text-sm mb-1">
              {t('fields.createdAt')}
            </div>
            <div className="font-medium">
              {formatDateTime(new Date(book.createdAt))}
            </div>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <div className="text-gray-500 text-sm mb-1">
              {t('fields.updatedAt')}
            </div>
            <div className="font-medium">
              {formatDateTime(new Date(book.updatedAt))}
            </div>
          </Col>
          {book.publishedAt && (
            <Col xs={24} sm={12} md={8}>
              <div className="text-gray-500 text-sm mb-1">
                {t('fields.publishedAt')}
              </div>
              <div className="font-medium">
                {formatDateTime(new Date(book.publishedAt))}
              </div>
            </Col>
          )}
          {book.metadata?.targetAudience && (
            <Col xs={24} sm={12} md={8}>
              <div className="text-gray-500 text-sm mb-1">
                {t('fields.targetAudience')}
              </div>
              <div className="font-medium">{book.metadata.targetAudience}</div>
            </Col>
          )}
        </Row>
      </div>

      {/* Images */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          {t('detail.sections.images')}
        </h3>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <div className="text-gray-500 text-sm mb-2">
              {t('fields.coverImage')}
            </div>
            {book.coverImageUrl ? (
              <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={book.coverImageUrl}
                  alt="Cover"
                  fill
                  className="object-cover"
                />
                <Button
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                  icon={<Eye className="w-4 h-4" />}
                  onClick={() => window.open(book.coverImageUrl!, '_blank')}
                  size="small"
                />
              </div>
            ) : (
              <div className="w-full aspect-[3/4] rounded-lg bg-gray-100 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="text-sm">{t('fields.noCoverImage')}</div>
                </div>
              </div>
            )}
          </Col>
          <Col xs={24} sm={12}>
            <div className="text-gray-500 text-sm mb-2">
              {t('fields.backImage')}
            </div>
            {book.backImageUrl ? (
              <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={book.backImageUrl}
                  alt="Back"
                  fill
                  className="object-cover"
                />
                <Button
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                  icon={<Eye className="w-4 h-4" />}
                  onClick={() => window.open(book.backImageUrl!, '_blank')}
                  size="small"
                />
              </div>
            ) : (
              <div className="w-full aspect-[3/4] rounded-lg bg-gray-100 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="text-sm">{t('fields.noBackImage')}</div>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </div>
  )
}
