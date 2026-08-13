# Project Structure

## Overview

This is a Next.js-based placement platform with role-based access control for students, recruiters, and admins.

## Root Level Files

```
├── AGENTS.md                    # Agent configuration and rules
├── CLAUDE.md                    # Claude AI instructions
├── README.md                    # Project documentation
├── auth.ts                      # Authentication configuration
├── eslint.config.mjs            # ESLint configuration
├── next-env.d.ts               # Next.js type definitions
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies and scripts
├── postcss.config.mjs          # PostCSS configuration
└── tsconfig.json               # TypeScript configuration
```

## App Directory (`/app`) - Next.js Pages & API Routes

### Pages

- **`layout.tsx`** - Root layout component
- **`globals.css`** - Global styles
- **`page.tsx`** - Home page

### Auth Routes (`/app/(auth)`)

Protected authentication pages with layout:

```
(auth)/
├── layout.tsx                  # Auth pages layout
├── login/
│   └── page.tsx               # Login page
└── signup/
    └── page.tsx               # Signup page
```

### Admin Routes (`/app/admin`)

Admin dashboard with protected routes:

```
admin/
├── dashboard/
│   └── page.tsx               # Admin dashboard
├── jobs/
│   ├── page.tsx               # Jobs management
│   └── [id]/                  # Job details page
└── users/
    ├── page.tsx               # Users management
    └── [id]/                  # User details page
```

### Recruiter Routes (`/app/recruiter`)

Recruiter-specific features:

```
recruiter/
├── applications/
│   ├── page.tsx               # Applications list
│   └── [id]/                  # Application details
├── dashboard/
│   └── page.tsx               # Recruiter dashboard
├── jobs/
│   ├── page.tsx               # Jobs list
│   └── create/
│       └── page.tsx           # Create job posting
```

### Student Routes (`/app/student`)

Student portal with multiple features:

```
student/
├── layout.tsx                 # Student layout wrapper
├── dashboard/
│   └── page.tsx              # Student dashboard
├── applications/
│   └── page.tsx              # My applications
├── jobs/
│   ├── page.tsx              # Browse jobs
│   └── [id]/                 # Job details
├── profile/
│   └── page.tsx              # Student profile
├── resume/
│   └── page.tsx              # Resume management
└── saved-jobs/
    └── page.tsx              # Saved jobs list
```

### API Routes (`/app/api`)

```
api/
├── admin/
│   ├── jobs/                 # Admin job endpoints
│   └── users/                # Admin user endpoints
├── applications/
│   ├── route.ts              # Applications CRUD
│   └── [id]/                 # Application details
├── auth/
│   ├── [...nextauth]/        # NextAuth.js routes
│   └── signup/               # Signup endpoint
├── jobs/
│   └── route.ts              # Jobs CRUD
├── resume/
│   ├── route.ts              # Resume upload
│   └── [studentId]/          # Student resume
├── saved-jobs/
│   └── route.ts              # Saved jobs CRUD
└── student/
    ├── profile/              # Student profile endpoints
    └── resume/               # Resume endpoints
```

### Other Pages

- **`unauthorized/page.tsx`** - Unauthorized access page

## Components Directory (`/components`)

### Admin Components (`/components/admin`)

- **`AdminStatsCard.tsx`** - Stats card display
- **`AdminStatsSection.tsx`** - Stats section container
- **`DeleteJobButton.tsx`** - Job deletion action
- **`JobsTable.tsx`** - Jobs table display
- **`JobStatusButton.tsx`** - Job status toggle
- **`RecentJobs.tsx`** - Recent jobs widget
- **`RecentUsers.tsx`** - Recent users widget
- **`UsersTable.tsx`** - Users table display
- **`UserStatusButton.tsx`** - User status toggle

### Recruiter Components (`/components/recruiter`)

- **`RecentRecruiterApplications.tsx`** - Applications widget
- **`RecruiterRecentJobs.tsx`** - Recent jobs widget
- **`RecruiterStatsCard.tsx`** - Stats card
- **`RecruiterStatsSection.tsx`** - Stats section
- **`applications/`**
  - **`ApplicationStatusSelect.tsx`** - Status selector

### Student Components (`/components/student`)

- **`DashboardHeader.tsx`** - Dashboard header
- **`LatestJobs.tsx`** - Latest jobs widget
- **`RecentApplications.tsx`** - Applications widget
- **`StatsCard.tsx`** - Stats display
- **`StatsSection.tsx`** - Stats section

#### Jobs Subcomponents (`/components/student/jobs`)

- **`ApplyJobButton.tsx`** - Apply to job action
- **`JobCard.tsx`** - Job card display
- **`JobFilters.tsx`** - Job filtering UI
- **`JobList.tsx`** - Jobs list container
- **`SaveJobButton.tsx`** - Save job action
- **`SearchBar.tsx`** - Search functionality

#### Layout Components (`/components/student/layout`)

- **`Navbar.tsx`** - Navigation bar
- **`Sidebar.tsx`** - Sidebar navigation
- **`StudentLayout.tsx`** - Student layout wrapper

#### Profile Components (`/components/student/profile`)

- **`ProfileForm.tsx`** - Profile editing form

#### Resume Components (`/components/student/resume`)

- **`ResumeUpload.tsx`** - Resume upload component

### Layout Components (`/components/layout`)

- **`LogoutButton.tsx`** - Logout action

## Library (`/lib`)

### Core Files

- **`auth.ts`** - Authentication utilities
- **`auth-helpers.ts`** - Auth helper functions
- **`api-response.ts`** - API response utilities
- **`constants.ts`** - Application constants
- **`env.ts`** - Environment variables
- **`prisma.ts`** - Prisma client

### Validations (`/lib/validations`)

- **`job.ts`** - Job validation schemas
- **`user.ts`** - User validation schemas

## Database (`/prisma`)

- **`schema.prisma`** - Database schema definition
- **`migrations/`** - Database migrations
  - **`migration_lock.toml`** - Migration lock file
  - **`20260630091027_initial_schema/`** - Initial schema
  - **`20260709103320_add_profile_fields/`** - Profile fields
  - **`20260716081625_add_salary_to_job/`** - Salary field
  - **`20260716154742_simplify_job_model/`** - Job model simplification

## Types (`/types`)

- **`next-auth.d.ts`** - NextAuth type definitions

## Public Assets (`/public`)

Static files and assets directory

## Docs (`/docs`)

Documentation files

---

## Key Features

### Authentication

- NextAuth.js integration
- Role-based access control (Student, Recruiter, Admin)
- Signup and login flows

### Student Features

- Browse and search jobs
- Apply to jobs
- Save favorite jobs
- Manage profile and resume
- Track applications

### Recruiter Features

- Post job listings
- Manage job postings
- Review applications
- Dashboard with statistics

### Admin Features

- Manage all users
- Manage all job postings
- View statistics and reports
- User and job moderation

---

## Technology Stack

- **Framework**: Next.js 14+
- **Language**: TypeScript
- **Database**: Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: CSS Modules + PostCSS
- **Linting**: ESLint

---

## Running the Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The application will be available at `http://localhost:3000`
