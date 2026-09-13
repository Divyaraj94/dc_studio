import { WRITING } from '../../data/content';
import styles from './Writing.module.css';

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={styles.arrowIcon}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function Writing() {
  return (
    <section id="writing" className={styles.section} aria-label="Selected articles">
      <div className={styles.stickyHeader}>
        <h2 className={styles.headerText}>Writing</h2>
      </div>

      <ol className={styles.list}>
        {WRITING.map((article, i) => (
          <li key={i} className={styles.item}>
            <a
              className={styles.card}
              href={article.url}
              target={article.url !== '#' ? '_blank' : undefined}
              rel={article.url !== '#' ? 'noreferrer noopener' : undefined}
              aria-label={article.title}
            >
              <div className={styles.cardBg} aria-hidden="true" />
              <header className={styles.date}>
                {article.date}
              </header>
              <div className={styles.details}>
                <h3 className={styles.title}>
                  <span>{article.title}</span>
                  <ArrowIcon />
                </h3>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
