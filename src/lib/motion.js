import { useEffect, useRef, useState, useCallback } from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Single shared IntersectionObserver that flips `.in` on
   [data-reveal] and .stagger elements — the whole site's reveal
   physics runs through this one instance. */
let sharedObserver = null;
const getObserver = () => {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            sharedObserver.unobserve(e.target);
          }
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -6% 0px' }
    );
  }
  return sharedObserver;
};

/* Attach to a container: observes itself + all [data-reveal]/.stagger inside */
export function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (prefersReducedMotion()) {
      root.querySelectorAll('[data-reveal], .stagger').forEach((el) => el.classList.add('in'));
      if (root.matches('[data-reveal], .stagger')) root.classList.add('in');
      return;
    }
    const obs = getObserver();
    const targets = [
      ...(root.matches('[data-reveal], .stagger') ? [root] : []),
      ...root.querySelectorAll('[data-reveal], .stagger'),
    ];
    targets.forEach((t) => obs.observe(t));
    return () => targets.forEach((t) => obs.unobserve(t));
  }, []);
  return ref;
}

/* Tween a number when it enters view or when the value changes. */
export function useCountUp(target, { duration = 1400, decimals = 0 } = {}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setDisplay(target);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const tick = (now) => {
            const p = Math.min(1, (now - t0) / duration);
            const eased = 1 - Math.pow(1 - p, 4);
            setDisplay(+(target * eased).toFixed(decimals));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration, decimals]);

  return [ref, display];
}

/* Tween toward a changing value (for calculator outputs). */
export function useTween(value, { duration = 700 } = {}) {
  const [display, setDisplay] = useState(value);
  const raf = useRef(0);
  const from = useRef(value);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDisplay(value);
      from.current = value;
      return;
    }
    cancelAnimationFrame(raf.current);
    const start = from.current;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = start + (value - start) * eased;
      setDisplay(v);
      from.current = v;
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [value, duration]);

  return display;
}

/* Lock body scroll while a modal is open */
export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);
}

/* Escape key handler */
export function useEscape(handler) {
  const cb = useCallback(handler, [handler]);
  useEffect(() => {
    const fn = (e) => e.key === 'Escape' && cb();
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [cb]);
}
