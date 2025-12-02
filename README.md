# Sustainawise IntegrityOS Dashboard

A comprehensive governance, integrity, and ESG management platform built with React, TypeScript, and Vite. Features include Governance Dashboard, Task Management, Workflows, Compliance Tracking, Third-Party Risk Management, Incident Management, Integrity Culture, ESG Reporting, and Data Connector.

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

### Governance Dashboard (Home)

-   **Executive KPI Cards**: Real-time display of tasks, incidents, and integrity scores
-   **AI Executive Insight**: Weekly governance summary powered by IntegrityOS AI
-   **Open Incidents Overview**: Quick view of high-priority governance incidents with risk levels
-   **Task Management**: Display of pending approvals and integrity actions
-   **Trend Analysis**:
    -   Requests Over Time: Workflow trends over 6 months
    -   Integrity KPI Trend: Quarterly integrity score progression
    -   Governance Activities: Visual representation of policies, training, and reviews
-   **Risk Level Indicators**: Color-coded tags (High, Medium, Low) for quick assessment

### Main Section

#### My Tasks

-   **Approval Management**: Centralized view of all governance actions requiring attention
-   **AI-Assisted Prioritization**: Intelligent ordering based on severity and due dates
-   **Direct Links**: Quick access to underlying workflows or incident details
-   **Compliance Flags**: High-risk items highlighted with integrity indicators

#### Workflows

-   **Approval Standardization**: Design and manage quotation, campaign, and contract approvals
-   **Multi-Step Processes**: Complex governance processes with AI-assisted routing
-   **Workflow Templates**: Reusable approval workflows for consistency

#### Compliance

-   **Regulatory Readiness**: FINAS, MCMC & regulatory compliance tracking
-   **Checklist Management**: Centralized compliance requirements and approvals
-   **Evidence Repository**: Policy attestations and compliance documentation
-   **Content Approvals**: FINAS screening and approval workflows

#### Third Parties

-   **Vendor Risk Management**: Consolidated view of third-party risk scores
-   **Contract Status Tracking**: Monitor contract lifecycle and status
-   **Incident Links**: Connection between third-party activities and incidents
-   **Pattern Detection**: AI-powered detection of risky patterns (low-margin deals, abnormal discounting)

#### Incidents

-   **Incident Tracking**: Comprehensive case management system
-   **Status Management**: Track incidents through their lifecycle (open, held, released)
-   **Detailed Investigation**: Full case details with rule checks and match information
-   **Action Controls**: Hold, Release, and Callback Done functionality

### Integrity & ESG Section

#### Policies & Training (Data Connector)

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

#### Integrity Culture (Rules Studio)

-   **Rule Management**: CRUD operations for governance and integrity rules
-   **Rule Types**: Bank changes, duplicates, over-limit transactions
-   **Real-time Preview**: JSON payload preview before submission
-   **Rule Validation**: Form validation for rule configuration

#### ESG Reporting (Metrics)

-   **Exception Analytics**: Bar chart showing distribution of exceptions by type
-   **Loss Prevention Tracking**: Line chart tracking prevented losses over time
-   **Summary Statistics**: Total exceptions and prevented loss metrics
-   **Trend Visualization**: Interactive charts for data analysis

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

### Dashboard API

```typescript
GET    /api/v1/dashboard          // Get dashboard data
       Response: {
         "kpi": {
           "tasks": number,
           "incidents": number,
           "integrityScore": number,
           "integrityChange": number
         },
         "openIncidents": Array<{ id, title, risk }>,
         "tasks": Array<{ title, dueDate }>,
         "detailedIncidents": Array<{ id, title, status }>,
         "requestsOverTime": { labels, values },
         "integrityTrend": { labels, values },
         "governanceActivities": { labels, values },
         "aiInsight": { title, points, footer }
       }
```

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

**Main Section:**

-   `/` - Governance Dashboard (homepage with KPIs, trends, and AI insights)
-   `/my-tasks` - My Tasks (approvals & governance actions)
-   `/workflows` - Workflows (quotation, campaign & contract approvals)
-   `/compliance` - Compliance (regulatory readiness tracking)
-   `/third-parties` - Third Parties (vendor & partner risk management)
-   `/incidents` - Incidents (case management and tracking)

**Integrity & ESG Section:**

-   `/policies-training` - Policies & Training (data connector for uploads/downloads)
-   `/integrity-culture` - Integrity Culture (rules studio for governance rules)
-   `/esg-reporting` - ESG Reporting (metrics and analytics)

**Public Routes:**

-   `/login` - Login page (username: admin, password: admin)

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
│   │   ├── dashboard.ts        # Dashboard type definitions
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
│   │   ├── CaseDashboard.tsx   # Case dashboard page (used for Incidents route)
│   │   ├── CaseDashboard.module.css
│   │   ├── Compliance.tsx      # Compliance management page
│   │   ├── DataConnector.tsx   # Data upload/download page (Policies & Training)
│   │   ├── DataConnector.module.css
│   │   ├── Home.tsx            # Governance dashboard (homepage)
│   │   ├── Home.module.css
│   │   ├── Login.tsx           # Login page
│   │   ├── Login.module.css
│   │   ├── Metrics.tsx         # Metrics and charts page (ESG Reporting)
│   │   ├── Metrics.module.css
│   │   ├── MyTasks.tsx         # Task management page
│   │   ├── MyTasks.module.css  # Shared styles for Main section pages
│   │   ├── RulesStudio.tsx     # Rules management page (Integrity Culture)
│   │   ├── RulesStudio.module.css
│   │   ├── ThirdParties.tsx    # Third-party risk management page
│   │   └── Workflows.tsx       # Workflow management page
│   ├── service/
│   │   ├── auth.tsx            # Authentication API service
│   │   ├── case.tsx            # Case API service
│   │   ├── dashboard.tsx       # Dashboard API service
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

### Governance Dashboard (Home)

-   Real-time data fetching with loading states
-   Responsive grid layout with Chart.js visualizations
-   KPI cards with dynamic data and trend indicators
-   AI-powered insights with customizable focus areas
-   Color-coded risk levels (High, Medium, Low)
-   Line charts for trends and bar charts for activities
-   Full dark/light theme support with smooth transitions

### Navigation Structure

-   **Main Section**: Core governance and operational features
    -   Dashboard, My Tasks, Workflows, Compliance, Third Parties, Incidents
-   **Integrity & ESG Section**: Specialized integrity and sustainability features
    -   Policies & Training, Integrity Culture, ESG Reporting
-   Grouped navigation with section headers
-   Collapsible sidebar with mobile-responsive design

### Integrity Culture (Rules Studio)

-   Uses Ant Design Table with sorting and pagination
-   Modal-based form for create/edit operations
-   Real-time JSON preview updates as form values change
-   Delete confirmation with Popconfirm component

### Incidents (Case Dashboard)

-   Server-side pagination (controlled by API)
-   Client-side search filtering on vendor/case ID
-   Drawer component for detailed case view
-   Action buttons conditionally disabled based on current status

### ESG Reporting (Metrics)

-   Responsive grid layout with Chart.js visualizations
-   Bar chart for categorical data (exceptions by type)
-   Line chart with area fill for trend data (prevented loss)
-   Summary statistics cards

### Policies & Training (Data Connector)

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

### Main Section Pages

-   **My Tasks**: Centralized approval and governance action management
-   **Workflows**: Standardized approval process design and management
-   **Compliance**: Regulatory tracking and evidence management
-   **Third Parties**: Vendor risk scoring and contract monitoring
-   All Main section pages feature:
    -   Clean, card-based layout with consistent styling
    -   Full light/dark theme support
    -   Responsive design for all screen sizes
    -   Page header with descriptive titles
    -   Feature lists with key capabilities

### Layout

-   Collapsible sidebar with grouped navigation menu (Main & Integrity/ESG sections)
-   Sticky header with theme toggle and user menu
-   Responsive design using Ant Design's Layout components
-   Mobile-friendly hamburger menu
-   Dynamic page title based on current route

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
-   **Centralized Mock Data**: All mock data stored in `src/mocks/data.ts` for easy management
-   **Context API**: Used for global state (auth, theme)
-   **Protected Routes**: Authentication guard for secure pages
-   **Mock Service Worker**: Seamless API mocking for development with MSW handlers
-   **CSS Modules**: Scoped styling to prevent conflicts
-   **TypeScript Strict Mode**: Enhanced type safety
-   **Grouped Navigation**: Logical separation of Main and Integrity & ESG features
-   **Dark Mode Support**: Full light/dark theme support across all pages
-   **Chart.js Integration**: Interactive data visualizations for trends and analytics

## 📝 Key Implementation Details

### Governance Dashboard

-   Single API call fetches all dashboard data
-   Real-time loading states with spinner
-   Dynamic chart data rendering with Chart.js
-   Color-coded risk indicators for quick assessment
-   AI insights with formatted text and emphasis
-   Responsive grid system that adapts to screen size
-   Left section (2/3 width): KPIs, incidents, tasks, and charts
-   Right section (1/3 width): AI insights and trend visualizations

### Data Management

-   All mock data centralized in `src/mocks/data.ts`
-   MSW handlers in `src/mocks/handlers.ts` intercept API calls
-   Service layer (`src/service/`) provides clean API interface
-   TypeScript interfaces ensure type safety across data flow

### File Upload

-   Files are validated on the client side before upload
-   Manual upload control for better UX (user confirms before uploading)
-   Progress tracking for all uploads
-   Batch upload support with individual success/error handling

### Authentication

-   Context-based authentication state management
-   Protected routes redirect to login if unauthenticated
-   Session persists in memory (no token storage in mock mode)

### Theme Support

-   Light/Dark mode toggle in header
-   Theme state persists in localStorage
-   Smooth color transitions (0.3s ease)
-   All pages support both themes with proper contrast
-   Uses `data-theme` attribute on root element
-   Ant Design ConfigProvider integration

### Responsive Design

-   Mobile-first approach
-   Breakpoints: xs (< 576px), sm (≥ 576px), md (≥ 768px), lg (≥ 992px)
-   Adaptive navigation (hamburger menu on mobile)
-   Table columns adapt based on screen size
-   Dashboard grid adjusts from 2-column to single-column on mobile

## 🤝 Contributing

Contributions are welcome! Please ensure:

-   Code follows existing patterns and conventions
-   TypeScript types are properly defined
-   Components are responsive
-   No console errors or warnings

## 🎯 Use Cases

This IntegrityOS dashboard is designed for:

-   **Executives**: High-level governance overview with AI-powered insights
-   **Compliance Officers**: Centralized tracking of regulatory requirements
-   **Risk Managers**: Third-party risk assessment and incident management
-   **Operations Teams**: Workflow approval standardization and task management
-   **ESG Teams**: Sustainability reporting and integrity culture monitoring

## 📄 License

This project is part of the Sustainawise MVP.

---

Built with ❤️ using React, TypeScript, and Ant Design for Governance, Integrity, and ESG Management
