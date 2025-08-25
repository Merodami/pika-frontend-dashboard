import { requireAdmin } from '@/app/services/authService'

// Force dynamic rendering since we use cookies for authentication
export const dynamic = 'force-dynamic'

interface SupportPageProps {
  params: Promise<{ locale: string }>
}

export default async function SupportPage({ params }: SupportPageProps) {
  await requireAdmin() // Ensure user has admin access
  await params // Ensure params are resolved

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Support</h1>
      <p className="text-gray-600 mt-2">
        Support management system coming soon...
      </p>
    </div>
  )
}
