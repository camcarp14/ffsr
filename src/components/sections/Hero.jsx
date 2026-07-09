import Murmuration from '../Murmuration.jsx';
import { useReveal } from '../../lib/motion.js';

export default function Hero() {
  const ref = useReveal();

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero-sky" aria-hidden="true" />
      <Murmuration />
      <div className="hero-content rail">
        <p className="kicker hero-kicker" data-reveal style={{ '--d': '100ms' }}>
          Edgerton, Wisconsin · a 501(c)(3) sanctuary since 2000
        </p>
        <h1 className="hero-title">
          <span data-reveal style={{ '--d': '250ms' }}>Every parrot is sold</span>
          <span data-reveal style={{ '--d': '400ms' }}>with a promise of <em>forever.</em></span>
          <span className="hero-title-accent" data-reveal style={{ '--d': '580ms' }}>
            This is where forever is kept.
          </span>
        </h1>
        <p className="hero-sub" data-reveal style={{ '--d': '760ms' }}>
          Feathered Friends is a safe haven for the parrots people couldn't keep —
          and the place to meet one you truly can. Adopt honestly. Give generously.
          Stay for the whole long life of the bird.
        </p>
        <div className="hero-ctas" data-reveal style={{ '--d': '920ms' }}>
          <a className="btn btn-gold" href="#flock">
            Meet the flock
          </a>
          <a className="btn btn-ghost" href="#donate">
            Support the sanctuary
          </a>
        </div>
      </div>
      <a className="scroll-cue" href="#landings" data-reveal="fade" style={{ '--d': '1400ms' }} aria-label="Scroll to content">
        <span>The flock is overhead — come down to the perches</span>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 4v15m0 0l-6-6m6 6l6-6" />
        </svg>
      </a>
    </section>
  );
}
