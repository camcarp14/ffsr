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
            <br />
            <a href={`mailto:${ORG.email}`}>{ORG.email}</a>
          </p>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          <a href="#/adopt">Adopt</a>
          <a href="#/learn">Learn</a>
          <a href="#/about">About</a>
          <a href="#/faq">FAQ</a>
          <a href="#/get-involved">Volunteer</a>
          <a href="#/forms">Forms</a>
          <a href="#/donate">Donate</a>
          <a href={ORG.facebook} target="_blank" rel="noreferrer">
            Facebook
          </a>
        </nav>
        <div className="footer-meta">
          <p>
            A 501(c)(3) nonprofit giving captive parrots{' '}
            <em>a life worth living</em> since {ORG.est}. One paid caretaker,
            an army of volunteers, and every dollar back to the birds.
          </p>
          <p className="footer-fine">
            Concept redesign crafted with Claude. Bird listings sourced from{' '}
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
