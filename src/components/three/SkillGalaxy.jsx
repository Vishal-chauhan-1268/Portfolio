import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Html } from '@react-three/drei'
import * as THREE from 'three'

function fibonacciSphere(samples, radius) {
  const points = []
  const phi = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = phi * i
    const x = Math.cos(theta) * r
    const z = Math.sin(theta) * r
    points.push(new THREE.Vector3(x * radius, y * radius, z * radius))
  }
  return points
}

function SkillNode({ skill, position, onSelect, isActive }) {
  const ref = useRef()
  const [hovered, setHovered] = useState(false)
  const size = 0.16 + skill.level * 0.035

  useFrame(({ clock }) => {
    if (ref.current) {
      const pulse = hovered || isActive ? 1.5 : 1
      const s = size * pulse + Math.sin(clock.elapsedTime * 2 + position.x) * 0.01
      ref.current.scale.setScalar(s / size)
    }
  })

  return (
    <Float speed={1.2} floatIntensity={0.6} rotationIntensity={0}>
      <group position={position}>
        <mesh
          ref={ref}
          onClick={(e) => {
            e.stopPropagation()
            onSelect(skill)
          }}
          onPointerOver={(e) => {
            e.stopPropagation()
            setHovered(true)
          }}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[size, 24, 24]} />
          <meshStandardMaterial
            color={skill.color}
            emissive={skill.color}
            emissiveIntensity={hovered || isActive ? 1.6 : 0.7}
            roughness={0.3}
            metalness={0.4}
          />
        </mesh>
        <Html distanceFactor={8} position={[0, size + 0.12, 0]} center>
          <div
            className={`pointer-events-none whitespace-nowrap text-[11px] font-mono tracking-wide transition-opacity duration-200 ${
              hovered || isActive ? 'opacity-100' : 'opacity-60'
            }`}
            style={{ color: skill.color }}
          >
            {skill.name}
          </div>
        </Html>
      </group>
    </Float>
  )
}

export default function SkillGalaxy({ skills, onSelect, activeId }) {
  const groupRef = useRef()
  const positions = useMemo(() => fibonacciSphere(skills.length, 2.4), [skills.length])

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.06
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} intensity={1} color="#4d7fff" />
      <pointLight position={[-3, -2, -2]} intensity={0.8} color="#8b5cf6" />
      {skills.map((skill, i) => (
        <SkillNode
          key={skill.id}
          skill={skill}
          position={positions[i]}
          onSelect={onSelect}
          isActive={activeId === skill.id}
        />
      ))}
    </group>
  )
}
