'use client'

import {
  ArrowUpOutlined,
  FileTextOutlined,
  CalendarOutlined,
  DownloadOutlined,
  BulbOutlined,
} from '@ant-design/icons'
import { Card, Col, Row, Statistic } from 'antd'
import { useTranslations } from 'next-intl'

export function ReportsMetricCards() {
  const t = useTranslations('reports')

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title={t('metrics.generated')}
            value={156}
            prefix={<FileTextOutlined />}
            valueStyle={{ color: '#1890ff' }}
            suffix={
              <span className="text-sm text-green-500">
                <ArrowUpOutlined />
                12.5%
              </span>
            }
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title={t('metrics.scheduled')}
            value={24}
            prefix={<CalendarOutlined />}
            valueStyle={{ color: '#52c41a' }}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title={t('metrics.downloads')}
            value={892}
            prefix={<DownloadOutlined />}
            valueStyle={{ color: '#722ed1' }}
            suffix={
              <span className="text-sm text-green-500">
                <ArrowUpOutlined />
                8.3%
              </span>
            }
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title={t('metrics.insights')}
            value={47}
            prefix={<BulbOutlined />}
            valueStyle={{ color: '#fa8c16' }}
            suffix={
              <span className="text-sm text-green-500">
                <ArrowUpOutlined />
                15.2%
              </span>
            }
          />
        </Card>
      </Col>
    </Row>
  )
}