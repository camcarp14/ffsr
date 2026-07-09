import { useMemo, useState } from 'react';
import { SPECIES } from '../../lib/flock.js';
import { useReveal, useTween } from '../../lib/motion.js';

const DB_SCALE = [
  { label: 'Library', db: 40 },
  { label: 'Conversation', db: 60 },
  { label: 'Lawnmower', db: 90 },
  { label: 'Rock concert', db: 110 },
];

const fmtMoney = (n) =>
  '$' + Math.round(n).toLocaleString('en-US');

export default function Promise() {
  const ref = useReveal();
  const [group, setGroup] = useState('Macaw');
  const [age, setAge] = useState(34);

  const sp = SPECIES[group];
  const median = Math.round((sp.lifespan[0] + sp.lifespan[1]) / 2);
  const endAge = age + median;
  const monthlyMid = Math.round((sp.monthlyCost[0] + sp.monthlyCost[1]) / 2);
  const lifetime = monthlyMid * 12 * median;

  const lifetimeTween = useTween(lifetime);
  const endAgeTween = useTween(endAge);
  const medianTween = useTween(median);

  const outlives = endAge > 88;

  /* timeline geometry: 0 … 105 years */
  const MAX = 105;
  const pctNow = (age / MAX) * 100;
  const pctEnd = (Math.min(endAge, MAX) / MAX) * 100;

  const milestones = useMemo(() => {
    const m = [];
    if (age < 40) m.push({ at: 40, label: 'you at 40' });
    if (age < 65) m.push({ at: 65, label: 'retirement' });
    m.push({ at: 88, label: 'a long human life' });
    return m.filter((x) => x.at > age + 3);
  }, [age]);

  const dbBars = useMemo(() => {
    const bars = [...DB_SCALE, { label: `A ${group.toLowerCase()}`, db: sp.decibels, self: true }];
    return bars.sort((a, b) => a.db - b.db);
  }, [group, sp]);

  return (
    <section className="promise" id="promise" ref={ref}>
      {/* perch line: the flock settles in for the serious talk */}
      <svg className="perch-line" viewBox="0 0 1200 60" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
        <path d="M0 52 C 300 44, 900 44, 1200 52" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <g fill="currentColor">
          <path d="M 178 46 c 0 -10 5 -16 11 -16 c 7 0 10 6 9 13 c 3 -2 5 -1 6 1 c -3 1 -5 2 -7 5 c -4 4 -12 4 -19 -3 z" />
          <path d="M 480 45 c -1 -13 6 -20 13 -20 c 8 0 12 8 11 16 c 3 -2 6 -1 7 2 c -4 1 -6 2 -9 6 c -5 5 -15 4 -22 -4 z" />
          <path d="M 704 46 c 0 -9 4 -14 10 -14 c 6 0 9 5 8 11 c 3 -1 5 0 5 2 c -3 1 -4 2 -6 4 c -4 4 -11 3 -17 -3 z" />
          <path d="M 1010 45 c -1 -11 5 -17 11 -17 c 7 0 11 7 10 14 c 3 -2 5 -1 6 1 c -3 1 -5 3 -8 5 c -4 4 -13 4 -19 -3 z" />
        </g>
        <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none">
          <path d="M 182 46 l -17 11" />
          <path d="M 484 45 l -19 13" />
          <path d="M 708 46 l -15 10" />
          <path d="M 1014 45 l -18 12" />
        </g>
      </svg>
      <div className="rail">
        <p className="kicker" data-reveal>
          The honest part
        </p>
        <div className="promise-heading" data-reveal style={{ '--d': '120ms' }}>
          <h2>
            The forever math<em>.</em>
          </h2>
          <p>
            Pet stores sell parrots like houseplants. We'd rather show you the
            arithmetic — because the number one reason birds land here is that
            nobody did this math out loud.
          </p>
        </div>

        <div className="math-panel" data-reveal="scale" style={{ '--d': '240ms' }}>
          <div className="math-controls">
            <div className="math-control">
              <span className="math-label">If you fell for a…</span>
              <div className="chip-row" role="group" aria-label="Choose a species">
                {Object.keys(SPECIES).map((g) => (
                  <button
                    key={g}
                    className={`chip chip-dark ${group === g ? 'chip-on' : ''}`}
                    aria-pressed={group === g}
                    onClick={() => setGroup(g)}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div className="math-control">
              <label className="math-label" htmlFor="age-slider">
                …and you're <strong className="num">{age}</strong> today
              </label>
              <input
                id="age-slider"
                type="range"
                min="18"
                max="75"
                value={age}
                onChange={(e) => setAge(+e.target.value)}
              />
            </div>
          </div>

          <div className="math-verdict" aria-live="polite">
            <p className="verdict-line">
              A {group.toLowerCase()} can share your life for about{' '}
              <strong className="num">{Math.round(medianTween)} years</strong>. You'd be{' '}
              <strong className="num">{Math.round(endAgeTween)}</strong> at the end of it
              {outlives ? ' — ' : '.'}
              {outlives && <em>which means this bird probably needs a plan for after you.</em>}
            </p>
          </div>

          {/* life timeline */}
          <div className="timeline" role="img" aria-label={`Timeline: adopted at ${age}, together until you are ${endAge}`}>
            <div className="timeline-track">
              <div className="timeline-you" style={{ width: `${pctNow}%` }}>
                <span className="timeline-tag tag-left">your life so far</span>
              </div>
              <div
                className="timeline-bird"
                style={{ left: `${pctNow}%`, width: `${pctEnd - pctNow}%` }}
              >
                <span className="timeline-tag tag-bird">life together</span>
              </div>
              {endAge > MAX && <div className="timeline-beyond" aria-hidden="true">→</div>}
              {milestones.map((m) => (
                <span key={m.label} className="milestone" style={{ left: `${(m.at / MAX) * 100}%` }}>
                  <i />
                  {m.label}
                </span>
              ))}
            </div>
            <div className="timeline-ends num">
              <span>{age} — today</span>
              <span>{endAge > MAX ? `${endAge} — beyond the chart` : `${endAge} — still together`}</span>
            </div>
          </div>

          <div className="math-cards">
            <div className="math-card">
              <span className="math-card-label">Food, vet care &amp; toys, over those years</span>
              <span className="math-card-num num">{fmtMoney(lifetimeTween)}</span>
              <span className="math-card-foot">
                ~${monthlyMid}/month · about the price of loving anyone properly
              </span>
            </div>
            <div className="math-card">
              <span className="math-card-label">How loud, honestly?</span>
              <div className="db-bars">
                {dbBars.map((b) => (
                  <div className={`db-row ${b.self ? 'db-self' : ''}`} key={b.label}>
                    <span className="db-name">{b.label}</span>
                    <span className="db-track">
                      <span className="db-fill" style={{ width: `${(b.db / 125) * 100}%` }} />
                    </span>
                    <span className="db-val num">{b.db} dB</span>
                  </div>
                ))}
              </div>
              <span className="math-card-foot">{sp.dbCompare} — daily, and that's healthy</span>
            </div>
          </div>
        </div>

        <div className="promise-close" data-reveal style={{ '--d': '160ms' }}>
          <p>
            Still here? <em>Good.</em> You might be exactly who somebody upstairs has
            been waiting for. And if the math says <strong>not yet</strong> — sponsor a
            sanctuary bird instead. Same love, no drywall damage.
          </p>
          <div className="promise-ctas">
            <a className="btn btn-gold" href="#flock">
              Back to the flock
            </a>
            <a className="btn btn-ghost" href="#donate">
              Sponsor instead
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
