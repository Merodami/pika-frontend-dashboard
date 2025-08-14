'use client'

import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'
import { Toaster } from 'sonner'

import { ApiErrorBoundary } from '@/components/providers/ApiErrorBoundary'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

import { QueryProvider } from './providers/QueryProvider'

// Initialize API debugging in development
if (process.env.NODE_ENV === 'development') {
  import('@/lib/api/debug-helpers')
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#1890ff',
                borderRadius: 6,
              },
            }}
          >
            <ApiErrorBoundary>{children}</ApiErrorBoundary>
            <Toaster position="top-right" richColors />
          </ConfigProvider>
        </AntdRegistry>
      </ThemeProvider>
    </QueryProvider>
  )
}
