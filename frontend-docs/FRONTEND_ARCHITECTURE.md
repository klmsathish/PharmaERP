# Pharmacy ERP System - Desktop Frontend Architecture Plan

## Technology Stack
- **Framework**: Electron 27+ (Cross-platform desktop app)
- **UI Framework**: React 18+ with TypeScript
- **State Management**: Redux Toolkit + RTK Query
- **UI Component Library**: Ant Design (antd) or Material-UI
- **Styling**: Tailwind CSS + CSS Modules
- **Build Tool**: Vite
- **Package Manager**: npm/yarn
- **Forms**: React Hook Form + Yup validation
- **HTTP Client**: Axios (integrated with RTK Query)
- **Charts**: Recharts or Chart.js
- **Date Handling**: date-fns
- **Desktop Features**: electron-store (local storage), electron-updater (auto-updates)

## Project Structure

```
frontend/
├── electron/                    # Electron main process
│   ├── main.ts                 # Main process entry point
│   ├── preload.ts             # Preload script for security
│   ├── ipc/                   # IPC handlers
│   │   ├── database.ts        # Local DB operations
│   │   ├── window.ts          # Window management
│   │   └── system.ts          # System operations
│   └── utils/
│       ├── menu.ts            # Application menu
│       └── updater.ts         # Auto-updater configuration
│
├── src/                        # React application (renderer process)
│   ├── main.tsx               # React app entry point
│   ├── App.tsx                # Main App component
│   ├── vite-env.d.ts         # TypeScript declarations
│   │
│   ├── assets/                # Static assets
│   │   ├── images/
│   │   ├── fonts/
│   │   └── icons/
│   │
│   ├── components/            # Reusable components
│   │   ├── common/
│   │   │   ├── Layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── Table/
│   │   │   │   ├── DataTable.tsx
│   │   │   │   └── TableActions.tsx
│   │   │   ├── Form/
│   │   │   │   ├── FormInput.tsx
│   │   │   │   ├── FormSelect.tsx
│   │   │   │   └── FormDatePicker.tsx
│   │   │   ├── Modal/
│   │   │   └── Loading/
│   │   │
│   │   ├── tax/
│   │   │   ├── TaxList.tsx
│   │   │   ├── TaxForm.tsx
│   │   │   └── TaxDetails.tsx
│   │   │
│   │   ├── product/
│   │   │   ├── ProductList.tsx
│   │   │   ├── ProductForm.tsx
│   │   │   ├── ProductSearch.tsx
│   │   │   └── ProductDetails.tsx
│   │   │
│   │   ├── manufacturer/
│   │   │   ├── ManufacturerList.tsx
│   │   │   ├── ManufacturerForm.tsx
│   │   │   └── ManufacturerDetails.tsx
│   │   │
│   │   └── reports/
│   │       ├── ReportsDashboard.tsx
│   │       └── charts/
│   │
│   ├── pages/                 # Page components
│   │   ├── Dashboard/
│   │   │   └── index.tsx
│   │   ├── Tax/
│   │   │   └── index.tsx
│   │   ├── Products/
│   │   │   ├── index.tsx
│   │   │   ├── ProductList.tsx
│   │   │   └── ProductDetail.tsx
│   │   ├── ProductTypes/
│   │   │   └── index.tsx
│   │   ├── ProductCategories/
│   │   │   └── index.tsx
│   │   ├── Manufacturers/
│   │   │   └── index.tsx
│   │   ├── Generics/
│   │   │   └── index.tsx
│   │   ├── ScheduleTypes/
│   │   │   └── index.tsx
│   │   ├── Reports/
│   │   │   └── index.tsx
│   │   └── Settings/
│   │       └── index.tsx
│   │
│   ├── store/                 # Redux store
│   │   ├── index.ts
│   │   ├── hooks.ts          # Typed hooks
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   ├── uiSlice.ts
│   │   │   └── notificationSlice.ts
│   │   └── api/              # RTK Query API slices
│   │       ├── baseApi.ts
│   │       ├── taxApi.ts
│   │       ├── productApi.ts
│   │       ├── manufacturerApi.ts
│   │       ├── productTypeApi.ts
│   │       ├── productCategoryApi.ts
│   │       ├── genericApi.ts
│   │       └── scheduleTypeApi.ts
│   │
│   ├── services/             # External services
│   │   ├── api.ts           # Axios configuration
│   │   ├── auth.ts          # Authentication service
│   │   └── storage.ts       # Local storage service
│   │
│   ├── hooks/                # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useDebounce.ts
│   │   ├── usePagination.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useKeyboardShortcuts.ts
│   │   ├── useFocusManagement.ts
│   │   └── useAccessibility.ts
│   │
│   ├── utils/                # Utility functions
│   │   ├── constants.ts
│   │   ├── validators.ts
│   │   ├── formatters.ts
│   │   └── helpers.ts
│   │
│   ├── types/                # TypeScript types
│   │   ├── index.ts
│   │   ├── models.ts         # Data models
│   │   ├── api.ts           # API types
│   │   └── electron.d.ts    # Electron API types
│   │
│   └── styles/               # Global styles
│       ├── globals.css
│       ├── variables.css
│       └── tailwind.css
│
├── public/                   # Public assets
│   └── icons/               # App icons for different platforms
│
├── resources/               # Electron resources
│   ├── icons/              # Platform-specific icons
│   │   ├── mac/
│   │   └── win/
│   └── installer/          # Installer configurations
│
├── dist/                   # Build output (ignored)
├── dist-electron/         # Electron build output (ignored)
├── release/              # Packaged apps (ignored)
│
├── .env                  # Environment variables
├── .env.example
├── .gitignore
├── electron-builder.json  # Electron builder configuration
├── package.json
├── tsconfig.json         # TypeScript configuration
├── tsconfig.node.json    # Node TypeScript configuration
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
└── README.md
```

## Key Features & Screens

### 1. Authentication & Security
- Login screen with JWT token management
- Keyboard-friendly login (Tab between fields, Enter to submit)
- Session management
- Role-based access control (RBAC)
- Secure API communication
- Local data encryption

### 2. Dashboard
- Overview statistics cards
- Quick actions panel
- Recent activities
- Low stock alerts
- Expiry alerts
- Sales/Purchase trends charts

### 3. Master Data Management Screens

#### Tax Management
- List view with search/filter
- Add/Edit tax modal
- Bulk operations
- Import/Export functionality

#### Product Type Management
- Grid view with inline editing
- Quick add functionality
- Drag-and-drop reordering

#### Product Category Management
- Tree view for hierarchical categories
- Category statistics
- Bulk category assignment

#### Manufacturer Management
- Card/List toggle view
- Detailed manufacturer profile
- Contact information management
- Product count per manufacturer

#### Schedule Type Management
- Simple list management
- Quick search
- Batch operations

#### Generic Medicine Management
- Searchable list
- Category-wise filtering
- Strength management
- Cross-reference with products

### 4. Product Management
- Advanced search with filters
  - By manufacturer
  - By category
  - By type
  - By schedule
  - By price range
  - By stock status
- Product grid/list view toggle
- Quick view modal (Alt+Click for quick view)
- Detailed product page
- Batch/Lot tracking
- Stock management
- Price history
- Generic composition view
- Barcode scanning support (Auto-focus after scan)
- Product image gallery
- **Quick Entry Mode**: 
  - Continuous product entry without mouse
  - Tab through fields
  - Enter to save and create new
  - Escape to exit quick entry mode

### 5. Reports & Analytics
- Stock reports
- Sales analytics
- Purchase analytics
- Expiry reports
- Tax reports
- Custom report builder
- Export to PDF/Excel

### 6. Settings
- Application preferences
- User preferences
- Printer settings
- Backup & restore
- Theme selection (Light/Dark)
- Language selection
- Notification preferences

## Desktop-Specific Features

### 1. Native Features
- System tray integration
- Native notifications
- Keyboard shortcuts
- Context menus
- File system access
- Printer integration
- Barcode scanner support
- Local database backup

### 2. Keyboard Navigation & Shortcuts

#### Global Keyboard Shortcuts
- `Tab` - Navigate forward through form fields
- `Shift+Tab` - Navigate backward through form fields
- `Enter` - Submit form / Confirm action
- `Escape` - Cancel/Close modal or dialog
- `Ctrl/Cmd+S` - Save current form
- `Ctrl/Cmd+N` - New record (context-dependent)
- `Ctrl/Cmd+F` - Focus search bar
- `Ctrl/Cmd+P` - Print current view
- `Ctrl/Cmd+Z` - Undo last action
- `Ctrl/Cmd+Y` - Redo action
- `F1` - Help/Documentation
- `F2` - Edit selected item
- `F5` - Refresh current view
- `F11` - Toggle fullscreen

#### Form Navigation
- `Tab` - Move to next field (auto-focus management)
- `Enter` in text field - Move to next field
- `Enter` in last field - Submit form
- `Ctrl+Enter` - Submit form from any field
- `Arrow Keys` - Navigate dropdowns and lists
- `Space` - Toggle checkboxes
- `Alt+Down Arrow` - Open dropdown

#### Data Grid/Table Navigation
- `Arrow Keys` - Navigate cells
- `Enter` - Edit cell/Open detail view
- `Space` - Select row
- `Ctrl+A` - Select all rows
- `Ctrl+Click` - Multi-select rows
- `Shift+Click` - Range select
- `Delete` - Delete selected rows (with confirmation)
- `Ctrl+C` - Copy selected data
- `Ctrl+V` - Paste data

#### Quick Actions
- `Alt+1` to `Alt+9` - Quick access to main menu items
- `Ctrl+1` to `Ctrl+9` - Switch between open tabs
- `Ctrl+Tab` - Cycle through tabs
- `Ctrl+W` - Close current tab

### 3. Accessibility Features

#### Focus Management
```typescript
// Custom hook for focus management
interface FocusConfig {
  enableTabTrapping: boolean;
  autoFocusFirst: boolean;
  restoreFocusOnClose: boolean;
}

// Form field auto-focus on validation error
// Automatic focus on first empty required field
// Focus visible indicators for keyboard navigation
```

#### Screen Reader Support
- ARIA labels for all interactive elements
- Semantic HTML structure
- Announcements for dynamic content changes
- Form validation error announcements

#### Visual Accessibility
- High contrast mode support
- Keyboard focus indicators
- Customizable font sizes
- Color blind friendly palettes

### 4. Offline Capabilities
- Local SQLite database sync
- Offline mode with queue
- Automatic sync when online
- Conflict resolution

### 5. Window Management
- Multi-window support
- Resizable panels
- Remember window state
- Full-screen mode

### 6. Auto-Update
- Background updates check
- Progressive download
- Automatic installation
- Release notes display

## State Management Strategy

### Global State (Redux)
- User authentication
- Application settings
- UI state (theme, sidebar)
- Notifications queue
- Offline queue

### Server State (RTK Query)
- All API data
- Caching strategy
- Optimistic updates
- Automatic refetching
- Background sync

### Local State (Component)
- Form data
- UI toggles
- Temporary filters

## API Integration

### Request Interceptors
- Add authentication token
- Add request ID
- Log requests (dev mode)

### Response Interceptors
- Handle token refresh
- Global error handling
- Success notifications
- Transform data

### Error Handling
- Network errors
- Validation errors
- Server errors
- Timeout handling
- Retry logic

## Performance Optimization

### Code Splitting
- Lazy load routes
- Dynamic imports
- Component lazy loading

### Caching Strategy
- API response caching
- Image caching
- Static asset caching

### Optimization Techniques
- Virtual scrolling for large lists
- Debounced search
- Memoized computations
- Optimistic UI updates

## Security Considerations

### Electron Security
- Context isolation enabled
- Node integration disabled
- Preload scripts for IPC
- Content Security Policy
- Secure IPC communication

### Data Security
- Encrypted local storage
- Secure API communication (HTTPS)
- Input sanitization
- XSS prevention

## Build & Deployment

### Development Build
```json
{
  "scripts": {
    "dev": "vite",
    "electron:dev": "electron .",
    "build": "vite build",
    "electron:build": "electron-builder"
  }
}
```

### Production Build Configuration
```json
{
  "build": {
    "appId": "com.pharmaerp.desktop",
    "productName": "Pharma ERP",
    "directories": {
      "output": "release"
    },
    "files": [
      "dist/**/*",
      "dist-electron/**/*"
    ],
    "mac": {
      "category": "public.app-category.business",
      "target": ["dmg", "zip"]
    },
    "win": {
      "target": ["nsis", "zip"]
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true
    }
  }
}
```

## Dependencies

### Core Dependencies
```json
{
  "dependencies": {
    "electron": "^27.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.18.0",
    "@reduxjs/toolkit": "^1.9.7",
    "react-redux": "^8.1.3",
    "antd": "^5.11.0",
    "axios": "^1.6.0",
    "react-hook-form": "^7.47.0",
    "yup": "^1.3.3",
    "date-fns": "^2.30.0",
    "electron-store": "^8.1.0",
    "electron-updater": "^6.1.4",
    "mousetrap": "^1.6.5",
    "react-hotkeys-hook": "^4.4.1",
    "focus-trap-react": "^10.2.3"
  }
}
```

### Development Dependencies
```json
{
  "devDependencies": {
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "@vitejs/plugin-react": "^4.1.0",
    "electron-builder": "^24.6.4",
    "typescript": "^5.2.2",
    "vite": "^5.0.0",
    "tailwindcss": "^3.3.5",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31",
    "eslint": "^8.53.0",
    "prettier": "^3.1.0"
  }
}
```

## Development Workflow

### Phase 1: Setup & Core
1. Initialize Electron + React project
2. Configure TypeScript and build tools
3. Setup Redux and RTK Query
4. Implement authentication flow
5. Create base layout components

### Phase 2: Master Data Modules
1. Tax management UI
2. Product type management
3. Category management
4. Manufacturer management
5. Schedule type management
6. Generic medicine management

### Phase 3: Product Module
1. Product list with filters
2. Product detail view
3. Product form with validation
4. Generic mapping interface
5. Search functionality

### Phase 4: Advanced Features
1. Dashboard with analytics
2. Reports module
3. Offline sync
4. Barcode integration
5. Print functionality

### Phase 5: Polish & Optimization
1. Performance optimization
2. Error handling
3. Loading states
4. Animations
5. Accessibility

### Phase 6: Packaging & Distribution
1. Build configuration
2. Code signing (Mac/Windows)
3. Auto-updater setup
4. Installer creation
5. Testing on target platforms

## Testing Strategy

### Unit Testing
- Component testing with React Testing Library
- Redux store testing
- Utility function testing

### Integration Testing
- API integration tests
- Electron IPC tests
- Database sync tests

### E2E Testing
- Playwright for E2E tests
- Critical user flows
- Cross-platform testing

## Next Steps
1. Set up Electron + React project structure
2. Configure build tools and TypeScript
3. Implement core layout and navigation
4. Set up Redux store and API integration
5. Create reusable component library
6. Implement authentication flow
7. Build master data management screens
8. Add offline capabilities
9. Package for Mac and Windows
