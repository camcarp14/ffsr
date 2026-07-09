import { useState } from 'react';
import { ORG, speciesFacts } from '../lib/flock.js';
import { useEscape, useScrollLock } from '../lib/motion.js';
import Portrait from './Portraits.jsx';
import { FeatherMeter } from './sections/Flock.jsx';

const ACKS = [
  'I understand this bird may live for decades — I have thought about who cares for it after me.',
  'I understand parrots are loud, messy, and emotional — and that this is normal, not a defect.',
  'I understand adoption involves visits and a home conversation, not same-day pickup.',
];

/* The honesty label: a Companion Facts panel, styled like the
   nutrition label on the back of a box — because commitments
   deserve ingredient lists. */
function CompanionFacts({ bird }) {
  const facts = speciesFacts(bird.group);
  return (
    <aside className="companion-facts" aria-label={`Companion facts for ${bird.name}`}>
      <h4>Companion Facts</h4>
      <p className="cf-serving">One {bird.group.toLowerCase()} · whole life</p>
      <div className="cf-row cf-big">
        <span>Life expectancy</span>
        <strong className="num">{facts.lifespanLabel}</strong>
      </div>
      <div className="cf-row">
        <span>Daily company required</span>
        <strong>{facts.daily}</strong>
      </div>
      <div className="cf-row">
        <span>Volume</span>
        <strong>
          <FeatherMeter level={bird.noise} />
        </strong>
      </div>
      <div className="cf-row">
        <span>Mess index</span>
        <strong>
          <FeatherMeter level={facts.mess} />
        </strong>
      </div>
      <div className="cf-row">
        <span>Monthly cost</span>
        <strong className="num">
          ${facts.monthlyCost[0]}–{facts.monthlyCost[1]}
        </strong>
      </div>
      <div className="cf-row">
        <span>Best suited to</span>
        <strong>{bird.goodWith}</strong>
      </div>
      <p className="cf-foot">{facts.voice}</p>
    </aside>
  );
}

export default function BirdModal({ bird, onClose }) {
  const [acks, setAcks] = useState(() => ACKS.map(() => false));
  useScrollLock(true);
  useEscape(onClose);

  const sanctuary = bird.status === 'sanctuary';
  const ready = sanctuary || acks.every(Boolean);
  const firstName = bird.name.split(' ')[0];

  const mailto = sanctuary
    ? `mailto:${ORG.email}?subject=${encodeURIComponent(`Sponsoring ${bird.name}`)}`
    : `mailto:${ORG.email}?subject=${encodeURIComponent(`Adoption conversation about ${bird.name}`)}`;

  return (
    <div className="modal-scrim" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={`About ${bird.name}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close" autoFocus>
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <div className="modal-grid">
          <div className="modal-left">
            <div className="modal-portrait">
              <Portrait group={bird.group} />
            </div>
            <CompanionFacts bird={bird} />
          </div>
          <div className="modal-right">
            <p className="kicker">{sanctuary ? 'Permanent resident' : 'Looking for home'}</p>
            <h3 className="modal-name">{bird.name}</h3>
            <p className="modal-species">
              {bird.species} · {bird.age} · {bird.sex}
            </p>
            <p className="modal-bio">{bird.bio}</p>

            {sanctuary ? (
              <div className="modal-action">
                <p className="modal-ack-lead">
                  Cleo isn't going anywhere — that's the point of sanctuary. Sponsorship
                  funds her food, enrichment, and vet care for life.
                </p>
                <a className="btn btn-ink" href={mailto}>
                  Sponsor {firstName}'s care
                </a>
              </div>
            ) : (
              <div className="modal-action">
                <p className="modal-ack-lead">Before you write to us — three honest boxes:</p>
                <ul className="ack-list">
                  {ACKS.map((text, i) => (
                    <li key={i}>
                      <label className={`ack ${acks[i] ? 'ack-on' : ''}`}>
                        <input
                          type="checkbox"
                          checked={acks[i]}
                          onChange={() =>
                            setAcks((prev) => prev.map((v, j) => (j === i ? !v : v)))
                          }
                        />
                        <span className="ack-box" aria-hidden="true">
                          <svg viewBox="0 0 16 16" width="12" height="12">
                            <path d="M2.5 8.5l3.5 3.5 7-8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {text}
                      </label>
                    </li>
                  ))}
                </ul>
                <a
                  className={`btn btn-ink ${ready ? '' : 'btn-wait'}`}
                  href={ready ? mailto : undefined}
                  aria-disabled={!ready}
                  onClick={(e) => !ready && e.preventDefault()}
                >
                  {ready ? `Start the conversation about ${firstName}` : 'Check all three — then we talk'}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
