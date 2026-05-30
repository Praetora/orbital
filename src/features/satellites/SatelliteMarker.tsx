import { useRef, useState } from 'react'
import { type ThreeEvent } from '@react-three/fiber'

interface SatelliteMarkerProps {
  position: [number, number, number]
  onSelect: () => void
}

// A small clickable point in 3D space. We track the pointer-down location and
// only treat the interaction as a "select" if the pointer barely moved — so
// dragging across a marker orbits the globe instead of opening its page.
export function SatelliteMarker({ position, onSelect }: SatelliteMarkerProps) {
  const [hovered, setHovered] = useState(false)
  const downAt = useRef<{ x: number; y: number } | null>(null)

  return (
    <mesh
      position={position}
      scale={hovered ? 1.8 : 1}
      onPointerDown={(e: ThreeEvent<PointerEvent>) => {
        downAt.current = { x: e.nativeEvent.clientX, y: e.nativeEvent.clientY }
      }}
      onPointerUp={(e: ThreeEvent<PointerEvent>) => {
        const start = downAt.current
        downAt.current = null
        if (!start) return
        const moved = Math.hypot(e.nativeEvent.clientX - start.x, e.nativeEvent.clientY - start.y)
        if (moved < 5) onSelect()
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.02, 16, 16]} />
      <meshStandardMaterial
        color={hovered ? '#fbbf24' : '#38bdf8'}
        emissive={hovered ? '#f59e0b' : '#0ea5e9'}
        emissiveIntensity={0.8}
      />
    </mesh>
  )
}
