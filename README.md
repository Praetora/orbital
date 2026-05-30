# 🛰️ Orbital — Satellite Tracker

An interactive 3D Earth with live, clickable satellites. Built as a showcase of a modern
React + TypeScript architecture. This repo is intentionally a **working skeleton**: the
structure and data flow are complete and runnable, with a few features marked as `TODO`
for the next iteration.

Live satellite position data comes from the public **wheretheiss.at** REST API (no key required).

---

## Quick start

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build
npm run lint     # ESLint
npm run format   # Prettier
```

Requires Node 18+.

---

## What works right now

- Rotating 3D globe (react-three-fiber) you can orbit and zoom
- Live ISS position fetched on a 5-second poll and shown as a clickable marker
- Sidebar list of satellites with loading / error / empty states
- Click a satellite → routes to `/satellite/:id` with live altitude, velocity, lat/long
- "Track by NORAD id" form with Zod validation
- Tracked list persisted to `localStorage` (survives refresh)
- Light/dark theme toggle
- Strict TypeScript, ESLint + Prettier, clean component boundaries

## Marked TODO (next iteration)

- Swap the flat-colour sphere for a textured Earth + atmosphere glow
- Use the CelesTrak catalogue (30k+ objects) + `satellite.js` to plot many satellites
- Promote the localStorage favourites to a `useMutation` flow with cache invalidation
- Mobile sidebar → drawer

---

## Architecture

The codebase is organised by **responsibility**, not by file type, so each concern is easy to find.

```
src/
├── main.tsx            # Composition root: QueryClient, Router, ThemeProvider
├── App.tsx             # Route table
├── components/
│   ├── layout/         # AppLayout, Header, Sidebar  (app shell)
│   └── ui/             # Button, Card  (shadcn-style primitives)
├── features/
│   └── satellites/     # Earth, SatelliteMarker, AddTrackedForm  (domain UI)
├── routes/             # HomePage, SatelliteDetailPage, AboutPage  (pages)
├── hooks/              # useSatellites, useSatellitePosition  (TanStack Query)
├── lib/                # api.ts (REST client), geo.ts, utils.ts
├── store/              # useTrackedStore.ts  (Zustand + persist)
├── providers/          # ThemeProvider.tsx  (React Context)
└── types/              # satellite.ts  (API response types)
```

**Data flow:** `lib/api.ts` is the only place that talks HTTP → typed `hooks/` wrap each
call in TanStack Query (caching + polling + loading/error state) → components consume the
hooks. Domain state (tracked satellites) lives in Zustand; global UI state (theme) lives in
Context. This separation is the point of the project.

---

## Technology → where it lives

| Technology | Where |
|---|---|
| Vite / npm / Node | tooling + scripts |
| TypeScript (strict) | throughout; API types in `types/` |
| React (components, props, state, events) | everywhere |
| React Hooks (incl. custom) | `hooks/useSatellites.ts`, `providers/ThemeProvider.tsx` |
| React Router (incl. `:id` param) | `App.tsx`, `SatelliteDetailPage.tsx` |
| Tailwind + dark mode | all styling, `ThemeProvider` |
| TanStack Query | `hooks/`, polling in `useSatellitePosition` |
| REST / fetch / loading-error | `lib/api.ts` + every query |
| React Hook Form + Zod | `features/satellites/AddTrackedForm.tsx` |
| Zustand (state mgmt) | `store/useTrackedStore.ts` |
| Context (state mgmt) | `providers/ThemeProvider.tsx` |
| ESLint + Prettier | `eslint.config.js`, `.prettierrc` |
| Three.js (bonus) | `features/satellites/Earth.tsx` |
```
```
