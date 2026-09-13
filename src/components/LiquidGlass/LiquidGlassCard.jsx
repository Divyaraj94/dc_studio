import { useRef } from 'react';
import styles from './LiquidGlassCard.module.css';

export default function LiquidGlassCard({
  children,
  className = '',
  style = {},
  variant = 'rounded', // 'rounded' | 'pill'
  onClick,
}) {
  const cardRef = useRef(null);
  const flareRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const flare = flareRef.current;
    if (!card || !flare) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    flare.style.left = `${x}px`;
    flare.style.top = `${y}px`;
    flare.style.opacity = '1';

    // Subtle 3D tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    const flare = flareRef.current;
    if (flare) flare.style.opacity = '0';
    if (card) card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <div
      ref={cardRef}
      className={`${styles.glassCard} ${variant === 'pill' ? styles.pill : ''} ${className}`}
      style={style}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={flareRef} className={styles.refractionFlare} aria-hidden="true" />
      <div className={styles.specularShine} aria-hidden="true" />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
