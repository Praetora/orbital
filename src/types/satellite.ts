// Shape of the data we consume from the wheretheiss.at REST API.
// Keeping API response types in one place makes the data layer self-documenting.

export interface SatelliteSummary {
  id: number
  name: string
}

export interface SatellitePosition {
  id: number
  name: string
  latitude: number
  longitude: number
  altitude: number
  velocity: number
  timestamp: number
}
