import type { ThemeConfig } from 'antd'

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#2563eb', // Blue-600
    colorSuccess: '#16a34a', // Green-600
    colorWarning: '#d97706', // Amber-600
    colorError: '#dc2626', // Red-600
    colorInfo: '#0891b2', // Cyan-600
    borderRadius: 8,
    fontSize: 14,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    Button: {
      borderRadius: 8,
      controlHeight: 40,
      fontSize: 14,
      fontWeight: 500,
    },
    Input: {
      borderRadius: 8,
      controlHeight: 40,
      fontSize: 14,
    },
    Select: {
      borderRadius: 8,
      controlHeight: 40,
      fontSize: 14,
    },
    Card: {
      borderRadius: 12,
      paddingLG: 24,
    },
    Form: {
      itemMarginBottom: 20,
      verticalLabelPadding: '0 0 8px',
      labelFontSize: 14,
    },
    Alert: {
      borderRadius: 8,
      fontSize: 14,
    },
    Message: {
      fontSize: 14,
    },
    Notification: {
      fontSize: 14,
      borderRadius: 8,
    },
  },
}
