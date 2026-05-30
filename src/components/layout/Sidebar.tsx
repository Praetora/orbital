import { useNavigate } from 'react-router-dom'
import { useSatellites } from '@/hooks/useSatellites'
import { useTrackedStore } from '@/store/useTrackedStore'
import { AddTrackedForm } from '@/features/satellites/AddTrackedForm'
import { Card } from '@/components/ui/card'

export function Sidebar() {
  const navigate = useNavigate()
  const { data, isLoading, isError } = useSatellites()
  const tracked = useTrackedStore((s) => s.tracked)

  return (
    <aside className="w-80 shrink-0 space-y-5 overflow-y-auto border-l border-white/10 p-4">
      <AddTrackedForm />

      <div>
        <h2 className="mb-2 text-xs uppercase tracking-wide text-white/50">
          Satellites {data ? `(${data.length})` : ''}
        </h2>
        {isLoading && <p className="text-sm text-white/40">Loading orbital data…</p>}
        {isError && <p className="text-sm text-red-400">Failed to load satellites.</p>}
        <ul className="space-y-1">
          {data?.map((sat) => (
            <li key={sat.id}>
              <button
                onClick={() => navigate(`/satellite/${sat.id}`)}
                className="w-full truncate rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-white/10"
              >
                {sat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {tracked.length > 0 && (
        <Card>
          <h2 className="mb-2 text-xs uppercase tracking-wide text-white/50">Tracked</h2>
          <ul className="space-y-1 text-sm">
            {tracked.map((id) => (
              <li key={id}>
                <button
                  onClick={() => navigate(`/satellite/${id}`)}
                  className="transition-colors hover:text-sky-400"
                >
                  NORAD {id}
                </button>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </aside>
  )
}
