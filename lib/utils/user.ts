import { UserRole, UserStatus } from '@merodami/pika-types'

/**
 * Get the color for a user status
 */
export function getUserStatusColor(status?: string): string {
  switch (status) {
    case UserStatus.ACTIVE:
      return 'success'
    case UserStatus.UNCONFIRMED:
      return 'default'
    case UserStatus.SUSPENDED:
      return 'warning'
    case UserStatus.BANNED:
      return 'error'
    default:
      return 'default'
  }
}

/**
 * Get the color for a user role
 */
export function getUserRoleColor(role?: string): string {
  switch (role) {
    case UserRole.ADMIN:
      return 'red'
    case UserRole.BUSINESS:
      return 'blue'
    case UserRole.CUSTOMER:
      return 'green'
    default:
      return 'default'
  }
}

/**
 * Get display name for a user
 */
export function getUserDisplayName(user: {
  firstName?: string | null
  lastName?: string | null
  email?: string
}): string {
  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`
  }
  if (user.firstName) {
    return user.firstName
  }
  if (user.lastName) {
    return user.lastName
  }
  return user.email || 'Unknown User'
}

/**
 * Get initials for a user
 */
export function getUserInitials(user: {
  firstName?: string | null
  lastName?: string | null
  email?: string
}): string {
  const first = user.firstName?.[0] || ''
  const last = user.lastName?.[0] || ''

  if (first || last) {
    return `${first}${last}`.toUpperCase()
  }

  return user.email?.[0]?.toUpperCase() || 'U'
}
