import { useState } from 'react';
import { ORG, speciesFacts } from '../lib/flock.js';
import { useEscape, useScrollLock } from '../lib/motion.js';
import { FeatherMeter } from './FeatherMeter.jsx';

const ACKS = [
  'I understand this bird may share decades of my life — and I\'m excited about that.',
  'I understand parrots are loud, messy, and emotional — that\'s birds being birds.',
  'I understand adoption takes multiple visits and a home conversation, not same-day pickup.',
];

/* Companion Facts: the honesty label — commitments deserve ingredient lists. */
function CompanionFacts({ bird }) {
  const facts = speciesFacts(bird.facts);
  return (
    <aside className="companion-facts" aria-label={`Companion facts for ${bird.name}`}>
      <h4>Companion Facts</h4>
      <p className="cf-serving">
        {bird.species} · {bird.age}
      </p>
      <div className="cf-row cf-big">
        <span>Life expectancy</span>
        <strong className="num">{facts.lifespanLabel}</strong>
      </div>
      <div className="cf-row">
        <span>Daily company</span>
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
        <strong>{bird.exp}</strong>
      </div>
      <p className="cf-foot">{facts.voice}</p>
    </aside>
  );
}

export default function BirdModal({ bird, onClose }) {
  const [acks, setAcks] = useState(() => ACKS.map(() => false));
  useScrollLock(true);
  useEscape(onClose);

  const ready = acks.every(Boolean);
  const firstName = bird.name.split(' ')[0].replace(/[',]$/, '');
  const paragraphs = bird.bio.split('\n\n').filter(Boolean);

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
            <div className="modal-photo">
              <img src={bird.photo} alt={`${bird.name}, ${bird.species}`} />
            </div>
            <CompanionFacts bird={bird} />
          </div>
          <div className="modal-right">
            <p className="kicker">Looking for home</p>
            <h3 className="modal-name">{bird.name}</h3>
            <p className="modal-species">
              {bird.species} · {bird.age} · {bird.sex}
            </p>
            {bird.special && (
              <p className="modal-special">
                <svg viewBox="0 0 24 16" width="20" height="13" aria-hidden="true">
                  <path d="M2 14 Q7 4 12 12 Q17 4 22 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
                {bird.special}
              </p>
            )}
            <div className="modal-bio">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="modal-action">
              <p className="modal-ack-lead">Ready to meet {firstName}? Three honest boxes first:</p>
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
              <div className="modal-ctas">
                <a
                  className={`btn btn-ink ${ready ? '' : 'btn-wait'}`}
                  href={ready ? ORG.forms.adoption : undefined}
                  target={ready ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-disabled={!ready}
                  onClick={(e) => !ready && e.preventDefault()}
                >
                  {ready ? 'Open the Adoption Questionnaire ↗' : 'Check all three — then the questionnaire'}
                </a>
                <a className="modal-ask" href={`mailto:${ORG.email}?subject=${encodeURIComponent(`Question about ${bird.name}`)}`}>
                  or ask us about {firstName} first
                </a>
              </div>
              <p className="modal-radius">{ORG.radiusNote}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
