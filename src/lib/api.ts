import type { SatellitePosition, SatelliteSummary } from '@/types/satellite'

// Single source of truth for HTTP access. Real REST calls, typed responses,
// and centralized error handling so every hook gets consistent loading/error states.
const BASE = 'https://api.wheretheiss.at/v1'

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`)
  }
  return res.json() as Promise<T>
}

export function fetchSatelliteList(): Promise<SatelliteSummary[]> {
  return getJson<SatelliteSummary[]>(`${BASE}/satellites`)
}

export function fetchSatellitePosition(id: number): Promise<SatellitePosition> {
  return getJson<SatellitePosition>(`${BASE}/satellites/${id}`)
}

// TODO (Phase 5): swap/augment with CelesTrak GP query for the full 30k-object
// catalog, then parse TLEs with satellite.js to compute positions client-side.
