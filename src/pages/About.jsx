import { ORG } from '../lib/flock.js';
import { useFlock } from '../lib/useFlock.js';
import { useReveal } from '../lib/motion.js';

const BELIEFS = [
  'We do not breed, or place birds with people who breed.',
  'We do not sell, trade, or use the birds in our care for commerce or profit.',
  'We promote responsible guardianship of all captive birds.',
  'We promote education on every issue of avian welfare.',
  'We oppose the sale of un-weaned baby birds and production breeding.',
  'We oppose mass-marketing of birds through pet store chains, bird marts, and internet venues.',
  'We support legislation protecting the rights, health, and safety of birds in captivity.',
];

/* four current residents, one per species group, freshest listing first */
function pickCollage(pool) {
  const seen = new Set();
  const picked = [];
  for (const b of pool) {
    if (seen.has(b.group)) continue;
    seen.add(b.group);
    picked.push(b);
    if (picked.length === 4) break;
  }
  return picked.length === 4 ? picked : pool.slice(0, 4);
}

export default function About() {
  const { birds, fallback } = useFlock();
  const pool = birds || fallback;
  const ref = useReveal([pool.length]);
  const photos = pickCollage(pool);

  return (
    <div className="page-about" ref={ref}>
      <section className="page-head page-head-dark">
        <div className="rail">
          <p className="kicker" data-reveal>
            Our story
          </p>
          <h1 data-reveal style={{ '--d': '120ms' }}>
            Twenty-six years of <em>second chances.</em>
          </h1>
          <p className="page-lead" data-reveal style={{ '--d': '240ms' }}>
            Feathered Friends Sanctuary &amp; Rescue began in {ORG.est} with a
            simple conviction: a parrot in captivity deserves more than survival.
          </p>
        </div>
      </section>

      <section className="about-story">
        <div className="rail about-grid">
          <div className="about-text" data-reveal>
            <h2>Who we are</h2>
            <p>
              We're a 501(c)(3) nonprofit in Edgerton, Wisconsin. For over twenty
              years we've been a safe haven for homeless parrots — with proper
              veterinary care, real nutrition, socialization, mental stimulation,
              and clean, spacious places to live.
            </p>
            <p>
              Our mission is to give these beautiful and intelligent beings{' '}
              <strong>a life worth living</strong>, and we'll do whatever needs
              doing to keep that promise. Many birds need our care indefinitely —
              some for the rest of their lives. That's what sanctuary means.
            </p>
            <p>
              Here's the part we're proudest of: this place runs on{' '}
              <strong>one paid caretaker and an army of volunteers.</strong> The
              caretaker keeps daily care constant; every other hand — the ones
              chopping vegetables, scrubbing cages, and answering your emails —
              belongs to a volunteer. We run on donations and adoption fees, and
              every dollar goes back to the birds.
            </p>
            <div className="about-badges">
              <span className="badge-chip">501(c)(3) nonprofit</span>
              <span className="badge-chip">GuideStar Silver Seal</span>
              <span className="badge-chip">Est. {ORG.est}</span>
              <span className="badge-chip">Volunteer-powered</span>
            </div>
          </div>
          <div className="about-collage" aria-label="Birds who live at the sanctuary">
            {photos.map((b, i) => (
              <figure className={`collage-item collage-${i + 1}`} key={b.slug} data-reveal="scale" style={{ '--d': `${i * 140}ms` }}>
                <img src={b.photo} alt={`${b.name}, ${b.species}`} loading="lazy" />
                <figcaption>{b.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="about-beliefs">
        <div className="rail">
          <p className="kicker" data-reveal>
            What we believe
          </p>
          <h2 data-reveal style={{ '--d': '120ms' }}>
            The convictions we <em>run on.</em>
          </h2>
          <ul className="beliefs stagger">
            {BELIEFS.map((b, i) => (
              <li className="belief" key={i}>
                <span className="belief-num num">{String(i + 1).padStart(2, '0')}</span>
                <p>{b}</p>
              </li>
            ))}
          </ul>
          <div className="about-cta" data-reveal>
            <p>If those beliefs sound like yours, you'll fit right in here.</p>
            <div className="about-cta-btns">
              <a className="btn btn-gold" href="#/adopt">
                Meet the birds
              </a>
              <a className="btn btn-line" href="#/get-involved">
                Volunteer with us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
