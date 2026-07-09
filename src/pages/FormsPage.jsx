import { ORG } from '../lib/flock.js';
import { useReveal } from '../lib/motion.js';

const FORMS = [
  {
    title: 'Adoption Questionnaire',
    url: ORG.forms.adoption,
    when: 'You\'d like to meet (and maybe bring home) one of our birds.',
    note: 'Required before any visit. Reviews take a week or more.',
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 40 C14 32 8 26 8 18 C8 12 12 8 17 8 C20 8 23 10 24 13 C25 10 28 8 31 8 C36 8 40 12 40 18 C40 26 34 32 24 40 Z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Volunteer Application',
    url: ORG.forms.volunteer,
    when: 'You have time, love, or a skill to give the flock.',
    note: 'No experience needed — we\'ll teach you which end bites.',
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 26 c-5 0 -9 4 -9 9 v5 h18 v-5 c0 -5 -4 -9 -9 -9 Z M24 22 a7 7 0 1 0 0-14 a7 7 0 0 0 0 14 Z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Boarding Form',
    url: ORG.forms.boarding,
    when: 'Your bird needs a safe, experienced place to stay.',
    note: 'Submit at least one week before the stay. One form per bird.',
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M8 22 L24 8 L40 22 M12 19 v19 h24 v-19" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M20 38 v-9 h8 v9" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Surrender Form',
    url: ORG.forms.surrender,
    when: 'You can no longer care for your bird — no judgment, ever.',
    note: 'Places your bird on our confidential waiting list.',
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M10 30 C16 22 32 22 38 30 M24 26 v-14 m0 0 l-6 6 m6 -6 l6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" transform="rotate(180 24 24)" />
        <path d="M14 36 h20" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function FormsPage() {
  const ref = useReveal();
  return (
    <div className="page-forms" ref={ref}>
      <section className="page-head page-head-dark">
        <div className="rail">
          <p className="kicker" data-reveal>
            FFSR forms
          </p>
          <h1 data-reveal style={{ '--d': '120ms' }}>
            Every journey here <em>starts with a form.</em>
          </h1>
          <p className="page-lead" data-reveal style={{ '--d': '240ms' }}>
            Four forms, four doors into the sanctuary. Each opens in Google
            Forms and lands with our volunteers — please allow up to five
            business days for a reply.
          </p>
        </div>
      </section>

      <section className="forms-body">
        <div className="rail">
          <div className="form-grid stagger">
            {FORMS.map((f) => (
              <a className="form-card" key={f.title} href={f.url} target="_blank" rel="noreferrer">
                <span className="form-icon">{f.icon}</span>
                <h2>{f.title}</h2>
                <p className="form-when">{f.when}</p>
                <p className="form-note">{f.note}</p>
                <span className="form-go">Open the form ↗</span>
              </a>
            ))}
          </div>
          <p className="forms-help" data-reveal>
            Not sure which form fits? Check the <a href="#/faq">FAQ</a> or{' '}
            <a href={`mailto:${ORG.email}`}>email us</a> — a volunteer will point
            you the right way.
          </p>
        </div>
      </section>
    </div>
  );
}
