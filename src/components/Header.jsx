import { useEffect, useState } from 'react';
import { ORG } from '../lib/flock.js';
import { useNotice } from '../lib/db.js';

const NAV = [
  { href: '#/adopt', route: '/adopt', label: 'Adopt' },
  { href: '#/learn', route: '/learn', label: 'Learn' },
  { href: '#/events', route: '/events', label: 'Events' },
  {
    label: 'About',
    children: [
      { href: '#/about', route: '/about', label: 'Our story' },
      { href: '#/faq', route: '/faq', label: 'FAQ' },
    ],
  },
  {
    label: 'Get involved',
    children: [
      { href: '#/get-involved', route: '/get-involved', label: 'Volunteer' },
      { href: '#/boarding', route: '/boarding', label: 'Boarding & surrender' },
      { href: '#/forms', route: '/forms', label: 'Forms' },
    ],
  },
];

/* flat list for the mobile hamburger */
const FLAT = NAV.flatMap((item) => (item.children ? item.children : [item]));

const Caret = ({ open }) => (
  <svg
    viewBox="0 0 12 8"
    width="10"
    height="7"
    aria-hidden="true"
    style={{ transform: open ? 'rotate(180deg)' : undefined, transition: 'transform 200ms ease' }}
  >
    <path d="M1 1.5 L6 6.5 L11 1.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Header({ route }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile menu
  const [drop, setDrop] = useState(null); // open dropdown label
  const notice = useNotice(ORG.notice); // team-managed; null = hidden

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDrop(null);
  }, [route]);

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''} ${open ? 'menu-open' : ''}`}>
      {notice && (
        <a className="notice-bar" href={`mailto:${ORG.email}?subject=${encodeURIComponent('Visit request')}`}>
          <svg viewBox="0 0 24 16" width="18" height="12" aria-hidden="true">
            <path d="M2 14 Q7 4 12 12 Q17 4 22 14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
          {notice}
        </a>
      )}
      <div className="header-rail">
        <a className="brand" href="#/" aria-label="Feathered Friends Sanctuary and Rescue — home">
          <img src="/logo-seal.svg" alt="" width="52" height="52" />
          <span className="brand-name">
            Feathered Friends
            <em>Sanctuary &amp; Rescue · est. {ORG.est}</em>
          </span>
        </a>
        <nav className="site-nav" aria-label="Primary">
          {NAV.map((item) =>
            item.children ? (
              <div
                className="nav-drop"
                key={item.label}
                onMouseEnter={() => setDrop(item.label)}
                onMouseLeave={() => setDrop((d) => (d === item.label ? null : d))}
              >
                <button
                  className={`nav-drop-btn ${item.children.some((c) => c.route === route) ? 'nav-on' : ''}`}
                  aria-haspopup="true"
                  aria-expanded={drop === item.label}
                  onClick={() => setDrop((d) => (d === item.label ? null : item.label))}
                >
                  {item.label}
                  <Caret open={drop === item.label} />
                </button>
                <div className={`drop-panel ${drop === item.label ? 'drop-open' : ''}`}>
                  <div className="drop-card">
                    {item.children.map((c) => (
                      <a key={c.href} href={c.href} aria-current={route === c.route ? 'page' : undefined}>
                        {c.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a key={item.href} href={item.href} aria-current={route === item.route ? 'page' : undefined}>
                {item.label}
              </a>
            )
          )}
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
        {FLAT.map((l) => (
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
