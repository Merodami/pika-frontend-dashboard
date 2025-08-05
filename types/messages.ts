// Type definitions for i18n messages
export interface Messages {
  common: {
    button: {
      save: string
      cancel: string
      delete: string
      edit: string
      create: string
      back: string
      next: string
      previous: string
      close: string
      confirm: string
      search: string
      filter: string
      refresh: string
      export: string
      import: string
    }
    status: {
      active: string
      inactive: string
      pending: string
      approved: string
      rejected: string
      draft: string
      published: string
    }
    form: {
      required: string
      invalid: string
      email: string
      password: string
      confirmPassword: string
      firstName: string
      lastName: string
      phoneNumber: string
    }
    error: {
      generic: string
      network: string
      notFound: string
      unauthorized: string
      forbidden: string
      validation: string
    }
    success: {
      saved: string
      deleted: string
      created: string
      updated: string
    }
    loading: string
    noData: string
    yes: string
    no: string
  }
  auth: {
    login: {
      title: string
      subtitle: string
      email: string
      password: string
      forgotPassword: string
      submit: string
      register: string
      error: {
        invalidCredentials: string
        emailRequired: string
        passwordRequired: string
      }
    }
    register: {
      title: string
      subtitle: string
      firstName: string
      lastName: string
      email: string
      password: string
      confirmPassword: string
      submit: string
      login: string
      success: string
      error: {
        emailExists: string
        passwordMismatch: string
        weakPassword: string
      }
    }
    logout: string
  }
  dashboard: {
    title: string
    welcome: string
    stats: {
      totalVouchers: string
      activeVouchers: string
      totalRevenue: string
      totalUsers: string
    }
    quickActions: {
      createVoucher: string
      manageUsers: string
      viewReports: string
    }
  }
  voucher: {
    title: string
    create: string
    edit: string
    list: string
    details: string
    fields: {
      title: string
      description: string
      value: string
      discount: string
      validFrom: string
      validTo: string
      category: string
      status: string
    }
    status: {
      draft: string
      active: string
      expired: string
      used: string
    }
  }
  business: {
    title: string
    profile: string
    settings: string
    fields: {
      name: string
      description: string
      category: string
      address: string
      phone: string
      email: string
      website: string
    }
  }
  admin: {
    title: string
    users: string
    businesses: string
    vouchers: string
    analytics: string
    settings: string
  }
}

// Helper type for message keys (simplified to avoid circular reference)
export type MessageKey = keyof Messages | `${keyof Messages}.${string}`
