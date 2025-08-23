'use client'

import { useEffect, useState } from 'react'
import Uppy from '@uppy/core'
import { useDropzone } from '@uppy/react'
import XHRUpload from '@uppy/xhr-upload'
import ImageEditor from '@uppy/image-editor'
import Compressor from '@uppy/compressor'
import { message, Modal, Button } from 'antd'
import { Upload as UploadIcon, X, Edit2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

// Import Uppy styles
import '@uppy/core/dist/style.min.css'
import '@uppy/drag-drop/dist/style.min.css'
import '@uppy/image-editor/dist/style.min.css'

interface ImageUploadProps {
  value?: string // Current image URL
  onChange?: (url: string) => void
  onRemove?: () => void
  endpoint?: string
  folder?: string
  isPublic?: boolean
  maxFileSize?: number // in MB
  allowedFileTypes?: string[]
  aspectRatio?: number // For cropping
  width?: number
  height?: number
  label?: string
  required?: boolean
  disabled?: boolean
  placeholder?: React.ReactNode
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  endpoint = '/api/storage/upload',
  folder = 'images',
  isPublic = true,
  maxFileSize = 5, // 5MB default for images
  allowedFileTypes = ['image/*'],
  aspectRatio,
  width = 200,
  height = 200,
  label,
  required = false,
  disabled = false,
  placeholder,
}: ImageUploadProps) {
  const t = useTranslations('common')
  const [uploading, setUploading] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [uppy] = useState(() => {
    const uppyInstance = new Uppy({
      id: `image-upload-${Date.now()}`,
      autoProceed: true,
      allowMultipleUploads: false,
      restrictions: {
        maxFileSize: maxFileSize * 1024 * 1024,
        maxNumberOfFiles: 1,
        allowedFileTypes,
      },
      meta: {
        folder,
        isPublic: isPublic.toString(),
      },
    })

    // Add XHR Upload plugin with proper v5 configuration
    uppyInstance.use(XHRUpload, {
      endpoint,
      formData: true,
      fieldName: 'file',
      headers: {
        ...(typeof window !== 'undefined' && localStorage.getItem('token')
          ? { Authorization: `Bearer ${localStorage.getItem('token')}` }
          : {}),
      },
      // Additional form data will be added via meta fields
    })

    // Add Compressor plugin
    uppyInstance.use(Compressor, {
      quality: 0.9,
      limit: 10,
    })

    // Add Image Editor plugin with aspect ratio
    if (aspectRatio) {
      uppyInstance.use(ImageEditor, {
        quality: 0.9,
        cropperOptions: {
          aspectRatio,
          viewMode: 1,
          responsive: true,
          rotatable: true,
          scalable: true,
          zoomable: true,
        },
      })
    }

    return uppyInstance
  })

  useEffect(() => {
    const handleUploadStart = () => {
      setUploading(true)
    }

    const handleComplete = (result: any) => {
      setUploading(false)
      if (result.successful?.length > 0) {
        const file = result.successful[0]
        const uploadedUrl = file.response?.body?.url || file.response?.uploadURL
        if (uploadedUrl) {
          onChange?.(uploadedUrl)
          message.success(t('upload.imageSuccess'))
        }
      }
    }

    const handleError = (error: any) => {
      setUploading(false)
      console.error('Upload error:', error)
      message.error(error.message || t('upload.imageError'))
    }

    uppy.on('upload', handleUploadStart)
    uppy.on('complete', handleComplete)
    uppy.on('error', handleError)

    return () => {
      uppy.off('upload', handleUploadStart)
      uppy.off('complete', handleComplete)
      uppy.off('error', handleError)
      uppy.destroy()
    }
  }, [uppy, onChange, t])

  const handleRemove = () => {
    Modal.confirm({
      title: t('upload.removeImageTitle'),
      content: t('upload.removeImageContent'),
      okText: t('common.button.remove'),
      cancelText: t('common.button.cancel'),
      okType: 'danger',
      onOk: () => {
        onRemove?.()
        onChange?.('')
      },
    })
  }

  const handleEdit = () => {
    setEditModalOpen(true)
  }

  if (value) {
    // Show uploaded image with actions
    return (
      <div className="image-upload-container">
        {label && (
          <div className="mb-2">
            <label className="text-sm font-medium">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          </div>
        )}
        <div 
          className="relative inline-block border-2 border-gray-200 rounded-lg overflow-hidden"
          style={{ width, height }}
        >
          <Image
            src={value}
            alt="Uploaded"
            width={width}
            height={height}
            className="object-cover"
          />
          {!disabled && (
            <div className="absolute top-2 right-2 flex gap-1">
              <Button
                size="small"
                icon={<Edit2 className="w-3 h-3" />}
                onClick={handleEdit}
                className="bg-white/90"
              />
              <Button
                size="small"
                danger
                icon={<X className="w-3 h-3" />}
                onClick={handleRemove}
                className="bg-white/90"
              />
            </div>
          )}
        </div>

        <Modal
          title={t('upload.replaceImage')}
          open={editModalOpen}
          onCancel={() => setEditModalOpen(false)}
          footer={null}
          width={600}
        >
          <div className="py-4">
            <DropzoneArea uppy={uppy} />
          </div>
        </Modal>
      </div>
    )
  }

  // Show upload area
  return (
    <div className="image-upload-container">
      {label && (
        <div className="mb-2">
          <label className="text-sm font-medium">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        </div>
      )}
      
      <div 
        className="relative"
        style={{ width, height }}
      >
        {uploading ? (
          <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2" />
              <p className="text-sm text-gray-500">{t('upload.uploading')}</p>
            </div>
          </div>
        ) : (
          <DropzoneArea uppy={uppy} disabled={disabled} />
        )}
        
        {!uploading && !value && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {placeholder || (
              <div className="text-center">
                <UploadIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-xs text-gray-500">{t('upload.clickOrDrag')}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {t('upload.maxSize', { size: maxFileSize })}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}