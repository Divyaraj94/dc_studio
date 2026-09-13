import { useState, useEffect, useRef } from 'react';
import styles from './Preloader.module.css';

const DISCIPLINES = [
  'CREATIVE TECHNOLOGIST',
  'SYSTEMS ARCHITECT',
  'OPEN-SOURCE CONTRIBUTOR',
  'DIGITAL CRAFTSMAN'
];

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [disciplineIndex, setDisciplineIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080
  });

  const exitTimeoutRef = useRef(null);

  // Resize telemetry tracking
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth ease-out countdown physics
  useEffect(() => {
    let current = 0;
    const duration = 2200; // 2.2s total intro
    const startTime = performance.now();

    const updateCounter = (now) => {
      const elapsed = now - startTime;
      const progressFraction = Math.min(elapsed / duration, 1);

      // Ease-out cubic curve
      const eased = 1 - Math.pow(1 - progressFraction, 3);
      current = Math.min(Math.round(eased * 100), 100);
      setProgress(current);

      if (progressFraction < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        triggerExit();
      }
    };

    const animId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Kinetic rotating discipline text
  useEffect(() => {
    const interval = setInterval(() => {
      setDisciplineIndex((prev) => (prev + 1) % DISCIPLINES.length);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  // Trigger cinematic exit animation
  const triggerExit = () => {
    setIsExiting(true);
  };

  // Call onComplete after exit animation finishes
  useEffect(() => {
    if (!isExiting) return;
    const timer = setTimeout(() => {
      onComplete();
    }, 850);
    return () => clearTimeout(timer);
  }, [isExiting, onComplete]);

  // Keyboard shortcut: Escape or Enter skips intro
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        triggerExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const formattedProgress = progress < 10 ? `0${progress}` : `${progress}`;

  return (
    <div
      className={`${styles.preloaderRoot} ${isExiting ? styles.exiting : ''}`}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      {/* Top and Bottom Split Curtains */}
      <div className={`${styles.curtain} ${styles.curtainTop}`} />
      <div className={`${styles.curtain} ${styles.curtainBottom}`} />

      {/* Subtle Procedural Film Grain Overlay */}
      <div className={styles.grainOverlay} aria-hidden="true" />

      {/* Preloader Content Container */}
      <div className={styles.contentContainer}>
        {/* Top Architectural Header */}
        <header className={styles.topBar}>
          <div className={styles.brandBadge}>
            <span className={styles.brandDot} />
            <span className={styles.brandTitle}>DC // PORTFOLIO ©2026</span>
          </div>
          <div className={styles.editionTag}>
            EDITION 04.2 / VERIFIED
          </div>
          <button
            onClick={triggerExit}
            className={styles.skipBtn}
            title="Press ESC to enter"
          >
            SKIP [ESC]
          </button>
        </header>

        {/* Center Stage: Kinetic Number & Discipline Carousel */}
        <div className={styles.centerStage}>
          <div className={styles.counterWrapper}>
            <span className={styles.counterNumber}>{formattedProgress}</span>
            <span className={styles.counterPercent}>%</span>
          </div>

          {/* Masked Kinetic Discipline Text */}
          <div className={styles.disciplineMask}>
            <div
              className={styles.disciplineSlider}
              style={{ transform: `translateY(-${disciplineIndex * 28}px)` }}
            >
              {DISCIPLINES.map((item, idx) => (
                <div key={idx} className={styles.disciplineItem}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* 1px Architectural Hairline Progress Tracker */}
          <div className={styles.trackerContainer}>
            <div className={styles.trackerTrack}>
              <div
                className={styles.trackerFill}
                style={{ width: `${progress}%` }}
              >
                <span className={styles.trackerNeedle} />
              </div>
            </div>
            <div className={styles.trackerMeta}>
              <span>CALIBRATION</span>
              <span>{progress}% READY</span>
            </div>
          </div>
        </div>

        {/* Bottom Architectural Telemetry Footer */}
        <footer className={styles.bottomBar}>
          <div className={styles.telemetryItem}>
            VIEWPORT: {dimensions.width} × {dimensions.height}
          </div>
          <div className={styles.statusIndicator}>
            <span className={styles.statusPulse} />
            <span>
              {progress < 40
                ? 'INITIALIZING CORE MODULES...'
                : progress < 80
                ? 'CALIBRATING 3D SHADER PIPELINE...'
                : 'SYNCHRONIZING REPOSITORIES...'}
            </span>
          </div>
          <div className={styles.telemetryItem}>
            60 FPS // R3F & WEBGL
          </div>
        </footer>
      </div>
    </div>
  );
}
