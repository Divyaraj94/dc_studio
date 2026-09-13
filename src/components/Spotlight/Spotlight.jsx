import { useEffect, useRef } from 'react';
import styles from './Spotlight.module.css';

export default function Spotlight() {
  const ref = useRef(null);

  useEffect(() => {
    function handleMouseMove(e) {
      if (ref.current) {
        ref.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.07), transparent 80%)`;
      }
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <div ref={ref} className={styles.spotlight} />;
}
