import {
  getInternalCategoryHierarchy,
  getAdminCategoryById,
} from '@/lib/api/orval-client'
import { queryKeys } from '@/lib/api/queryKeys'
import { useApiQuery } from '../base/useApiQuery'

// Add categories to queryKeys if not exists
const categoryKeys = {
  all: () => [...queryKeys.all, 'categories'] as const,
  tree: () => [...categoryKeys.all(), 'tree'] as const,
  detail: (id: string) => [...categoryKeys.all(), 'detail', id] as const,
}

/**
 * Hook to fetch category tree
 */
export function useCategoryTree(options?: { enabled?: boolean }) {
  return useApiQuery({
    queryKey: categoryKeys.tree(),
    queryFn: () => getInternalCategoryHierarchy(),
    enabled: options?.enabled ?? true,
    staleTime: 30 * 60 * 1000, // 30 minutes - categories don't change often
    gcTime: 60 * 60 * 1000, // 1 hour
  })
}

/**
 * Hook to fetch a single category
 */
export function useCategory(id: string, options?: { enabled?: boolean }) {
  return useApiQuery({
    queryKey: categoryKeys.detail(id),
    queryFn: () => getAdminCategoryById(id),
    enabled: options?.enabled ?? !!id,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  })
}
