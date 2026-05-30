import { useState } from 'react'

interface SatelliteMarkerProps {
  position: [number, number, number]
  onSelect: () => void
}

// A clickable point in 3D space. Hover scales + recolors it; click selects it.
export function SatelliteMarker({ position, onSelect }: SatelliteMarkerProps) {
  const [hovered, setHovered] = useState(false)
  return (
    <mesh
      position={position}
      scale={hovered ? 1.7 : 1}
      onClick={onSelect}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial
        color={hovered ? '#fbbf24' : '#38bdf8'}
        emissive={hovered ? '#f59e0b' : '#0ea5e9'}
        emissiveIntensity={0.7}
      />
    </mesh>
  )
}
