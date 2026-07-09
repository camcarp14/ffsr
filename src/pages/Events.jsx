import { ORG } from '../lib/flock.js';
import { useReveal } from '../lib/motion.js';
import { useUpcomingEvents } from '../lib/db.js';

/* ============================================================
   EVENTS — the sanctuary announces everything on Facebook
   first, so the page embeds the live page feed and explains
   what kinds of events to watch for.
   ============================================================ */

const FB_EMBED =
  'https://www.facebook.com/plugins/page.php?href=' +
  encodeURIComponent(ORG.facebook) +
  '&tabs=timeline&width=500&height=740&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false';

const KINDS = [
  {
    title: 'Trim days',
    body: 'Wing, beak, and nail trims for the public\'s birds, held at the sanctuary a few times a year. Spots go fast — they\'re announced on Facebook first.',
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="15" cy="16" r="5" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <circle cx="15" cy="32" r="5" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <path d="M19 19 L38 36 M19 29 L38 12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    title: 'Tours & open houses',
    body: 'Meet the whole flock in person. Visits are always by appointment — email us and we\'ll set a time when the sanctuary is calm.',
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M8 22 L24 8 L40 22 M12 19 v19 h24 v-19" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M20 38 v-9 h8 v9" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Outreach & fundraisers',
    body: 'Find our booth at fairs and community events around southern Wisconsin — volunteers, adoptable-bird info, and the occasional celebrity parrot.',
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M10 20 h28 l-4 18 h-20 z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M16 20 c0 -7 4 -11 8 -11 c4 0 8 4 8 11" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Events() {
  const upcoming = useUpcomingEvents(); // posted by volunteers in the team portal
  const ref = useReveal([upcoming.length]);
  return (
    <div className="page-events" ref={ref}>
      <section className="page-head page-head-dark">
        <div className="rail">
          <p className="kicker" data-reveal>
            Events
          </p>
          <h1 data-reveal style={{ '--d': '120ms' }}>
            Where the flock <em>gathers.</em>
          </h1>
          <p className="page-lead" data-reveal style={{ '--d': '240ms' }}>
            Everything happening at the sanctuary — trim days, tours,
            fundraisers, new arrivals — lands on our Facebook page first. The
            feed below is live, so what you see is what's on.
          </p>
        </div>
      </section>

      <section className="events-body">
        <div className="rail events-grid">
          <div className="events-info">
            {upcoming.length > 0 && (
              <div className="upcoming-block" data-reveal>
                <h2>Mark your calendar</h2>
                <ul className="upcoming-list">
                  {upcoming.map((e) => (
                    <li key={e.id}>
                      <span className="upcoming-when num">
                        {new Date(e.starts_at).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </span>
                      <div>
                        <strong>{e.title}</strong>
                        <p>{e.blurb}</p>
                        <em>{e.location}</em>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <h2 data-reveal>The usual suspects</h2>
            <div className="event-kinds stagger">
              {KINDS.map((k) => (
                <article className="event-kind" key={k.title}>
                  <span className="event-icon">{k.icon}</span>
                  <h3>{k.title}</h3>
                  <p>{k.body}</p>
                </article>
              ))}
            </div>
            <div className="events-cta" data-reveal>
              <a className="btn btn-gold" href={ORG.facebook} target="_blank" rel="noreferrer">
                Follow us on Facebook ↗
              </a>
              <a className="btn btn-line" href={`mailto:${ORG.email}?subject=${encodeURIComponent('Visit request')}`}>
                Request a visit
              </a>
            </div>
          </div>

          <aside className="fb-card" data-reveal="right" style={{ '--d': '160ms' }}>
            <iframe
              src={FB_EMBED}
              title="Feathered Friends Sanctuary & Rescue on Facebook"
              width="500"
              height="740"
              style={{ border: 'none', overflow: 'hidden' }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              loading="lazy"
            />
            <p className="fb-note">
              Feed not loading? Some browsers block embeds —{' '}
              <a href={ORG.facebook} target="_blank" rel="noreferrer">
                open our page directly
              </a>
              .
            </p>
          </aside>
        </div>
      </section>
    </div>
  );
}
