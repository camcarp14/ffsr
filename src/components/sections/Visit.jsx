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
            {/* the building: long, low, gray corrugated metal */}
            <g>
              {/* roof with overhang */}
              <path d="M106 170 L120 152 L360 152 L372 170 Z" fill="#e9edee" />
              <path d="M106 170 L120 152 L360 152 L372 170" fill="none" stroke="#c3cccd" strokeWidth="2" />
              {/* wall */}
              <rect x="112" y="170" width="252" height="64" fill="#cdd3d5" />
              <rect x="112" y="170" width="252" height="64" fill="none" stroke="#aeb7b9" strokeWidth="1.6" />
              {/* corrugated siding ribs */}
              <path d="M124 171 v62 M136 171 v62 M148 171 v62 M160 171 v62 M172 171 v62 M184 171 v62 M196 171 v62 M240 171 v62 M252 171 v62 M340 171 v62 M352 171 v62" stroke="#bfc7c9" strokeWidth="1.2" />
              {/* stripe: orange band with thin blue pinstripes */}
              <rect x="112" y="196" width="252" height="1.8" fill="#3f6fb5" />
              <rect x="112" y="199" width="252" height="7" fill="#e8703a" />
              <rect x="112" y="207.5" width="252" height="1.8" fill="#3f6fb5" />
              {/* small window left of the door */}
              <rect x="164" y="180" width="18" height="14" rx="1.5" fill="#9fc4cc" stroke="#f5f2ea" strokeWidth="2" />
              {/* the door: white with a tall glass pane */}
              <rect x="204" y="182" width="24" height="52" rx="2" fill="#f7f5ef" stroke="#aeb7b9" strokeWidth="1.6" />
              <rect x="208" y="187" width="16" height="28" rx="1.5" fill="#9fc4cc" />
              <circle cx="224.5" cy="212" r="1.6" fill="#8a8f92" />
              {/* wall sign right of the door: Feathered Friends Sanctuary */}
              <g>
                <rect x="244" y="176" width="92" height="40" rx="3" fill="#4a4038" />
                <rect x="247" y="179" width="86" height="34" rx="2" fill="#faf5ea" />
                {/* left bird */}
                <path d="M254 190 c 5 -6 11 -4 12 1 c 1 5 -3 10 -8 11 c -2 -4 -4 -8 -4 -12 z" fill="#3da35d" />
                <path d="M255 189 c 2 -3 6 -4 8 -2" fill="none" stroke="#e8912d" strokeWidth="2" strokeLinecap="round" />
                {/* right bird */}
                <path d="M326 190 c -5 -6 -11 -4 -12 1 c -1 5 3 10 8 11 c 2 -4 4 -8 4 -12 z" fill="#c43a2a" />
                <path d="M318 200 c 1 4 0 8 -2 10" stroke="#c43a2a" strokeWidth="2.4" strokeLinecap="round" fill="none" />
                {/* lettering */}
                <path d="M272 185 h36 M276 191 h28" stroke="#b03a30" strokeWidth="3" strokeLinecap="round" />
                <path d="M272 198 h36 M274 203 h32" stroke="#4a5560" strokeWidth="2" strokeLinecap="round" />
                <path d="M270 209 h40" stroke="#3f6fb5" strokeWidth="1.8" strokeLinecap="round" />
              </g>
              {/* downspout at the left corner */}
              <path d="M115 156 v78" stroke="#e9edee" strokeWidth="4" strokeLinecap="round" />
              <path d="M115 156 v78" stroke="#c3cccd" strokeWidth="1" />
            </g>
            {/* black walkway mat in front of the door */}
            <path d="M196 234 L238 234 L252 258 L184 258 Z" fill="#3a3f44" />
            {/* fresh asphalt lot, rounded like the photo */}
            <path d="M94 246 C 150 236 322 236 388 250 C 402 264 400 284 382 296 C 300 310 158 310 108 296 C 86 280 84 260 94 246 Z" fill="#4a4f54" />
            <path d="M94 246 C 150 236 322 236 388 250" fill="none" stroke="#3a3f44" strokeWidth="3" opacity=".6" />
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
