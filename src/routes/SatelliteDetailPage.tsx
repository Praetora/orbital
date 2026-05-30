import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSatelliteRecord } from '@/hooks/useSatellites'
import { useTrackedStore } from '@/store/useTrackedStore'
import { computePosition } from '@/lib/orbit'
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
  const { id } = useParams<{ id: string }>()
  const satId = Number(id)
  const { record, isLoading, isError } = useSatelliteRecord(satId)

  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const tracked = useTrackedStore((s) => s.tracked)
  const add = useTrackedStore((s) => s.add)
  const remove = useTrackedStore((s) => s.remove)
  const isTracked = tracked.includes(satId)

  const geo = record ? computePosition(record, now) : null

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <Link to="/" className="text-sm text-sky-400 hover:underline">
        &larr; Back to globe
      </Link>
      <div className="mt-4 max-w-xl">
        {isLoading && <p className="text-white/40">Loading orbital data…</p>}
        {isError && <p className="text-red-400">Could not load satellite data.</p>}
        {!isLoading && !record && (
          <p className="text-white/60">No satellite with id {satId} in the current set.</p>
        )}
        {record && (
          <Card>
            <h1 className="text-2xl font-semibold">{record.name}</h1>
            <p className="text-sm text-white/50">NORAD {record.id}</p>
            {geo ? (
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <Stat label="Latitude" value={`${geo.latitude.toFixed(2)}°`} />
                <Stat label="Longitude" value={`${geo.longitude.toFixed(2)}°`} />
                <Stat label="Altitude" value={`${geo.altitude.toFixed(0)} km`} />
                <Stat label="Updated" value={now.toLocaleTimeString()} />
              </dl>
            ) : (
              <p className="mt-4 text-sm text-white/50">Position unavailable for this object.</p>
            )}
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
