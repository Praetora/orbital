import { useQuery } from '@tanstack/react-query'
import { fetchSatelliteList, fetchSatellitePosition } from '@/lib/api'

// List of available satellites (cached by TanStack Query).
export function useSatellites() {
  return useQuery({
    queryKey: ['satellites'],
    queryFn: fetchSatelliteList,
  })
}

// Live position for one satellite. Polls every 5s so the globe stays current.
export function useSatellitePosition(id: number) {
  return useQuery({
    queryKey: ['satellite', id],
    queryFn: () => fetchSatellitePosition(id),
    refetchInterval: 5000,
    enabled: Number.isFinite(id) && id > 0,
  })
}
