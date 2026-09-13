import { useRef, useState } from 'react';
import styles from './HeroAvatar.module.css';

export default function HeroAvatar() {
  const [transform, setTransform] = useState('');
  const wrapRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 12;
    const rotateY = (x / rect.width) * 12;
    setTransform(`perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(900px) rotateX(0deg) rotateY(0deg)');
  };

  return (
    <div
      ref={wrapRef}
      className={styles.avatarContainer}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
    >
      {/* Ambient Radial Aura */}
      <div className={styles.avatarGlow} />

      {/* Concentric Spinning Orbital Dashed Rings */}
      <div className={styles.avatarRingOuter} />
      <div className={styles.avatarRingInner} />

      {/* Main Circular Character Artwork */}
      <div className={styles.avatarImgWrap}>
        <img
          src="/avatar.jpg"
          alt="DC — Product Builder"
          className={styles.avatarImg}
          id="hero-avatar"
        />
      </div>

      {/* Floating Interactive Badges matching initial design */}
      <div className={`${styles.floatBadge} ${styles.badgeOpenSource}`}>
        <span className={styles.badgeDot} />
        <span>Open Source</span>
      </div>

      <div className={`${styles.floatBadge} ${styles.badgeBuildingNow}`}>
        <span className={styles.badgeDot} />
        <span>Building now</span>
      </div>

      <div className={`${styles.floatBadge} ${styles.badgeShippingDaily}`}>
        <span className={styles.badgeDot} />
        <span>Shipping daily</span>
      </div>
    </div>
  );
}
