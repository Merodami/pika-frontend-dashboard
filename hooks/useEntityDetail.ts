import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import { useTranslations } from 'next-intl'
import type { Locale } from '@/i18n/config'

export interface EntityDetailConfig<T> {
  entityName: string
  entityKey: string
  fetchFn: (id: string) => Promise<T>
  deleteFn?: (id: string) => Promise<void>
  additionalQueries?: Array<{
    key: string
    fn: (id: string) => Promise<any>
    enabled?: (entity: T | undefined) => boolean
  }>
  mutations?: Record<string, {
    fn: (...args: any[]) => Promise<any>
    onSuccess?: (data: any, variables: any) => void
    invalidateKeys?: string[]
  }>
}

export interface UseEntityDetailOptions {
  locale: Locale
  mode?: 'drawer' | 'page' | 'modal'
  onClose?: () => void
  onDelete?: () => void
}

export function useEntityDetail<T extends { id: string }>(
  entityId: string,
  config: EntityDetailConfig<T>,
  options: UseEntityDetailOptions
) {
  const router = useRouter()
  const t = useTranslations()
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(options.mode === 'drawer' || options.mode === 'modal')
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  // Main entity query
  const entityQuery = useQuery({
    queryKey: [config.entityKey, entityId],
    queryFn: () => config.fetchFn(entityId),
  })

  // Additional queries (e.g., stats, related data)
  const additionalQueries = config.additionalQueries?.reduce((acc, query) => {
    acc[query.key] = useQuery({
      queryKey: [query.key, entityId],
      queryFn: () => query.fn(entityId),
      enabled: query.enabled ? query.enabled(entityQuery.data) : !!entityQuery.data,
    })
    return acc
  }, {} as Record<string, any>) || {}

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: config.deleteFn || (() => Promise.resolve()),
    onSuccess: () => {
      message.success(t(`${config.entityName}.message.deleteSuccess`))
      queryClient.invalidateQueries({ queryKey: [config.entityKey] })
      if (options.onDelete) {
        options.onDelete()
      } else {
        router.push(`/${options.locale}/admin/${config.entityName}s`)
      }
    },
    onError: () => {
      message.error(t('common.message.errorOccurred'))
    },
  })

  // Custom mutations
  const mutations = Object.entries(config.mutations || {}).reduce((acc, [key, mutation]) => {
    acc[key] = useMutation({
      mutationFn: mutation.fn,
      onSuccess: (data, variables) => {
        if (mutation.onSuccess) {
          mutation.onSuccess(data, variables)
        }
        // Invalidate queries
        const keysToInvalidate = mutation.invalidateKeys || [config.entityKey]
        keysToInvalidate.forEach(key => {
          queryClient.invalidateQueries({ queryKey: [key] })
        })
      },
      onError: () => {
        message.error(t('common.message.errorOccurred'))
      },
    })
    return acc
  }, {} as Record<string, any>)

  // Handlers
  const handleClose = useCallback(() => {
    if (options.mode === 'drawer' || options.mode === 'modal') {
      setIsOpen(false)
      setTimeout(() => {
        if (options.onClose) {
          options.onClose()
        } else {
          router.push(`/${options.locale}/admin/${config.entityName}s`)
        }
      }, 300)
    } else {
      router.push(`/${options.locale}/admin/${config.entityName}s`)
    }
  }, [options, router, config.entityName])

  const handleEdit = useCallback(() => {
    router.push(`/${options.locale}/admin/${config.entityName}s/${entityId}/edit`)
  }, [router, options.locale, config.entityName, entityId])

  const handleDelete = useCallback(() => {
    setDeleteModalOpen(true)
  }, [])

  const confirmDelete = useCallback(() => {
    if (config.deleteFn) {
      deleteMutation.mutate(entityId)
    }
    setDeleteModalOpen(false)
  }, [deleteMutation, entityId, config.deleteFn])

  return {
    // State
    entity: entityQuery.data,
    isLoading: entityQuery.isLoading,
    error: entityQuery.error,
    isOpen,
    deleteModalOpen,
    
    // Queries
    additionalData: additionalQueries,
    
    // Mutations
    deleteMutation,
    mutations,
    
    // Handlers
    handleClose,
    handleEdit,
    handleDelete,
    confirmDelete,
    setDeleteModalOpen,
    
    // Utils
    refetch: entityQuery.refetch,
    invalidate: () => queryClient.invalidateQueries({ queryKey: [config.entityKey, entityId] }),
  }
}