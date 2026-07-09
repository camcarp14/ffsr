import { useEffect, useState } from 'react';
import { ORG } from '../lib/flock.js';

const LINKS = [
  { href: '#flock', label: 'Meet the flock' },
  { href: '#promise', label: 'The honest part' },
  { href: '#involved', label: 'Get involved' },
  { href: '#visit', label: 'Visit' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-rail">
        <a className="brand" href="#top" aria-label="Feathered Friends Sanctuary and Rescue — home">
          <img src="/logo-seal.svg" alt="" width="52" height="52" />
          <span className="brand-name">
            Feathered Friends
            <em>Sanctuary &amp; Rescue · est. {ORG.est}</em>
          </span>
        </a>
        <nav className="site-nav" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <a className="btn btn-gold header-donate" href="#donate">
          Donate
        </a>
      </div>
    </header>
  );
}
