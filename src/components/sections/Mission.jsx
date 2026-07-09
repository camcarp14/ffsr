import { useReveal, useCountUp } from '../../lib/motion.js';

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
  const ref = useReveal();
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
            captivity — the loud ones, the plucked ones, the sweet ones whose people
            simply couldn't keep the promise. Our mission is plain: give these
            beautiful, intelligent beings <strong>a life worth living</strong>.
          </p>
          <p>
            Some of our birds go home with carefully matched families. Some live out
            their whole long lives here, in sanctuary. Either way, nobody gets given
            up on twice.
          </p>
        </div>
        <div className="stats">
          <Stat value={26} suffix="" label="years of rescue in Edgerton, Wisconsin" delay={0} />
          <Stat value={80} suffix="" label="years a macaw can live — longer than most marriages" delay={120} />
          <Stat value={120} suffix=" dB" label="how loud a cockatoo gets. Front-row-of-a-concert loud" delay={240} />
          <Stat value={0} suffix="" label="birds we will ever give up on" delay={360} />
        </div>
      </div>
    </section>
  );
}
