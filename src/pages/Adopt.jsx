import { useMemo, useState } from 'react';
import { BIRDS } from '../lib/birds.js';
import { ORG } from '../lib/flock.js';
import { useReveal } from '../lib/motion.js';
import BirdCard from '../components/BirdCard.jsx';
import BirdModal from '../components/BirdModal.jsx';

const GROUPS = ['All', 'Macaw', 'Cockatoo', 'Amazon', 'Conure', 'Cockatiel', 'Parakeet', 'Other'];

const STEPS = [
  {
    title: 'Send the questionnaire',
    body: 'Fill out the Adoption Questionnaire — it\'s how every match starts. Reviews can take a week or more; our reviewers also scrub cages.',
  },
  {
    title: 'Visit and meet everyone',
    body: 'Tour the sanctuary and talk with a volunteer about the companion you\'re hoping for. You never know who you\'ll fall for — or who falls for you.',
  },
  {
    title: 'Keep coming back',
    body: 'Bonds take multiple visits, and the number depends on you and the bird. We\'re watching the bird\'s vote as much as yours.',
  },
  {
    title: 'Learn the good stuff',
    body: 'Education happens across your visits — nutrition, behavior, body language — the same material whether it\'s your first bird or your fifth.',
  },
  {
    title: 'Home visit, then home',
    body: 'A volunteer visits your home, you sign the adoption contract, and somebody gets a new favorite person. Fees are discussed during visits and support the whole flock.',
  },
];

export default function Adopt() {
  const ref = useReveal();
  const [group, setGroup] = useState('All');
  const [query, setQuery] = useState('');
  const [openBird, setOpenBird] = useState(null);

  const flock = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BIRDS.filter((b) => {
      if (group !== 'All' && b.group !== group) return false;
      if (q && !(b.name + ' ' + b.species).toLowerCase().includes(q)) return false;
      return true;
    });
  }, [group, query]);

  const counts = useMemo(() => {
    const c = { All: BIRDS.length };
    for (const b of BIRDS) c[b.group] = (c[b.group] || 0) + 1;
    return c;
  }, []);

  return (
    <div className="page-adopt" ref={ref}>
      <section className="page-head page-head-dark">
        <div className="rail">
          <p className="kicker" data-reveal>
            Available birds
          </p>
          <h1 data-reveal style={{ '--d': '120ms' }}>
            {BIRDS.length} birds. <em>One of them is yours.</em>
          </h1>
          <p className="page-lead" data-reveal style={{ '--d': '240ms' }}>
            Every bio below is written by the volunteers who feed, clean, and
            adore these birds daily — quirks included. A completed{' '}
            <a href={ORG.forms.adoption} target="_blank" rel="noreferrer">
              Adoption Questionnaire
            </a>{' '}
            is required to meet any of them.
          </p>
          <p className="page-note" data-reveal style={{ '--d': '340ms' }}>
            {ORG.radiusNote}
          </p>
        </div>
      </section>

      <section className="adopt-birds">
        <div className="rail">
          <div className="adopt-controls" data-reveal>
            <div className="flock-filters" role="group" aria-label="Filter by species">
              {GROUPS.map((g) => (
                <button
                  key={g}
                  className={`chip ${group === g ? 'chip-on' : ''}`}
                  aria-pressed={group === g}
                  onClick={() => setGroup(g)}
                >
                  {g}
                  {counts[g] ? <span className="chip-count num">{counts[g]}</span> : null}
                </button>
              ))}
            </div>
            <label className="adopt-search">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <circle cx="10.5" cy="10.5" r="6.5" />
                <path d="M15.5 15.5 L21 21" />
              </svg>
              <input
                type="search"
                placeholder="Search by name or species…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search birds"
              />
            </label>
          </div>

          {flock.length === 0 ? (
            <div className="flock-empty">
              <p>
                No birds match that search — but the flock changes all the time.{' '}
                <a href={`mailto:${ORG.email}`}>Ask us who's coming in.</a>
              </p>
            </div>
          ) : (
            <div className="flock-grid stagger" key={group + '|' + query}>
              {flock.map((bird) => (
                <BirdCard bird={bird} key={bird.slug} onOpen={setOpenBird} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="adopt-process">
        <div className="rail">
          <p className="kicker" data-reveal>
            How adoption works
          </p>
          <h2 data-reveal style={{ '--d': '120ms' }}>
            Slow by design. <em>Worth it by a mile.</em>
          </h2>
          <ol className="steps stagger">
            {STEPS.map((s, i) => (
              <li className="step" key={s.title}>
                <span className="step-num num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="adopt-process-foot" data-reveal>
            <a className="btn btn-gold" href={ORG.forms.adoption} target="_blank" rel="noreferrer">
              Start the Adoption Questionnaire ↗
            </a>
            <p>
              Good to know: adoption fees keep the sanctuary running and are
              discussed during your visits · payment by cash, card, or device ·
              we never ship birds — ever.
            </p>
          </div>
        </div>
      </section>

      {openBird && <BirdModal bird={openBird} onClose={() => setOpenBird(null)} />}
    </div>
  );
}
