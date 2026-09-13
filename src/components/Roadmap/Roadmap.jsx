import { ROADMAP } from '../../data/portfolioData';
import styles from './Roadmap.module.css';

export default function Roadmap() {
  return (
    <section id="nextsteps" className={styles.roadmapSection}>
      <div className="container">
        <div>
          <div className="section-tag">roadmap</div>
          <h2 className="section-title">
            What's <span className="gradient-text">Next</span>
          </h2>
          <p className="section-sub">
            The goals I'm actively working towards in the next chapter.
          </p>
        </div>

        <div className={styles.stepsGrid}>
          {ROADMAP.map((step, i) => (
            <div key={i} className={styles.stepCard}>
              <div className={styles.stepNum}>{step.num}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
