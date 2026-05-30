import * as satellite from 'satellite.js'
import type { GeoPosition, SatelliteRecord } from '@/types/satellite'

// Propagate a satellite's TLE to a given moment and return its ground position.
// satellite.js runs the standard SGP4 model used across the industry.
export function computePosition(record: SatelliteRecord, date: Date): GeoPosition | null {
  const satrec = satellite.twoline2satrec(record.line1, record.line2)
  const eci = satellite.propagate(satrec, date)
  if (!eci || !eci.position || typeof eci.position === 'boolean') return null

  const gmst = satellite.gstime(date)
  const geo = satellite.eciToGeodetic(eci.position, gmst)
  return {
    latitude: satellite.degreesLat(geo.latitude),
    longitude: satellite.degreesLong(geo.longitude),
    altitude: geo.height,
  }
}
