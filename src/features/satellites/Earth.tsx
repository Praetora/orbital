import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { type ReactNode } from 'react'

// The globe itself. TODO (Phase 2 polish): replace flat color with an Earth
// texture map + bump map, and add an atmosphere shader for the glow.
function Globe() {
  return (
    <mesh>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial color="#1e3a8a" roughness={0.85} metalness={0.1} />
    </mesh>
  )
}

// react-three-fiber lets us describe the 3D scene as declarative React components.
// Satellite markers are passed in as children so data and rendering stay decoupled.
export function Earth({ children }: { children?: ReactNode }) {
  return (
    <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 3, 5]} intensity={1.6} />
      <Stars radius={60} depth={50} count={2000} factor={4} fade />
      <Globe />
      {children}
      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={8}
        autoRotate
        autoRotateSpeed={0.4}
      />
    </Canvas>
  )
}
