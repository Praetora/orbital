import { useParams, Link } from 'react-router-dom'
import { useSatellitePosition } from '@/hooks/useSatellites'
import { useTrackedStore } from '@/store/useTrackedStore'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-white/40">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  )
}

export function SatelliteDetailPage() {
  // :id comes from the URL — React Router route param.
  const { id } = useParams<{ id: string }>()
  const satId = Number(id)
  const { data, isLoading, isError } = useSatellitePosition(satId)

  const tracked = useTrackedStore((s) => s.tracked)
  const add = useTrackedStore((s) => s.add)
  const remove = useTrackedStore((s) => s.remove)
  const isTracked = tracked.includes(satId)

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <Link to="/" className="text-sm text-sky-400 hover:underline">
        &larr; Back to globe
      </Link>
      <div className="mt-4 max-w-xl">
        {isLoading && <p className="text-white/40">Loading position…</p>}
        {isError && <p className="text-red-400">Could not load satellite {satId}.</p>}
        {data && (
          <Card>
            <h1 className="text-2xl font-semibold">{data.name}</h1>
            <p className="text-sm text-white/50">NORAD {data.id}</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Stat label="Latitude" value={`${data.latitude.toFixed(2)}°`} />
              <Stat label="Longitude" value={`${data.longitude.toFixed(2)}°`} />
              <Stat label="Altitude" value={`${data.altitude.toFixed(1)} km`} />
              <Stat label="Velocity" value={`${data.velocity.toFixed(0)} km/h`} />
            </dl>
            <Button
              className="mt-5"
              variant={isTracked ? 'outline' : 'default'}
              onClick={() => (isTracked ? remove(satId) : add(satId))}
            >
              {isTracked ? 'Untrack' : 'Track this satellite'}
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}
