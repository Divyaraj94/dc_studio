import { useEffect, useRef } from 'react';

const DEFAULT_OPTIONS = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

/**
 * Custom hook that attaches an IntersectionObserver to observe when elements
 * scroll into view and toggle the `.revealed` CSS class.
 * @param {Object} options IntersectionObserver options
 */
export default function useScrollReveal(options = DEFAULT_OPTIONS) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Once revealed, we can unobserve to save CPU cycles
          observer.unobserve(entry.target);
        }
      });
    }, options);

    const observeElements = () => {
      const revealElements = container.querySelectorAll('.reveal-on-scroll, .reveal-scale');
      revealElements.forEach((el) => {
        if (!el.classList.contains('revealed')) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('revealed');
          } else {
            observer.observe(el);
          }
        }
      });
    };

    observeElements();

    if (container.classList.contains('reveal-on-scroll') || container.classList.contains('reveal-scale')) {
      observer.observe(container);
    }

    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(container, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [options]);

  return containerRef;
}
