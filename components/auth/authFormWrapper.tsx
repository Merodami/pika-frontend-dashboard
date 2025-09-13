'use client'

import { Alert, Form } from 'antd'
import type { ReactNode } from 'react'

interface AuthFormWrapperProps {
  error: string | null
  success?: string | null
  onError: (error: string | null) => void
  onSuccess?: (success: string | null) => void
  onSubmit: () => void
  children: ReactNode
}

export function AuthFormWrapper({
  error,
  success,
  onError,
  onSuccess,
  onSubmit,
  children,
}: AuthFormWrapperProps) {
  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      {success && (
        <Alert
          message={success}
          type="success"
          showIcon
          closable
          onClose={() => onSuccess?.(null)}
          className="mb-4"
        />
      )}

      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          closable
          onClose={() => onError(null)}
          className="mb-4"
        />
      )}

      <Form layout="vertical" onFinish={onSubmit} autoComplete="off">
        {children}
      </Form>
    </div>
  )
}
