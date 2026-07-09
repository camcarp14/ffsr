import { useEffect, useRef, useState } from 'react';
import { LEARN, SAFE_FOODS, TOXIC_FOODS, VETS, SOURCES } from '../lib/learn.js';
import { ORG } from '../lib/flock.js';
import { useReveal } from '../lib/motion.js';

/* ============================================================
   LEARN — the education hub. Sticky section nav with scrollspy,
   field-guide entries, the safe/never food grid, and the
   sanctuary's recommended reading.
   ============================================================ */

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: '-25% 0px -65% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

export default function Learn() {
  const ref = useReveal();
  const active = useScrollSpy(LEARN.map((s) => s.id));

  return (
    <div className="page-learn" ref={ref}>
      <section className="page-head page-head-dark">
        <div className="rail">
          <p className="kicker" data-reveal>
            The learn hub
          </p>
          <h1 data-reveal style={{ '--d': '120ms' }}>
            Everything we wish <em>every bird owner knew.</em>
          </h1>
          <p className="page-lead" data-reveal style={{ '--d': '240ms' }}>
            Twenty-six years of rescue distilled into a field guide. Read it
            before you adopt, after you adopt, or at 6 a.m. while somebody
            yells at the sunrise — that last one is normal, see chapter two.
          </p>
        </div>
      </section>

      <section className="learn-body">
        <div className="rail learn-grid">
          <nav className="learn-nav" aria-label="Guide sections">
            <p className="learn-nav-title">Field guide</p>
            {LEARN.map((s, i) => (
              <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'on' : ''} onClick={(e) => {
                e.preventDefault();
                document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}>
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                {s.nav}
              </a>
            ))}
            <a className="learn-nav-cta btn btn-ink" href="#/adopt">
              Meet the birds
            </a>
          </nav>

          <div className="learn-content">
            {LEARN.map((section, si) => (
              <section className="learn-section" id={section.id} key={section.id}>
                <p className="kicker" data-reveal>
                  Chapter {String(si + 1).padStart(2, '0')}
                </p>
                <h2 data-reveal style={{ '--d': '80ms' }}>{section.title}</h2>
                <p className="learn-lead" data-reveal style={{ '--d': '160ms' }}>
                  {section.lead}
                </p>

                <div className="learn-entries">
                  {section.entries.map((e, i) => (
                    <article className="learn-entry" data-reveal key={e.title} style={{ '--d': `${(i % 3) * 90}ms` }}>
                      <span className="entry-num num">{String(si + 1).padStart(2, '0')}.{i + 1}</span>
                      <h3>{e.title}</h3>
                      <p>{e.body}</p>
                      {e.vets && (
                        <ul className="vet-list">
                          {VETS.map((v) => (
                            <li key={v.name}>
                              <strong>{v.name}</strong>
                              <span>{v.blurb}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  ))}
                </div>

                {section.foods && (
                  <div className="food-grid" data-reveal>
                    <div className="food-col food-safe">
                      <h3>
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M4 12.5l5 5L20 6.5" />
                        </svg>
                        On the menu
                      </h3>
                      <ul>
                        {SAFE_FOODS.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="food-col food-toxic">
                      <h3>
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
                          <path d="M6 6l12 12M18 6L6 18" />
                        </svg>
                        Never. Not once.
                      </h3>
                      <ul>
                        {TOXIC_FOODS.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                      <p className="food-note">
                        Ate something on this list? Call your avian vet or the
                        ASPCA poison line (888-426-4435) immediately.
                      </p>
                    </div>
                  </div>
                )}
              </section>
            ))}

            <div className="learn-sources" data-reveal>
              <h2>Reading we trust</h2>
              <p>
                The same resources our volunteers recommend at every education
                visit:
              </p>
              <ul>
                {SOURCES.map((s) => (
                  <li key={s.name}>
                    <a href={s.url} target="_blank" rel="noreferrer">
                      {s.name} ↗
                    </a>
                    <span>{s.note}</span>
                  </li>
                ))}
              </ul>
              <p className="learn-sources-foot">
                Questions the guide didn't answer?{' '}
                <a href={`mailto:${ORG.email}`}>Email the flock</a> — education
                is literally our mission.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
