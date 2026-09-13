import { useState, useEffect, useRef } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import styles from './Skills.module.css';

const CAPABILITIES = [
  {
    domain: '01 / GRAPHICS & REAL-TIME 3D',
    focus: 'Direct GPU execution & shader pipelines',
    technologies: [
      { name: 'Three.js / R3F', spec: 'Scene graphs & lighting', level: 94 },
      { name: 'WebGL 2.0 & GLSL', spec: 'Custom procedural shaders', level: 90 },
      { name: 'Canvas 2D API', spec: 'High-frequency physics loops', level: 92 },
      { name: 'Procedural Geometry', spec: 'Simplex noise & mesh deformation', level: 88 }
    ]
  },
  {
    domain: '02 / ARCHITECTURE & SYSTEMS',
    focus: 'Low-latency state & full-stack scalability',
    technologies: [
      { name: 'React 19 & Next.js', spec: 'Server Components & streaming', level: 95 },
      { name: 'TypeScript', spec: 'Strict type invariants', level: 92 },
      { name: 'WebRTC & CRDTs', spec: 'Peer-to-peer real-time sync', level: 86 },
      { name: 'Node.js & Edge APIs', spec: 'High-concurrency microservices', level: 89 }
    ]
  },
  {
    domain: '03 / PERFORMANCE & RUNTIMES',
    focus: 'Zero-overhead compilers & execution speed',
    technologies: [
      { name: 'Rust & WebAssembly', spec: 'Near-native browser compute', level: 85 },
      { name: 'Web Workers & Offscreen', spec: 'Multi-threaded client architecture', level: 91 },
      { name: 'Vite & Rolldown', spec: 'Sub-second bundling pipeline', level: 94 },
      { name: 'Strict Memory Profiling', spec: 'Zero-leak garbage collection', level: 89 }
    ]
  }
];

function TechItem({ tech }) {
  const [filled, setFilled] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFilled(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={itemRef} className={styles.techRow}>
      <div className={styles.techMain}>
        <span className={styles.techIndicator} />
        <span className={styles.techName}>{tech.name}</span>
      </div>
      <span className={styles.techSpec}>{tech.spec}</span>
      <div className={styles.meterTrack}>
        <div
          className={styles.meterFill}
          style={{ width: filled ? `${tech.level}%` : '0%' }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useScrollReveal();

  return (
    <section id="skills" ref={sectionRef} className={styles.skillsSection}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={`${styles.sectionTag} reveal-on-scroll`}>
            [ 04 // ENGINEERING CAPABILITIES ]
          </div>
          <h2 className={`${styles.sectionTitle} reveal-on-scroll stagger-1`}>
            Technical Radar &amp; <span className={styles.gradientTitle}>Execution Matrix</span>
          </h2>
          <p className={`${styles.sectionSub} reveal-on-scroll stagger-2`}>
            Disciplines and technical toolchains refined through thousands of commits,
            production deployments, and open-source contributions.
          </p>
        </div>

        {/* 3-Domain Architectural Matrix */}
        <div className={styles.matrixGrid}>
          {CAPABILITIES.map((cap, i) => (
            <div
              key={i}
              className={`${styles.domainCard} reveal-on-scroll stagger-${i + 1}`}
            >
              <div className={styles.domainHeader}>
                <span className={styles.domainIndex}>{cap.domain}</span>
                <p className={styles.domainFocus}>{cap.focus}</p>
              </div>

              <div className={styles.techList}>
                {cap.technologies.map((tech, tIdx) => (
                  <TechItem key={tIdx} tech={tech} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
