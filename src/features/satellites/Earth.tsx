import { Suspense, type ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, useTexture } from '@react-three/drei'
import { BackSide } from 'three'

// The globe: a sphere wrapped in the NASA Blue Marble texture, plus a soft
// atmosphere halo rendered on a slightly larger back-facing sphere.
function Globe() {
  const earth = useTexture('/textures/earth.jpg')
  return (
    <group>
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial map={earth} roughness={0.9} metalness={0.05} />
      </mesh>
      <mesh scale={1.08}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.12} side={BackSide} />
      </mesh>
    </group>
  )
}

// react-three-fiber lets us describe the 3D scene as declarative React components.
// Satellite markers are passed in as children so data and rendering stay decoupled.
export function Earth({ children }: { children?: ReactNode }) {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 3, 5]} intensity={1.8} />
      <Stars radius={60} depth={50} count={2000} factor={4} fade />
      {/* useTexture suspends while loading, so a boundary is required. */}
      <Suspense fallback={null}>
        <Globe />
      </Suspense>
      {children}
      <OrbitControls
        enablePan={false}
        minDistance={2.5}
        maxDistance={16}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </Canvas>
  )
}
