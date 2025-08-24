'use client'

import React, { forwardRef, useMemo } from 'react'
import { DatePicker, DatePickerProps } from 'antd'
import { Calendar } from 'lucide-react'
import dayjs, { Dayjs } from 'dayjs'
import { useTranslations } from 'next-intl'

export interface DateOfBirthPickerProps
  extends Omit<DatePickerProps, 'value' | 'onChange'> {
  /**
   * The current value as a string in YYYY-MM-DD format
   */
  value?: string | null

  /**
   * Callback when the date changes
   */
  onChange?: (date: string | null) => void

  /**
   * Minimum age required (default: 18)
   */
  minAge?: number

  /**
   * Maximum age allowed (default: 120)
   */
  maxAge?: number

  /**
   * Whether to show the age helper text
   */
  showAgeHelper?: boolean

  /**
   * Custom error message for age validation
   */
  ageErrorMessage?: string

  /**
   * Additional class names
   */
  className?: string

  /**
   * Placeholder text
   */
  placeholder?: string

  /**
   * Whether the field has an error
   */
  hasError?: boolean
}

/**
 * DateOfBirthPicker Component
 *
 * A specialized date picker for selecting birth dates with built-in age validation.
 * Ensures users are at least the minimum age (default 18 years).
 *
 * Features:
 * - Age validation (configurable minimum/maximum age)
 * - Smart date range defaults
 * - Accessible keyboard navigation
 * - Integration with react-hook-form
 * - Internationalization support
 *
 * @example
 * ```tsx
 * <Controller
 *   name="dateOfBirth"
 *   control={control}
 *   render={({ field }) => (
 *     <DateOfBirthPicker
 *       {...field}
 *       minAge={21}
 *       hasError={!!errors.dateOfBirth}
 *     />
 *   )}
 * />
 * ```
 */
export const DateOfBirthPicker = forwardRef<any, DateOfBirthPickerProps>(
  (
    {
      value,
      onChange,
      minAge = 18,
      maxAge = 120,
      showAgeHelper = false,
      ageErrorMessage,
      className = '',
      placeholder,
      hasError = false,
      disabled = false,
      ...restProps
    },
    ref
  ) => {
    const t = useTranslations()

    // Calculate date boundaries
    const boundaries = useMemo(() => {
      const today = dayjs().endOf('day')
      const minDate = today.subtract(maxAge, 'year').startOf('year')
      const maxDate = today.subtract(minAge, 'year').endOf('day')
      const defaultOpenDate = today.subtract(minAge + 10, 'year') // Show dates from ~28 years ago by default

      return { minDate, maxDate, defaultOpenDate, today }
    }, [minAge, maxAge])

    // Convert string value to Dayjs object
    const dateValue = useMemo(() => {
      if (!value) return null
      const date = dayjs(value)
      return date.isValid() ? date : null
    }, [value])

    // Calculate current age if a date is selected
    const currentAge = useMemo(() => {
      if (!dateValue) return null
      return boundaries.today.diff(dateValue, 'year')
    }, [dateValue, boundaries.today])

    // Handle date change
    const handleChange = (date: Dayjs | null) => {
      if (onChange) {
        onChange(date ? date.format('YYYY-MM-DD') : null)
      }
    }

    // Disable dates outside the valid age range
    const disabledDate = (current: Dayjs) => {
      if (!current) return false
      return (
        current.isBefore(boundaries.minDate, 'day') ||
        current.isAfter(boundaries.maxDate, 'day')
      )
    }

    // Default placeholder with age requirement
    const defaultPlaceholder =
      placeholder || t('profile.personalInfo.dateOfBirth') + ` (${minAge}+)`

    // Validation message
    const validationMessage = useMemo(() => {
      if (!showAgeHelper || !currentAge) return null

      if (currentAge < minAge) {
        return ageErrorMessage || t('validation.minAge', { age: minAge })
      }

      return t('common.age', { age: currentAge })
    }, [showAgeHelper, currentAge, minAge, ageErrorMessage, t])

    return (
      <div className="w-full">
        <DatePicker
          ref={ref}
          value={dateValue}
          onChange={handleChange}
          format="YYYY-MM-DD"
          className={`w-full ${hasError ? 'border-red-500' : ''} ${className}`}
          placeholder={defaultPlaceholder}
          suffixIcon={<Calendar className="w-4 h-4 text-gray-400" />}
          disabledDate={disabledDate}
          disabled={disabled}
          defaultPickerValue={boundaries.defaultOpenDate}
          showToday={false}
          allowClear
          picker="date"
          {...restProps}
        />

        {showAgeHelper && validationMessage && (
          <div
            className={`mt-1 text-xs ${currentAge && currentAge < minAge ? 'text-red-500' : 'text-gray-500'}`}
          >
            {validationMessage}
          </div>
        )}
      </div>
    )
  }
)

DateOfBirthPicker.displayName = 'DateOfBirthPicker'

/**
 * Hook for date of birth validation with Zod
 *
 * @example
 * ```ts
 * const schema = z.object({
 *   dateOfBirth: createDateOfBirthSchema({ minAge: 21 })
 * })
 * ```
 */
export const createDateOfBirthSchema = (options?: {
  minAge?: number
  maxAge?: number
  required?: boolean
  errorMessages?: {
    required?: string
    invalid?: string
    tooYoung?: string
    tooOld?: string
  }
}) => {
  const {
    minAge = 18,
    maxAge = 120,
    required = false,
    errorMessages = {},
  } = options || {}

  const { z } = require('zod')

  let schema = z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      errorMessages.invalid || 'Invalid date format'
    )
    .refine(
      (date: string) => {
        const birthDate = dayjs(date)
        if (!birthDate.isValid()) return false

        const age = dayjs().diff(birthDate, 'year')
        return age >= minAge && age <= maxAge
      },
      (date: string) => {
        const birthDate = dayjs(date)
        const age = dayjs().diff(birthDate, 'year')

        if (age < minAge) {
          return {
            message:
              errorMessages.tooYoung || `Must be at least ${minAge} years old`,
          }
        }
        return {
          message:
            errorMessages.tooOld || `Must be at most ${maxAge} years old`,
        }
      }
    )

  if (!required) {
    schema = schema.optional().or(z.literal(''))
  }

  return schema
}

export default DateOfBirthPicker
