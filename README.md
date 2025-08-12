# Pika Frontend Dashboard

A modern, enterprise-grade business management dashboard built with Next.js 15, React 19, and TypeScript. This dashboard provides a comprehensive interface for managing businesses, vouchers, and platform operations with exceptional code quality and performance.

## 🚀 Features

- **Multi-tenant Architecture**: Supports both Admin and Business user roles with granular permissions
- **Modern Tech Stack**: Next.js 15 with App Router, React 19, TypeScript 5.8
- **Internationalization**: Multi-language support (Spanish, English, Guaraní)
- **Enterprise UI**: Ant Design components with Tailwind CSS styling
- **Type-Safe API**: Auto-generated TypeScript SDK from OpenAPI specs
- **OAuth 2.0 Authentication**: JWT-based with automatic token refresh
- **Exceptional Code Quality**: 99.55% type coverage, 0% code duplication

## 📊 Code Quality Metrics

| Metric                | Score       | Status         |
| --------------------- | ----------- | -------------- |
| TypeScript Coverage   | 99.55%      | ✅ Excellent   |
| Circular Dependencies | 0           | ✅ Perfect     |
| Code Duplication      | 0%          | ✅ Perfect     |
| Bundle Size           | Optimized   | ✅ Tree-shaken |
| Accessibility         | WCAG 2.1 AA | ✅ Compliant   |

## 🛠️ Technology Stack

### Core

- **Next.js 15.4.4** - React framework with App Router
- **React 19.1.1** - Latest React with concurrent features
- **TypeScript 5.8.3** - Type-safe development

### UI/UX

- **Ant Design 5.26.6** - Enterprise component library
- **Tailwind CSS 3.4.18** - Utility-first styling
- **Lucide React** - Modern icon library

### State Management

- **Zustand 5.0.6** - Lightweight state management
- **TanStack Query** - Server state management
- **React Hook Form 7.61.1** - Performant forms

### Code Quality

- **ESLint 9.32.0** - Code linting
- **Prettier 3.6.2** - Code formatting
- **Vitest** - Unit testing framework
- **Playwright** - E2E testing

## 📁 Project Structure

```
pika-frontend-dashboard/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   ├── actions/           # Server actions
│   └── services/          # Server-side services
├── components/            # React components
│   ├── auth/             # Authentication
│   ├── features/         # Feature components
│   ├── layouts/          # Layout components
│   └── ui/               # UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Core utilities
│   ├── api/              # API client & SDK
│   └── utils/            # Utilities
├── store/                 # Zustand stores
├── messages/              # i18n translations
└── public/                # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 22.x or higher
- npm 10.x or higher
- GitHub Personal Access Token (for @merodami packages)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/pika-frontend-dashboard.git
cd pika-frontend-dashboard

# Set up GitHub Packages authentication
echo "//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN" >> ~/.npmrc

# Install dependencies
npm install
```

### Environment Setup

Create a `.env.local` file:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5500/api/v1
NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:5500
NEXT_PUBLIC_ENV=development

# GitHub Packages Token
GITHUB_TOKEN=your_github_token_here
```

### Development

```bash
# Start development server
npm run dev

# Run quality checks
npm run check

# Run all quality analysis
npm run quality:all
```

## 📋 Available Scripts

### Development

```bash
npm run dev          # Start dev server with Turbopack
npm run build        # Build for production
npm start           # Start production server
```

### Code Quality

```bash
npm run check       # Run all checks (type, format, lint)
npm run check:fix   # Fix all auto-fixable issues
npm run lint        # Run ESLint
npm run format      # Check Prettier formatting
npm run typecheck   # Run TypeScript compiler
```

### Quality Analysis

```bash
npm run quality:all          # Run all quality checks
npm run quality:type-coverage # Analyze type coverage
npm run quality:circular     # Find circular dependencies
npm run quality:duplicates   # Find duplicate code
npm run quality:unused       # Find unused exports
npm run quality:bundle       # Analyze bundle size
```

### Testing

```bash
npm test                # Run unit tests
npm run test:coverage   # Run tests with coverage
npm run test:ui         # Open Vitest UI
npm run test:e2e        # Run E2E tests
```

### Pre-commit

```bash
npm run pre-commit  # Run before committing
npm run validate    # Quick validation
```

## 🏗️ Architecture

### Authentication Flow

1. **Registration** → Email verification required
2. **Login** → Returns JWT tokens
3. **Token Storage** → Secure HTTP-only cookies
4. **Auto-refresh** → Seamless token renewal
5. **Protected Routes** → Server-side validation

### API Integration

```typescript
// Type-safe API calls with generated SDK
import { api } from '@/lib/api/client'

const { data, isLoading } = useQuery({
  queryKey: ['vouchers'],
  queryFn: () => api.vouchers.getVouchers(),
})
```

### State Management

```typescript
// Global state with Zustand
const { user, isAuthenticated } = useAuthStore()

// Server state with React Query
const { data, mutate } = useVouchers()
```

## 🔐 Security

- **OAuth 2.0** JWT authentication
- **HTTPS-only** cookies for tokens
- **XSS Protection** via React
- **CSRF Protection** with tokens
- **Input Validation** using Zod schemas
- **No exposed secrets** in codebase

## 🌍 Internationalization

Supports three languages:

- 🇪🇸 Spanish (default)
- 🇬🇧 English
- 🇵🇾 Guaraní

```typescript
// Server Components
const t = await getTranslations('dashboard')

// Client Components
const t = useTranslations('common')
```

## 📈 Performance

- **Code Splitting** - Automatic with dynamic imports
- **Image Optimization** - Next.js Image component
- **Caching Strategy** - React Query with stale-while-revalidate
- **Bundle Optimization** - Tree-shaking and minification
- **Lazy Loading** - Components and routes

## 🧪 Testing

```bash
# Unit tests with Vitest
npm test

# Coverage report
npm run test:coverage

# E2E tests with Playwright
npm run test:e2e
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Run quality checks (`npm run pre-commit`)
4. Commit your changes (`git commit -m 'feat: add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: resolve bug
docs: update documentation
style: formatting changes
refactor: code restructuring
test: add tests
chore: maintenance
```

## 📝 License

This project is proprietary software. All rights reserved.

## 🙏 Acknowledgments

Built with ❤️ using:

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Ant Design](https://ant.design/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

---

For questions or support, please contact the development team.
