import { HAPPY_LANDINGS } from '../../lib/flock.js';

/* A slow ribbon of really-adopted birds — proof that happy landings happen.
   Names from the sanctuary's success-stories page. */
export default function Landings() {
  const items = [...HAPPY_LANDINGS, ...HAPPY_LANDINGS]; // seamless loop
  return (
    <section className="landings" id="landings" aria-label="Adopted birds — success stories">
      <div className="landings-track">
        {items.map((name, i) => (
          <span className="landing" key={i} aria-hidden={i >= HAPPY_LANDINGS.length}>
            <svg viewBox="0 0 24 16" width="22" height="15" aria-hidden="true">
              <path d="M2 14 Q7 4 12 12 Q17 4 22 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <strong>{name}</strong> — happy landing
          </span>
        ))}
      </div>
    </section>
  );
}
