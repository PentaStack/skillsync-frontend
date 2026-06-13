# SkillSync Frontend

Frontend web application for the SkillSync Academic Mentorship & Code Review Platform.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** (with `@tailwindcss/vite`)
- **Tailwind CSS v4** (CSS-first config via `@config` + `tailwind.config.ts`)
- **TanStack Query** (server-state management)
- **Zustand** (client-state: auth, theme, i18n)
- **React Router v7** (role-based routing with lazy loading)
- **Axios** (API client with JWT interceptors)
- **React Hook Form** + **Zod** (form validation)
- **react-hot-toast** (notifications)
- **Lucide React** (icons)
- **clsx** + **tailwind-merge** (className utilities)

## Features

- Modern responsive UI built with Tailwind CSS (Academic Ember theme)
- Role-based UI (Admin / Mentor / Student)
- Authentication flow with JWT (login/logout/session persistence)
- Mentor browsing with debounced search and pagination
- Session booking interface (45-minute slots)
- Dark/Light theme toggle
- i18n with Arabic RTL support
- Optimized server-state handling using TanStack Query
- Modular, feature-based architecture

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Install Dependencies

```bash
npm install
```

### Environment Setup

Copy the example env file:

```bash
cp .env.example .env
```

| Variable            | Description             |
| ------------------- | ----------------------- |
| `VITE_API_BASE_URL` | Backend API base URL    |
| `VITE_APP_NAME`     | Application name        |

### Run Locally

```bash
npm run dev
```

The app will run at:

```
http://localhost:5173
```

## 📁 Project Structure

```text
src/
├── assets/                       # Static assets (images, icons, fonts)
│
├── components/                   # Shared reusable UI components
│   ├── ui/                       # Base primitives (Button, Input, Modal, Skeleton, Badge, Card, etc.)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Skeleton.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── EmptyState.tsx
│   │   ├── BackToTop.tsx
│   │   └── index.ts
│   ├── layout/                   # App shell (Navbar, Sidebar, Footer, PageContainer)
│   │   ├── RootLayout.tsx
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   ├── PageContainer.tsx
│   │   └── index.ts
│   └── feedback/                 # Error boundary, loading fallback
│       ├── ErrorBoundary.tsx
│       ├── LoadingFallback.tsx
│       └── index.ts
│
├── features/                     # Feature-based vertical slices
│   ├── auth/                     # Login, register, profile
│   │   ├── api/auth.api.ts
│   │   ├── hooks/useAuth.ts
│   │   ├── pages/ (LoginPage, RegisterPage, ProfilePage)
│   │   ├── types.ts
│   │   └── index.ts
│   ├── mentor/                   # Mentor discovery, profiles, dashboard
│   │   ├── api/mentor.api.ts
│   │   ├── hooks/useMentors.ts
│   │   ├── pages/ (MentorDiscoveryPage, MentorProfilePage, MentorDashboardPage)
│   │   ├── types.ts
│   │   └── index.ts
│   ├── student/                  # Student dashboard & sessions
│   │   ├── api/student.api.ts
│   │   ├── hooks/useStudentSessions.ts
│   │   ├── pages/ (StudentDashboardPage)
│   │   ├── types.ts
│   │   └── index.ts
│   ├── session/                  # Booking & session management
│   │   ├── api/session.api.ts
│   │   ├── hooks/useSessions.ts
│   │   ├── types.ts
│   │   └── index.ts
│   └── admin/                    # Admin dashboard & moderation
│       ├── api/admin.api.ts
│       ├── hooks/useAdmin.ts
│       ├── pages/ (AdminDashboardPage)
│       ├── types.ts
│       └── index.ts
│
├── hooks/                        # Global custom hooks
│   ├── useDebounce.ts
│   ├── useDocumentTitle.ts
│   └── index.ts
│
├── i18n/                         # Internationalization
│   ├── i18n.ts                   # Zustand-based i18n (t(), setLocale(), RTL)
│   └── locales/
│       ├── en.json
│       └── ar.json
│
├── lib/                          # Shared utilities & configuration
│   ├── api-client.ts             # Axios instance + JWT interceptors
│   ├── query-client.ts           # TanStack QueryClient config
│   ├── constants.ts              # Roles, session config, storage keys
│   ├── types.ts                  # ApiError, PaginatedResponse, User
│   └── utils.ts                  # cn() helper, formatters
│
├── pages/                        # Standalone pages (404)
│   └── NotFoundPage.tsx
│
├── providers/                    # React context providers
│   ├── AppProviders.tsx          # QueryClient + Toast composition
│   └── index.ts
│
├── routes/                       # Routing configuration
│   ├── router.tsx                # createBrowserRouter + lazy routes
│   ├── ProtectedRoute.tsx        # Role-based auth guard
│   └── index.ts
│
├── stores/                       # Zustand stores
│   ├── auth.store.ts             # User, token, login/logout
│   ├── theme.store.ts            # Dark/light mode
│   └── index.ts
│
├── styles/
│   └── fonts.css                 # Google Fonts imports
│
├── App.tsx                       # Root component (RouterProvider + ErrorBoundary)
├── index.css                     # Tailwind v4 entry + global resets
├── main.tsx                      # Entry point (AppProviders > App)
└── vite-env.d.ts                 # Env type augmentation
```

## Design System

The project uses the **Academic Ember** design system from `DESIGN.md`. Key tokens:

| Token                | Value       | Usage                               |
| -------------------- | ----------- | ----------------------------------- |
| Canvas               | `#0b0a09`   | Primary background                  |
| Surface              | `#161412`   | Cards, navbar, elevated elements    |
| Ember Orange         | `#ff5e3a`   | Primary CTA, active states, accents |
| Text Primary         | `#f9f8f7`   | Headlines, high-emphasis text       |
| Text Secondary       | `#a3a19f`   | Body text, secondary info           |
| Border               | `#2a2826`   | Card borders, dividers              |
| Display Font         | Playfair Display (italic) | Headlines             |
| Body Font            | Hanken Grotesk | UI text, body copy               |
| Code Font            | Geist       | Code snippets, diffs                |

## API Integration

All API calls go through `src/lib/api-client.ts` which auto-attaches JWT tokens.
Feature-specific API functions live in `src/features/*/api/*.api.ts`.
TanStack Query hooks in `src/features/*/hooks/` wrap API calls with caching.

## Routes

| Path                | Page                   | Access        |
| ------------------- | ---------------------- | ------------- |
| `/`                 | Mentor Discovery       | Public        |
| `/login`            | Login                  | Public        |
| `/register`         | Register               | Public        |
| `/mentors/:id`      | Mentor Profile         | Public        |
| `/dashboard`        | Student Dashboard      | Student only  |
| `/mentor/dashboard` | Mentor Dashboard       | Mentor only   |
| `/admin`            | Admin Dashboard        | Admin only    |
| `/profile`          | Profile Customization  | Authenticated |
| `*`                 | 404 Not Found          | Catch-all     |

## Design Principles

- Feature-based vertical slice architecture
- Separation of API, UI, and business logic
- Strong TypeScript typing across the app
- Scalable query management using TanStack Query
- Zustand for minimal, ergonomic client state
- Reusable and composable UI components
- i18n-ready with RTL support
