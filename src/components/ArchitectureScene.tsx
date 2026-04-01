import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParametricStructure() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<THREE.Mesh[]>([]);

  const bars = useMemo(() => {
    const items: { pos: [number, number, number]; rot: [number, number, number]; scale: [number, number, number]; delay: number }[] = [];
    for (let i = 0; i < 40; i++) {
      const angle = (i / 40) * Math.PI * 2;
      const radius = 2 + Math.sin(i * 0.3) * 0.8;
      const height = Math.sin(i * 0.2) * 2;
      items.push({
        pos: [Math.cos(angle) * radius, height, Math.sin(angle) * radius],
        rot: [0, angle, Math.sin(i * 0.4) * 0.5],
        scale: [0.03, 0.5 + Math.random() * 1.5, 0.03],
        delay: i * 0.05,
      });
    }
    return items;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {bars.map((bar, i) => (
        <Float key={i} speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
          <mesh
            ref={(el) => { if (el) meshRefs.current[i] = el; }}
            position={bar.pos}
            rotation={bar.rot}
            scale={bar.scale}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color="#d4a843"
              metalness={0.9}
              roughness={0.1}
              transparent
              opacity={0.7}
            />
          </mesh>
        </Float>
      ))}

      <Float speed={0.5} floatIntensity={0.5}>
        <mesh position={[0, 0, 0]} scale={[1.5, 1.5, 1.5]}>
          <icosahedronGeometry args={[1, 1]} />
          <MeshTransmissionMaterial
            backside
            thickness={0.5}
            chromaticAberration={0.2}
            anisotropy={0.3}
            roughness={0}
            color="#c9a84c"
            transmission={0.95}
          />
        </mesh>
      </Float>

      {/* Light beams */}
      {[0, 1, 2].map((i) => (
        <mesh key={`beam-${i}`} position={[0, -2, 0]} rotation={[0, (i / 3) * Math.PI * 2, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 8, 8]} />
          <meshBasicMaterial color="#d4a843" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

const ArchitectureScene = () => {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 2, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#d4a843" />
        <pointLight position={[-10, -5, -10]} intensity={0.5} color="#4a6fa5" />
        <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.3} penumbra={1} color="#ffffff" />
        <fog attach="fog" args={["#0a0a0a", 5, 15]} />
        <ParametricStructure />
      </Canvas>
    </div>
  );
};

export default ArchitectureScene;
