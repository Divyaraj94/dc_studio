import { useState } from 'react';
import { PROFILE } from '../../data/portfolioData';
import LiquidGlassButton from '../LiquidGlass/LiquidGlassButton';
import ContactModal from './ContactModal';
import useScrollReveal from '../../hooks/useScrollReveal';
import styles from './Contact.module.css';

export default function Contact({ onShowToast }) {
  const [showModal, setShowModal] = useState(false);
  const sectionRef = useScrollReveal();

  const handleCopyDirectEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    if (onShowToast) {
      onShowToast(`COPIED DIRECT EMAIL // ${PROFILE.email}`);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className={styles.contactSection}>
      <div className="container">
        <div className={styles.contactInner}>
          {/* Section Tag */}
          <div className={`${styles.sectionTag} reveal-on-scroll`}>
            [ 05 // INITIATE COLLABORATION ]
          </div>

          <h2 className={`${styles.contactTitle} reveal-on-scroll stagger-1`}>
            Let's build the <br />
            <span className={styles.gradientTitle}>next standard together.</span>
          </h2>

          <p className={`${styles.contactSub} reveal-on-scroll stagger-2`}>
            Available for select advisory, high-impact creative engineering commissions,
            and transformative open-source partnerships.
          </p>

          {/* Large Magnetic Action Row */}
          <div className={`${styles.actionRow} reveal-on-scroll stagger-3`}>
            <LiquidGlassButton
              onClick={() => setShowModal(true)}
              id="contact-cta"
            >
              Transmit Brief Console [↗]
            </LiquidGlassButton>

            <button
              type="button"
              onClick={handleCopyDirectEmail}
              className={styles.copyDirectBtn}
              id="copy-email-btn"
            >
              Copy Direct Email [⎘]
            </button>

            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer noopener"
              className={styles.secondaryLink}
              id="contact-github"
            >
              GitHub Ecosystem [↗]
            </a>
          </div>

          {/* Telemetry Footer Grid */}
          <div className={`${styles.telemetryGrid} reveal-on-scroll stagger-4`}>
            <div className={styles.telemetryCard}>
              <span className={styles.telemetryLabel}>LOCATION &amp; ZONE</span>
              <span className={styles.telemetryValue}>NEW YORK // UTC-5 [EST]</span>
            </div>
            <div className={styles.telemetryCard}>
              <span className={styles.telemetryLabel}>AVAILABILITY</span>
              <span className={styles.telemetryValue}>Q3–Q4 2026 ENGAGEMENTS</span>
            </div>
            <div className={styles.telemetryCard}>
              <span className={styles.telemetryLabel}>RESPONSE LATENCY</span>
              <span className={styles.telemetryValue}>&lt; 24 HOURS DIRECT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Collaboration Modal */}
      {showModal && (
        <ContactModal
          onClose={() => setShowModal(false)}
          onShowToast={onShowToast}
        />
      )}
    </section>
  );
}
