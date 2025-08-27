'use client'

import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  ShoppingOutlined,
  ShopOutlined,
  BookOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import { Card, Col, Row, Statistic } from 'antd'
import { useTranslations } from 'next-intl'

export function AdminDashboardMetricsModern() {
  const t = useTranslations('dashboard.metrics')

  // These would be real API calls
  const metrics = {
    totalVouchers: 1234,
    activeBusinesses: 567,
    voucherBooks: 12,
    pendingFraudCases: 3,
  }

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title={t('totalVouchers')}
            value={metrics.totalVouchers}
            prefix={<ShoppingOutlined />}
            valueStyle={{ color: '#1890ff' }}
            suffix={
              <span className="text-sm text-green-500">
                <ArrowUpOutlined />
                8.2%
              </span>
            }
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title={t('activeBusinesses')}
            value={metrics.activeBusinesses}
            prefix={<ShopOutlined />}
            valueStyle={{ color: '#52c41a' }}
            suffix={
              <span className="text-sm text-green-500">
                <ArrowUpOutlined />
                3.4%
              </span>
            }
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title={t('voucherBooks')}
            value={metrics.voucherBooks}
            prefix={<BookOutlined />}
            valueStyle={{ color: '#722ed1' }}
            suffix={
              <span className="text-sm text-green-500">
                <ArrowUpOutlined />
                1%
              </span>
            }
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title={t('pendingFraudCases')}
            value={metrics.pendingFraudCases}
            prefix={<WarningOutlined />}
            valueStyle={{ color: '#ff4d4f' }}
            suffix={
              <span className="text-sm text-red-500">
                <ArrowDownOutlined />
                2%
              </span>
            }
          />
        </Card>
      </Col>
    </Row>
  )
}