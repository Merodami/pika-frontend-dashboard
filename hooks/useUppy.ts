'use client'

import { useEffect, useState, useCallback } from 'react'
import Uppy from '@uppy/core'
import XHRUpload from '@uppy/xhr-upload'
import ImageEditor from '@uppy/image-editor'
import Compressor from '@uppy/compressor'
import { message } from 'antd'
import { useTranslations } from 'next-intl'

interface UseUppyOptions {
  endpoint?: string
  folder?: string
  isPublic?: boolean
  maxFileSize?: number // in MB
  maxNumberOfFiles?: number
  allowedFileTypes?: string[]
  autoProceed?: boolean
  allowMultipleUploads?: boolean
  meta?: Record<string, any>
  onUploadSuccess?: (files: UploadedFile[]) => void
  onUploadError?: (error: Error) => void
  onFileAdded?: (file: any) => void
  onFileRemoved?: (file: any) => void
  enableImageEditor?: boolean
  enableCompressor?: boolean
  compressionQuality?: number
  aspectRatio?: number
}

export interface UploadedFile {
  id: string
  url: string
  name: string
  size: number
  type: string
  metadata?: Record<string, any>
}

export function useUppy({
  endpoint = '/api/storage/upload',
  folder = 'uploads',
  isPublic = false,
  maxFileSize = 10,
  maxNumberOfFiles = 10,
  allowedFileTypes,
  autoProceed = false,
  allowMultipleUploads = true,
  meta = {},
  onUploadSuccess,
  onUploadError,
  onFileAdded,
  onFileRemoved,
  enableImageEditor = true,
  enableCompressor = true,
  compressionQuality = 0.9,
  aspectRatio,
}: UseUppyOptions = {}) {
  const t = useTranslations('common')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  const [uppy] = useState(() => {
    const uppyInstance = new Uppy({
      id: `uppy-${Date.now()}`,
      autoProceed,
      allowMultipleUploads,
      debug: process.env.NODE_ENV === 'development',
      restrictions: {
        maxFileSize: maxFileSize * 1024 * 1024,
        maxNumberOfFiles,
        allowedFileTypes,
      },
      meta: {
        folder,
        isPublic: isPublic.toString(),
        ...meta,
      },
    })

    // Add XHR Upload plugin
    uppyInstance.use(XHRUpload, {
      endpoint,
      formData: true,
      fieldName: 'file',
      headers: {
        ...(typeof window !== 'undefined' && localStorage.getItem('token')
          ? { Authorization: `Bearer ${localStorage.getItem('token')}` }
          : {}),
      },
      getUploadParameters: (file) => {
        return {
          method: 'POST',
          headers: {
            ...(typeof window !== 'undefined' && localStorage.getItem('token')
              ? { Authorization: `Bearer ${localStorage.getItem('token')}` }
              : {}),
          },
          formData: {
            folder,
            isPublic: isPublic.toString(),
            metadata: JSON.stringify({
              ...meta,
              originalName: file.name,
              size: file.size,
              type: file.type,
            }),
          },
        }
      },
    })

    // Add Compressor plugin if enabled
    if (enableCompressor && allowedFileTypes?.some(type => type.includes('image'))) {
      uppyInstance.use(Compressor, {
        quality: compressionQuality,
        limit: 10,
      })
    }

    // Add Image Editor plugin if enabled
    if (enableImageEditor && allowedFileTypes?.some(type => type.includes('image'))) {
      uppyInstance.use(ImageEditor, {
        quality: compressionQuality,
        cropperOptions: {
          aspectRatio: aspectRatio || NaN,
          viewMode: 1,
          responsive: true,
          croppable: true,
          rotatable: true,
          scalable: true,
          zoomable: true,
          guides: true,
          center: true,
          highlight: true,
        },
      })
    }

    return uppyInstance
  })

  useEffect(() => {
    const handleUploadStart = () => {
      setIsUploading(true)
      setUploadProgress(0)
    }

    const handleProgress = (progress: number) => {
      setUploadProgress(progress)
    }

    const handleComplete = (result: any) => {
      setIsUploading(false)
      setUploadProgress(100)

      if (result.successful?.length > 0) {
        const files: UploadedFile[] = result.successful.map((file: any) => ({
          id: file.response?.body?.id || file.id,
          url: file.response?.body?.url || file.response?.uploadURL,
          name: file.name,
          size: file.size,
          type: file.type,
          metadata: file.response?.body?.metadata,
        }))

        setUploadedFiles(prev => [...prev, ...files])
        onUploadSuccess?.(files)
        
        message.success(
          result.successful.length === 1
            ? t('upload.success')
            : t('upload.multipleSuccess', { count: result.successful.length })
        )
      }

      if (result.failed?.length > 0) {
        message.error(
          result.failed.length === 1
            ? t('upload.error')
            : t('upload.multipleError', { count: result.failed.length })
        )
      }

      // Reset progress after a delay
      setTimeout(() => setUploadProgress(0), 1000)
    }

    const handleError = (error: any) => {
      setIsUploading(false)
      setUploadProgress(0)
      console.error('Upload error:', error)
      message.error(error.message || t('upload.error'))
      onUploadError?.(error)
    }

    const handleFileAddedEvent = (file: any) => {
      console.log('File added:', file)
      onFileAdded?.(file)
    }

    const handleFileRemovedEvent = (file: any) => {
      console.log('File removed:', file)
      onFileRemoved?.(file)
      
      // Remove from uploadedFiles if it was uploaded
      const fileUrl = file.response?.body?.url || file.response?.uploadURL
      if (fileUrl) {
        setUploadedFiles(prev => prev.filter(f => f.url !== fileUrl))
      }
    }

    uppy.on('upload', handleUploadStart)
    uppy.on('progress', handleProgress)
    uppy.on('complete', handleComplete)
    uppy.on('error', handleError)
    uppy.on('file-added', handleFileAddedEvent)
    uppy.on('file-removed', handleFileRemovedEvent)

    return () => {
      uppy.off('upload', handleUploadStart)
      uppy.off('progress', handleProgress)
      uppy.off('complete', handleComplete)
      uppy.off('error', handleError)
      uppy.off('file-added', handleFileAddedEvent)
      uppy.off('file-removed', handleFileRemovedEvent)
      uppy.close()
    }
  }, [uppy, onUploadSuccess, onUploadError, onFileAdded, onFileRemoved, t])

  const reset = useCallback(() => {
    uppy.reset()
    setUploadedFiles([])
    setUploadProgress(0)
    setIsUploading(false)
  }, [uppy])

  const addFile = useCallback((file: File) => {
    try {
      uppy.addFile({
        name: file.name,
        type: file.type,
        data: file,
      })
    } catch (error: any) {
      message.error(error.message)
    }
  }, [uppy])

  const removeFile = useCallback((fileId: string) => {
    uppy.removeFile(fileId)
  }, [uppy])

  const upload = useCallback(() => {
    return uppy.upload()
  }, [uppy])

  const cancelAll = useCallback(() => {
    uppy.cancelAll()
    setIsUploading(false)
    setUploadProgress(0)
  }, [uppy])

  return {
    uppy,
    isUploading,
    uploadProgress,
    uploadedFiles,
    reset,
    addFile,
    removeFile,
    upload,
    cancelAll,
  }
}