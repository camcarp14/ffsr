import { useState } from 'react';
import { ORG } from '../lib/flock.js';
import { useReveal } from '../lib/motion.js';

const SECTIONS = [
  {
    title: 'About adopting',
    items: [
      {
        q: 'How do I adopt a bird?',
        a: (
          <>
            Start with the{' '}
            <a href={ORG.forms.adoption} target="_blank" rel="noreferrer">
              Adoption Questionnaire
            </a>
            . Once we receive and review your completed questionnaire, we'll
            reach out to schedule your first visit. Reviews can take a week or
            more — our reviewers are also the people scrubbing cages.
          </>
        ),
      },
      {
        q: 'How many visits do you require?',
        a: 'There isn\'t a set number — it depends on you and the bird. We use multiple visits to share everything we know and to watch the bond form in both directions. For larger species especially, plan on several trips. We will never rush a match.',
      },
      {
        q: 'How much does a bird cost?',
        a: 'Adoption fees are based on handleability, age, and health, and are discussed at your visits once you\'ve worked with a bird — we don\'t quote fees up front. Fees are a primary source of the sanctuary\'s income, and every fee is well below what a store or breeder charges. Payment is by cash, card, or device at the time of adoption; no deposits required.',
      },
      {
        q: 'Why only homes within two hours of Edgerton?',
        a: 'Because the visits are the process. Between meet-and-greets, education sessions, and the home visit, adopting means real trips to the sanctuary — and we\'ve learned distance is where good intentions break down.',
      },
      {
        q: 'Do you ship birds?',
        a: 'Never. Not once, not ever. No need to ask!',
      },
    ],
  },
  {
    title: 'About surrendering',
    items: [
      {
        q: 'What birds do you accept?',
        a: 'We assist psittacines — hookbill parrots — only. For wildlife, contact your nearest wildlife rehabilitator. For other avian species, we may be able to point you to a sanctuary that can help.',
      },
      {
        q: 'How do I surrender my bird?',
        a: (
          <>
            Fill out the{' '}
            <a href={ORG.forms.surrender} target="_blank" rel="noreferrer">
              Surrender Form
            </a>{' '}
            — it's required before a bird can join our waiting list. Your
            decision will be met without judgment, and your information stays
            strictly confidential.
          </>
        ),
      },
      {
        q: 'How long is the waiting list?',
        a: 'Like every sanctuary, we\'re near capacity at times and won\'t jeopardize the care of our current birds. We open for intake about once every 30 days and contact owners by urgency, so it can be several months. If your situation is an emergency, email us — we\'ll help you find a sanctuary with space.',
      },
    ],
  },
  {
    title: 'Visiting, boarding & everything else',
    items: [
      {
        q: 'Are you open to the public?',
        a: 'By appointment only — we don\'t have set hours, and walk-ins can\'t be accommodated. Arrange a time first so a volunteer is on-site to welcome you.',
      },
      {
        q: 'Can I come out for a tour?',
        a: (
          <>
            Absolutely — email{' '}
            <a href={`mailto:${ORG.email}`}>{ORG.email}</a> and allow up to five
            business days for a volunteer to schedule you.
          </>
        ),
      },
      {
        q: 'Do you offer boarding or trims?',
        a: (
          <>
            Yes! We board parrots short and long term — see{' '}
            <a href="#/boarding">rates and requirements</a> — and
            occasionally hold wing, beak, and nail trim days. Watch our{' '}
            <a href={ORG.facebook} target="_blank" rel="noreferrer">
              Facebook page
            </a>{' '}
            for the next one.
          </>
        ),
      },
      {
        q: 'I want to foster. Do you have a program?',
        a: 'We don\'t have a fostering program except in rare cases where a bird needs very specialized care. But volunteers get all the bird time they can handle — come join us instead!',
      },
    ],
  },
];

function QA({ q, a, open, onToggle }) {
  return (
    <li className={`qa ${open ? 'qa-open' : ''}`}>
      <button className="qa-q" aria-expanded={open} onClick={onToggle}>
        <span>{q}</span>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
      <div className="qa-a">
        <div className="qa-a-inner">
          <p>{a}</p>
        </div>
      </div>
    </li>
  );
}

export default function Faq() {
  const ref = useReveal();
  const [open, setOpen] = useState('0-0');

  return (
    <div className="page-faq" ref={ref}>
      <section className="page-head page-head-dark">
        <div className="rail">
          <p className="kicker" data-reveal>
            Frequently asked questions
          </p>
          <h1 data-reveal style={{ '--d': '120ms' }}>
            Ask us anything. <em>These come up a lot.</em>
          </h1>
          <p className="page-lead" data-reveal style={{ '--d': '240ms' }}>
            Can't find your answer? Reach us by{' '}
            <a href={`mailto:${ORG.email}`}>email</a>, voicemail at{' '}
            <a href={`tel:+1${ORG.phone.replaceAll('-', '')}`}>{ORG.phone}</a>, or{' '}
            <a href={ORG.facebook} target="_blank" rel="noreferrer">
              Facebook
            </a>
            .
          </p>
        </div>
      </section>

      <section className="faq-body">
        <div className="rail faq-rail">
          {SECTIONS.map((sec, si) => (
            <div className="faq-section" key={sec.title} data-reveal style={{ '--d': `${si * 120}ms` }}>
              <h2>{sec.title}</h2>
              <ul className="qa-list">
                {sec.items.map((item, qi) => {
                  const id = `${si}-${qi}`;
                  return (
                    <QA
                      key={id}
                      q={item.q}
                      a={item.a}
                      open={open === id}
                      onToggle={() => setOpen(open === id ? null : id)}
                    />
                  );
                })}
              </ul>
            </div>
          ))}
          <div className="faq-foot" data-reveal>
            <p>Still curious? The flock loves visitors with questions.</p>
            <a className="btn btn-ink" href={`mailto:${ORG.email}?subject=${encodeURIComponent('A question for the flock')}`}>
              Email us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
