import '@ant-design/v5-patch-for-react-19'
import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Providers } from './providers'
import { ThemeScript } from '@/components/providers/ThemeScript'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pika Dashboard',
  description: 'Business and Admin Management Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
