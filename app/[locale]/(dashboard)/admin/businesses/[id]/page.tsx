import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { BusinessDetailView } from '@/components/features/business/BusinessDetailView'
import type { Locale } from '@/i18n/config'

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; id: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale })
  
  return {
    title: `${t('business.detail.title')} | ${t('dashboard.title')}`,
    description: t('business.detail.description'),
  }
}

export default function BusinessDetailPage({
  params,
}: {
  params: { locale: Locale; id: string }
}) {
  return <BusinessDetailView businessId={params.id} locale={params.locale} mode="page" />
}