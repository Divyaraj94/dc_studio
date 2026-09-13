import { TESTIMONIALS } from '../../data/portfolioData';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  return (
    <section id="testimonials" className={styles.testimonialsSection}>
      <div className="container">
        <div>
          <div className="section-tag">kind words</div>
          <h2 className="section-title">
            What People <span className="gradient-text">Say</span>
          </h2>
        </div>

        <div className={styles.testimonialsGrid}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className={styles.testimonialCard}>
              <div className={styles.testimonialQuote}>&ldquo;</div>
              <p className={styles.testimonialText}>{t.quote}</p>
              <div className={styles.testimonialAuthor}>
                <div
                  className={styles.authorAvatar}
                  style={{ background: t.gradient }}
                >
                  {t.initial}
                </div>
                <div>
                  <div className={styles.authorName}>{t.author}</div>
                  <div className={styles.authorRole}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
