// A satellite as delivered by CelesTrak: a name, its NORAD id, and the two
// TLE (Two-Line Element) lines that describe its orbit.
export interface SatelliteRecord {
  id: number
  name: string
  line1: string
  line2: string
}

// A computed ground position at a moment in time.
export interface GeoPosition {
  latitude: number
  longitude: number
  altitude: number // kilometres above sea level
}
