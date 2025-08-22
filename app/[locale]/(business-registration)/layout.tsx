import { ConfigProvider } from 'antd'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'

import { Providers } from '@/app/providers'
import { antdTheme } from '@/lib/theme/antd-theme'

export default async function BusinessRegistrationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <Providers>
        <AntdRegistry>
          <ConfigProvider theme={antdTheme}>
            {/* Minimal layout for registration - no sidebar, no navigation */}
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
              <div className="w-full max-w-4xl">{children}</div>
            </div>
          </ConfigProvider>
        </AntdRegistry>
      </Providers>
    </NextIntlClientProvider>
  )
}
