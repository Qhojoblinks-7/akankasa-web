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

## 📱 Mobile-First Design Implementation

The AkanKasa platform is built with a **mobile-first design philosophy**, ensuring optimal user experience across all device sizes. This approach prioritizes mobile users while progressively enhancing the experience for larger screens.

> **📋 Important**: For comprehensive overflow protection guidelines and component requirements, see [OVERFLOW_PROTECTION.md](./OVERFLOW_PROTECTION.md).

### Design Principles

1. **Mobile-First Approach**: Start with mobile breakpoints (base, xs, sm) and scale up
2. **Touch-Friendly Interactions**: Minimum 44px touch targets for all interactive elements
3. **Responsive Typography**: Scalable text that maintains readability across devices
4. **Optimized Spacing**: Mobile-appropriate padding and margins that scale appropriately
5. **Accessibility First**: WCAG compliance with keyboard navigation and screen reader support

### Breakpoint System

```css
/* Tailwind CSS breakpoints (mobile-first) */
xs: 475px    /* Extra small devices */
sm: 640px    /* Small devices (tablets) */
md: 768px    /* Medium devices (small laptops) */
lg: 1024px   /* Large devices (desktops) */
xl: 1280px   /* Extra large devices */
2xl: 1536px  /* 2X large devices */
```

### Responsive Design Patterns

#### 1. Typography Scaling

```jsx
// Mobile-first typography
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
  Learn Akan Language
</h1>

<p className="text-base sm:text-lg lg:text-xl opacity-90 leading-relaxed">
  Master the beautiful Akan language through interactive lessons
</p>
```

#### 2. Spacing and Layout

```jsx
// Mobile-first spacing
<div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
  <div className="space-y-4 sm:space-y-6 lg:space-y-8">
    {/* Content */}
  </div>
</div>
```

#### 3. Grid Systems

```jsx
// Mobile-first grid layouts
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
  {/* Grid items */}
</div>
```

#### 4. Touch-Friendly Interactions

```jsx
// Minimum 44px touch targets
<button className="min-h-[44px] min-w-[44px] px-4 py-2 rounded-lg">
  Click Me
</button>

// Full-width buttons on mobile
<button className="w-full sm:w-auto px-6 py-3 min-h-[44px]">
  Submit
</button>
```

### Component-Specific Mobile Optimizations

#### Navigation Components

- **Navbar**: Collapsible mobile menu with touch-friendly controls
- **Tabs**: Horizontal scrolling on mobile with proper touch targets
- **Breadcrumbs**: Simplified mobile navigation with clear hierarchy

#### Form Components

- **Input Fields**: Minimum 44px height with proper spacing
- **Select Dropdowns**: Touch-friendly with adequate padding
- **Buttons**: Full-width on mobile, appropriate sizing on larger screens
- **Validation**: Mobile-appropriate error messages and feedback

#### Content Display

- **Cards**: Responsive layouts that stack on mobile
- **Images**: Lazy loading with mobile-optimized sizing
- **Text**: Readable line lengths and appropriate spacing
- **Tables**: Horizontal scrolling or stacked layouts on mobile

### Mobile Performance Optimizations

#### 1. Lazy Loading

```jsx
// Component lazy loading
const HistoryDetail = lazy(() => import('./pages/HistoryDetail'));

// Image lazy loading
<LazyImage 
  src={imageUrl} 
  alt={description}
  className="w-full h-48 sm:h-64 lg:h-80"
/>
```

#### 2. Conditional Rendering

```jsx
// Show/hide content based on screen size
{isMobile && <MobileNavigation />}
{!isMobile && <DesktopNavigation />}

// Responsive content
<div className="hidden sm:block">
  {/* Desktop-only content */}
</div>
<div className="block sm:hidden">
  {/* Mobile-only content */}
</div>
```

#### 3. Touch Event Handling

```jsx
// Touch-friendly interactions
const handleTouchStart = (e) => {
  // Touch-specific logic
};

const handleClick = (e) => {
  // Click-specific logic
};

<button 
  onTouchStart={handleTouchStart}
  onClick={handleClick}
  className="touch-manipulation"
>
  Interactive Button
</button>
```

### Accessibility Features

#### 1. ARIA Labels and Roles

```jsx
// Proper ARIA attributes for mobile
<button 
  aria-label="Toggle mobile navigation menu"
  aria-expanded={isMenuOpen}
  aria-controls="mobile-menu"
>
  <Menu className="w-6 h-6" />
</button>
```

#### 2. Keyboard Navigation

```jsx
// Keyboard-accessible components
<div 
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleAction();
    }
  }}
  role="button"
  aria-label="Interactive content"
>
  {/* Content */}
</div>
```

#### 3. Focus Management

```jsx
// Proper focus handling for modals
useEffect(() => {
  if (isOpen) {
    // Trap focus within modal
    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  }
}, [isOpen]);
```

### Mobile Testing Guidelines

#### 1. Device Testing

- **iOS Devices**: iPhone SE, iPhone 12, iPhone 14 Pro Max
- **Android Devices**: Various screen sizes and resolutions
- **Tablets**: iPad, Android tablets in both orientations
- **Emulators**: Chrome DevTools, BrowserStack, LambdaTest

#### 2. Performance Testing

```bash
# Lighthouse mobile testing
npm run lighthouse:mobile

# Core Web Vitals monitoring
npm run test:performance

# Bundle size analysis
npm run analyze:bundle
```

#### 3. Touch Testing

- **Touch Targets**: Verify minimum 44px size
- **Gesture Support**: Test pinch-to-zoom, swipe, tap
- **Orientation Changes**: Test portrait/landscape switching
- **Keyboard Handling**: Test virtual keyboard interactions

### CSS Utilities for Mobile-First Design

#### Custom Tailwind Classes

```css
/* Mobile-first utilities */
@layer utilities {
  .mobile-optimized {
    @apply px-4 py-3 text-sm;
  }
  
  .touch-target {
    @apply min-h-[44px] min-w-[44px];
  }
  
  .mobile-text {
    @apply text-sm leading-relaxed;
  }
  
  .mobile-spacing {
    @apply space-y-4 sm:space-y-6;
  }
}
```

#### Responsive Mixins

```css
/* Mobile-first media queries */
@custom-media --mobile (max-width: 640px);
@custom-media --tablet (min-width: 641px) and (max-width: 1024px);
@custom-media --desktop (min-width: 1025px);

/* Usage */
.mobile-component {
  @media (--mobile) {
    /* Mobile styles */
  }
  
  @media (--tablet) {
    /* Tablet styles */
  }
  
  @media (--desktop) {
    /* Desktop styles */
  }
}
```

### Mobile-First Component Examples

#### Responsive Card Component

```jsx
const ResponsiveCard = ({ title, content, image }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    {/* Image - Mobile first */}
    <div className="h-32 sm:h-40 lg:h-48 relative">
      <LazyImage 
        src={image} 
        alt={title}
        className="w-full h-full object-cover"
      />
    </div>
    
    {/* Content - Mobile first */}
    <div className="p-4 sm:p-5 lg:p-6">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 leading-tight">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
        {content}
      </p>
      
      {/* Actions - Mobile first */}
      <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
        <button className="w-full sm:w-auto px-4 py-2 bg-yellow-600 text-white rounded-lg min-h-[44px] font-medium">
          Learn More
        </button>
        <button className="w-full sm:w-auto px-4 py-2 border border-gray-300 text-gray-700 rounded-lg min-h-[44px] font-medium">
          Share
        </button>
      </div>
    </div>
  </div>
);
```

#### Responsive Navigation

```jsx
const ResponsiveNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <nav className="bg-white shadow-lg">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <NavLink to="/learn">Learn</NavLink>
          <NavLink to="/culture">Culture</NavLink>
          <NavLink to="/dictionary">Dictionary</NavLink>
        </div>
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg min-h-[44px] min-w-[44px]"
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-2 space-y-1">
            <MobileNavLink to="/learn" onClick={() => setIsMobileMenuOpen(false)}>
              Learn
            </MobileNavLink>
            <MobileNavLink to="/culture" onClick={() => setIsMobileMenuOpen(false)}>
              Culture
            </MobileNavLink>
            <MobileNavLink to="/dictionary" onClick={() => setIsMobileMenuOpen(false)}>
              Dictionary
            </MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  );
};
```

### Overflow Protection & Layout Safety

#### 1. Horizontal Overflow Prevention

- **Global Protection**: `overflow-x: hidden` on root containers
- **Container Constraints**: `max-w-screen-xl` and `box-border` on all containers
- **Text Safety**: `break-words` on all text content to prevent overflow
- **Layout Safety**: `overflow-hidden` on grids, flex containers, and content sections

#### 2. Responsive Containment

- **Mobile-First Constraints**: Start with mobile breakpoints and scale up
- **Flexible Grids**: Use `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` with overflow protection
- **Safe Flexbox**: Implement `flex-wrap` and `min-w-0` for flexible layouts
- **Touch-Friendly**: Minimum 44px touch targets that don't cause overflow

#### 3. Component Safety Standards

- **Required Classes**: Every component must include overflow protection
- **Container Pattern**: Use consistent container structure with safety classes
- **Testing Requirements**: Test with long content, various screen sizes, and orientations
- **Enforcement**: Overflow protection is mandatory for all components

> **🔒 Critical**: See [OVERFLOW_PROTECTION.md](./OVERFLOW_PROTECTION.md) for complete implementation guidelines, component checklist, and enforcement rules.

### Future Mobile Enhancements

#### 1. Progressive Web App Features

- **Offline Support**: Service worker for content caching
- **App Installation**: Add to home screen functionality
- **Push Notifications**: Learning reminders and updates
- **Background Sync**: Content synchronization

#### 2. Advanced Mobile Interactions

- **Gesture Navigation**: Swipe between sections
- **Voice Input**: Speech-to-text for search
- **Haptic Feedback**: Touch response on supported devices
- **Motion Sensors**: Device orientation awareness

#### 3. Mobile-Specific Features

- **Camera Integration**: Photo contributions
- **Location Services**: Regional content filtering
- **Social Sharing**: Native sharing capabilities
- **Biometric Authentication**: Fingerprint/face unlock

## 📊 State Management with Radux

The application uses **Radux** for centralized state management, providing a clean and scalable architecture for managing application state.

### Store Structure

```javascript
// Main store configuration using Redux Toolkit
export const store = configureStore({
  reducer: {
    culture: cultureReducer,      // Cultural data and UI state
    ui: uiReducer,               // UI interactions and preferences
    language: languageReducer,    // Language settings and translations
    user: userReducer,           // User authentication and preferences
  },
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
- **Overflow Protection**: Follow overflow protection guidelines for all components

### Overflow Protection Requirements

**MANDATORY**: All new components must implement overflow protection:

1. **Component Structure**: Use required overflow protection classes
2. **Testing**: Test with long content and various screen sizes
3. **Validation**: Use the component checklist before submitting
4. **Documentation**: Document any overflow protection decisions

> **🚫 Critical**: Components without proper overflow protection will not be merged. See [OVERFLOW_PROTECTION.md](./OVERFLOW_PROTECTION.md) for complete requirements.

### State Management Guidelines

1. **Single Source of Truth**: All state goes through Radux store
2. **Immutable Updates**: Never mutate state directly
3. **Action Types**: Use descriptive action type constants
4. **Selectors**: Create selectors for computed state
5. **Async Actions**: Handle loading and error states properly

### Mobile-First Development Guidelines

1. **Start with Mobile**: Design for mobile breakpoints first
2. **Touch-Friendly**: Ensure minimum 44px touch targets
3. **Responsive Typography**: Use scalable text sizing
4. **Performance**: Optimize for mobile performance
5. **Accessibility**: Maintain WCAG compliance across devices
6. **Overflow Protection**: Implement mandatory overflow protection on all components

### Overflow Protection Integration

Radux state management integrates with overflow protection:

1. **UI State**: Track responsive states and overflow conditions
2. **Layout Safety**: Ensure state changes don't cause layout overflow
3. **Component Validation**: Enforce overflow protection in component rendering
4. **Testing**: Include overflow testing in state management tests

> **🔒 Required**: All components using Radux must implement overflow protection. See [OVERFLOW_PROTECTION.md](./OVERFLOW_PROTECTION.md) for implementation details.

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
