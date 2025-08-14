export function ThemeScript() {
  const themeScript = `
    (function() {
      try {
        const stored = localStorage.getItem('pika-app-storage')
        if (stored) {
          const data = JSON.parse(stored)
          const theme = data?.state?.theme || 'light'
          if (theme === 'dark') {
            document.documentElement.classList.add('dark')
          }
        }
      } catch (e) {}
    })()
  `

  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeScript }}
      suppressHydrationWarning
    />
  )
}
