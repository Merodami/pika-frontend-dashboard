import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notification } from 'antd'
import type {
  AdminVoucherResponse,
  AdminCreateVoucherRequest,
  AdminUpdateVoucherRequest,
} from '@/lib/api/orval-generated/models'
import {
  createAdminVoucher,
  updateAdminVoucher,
  deleteAdminVoucher,
  publishAdminVoucher,
  expireAdminVoucher,
  uploadAdminVoucherImage,
} from '@/lib/api/orval-generated/endpoints'

export function useVoucherMutations() {
  const queryClient = useQueryClient()

  const createVoucher = useMutation({
    mutationFn: (data: AdminCreateVoucherRequest) => createAdminVoucher(data),
    onSuccess: (voucher: AdminVoucherResponse) => {
      queryClient.invalidateQueries({ queryKey: ['vouchers'] })
      notification.success({
        message: 'Success',
        description: 'Voucher created successfully',
      })
      return voucher
    },
    onError: (error: any) => {
      notification.error({
        message: 'Error',
        description:
          error.response?.data?.message || 'Failed to create voucher',
      })
    },
  })

  const updateVoucher = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string
      data: AdminUpdateVoucherRequest
    }) => updateAdminVoucher(id, data),
    onSuccess: (voucher: AdminVoucherResponse, variables) => {
      queryClient.invalidateQueries({ queryKey: ['vouchers'] })
      queryClient.invalidateQueries({ queryKey: ['voucher', variables.id] })
      notification.success({
        message: 'Success',
        description: 'Voucher updated successfully',
      })
      return voucher
    },
  })

  const deleteVoucher = useMutation({
    mutationFn: (id: string) => deleteAdminVoucher(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vouchers'] })
      notification.success({
        message: 'Success',
        description: 'Voucher deleted successfully',
      })
    },
  })

  const publishVoucher = useMutation({
    mutationFn: (id: string) => publishAdminVoucher(id),
    onSuccess: (voucher: AdminVoucherResponse, voucherId: string) => {
      queryClient.invalidateQueries({ queryKey: ['vouchers'] })
      queryClient.invalidateQueries({ queryKey: ['voucher', voucherId] })
      notification.success({
        message: 'Success',
        description: 'Voucher published successfully',
      })
      return voucher
    },
    onError: (error: any) => {
      notification.error({
        message: 'Error',
        description:
          error.response?.data?.message || 'Failed to publish voucher',
      })
    },
  })

  const expireVoucher = useMutation({
    mutationFn: (id: string) => expireAdminVoucher(id),
    onSuccess: (voucher: AdminVoucherResponse, voucherId: string) => {
      queryClient.invalidateQueries({ queryKey: ['vouchers'] })
      queryClient.invalidateQueries({ queryKey: ['voucher', voucherId] })
      notification.success({
        message: 'Success',
        description: 'Voucher expired successfully',
      })
      return voucher
    },
  })

  const uploadVoucherImage = useMutation({
    mutationFn: ({ voucherId, file }: { voucherId: string; file: File }) => {
      return uploadAdminVoucherImage(voucherId, { image: file })
    },
    onSuccess: (result, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['voucher', variables.voucherId],
      })
      return result
    },
  })

  return {
    createVoucher,
    updateVoucher,
    deleteVoucher,
    publishVoucher,
    expireVoucher,
    uploadVoucherImage,
  }
}
