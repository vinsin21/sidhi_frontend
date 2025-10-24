## Job Aggregator Frontend

A small Vite + React + TypeScript frontend for a job-listing/bookmarking app. This repository contains a compact UI built with React, TypeScript and Tailwind CSS. It provides search and filter functionality, job detail views, authentication context, and bookmarking via service modules.

This README was prepared for quick reference during an interview — it highlights the project's structure, how to run it locally on Windows PowerShell, and where to look in the codebase for key behaviors.

## Highlights / Key Features

- Vite + React + TypeScript starter with TailwindCSS
- Client-side routing using `react-router-dom`
- Simple authentication context in `src/context/AuthContext.tsx`
- Services for API calls using `axios` in `src/services/`
- Components for search, filtering, job cards and job details

## Tech stack

- React 18 + TypeScript
- Vite (dev server + build)
- Tailwind CSS for styling
- ESLint for linting
- Axios for HTTP requests

## Quick setup (Windows PowerShell)

1. Install Node.js (14+ recommended; project is tested with modern Node versions). Then, in PowerShell run:

```powershell
cd path\to\project\root
npm install
```

2. Start dev server:

```powershell
npm run dev
```

3. Build for production:

```powershell
npm run build
```

4. Preview production build locally:

```powershell
npm run preview
```

5. Lint the repo:

```powershell
npm run lint
```

Notes: this project uses the scripts from `package.json`: `dev`, `build`, `lint`, and `preview`.

## Project structure (important files)

- `src/main.tsx` — application bootstrap
- `src/App.tsx` — app routes and layout
- `src/index.css` — Tailwind + base styles

Components

- `src/components/Header.tsx` — top navigation and auth controls
- `src/components/SearchBar.tsx` — search input and query handling
- `src/components/FilterPanel.tsx` — filtering options and UI
- `src/components/JobCard.tsx` — job listing entry UI and bookmark button
- `src/components/JobDetails.tsx` — detailed job view

Context

- `src/context/AuthContext.tsx` — authentication context/provider (login state, tokens, helper methods)

Pages

- `src/pages/AuthPage.tsx` — login/register UI
- `src/pages/HomePage.tsx` — main listing and search page

Services

- `src/services/authService.ts` — auth API calls
- `src/services/jobService.ts` — fetch job listings / details
- `src/services/bookmarkService.ts` — bookmarking API calls

Types

- `src/types/index.ts` — TypeScript types used across the app (Job, User, API shapes)

## Data flow / where to look during interview

- App load: `src/main.tsx` -> `App.tsx` sets up routes and context providers.
- Authentication: `AuthContext` maintains current user and exposes methods; the `authService` contains the HTTP calls.
- Fetching jobs: `jobService` provides functions to call the backend. Search and filters are managed by `SearchBar` and `FilterPanel` which lift state up (or use context) to request data.
- Bookmarking: `JobCard` uses `bookmarkService` to toggle bookmarks.

When asked about editing API endpoints or base URL: open `src/services/*` — these modules typically hold the `axios` instance or base URL.

## Suggestions for interview talking points

- Explain component structure and why responsibilities are split (presentation vs service logic).
- Point out the `AuthContext` contract: inputs (login credentials), outputs (user, token, and auth helpers), and error modes (failed login, expired token).
- Mention the use of TypeScript types in `src/types/index.ts` to reduce runtime bugs and clarify data shapes.
- Describe how you would add tests (unit tests for pure utilities, component tests with React Testing Library, and integration tests for services with mocked axios).

## Tests

No test runner is configured in this project by default. Recommended additions:

- add `vitest` or `jest` for unit tests
- add `@testing-library/react` for component tests

## Deployment

- Build with `npm run build` and deploy the `dist/` output to any static host (Netlify, Vercel, GitHub Pages with appropriate config, or a static file server).

## How to extend

- Add environment-based configuration for API base URL (e.g., `import.meta.env.VITE_API_URL`).
- Add error boundary components for user-friendly error UI.
- Add tests and CI (GitHub Actions) that run `npm ci && npm run lint && npm run build`.

## Contact / Notes for the interviewer

If you want to demo: run `npm run dev` and open the browser at the address Vite prints (usually `http://localhost:5173`).

If you need me to highlight specific files or add quick demo content (seed data, mock server), tell me which part you want to showcase and I can add it quickly.

---

Good luck with the interview! This README is intentionally concise so you can quickly point to architecture, key files, and how to run the app locally.
