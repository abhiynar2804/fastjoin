# Project Structure

## Overview

FastJoin is a Next.js App Router placement platform with role-based access for students, recruiters, and administrators. The current implementation includes authentication, job management, applications, saved jobs, student profiles, resume uploads, dashboards, and admin moderation.

## Root Files and Configuration

```
├── AGENTS.md                    # Workspace agent rules
├── CLAUDE.md                   # References AGENTS.md
├── README.md                   # Project overview and setup
├── PROJECT_STRUCTURE.md        # This document
├── auth.ts                    # Auth.js configuration
├── eslint.config.mjs          # ESLint 9 configuration
├── next-env.d.ts              # Next.js TypeScript definitions
├── next.config.ts             # Next.js configuration
├── package.json               # Scripts and dependencies
├── package-lock.json          # Locked dependency versions
├── postcss.config.mjs         # Tailwind/PostCSS configuration
├── tsconfig.json              # TypeScript configuration
├── app/                       # App Router pages and API routes
├── components/                # Reusable UI components
├── lib/                       # Shared server and validation utilities
├── prisma/                    # Prisma schema and migrations
├── public/                    # Static assets
└── types/                     # Application type declarations
```

## Application Routes (`/app`)

### Shared and Authentication Pages

- `layout.tsx` - Root layout and providers
- `page.tsx` - Public home page
- `globals.css` - Tailwind CSS v4 theme and global styles
- `(auth)/layout.tsx` - Authentication layout
- `(auth)/login/page.tsx` - Login page
- `(auth)/signup/page.tsx` - Signup page
- `unauthorized/page.tsx` - Unauthorized access page

### Student Pages (`/app/student`)

- `layout.tsx` - Student route layout and access protection
- `dashboard/page.tsx` - Student dashboard
- `jobs/page.tsx` - Browse and filter jobs
- `jobs/[id]/page.tsx` - Job details and application actions
- `applications/page.tsx` - Student applications
- `saved-jobs/page.tsx` - Saved jobs
- `profile/page.tsx` - Student profile
- `resume/page.tsx` - Resume management

### Recruiter Pages (`/app/recruiter`)

- `layout.tsx` - Recruiter route layout and access protection
- `dashboard/page.tsx` - Recruiter dashboard
- `jobs/page.tsx` - Recruiter job listings
- `jobs/create/page.tsx` - Create a job posting
- `jobs/create/CreateJobForm.tsx` - Job creation form
- `applications/page.tsx` - Applications for recruiter jobs
- `applications/[id]/page.tsx` - Application details and status management

### Admin Pages (`/app/admin`)

- `layout.tsx` - Admin route layout and access protection
- `dashboard/page.tsx` - Admin dashboard and platform statistics
- `jobs/page.tsx` - Manage all jobs
- `jobs/[id]/page.tsx` - Job details and moderation
- `users/page.tsx` - Manage users
- `users/[id]/page.tsx` - User details and moderation

## API Routes (`/app/api`)

- `auth/[...nextauth]/route.ts` - Auth.js handlers
- `auth/signup/route.ts` - User registration
- `jobs/route.ts` - Job listing and recruiter job creation
- `applications/route.ts` - Student application creation and application lists
- `applications/[id]/route.ts` - Application detail and status operations
- `saved-jobs/route.ts` - Save, list, and remove saved jobs
- `resume/route.ts` - Resume upload
- `resume/[studentId]/route.ts` - Read a student's resume
- `student/profile/route.ts` - Read and update student profiles
- `student/resume/route.ts` - Student resume operations
- `admin/jobs/route.ts` - Admin job management
- `admin/jobs/[id]/route.ts` - Admin job detail operations
- `admin/jobs/[id]/status/route.ts` - Open or close a job
- `admin/users/route.ts` - Admin user listing and management
- `admin/users/[id]/route.ts` - Admin user detail operations
- `admin/users/[id]/status/route.ts` - Activate or deactivate a user

## Components (`/components`)

### Student Components

- Dashboard: `DashboardHeader`, `LatestJobs`, `RecentApplications`, `StatsCard`, `StatsSection`
- Jobs: `ApplyJobButton`, `JobCard`, `JobFilters`, `JobList`, `SaveJobButton`, `SearchBar`
- Profile: `ProfileForm`
- Resume: `ResumeUpload`
- Layout: `Navbar`, `Sidebar`, `StudentLayout`, `Footer`

### Recruiter Components

- Dashboard: `RecruiterRecentJobs`, `RecentRecruiterApplications`, `RecruiterStatsCard`, `RecruiterStatsSection`
- Applications: `ApplicationStatusSelect`
- Layout: `RecruiterLayout`, `RecruiterNavbar`, `RecruiterSidebar`, `RecruiterFooter`

### Admin Components

- Statistics: `AdminStatsCard`, `AdminStatsSection`
- Jobs: `JobsTable`, `RecentJobs`, `DeleteJobButton`, `JobStatusButton`
- Users: `UsersTable`, `RecentUsers`, `UserStatusButton`
- Layout: `AdminLayout`, `AdminNavbar`, `AdminSidebar`, `AdminFooter`

### Shared UI

- `components/layout/LogoutButton.tsx` - Shared logout action
- `components/ui/theme-provider.tsx` - Theme context provider
- `components/ui/ThemeToggle.tsx` - Light/dark theme toggle

## Shared Libraries (`/lib`)

- `auth.ts` - Authentication utilities
- `auth-helpers.ts` - Session and role helpers
- `api-response.ts` - Consistent API response helpers
- `constants.ts` - Shared application constants
- `env.ts` - Environment variable access
- `prisma.ts` - Prisma client singleton
- `validations/job.ts` - Job validation schemas
- `validations/user.ts` - User validation schemas

## Database (`/prisma`)

`schema.prisma` uses PostgreSQL and defines five enums and five models:

- Enums: `Role`, `JobType`, `WorkMode`, `JobStatus`, `ApplicationStatus`
- Models: `User`, `Job`, `Application`, `Resume`, `SavedJob`
- Relationships: users own jobs, applications, saved jobs, and an optional resume; jobs have applications and saved-job records.

Migration history:

- `20260630091027_initial_schema` - Initial database schema
- `20260709103320_add_profile_fields` - Student profile fields
- `20260716081625_add_salary_to_job` - Salary on jobs
- `20260716154742_simplify_job_model` - Simplified the job model and denormalized company/job fields

## Types and Assets

- `types/next-auth.d.ts` - NextAuth session and user type extensions
- `public/` - Static assets
- `app/favicon.ico` - Application favicon
- `docs/` - Project documentation

## Implemented Capabilities

- Auth.js authentication with student, recruiter, and admin roles
- Protected route layouts and unauthorized access handling
- Student job search, filtering, applications, saved jobs, profiles, and resumes
- Recruiter job creation and management, applicant review, and application status updates
- Admin job and user management, status moderation, and dashboard statistics
- PostgreSQL persistence through Prisma
- Light and dark themes through `next-themes`

## Technology Stack

- **Framework:** Next.js `16.2.9` with the App Router
- **Language:** TypeScript `5`
- **UI:** React `19.2.7`, Tailwind CSS `4`, Lucide React
- **Authentication:** Auth.js / `next-auth` `5.0.0-beta.31`
- **Database:** PostgreSQL with Prisma `6.19.3`
- **Validation:** Zod `4`
- **File storage:** Vercel Blob
- **Security:** bcrypt
- **Theming:** next-themes
- **Tooling:** ESLint `9`, Prettier, PostCSS

## Development Commands

```bash
npm install
npm run dev
npm run lint
npm run build
npm start
```

The development server runs at `http://localhost:3000` by default. Configure `DATABASE_URL` and `AUTH_SECRET` in `.env` before using authenticated or database-backed features.
