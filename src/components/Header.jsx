import { useEffect, useState } from 'react';
import { ORG } from '../lib/flock.js';

const LINKS = [
  { href: '#/adopt', route: '/adopt', label: 'Adopt' },
  { href: '#/learn', route: '/learn', label: 'Learn' },
  { href: '#/events', route: '/events', label: 'Events' },
  { href: '#/about', route: '/about', label: 'About' },
  { href: '#/faq', route: '/faq', label: 'FAQ' },
  { href: '#/get-involved', route: '/get-involved', label: 'Volunteer' },
  { href: '#/boarding', route: '/boarding', label: 'Boarding' },
  { href: '#/forms', route: '/forms', label: 'Forms' },
];

export default function Header({ route }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [route]);

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''} ${open ? 'menu-open' : ''}`}>
      <a className="notice-bar" href={`mailto:${ORG.email}?subject=${encodeURIComponent('Visit request')}`}>
        <svg viewBox="0 0 24 16" width="18" height="12" aria-hidden="true">
          <path d="M2 14 Q7 4 12 12 Q17 4 22 14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
        {ORG.notice}
      </a>
      <div className="header-rail">
        <a className="brand" href="#/" aria-label="Feathered Friends Sanctuary and Rescue — home">
          <img src="/logo-seal.svg" alt="" width="52" height="52" />
          <span className="brand-name">
            Feathered Friends
            <em>Sanctuary &amp; Rescue · est. {ORG.est}</em>
          </span>
        </a>
        <nav className="site-nav" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} aria-current={route === l.route ? 'page' : undefined}>
              {l.label}
            </a>
          ))}
        </nav>
        <a className="btn btn-gold header-donate" href="#/donate">
          Donate
        </a>
        <button
          className="menu-btn"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      <nav className={`mobile-nav ${open ? 'open' : ''}`} aria-label="Mobile">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} aria-current={route === l.route ? 'page' : undefined}>
            {l.label}
          </a>
        ))}
        <a href="#/donate" className="mobile-donate">
          Donate
        </a>
      </nav>
    </header>
  );
}
