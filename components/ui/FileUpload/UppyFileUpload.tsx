'use client'

import { useEffect, useState } from 'react'
import Uppy from '@uppy/core'
import { Dashboard } from '@uppy/react'
import XHRUpload from '@uppy/xhr-upload'
import ImageEditor from '@uppy/image-editor'
import Compressor from '@uppy/compressor'
import { message } from 'antd'
import { useTranslations } from 'next-intl'

// Import Uppy styles
import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'
import '@uppy/image-editor/dist/style.min.css'

interface UppyFileUploadProps {
  endpoint?: string
  folder?: string
  isPublic?: boolean
  maxFileSize?: number // in MB
  maxNumberOfFiles?: number
  allowedFileTypes?: string[]
  onUploadSuccess?: (files: any[]) => void
  onUploadError?: (error: Error) => void
  metadata?: Record<string, any>
  height?: number | string
  note?: string
  disabled?: boolean
}

export function UppyFileUpload({
  endpoint = '/api/storage/upload',
  folder = 'uploads',
  isPublic = false,
  maxFileSize = 10, // 10MB default
  maxNumberOfFiles = 10,
  allowedFileTypes,
  onUploadSuccess,
  onUploadError,
  metadata = {},
  height = 350,
  note,
  disabled = false,
}: UppyFileUploadProps) {
  const t = useTranslations('common')
  const [uppy] = useState(() => {
    const uppyInstance = new Uppy({
      id: 'uppy-dashboard',
      autoProceed: false,
      allowMultipleUploads: true,
      debug: process.env.NODE_ENV === 'development',
      restrictions: {
        maxFileSize: maxFileSize * 1024 * 1024,
        maxNumberOfFiles,
        allowedFileTypes,
      },
      meta: {
        folder,
        isPublic: isPublic.toString(),
        ...metadata,
      },
    })

    // Add XHR Upload plugin for backend integration
    uppyInstance.use(XHRUpload, {
      endpoint,
      formData: true,
      fieldName: 'file',
      headers: {
        // Add auth token if available
        ...(typeof window !== 'undefined' && localStorage.getItem('token')
          ? { Authorization: `Bearer ${localStorage.getItem('token')}` }
          : {}),
      },
      // Form data is handled via meta fields
    })

    // Add Compressor plugin for image optimization
    uppyInstance.use(Compressor, {
      quality: 0.8,
      limit: 10,
    })

    // Add Image Editor plugin
    uppyInstance.use(ImageEditor, {
      quality: 0.9,
      cropperOptions: {
        viewMode: 1,
        aspectRatio: NaN, // free ratio
        initialAspectRatio: 1,
        responsive: true,
        rotatable: true,
        scalable: true,
        zoomable: true,
        guides: true,
        center: true,
        highlight: true,
        cropBoxMovable: true,
        cropBoxResizable: true,
      },
    })

    return uppyInstance
  })

  useEffect(() => {
    // Handle successful uploads
    const handleComplete = (result: any) => {
      if (result.successful?.length > 0) {
        message.success(t('upload.success'))
        const uploadedFiles = result.successful.map((file: any) => ({
          id: file.response?.body?.id,
          url: file.response?.body?.url,
          name: file.name,
          size: file.size,
          type: file.type,
        }))
        onUploadSuccess?.(uploadedFiles)
      }

      if (result.failed?.length > 0) {
        message.error(t('upload.partialError'))
      }
    }

    const handleError = (error: any) => {
      console.error('Upload error:', error)
      message.error(error.message || t('upload.error'))
      onUploadError?.(error)
    }

    const handleFileAdded = (file: any) => {
      console.log('File added:', file)
    }

    const handleFileRemoved = (file: any) => {
      console.log('File removed:', file)
    }

    uppy.on('complete', handleComplete)
    uppy.on('error', handleError)
    uppy.on('file-added', handleFileAdded)
    uppy.on('file-removed', handleFileRemoved)

    return () => {
      uppy.off('complete', handleComplete)
      uppy.off('error', handleError)
      uppy.off('file-added', handleFileAdded)
      uppy.off('file-removed', handleFileRemoved)
      uppy.destroy()
    }
  }, [uppy, onUploadSuccess, onUploadError, t])

  return (
    <div className="uppy-container">
      <Dashboard
        uppy={uppy}
        height={height}
        note={note}
        disabled={disabled}
        proudlyDisplayPoweredByUppy={false}
        locale={{
          strings: {
            browseFiles: t('upload.browseFiles'),
            dropPasteFiles: t('upload.dropPasteFiles'),
            dropPasteImportFiles: t('upload.dropPasteImportFiles'),
            uploadComplete: t('upload.complete'),
            uploadPaused: t('upload.paused'),
            resumeUpload: t('upload.resume'),
            pauseUpload: t('upload.pause'),
            retryUpload: t('upload.retry'),
            cancelUpload: t('upload.cancel'),
            uploadXFiles: {
              0: t('upload.uploadFile'),
              1: t('upload.uploadFiles'),
            },
            uploadingXFiles: {
              0: t('upload.uploadingFile'),
              1: t('upload.uploadingFiles'),
            },
            processingXFiles: {
              0: t('upload.processingFile'),
              1: t('upload.processingFiles'),
            },
            // Add more translations as needed
          },
        }}
      />
    </div>
  )
}
