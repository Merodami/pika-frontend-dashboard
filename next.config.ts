import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from 'next'

const withNextIntl = createNextIntlPlugin('./i18n.ts')

const nextConfig: NextConfig = {
  transpilePackages: ['@Merodami/pika-api', '@Merodami/pika-types'],
  experimental: {
    optimizePackageImports: [
      'antd',
      'lucide-react',
      '@ant-design/nextjs-registry',
    ],
  },
}

export default withNextIntl(nextConfig)
