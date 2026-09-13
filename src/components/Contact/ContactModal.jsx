import { useState, useEffect } from 'react';
import { PROFILE } from '../../data/portfolioData';
import styles from './ContactModal.module.css';

const SCOPES = [
  '3D WebGL / Real-Time Graphics',
  'Rust / Systems Architecture',
  'High-Scale Platform & WebRTC',
  'Strategic Advisory / Code Audit'
];

const BUDGETS = [
  '$10k — $25k // Sprint',
  '$25k — $50k // Flagship',
  '$50k+ // Enterprise Systems',
  'Advisory Retainer'
];

export default function ContactModal({ onClose, onShowToast }) {
  const [selectedScope, setSelectedScope] = useState(SCOPES[0]);
  const [selectedBudget, setSelectedBudget] = useState(BUDGETS[1]);
  const [senderEmail, setSenderEmail] = useState('');
  const [briefDetails, setBriefDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    if (onShowToast) {
      onShowToast(`COPIED // ${PROFILE.email}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate verified dispatch handshake
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onShowToast) {
        onShowToast('TRANSMISSION DISPATCHED TO DC DIRECT');
      }
    }, 1000);
  };

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.modalMeta}>
            <span className={styles.statusDot} />
            <span className={styles.modalTag}>COLLABORATION DISPATCH // DIRECT TERMINAL</span>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close modal"
          >
            [ ESC ]
          </button>
        </div>

        {/* Content */}
        {isSubmitted ? (
          <div className={styles.successScreen}>
            <div className={styles.successIcon}>✓</div>
            <h3 className={styles.successTitle}>TRANSMISSION SECURED</h3>
            <p className={styles.successDesc}>
              Your project brief has been encoded and forwarded to DC directly. Expect an architectural response within 24 hours.
            </p>
            <button
              type="button"
              className={styles.submitBtn}
              onClick={onClose}
              style={{ marginTop: '16px' }}
            >
              Close Dispatch Console
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.modalBody}>
            {/* Scope Selection */}
            <div className={styles.formSection}>
              <label className={styles.sectionLabel}>01 // ENGAGEMENT SCOPE</label>
              <div className={styles.chipGroup}>
                {SCOPES.map((scope) => (
                  <button
                    key={scope}
                    type="button"
                    className={`${styles.chipBtn} ${selectedScope === scope ? styles.chipBtnActive : ''}`}
                    onClick={() => setSelectedScope(scope)}
                  >
                    {scope}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget / Horizon Tier */}
            <div className={styles.formSection}>
              <label className={styles.sectionLabel}>02 // BUDGET &amp; HORIZON TIER</label>
              <div className={styles.chipGroup}>
                {BUDGETS.map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    className={`${styles.chipBtn} ${selectedBudget === tier ? styles.chipBtnActive : ''}`}
                    onClick={() => setSelectedBudget(tier)}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            {/* Email & Details */}
            <div className={styles.formSection}>
              <label className={styles.sectionLabel} htmlFor="sender-email">
                03 // YOUR DIRECT CONTACT EMAIL
              </label>
              <input
                id="sender-email"
                type="email"
                required
                placeholder="founder@studio.com"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                className={styles.inputField}
              />
            </div>

            <div className={styles.formSection}>
              <label className={styles.sectionLabel} htmlFor="brief-details">
                04 // PROJECT OVERVIEW OR CORE OBJECTIVE
              </label>
              <textarea
                id="brief-details"
                required
                placeholder="Outline the technical challenges, architecture requirements, or timeline expectations..."
                value={briefDetails}
                onChange={(e) => setBriefDetails(e.target.value)}
                className={styles.textArea}
              />
            </div>

            {/* Actions */}
            <div className={styles.actionsRow}>
              <div className={styles.directEmailWrap}>
                <span className={styles.directEmailText}>{PROFILE.email}</span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={styles.copyEmailBtn}
                >
                  [ COPY EMAIL ]
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitBtn}
              >
                {isSubmitting ? 'ENCODING DISPATCH...' : 'TRANSMIT BRIEF [↗]'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
