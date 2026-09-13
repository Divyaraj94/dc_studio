import useScrollReveal from '../../hooks/useScrollReveal';
import styles from './About.module.css';

const PILLARS = [
  {
    index: '01',
    title: 'Real-Time Graphics & Shaders',
    desc: 'Designing custom GLSL vertex and fragment shaders, procedural geometry, and deterministic WebGL render loops that sustain 60–120 FPS without thermal throttling.'
  },
  {
    index: '02',
    title: 'Distributed Systems & CRDTs',
    desc: 'Architecting peer-to-peer data synchronization, low-latency WebRTC channels, and Conflict-Free Replicated Data Types for instantaneous collaborative canvases.'
  },
  {
    index: '03',
    title: 'Radical Open-Source Ecology',
    desc: 'Engineering transparent public tooling and developer libraries that reduce prototype latency for thousands of independent builders around the world.'
  }
];

export default function About() {
  const sectionRef = useScrollReveal();

  return (
    <section id="about" ref={sectionRef} className={styles.aboutSection}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={`${styles.sectionTag} reveal-on-scroll`}>
            [ 02 // TECHNICAL PHILOSOPHY ]
          </div>
          <h2 className={`${styles.sectionTitle} reveal-on-scroll stagger-1`}>
            Built for uncompromising performance, <br />
            <span className={styles.gradientTitle}>tactile craft &amp; open systems.</span>
          </h2>
        </div>

        <div className={styles.aboutGrid}>
          {/* Left Column: Authoritative Editorial Statement */}
          <div className={`${styles.statementCol} reveal-on-scroll stagger-2`}>
            <p className={styles.leadText}>
              The highest expression of software engineering exists at the convergence
              of computational rigor and visceral aesthetic design.
            </p>

            <p className={styles.bodyText}>
              Too much of the modern web is bloated with layers of speculative abstraction.
              My methodology is rooted in first principles: direct GPU execution, zero-cost
              runtime overhead, and micro-interactions calibrated to human sensory perception.
            </p>

            <div className={styles.benchmarkBox}>
              <div className={styles.benchmarkItem}>
                <span className={styles.benchmarkLabel}>FRAME TARGET</span>
                <span className={styles.benchmarkValue}>60–120 FPS</span>
              </div>
              <div className={styles.benchmarkItem}>
                <span className={styles.benchmarkLabel}>BUNDLE POLICY</span>
                <span className={styles.benchmarkValue}>STRICT MINIMALISM</span>
              </div>
              <div className={styles.benchmarkItem}>
                <span className={styles.benchmarkLabel}>GOVERNANCE</span>
                <span className={styles.benchmarkValue}>OPEN BY DEFAULT</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Architectural Pillars */}
          <div className={styles.pillarsCol}>
            {PILLARS.map((pillar, i) => (
              <div
                key={i}
                className={`${styles.pillarCard} reveal-on-scroll stagger-${i + 1}`}
              >
                <div className={styles.pillarIndex}>PILLAR // {pillar.index}</div>
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                <p className={styles.pillarDesc}>{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
