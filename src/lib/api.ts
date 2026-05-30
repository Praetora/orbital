import type { SatelliteRecord } from '@/types/satellite'

// Requested through the Vite dev proxy (see vite.config.ts) so the browser
// makes a same-origin request and never hits a CORS wall.
const TLE_URL = '/celestrak/NORAD/elements/gp.php?GROUP=visual&FORMAT=tle'

// CelesTrak returns plain text: 3 lines per satellite (name, then TLE line 1 and 2).
function parseTle(text: string): SatelliteRecord[] {
  const lines = text.trim().split(/\r?\n/)
  const records: SatelliteRecord[] = []
  for (let i = 0; i + 2 < lines.length; i += 3) {
    const name = lines[i]?.trim()
    const line1 = lines[i + 1]?.trim()
    const line2 = lines[i + 2]?.trim()
    if (!name || !line1?.startsWith('1 ') || !line2?.startsWith('2 ')) continue
    const id = Number(line1.slice(2, 7))
    records.push({ id, name, line1, line2 })
  }
  return records
}

export async function fetchSatellites(limit = 100): Promise<SatelliteRecord[]> {
  const res = await fetch(TLE_URL)
  if (!res.ok) {
    throw new Error(`CelesTrak request failed: ${res.status} ${res.statusText}`)
  }
  const text = await res.text()
  return parseTle(text).slice(0, limit)
}
