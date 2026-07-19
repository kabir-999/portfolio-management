import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import './SolarSystem.css';

/* ============================================================
   SOLAR SYSTEM PORTFOLIO
   The site is a navigable solar system. Each section is a
   planet; the sun is "About Me". Click a body → the camera
   flies to it and a content panel opens. Drag to orbit.
   ============================================================ */

const CYAN = '#4fd1ff';
const VIOLET = '#8b7bff';
const GREEN = '#2dd4bf';
const GOLD = '#ffb86b';

const SUN_RADIUS = 2.6;

const PLANETS = [
  { id: 'internship', label: 'Internship', color: '#38bdf8', radius: 1.05, orbit: 8.2, speed: 0.14, phase: 0.6, incl: [0.06, 0, -0.05], feature: 'chip' },
  { id: 'projects', label: 'Projects', color: '#8b7bff', radius: 1.55, orbit: 12.6, speed: 0.1, phase: 2.4, incl: [-0.08, 0, 0.06], feature: 'ring-moons' },
  { id: 'skills', label: 'Skills', color: '#2dd4bf', radius: 1.2, orbit: 16.8, speed: 0.075, phase: 4.2, incl: [0.1, 0, 0.04], feature: 'atom' },
  { id: 'journey', label: 'My Journey', color: '#7aa2ff', radius: 1.0, orbit: 20.6, speed: 0.058, phase: 1.4, incl: [-0.05, 0, -0.08], feature: 'milestones' },
  { id: 'contact', label: 'Contact', color: '#d78bfa', radius: 0.9, orbit: 24.2, speed: 0.046, phase: 5.1, incl: [0.07, 0, 0.09], feature: 'satellite' },
];

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

/* Cached soft radial-glow texture for sprites. */
let _glowTex = null;
function getGlowTexture() {
  if (_glowTex) return _glowTex;
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.35, 'rgba(255,255,255,0.4)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  _glowTex = new THREE.CanvasTexture(c);
  return _glowTex;
}

/* ---------- camera: overview orbit ⇄ fly-to-body ---------- */
function CameraRig({ activeRef, bodiesRef, drag }) {
  const azimuth = useRef(0.4);
  const look = useRef(new THREE.Vector3(0, 0.5, 0));
  const tmp = useRef(new THREE.Vector3());
  useFrame((state, delta) => {
    const cam = state.camera;
    const active = activeRef.current;
    const mobile = isMobile();
    let px, py, pz, lx, ly, lz;

    if (!active) {
      const t = state.clock.elapsedTime;
      azimuth.current += delta * 0.035;
      const az = azimuth.current + drag.current.x;
      const pol = THREE.MathUtils.clamp(0.5 + drag.current.y, 0.14, 1.0);
      const R = mobile ? 40 : 32;
      px = R * Math.cos(pol) * Math.sin(az);
      py = R * Math.sin(pol) + Math.sin(t * 0.24) * 0.5;
      pz = R * Math.cos(pol) * Math.cos(az);
      lx = Math.sin(t * 0.18) * 0.4; ly = 0.5; lz = 0;
    } else {
      // Land above the body's surface: its curved horizon fills the
      // bottom of the frame while content floats in the sky above.
      const p = tmp.current.set(0, 0, 0);
      let r = SUN_RADIUS;
      if (active !== 'home') {
        const body = bodiesRef.current[active];
        const def = PLANETS.find((d) => d.id === active);
        if (body && def) {
          body.getWorldPosition(p);
          r = def.radius;
        }
      }
      const outH = new THREE.Vector3(p.x, 0, p.z);
      if (outH.lengthSq() < 0.01) {
        outH.set(cam.position.x, 0, cam.position.z);
        if (outH.lengthSq() < 0.01) outH.set(0.4, 0, 1);
      }
      outH.normalize();
      // For planets, stand inside the orbit looking outward so the
      // sun stays behind the camera and the planet is sunlit.
      const side = active === 'home' ? 1 : -1;
      const distMul = mobile ? 3.6 : 3.0;
      px = p.x + side * outH.x * r * distMul;
      py = p.y + r * 1.45;
      pz = p.z + side * outH.z * r * distMul;
      lx = p.x;
      ly = p.y + r * 0.8;
      lz = p.z;
    }

    const lam = active ? 1.9 : 2.6;
    cam.position.x = THREE.MathUtils.damp(cam.position.x, px, lam, delta);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, py, lam, delta);
    cam.position.z = THREE.MathUtils.damp(cam.position.z, pz, lam, delta);
    look.current.x = THREE.MathUtils.damp(look.current.x, lx, lam, delta);
    look.current.y = THREE.MathUtils.damp(look.current.y, ly, lam, delta);
    look.current.z = THREE.MathUtils.damp(look.current.z, lz, lam, delta);
    cam.lookAt(look.current);
  });
  return null;
}

/* ---------- backdrop: stars + nebula ---------- */
function Starfield() {
  const a = useRef();
  const b = useRef();
  const c = useRef();
  const make = (count, radius) => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = radius * (0.5 + 0.5 * Math.cbrt(Math.random()));
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  };
  const { s1, s2, s3 } = useMemo(() => {
    const mobile = isMobile();
    return {
      s1: make(mobile ? 700 : 1600, 70),
      s2: make(mobile ? 400 : 900, 95),
      s3: make(mobile ? 60 : 140, 55),
    };
  }, []);
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (a.current) {
      a.current.rotation.y += delta * 0.004;
      a.current.material.opacity = 0.8 + Math.sin(t * 0.6) * 0.1;
    }
    if (b.current) b.current.rotation.y -= delta * 0.002;
    if (c.current) {
      c.current.rotation.y += delta * 0.006;
      c.current.material.opacity = 0.55 + Math.sin(t * 2.1) * 0.3;
      c.current.material.size = 0.26 + Math.sin(t * 1.4) * 0.05;
    }
  });
  return (
    <>
      <points ref={a}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={s1.length / 3} array={s1} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.14} color="#cde7ff" transparent opacity={0.85} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      <points ref={b}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={s2.length / 3} array={s2} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.1} color="#8ea8ff" transparent opacity={0.55} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      {/* few bright twinkling stars */}
      <points ref={c}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={s3.length / 3} array={s3} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.26} color="#ffffff" transparent opacity={0.7} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
    </>
  );
}

function Nebula() {
  const tex = getGlowTexture();
  const clouds = useMemo(
    () => [
      { pos: [-38, 14, -42], scale: 60, color: '#3b2f8a', opacity: 0.16 },
      { pos: [42, -10, -38], scale: 55, color: '#0e4a6e', opacity: 0.15 },
      { pos: [10, 26, -55], scale: 48, color: '#5a2f7a', opacity: 0.11 },
      { pos: [-30, -22, -30], scale: 42, color: '#123c63', opacity: 0.12 },
    ],
    []
  );
  return (
    <>
      {clouds.map((c, i) => (
        <sprite key={i} position={c.pos} scale={[c.scale, c.scale, 1]}>
          <spriteMaterial map={tex} color={c.color} transparent opacity={c.opacity} depthWrite={false} blending={THREE.AdditiveBlending} />
        </sprite>
      ))}
    </>
  );
}

/* ---------- the sun (About Me) ---------- */
function SunFlares() {
  const flares = useRef();
  const positions = useMemo(() => {
    const count = isMobile() ? 30 : 70;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = SUN_RADIUS * (1.05 + Math.random() * 0.35);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (flares.current) {
      flares.current.rotation.y += delta * 0.12;
      flares.current.rotation.x = Math.sin(t * 0.2) * 0.15;
      flares.current.material.opacity = 0.55 + Math.sin(t * 1.7) * 0.25;
    }
  });
  return (
    <points ref={flares}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.14} color="#ffdfa8" transparent opacity={0.6} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function Sun({ onSelect, showLabel, focused }) {
  const group = useRef();
  const surface = useRef();
  const corona = useRef();
  const corona2 = useRef();
  const halo = useRef();
  const [hovered, setHovered] = useState(false);
  const tex = getGlowTexture();

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : '';
    return () => { document.body.style.cursor = ''; };
  }, [hovered]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (surface.current) {
      surface.current.rotation.y += delta * 0.05;
      surface.current.rotation.z = Math.sin(t * 0.11) * 0.08;
    }
    if (corona.current) {
      const target = focused ? 0.1 : 0.32 + Math.sin(t * 1.3) * 0.06;
      corona.current.material.opacity = THREE.MathUtils.damp(corona.current.material.opacity, target, 3, delta);
    }
    if (corona2.current) {
      const target = focused ? 0.06 : 0.2 + Math.sin(t * 0.8 + 1.5) * 0.06;
      corona2.current.material.opacity = THREE.MathUtils.damp(corona2.current.material.opacity, target, 3, delta);
      const s = 6.2 + Math.sin(t * 0.9) * 0.35;
      corona2.current.scale.set(s, s, 1);
    }
    if (halo.current) {
      halo.current.material.opacity = THREE.MathUtils.damp(halo.current.material.opacity, focused ? 0.07 : 0.16, 3, delta);
    }
    if (group.current) {
      const s = THREE.MathUtils.damp(group.current.scale.x, hovered ? 1.07 : 1, 6, delta);
      group.current.scale.setScalar(s);
    }
  });

  return (
    <group
      ref={group}
      onClick={(e) => { e.stopPropagation(); if (e.delta < 8) onSelect('home'); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
    >
      <mesh ref={surface}>
        <icosahedronGeometry args={[SUN_RADIUS, 3]} />
        <meshBasicMaterial color="#f6d089" />
      </mesh>
      <mesh ref={halo} scale={1.18}>
        <sphereGeometry args={[SUN_RADIUS, 32, 32]} />
        <meshBasicMaterial color="#ffb86b" transparent opacity={0.16} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
      </mesh>
      <sprite ref={corona} scale={[10.5, 10.5, 1]}>
        <spriteMaterial map={tex} color="#ffc98a" transparent opacity={0.32} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
      <sprite ref={corona2} scale={[6.2, 6.2, 1]}>
        <spriteMaterial map={tex} color="#ffe6b8" transparent opacity={0.2} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
      <SunFlares />
      <pointLight color="#ffe0b0" intensity={220} decay={1.8} />
      {showLabel && (
        <Html center position={[0, SUN_RADIUS * 1.75, 0]} distanceFactor={22} zIndexRange={[3, 0]}>
          <div className={`planet-label sun-label ${hovered ? 'planet-label-hot' : ''}`}>About Me</div>
        </Html>
      )}
    </group>
  );
}

/* ---------- planet feature decorations ---------- */
function ChipFeature({ radius }) {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.6;
  });
  return (
    <group ref={ref}>
      <group position={[radius * 1.9, radius * 0.35, 0]}>
        <mesh>
          <boxGeometry args={[0.3, 0.06, 0.3]} />
          <meshStandardMaterial color="#16244a" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.045, 0]}>
          <boxGeometry args={[0.15, 0.025, 0.15]} />
          <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={1.6} />
        </mesh>
      </group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius * 1.9, 0.008, 6, 64]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function RingMoonsFeature({ radius, color }) {
  const moons = useRef();
  const moonDefs = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        r: radius * (1.7 + (i % 4) * 0.28),
        size: 0.07 + (i % 3) * 0.035,
        speed: 0.5 + (i % 5) * 0.16,
        phase: (i / 8) * Math.PI * 2,
        y: ((i % 3) - 1) * 0.16,
      })),
    [radius]
  );
  const refs = useRef([]);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    refs.current.forEach((m, i) => {
      if (!m) return;
      const d = moonDefs[i];
      const a = t * d.speed + d.phase;
      m.position.set(Math.cos(a) * d.r, d.y, Math.sin(a) * d.r);
    });
  });
  return (
    <group ref={moons}>
      <mesh rotation={[-1.15, 0, 0.2]}>
        <ringGeometry args={[radius * 1.45, radius * 2.15, 64]} />
        <meshBasicMaterial color="#b9aaff" transparent opacity={0.28} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      {moonDefs.map((d, i) => (
        <mesh key={i} ref={(el) => (refs.current[i] = el)}>
          <icosahedronGeometry args={[d.size, 1]} />
          <meshStandardMaterial color="#cfc4ff" emissive={color} emissiveIntensity={0.35} roughness={0.6} flatShading />
        </mesh>
      ))}
    </group>
  );
}

function AtomFeature({ radius }) {
  const els = useRef([]);
  const tilts = useMemo(() => [[Math.PI / 2.3, 0], [Math.PI / 2.3, Math.PI / 3], [Math.PI / 2.3, -Math.PI / 3]], []);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    els.current.forEach((g, i) => {
      if (g) g.rotation.y = t * (0.9 + i * 0.25) + i * 2.1;
    });
  });
  return (
    <group>
      {tilts.map(([rx, rz], i) => (
        <group key={i} rotation={[rx, 0, rz]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius * 1.75, 0.01, 6, 64]} />
            <meshBasicMaterial color={GREEN} transparent opacity={0.35} />
          </mesh>
          <group ref={(el) => (els.current[i] = el)}>
            <mesh position={[radius * 1.75, 0, 0]}>
              <sphereGeometry args={[0.08, 10, 10]} />
              <meshBasicMaterial color="#c8ffe9" />
            </mesh>
          </group>
        </group>
      ))}
    </group>
  );
}

function MilestonesFeature({ radius }) {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.35;
  });
  return (
    <group ref={ref} rotation={[0.25, 0, 0.1]}>
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * radius * 1.8, 0, Math.sin(a) * radius * 1.8]}>
            <octahedronGeometry args={[0.11, 0]} />
            <meshStandardMaterial color="#ffd27a" emissive="#ffd27a" emissiveIntensity={0.8} metalness={0.5} roughness={0.3} />
          </mesh>
        );
      })}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius * 1.8, 0.008, 6, 64]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function SatelliteFeature({ radius }) {
  const orbit = useRef();
  useFrame((state, delta) => {
    if (orbit.current) orbit.current.rotation.y += delta * 0.9;
  });
  return (
    <group ref={orbit} rotation={[0.4, 0, 0]}>
      <group position={[radius * 2, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.14, 0.14, 0.22]} />
          <meshStandardMaterial color="#c7d6ee" metalness={0.6} roughness={0.35} />
        </mesh>
        <mesh position={[-0.24, 0, 0]}>
          <planeGeometry args={[0.26, 0.12]} />
          <meshStandardMaterial color={VIOLET} emissive={VIOLET} emissiveIntensity={0.6} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0.24, 0, 0]}>
          <planeGeometry args={[0.26, 0.12]} />
          <meshStandardMaterial color={VIOLET} emissive={VIOLET} emissiveIntensity={0.6} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

/* ---------- a planet ---------- */
function Planet({ def, onSelect, registerBody, showLabel }) {
  const orbitRef = useRef();
  const holderRef = useRef();
  const spinRef = useRef();
  const scaleRef = useRef();
  const pathRef = useRef();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    registerBody(def.id, holderRef.current);
  }, [def.id, registerBody]);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : '';
    return () => { document.body.style.cursor = ''; };
  }, [hovered]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (orbitRef.current) orbitRef.current.rotation.y = def.phase + t * def.speed;
    if (spinRef.current) spinRef.current.rotation.y += delta * 0.22;
    if (scaleRef.current) {
      const s = THREE.MathUtils.damp(scaleRef.current.scale.x, hovered ? 1.16 : 1, 6, delta);
      scaleRef.current.scale.setScalar(s);
    }
    if (pathRef.current) {
      pathRef.current.material.opacity = THREE.MathUtils.damp(
        pathRef.current.material.opacity,
        hovered ? 0.5 : 0.16,
        5,
        delta
      );
    }
  });

  return (
    <group rotation={def.incl}>
      {/* orbit path — faint, brightens when its planet is hovered */}
      <mesh ref={pathRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[def.orbit - 0.02, def.orbit + 0.02, 160]} />
        <meshBasicMaterial color={def.color} transparent opacity={0.16} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <group ref={orbitRef}>
        {/* glowing trail arc behind the planet */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[def.orbit, 0.035, 8, 64, 0.85]} />
          <meshBasicMaterial color={def.color} transparent opacity={0.3} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
        <group ref={holderRef} position={[def.orbit, 0, 0]}>
          <group
            ref={scaleRef}
            onClick={(e) => { e.stopPropagation(); if (e.delta < 8) onSelect(def.id); }}
            onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
            onPointerOut={() => setHovered(false)}
          >
            <group ref={spinRef}>
              <mesh>
                <icosahedronGeometry args={[def.radius, 2]} />
                <meshStandardMaterial color={def.color} flatShading roughness={0.55} metalness={0.12} emissive={def.color} emissiveIntensity={0.1} />
              </mesh>
            </group>
            {/* tight rim light + wider atmosphere halo */}
            <mesh scale={1.07}>
              <sphereGeometry args={[def.radius, 32, 32]} />
              <meshBasicMaterial color="#dff0ff" transparent opacity={hovered ? 0.16 : 0.09} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
            </mesh>
            <mesh scale={1.25}>
              <sphereGeometry args={[def.radius, 32, 32]} />
              <meshBasicMaterial color={def.color} transparent opacity={hovered ? 0.24 : 0.14} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
            </mesh>
            {def.feature === 'chip' && <ChipFeature radius={def.radius} />}
            {def.feature === 'ring-moons' && <RingMoonsFeature radius={def.radius} color={def.color} />}
            {def.feature === 'atom' && <AtomFeature radius={def.radius} />}
            {def.feature === 'milestones' && <MilestonesFeature radius={def.radius} />}
            {def.feature === 'satellite' && <SatelliteFeature radius={def.radius} />}
          </group>
          {showLabel && (
            <Html center position={[0, def.radius * 2.4, 0]} distanceFactor={22} zIndexRange={[3, 0]}>
              <div className={`planet-label ${hovered ? 'planet-label-hot' : ''}`}>{def.label}</div>
            </Html>
          )}
        </group>
      </group>
    </group>
  );
}

/* ---------- root ---------- */
export default function SolarSystem({ active, onSelect }) {
  const activeRef = useRef(active);
  activeRef.current = active;
  const bodiesRef = useRef({});
  const drag = useRef({ x: 0, y: 0 });

  const registerBody = useCallback((id, obj) => {
    bodiesRef.current[id] = obj;
  }, []);

  // drag-to-orbit in overview mode
  useEffect(() => {
    let down = false;
    let sx = 0;
    let sy = 0;
    const onDown = (e) => {
      if (activeRef.current) return;
      if (!(e.target instanceof HTMLCanvasElement)) return;
      down = true;
      sx = e.clientX;
      sy = e.clientY;
    };
    const onMove = (e) => {
      if (!down) return;
      const dx = e.clientX - sx;
      const dy = e.clientY - sy;
      sx = e.clientX;
      sy = e.clientY;
      drag.current.x -= dx * 0.0042;
      drag.current.y = THREE.MathUtils.clamp(drag.current.y + dy * 0.0024, -0.24, 0.4);
    };
    const onUp = () => { down = false; };
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  const mobile = isMobile();
  const showLabels = !active;

  return (
    <div className="solar-bg">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [10, 12, 26], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.2} color="#4a5f8a" />
        <hemisphereLight args={['#7ea2d8', '#0a0f1e', 0.3]} />
        <CameraRig activeRef={activeRef} bodiesRef={bodiesRef} drag={drag} />
        <Starfield />
        <Nebula />
        <Sun onSelect={onSelect} showLabel={showLabels} focused={active === 'home'} />
        {PLANETS.map((def) => (
          <Planet key={def.id} def={def} onSelect={onSelect} registerBody={registerBody} showLabel={showLabels} />
        ))}
        {!mobile && (
          <EffectComposer disableNormalPass>
            <Bloom mipmapBlur intensity={0.5} luminanceThreshold={0.42} luminanceSmoothing={0.25} />
          </EffectComposer>
        )}
      </Canvas>
      <div className="solar-vignette" />
    </div>
  );
}
