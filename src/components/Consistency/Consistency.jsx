import { useMemo } from 'react';
import styles from './Consistency.module.css';

export default function Consistency() {
  const cells = useMemo(() => {
    const arr = [];
    for (let week = 0; week < 52; week++) {
      for (let day = 0; day < 7; day++) {
        // Deterministic realistic pattern
        const isWeekday = day > 0 && day < 6;
        const season = Math.sin((week / 52) * Math.PI * 2) * 0.15;
        const seed = (week * 7 + day * 13) % 100 / 100;
        const threshold = isWeekday ? 0.35 + season : 0.6 + season;

        let level = 0;
        if (seed > threshold) {
          const intensity = ((week * 17 + day * 31) % 100) / 100;
          if (intensity > 0.75) level = 4;
          else if (intensity > 0.5) level = 3;
          else if (intensity > 0.25) level = 2;
          else level = 1;
        }
        arr.push({ id: `${week}-${day}`, level });
      }
    }
    return arr;
  }, []);

  return (
    <section id="consistency" className={styles.consistencySection}>
      <div className="container">
        <div>
          <div className="section-tag">consistency</div>
          <h2 className="section-title">
            Showing Up <span className="gradient-text">Every Day</span>
          </h2>
          <p className="section-sub">Code is a muscle. I train it daily.</p>
        </div>

        <div className={styles.streakCard}>
          <div className={styles.streakNums}>
            <div className={styles.statItem}>
              <div className={`${styles.streakNum} ${styles.purple}`}>247</div>
              <div className={styles.streakLabel}>Current Streak</div>
            </div>
            <div className={styles.statItem}>
              <div className={`${styles.streakNum} ${styles.cyan}`}>312</div>
              <div className={styles.streakLabel}>Longest Streak</div>
            </div>
            <div className={styles.statItem}>
              <div className={`${styles.streakNum} ${styles.orange}`}>1,247</div>
              <div className={styles.streakLabel}>Total Contributions</div>
            </div>
          </div>

          <p className={styles.gridCaption}>
            // contribution activity — last 12 months
          </p>

          <div className={styles.contribGrid}>
            {cells.map((c) => (
              <div
                key={c.id}
                className={`${styles.contribCell} ${
                  c.level ? styles[`level${c.level}`] : ''
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
