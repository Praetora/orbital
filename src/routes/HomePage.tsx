import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Earth } from '@/features/satellites/Earth'
import { SatelliteMarker } from '@/features/satellites/SatelliteMarker'
import { Sidebar } from '@/components/layout/Sidebar'
import { useSatellites } from '@/hooks/useSatellites'
import { computePosition } from '@/lib/orbit'
import { latLonToVec3 } from '@/lib/geo'

const EARTH_RADIUS_KM = 6371
const GLOBE_RADIUS = 1.5

export function HomePage() {
  const navigate = useNavigate()
  const { data: satellites } = useSatellites()
  const [now, setNow] = useState(() => new Date())

  // Re-propagate every second so the satellites visibly move along their orbits.
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex min-h-0 flex-1">
      <div className="relative flex-1">
        <Earth>
          {satellites?.map((sat) => {
            const geo = computePosition(sat, now)
            if (!geo) return null
            const radius = GLOBE_RADIUS * (1 + geo.altitude / EARTH_RADIUS_KM)
            const pos = latLonToVec3(geo.latitude, geo.longitude, radius)
            return (
              <SatelliteMarker
                key={sat.id}
                position={pos}
                onSelect={() => navigate(`/satellite/${sat.id}`)}
              />
            )
          })}
        </Earth>
        <div className="pointer-events-none absolute bottom-4 left-4 text-xs text-white/40">
          Drag to orbit · scroll to zoom · click a satellite for details
        </div>
      </div>
      <Sidebar />
    </div>
  )
}
