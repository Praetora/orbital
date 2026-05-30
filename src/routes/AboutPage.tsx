const stack = [
  'Vite + React + TypeScript',
  'Tailwind CSS with class-based dark mode',
  'React Router — /, /satellite/:id, /about',
  'TanStack Query — fetching, caching, 5s polling',
  'Zustand (persisted) — tracked satellites',
  'React Hook Form + Zod — validated input',
  'react-three-fiber — the 3D globe',
]

export function AboutPage() {
  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-2xl space-y-4">
        <h1 className="text-2xl font-semibold">About Orbital</h1>
        <p className="text-white/70">
          A satellite tracker built to demonstrate a modern React architecture: live data, 3D
          rendering, typed APIs, routing, forms, and persisted client state. Position data comes
          from the public wheretheiss.at REST API.
        </p>
        <ul className="space-y-1 text-sm text-white/60">
          {stack.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
