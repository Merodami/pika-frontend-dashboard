import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UIState {
  // Sidebar state
  sidebarOpen: boolean
  sidebarCollapsed: boolean
  mobileSidebarOpen: boolean

  // Theme
  theme: 'light' | 'dark' | 'system'

  // Responsive states
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean

  // User preferences
  preferences: {
    compactMode: boolean
    showNotifications: boolean
    sidebarPosition: 'left' | 'right'
    language: string
  }

  // Actions
  toggleSidebar: () => void
  setMobileSidebarOpen: (open: boolean) => void
  collapseSidebar: (collapsed: boolean) => void
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  setResponsiveState: (state: {
    isMobile?: boolean
    isTablet?: boolean
    isDesktop?: boolean
  }) => void
  updatePreferences: (preferences: Partial<UIState['preferences']>) => void
  resetUI: () => void
}

const defaultState = {
  sidebarOpen: true,
  sidebarCollapsed: false,
  mobileSidebarOpen: false,
  theme: 'system' as const,
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  preferences: {
    compactMode: false,
    showNotifications: true,
    sidebarPosition: 'left' as const,
    language: 'en',
  },
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      ...defaultState,

      toggleSidebar: () =>
        set((state) => ({
          sidebarOpen: !state.sidebarOpen,
        })),

      setMobileSidebarOpen: (open) =>
        set({
          mobileSidebarOpen: open,
        }),

      collapseSidebar: (collapsed) =>
        set({
          sidebarCollapsed: collapsed,
        }),

      setTheme: (theme) => set({ theme }),

      setResponsiveState: (responsiveState) =>
        set((state) => ({
          ...state,
          ...responsiveState,
        })),

      updatePreferences: (preferences) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            ...preferences,
          },
        })),

      resetUI: () => set(defaultState),
    }),
    {
      name: 'ui-storage',
      storage:
        typeof window !== 'undefined'
          ? createJSONStorage(() => localStorage)
          : undefined,
      partialize: (state) => ({
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed,
        preferences: state.preferences,
      }),
      skipHydration: true,
    }
  )
)

// Selectors for better performance
export const useSidebarState = () => {
  const isOpen = useUIStore((state) => state.sidebarOpen)
  const isCollapsed = useUIStore((state) => state.sidebarCollapsed)
  const isMobileOpen = useUIStore((state) => state.mobileSidebarOpen)
  const toggle = useUIStore((state) => state.toggleSidebar)
  const setMobileOpen = useUIStore((state) => state.setMobileSidebarOpen)
  const collapse = useUIStore((state) => state.collapseSidebar)

  return {
    isOpen,
    isCollapsed,
    isMobileOpen,
    toggle,
    setMobileOpen,
    collapse,
  }
}

export const useTheme = () =>
  useUIStore((state) => ({
    theme: state.theme,
    setTheme: state.setTheme,
  }))

export const useResponsive = () =>
  useUIStore((state) => ({
    isMobile: state.isMobile,
    isTablet: state.isTablet,
    isDesktop: state.isDesktop,
  }))
