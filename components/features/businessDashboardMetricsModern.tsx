'use client'

import {
  ArrowUpOutlined,
  TagOutlined,
  RiseOutlined,
  QrcodeOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { Card, Col, Row, Statistic } from 'antd'
import { useTranslations } from 'next-intl'

interface BusinessDashboardMetricsModernProps {
  businessId?: string
}

export function BusinessDashboardMetricsModern({
  businessId,
}: BusinessDashboardMetricsModernProps) {
  const t = useTranslations('dashboard.metrics')

  // Fetch business-specific metrics
  // In production, these would come from the API using businessId
  const metrics = {
    activeVouchers: businessId ? 8 : 0,
    totalRedemptions: 234,
    totalScans: 567,
    uniqueCustomers: 89,
  }

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title={t('activeVouchers')}
            value={metrics.activeVouchers}
            prefix={<TagOutlined />}
            valueStyle={{ color: '#1890ff' }}
            suffix={
              <span className="text-sm text-green-500">
                <ArrowUpOutlined />
                5.2%
              </span>
            }
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title={t('totalRedemptions')}
            value={metrics.totalRedemptions}
            prefix={<RiseOutlined />}
            valueStyle={{ color: '#52c41a' }}
            suffix={
              <span className="text-sm text-green-500">
                <ArrowUpOutlined />
                12.8%
              </span>
            }
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title={t('totalScans')}
            value={metrics.totalScans}
            prefix={<QrcodeOutlined />}
            valueStyle={{ color: '#722ed1' }}
            suffix={
              <span className="text-sm text-green-500">
                <ArrowUpOutlined />
                18.3%
              </span>
            }
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title={t('uniqueCustomers')}
            value={metrics.uniqueCustomers}
            prefix={<TeamOutlined />}
            valueStyle={{ color: '#faad14' }}
            suffix={
              <span className="text-sm text-green-500">
                <ArrowUpOutlined />
                22.5%
              </span>
            }
          />
        </Card>
      </Col>
    </Row>
  )
}
