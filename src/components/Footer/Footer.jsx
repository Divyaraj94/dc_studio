import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerInner}>
          <div className={styles.footerCol}>
            <span className={styles.brand}>DC // STUDIO</span>
            <span className={styles.copy}>
              &copy; {currentYear} ALL RIGHTS RESERVED. CODE IS LAW.
            </span>
          </div>

          <div className={styles.footerColRight}>
            <span className={styles.badge}>DESIGNED FOR ULTRA-HIGH CONVERGENCE</span>
            <a href="#hero" className={styles.backToTop}>
              BACK TO TOP [↑]
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
