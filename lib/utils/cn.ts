import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines clsx and tailwind-merge for optimal className handling
 * - clsx: Conditionally join classNames together
 * - tailwind-merge: Merge Tailwind CSS classes without style conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Utility for responsive class names
 * Allows passing different classes for different breakpoints
 */
export function responsive(
  base: string,
  variants: {
    sm?: string
    md?: string
    lg?: string
    xl?: string
    '2xl'?: string
  }
): string {
  const classes = [base]
  
  if (variants.sm) classes.push(`sm:${variants.sm}`)
  if (variants.md) classes.push(`md:${variants.md}`)
  if (variants.lg) classes.push(`lg:${variants.lg}`)
  if (variants.xl) classes.push(`xl:${variants.xl}`)
  if (variants['2xl']) classes.push(`2xl:${variants['2xl']}`)
  
  return classes.join(' ')
}