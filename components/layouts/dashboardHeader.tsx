import type { User as UserType } from '@/app/services/authService'
import { NotificationDropdown } from '@/components/features/notificationDropdown'
import { UserMenu } from '@/components/features/userMenu'
import { ThemeToggle } from '@/components/ui/themeToggle'
import type { Locale } from '@/i18n/config'

interface DashboardHeaderProps {
  user: UserType
  locale: Locale
}

export async function DashboardHeader({ user }: DashboardHeaderProps) {

  return (
    <header className="h-11 bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left section - Empty for cleaner look */}
        <div className="flex items-center gap-4">
        </div>

        {/* Right section - User controls */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <NotificationDropdown />

          {/* User Menu */}
          <UserMenu user={user} />
        </div>
      </div>
    </header>
  )
}
