import Murmuration from '../Murmuration.jsx';
import { useReveal } from '../../lib/motion.js';
import { BIRDS } from '../../lib/birds.js';

const HERO_BIRDS = [
  { slug: 'marco', pos: '50% 18%' },
  { slug: 'savannah', pos: '42% 12%' },
];

export default function Hero() {
  const ref = useReveal();
  const featured = HERO_BIRDS.map((h) => ({
    ...BIRDS.find((b) => b.slug === h.slug),
    pos: h.pos,
  }));

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero-sky" aria-hidden="true" />
      <Murmuration />
      <div className="hero-grid rail">
        <div className="hero-content">
          <p className="kicker hero-kicker" data-reveal style={{ '--d': '100ms' }}>
            Edgerton, Wisconsin · a 501(c)(3) sanctuary since 2000
          </p>
          <h1 className="hero-title">
            <span data-reveal style={{ '--d': '250ms' }}>Every parrot deserves</span>
            <span data-reveal style={{ '--d': '400ms' }}>a life <em>worth living.</em></span>
            <span className="hero-title-accent" data-reveal style={{ '--d': '580ms' }}>
              {BIRDS.length} of them are here, waiting to meet you.
            </span>
          </h1>
          <p className="hero-sub" data-reveal style={{ '--d': '760ms' }}>
            Feathered Friends is an all-volunteer sanctuary and rescue for
            companion parrots. Meet the flock, fall in love carefully, and
            stay for the whole wonderful ride.
          </p>
          <div className="hero-ctas" data-reveal style={{ '--d': '920ms' }}>
            <a className="btn btn-gold" href="#/adopt">
              Meet the birds
            </a>
            <a className="btn btn-ghost" href="#/donate">
              Support the sanctuary
            </a>
          </div>
        </div>
        <div className="hero-birds" aria-label="Two of our adoptable birds">
          {featured.map((b, i) => (
            <a
              className={`hero-bird hero-bird-${i + 1}`}
              key={b.slug}
              href="#/adopt"
              data-reveal={i === 0 ? 'right' : 'scale'}
              style={{ '--d': `${500 + i * 220}ms` }}
            >
              <img src={b.photo} alt={`${b.name}, ${b.species}`} style={{ objectPosition: b.pos }} />
              <span className="hero-bird-tag">
                <strong>{b.name}</strong>
                {b.species}
              </span>
            </a>
          ))}
        </div>
      </div>
      <a className="scroll-cue" href="#mission" data-reveal="fade" style={{ '--d': '1400ms' }} aria-label="Scroll to content">
        <span>Come down to the perches</span>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 4v15m0 0l-6-6m6 6l6-6" />
        </svg>
      </a>
    </section>
  );
}
