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

const BOARDING_RATES = [
  { price: 15, per: '/day', who: 'Budgies, parakeets, cockatiels, parrotlets, conures, Senegals…' },
  { price: 20, per: '/day', who: 'Amazons, greys, eclectus, Alexandrines…' },
  { price: 30, per: '/day', who: 'Macaws, cockatoos…' },
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
            Nobody here draws a salary — volunteers are the lifeblood of this
            place. Whether you have two hours a month or a skill we haven't
            thought of, there's a bird whose day you can change.
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

      {/* ---------- boarding ---------- */}
      <section className="inv-boarding" id="boarding">
        <div className="rail">
          <p className="kicker" data-reveal>
            Boarding
          </p>
          <h2 data-reveal style={{ '--d': '120ms' }}>
            Going away? Your bird can <em>flock with ours.</em>
          </h2>
          <div className="boarding-grid">
            <div className="boarding-rates stagger">
              {BOARDING_RATES.map((r) => (
                <div className="rate" key={r.price}>
                  <span className="rate-price num">
                    ${r.price}
                    <em>{r.per}</em>
                  </span>
                  <p>{r.who}</p>
                </div>
              ))}
              <p className="rate-note" data-reveal>
                10% off if you bring your own cage — or we'll happily set up one
                of ours at no charge. Active volunteers earn additional discounts.
              </p>
            </div>
            <div className="boarding-reqs" data-reveal="right">
              <h3>Before your bird checks in</h3>
              <ul>
                <li>
                  <strong>Vet exam required</strong> — proof of an exam by an avian
                  veterinarian, with any recommended diagnostics pursued.
                </li>
                <li>
                  <strong>Disease testing</strong> — Psittacosis, PBFD, Avian
                  Polyomavirus, Psittacine Herpes (PsHV-1), and Avian Bornavirus.
                  It protects every bird in the building, including yours.
                </li>
                <li>
                  <strong>Book a week ahead</strong> — the boarding contract must
                  arrive at least one week before any stay. One form per bird.
                </li>
                <li>
                  <strong>Food</strong> — we serve fresh chop in the morning and
                  TOPS pellets in the evening at no charge. On a different diet?
                  Send it along so nobody's stomach gets surprised.
                </li>
              </ul>
              <a className="btn btn-ink" href={ORG.forms.boarding} target="_blank" rel="noreferrer">
                Boarding Form ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- surrender ---------- */}
      <section className="inv-surrender" id="surrender">
        <div className="rail">
          <p className="kicker" data-reveal>
            Surrender
          </p>
          <h2 data-reveal style={{ '--d': '120ms' }}>
            Life changes. <em>We're here for that.</em>
          </h2>
          <div className="surrender-grid">
            <div className="surrender-text" data-reveal>
              <p>
                Our mission includes sheltering parrots whose people can no longer
                care for them. If that's where you are:{' '}
                <strong>your decision will be met without judgment</strong>, and
                everything you share stays strictly confidential.
              </p>
              <p>
                Space is limited, so we run surrenders on a waiting list, opening
                for intake about once every 30 days and reaching out by urgency —
                it can take several months. If your situation is an emergency,
                email us and we'll help you find a sanctuary that can take your
                bird sooner.
              </p>
              <p>
                There's no mandatory surrender fee. Many owners choose a one-time
                or continuing donation toward their bird's care until the right
                forever home comes along — always welcome, never required.
              </p>
            </div>
            <div className="surrender-cta" data-reveal="right">
              <h3>How it starts</h3>
              <p>
                The Surrender Form puts your bird on our waiting list. We'll
                reach out as soon as we have it.
              </p>
              <a className="btn btn-ink" href={ORG.forms.surrender} target="_blank" rel="noreferrer">
                Surrender Form ↗
              </a>
              <a className="surrender-mail" href={`mailto:${ORG.email}?subject=${encodeURIComponent('Surrender question')}`}>
                or email us with questions first
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
