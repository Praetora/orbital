import { useQuery } from '@tanstack/react-query'
import { fetchSatellites } from '@/lib/api'

// The satellite catalogue. TLEs change slowly, so we cache for an hour.
export function useSatellites() {
  return useQuery({
    queryKey: ['satellites'],
    queryFn: () => fetchSatellites(100),
    staleTime: 1000 * 60 * 60,
  })
}

// Select a single satellite from the cached catalogue by NORAD id.
export function useSatelliteRecord(id: number) {
  const query = useSatellites()
  const record = query.data?.find((s) => s.id === id)
  return { ...query, record }
}
