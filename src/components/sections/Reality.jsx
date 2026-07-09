import { useEffect, useMemo, useState } from 'react';
import { SPECIES } from '../../lib/flock.js';
import { useReveal, useTween } from '../../lib/motion.js';
import { FeatherMeter } from '../FeatherMeter.jsx';

/* ============================================================
   REALITY — "what a parrot actually asks of you."
   A 24-hour dial of a parrot's day, drawn as animated arc
   segments (dasharray tricks, so species changes morph
   smoothly), plus field notes on the non-negotiables.
   ============================================================ */

const R = 128;
const C = 2 * Math.PI * R;
/* hour 0 sits at the bottom of the dial; daytime sweeps over the top */
const L = (h) => C / 4 + (h / 24) * C;

const TYPES = {
  sleep: { color: '#0d5560', label: 'Sleep — lights out, covered, quiet' },
  chorus: { color: '#ff6f61', label: 'Dawn chorus — the sun gets announced' },
  chop: { color: '#ffb547', label: 'Fresh chop breakfast' },
  forage: { color: '#2ec4b6', label: 'Foraging, shredding & naps' },
  together: { color: '#ffd06b', label: 'Together time — hands-on, out of cage' },
  opera: { color: '#ff8b74', label: 'Dinner & the evening opera' },
};

/* a day in the life, by species group */
const DAYS = {
  Macaw: { sleep: 10.5, chorus: 0.75, together: 4, opera: 1.25 },
  Cockatoo: { sleep: 11, chorus: 1, together: 4.5, opera: 1.25 },
  'African Grey': { sleep: 11, chorus: 0.5, together: 3.5, opera: 1 },
  Amazon: { sleep: 10.5, chorus: 1, together: 3.5, opera: 1.5 },
  Conure: { sleep: 11, chorus: 0.5, together: 3.5, opera: 1 },
  Cockatiel: { sleep: 11.5, chorus: 0.5, together: 2.5, opera: 0.75 },
  Parakeet: { sleep: 11.5, chorus: 0.5, together: 2.5, opera: 0.75 },
};

/* build contiguous segments: wake at (20 - sleep + 24)... simpler:
   bedtime 20:00 fixed; wake = 20 - sleep (i.e. sleep back-computed);
   morning: chorus → chop(1h) → forage until together; opera precedes bed */
function segmentsFor(group) {
  const d = DAYS[group];
  // lights out at 20:00; wake = 20:00 + sleep, wrapped past midnight
  const wakeH = (20 + d.sleep) % 24;
  const segs = [];
  segs.push({ type: 'sleep', from: 20, to: 24 });
  segs.push({ type: 'sleep', from: 0, to: wakeH });
  let h = wakeH;
  segs.push({ type: 'chorus', from: h, to: (h += d.chorus) });
  segs.push({ type: 'chop', from: h, to: (h += 1) });
  const operaStart = 20 - d.opera;
  const togetherStart = operaStart - d.together;
  segs.push({ type: 'forage', from: h, to: togetherStart });
  segs.push({ type: 'together', from: togetherStart, to: operaStart });
  segs.push({ type: 'opera', from: operaStart, to: 20 });
  return segs;
}

const NOTES = (sp, group) => [
  {
    title: 'Flock, not furniture',
    body: `Parrots are wild at heart — most are only a few generations out of the rainforest. Your ${group.toLowerCase()} doesn't want to be watched; it wants to be with you: ${sp.daily.toLowerCase()}.`,
  },
  {
    title: 'Loud is love',
    body: `Contact calls are how flocks say "still there?" Expect ${sp.dbCompare} at sunrise and sunset — it's communication, not a behavior problem.`,
    meter: true,
  },
  {
    title: 'Mess is the job',
    body: 'Shredding, flinging, and dismantling are what those beaks are for. A busy bird is a healthy bird — enrichment isn\'t optional, it\'s the whole gig.',
  },
  {
    title: 'Decades, happily',
    body: `A ${group.toLowerCase()} can share ${sp.lifespanLabel.replace('years', 'years')} of your life. The happiest adopters plan for the long friendship — vet fund, travel plan, and a person who'd take the bird in a pinch.`,
  },
];

export default function Reality() {
  const ref = useReveal();
  const [group, setGroup] = useState('Macaw');
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const sp = SPECIES[group];
  const segs = useMemo(() => segmentsFor(group), [group]);
  const togetherHours = DAYS[group].together;
  const hoursTween = useTween(togetherHours);
  const legend = useMemo(() => {
    const totals = {};
    for (const s of segs) totals[s.type] = (totals[s.type] || 0) + (s.to - s.from);
    return ['together', 'chorus', 'chop', 'forage', 'opera', 'sleep'].map((t) => ({
      type: t,
      ...TYPES[t],
      hours: totals[t],
    }));
  }, [segs]);

  return (
    <section className="reality" id="reality" ref={ref}>
      {/* perch line: the flock settles in for the honest talk */}
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
          The honest part, made simple
        </p>
        <div className="reality-heading" data-reveal style={{ '--d': '120ms' }}>
          <h2>
            What a parrot <em>actually asks of you.</em>
          </h2>
          <p>
            Not a warning — a syllabus. Birds land in rescue when nobody drew
            them the real picture first. So here's an average day, hour by
            hour. Pick a species; watch the day change.
          </p>
        </div>

        <div className="reality-panel" data-reveal="scale" style={{ '--d': '240ms' }}>
          <div className="reality-dial-col">
            <div className="chip-row" role="group" aria-label="Choose a species">
              {Object.keys(DAYS).map((g) => (
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

            <div className="dial-wrap">
              <svg
                viewBox="0 0 340 340"
                className="dial"
                role="img"
                aria-label={`A ${group}'s day: ${togetherHours} hours of hands-on time, ${DAYS[group].sleep} hours of sleep`}
              >
                {/* hour ticks */}
                {Array.from({ length: 24 }, (_, h) => {
                  const a = (h / 24) * 2 * Math.PI + Math.PI / 2;
                  const r1 = R + 24;
                  const r2 = h % 6 === 0 ? R + 34 : R + 29;
                  return (
                    <line
                      key={h}
                      x1={170 + r1 * Math.cos(a)}
                      y1={170 + r1 * Math.sin(a)}
                      x2={170 + r2 * Math.cos(a)}
                      y2={170 + r2 * Math.sin(a)}
                      stroke="rgba(253,244,224,.35)"
                      strokeWidth={h % 6 === 0 ? 2.4 : 1.2}
                    />
                  );
                })}
                {/* clock labels — outside the tick ring; .dial has overflow visible */}
                <text className="dial-hour" x="170" y="344">midnight</text>
                <text className="dial-hour" x="170" y="2">noon</text>
                <text className="dial-hour dial-side" x="-8" y="174" style={{ textAnchor: 'end' }}>6 pm</text>
                <text className="dial-hour dial-side" x="348" y="174" style={{ textAnchor: 'start' }}>6 am</text>
                {/* track */}
                <circle cx="170" cy="170" r={R} fill="none" stroke="rgba(253,244,224,.09)" strokeWidth="30" />
                {/* segments */}
                {segs.map((s, i) => {
                  const len = ((s.to - s.from) / 24) * C;
                  return (
                    <circle
                      key={i + s.type}
                      className="dial-seg"
                      cx="170"
                      cy="170"
                      r={R}
                      fill="none"
                      stroke={TYPES[s.type].color}
                      strokeWidth="30"
                      strokeDasharray={`${drawn ? Math.max(len - 2.5, 0) : 0} ${C}`}
                      strokeDashoffset={-L(s.from)}
                      strokeLinecap="butt"
                    />
                  );
                })}
                {/* center */}
                <text className="dial-big num" x="170" y="164">
                  {hoursTween.toFixed(1).replace(/\.0$/, '')} h
                </text>
                <text className="dial-sub" x="170" y="192">hands-on time</text>
                <text className="dial-sub" x="170" y="210">every single day</text>
              </svg>
            </div>

            <ul className="dial-legend" aria-hidden="true">
              {legend.map((l) => (
                <li key={l.type}>
                  <i style={{ background: l.color }} />
                  <span>{l.label}</span>
                  <em className="num">
                    {l.hours >= 1 ? `${(+l.hours.toFixed(1)).toString().replace(/\.0$/, '')} h` : `${Math.round(l.hours * 60)} min`}
                  </em>
                </li>
              ))}
            </ul>
          </div>

          <div className="reality-notes">
            {NOTES(sp, group).map((n) => (
              <article className="field-note" key={n.title}>
                <h3>{n.title}</h3>
                <p>{n.body}</p>
                {n.meter && (
                  <span className="field-note-meter">
                    <FeatherMeter level={Math.min(5, Math.max(1, Math.round((sp.decibels - 55) / 14)))} />
                    <em className="num">~{sp.decibels} dB</em>
                  </span>
                )}
              </article>
            ))}
            <a className="field-note-link" href="#/learn">
              The full syllabus lives in our Learn hub →
            </a>
          </div>
        </div>

        <div className="reality-close" data-reveal style={{ '--d': '160ms' }}>
          <p>
            If that day sounds like a good day — <em>you're our kind of
            people.</em> And if you're not sure yet, that's exactly what the
            visits are for.
          </p>
          <div className="reality-ctas">
            <a className="btn btn-gold" href="#/adopt">
              Meet the birds
            </a>
            <a className="btn btn-ghost" href="#/learn">
              Study up first
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
