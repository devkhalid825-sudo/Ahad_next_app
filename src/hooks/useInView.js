'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * useInView
 *
 * Returns [ref, inView] where `inView` becomes true (and stays true) the first
 * time the attached element enters the viewport. Accepts the same options as
 * IntersectionObserver.
 *
 * Usage:
 *   const [ref, inView] = useInView({ rootMargin: '100px' });
 *   return <div ref={ref}>{inView && <HeavyComponent />}</div>;
 */
export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return; // already triggered — skip re-subscribing

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect(); // fire once, then stop
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
    // options is intentionally omitted from deps to avoid re-subscribing on
    // every render — callers should pass a stable object or memoize it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return [ref, inView];
}
