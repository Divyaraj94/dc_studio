import { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import styles from './LiquidGlassCore.module.css';

function LiquidCoreMesh({ isHovered, isWireframe, isChromatic, pulseTrigger }) {
  const outerRef = useRef();
  const innerRef = useRef();
  const ringRef = useRef();
  const pulseRef = useRef(0);

  // Trigger pulse effect
  useEffect(() => {
    if (pulseTrigger > 0) {
      pulseRef.current = 1.0;
    }
  }, [pulseTrigger]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const { x, y } = state.pointer;

    // Decay pulse back to 0
    if (pulseRef.current > 0.01) {
      pulseRef.current -= delta * 1.5;
    } else {
      pulseRef.current = 0;
    }

    const pulseBoost = pulseRef.current * 2.5;

    // Smooth rotation influenced by pointer and pulse
    if (outerRef.current) {
      outerRef.current.rotation.x = t * (0.2 + pulseBoost) + y * 0.4;
      outerRef.current.rotation.y = t * (0.3 + pulseBoost) + x * 0.4;
      outerRef.current.scale.setScalar(1 + pulseRef.current * 0.25);
    }

    if (innerRef.current) {
      innerRef.current.rotation.x = -t * (0.35 + pulseBoost);
      innerRef.current.rotation.y = -t * (0.25 + pulseBoost);
      innerRef.current.rotation.z = t * 0.15;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.15;
      ringRef.current.rotation.x = 1.1 + y * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.2}>
      <group>
        {/* Orbital Hairline Wire Ring */}
        <mesh ref={ringRef}>
          <ringGeometry args={[2.3, 2.32, 64]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Outer Chromatic Liquid Glass Icosahedron */}
        <mesh ref={outerRef}>
          <icosahedronGeometry args={[1.7, 1]} />
          {isWireframe ? (
            <meshStandardMaterial
              color="#38bdf8"
              wireframe
              emissive="#0284c7"
              emissiveIntensity={1.2}
              roughness={0.1}
            />
          ) : (
            <MeshTransmissionMaterial
              backside
              samples={6}
              resolution={512}
              transmission={0.94}
              roughness={isChromatic ? 0.02 : 0.06}
              thickness={1.4}
              ior={isChromatic ? 1.75 : 1.52}
              chromaticAberration={isChromatic ? 0.28 : 0.08}
              anisotropy={0.2}
              distortion={isChromatic ? 0.65 : 0.3}
              distortionScale={0.4}
              temporalDistortion={0.15}
              color="#e0f2fe"
              attenuationDistance={1.2}
              attenuationColor="#38bdf8"
            />
          )}
        </mesh>

        {/* Inner Geometric Wireframe Core */}
        <mesh ref={innerRef}>
          <octahedronGeometry args={[0.95, 0]} />
          <meshStandardMaterial
            color="#38bdf8"
            wireframe
            emissive="#38bdf8"
            emissiveIntensity={1.6}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Dynamic Studio Lighting */}
        <pointLight position={[3, 3, 3]} intensity={5} color="#ffffff" />
        <pointLight position={[-3, -3, -2]} intensity={4} color="#38bdf8" />
        <pointLight position={[0, 0, 0]} intensity={2.5} color="#818cf8" distance={4} />
      </group>
    </Float>
  );
}

function OrbitalDust() {
  const pointsRef = useRef();

  const [positions] = useMemo(() => {
    const count = 180;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      const radius = 2.4 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      pos[i] = radius * Math.cos(theta) * Math.cos(phi);
      pos[i + 1] = radius * Math.sin(phi);
      pos[i + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }
    return [pos];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#7dd3fc"
        transparent
        opacity={0.65}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function LiquidGlassCore() {
  const [isHovered, setIsHovered] = useState(false);
  const [isWireframe, setIsWireframe] = useState(false);
  const [isChromatic, setIsChromatic] = useState(false);
  const [pulseTrigger, setPulseTrigger] = useState(0);

  const handlePulse = (e) => {
    e.stopPropagation();
    setPulseTrigger((prev) => prev + 1);
  };

  return (
    <div
      className={styles.coreContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handlePulse}
      title="Click core to pulse ripple"
    >
      {/* 3D WebGL Canvas */}
      <div className={styles.canvasWrap}>
        <Canvas
          camera={{ position: [0, 0, 5.2], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.6} />
          <LiquidCoreMesh
            isHovered={isHovered}
            isWireframe={isWireframe}
            isChromatic={isChromatic}
            pulseTrigger={pulseTrigger}
          />
          <OrbitalDust />
        </Canvas>
      </div>

      {/* Sleek Architectural Telemetry Overlays */}
      <div className={styles.telemetryTagTop}>
        <span className={styles.pulseDot} />
        <span>CORE // GLSL &middot; R3F</span>
      </div>

      {/* Interactive Controls Bar */}
      <div className={styles.controlsBar}>
        <button
          type="button"
          className={`${styles.controlBtn} ${isWireframe ? styles.controlBtnActive : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setIsWireframe((prev) => !prev);
          }}
        >
          {isWireframe ? '[ WIREFRAME: ON ]' : '[ WIREFRAME ]'}
        </button>
        <button
          type="button"
          className={`${styles.controlBtn} ${isChromatic ? styles.controlBtnActive : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setIsChromatic((prev) => !prev);
          }}
        >
          {isChromatic ? '[ DISPERSION: 2X ]' : '[ DISPERSION ]'}
        </button>
        <button
          type="button"
          className={styles.controlBtn}
          onClick={handlePulse}
        >
          [ PULSE RIPPLE ]
        </button>
      </div>

      <div className={styles.telemetryTagBottom}>
        <span>CLICK TO DISRUPT</span>
      </div>
    </div>
  );
}
