import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Color,
  Object3D,
  Vector3,
  Float32BufferAttribute,
  LineBasicMaterial,
  AdditiveBlending,
} from 'three';
import './NeuralHero.css';

// ─── Palette constants ───────────────────────────────────────────────
const TEAL  = new Color('#3c6e71');
const NAVY  = new Color('#284b63');
const WHITE = new Color('#ffffff');

// Maximum connection distance (world‑units)
const CONNECT_DIST = 3.2;

// ─── Helpers ─────────────────────────────────────────────────────────

/** Detect prefers-reduced-motion */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mql.matches);
    const handler = (e) => setReduced(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return reduced;
}

/** Generate initial node data (positions, phases, color) via useMemo. */
function useNodeData(count) {
  return useMemo(() => {
    const positions = [];
    const phases    = [];
    const colors    = [];

    for (let i = 0; i < count; i++) {
      // Spread nodes across x [-6,6], y [-4,4], z [-3,3]
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 6;
      positions.push(new Vector3(x, y, z));

      // Random phase offsets for oscillation
      phases.push({
        px: Math.random() * Math.PI * 2,
        py: Math.random() * Math.PI * 2,
        pz: Math.random() * Math.PI * 2,
        sx: 0.15 + Math.random() * 0.25,  // speed multiplier x
        sy: 0.1  + Math.random() * 0.2,
        sz: 0.08 + Math.random() * 0.15,
        ax: 0.08 + Math.random() * 0.12,  // amplitude x
        ay: 0.06 + Math.random() * 0.1,
        az: 0.04 + Math.random() * 0.08,
      });

      // Color: mostly teal/navy, 10 % chance of bright white "spark"
      const r = Math.random();
      if (r < 0.1) {
        colors.push(WHITE.clone());
      } else if (r < 0.55) {
        colors.push(TEAL.clone());
      } else {
        colors.push(NAVY.clone());
      }
    }

    return { positions, phases, colors };
  }, [count]);
}

// ─── Data‑pulse particles ────────────────────────────────────────────
// Small bright dots that travel along random edges periodically.

const MAX_PULSES = 20;

function initPulses(count) {
  const pulses = [];
  for (let i = 0; i < count; i++) {
    pulses.push({ fromIdx: 0, toIdx: 1, t: 0, alive: false });
  }
  return pulses;
}

// ─── Main scene component ────────────────────────────────────────────

function NeuralNetwork({ nodeCount, interactive, speed }) {
  const { pointer } = useThree();
  const reducedMotion = usePrefersReducedMotion();

  // Effective speed: 10 % when reduced-motion
  const effectiveSpeed = reducedMotion ? speed * 0.1 : speed;

  // Node data
  const { positions, phases } = useNodeData(nodeCount);

  // Refs
  const instancedRef  = useRef();
  const linesRef      = useRef();
  const pulseMeshRef  = useRef();
  const tempObj    = useMemo(() => new Object3D(), []);
  const currentPos = useRef(positions.map((p) => p.clone()));

  // Pulse state (mutable ref — not React state for perf)
  const pulsesRef = useRef(initPulses(MAX_PULSES));
  const pulseTimer = useRef(0);


  // ── Animation loop ──────────────────────────────────────────────
  useFrame((state, delta) => {
    if (!instancedRef.current) return;

    const t = state.clock.elapsedTime * effectiveSpeed;
    const cur = currentPos.current;

    // --- 1. Update node positions (oscillation + mouse interaction) ---
    for (let i = 0; i < nodeCount; i++) {
      const base = positions[i];
      const ph   = phases[i];

      // Sine‑wave oscillation
      let x = base.x + Math.sin(t * ph.sx + ph.px) * ph.ax;
      let y = base.y + Math.sin(t * ph.sy + ph.py) * ph.ay;
      let z = base.z + Math.sin(t * ph.sz + ph.pz) * ph.az;

      // Mouse interaction: gentle repulsion in screen‑projected space
      if (interactive) {
        const mx = pointer.x * 6;  // map NDC → world approx
        const my = pointer.y * 4;
        const dx = x - mx;
        const dy = y - my;
        const distSq = dx * dx + dy * dy;
        const influence = Math.max(0, 1 - distSq / 9); // falloff within radius ~3
        x += dx * influence * 0.15;
        y += dy * influence * 0.15;
      }

      cur[i].set(x, y, z);

      // Scale: base + gentle pulse
      const s = 0.04 + Math.sin(t * 1.2 + i) * 0.01;
      tempObj.position.set(x, y, z);
      tempObj.scale.set(s, s, s);
      tempObj.updateMatrix();
      instancedRef.current.setMatrixAt(i, tempObj.matrix);
    }
    instancedRef.current.instanceMatrix.needsUpdate = true;

    // --- 2. Update line connections (distance-based) ---
    const linePositions = [];
    const lineColors    = [];
    const edges = [];

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = cur[i].distanceTo(cur[j]);
        if (dist < CONNECT_DIST) {
          linePositions.push(cur[i].x, cur[i].y, cur[i].z);
          linePositions.push(cur[j].x, cur[j].y, cur[j].z);

          // Fade opacity by distance
          const alpha = 1 - dist / CONNECT_DIST;
          const a = alpha * 0.2;
          lineColors.push(0.235, 0.431, 0.443, a);
          lineColors.push(0.235, 0.431, 0.443, a);

          edges.push([i, j]);
        }
      }
    }


    if (linesRef.current) {
      const geom = linesRef.current.geometry;
      geom.setAttribute('position', new Float32BufferAttribute(linePositions, 3));
      geom.setAttribute('color', new Float32BufferAttribute(lineColors, 4));
      geom.attributes.position.needsUpdate = true;
      geom.attributes.color.needsUpdate = true;
    }

    // --- 3. Data pulses ---
    pulseTimer.current += delta * effectiveSpeed;
    const pulses = pulsesRef.current;

    // Spawn new pulse every ~0.4 s
    if (pulseTimer.current > 0.4 && edges.length > 0) {
      pulseTimer.current = 0;
      // Find a free pulse slot
      for (let p = 0; p < MAX_PULSES; p++) {
        if (!pulses[p].alive) {
          const edge = edges[Math.floor(Math.random() * edges.length)];
          pulses[p].fromIdx = edge[0];
          pulses[p].toIdx   = edge[1];
          pulses[p].t       = 0;
          pulses[p].alive   = true;
          break;
        }
      }
    }

    // Update pulse positions
    if (pulseMeshRef.current) {
      let visibleCount = 0;
      for (let p = 0; p < MAX_PULSES; p++) {
        if (!pulses[p].alive) continue;

        pulses[p].t += delta * effectiveSpeed * 1.8;
        if (pulses[p].t >= 1) {
          pulses[p].alive = false;
          continue;
        }

        const from = cur[pulses[p].fromIdx];
        const to   = cur[pulses[p].toIdx];
        const tt   = pulses[p].t;
        const px = from.x + (to.x - from.x) * tt;
        const py = from.y + (to.y - from.y) * tt;
        const pz = from.z + (to.z - from.z) * tt;

        const ps = 0.035;
        tempObj.position.set(px, py, pz);
        tempObj.scale.set(ps, ps, ps);
        tempObj.updateMatrix();
        pulseMeshRef.current.setMatrixAt(visibleCount, tempObj.matrix);
        visibleCount++;
      }

      // Hide remaining instances by scaling to zero
      for (let p = visibleCount; p < MAX_PULSES; p++) {
        tempObj.position.set(0, 0, -999);
        tempObj.scale.set(0, 0, 0);
        tempObj.updateMatrix();
        pulseMeshRef.current.setMatrixAt(p, tempObj.matrix);
      }
      pulseMeshRef.current.instanceMatrix.needsUpdate = true;
      pulseMeshRef.current.count = MAX_PULSES;
    }
  });

  // Line material (shared)
  const lineMaterial = useMemo(
    () =>
      new LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 1,
        blending: AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  return (
    <>
      {/* Ambient + point lights for glow */}
      <ambientLight intensity={0.35} />
      <pointLight position={[5, 5, 5]} intensity={0.6} color="#5da399" />
      <pointLight position={[-5, -3, 3]} intensity={0.4} color="#284b63" />

      {/* ── Node spheres (instancedMesh) ─────────────────────────── */}
      <instancedMesh
        ref={instancedRef}
        args={[undefined, undefined, nodeCount]}
        frustumCulled={false}
      >
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial
          color="#5da399"
          emissive="#3c6e71"
          emissiveIntensity={0.7}
          roughness={0.3}
          metalness={0.2}
          toneMapped={false}
        />
      </instancedMesh>

      {/* ── Connection lines (lineSegments) ──────────────────────── */}
      <lineSegments ref={linesRef} material={lineMaterial}>
        <bufferGeometry />
      </lineSegments>

      {/* ── Data-pulse particles (instancedMesh) ─────────────────── */}
      <instancedMesh
        ref={pulseMeshRef}
        args={[undefined, undefined, MAX_PULSES]}
        frustumCulled={false}
      >
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial
          color="#5da399"
          toneMapped={false}
          transparent
          opacity={0.95}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </instancedMesh>
    </>
  );
}

// ─── Error boundary ──────────────────────────────────────────────────

class NeuralHeroErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.warn('[NeuralHero] Render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      // Silently degrade — show nothing instead of crashing the page
      return null;
    }
    return this.props.children;
  }
}

// ─── Public component ────────────────────────────────────────────────

const NeuralHero = React.memo(function NeuralHero({
  nodeCount = 50,
  interactive = true,
  speed = 1,
  className = '',
}) {
  return (
    <NeuralHeroErrorBoundary>
      <div className={`neural-hero ${className}`}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <NeuralNetwork
            nodeCount={nodeCount}
            interactive={interactive}
            speed={speed}
          />
        </Canvas>
      </div>
    </NeuralHeroErrorBoundary>
  );
});

export default NeuralHero;
