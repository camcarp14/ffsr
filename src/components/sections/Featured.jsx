import { useState } from 'react';
import { useFlock } from '../../lib/useFlock.js';
import { useReveal } from '../../lib/motion.js';
import BirdCard from '../BirdCard.jsx';
import BirdModal from '../BirdModal.jsx';

/* one bird per species group, most variety first, six total */
function pickFeatured(pool) {
  const order = ['Macaw', 'Cockatoo', 'Conure', 'Cockatiel', 'Other', 'Amazon', 'Parakeet', 'African Grey'];
  const picked = [];
  for (const g of order) {
    const bird = pool.find((b) => b.group === g && !picked.includes(b));
    if (bird) picked.push(bird);
    if (picked.length === 6) return picked;
  }
  for (const b of pool) {
    if (!picked.includes(b)) picked.push(b);
    if (picked.length === 6) break;
  }
  return picked;
}

export default function Featured() {
  const ref = useReveal();
  const [openBird, setOpenBird] = useState(null);
  const { birds, fallback } = useFlock();
  const pool = birds || fallback;
  const six = pickFeatured(pool);

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
            pitch. Here are a few of the {pool.length} birds in residence.
          </p>
        </div>
        <div className="flock-grid stagger">
          {six.map((bird) => (
            <BirdCard bird={bird} key={bird.slug} onOpen={setOpenBird} />
          ))}
        </div>
        <div className="flock-all" data-reveal>
          <a className="btn btn-ink" href="#/adopt">
            See all {pool.length} birds →
          </a>
        </div>
      </div>
      {openBird && <BirdModal bird={openBird} onClose={() => setOpenBird(null)} />}
    </section>
  );
}
