import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Client state: which satellites the user is tracking + the current selection.
// Persisted to localStorage so the list survives a refresh.
interface TrackedState {
  tracked: number[]
  selectedId: number | null
  add: (id: number) => void
  remove: (id: number) => void
  select: (id: number | null) => void
}

export const useTrackedStore = create<TrackedState>()(
  persist(
    (set) => ({
      tracked: [],
      selectedId: null,
      add: (id) => set((s) => (s.tracked.includes(id) ? s : { tracked: [...s.tracked, id] })),
      remove: (id) => set((s) => ({ tracked: s.tracked.filter((t) => t !== id) })),
      select: (id) => set({ selectedId: id }),
    }),
    { name: 'orbital-tracked' },
  ),
)
