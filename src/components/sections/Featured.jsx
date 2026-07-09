import { useState } from 'react';
import { BIRDS } from '../../lib/birds.js';
import { useReveal } from '../../lib/motion.js';
import BirdCard from '../BirdCard.jsx';
import BirdModal from '../BirdModal.jsx';

const FEATURED = ['koda', 'puddin', 'rio', 'elsa-olaf', 'city', 'boyd-floyd'];

export default function Featured() {
  const ref = useReveal();
  const [openBird, setOpenBird] = useState(null);
  const birds = FEATURED.map((slug) => BIRDS.find((b) => b.slug === slug)).filter(Boolean);

  return (
    <section className="flock" id="flock" ref={ref}>
      <div className="rail">
        <p className="kicker" data-reveal>
          Meet the flock
        </p>
        <div className="flock-heading" data-reveal style={{ '--d': '120ms' }}>
          <h2>
            Somebody here has been <em>waiting for you.</em>
          </h2>
          <p>
            Every listing tells you the truth — the volume, the years, the
            personality quirks — because the right match never needs a sales
            pitch. Here are a few of the {BIRDS.length} birds in residence.
          </p>
        </div>
        <div className="flock-grid stagger">
          {birds.map((bird) => (
            <BirdCard bird={bird} key={bird.slug} onOpen={setOpenBird} />
          ))}
        </div>
        <div className="flock-all" data-reveal>
          <a className="btn btn-ink" href="#/adopt">
            See all {BIRDS.length} birds →
          </a>
        </div>
      </div>
      {openBird && <BirdModal bird={openBird} onClose={() => setOpenBird(null)} />}
    </section>
  );
}
