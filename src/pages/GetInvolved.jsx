import { ORG } from '../lib/flock.js';
import { useReveal } from '../lib/motion.js';

const ROLES = [
  {
    title: 'In-shelter bird care',
    body: 'Cleaning cages, preparing fresh chop, bathing, feeding, watering, and — the good part — socializing the birds so they\'re ready for their new homes.',
  },
  {
    title: 'Humane education',
    body: 'Go into classrooms with our team and teach kids responsible animal care. Educated kids become the generation that ends bird overpopulation.',
  },
  {
    title: 'Adoption outreach',
    body: 'Represent the flock at off-site adoption events — answer questions, share our policies, and introduce the public to some very persuasive birds.',
  },
  {
    title: 'Special events',
    body: 'Fundraisers and festivals throughout the year: set up our area, run the information booth, and talk birds with everybody who stops by.',
  },
  {
    title: 'Your own superpower',
    body: 'Skilled trades, handyman work, landscaping, veterinary services, accounting — running a sanctuary takes every skill there is. Offer yours.',
  },
];

const MORE_WAYS = [
  {
    title: 'Give',
    body: 'Chop, pellets, vet bills, air conditioning in July — donations keep it all running.',
    cta: 'Donate',
    href: '#/donate',
  },
  {
    title: 'Sponsor a resident',
    body: 'Some birds live out their whole lives here. Sponsorship covers one bird\'s food, enrichment, and vet fund.',
    cta: 'Learn about sponsoring',
    href: '#/donate',
  },
  {
    title: 'Spread the word',
    body: 'Follow us, share adoptable birds, and bring a friend to an event. Every share finds somebody\'s best friend.',
    cta: 'Follow on Facebook',
    href: ORG.facebook,
    external: true,
  },
];

export default function GetInvolved() {
  const ref = useReveal();

  return (
    <div className="page-involved" ref={ref}>
      <section className="page-head page-head-dark">
        <div className="rail">
          <p className="kicker" data-reveal>
            Get involved
          </p>
          <h1 data-reveal style={{ '--d': '120ms' }}>
            The sanctuary runs on <em>people like you.</em>
          </h1>
          <p className="page-lead" data-reveal style={{ '--d': '240ms' }}>
            One paid caretaker, dozens of volunteers, and zero birds who care
            about your résumé. Whether you have two hours a month or a skill we
            haven't thought of, there's a bird whose day you can change.
          </p>
        </div>
      </section>

      {/* ---------- volunteer ---------- */}
      <section className="inv-volunteer" id="volunteer">
        <div className="rail">
          <p className="kicker" data-reveal>
            Volunteer
          </p>
          <h2 data-reveal style={{ '--d': '120ms' }}>
            Five ways to <em>be the good part</em> of a bird's day.
          </h2>
          <div className="roles stagger">
            {ROLES.map((r) => (
              <article className="role" key={r.title}>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </article>
            ))}
          </div>
          <div className="inv-perk" data-reveal>
            <div>
              <h3>Volunteer perk: boarding discounts</h3>
              <p>
                Active volunteers (two shifts a month for 90 days) earn discounts
                on boarding their own birds. The flock takes care of its own.
              </p>
            </div>
            <a className="btn btn-gold" href={ORG.forms.volunteer} target="_blank" rel="noreferrer">
              Volunteer Application ↗
            </a>
          </div>
          <p className="inv-foster-note" data-reveal>
            <strong>About fostering:</strong> we don't run a foster program except
            in rare, specialized-care cases — volunteering is the best way to get
            more birds in your life.
          </p>
        </div>
      </section>

      {/* ---------- more ways ---------- */}
      <section className="inv-more">
        <div className="rail">
          <p className="kicker" data-reveal>
            No spare hours?
          </p>
          <h2 data-reveal style={{ '--d': '120ms' }}>
            Three more ways to <em>matter to a bird.</em>
          </h2>
          <div className="roles stagger">
            {MORE_WAYS.map((w) => (
              <article className="role role-cta" key={w.title}>
                <h3>{w.title}</h3>
                <p>{w.body}</p>
                <a
                  className="role-link"
                  href={w.href}
                  target={w.external ? '_blank' : undefined}
                  rel={w.external ? 'noreferrer' : undefined}
                >
                  {w.cta} →
                </a>
              </article>
            ))}
          </div>
          <p className="inv-services-note" data-reveal>
            Looking for <strong>boarding</strong> or need to{' '}
            <strong>surrender a bird</strong>? Those live on their{' '}
            <a href="#/boarding">own page</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
