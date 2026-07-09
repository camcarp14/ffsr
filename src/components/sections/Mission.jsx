import { useReveal, useCountUp } from '../../lib/motion.js';
import { useFlock } from '../../lib/useFlock.js';

function Stat({ value, suffix, label, delay }) {
  const [ref, display] = useCountUp(value);
  return (
    <div className="stat" data-reveal style={{ '--d': `${delay}ms` }}>
      <span className="stat-num num" ref={ref}>
        {display}
        {suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export default function Mission() {
  const { birds, fallback } = useFlock();
  const count = (birds || fallback).length;
  const ref = useReveal([count]);
  return (
    <section className="mission" id="mission" ref={ref}>
      <div className="rail">
        <p className="kicker" data-reveal>
          Why we exist
        </p>
        <h2 className="mission-title" data-reveal style={{ '--d': '120ms' }}>
          A parrot isn't a pet you own. It's a <em>decades-long friendship</em> you're
          invited into.
        </h2>
        <div className="mission-body" data-reveal style={{ '--d': '260ms' }}>
          <p>
            Since 2000, Feathered Friends has been a safe haven for parrots living in
            captivity — with proper veterinary care, good nutrition, big clean spaces,
            and company that understands them. Our mission is plain: give these
            beautiful, intelligent beings <strong>a life worth living</strong>.
          </p>
          <p>
            Some of our birds go home with carefully matched families. Some live out
            their whole long lives here, in sanctuary. Nobody profits, nobody rushes,
            and nobody gets given up on twice.
          </p>
        </div>
        <div className="stats">
          <Stat value={26} suffix="" label="years of rescue in Edgerton, Wisconsin" delay={0} />
          <Stat value={count} suffix="" label="birds in residence right now, each with a story" delay={120} />
          <Stat value={1} suffix="" label="paid caretaker — every other hand belongs to a volunteer" delay={240} />
          <Stat value={100} suffix="%" label="funded by donations and adoption fees. That's it" delay={360} />
        </div>
      </div>
    </section>
  );
}
