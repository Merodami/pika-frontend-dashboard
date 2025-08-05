import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { Locale } from '@/i18n/config'

interface AppState {
  // UI State
  sidebarCollapsed: boolean
  theme: 'light' | 'dark'
  locale: Locale | null // User's preferred locale

  // Form Drafts (persisted during language switches)
  formDrafts: Record<string, any>

  // Language switching state
  isLanguageSwitching: boolean

  // Actions
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  setTheme: (theme: 'light' | 'dark') => void
  setLocale: (locale: Locale) => void
  saveFormDraft: (formId: string, data: Record<string, any>) => void
  clearFormDraft: (formId: string) => void
  clearAllDrafts: () => void
  setLanguageSwitching: (value: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      sidebarCollapsed: false,
      theme: 'light',
      locale: null,
      formDrafts: {},
      isLanguageSwitching: false,

      // Actions
      toggleSidebar: () =>
        set((state) => ({
          sidebarCollapsed: !state.sidebarCollapsed,
        })),

      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      setTheme: (theme) => set({ theme }),

      setLocale: (locale) => set({ locale }),

      saveFormDraft: (formId: string, data: Record<string, any>) =>
        set((state) => ({
          formDrafts: { ...state.formDrafts, [formId]: data },
        })),

      clearFormDraft: (formId: string) =>
        set((state) => {
          const newDrafts = { ...state.formDrafts }
          delete newDrafts[formId]
          return { formDrafts: newDrafts }
        }),

      clearAllDrafts: () => set({ formDrafts: {} }),

      setLanguageSwitching: (value) => set({ isLanguageSwitching: value }),
    }),
    {
      name: 'pika-app-storage',
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        theme: state.theme,
        locale: state.locale, // Persist locale preference
        formDrafts: state.formDrafts, // Persist form drafts
      }),
    }
  )
)
