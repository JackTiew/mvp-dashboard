# Sustainawise MVP Dashboard

A comprehensive fraud detection and prevention dashboard built with React, TypeScript, and Vite. Features include Rules Studio (CRUD), Case Management, Metrics Dashboard, and Data Connector for file uploads/downloads.

## 📚 Library Versions

| Library                   | Version |
| ------------------------- | ------- |
| React                     | ^19.1.1 |
| TypeScript                | ~5.9.3  |
| Vite                      | ^7.1.7  |
| Ant Design                | ^5.27.6 |
| React Router DOM          | ^7.9.4  |
| Chart.js                  | ^4.5.1  |
| react-chartjs-2           | ^5.3.0  |
| Axios                     | ^1.12.2 |
| MSW (Mock Service Worker) | ^2.11.6 |
| date-fns                  | ^4.1.0  |

## 🚀 Features

### Rules Studio (CRUD)

-   **List Rules**: View all configured rules with name, type, status, and last updated timestamp
-   **Create/Edit Rules**: Interactive form with real-time JSON preview
-   **Rule Types**:
    -   `bank_change` - Detects bank account changes within a time window
    -   `duplicate` - Identifies duplicate transactions
    -   `over_limit` - Flags transactions exceeding thresholds
-   **Validation**: Form validation and JSON payload preview before submission

### Case Dashboard

-   **Paginated Table**: Server-side pagination with 20 cases per page
-   **Columns**: Decision, reasons, vendor, amount, created date
-   **Filters & Search**:
    -   Search by vendor or case ID
    -   Filter by status (open, held, released, callback_done)
-   **Detail Drawer**:
    -   Full transaction input JSON
    -   Rule checks with match details
    -   Action buttons (Hold, Release, Callback Done)

### Metrics Dashboard

-   **Exceptions by Type**: Bar chart showing distribution of exceptions
-   **Prevented Loss Trend**: Line chart tracking prevented losses over time
-   **Summary Cards**: Total exceptions and total prevented loss

### Data Connector

-   **Multiple File Upload**:
    -   Drag-and-drop or click to select files
    -   Support for CSV, PDF, and Excel files (.csv, .pdf, .xlsx, .xls)
    -   Multiple file selection with queue management
    -   File validation (type and size limit: 10MB per file)
-   **Upload Management**:
    -   Manual upload control with confirmation button
    -   Real-time progress bar during upload
    -   Clear all functionality to remove queued files
    -   Success/error notifications for each file
-   **Download Reports**:
    -   Responsive table showing all available reports
    -   Columns: File name, description, type, size, upload date
    -   File type icons (PDF, Excel, CSV) with color coding
    -   One-click download functionality
    -   Mobile-responsive with adaptive column visibility
-   **Mock System**: Simulates file upload/download with 10% random failure rate for testing error handling

### UX Features

-   ✅ Light/Dark theme toggle
-   ✅ Fully responsive layout (mobile, tablet, desktop)
-   ✅ Sticky header navigation with collapsible sidebar
-   ✅ Search and filter capabilities
-   ✅ Real-time form validation
-   ✅ Loading states and error handling
-   ✅ Drag-and-drop file upload
-   ✅ Progress indicators for async operations
-   ✅ Toast notifications for user feedback
-   ✅ Protected routes with authentication

## 🛠️ Tech Stack

-   **Framework**: React 19 + Vite
-   **Language**: TypeScript (strict mode)
-   **UI Library**: Ant Design 5
-   **Routing**: React Router DOM
-   **Charts**: Chart.js with react-chartjs-2
-   **API Client**: Axios
-   **Mocking**: MSW (Mock Service Worker)
-   **Date Utilities**: date-fns

## 📋 API Contracts

### Rules API

```typescript
GET    /api/v1/rules              // List all rules
POST   /api/v1/rules              // Create new rule
PUT    /api/v1/rules/:id          // Update existing rule
DELETE /api/v1/rules/:id          // Delete rule
```

### Cases API

```typescript
GET    /api/v1/cases?status=open&page=1&page_size=20  // List cases (paginated)
POST   /api/v1/cases/:id/action   // Perform action on case
       Body: { "action": "hold|release|callback_done" }
```

### Metrics API

```typescript
GET    /api/v1/metrics            // Get metrics data
       Response: {
         "exceptions_by_type": { "bank_change": 24, ... },
         "prevented_loss_series": [{ "date": "2025-10-23", "amount": 31500 }, ...]
       }
```

### Reports API

```typescript
GET    /api/v1/reports            // List all available reports
       Response: Array<{
         id: string;
         name: string;
         description: string;
         type: 'csv' | 'pdf' | 'xlsx';
         size: string;
         uploadedAt: string;
         downloadUrl: string;
       }>

POST   /api/v1/reports/upload     // Upload a new report file
       Content-Type: multipart/form-data
       Body: FormData with 'file' field
       Response: {
         success: boolean;
         message: string;
         file?: {
           id: string;
           name: string;
           size: number;
           uploadedAt: string;
         }
       }
```

## 🚀 Getting Started

### Prerequisites

-   Node.js 18+
-   npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd mvp-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Login Credentials

For development/demo purposes, use:

-   **Username**: `admin`
-   **Password**: `admin`

### Available Routes

Once logged in, you can access:

-   `/` - Metrics Dashboard (default homepage)
-   `/case` - Case Dashboard
-   `/rules` - Rules Studio
-   `/data-connector` - Data Connector (upload/download reports)
-   `/login` - Login page (public route)

All routes except `/login` are protected and require authentication.

### Mock vs Real API

**Development Mode (Default)**:

-   MSW automatically mocks all API endpoints
-   No backend server required
-   Data persists in memory during the session

**Production Mode**:

1. Set `VITE_API_BASE_URL` in `.env` to your actual API endpoint
2. Ensure your backend implements the API contracts above
3. Build and deploy:

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
mvp-dashboard/
├── public/
│   ├── mockServiceWorker.js    # MSW service worker
│   └── vite.svg                # Vite logo
├── src/
│   ├── common/
│   │   └── constants.tsx       # Application-wide constants
│   ├── components/
│   │   ├── Layout.tsx          # Main layout with navigation
│   │   ├── Layout.module.css   # Layout component styles
│   │   ├── ProtectedRoute.tsx  # Authentication route guard
│   │   ├── ProtectedRoute.module.css
│   │   ├── RuleForm.tsx        # Rule create/edit form
│   │   └── RuleForm.module.css # RuleForm component styles
│   ├── contexts/
│   │   ├── AuthContext.tsx     # Authentication context provider
│   │   └── ThemeContext.tsx    # Theme context (light/dark mode)
│   ├── interface/
│   │   ├── case.ts             # Case type definitions
│   │   ├── common.ts           # Common type definitions
│   │   ├── metric.ts           # Metrics type definitions
│   │   ├── report.ts           # Report type definitions
│   │   ├── rule.ts             # Rule type definitions
│   │   └── user.ts             # User type definitions
│   ├── mocks/
│   │   ├── browser.ts          # MSW browser setup
│   │   ├── data.ts             # Mock data
│   │   ├── handlers.ts         # API mock handlers
│   │   ├── server.ts           # MSW server setup
│   │   └── setup.ts            # MSW initialization
│   ├── pages/
│   │   ├── CaseDashboard.tsx   # Case dashboard page
│   │   ├── CaseDashboard.module.css
│   │   ├── DataConnector.tsx   # Data upload/download page
│   │   ├── DataConnector.module.css
│   │   ├── Login.tsx           # Login page
│   │   ├── Login.module.css
│   │   ├── Metrics.tsx         # Metrics and charts page
│   │   ├── Metrics.module.css
│   │   ├── RulesStudio.tsx     # Rules management page
│   │   └── RulesStudio.module.css
│   ├── service/
│   │   ├── auth.tsx            # Authentication API service
│   │   ├── case.tsx            # Case API service
│   │   ├── metric.tsx          # Metrics API service
│   │   ├── report.tsx          # Report upload/download API service
│   │   └── rule.tsx            # Rules API service
│   ├── App.tsx                 # Root component
│   ├── http.tsx                # HTTP client configuration (Axios)
│   ├── index.css               # Global styles
│   ├── main.tsx                # Entry point with MSW initialization
│   └── routes.tsx              # Route configuration
├── eslint.config.js            # ESLint configuration
├── index.html                  # HTML entry point
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── tsconfig.app.json           # TypeScript app config
├── tsconfig.node.json          # TypeScript node config
└── vite.config.ts              # Vite configuration
```

## 🎨 Component Notes

### RulesStudio

-   Uses Ant Design Table with sorting and pagination
-   Modal-based form for create/edit operations
-   Real-time JSON preview updates as form values change
-   Delete confirmation with Popconfirm component

### CaseDashboard

-   Server-side pagination (controlled by API)
-   Client-side search filtering on vendor/case ID
-   Drawer component for detailed case view
-   Action buttons conditionally disabled based on current status

### Metrics

-   Responsive grid layout with Chart.js visualizations
-   Bar chart for categorical data (exceptions by type)
-   Line chart with area fill for trend data (prevented loss)
-   Summary statistics cards

### DataConnector

-   Ant Design Dragger component for intuitive drag-and-drop uploads
-   Manual upload control (files queued before uploading)
-   File validation before adding to queue (type and size)
-   Progress tracking with visual feedback
-   Responsive table with horizontal scroll on mobile
-   Adaptive column visibility based on screen size:
    -   Mobile (xs): File, Type, Action
    -   Small (sm): + Size column
    -   Medium (md): + Description column
    -   Large (lg+): All columns including Upload date
-   Mock download functionality for testing

### Layout

-   Collapsible sidebar with navigation menu
-   Sticky header with theme toggle
-   Responsive design using Ant Design's Layout components
-   Mobile-friendly hamburger menu

## 🧪 Testing

The application is built with testability in mind:

-   All API calls are abstracted in `src/api/client.ts`
-   Mock data is centralized in `src/mocks/data.ts`
-   TypeScript ensures type safety across components
-   MSW can be used for integration testing

To add tests (optional):

```bash
npm install -D @testing-library/react @testing-library/jest-dom vitest
```

## 🔧 Configuration

### Environment Variables

You can optionally create a `.env` file in the root directory:

```bash
# API Configuration
# Leave empty or omit to use Mock Service Worker (MSW) for development
# Set to your backend API URL for production
VITE_API_BASE_URL=

# Example for production:
# VITE_API_BASE_URL=https://api.sustainawise.com
```

If no `.env` file exists, the application defaults to `http://localhost:3000` and uses MSW for API mocking.

### TypeScript Configuration

-   Strict mode enabled
-   Path aliases can be added in `tsconfig.json` and `vite.config.ts`

### Linting & Formatting

```bash
npm run lint              # Run ESLint
```

## 📦 Build

```bash
npm run build            # Build for production
npm run preview          # Preview production build
```

## 🌐 Browser Support

The application supports all modern browsers:

-   Chrome (latest)
-   Firefox (latest)
-   Safari (latest)
-   Edge (latest)

## 🏗️ Architecture Highlights

-   **Service Layer Pattern**: All API calls abstracted in dedicated service files
-   **Context API**: Used for global state (auth, theme)
-   **Protected Routes**: Authentication guard for secure pages
-   **Mock Service Worker**: Seamless API mocking for development
-   **CSS Modules**: Scoped styling to prevent conflicts
-   **TypeScript Strict Mode**: Enhanced type safety

## 📝 Key Implementation Details

### File Upload

-   Files are validated on the client side before upload
-   Manual upload control for better UX (user confirms before uploading)
-   Progress tracking for all uploads
-   Batch upload support with individual success/error handling

### Authentication

-   Context-based authentication state management
-   Protected routes redirect to login if unauthenticated
-   Session persists in memory (no token storage in mock mode)

### Responsive Design

-   Mobile-first approach
-   Breakpoints: xs (< 576px), sm (≥ 576px), md (≥ 768px), lg (≥ 992px)
-   Adaptive navigation (hamburger menu on mobile)
-   Table columns adapt based on screen size

## 🤝 Contributing

Contributions are welcome! Please ensure:

-   Code follows existing patterns and conventions
-   TypeScript types are properly defined
-   Components are responsive
-   No console errors or warnings

## 📄 License

This project is part of the Sustainawise MVP.

---

Built with ❤️ using React, TypeScript, and Ant Design
