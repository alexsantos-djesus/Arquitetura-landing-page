import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Grid, PerspectiveCamera } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import * as THREE from "three";

type BoxData = {
  id: string;
  position: [number, number, number];
  size: [number, number, number];
  color: string;
};

const COLORS = [
  "hsl(0, 0%, 85%)",
  "hsl(38, 90%, 55%)",
  "hsl(200, 70%, 50%)",
  "hsl(0, 0%, 40%)",
  "hsl(160, 60%, 45%)",
  "hsl(280, 60%, 55%)",
];

const SHAPES = ["cube", "tall", "flat", "column"] as const;
type ShapeType = typeof SHAPES[number];

const SHAPE_SIZES: Record<ShapeType, [number, number, number]> = {
  cube: [1, 1, 1],
  tall: [0.6, 2, 0.6],
  flat: [2, 0.3, 2],
  column: [0.3, 3, 0.3],
};

const BuildingBlock = ({ box, isSelected, onSelect }: { box: BoxData; isSelected: boolean; onSelect: () => void }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current && isSelected) {
      meshRef.current.material = meshRef.current.material as THREE.MeshStandardMaterial;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={box.position}
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
      castShadow
      receiveShadow
    >
      <boxGeometry args={box.size} />
      <meshStandardMaterial
        color={box.color}
        roughness={0.3}
        metalness={0.1}
        emissive={isSelected ? box.color : "black"}
        emissiveIntensity={isSelected ? 0.15 : 0}
      />
      {isSelected && (
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(...box.size)]} />
          <lineBasicMaterial color="hsl(38, 90%, 55%)" linewidth={2} />
        </lineSegments>
      )}
    </mesh>
  );
};

const GroundPlane = ({ onPlaceBlock }: { onPlaceBlock: (point: THREE.Vector3) => void }) => {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.01, 0]}
      receiveShadow
      onClick={(e) => {
        e.stopPropagation();
        onPlaceBlock(e.point);
      }}
    >
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color="hsl(0, 0%, 8%)" transparent opacity={0.5} />
    </mesh>
  );
};

const Scene = ({ boxes, selectedId, onSelect, onPlaceBlock }: {
  boxes: BoxData[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onPlaceBlock: (point: THREE.Vector3) => void;
}) => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[8, 6, 8]} fov={50} />
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.05}
        minDistance={3}
        maxDistance={30}
        maxPolarAngle={Math.PI / 2.1}
      />

      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 15, 5]} intensity={1} castShadow shadow-mapSize={2048} />
      <directionalLight position={[-5, 8, -5]} intensity={0.3} color="hsl(220, 60%, 70%)" />

      <Grid
        args={[50, 50]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="hsl(0, 0%, 20%)"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="hsl(38, 90%, 55%)"
        fadeDistance={30}
        infiniteGrid
        position={[0, 0, 0]}
      />

      <GroundPlane onPlaceBlock={onPlaceBlock} />

      {boxes.map((box) => (
        <BuildingBlock
          key={box.id}
          box={box}
          isSelected={selectedId === box.id}
          onSelect={() => onSelect(box.id)}
        />
      ))}

      <hemisphereLight intensity={0.3} groundColor="hsl(0, 0%, 10%)" />
      <fog attach="fog" args={["hsl(0, 0%, 4%)", 20, 50]} />
    </>
  );
};

const SketchUpBuilder = ({ onClose }: { onClose: () => void }) => {
  const [boxes, setBoxes] = useState<BoxData[]>([
    { id: "starter-1", position: [0, 0.5, 0], size: [2, 1, 2], color: "hsl(0, 0%, 85%)" },
  ]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeColor, setActiveColor] = useState(0);
  const [activeShape, setActiveShape] = useState<ShapeType>("cube");

  const handlePlaceBlock = useCallback((point: THREE.Vector3) => {
    const size = SHAPE_SIZES[activeShape];
    const snappedX = Math.round(point.x);
    const snappedZ = Math.round(point.z);
    const newBox: BoxData = {
      id: `box-${Date.now()}`,
      position: [snappedX, size[1] / 2, snappedZ],
      size,
      color: COLORS[activeColor],
    };
    setBoxes((prev) => [...prev, newBox]);
    setSelectedId(null);
  }, [activeColor, activeShape]);

  const handleDelete = useCallback(() => {
    if (selectedId) {
      setBoxes((prev) => prev.filter((b) => b.id !== selectedId));
      setSelectedId(null);
    }
  }, [selectedId]);

  const handleClear = useCallback(() => {
    setBoxes([]);
    setSelectedId(null);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-[100] bg-background"
      >
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4 glass-panel border-b border-border/30">
          <div className="flex items-center gap-4">
            <span className="font-display text-sm font-bold tracking-wider text-foreground">ARQSTUDIO</span>
            <span className="text-muted-foreground text-xs">/ Espaço Criativo 3D</span>
          </div>
          <button
            onClick={onClose}
            data-cursor-hover
            className="glass-panel px-4 py-2 text-xs tracking-[0.15em] uppercase text-foreground hover:bg-primary/10 transition-colors"
          >
            ✕ Fechar
          </button>
        </div>

        {/* Canvas */}
        <Canvas shadows className="w-full h-full" style={{ background: "hsl(0, 0%, 4%)" }}>
          <Scene
            boxes={boxes}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onPlaceBlock={handlePlaceBlock}
          />
        </Canvas>

        {/* Bottom Toolbar */}
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 glass-panel px-6 py-4 flex items-center gap-6"
        >
          {/* Shape selector */}
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase mr-1">Forma</span>
            {SHAPES.map((shape) => (
              <button
                key={shape}
                onClick={() => setActiveShape(shape)}
                data-cursor-hover
                className={`px-3 py-1.5 text-[10px] tracking-wider uppercase transition-all duration-300 ${
                  activeShape === shape
                    ? "bg-primary/20 text-primary border border-primary/40"
                    : "text-muted-foreground hover:text-foreground border border-border/30"
                }`}
              >
                {shape === "cube" ? "Cubo" : shape === "tall" ? "Torre" : shape === "flat" ? "Laje" : "Pilar"}
              </button>
            ))}
          </div>

          <div className="w-px h-8 bg-border/30" />

          {/* Color selector */}
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase mr-1">Cor</span>
            {COLORS.map((color, i) => (
              <button
                key={i}
                onClick={() => setActiveColor(i)}
                data-cursor-hover
                className={`w-6 h-6 rounded-full transition-all duration-300 ${
                  activeColor === i ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110" : "hover:scale-110"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          <div className="w-px h-8 bg-border/30" />

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDelete}
              disabled={!selectedId}
              data-cursor-hover
              className="px-3 py-1.5 text-[10px] tracking-wider uppercase text-destructive/80 hover:text-destructive border border-destructive/20 hover:border-destructive/40 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Deletar
            </button>
            <button
              onClick={handleClear}
              data-cursor-hover
              className="px-3 py-1.5 text-[10px] tracking-wider uppercase text-muted-foreground hover:text-foreground border border-border/30 hover:border-border/60 transition-all"
            >
              Limpar
            </button>
          </div>
        </motion.div>

        {/* Help hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 text-muted-foreground text-[10px] tracking-[0.2em] uppercase text-center"
        >
          Clique no chão para adicionar • Selecione e delete • Orbite com o mouse
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SketchUpBuilder;
