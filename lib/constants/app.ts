/**
 * Application constants and branding configuration
 * Central place to manage app branding and configuration
 */

export const APP_CONFIG = {
  // Main app branding
  name: 'The VoucherBook',
  shortName: 'TVB',
  description: 'Business and Admin Management Platform',

  // Copyright and legal
  copyright: `© ${new Date().getFullYear()} The VoucherBook`,

  // Meta information
  meta: {
    title: 'The VoucherBook Dashboard',
    description:
      'Business and Admin Management Platform for voucher management',
  },

  // Branding elements
  branding: {
    logo: {
      text: 'The VoucherBook',
      shortText: 'TVB',
      icon: 'T', // First letter for icon
    },
    poweredBy: 'Powered by The VoucherBook',
  },
} as const

// Export individual constants for convenience
export const APP_NAME = APP_CONFIG.name
export const APP_SHORT_NAME = APP_CONFIG.shortName
export const APP_DESCRIPTION = APP_CONFIG.description
export const APP_COPYRIGHT = APP_CONFIG.copyright
