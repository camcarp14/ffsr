import { HAPPY_LANDINGS } from '../../lib/flock.js';

/* A slow ribbon of adopted birds — proof the promise gets kept. */
export default function Landings() {
  const items = [...HAPPY_LANDINGS, ...HAPPY_LANDINGS]; // seamless loop
  return (
    <section className="landings" id="landings" aria-label="Recent adoptions">
      <div className="landings-track">
        {items.map((b, i) => (
          <span className="landing" key={i} aria-hidden={i >= HAPPY_LANDINGS.length}>
            <svg viewBox="0 0 24 16" width="22" height="15" aria-hidden="true">
              <path d="M2 14 Q7 4 12 12 Q17 4 22 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <strong>{b.name}</strong> the {b.species} — home in {b.town}
          </span>
        ))}
      </div>
    </section>
  );
}
