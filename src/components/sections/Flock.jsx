import { useMemo, useState } from 'react';
import { BIRDS, ORG, speciesFacts } from '../../lib/flock.js';
import { useReveal } from '../../lib/motion.js';
import Portrait from '../Portraits.jsx';
import BirdModal from '../BirdModal.jsx';

export function FeatherMeter({ level, max = 5 }) {
  return (
    <span className="feathers" role="img" aria-label={`Noise level ${level} of ${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <svg viewBox="0 0 14 20" key={i} aria-hidden="true">
          <path
            d="M7 1 C11 5 13 10 12 15 C10 18 8 19 7 19 C6 19 4 18 2 15 C1 10 3 5 7 1 Z M7 4 L7 19"
            fill={i < level ? 'currentColor' : 'transparent'}
            stroke="currentColor"
            strokeWidth="1.1"
            opacity={i < level ? 1 : 0.35}
          />
        </svg>
      ))}
    </span>
  );
}

const FILTERS = [
  { id: 'all', label: 'Everyone' },
  { id: 'quiet', label: 'Quieter homes' },
  { id: 'first', label: 'First bird' },
  { id: 'experienced', label: 'Experienced keepers' },
  { id: 'sanctuary', label: 'Sponsor a resident' },
];

const matches = (bird, filter) => {
  switch (filter) {
    case 'quiet':
      return bird.noise <= 2;
    case 'first':
      return bird.experience === 'Beginner-friendly';
    case 'experienced':
      return bird.experience === 'Experienced homes only';
    case 'sanctuary':
      return bird.status === 'sanctuary';
    default:
      return true;
  }
};

export default function Flock() {
  const ref = useReveal();
  const [filter, setFilter] = useState('all');
  const [openBird, setOpenBird] = useState(null);

  const flock = useMemo(() => BIRDS.filter((b) => matches(b, filter)), [filter]);

  return (
    <section className="flock" id="flock" ref={ref}>
      <div className="rail">
        <p className="kicker" data-reveal>
          Meet the flock
        </p>
        <div className="flock-heading" data-reveal style={{ '--d': '120ms' }}>
          <h2>
            Somebody here has been <em>waiting for you.</em>
          </h2>
          <p>
            Every listing tells you the truth — the volume, the mess, the decades.
            Not because we want to scare you off, but because the right match never
            needs a sales pitch.
          </p>
        </div>

        <div className="flock-filters" role="group" aria-label="Filter birds" data-reveal style={{ '--d': '220ms' }}>
          {FILTERS.map((f) => (
            <button
              key={f.id}
              className={`chip ${filter === f.id ? 'chip-on' : ''}`}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {flock.length === 0 ? (
          <div className="flock-empty">
            <p>
              Nobody matches that filter right now — but the flock changes every
              month. <a href={`mailto:${ORG.email}`}>Ask us who's coming in.</a>
            </p>
          </div>
        ) : (
          <div className="flock-grid stagger" key={filter}>
            {flock.map((bird) => {
              const facts = speciesFacts(bird.group);
              return (
                <button className="bird-card" key={bird.id} onClick={() => setOpenBird(bird)}>
                  <div className="bird-portrait">
                    <Portrait group={bird.group} />
                    {bird.status === 'sanctuary' && <span className="bird-ribbon">Sanctuary resident</span>}
                    {bird.bonded && <span className="bird-ribbon ribbon-gold">Bonded pair</span>}
                  </div>
                  <div className="bird-meta">
                    <span
                      className="plumage-stripe"
                      aria-hidden="true"
                      style={{
                        background: `linear-gradient(90deg, ${facts.plumage[0]} 0 34%, ${facts.plumage[1]} 34% 67%, ${facts.plumage[2]} 67% 100%)`,
                      }}
                    />
                    <h3>{bird.name}</h3>
                    <p className="bird-species">{bird.species}</p>
                    <dl className="bird-facts">
                      <div>
                        <dt>Volume</dt>
                        <dd>
                          <FeatherMeter level={bird.noise} />
                        </dd>
                      </div>
                      <div>
                        <dt>Lives</dt>
                        <dd className="num">{facts.lifespanLabel}</dd>
                      </div>
                      <div>
                        <dt>Suits</dt>
                        <dd>{bird.experience}</dd>
                      </div>
                    </dl>
                    {bird.monthsWaiting > 0 && (
                      <p className="bird-waiting">
                        Waiting <strong className="num">{bird.monthsWaiting} months</strong> for the right home
                      </p>
                    )}
                    <span className="bird-more">Meet {bird.name.split(' ')[0]} →</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <p className="flock-note" data-reveal="fade">
          Concept build — listings shown are sample data. The real flock lives at{' '}
          <a href={ORG.site} target="_blank" rel="noreferrer">
            feathered-friends.com
          </a>
          .
        </p>
      </div>

      {openBird && <BirdModal bird={openBird} onClose={() => setOpenBird(null)} />}
    </section>
  );
}
