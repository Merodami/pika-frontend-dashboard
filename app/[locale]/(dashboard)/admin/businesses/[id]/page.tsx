import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { BusinessDetailView } from '@/components/features/business/BusinessDetailView'
import type { Locale } from '@/i18n/config'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; id: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: `${t('business.detail.title')} | ${t('dashboard.title')}`,
    description: t('business.detail.description'),
  }
}

export default async function BusinessDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; id: string }>
}) {
  const { id, locale } = await params
  return <BusinessDetailView businessId={id} locale={locale} mode="page" />
}
