# Siddiq Personal Development Tracker

A personal tracker to help build the qualities of a *Siddiq* — truthfulness, trustworthiness (amanah),
excellent character, family responsibility, spiritual consistency, and self-discipline.

## Stack
Vite + React 18 + Redux Toolkit + React Router + Tailwind CSS + Recharts.

## Getting started

This project's `dev` script runs `vercel dev`, which serves both the Vite frontend and the
`api/` serverless functions together (Vite alone can't run the API routes).

```bash
npm install
npm i -g vercel        # if you don't already have the Vercel CLI
vercel link            # link this folder to a Vercel project (one-time)
vercel env pull .env.local   # pulls KV_REST_API_URL / KV_REST_API_TOKEN, etc.
npm run dev
```

Then open the printed local URL (usually http://localhost:3000).

To build for production:

```bash
npm run build
npm run preview
```

## Data storage

Users and tracker records are persisted server-side in a **Vercel KV** (Upstash Redis) database,
behind two serverless functions: `api/users.js` and `api/tracker.js`. The frontend talks to them
over `fetch` via `src/utils/storage.js`, so the rest of the app (Redux slices, pages) never touches
storage directly.

To enable this on Vercel:
1. In your Vercel project dashboard, open **Storage** → add a KV (Upstash for Redis) database and
   connect it to this project. Vercel injects `KV_REST_API_URL` / `KV_REST_API_TOKEN` automatically.
2. Locally, run `vercel link` then `vercel env pull .env.local` once to get the same credentials.
3. `src/data/users.json` and `src/data/tracker-data.json` are only used as the initial seed the
   first time each API route runs (before any data exists in KV) — after that, KV is the source of
   truth and those files are no longer written to.

The current session (which user is logged into this browser) is still kept in `localStorage`,
since it's just a per-device pointer, not user data — clearing it just logs you out locally,
it doesn't delete any account or tracker data.

## Features implemented

- Auth: signup, login, logout, protected routes, change password — all validated client-side.
- Daily Tracker: 48 habits across 7 categories (Spiritual, Truthfulness, Amanah, Character, Family,
  Social Good, Self Discipline), color-coded completion, notes, date/range filtering, edit/delete,
  auto-calculated daily score.
- Dashboard: overall Siddiq score, streaks, category scores, top 5 strongest/weakest habits,
  gauge/pie/area/bar charts.
- Weekly & Monthly Reports: auto-aggregated from daily records, with best/worst habit, trend and
  category-comparison charts, selectable by week/month.
- Profile: account info, streak stats, password change, JSON backup export, CSV export, print view.
- Dark/light theme toggle (persisted), fully responsive layout with collapsible mobile sidebar.

## Project structure

```
src/
├── app/store.js                Redux store
├── features/auth|tracker|reports|ui   Redux slices
├── pages/                      Route-level pages
├── components/charts|dashboard|tracker|common
├── data/users.json, tracker-data.json   Seed/shape reference for storage
├── routes/ProtectedRoute.jsx
└── utils/habits.js, scoring.js, storage.js
```

## Notes on scope

PDF/Excel export libraries (jspdf, papaparse) are included in package.json for the "Export to PDF /
Excel" requirement; the Profile page currently ships working JSON backup, CSV export, and a browser
print view out of the box. Wiring jsPDF/Excel templates is a natural next step and the dependency is
already in place for it.
