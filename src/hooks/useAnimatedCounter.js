import { useState, useEffect, useRef } from 'react';

/**
 * Animated counter hook that smoothly eases numbers up from 0 to target
 * when the element scrolls into view.
 */
export default function useAnimatedCounter(targetValue, duration = 1600) {
  const [displayValue, setDisplayValue] = useState('0');
  const elementRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Parse the numeric part and any prefix/suffix
    const stringVal = String(targetValue);
    const match = stringVal.match(/^([^0-9.]*)([0-9.]+)(.*)$/);
    if (!match) {
      setDisplayValue(stringVal);
      return;
    }

    const prefix = match[1] || '';
    const num = parseFloat(match[2]);
    const suffix = match[3] || '';
    const isDecimal = match[2].includes('.');
    const decimalPlaces = isDecimal ? match[2].split('.')[1].length : 0;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          observer.disconnect();

          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentNum = num * easeProgress;

            const formattedNum = isDecimal
              ? currentNum.toFixed(decimalPlaces)
              : Math.floor(currentNum).toLocaleString();

            setDisplayValue(`${prefix}${formattedNum}${suffix}`);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(stringVal);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [targetValue, duration]);

  return [elementRef, displayValue];
}
