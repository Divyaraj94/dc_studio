import { PROFILE, NAV_ITEMS } from '../../data/content';
import styles from './Sidebar.module.css';

export default function Sidebar({ activeSection }) {
  return (
    <header className={styles.sidebar}>
      <div>
        <h1 className={styles.name}>
          <a href="/">{PROFILE.name}</a>
        </h1>
        <h2 className={styles.title}>{PROFILE.title}</h2>
        <p className={styles.bio}>{PROFILE.bio}</p>

        <nav className={styles.nav} aria-label="In-page jump links">
          <ul>
            {NAV_ITEMS.map(({ label, href }) => (
              <li key={href}>
                <a
                  className={`${styles.navLink} ${activeSection === href.slice(1) ? styles.active : ''}`}
                  href={href}
                >
                  <span className={styles.navIndicator} />
                  <span className={styles.navText}>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <ul className={styles.socials} aria-label="Social media">
        <li>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub (opens in a new tab)"
            title="GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="24" height="24" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
        </li>
        <li>
          <a
            href={`mailto:${PROFILE.email}`}
            aria-label="Email"
            title="Email"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </a>
        </li>
      </ul>
    </header>
  );
}
