import { useState, useEffect } from 'react';
import LiquidGlassButton from '../LiquidGlass/LiquidGlassButton';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      // 1. Header background blur state
      setScrolled(window.scrollY > 30);

      // 2. Exact scroll depth progress calculation (0 to 100%)
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      // 3. Active scroll-spy detection
      const sections = ['hero', 'projects', 'about', 'experience', 'skills', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    closeMenu();
    const el = document.getElementById(targetId);
    if (el) {
      const navOffset = 70;
      const targetPos = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({
        top: targetPos,
        behavior: 'smooth',
      });
      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} id="main-nav">
      {/* Real-time Viewport Scroll Progress Bar */}
      <div
        className={styles.scrollProgressBar}
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <div className={styles.navInner}>
        {/* Brand Studio Mark */}
        <a
          href="#hero"
          className={styles.brand}
          onClick={(e) => handleNavClick(e, 'hero')}
        >
          <span className={styles.statusDot} />
          <span className={styles.brandText}>DC // STUDIO</span>
        </a>

        {/* Mobile Menu Toggle */}
        <button
          className={`${styles.menuToggle} ${menuOpen ? styles.menuActive : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
        </button>

        {/* Navigation Menu with Scroll Spy */}
        <nav className={`${styles.navMenu} ${menuOpen ? styles.navOpen : ''}`}>
          <a
            href="#projects"
            className={`${styles.navLink} ${activeSection === 'projects' ? styles.activeLink : ''}`}
            onClick={(e) => handleNavClick(e, 'projects')}
          >
            Selected Works
          </a>
          <a
            href="#about"
            className={`${styles.navLink} ${activeSection === 'about' ? styles.activeLink : ''}`}
            onClick={(e) => handleNavClick(e, 'about')}
          >
            Philosophy
          </a>
          <a
            href="#experience"
            className={`${styles.navLink} ${activeSection === 'experience' ? styles.activeLink : ''}`}
            onClick={(e) => handleNavClick(e, 'experience')}
          >
            Career
          </a>
          <a
            href="#skills"
            className={`${styles.navLink} ${activeSection === 'skills' ? styles.activeLink : ''}`}
            onClick={(e) => handleNavClick(e, 'skills')}
          >
            Capabilities
          </a>

          <div className={styles.navCtaWrap}>
            <LiquidGlassButton
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              Initiate Contact
            </LiquidGlassButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
