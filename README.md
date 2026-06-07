# Orbital

Trial project. An interactive 3D globe that plots live satellites; click one to see its current position.

## Tech

- Vite, React, TypeScript
- Tailwind CSS (shadcn-style components)
- Three.js / react-three-fiber
- TanStack Query, React Router, Zustand
- React Hook Form + Zod
- satellite.js, satellite data from CelesTrak

## Running it

```
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173). Needs Node 18+.

Satellite data loads through a Vite dev proxy, so run it with `npm run dev`.
