import { ORG } from '../../lib/flock.js';
import { useReveal } from '../../lib/motion.js';

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
          {/* postcard from Edgerton: barn, fields, and a very loud roofline */}
          <svg viewBox="0 0 420 320" role="img" aria-label="Illustration of the sanctuary in Edgerton, Wisconsin">
            <defs>
              <linearGradient id="pc-sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f2c14e" />
                <stop offset="55%" stopColor="#e8a33d" />
                <stop offset="100%" stopColor="#d98c54" />
              </linearGradient>
            </defs>
            <rect width="420" height="320" rx="14" fill="url(#pc-sky)" />
            <circle cx="330" cy="74" r="34" fill="#faf5ea" opacity=".9" />
            {/* distant treeline */}
            <path d="M0 190 Q40 176 80 188 Q120 174 160 186 Q210 172 260 186 Q320 174 420 188 L420 320 L0 320 Z" fill="#2e6b5e" />
            {/* field */}
            <path d="M0 218 Q140 204 420 216 L420 320 L0 320 Z" fill="#17453c" />
            {/* barn */}
            <g>
              <path d="M120 156 L190 120 L260 156 L260 234 L120 234 Z" fill="#c43a2a" />
              <path d="M112 160 L190 116 L268 160 L258 150 L190 112 L122 150 Z" fill="#7a2417" />
              <rect x="172" y="186" width="36" height="48" rx="2" fill="#7a2417" />
              <path d="M172 186 h36 M190 186 v48 M172 210 h36" stroke="#faf5ea" strokeWidth="2.4" opacity=".6" />
              <rect x="136" y="170" width="20" height="16" rx="2" fill="#faf5ea" opacity=".85" />
              <rect x="224" y="170" width="20" height="16" rx="2" fill="#faf5ea" opacity=".85" />
            </g>
            {/* birds on the roofline + leaving */}
            <g stroke="#0d2622" strokeWidth="2.6" fill="none" strokeLinecap="round">
              <path d="M150 132 q5 -8 10 0 M160 128 q5 -8 10 0" transform="translate(-16 -26)" />
              <path d="M262 96 q5 -8 10 0" />
              <path d="M300 78 q4 -7 9 0" />
              <path d="M330 108 q4 -7 9 0" />
            </g>
            {/* fence */}
            <path d="M24 250 h372 M44 236 v28 M104 236 v28 M164 236 v28 M224 236 v28 M284 236 v28 M344 236 v28" stroke="#a98b66" strokeWidth="4" strokeLinecap="round" fill="none" />
            <text x="30" y="300" fontFamily="Georgia, serif" fontSize="19" fontStyle="italic" fill="#faf5ea">
              Greetings from Edgerton, Wisconsin
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
