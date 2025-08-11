import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from 'next'

const withNextIntl = createNextIntlPlugin('./i18n.ts')

const nextConfig: NextConfig = {
  transpilePackages: ['@merodami/pika-api', '@merodami/pika-types'],
  experimental: {
    optimizePackageImports: [
      'antd',
      'lucide-react',
      '@ant-design/nextjs-registry',
    ],
  },
  webpack: (config) => {
    // Create aliases for old package names to new ones
    config.resolve.alias = {
      ...config.resolve.alias,
      '@pika/types': '@merodami/pika-types',
      '@pika/api': '@merodami/pika-api',
    }
    return config
  },
}

export default withNextIntl(nextConfig)