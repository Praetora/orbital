import { useNavigate } from 'react-router-dom'
import { Earth } from '@/features/satellites/Earth'
import { SatelliteMarker } from '@/features/satellites/SatelliteMarker'
import { Sidebar } from '@/components/layout/Sidebar'
import { useSatellitePosition } from '@/hooks/useSatellites'
import { useTrackedStore } from '@/store/useTrackedStore'
import { latLonToVec3 } from '@/lib/geo'

const ISS_ID = 25544

export function HomePage() {
  const navigate = useNavigate()
  const select = useTrackedStore((s) => s.select)
  const { data: iss } = useSatellitePosition(ISS_ID)

  // Live ISS position projected onto the globe as a clickable marker.
  const issPos = iss ? latLonToVec3(iss.latitude, iss.longitude, 1.8) : null

  return (
    <div className="flex flex-1">
      <div className="relative flex-1">
        <Earth>
          {issPos && (
            <SatelliteMarker
              position={issPos}
              onSelect={() => {
                select(ISS_ID)
                navigate(`/satellite/${ISS_ID}`)
              }}
            />
          )}
        </Earth>
        <div className="pointer-events-none absolute bottom-4 left-4 text-xs text-white/40">
          Drag to orbit · scroll to zoom · click the marker for details
        </div>
      </div>
      <Sidebar />
    </div>
  )
}
