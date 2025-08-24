'use client'

import { Bell } from 'lucide-react'
import { useState } from 'react'

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount] = useState(3) // This would come from a real-time subscription

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-md hover:bg-gray-100 transition-colors relative"
        aria-label="Notifications"
      >
        <Bell className="w-4 h-4 text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {/* Notification items would go here */}
            <div className="p-4 text-center text-gray-500">
              No new notifications
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
