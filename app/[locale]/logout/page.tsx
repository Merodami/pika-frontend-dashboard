import { redirect } from 'next/navigation'

interface LogoutPageProps {
  params: Promise<{ locale: string }>
}

export default async function LogoutPage({ params }: LogoutPageProps) {
  const { locale } = await params

  // Redirect to the logout API route
  redirect(`/api/auth/logout?locale=${locale}`)
}
