import { useRef } from 'react';
import styles from './LiquidGlassButton.module.css';

export default function LiquidGlassButton({
  children,
  href,
  onClick,
  className = '',
  id,
  target,
  rel,
}) {
  const btnRef = useRef(null);
  const flareRef = useRef(null);

  const handleMouseMove = (e) => {
    const btn = btnRef.current;
    const flare = flareRef.current;
    if (!btn || !flare) return;
    const rect = btn.getBoundingClientRect();
    flare.style.left = `${e.clientX - rect.left}px`;
    flare.style.top = `${e.clientY - rect.top}px`;
    flare.style.opacity = '1';
  };

  const handleMouseLeave = () => {
    if (flareRef.current) flareRef.current.style.opacity = '0';
  };

  const Component = href ? 'a' : 'button';

  const handleClick = (e) => {
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.slice(1);
      const el = document.getElementById(targetId);
      if (el) {
        const navOffset = 70;
        const targetPos = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth',
        });
        window.history.pushState(null, '', href);
      }
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Component
      ref={btnRef}
      href={href}
      onClick={handleClick}
      id={id}
      target={target}
      rel={rel}
      className={`${styles.glassBtn} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={flareRef} className={styles.refractionSpot} aria-hidden="true" />
      <div className={styles.topShine} aria-hidden="true" />
      <span className={styles.text}>{children}</span>
    </Component>
  );
}
