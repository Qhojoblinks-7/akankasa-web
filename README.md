# AkanKasa - Learn Akan Language & Culture

A modern, mobile-first web application for learning the Akan language and exploring rich cultural traditions, history, and customs. Built with React, Radux for state management, and Tailwind CSS for styling.

## 🚀 Features

- **Language Learning**: Interactive lessons, vocabulary, and pronunciation guides
- **Cultural Exploration**: Traditions, history, symbols, and folklore
- **Community Features**: Discussion forums, events, and user contributions
- **Mobile-First Design**: Optimized for all device sizes with responsive layouts
- **PWA Support**: Progressive Web App with offline capabilities
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support

## 🏗️ Architecture

### Tech Stack

- **Frontend**: React 19 with Vite
- **State Management**: Radux (lightweight Redux alternative)
- **Styling**: Tailwind CSS with mobile-first approach
- **Routing**: React Router DOM v7
- **Icons**: Lucide React
- **Build Tool**: Vite
- **PWA**: Service Worker with manifest

### Project Structure

```
src/
├── components/          # Reusable UI components
│   └── layout/         # Layout components (Navbar, Footer)
├── hooks/              # Custom React hooks
│   └── useRadux.js     # Radux integration hooks
├── pages/              # Page components
├── store/              # Radux store configuration
│   └── slices/         # Store slices for different domains
├── data/               # Mock data and constants
├── assets/             # Static assets
└── contexts/           # Legacy context providers (being migrated)
```

## 📊 State Management with Radux

The application uses **Radux** for centralized state management, providing a clean and scalable architecture for managing application state.

### Store Structure

```javascript
// Main store configuration
export const store = createStore({
  culture: cultureSlice,      // Cultural data and UI state
  ui: uiSlice,               // UI interactions and preferences
  language: languageSlice,    // Language settings and translations
  user: userSlice,           // User authentication and preferences
});
```

### Store Slices

#### 1. Culture Slice (`cultureSlice.js`)

Manages all cultural content, filters, and navigation state.

**State Structure:**
```javascript
{
  // Data
  traditions: [],           // Cultural traditions
  history: [],             // Historical content
  symbols: [],             // Cultural symbols
  
  // UI State
  activeSection: 'traditions',  // Current section
  selectedItem: null,           // Selected item for detail view
  selectedItemType: null,       // Type of selected item
  
  // Filters
  selectedRegion: 'all',        // Region filter
  searchTerm: '',               // Search filter
  
  // Loading & Error States
  isLoading: false,
  error: null,
  
  // Pagination
  currentPage: 1,
  itemsPerPage: 12,
  totalItems: 0
}
```

**Key Actions:**
- `setActiveSection(section)` - Change active section
- `setSelectedItem(item, type)` - Select item for detail view
- `setRegionFilter(region)` - Filter by region
- `setSearchTerm(term)` - Filter by search term
- `loadCulturalData()` - Load cultural data
- `fetchItemById(id, type)` - Fetch specific item

**Selectors:**
- `selectFilteredContent` - Get filtered content based on current filters
- `selectAvailableRegions` - Get available regions for current section
- `selectItemById(id, type)` - Get specific item by ID and type

#### 2. UI Slice (`uiSlice.js`)

Manages UI state, modals, navigation, and user preferences.

**State Structure:**
```javascript
{
  // Modal States
  isContributeModalOpen: false,
  isDetailModalOpen: false,
  
  // Navigation States
  isMobileMenuOpen: false,
  isSidebarOpen: false,
  
  // Loading States
  isPageLoading: false,
  loadingMessage: '',
  
  // Toast/Notifications
  toast: {
    isVisible: false,
    message: '',
    type: 'info',
    duration: 5000
  },
  
  // Theme & Accessibility
  theme: 'light',
  isHighContrast: false,
  isReducedMotion: false,
  
  // Responsive States
  isMobile: false,
  isTablet: false,
  isDesktop: false
}
```

**Key Actions:**
- `setContributeModal(isOpen)` - Toggle contribute modal
- `setMobileMenu(isOpen)` - Toggle mobile navigation
- `showToast(toastData)` - Show notification toast
- `setTheme(theme)` - Change application theme
- `setHighContrast(enabled)` - Toggle high contrast mode

#### 3. Language Slice (`languageSlice.js`)

Manages language preferences, translations, and internationalization.

**State Structure:**
```javascript
{
  // Current Language
  currentLanguage: 'en',        // 'en' or 'tw'
  
  // Available Languages
  availableLanguages: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'tw', name: 'Twi', nativeName: 'Twi' }
  ],
  
  // Translations
  translations: {},              // Translation data
  isLoadingTranslations: false,
  translationError: null,
  
  // RTL Support
  isRTL: false,
  
  // Font Preferences
  fontPreferences: {
    en: 'Inter',
    tw: 'Georama'
  }
}
```

**Key Actions:**
- `setCurrentLanguage(language)` - Change application language
- `loadTranslations()` - Load translation data
- `setRTL(isRTL)` - Set right-to-left layout
- `changeLanguage(languageCode)` - Async language change

#### 4. User Slice (`userSlice.js`)

Manages user authentication, preferences, and learning progress.

**State Structure:**
```javascript
{
  // Authentication
  isAuthenticated: false,
  user: null,
  token: null,
  
  // User Preferences
  preferences: {
    theme: 'light',
    language: 'en',
    notifications: true,
    accessibility: {
      highContrast: false,
      reducedMotion: false,
      fontSize: 'medium'
    }
  },
  
  // Learning Progress
  learningProgress: {
    completedLessons: [],
    vocabularyMastered: [],
    currentStreak: 0,
    totalStudyTime: 0,
    level: 'beginner'
  },
  
  // Community Activity
  communityActivity: {
    contributions: [],
    discussions: [],
    events: [],
    badges: []
  }
}
```

**Key Actions:**
- `setAuthentication(authData)` - Set user authentication state
- `updatePreference(key, value)` - Update user preference
- `updateLearningProgress(type, data)` - Update learning progress
- `loginUser(credentials)` - Async user login
- `logoutUser()` - Async user logout

### Using Radux in Components

#### Basic Usage

```javascript
import { useCulture, useUI } from '../hooks/useRadux';

const MyComponent = () => {
  const { activeSection, setActiveSection } = useCulture();
  const { showSuccessToast } = useUI();
  
  const handleSectionChange = (section) => {
    setActiveSection(section);
    showSuccessToast(`Switched to ${section} section`);
  };
  
  return (
    <button onClick={() => handleSectionChange('history')}>
      View History
    </button>
  );
};
```

#### Advanced Usage with Multiple Slices

```javascript
import { useStore, useDispatch } from '../hooks/useRadux';

const AdvancedComponent = () => {
  const { state, dispatch } = useStore();
  const dispatchAction = useDispatch();
  
  // Access multiple slices
  const { culture, ui, user } = state;
  
  // Dispatch custom actions
  const handleCustomAction = () => {
    dispatch({
      type: 'culture/setActiveSection',
      payload: 'traditions'
    });
  };
  
  return (
    <div>
      <p>Current section: {culture.activeSection}</p>
      <p>User level: {user.learningProgress.level}</p>
      <p>Theme: {ui.theme}</p>
    </div>
  );
};
```

### Async Actions

The store supports async actions for API integration:

```javascript
// Example async action
export const fetchCulturalData = () => async (dispatch) => {
  dispatch(setLoading(true));
  
  try {
    // API call would go here
    const response = await fetch('/api/cultural-data');
    const data = await response.json();
    
    dispatch(loadCulturalData(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
```

### State Transitions

#### Cultural Content Flow

1. **Initial Load**: `loadCulturalData()` → Loads mock data (future: API call)
2. **Section Change**: `setActiveSection(section)` → Updates active section, resets selection
3. **Filtering**: `setRegionFilter(region)` / `setSearchTerm(term)` → Filters content
4. **Item Selection**: `setSelectedItem(item, type)` → Selects item for detail view
5. **Navigation**: Routes to detail pages (`/culture/history/:id`, `/culture/traditions/:id`)

#### UI State Flow

1. **Modal Management**: `setContributeModal(isOpen)` → Toggles modal visibility
2. **Navigation**: `setMobileMenu(isOpen)` → Toggles mobile navigation
3. **Notifications**: `showToast(data)` → Shows toast notification
4. **Theme Changes**: `setTheme(theme)` → Updates application theme

#### Language Flow

1. **Initialization**: `initializeLanguage()` → Detects browser language, loads translations
2. **Language Change**: `changeLanguage(code)` → Updates language, reloads translations
3. **RTL Support**: `setRTL(isRTL)` → Updates layout direction

#### User Authentication Flow

1. **Login**: `loginUser(credentials)` → Authenticates user, sets session
2. **Session Management**: `initializeUser()` → Restores user session from localStorage
3. **Logout**: `logoutUser()` → Clears session, redirects to home

## 🔄 Migration from Context to Radux

The application is being migrated from React Context to Radux for better state management:

### Before (Context)
```javascript
import { useLanguage } from '../contexts/LanguageContext';

const Component = () => {
  const { currentLanguage, setCurrentLanguage } = useLanguage();
  // ...
};
```

### After (Radux)
```javascript
import { useLanguage } from '../hooks/useRadux';

const Component = () => {
  const { currentLanguage, setCurrentLanguage } = useLanguage();
  // ...
};
```

### Benefits of Migration

1. **Centralized State**: All state in one place with clear structure
2. **Predictable Updates**: State changes follow clear patterns
3. **Better Performance**: Optimized re-renders and state updates
4. **Developer Tools**: Better debugging and state inspection
5. **Scalability**: Easier to add new features and state
6. **Testing**: Simpler unit testing of state logic

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd akan-kasa

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development

```bash
# Start development server
npm run dev

# Run linting
npm run lint

# Preview production build
npm run preview
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=AkanKasa
VITE_APP_VERSION=1.0.0
```

### Feature Flags

Control feature availability in `src/config/featureFlags.js`:

```javascript
export default {
  showResearch: true,
  showAdvancedCulturePages: true,
  enableUserContributions: true,
  enableCommunityFeatures: true
};
```

## 📱 Mobile-First Design

The application is built with mobile-first principles:

- **Responsive Breakpoints**: `xs: 475px`, `sm: 640px`, `md: 768px`, `lg: 1024px`
- **Touch Targets**: Minimum 44px for all interactive elements
- **Mobile Navigation**: Collapsible navigation with touch-friendly controls
- **Performance**: Lazy loading, code splitting, and optimized bundles

## 🔒 Security & Performance

### Security Features

- **Input Validation**: All user inputs are validated
- **XSS Protection**: React's built-in XSS protection
- **CSRF Protection**: Ready for backend CSRF tokens
- **Secure Headers**: CSP and security headers ready

### Performance Optimizations

- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Components load only when needed
- **Service Worker**: Offline support and caching
- **Image Optimization**: Lazy loading and responsive images
- **Bundle Optimization**: Tree shaking and minification

## 🧪 Testing

### Unit Testing

```bash
# Run unit tests
npm run test

# Run tests with coverage
npm run test:coverage
```

### Integration Testing

```bash
# Run integration tests
npm run test:integration
```

### E2E Testing

```bash
# Run end-to-end tests
npm run test:e2e
```

## 📚 API Integration

### Current State

The application currently uses mock data but is structured for easy API integration:

```javascript
// In production, replace mock calls with real API calls
const response = await fetch('/api/cultural-data');
const data = await response.json();
```

### API Endpoints (Future)

```
GET  /api/cultural-data          # Get all cultural content
GET  /api/traditions             # Get traditions
GET  /api/history                # Get history
GET  /api/symbols                # Get symbols
GET  /api/translations/:lang     # Get translations
POST /api/auth/login             # User login
POST /api/auth/register          # User registration
PUT  /api/user/profile           # Update user profile
```

## 🤝 Contributing

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Style

- **ESLint**: Follow project ESLint configuration
- **Prettier**: Use Prettier for code formatting
- **TypeScript**: Consider migrating to TypeScript for better type safety
- **Testing**: Write tests for new features

### State Management Guidelines

1. **Single Source of Truth**: All state goes through Radux store
2. **Immutable Updates**: Never mutate state directly
3. **Action Types**: Use descriptive action type constants
4. **Selectors**: Create selectors for computed state
5. **Async Actions**: Handle loading and error states properly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Akan Community**: For preserving and sharing cultural knowledge
- **Open Source Contributors**: For the amazing tools and libraries
- **Cultural Heritage Organizations**: For supporting cultural preservation

## 📞 Support

For support and questions:

- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-repo/discussions)
- **Email**: support@akankasa.com

---

**AkanKasa** - Preserving Akan Heritage Through Technology 🎯
