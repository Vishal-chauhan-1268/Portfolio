import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sparkles, Stars, RoundedBox, Trail } from '@react-three/drei'
import * as THREE from 'three'

/* ---------- Desk + Laptop ---------- */
function Laptop() {
  const screenRef = useRef()
  useFrame(({ clock }) => {
    if (screenRef.current) {
      screenRef.current.material.emissiveIntensity = 1.4 + Math.sin(clock.elapsedTime * 2) * 0.25
    }
  })
  return (
    <group position={[0, -0.35, 0.4]} rotation={[0, 0.25, 0]}>
      {/* base */}
      <RoundedBox args={[1.6, 0.07, 1.1]} radius={0.04} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial color="#15151a" metalness={0.8} roughness={0.3} />
      </RoundedBox>
      {/* keyboard glow strip */}
      <mesh position={[0, 0.04, 0.1]}>
        <boxGeometry args={[1.3, 0.01, 0.7]} />
        <meshStandardMaterial color="#4d7fff" emissive="#4d7fff" emissiveIntensity={0.8} />
      </mesh>
      {/* screen */}
      <group position={[0, 0.03, -0.5]} rotation={[-1.2, 0, 0]}>
        <RoundedBox args={[1.6, 1.0, 0.05]} radius={0.04} position={[0, 0.5, 0]}>
          <meshStandardMaterial color="#0c0c10" metalness={0.7} roughness={0.4} />
        </RoundedBox>
        <mesh ref={screenRef} position={[0, 0.5, 0.03]}>
          <planeGeometry args={[1.42, 0.86]} />
          <meshStandardMaterial color="#050510" emissive="#4d7fff" emissiveIntensity={1.4} toneMapped={false} />
        </mesh>
      </group>
    </group>
  )
}

/* ---------- Floating ambient monitors ---------- */
function FloatingMonitor({ position, rotation = [0, 0, 0], color, scale = 1 }) {
  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={1.1}>
      <group position={position} rotation={rotation} scale={scale}>
        <RoundedBox args={[1.1, 0.7, 0.04]} radius={0.03}>
          <meshStandardMaterial color="#0d0d12" metalness={0.6} roughness={0.4} />
        </RoundedBox>
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[1.0, 0.6]} />
          <meshStandardMaterial color="#050510" emissive={color} emissiveIntensity={1.1} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  )
}

/* ---------- Holographic rotating globe ---------- */
function HoloGlobe() {
  const ref = useRef()
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.25
  })
  return (
    <Float speed={1} rotationIntensity={0} floatIntensity={0.6}>
      <group ref={ref} position={[1.9, 0.9, -0.6]}>
        <mesh>
          <icosahedronGeometry args={[0.55, 2]} />
          <MeshDistortMaterial
            color="#3fe0e0"
            emissive="#3fe0e0"
            emissiveIntensity={0.6}
            distort={0.25}
            speed={1.5}
            wireframe
            transparent
            opacity={0.55}
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.42, 1]} />
          <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.35} />
        </mesh>
      </group>
    </Float>
  )
}

/* ---------- Floating code-like fragments ---------- */
function CodeFragments() {
  const fragments = useMemo(() => {
    const symbols = ['{ }', '</>', '=>', 'const', '[ ]', 'AI', '01', 'fn()']
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      pos: [(Math.random() - 0.5) * 6, (Math.random() - 0.5) * 3 + 0.5, (Math.random() - 0.5) * 4 - 1],
      symbol: symbols[i % symbols.length],
      speed: 0.6 + Math.random() * 0.8,
    }))
  }, [])

  return fragments.map((f) => (
    <Float key={f.id} speed={f.speed} floatIntensity={1.4} rotationIntensity={0.4}>
      <group position={f.pos}>
        <mesh>
          <planeGeometry args={[0.01, 0.01]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </group>
    </Float>
  ))
}

/* ---------- Main scene ---------- */
export default function DevRoomScene({ mouse }) {
  const group = useRef()

  useFrame(() => {
    if (!group.current) return
    const targetX = (mouse.current.y || 0) * 0.15
    const targetY = (mouse.current.x || 0) * 0.25
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.04
  })

  return (
    <group ref={group}>
      <ambientLight intensity={0.35} />
      <pointLight position={[2, 2, 2]} intensity={1.2} color="#4d7fff" />
      <pointLight position={[-2, 1, -1]} intensity={1} color="#8b5cf6" />
      <pointLight position={[0, -1, 2]} intensity={0.6} color="#3fe0e0" />

      <Laptop />
      <FloatingMonitor position={[-1.9, 0.6, -0.8]} rotation={[0, 0.5, 0]} color="#8b5cf6" />
      <FloatingMonitor position={[-1.3, 1.5, -1.6]} rotation={[0, 0.3, 0]} color="#4d7fff" scale={0.75} />
      <HoloGlobe />
      <CodeFragments />

      <Sparkles count={60} scale={6} size={2} speed={0.3} color="#6e9bff" opacity={0.6} />
      <Stars radius={20} depth={30} count={1200} factor={2} saturation={0} fade speed={0.5} />
    </group>
  )
}
