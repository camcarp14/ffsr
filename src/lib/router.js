import { useEffect, useState } from 'react';

/* Tiny hash router: '#/adopt' → '/adopt'.
   Hashes that don't start with '/' (e.g. '#mission') are treated as
   plain in-page anchors and never change the route. */
const parse = () => {
  const h = window.location.hash.replace(/^#/, '');
  if (!h || !h.startsWith('/')) return '/';
  return h;
};

export function useRoute() {
  const [route, setRoute] = useState(parse);
  useEffect(() => {
    const fn = () => {
      const h = window.location.hash.replace(/^#/, '');
      if (h && !h.startsWith('/')) return; // in-page anchor — leave routing alone
      setRoute(h || '/');
    };
    window.addEventListener('hashchange', fn);
    return () => window.removeEventListener('hashchange', fn);
  }, []);
  return route;
}

export const navigate = (path) => {
  window.location.hash = path;
};
