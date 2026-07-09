import { ORG } from '../../lib/flock.js';
import { useReveal } from '../../lib/motion.js';
import Wave from '../Wave.jsx';

export default function Visit() {
  const ref = useReveal();
  return (
    <section className="visit" id="visit" ref={ref}>
      <div className="rail visit-grid">
        <div className="visit-info" data-reveal>
          <p className="kicker">Come meet everyone</p>
          <h2>
            Visits are <em>by appointment</em> — the flock insists.
          </h2>
          <p className="visit-body">
            Drop-ins stress the birds (and the humans mid-feeding). Write to us
            first, tell us who you'd like to meet, and we'll set a time when the
            sanctuary is calm and the coffee is on.
          </p>
          <dl className="visit-details">
            <div>
              <dt>Where</dt>
              <dd>{ORG.address}</dd>
            </div>
            <div>
              <dt>Write</dt>
              <dd>
                <a href={`mailto:${ORG.email}`}>{ORG.email}</a>
              </dd>
            </div>
            <div>
              <dt>Call</dt>
              <dd>
                <a href={`tel:+1${ORG.phone.replaceAll('-', '')}`}>{ORG.phone}</a>
                <em> · {ORG.phoneNote}</em>
              </dd>
            </div>
          </dl>
          <a className="btn btn-ink" href={`mailto:${ORG.email}?subject=${encodeURIComponent('Visit request')}`}>
            Request a visit
          </a>
        </div>
        <div className="visit-postcard" data-reveal="right" style={{ '--d': '160ms' }} aria-hidden="true">
          {/* postcard of the real place: the long gray building with its
              orange stripe, the fresh asphalt lot, and the yard sign */}
          <svg viewBox="0 0 420 320" role="img" aria-label="Illustration of the sanctuary building in Edgerton, Wisconsin">
            <defs>
              <linearGradient id="pc-sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f2c14e" />
                <stop offset="55%" stopColor="#e8a33d" />
                <stop offset="100%" stopColor="#d98c54" />
              </linearGradient>
            </defs>
            <rect width="420" height="320" rx="14" fill="url(#pc-sky)" />
            <circle cx="316" cy="64" r="28" fill="#faf5ea" opacity=".9" />
            {/* distant treeline + meadow */}
            <path d="M0 172 Q40 156 80 170 Q120 154 160 168 Q210 152 260 168 Q320 154 420 170 L420 320 L0 320 Z" fill="#14958f" />
            <path d="M0 200 Q140 186 420 196 L420 320 L0 320 Z" fill="#4d9c4c" />
            {/* the building: long, low, gray metal with the orange stripe */}
            <g>
              <path d="M110 170 L126 150 L354 150 L368 170 Z" fill="#e9edee" />
              <path d="M110 170 L126 150 L354 150 L368 170" fill="none" stroke="#c3cccd" strokeWidth="2" />
              <rect x="116" y="170" width="246" height="62" fill="#cdd3d5" />
              <rect x="116" y="170" width="246" height="62" fill="none" stroke="#aeb7b9" strokeWidth="1.6" />
              <rect x="116" y="178" width="246" height="7" fill="#e8703a" />
              <path d="M150 185 v47 M192 185 v47 M234 185 v47 M276 185 v47 M318 185 v47 M348 185 v47" stroke="#b9c1c3" strokeWidth="1.4" />
              {/* left entry: door with window + logo sign beside it */}
              <rect x="160" y="194" width="20" height="38" rx="1.5" fill="#f5f2ea" stroke="#aeb7b9" strokeWidth="1.4" />
              <rect x="165" y="200" width="10" height="12" rx="1" fill="#9fc4cc" />
              <rect x="186" y="196" width="14" height="18" rx="1.5" fill="#f5f2ea" stroke="#aeb7b9" strokeWidth="1.2" />
              <circle cx="193" cy="203" r="4.4" fill="#1e3a78" />
              {/* window */}
              <rect x="248" y="196" width="22" height="16" rx="1.5" fill="#9fc4cc" stroke="#f5f2ea" strokeWidth="2" />
              {/* right door + tidy vent */}
              <rect x="298" y="194" width="20" height="38" rx="1.5" fill="#e8e5dc" stroke="#aeb7b9" strokeWidth="1.4" />
              <rect x="332" y="196" width="12" height="10" rx="1" fill="#b9c1c3" />
            </g>
            {/* yard sign on the left lawn */}
            <g>
              <path d="M44 204 v26 M76 204 v26" stroke="#8a5a3b" strokeWidth="4" strokeLinecap="round" />
              <rect x="34" y="186" width="52" height="24" rx="5" fill="#faf5ea" stroke="#8a5a3b" strokeWidth="2" />
              <circle cx="48" cy="198" r="6" fill="#1e3a78" />
              <path d="M58 194 h20 M58 200 h20" stroke="#1e3a78" strokeWidth="2.4" strokeLinecap="round" />
            </g>
            {/* fresh asphalt lot, rounded like the photo */}
            <path d="M94 242 C 150 230 322 230 388 244 C 402 260 400 282 382 296 C 300 310 158 310 108 296 C 86 280 84 256 94 242 Z" fill="#4a4f54" />
            <path d="M94 242 C 150 230 322 230 388 244" fill="none" stroke="#3a3f44" strokeWidth="3" opacity=".6" />
            {/* birds over the roofline */}
            <g stroke="#063b42" strokeWidth="2.6" fill="none" strokeLinecap="round">
              <path d="M258 124 q5 -8 10 0" />
              <path d="M292 108 q4 -7 9 0" />
              <path d="M328 130 q4 -7 9 0" />
            </g>
            {/* overhanging foliage, like the photo's framing */}
            <g fill="#2e8b57">
              <ellipse cx="12" cy="22" rx="62" ry="30" />
              <ellipse cx="72" cy="2" rx="70" ry="26" />
              <ellipse cx="410" cy="16" rx="66" ry="30" />
              <ellipse cx="378" cy="-6" rx="60" ry="24" />
            </g>
            <g fill="#3da35d" opacity=".85">
              <ellipse cx="34" cy="6" rx="46" ry="20" />
              <ellipse cx="400" cy="-2" rx="48" ry="20" />
            </g>
            <text x="30" y="300" fontFamily="Georgia, serif" fontSize="19" fontStyle="italic" fill="#faf5ea">
              Greetings from Edgerton, Wisconsin
            </text>
          </svg>
        </div>
      </div>
      <Wave color="var(--night)" className="section-wave" />
    </section>
  );
}
