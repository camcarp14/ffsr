import { ORG } from '../../lib/flock.js';
import { useReveal } from '../../lib/motion.js';

const TIERS = [
  {
    amount: 15,
    cadence: '/mo',
    name: 'The Chop Club',
    does: 'Fresh vegetables, cooked grains, and one very demanding beak — fed for a month.',
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M8 28 C8 38 15 44 24 44 C33 44 40 38 40 28 Z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M15 21 C12 13 17 6 25 5 C25 12 21 19 15 21 Z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
        <circle cx="32" cy="18" r="4.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <path d="M22 24 l5 -5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    amount: 45,
    cadence: '',
    name: 'Wellness Visit',
    does: 'One avian vet exam. Parrots hide illness beautifully — checkups catch what love can\'t see.',
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 40 C14 32 8 26 8 18 C8 12 12 8 17 8 C20 8 23 10 24 13 C25 10 28 8 31 8 C36 8 40 12 40 18 C40 26 34 32 24 40 Z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M16 22 h6 l3 -6 4 10 3 -4 h8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    amount: 120,
    cadence: '/mo',
    name: 'Sanctuary Sponsor',
    does: 'Full care for a permanent resident like Cleo — food, enrichment, vet fund, and a photo update that will absolutely yell at you.',
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="17" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <path d="M17 27 C20 22 28 22 31 27 M24 14 L24 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="24" cy="12" r="2.4" fill="currentColor" />
      </svg>
    ),
  },
];

export default function Donate() {
  const ref = useReveal();
  return (
    <section className="donate" id="donate" ref={ref}>
      <div className="rail">
        <p className="kicker" data-reveal>
          Keep the lights warm
        </p>
        <div className="donate-heading" data-reveal style={{ '--d': '120ms' }}>
          <h2>
            Rescue runs on chop, vet bills, and <em>people like you.</em>
          </h2>
          <p>
            We're a 501(c)(3) — every dollar goes to the birds, and none of them
            write thank-you notes. So we will: thank you.
          </p>
        </div>

        <div className="tier-grid stagger">
          {TIERS.map((t) => (
            <a className="tier" key={t.name} href={ORG.donateUrl} target="_blank" rel="noreferrer">
              <span className="tier-icon">{t.icon}</span>
              <span className="tier-amount num">
                ${t.amount}
                <em>{t.cadence}</em>
              </span>
              <span className="tier-name">{t.name}</span>
              <span className="tier-does">{t.does}</span>
              <span className="tier-go">Give this →</span>
            </a>
          ))}
        </div>

        <div className="donate-foot" data-reveal style={{ '--d': '200ms' }}>
          <a className="btn btn-gold btn-big" href={ORG.donateUrl} target="_blank" rel="noreferrer">
            Donate any amount — PayPal
          </a>
          <p>
            Recurring gifts are the sanctuary's heartbeat — they buy pellets in
            January and air conditioning in July. Feathered Friends Sanctuary &amp;
            Rescue, Inc. is a registered 501(c)(3) nonprofit.
          </p>
        </div>
      </div>
    </section>
  );
}
