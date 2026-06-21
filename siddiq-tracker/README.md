# Siddiq Personal Development Tracker

A personal tracker to help build the qualities of a *Siddiq* — truthfulness, trustworthiness (amanah),
excellent character, family responsibility, spiritual consistency, and self-discipline.

## Stack
Vite + React 18 + Redux Toolkit + React Router + Tailwind CSS + Recharts.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Data storage

This is a frontend-only app (no backend server). Per the spec, data is modeled exactly like
`src/data/users.json` and `src/data/tracker-data.json`, but since a browser app cannot write to
files on disk, the actual persistence layer is `src/utils/storage.js`, which mirrors that same
JSON shape into `localStorage`. This keeps the data model identical to real files, so the storage
module is a drop-in spot to later swap in real file I/O or a backend API — nothing else in the
app needs to change.

Data lives entirely in your browser. Clearing site data/localStorage will erase it — use
**Profile → Export Data (JSON Backup)** regularly.

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
