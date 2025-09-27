# Electronic Marketplace - React Application

A modern React-based electronic marketplace application for buying and selling electronic devices, computers, and accessories.

## 🚀 Tech Stack

### Frontend Framework & Build Tools
- **React 18.3.1** - Modern React with hooks and concurrent features
- **TypeScript 5.6.2** - Type-safe JavaScript development
- **Vite 6.0.5** - Fast build tool and development server
- **TailwindCSS 4.0.0** - Utility-first CSS framework with Vite integration

### State Management & Data Fetching
- **Redux Toolkit 2.8.2** - Modern Redux state management
- **React Redux 9.2.0** - React bindings for Redux
- **TanStack React Query 5.80.2** - Server state management and caching
- **React Query 3.39.3** - Legacy version (⚠️ inconsistency detected)

### Routing & Navigation
- **React Router 7.2.0** - Client-side routing
- **React Router DOM 7.2.0** - DOM bindings for React Router

### UI Components & Styling
- **Heroicons React 2.2.0** - Beautiful hand-crafted SVG icons
- **Lucide React 0.477.0** - Icon library
- **React Country Flag 3.1.0** - Country flag components
- **React Swipeable 7.0.2** - Touch gesture support
- **Tailwind Scrollbar Hide 2.0.0** - Hide scrollbars utility

### Forms & Validation
- **Formik 2.4.6** - Build forms without tears
- **Yup 1.6.1** - Schema validation library

### Maps & Location
- **React Google Maps API 2.20.7** - Google Maps integration

### HTTP Client & Utilities
- **Axios 1.9.0** - Promise-based HTTP client
- **Date-fns 4.1.0** - Modern date utility library
- **Lodash Debounce 4.0.8** - Debounce utility function
- **clsx 2.1.1** - Conditional className utility

### Notifications
- **React Toastify 11.0.5** - Toast notifications

### Development Tools
- **ESLint 9.17.0** - Code linting
- **TypeScript ESLint 8.18.2** - TypeScript-specific linting rules

## 📦 How to Run the Project

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd electronic
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   - Copy `.env` file and configure environment variables:
   ```env
   VITE_API_URL=http://localhost:4000
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

7. **Lint code**
   ```bash
   npm run lint
   ```

### Backend Requirements
The application expects a backend API running on `http://localhost:4000` with the following endpoints:
- Authentication: `/auth/login`, `/auth/me`
- User management and announcements APIs

## ✨ Implemented Features

### 🔐 Authentication & User Management
- User registration and login system
- JWT token-based authentication
- Protected routes for authenticated users
- User profile management
- Account settings and updates

### 🏠 Homepage & Navigation
- Modern responsive layout with header and footer
- Carousel components for featured content
- "Trusted Sellers" showcase
- "Highlighted Announcements" section

### 🔍 Product Search & Filtering
- Advanced search functionality with multiple filters
- Category-based browsing (Computers, Laptops, Phones, etc.)
- Dynamic filtering by specifications:
  - Processor type (Intel, AMD)
  - GPU brand and model
  - RAM capacity
  - Storage type (SSD, HDD)
  - Power consumption
  - Screen size (for laptops)
  - Product condition (New, Used)
- Real-time search results with sorting options

### 📝 Announcement Management
- Create new product announcements
- Edit existing announcements
- Image upload functionality
- Detailed product specifications
- Pricing with negotiation options
- Shipping and pickup preferences
- Location picker with Google Maps integration

### 👤 User Dashboard
- **My Ads** - Manage personal announcements
- **My Orders** - Track purchase history
- **Chat** - Communication system between users
- **Favorites** - Save preferred products
- Profile settings and account management

### 🗺️ Location Services
- Google Maps integration for location selection
- Location-based search and filtering

### 💬 Communication
- Real-time chat system between buyers and sellers
- Conversation management
- Message history

## 🛠️ Suggested Technical Best Practices

### 1. **Code Organization & Architecture**
- ✅ **Implement**: Consistent folder structure with feature-based organization
- ✅ **Implement**: Separate API layer with proper error handling
- ✅ **Implement**: Custom hooks for reusable logic
- ✅ **Implement**: Component composition patterns

### 2. **State Management**
- ✅ **Implement**: Centralized error handling in Redux slices
- ✅ **Implement**: Proper loading states across the application
- ✅ **Implement**: Optimistic updates for better UX
- ✅ **Implement**: Data normalization in Redux store

### 3. **Performance Optimization**
- ✅ **Implement**: React.memo for expensive components
- ✅ **Implement**: Code splitting with React.lazy and Suspense
- ✅ **Implement**: Image optimization and lazy loading
- ✅ **Implement**: Debounced search inputs
- ✅ **Implement**: Virtual scrolling for large lists

### 4. **Security & Best Practices**
- ✅ **Implement**: Input validation on both client and server
- ✅ **Implement**: XSS protection for user-generated content
- ✅ **Implement**: Secure token storage (consider httpOnly cookies)
- ✅ **Implement**: Rate limiting for API calls
- ✅ **Implement**: Image upload validation and sanitization

### 5. **Testing Strategy**
- ✅ **Implement**: Unit tests for utility functions and hooks
- ✅ **Implement**: Integration tests for key user flows
- ✅ **Implement**: Component testing with React Testing Library
- ✅ **Implement**: E2E tests for critical paths

### 6. **Accessibility & UX**
- ✅ **Implement**: ARIA labels and semantic HTML
- ✅ **Implement**: Keyboard navigation support
- ✅ **Implement**: Loading skeletons instead of spinners
- ✅ **Implement**: Error boundaries for graceful error handling
- ✅ **Implement**: Offline support with service workers

### 7. **Development Workflow**
- ✅ **Implement**: Pre-commit hooks with Husky
- ✅ **Implement**: Conventional commit messages
- ✅ **Implement**: Automated testing in CI/CD pipeline
- ✅ **Implement**: Code coverage reporting

## ⚠️ Identified Issues & Inconsistencies

### 🔴 Critical Issues

1. **Duplicate React Query Dependencies**
   - Both `@tanstack/react-query@5.80.2` and `react-query@3.39.3` are installed
   - **Impact**: Bundle size increase, potential conflicts
   - **Fix**: Remove legacy `react-query` and migrate to `@tanstack/react-query`

2. **Inconsistent API Configuration**
   - `main.tsx` hardcodes `axios.defaults.baseURL = "http://localhost:4000"`
   - `api/axios.ts` properly uses environment variable
   - **Impact**: Environment-specific configuration not working properly
   - **Fix**: Remove hardcoded baseURL from main.tsx, use centralized API configuration

3. **Security: Exposed Google Maps API Key**
   - API key is committed to `.env` file in repository
   - **Impact**: Security vulnerability, potential API abuse
   - **Fix**: Remove from repository, add to `.env.example`, use environment-specific keys

### 🟡 Medium Priority Issues

4. **Development Console Logs**
   - `console.log` statements in production code (Homepage.tsx, ProfilSettingsMain.tsx)
   - **Impact**: Performance and security concerns
   - **Fix**: Remove or replace with proper logging solution

5. **Mixed Authentication Patterns**
   - Token stored in localStorage in multiple places
   - Inconsistent token handling between components
   - **Impact**: Potential security issues, code maintainability
   - **Fix**: Centralize token management in auth slice

6. **TypeScript Configuration Issues**
   - `tsconfig.json` includes specific component paths instead of using wildcards
   - **Impact**: Maintenance overhead when adding new components
   - **Fix**: Use proper include patterns like `"component/**/*"`

### 🟢 Minor Issues

7. **Unused Dependencies**
   - Some dependencies might be unused (needs audit)
   - **Impact**: Bundle size
   - **Fix**: Run dependency audit and remove unused packages

8. **Missing Error Boundaries**
   - No global error handling for component crashes
   - **Impact**: Poor user experience on errors
   - **Fix**: Implement error boundaries at route level

9. **Inconsistent Naming Conventions**
   - Mix of Polish and English in code comments and variables
   - **Impact**: Code readability for international developers
   - **Fix**: Standardize on English for code, Polish for UI text

10. **Missing Loading States**
    - Some components lack proper loading indicators
    - **Impact**: Poor user experience
    - **Fix**: Implement consistent loading patterns

## 📋 Recommended Next Steps

1. **Immediate Fixes** (High Priority)
   - Remove duplicate React Query dependency
   - Fix API configuration inconsistency
   - Secure Google Maps API key
   - Remove console.log statements

2. **Short Term** (Medium Priority)
   - Implement error boundaries
   - Centralize authentication logic
   - Add comprehensive loading states
   - Set up testing framework

3. **Long Term** (Low Priority)
   - Performance optimization
   - Accessibility improvements
   - Comprehensive testing suite
   - CI/CD pipeline setup

## 🤝 Contributing

### Development Setup & Guidelines

1. Follow the established code style and conventions
2. Write tests for new features
3. Update documentation when needed
4. Use conventional commit messages
5. Ensure all linting passes before committing

### Expanding the ESLint Configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

### Vite + React Setup Notes

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## 📄 License

[Add your license information here]
