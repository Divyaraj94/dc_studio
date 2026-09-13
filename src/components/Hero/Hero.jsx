import { PROFILE } from '../../data/portfolioData';
import CyberScene from '../ThreeCanvas/CyberScene';
import HeroAvatar from './HeroAvatar';
import LiquidGlassButton from '../LiquidGlass/LiquidGlassButton';
import useAnimatedCounter from '../../hooks/useAnimatedCounter';
import useScrollReveal from '../../hooks/useScrollReveal';
import styles from './Hero.module.css';

function StatItem({ stat, index }) {
  const [ref, displayValue] = useAnimatedCounter(stat.num, 1800);

  return (
    <div
      ref={ref}
      className={`${styles.statCell} reveal-on-scroll stagger-${index + 1}`}
    >
      <div className={styles.statNum}>{displayValue}</div>
      <div className={styles.statLabel}>{stat.label}</div>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useScrollReveal();

  return (
    <section id="hero" ref={sectionRef} className={styles.heroSection}>
      {/* Particle Background with globe removed */}
      <CyberScene />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className={styles.heroInner}>
          {/* Left Column: Authoritative Editorial Copy */}
          <div className={styles.heroContent}>
            <div className={`${styles.heroBadge} reveal-on-scroll`}>
              <span className={styles.statusDot} />
              <span>AVAILABLE FOR SELECT CLIENTS &amp; OSS // 2026</span>
            </div>

            <h1 className={`${styles.heroTitle} reveal-on-scroll stagger-1`}>
              Engineering digital experiences at the intersection of{' '}
              <span className={styles.gradientText}>design, code &amp; real-time 3D.</span>
            </h1>

            <p className={`${styles.heroTagline} reveal-on-scroll stagger-2`}>
              I'm <strong>{PROFILE.name}</strong> — Creative Technologist &amp; Systems Architect.
              Building high-throughput open-source frameworks, interactive WebGL tools, and bespoke digital platforms engineered for scale.
            </p>

            <div className={`${styles.heroBtns} reveal-on-scroll stagger-3`}>
              <LiquidGlassButton href="#projects" id="hero-view-work">
                Explore Selected Works
              </LiquidGlassButton>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.secondaryBtn}
                id="hero-github"
              >
                GitHub Repositories [↗]
              </a>
            </div>

            {/* Architectural Telemetry Metrics Grid with Animated Number Roll-ups */}
            <div className={styles.heroStats}>
              {PROFILE.stats.map((stat, i) => (
                <StatItem key={i} stat={stat} index={i} />
              ))}
            </div>
          </div>

          {/* Right Column: Restored Circular Avatar with Orbital Rings & Floating Badges */}
          <div className={`${styles.heroVisual} reveal-scale stagger-2`}>
            <HeroAvatar />
          </div>
        </div>
      </div>
    </section>
  );
}


