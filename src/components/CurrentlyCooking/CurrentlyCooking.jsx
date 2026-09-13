import { CURRENT_PROJECT } from '../../data/portfolioData';
import LiquidGlassCard from '../LiquidGlass/LiquidGlassCard';
import styles from './CurrentlyCooking.module.css';

export default function CurrentlyCooking() {
  return (
    <section id="current" className={styles.currentSection}>
      <div className="container">
        <div>
          <div className="section-tag">what I'm building now</div>
          <h2 className="section-title">
            Currently <span className="gradient-text">Cooking</span>
          </h2>
        </div>

        <LiquidGlassCard className={styles.currentCard}>
          <div className={styles.currentBadge}>
            <span className={styles.dot} /> {CURRENT_PROJECT.badge}
          </div>

          <h3 className={styles.currentTitle}>{CURRENT_PROJECT.title}</h3>
          <p className={styles.currentDesc}>{CURRENT_PROJECT.description}</p>

          <div className={styles.progressContainer}>
            {CURRENT_PROJECT.progress.map((item, i) => (
              <div key={i} className={styles.progressSection}>
                <div className={styles.progressLabel}>
                  <span>{item.label}</span>
                  <span>{item.percent}%</span>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className={styles.currentFeatures}>
            {CURRENT_PROJECT.features.map((feat, i) => {
              const statusClass =
                feat.status === 'done'
                  ? styles.chipDone
                  : feat.status === 'wip'
                  ? styles.chipWip
                  : styles.chipTodo;
              const statusSymbol =
                feat.status === 'done'
                  ? '[DONE]'
                  : feat.status === 'wip'
                  ? '[WIP]'
                  : '[TODO]';
              return (
                <div key={i} className={`${styles.featureChip} ${statusClass}`}>
                  <span className={styles.featureSymbol}>{statusSymbol}</span> {feat.name}
                </div>
              );
            })}
          </div>
        </LiquidGlassCard>
      </div>
    </section>
  );
}
