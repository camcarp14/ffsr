import { ORG } from '../lib/flock.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="rail footer-grid">
        <div className="footer-brand">
          <img src="/logo-seal.svg" alt="Feathered Friends Sanctuary and Rescue seal" width="84" height="84" />
          <p>
            {ORG.name}
            <br />
            {ORG.address}
          </p>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          <a href="#flock">Adopt</a>
          <a href="#promise">The honest part</a>
          <a href="#donate">Donate</a>
          <a href="#involved">Volunteer</a>
          <a href="#visit">Visit</a>
          <a href={ORG.facebook} target="_blank" rel="noreferrer">
            Facebook
          </a>
        </nav>
        <div className="footer-meta">
          <p>
            A 501(c)(3) nonprofit giving captive parrots{' '}
            <em>a life worth living</em> since {ORG.est}.
          </p>
          <p className="footer-fine">
            Concept redesign crafted with Claude. Bird listings are sample data —
            the real flock lives at{' '}
            <a href={ORG.site} target="_blank" rel="noreferrer">
              feathered-friends.com
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
