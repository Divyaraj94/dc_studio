import { EXPERIENCE } from '../../data/portfolioData';
import useScrollReveal from '../../hooks/useScrollReveal';
import styles from './Experience.module.css';

export default function Experience() {
  const sectionRef = useScrollReveal();

  return (
    <section id="experience" ref={sectionRef} className={styles.experienceSection}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={`${styles.sectionTag} reveal-on-scroll`}>
            [ 03 // CAREER TRAJECTORY &amp; IMPACT ]
          </div>
          <h2 className={`${styles.sectionTitle} reveal-on-scroll stagger-1`}>
            Engineering Leadership &amp; <span className={styles.gradientTitle}>Track Record</span>
          </h2>
          <p className={`${styles.sectionSub} reveal-on-scroll stagger-2`}>
            Previous roles, open-source initiatives, and infrastructure milestones
            spanning distributed web systems, 3D graphics, and developer tools.
          </p>
        </div>

        {/* Architectural Timeline Grid */}
        <div className={styles.ledgerList}>
          {EXPERIENCE.map((item, i) => (
            <div
              key={i}
              className={`${styles.ledgerItem} reveal-on-scroll stagger-${i + 1}`}
            >
              {/* Left Meta Column */}
              <div className={styles.metaCol}>
                <span className={styles.periodBadge}>{item.period}</span>
                {item.highlight && (
                  <span className={styles.highlightTag}>{item.highlight}</span>
                )}
              </div>

              {/* Center Content Column */}
              <div className={styles.contentCol}>
                <h3 className={styles.roleTitle}>{item.role}</h3>
                <div className={styles.companyName}>{item.company}</div>
                <p className={styles.roleDesc}>{item.desc}</p>

                {/* Tech Chips */}
                {item.tags && (
                  <div className={styles.tagRow}>
                    {item.tags.map((tag, tIdx) => (
                      <span key={tIdx} className={styles.techTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
