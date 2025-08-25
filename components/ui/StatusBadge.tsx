import { Badge } from 'antd'
import { useTranslations } from 'next-intl'

interface StatusBadgeProps {
  entityType?: 'business' | 'user' | 'voucher'
  status?: string
  verified?: boolean
  approved?: boolean
}

/**
 * Reusable status badge component for consistent status display across entities
 */
export function StatusBadge({
  entityType = 'business',
  status,
  verified,
  approved,
}: StatusBadgeProps) {
  const t = useTranslations()

  // Business status logic
  if (entityType === 'business') {
    if (approved && verified) {
      return (
        <Badge
          status="success"
          text={t('businesses.status.verifiedApproved')}
        />
      )
    }
    if (verified && !approved) {
      return (
        <Badge status="warning" text={t('businesses.status.verifiedPending')} />
      )
    }
    if (approved && !verified) {
      return (
        <Badge
          status="warning"
          text={t('businesses.status.approvedNotVerified')}
        />
      )
    }
    return <Badge status="default" text={t('businesses.status.pending')} />
  }

  // User status logic
  if (entityType === 'user') {
    if (status === 'active') {
      return <Badge status="success" text={t('user.status.active')} />
    }
    if (status === 'suspended') {
      return <Badge status="warning" text={t('user.status.suspended')} />
    }
    if (status === 'banned') {
      return <Badge status="error" text={t('user.status.banned')} />
    }
    return <Badge status="default" text={t('user.status.unconfirmed')} />
  }

  // Voucher status logic
  if (entityType === 'voucher') {
    if (status === 'published') {
      return <Badge status="success" text={t('voucher.status.published')} />
    }
    if (status === 'expired') {
      return <Badge status="error" text={t('voucher.status.expired')} />
    }
    if (status === 'draft') {
      return <Badge status="default" text={t('voucher.status.draft')} />
    }
    return <Badge status="warning" text={t('voucher.status.suspended')} />
  }

  // Default fallback
  return <Badge status="default" text={status || t('common.na')} />
}
