/* ============================================================
   PERCH FLOCK — kawaii sticker-style parrots: plump bodies,
   dot eyes, big rosy cheeks, tiny triangle beaks, soft warm
   outlines. One Birdy, many species coats.
   ============================================================ */

const LINE = '#4a3828';
const LW = 2;

const SPECIES_ART = {
  macaw: {
    body: '#3f8fd4', belly: '#ffcf5c', wing: '#2f6eb0', tail: ['#2f6eb0', '#ffb547'],
    cheek: '#f7b8ad', crown: '#37b3a8',
  },
  cockatoo: {
    body: '#fdf6e8', belly: '#fbeed2', wing: '#efe2c4', tail: ['#efe2c4', '#fdf6e8'],
    cheek: '#f9c3b5', crest: '#ffd35c', crestType: 'big',
  },
  grey: {
    body: '#b9bcc2', belly: '#d3d6da', wing: '#a3a7ae', tail: ['#e04e3f', '#c43a2a'],
    cheek: '#f2b7ac', face: '#eceef0',
  },
  amazon: {
    body: '#63b45f', belly: '#8fd08a', wing: '#4d9c4c', tail: ['#4d9c4c', '#ffd35c'],
    cheek: '#f7b3a5', crown: '#ffd35c',
  },
  conure: {
    body: '#ffb547', belly: '#ffd97a', wing: '#f5953f', tail: ['#63b45f', '#3f8fd4'],
    cheek: '#ff9d8a', crown: '#ffd35c',
  },
  cockatiel: {
    body: '#cfc4b4', belly: '#e4dccd', wing: '#bab0a0', tail: ['#bab0a0', '#9d937f'],
    cheek: '#ff9556', face: '#ffe084', crest: '#ffe084', crestType: 'tiel',
  },
  budgie: {
    body: '#8fd06e', belly: '#b8e59e', wing: '#79bd5d', tail: ['#4aa7d8', '#3f8fd4'],
    cheek: '#f0b1a6', face: '#fbf3a8', barring: true,
  },
  lovebird: {
    body: '#8fd06e', belly: '#b8e59e', wing: '#79bd5d', tail: ['#4aa7d8', '#63b45f'],
    cheek: '#ffab91', face: '#ffb08c',
  },
};

/* One bird. Feet on the ground line at y = 0; ~54 wide, ~72 tall. */
function Birdy({ x = 0, y = 0, s = 1, kind = 'budgie', sleepy = false, flip = false }) {
  const a = SPECIES_ART[kind] || SPECIES_ART.budgie;
  const o = { stroke: LINE, strokeWidth: LW, strokeLinejoin: 'round', strokeLinecap: 'round' };
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      {/* crest — behind the body */}
      {a.crestType === 'tiel' && (
        <g fill={a.crest} {...o}>
          <path d="M -1 -62 C -5 -73 -3 -83 3 -88 C 3 -79 4 -70 7 -62 Z" />
          <path d="M 6 -62 C 8 -74 13 -82 19 -85 C 15 -76 12 -68 11 -61 Z" />
        </g>
      )}
      {a.crestType === 'big' && (
        <g fill={a.crest} {...o}>
          <path d="M -6 -62 C -12 -74 -10 -85 -2 -91 C -3 -81 -1 -71 3 -63 Z" />
          <path d="M 2 -63 C 2 -77 8 -87 17 -90 C 13 -80 10 -70 9 -61 Z" />
          <path d="M 8 -61 C 12 -72 19 -79 27 -80 C 22 -72 17 -64 14 -58 Z" />
        </g>
      )}
      {/* tail — down-left */}
      <g {...o}>
        <path d="M -13 -13 C -21 -8 -27 0 -29 9 C -22 7 -15 2 -10 -5 Z" fill={a.tail[0]} />
        <path d="M -9 -10 C -15 -5 -19 2 -20 9 C -15 7 -10 2 -7 -3 Z" fill={a.tail[1]} />
      </g>
      {/* body — plump pear */}
      <path
        d="M 0 -67 C -13 -67 -23 -56 -25 -40 C -27 -21 -18 -5 0 -5 C 18 -5 27 -21 25 -40 C 23 -56 13 -67 0 -67 Z"
        fill={a.body}
        {...o}
      />
      {/* belly — soft front patch, no outline */}
      <path d="M 0 -34 C -9 -34 -15 -27 -15 -19 C -15 -11 -8 -6 0 -6 C 8 -6 15 -11 15 -19 C 15 -27 9 -34 0 -34 Z" fill={a.belly} />
      {/* face patch (cockatiel / budgie / grey / lovebird) */}
      {a.face && (
        <path
          d="M 0 -66 C -12 -66 -21 -57 -23 -45 C -16 -38 -8 -35 0 -35 C 8 -35 16 -38 23 -45 C 21 -57 12 -66 0 -66 Z"
          fill={a.face}
        />
      )}
      {/* crown tint (macaw / amazon / conure) */}
      {a.crown && (
        <path d="M 0 -67 C -10 -67 -18 -61 -21 -52 C -8 -57 8 -57 21 -52 C 18 -61 10 -67 0 -67 Z" fill={a.crown} />
      )}
      {/* budgie barring */}
      {a.barring && (
        <g fill="none" stroke="#3d4a3a" strokeWidth="1.8" strokeLinecap="round" opacity=".8">
          <path d="M -14 -60 q 4 2.5 9 1" />
          <path d="M 5 -59 q 5 1.5 9 -1" />
          <path d="M -17 -54 q 5 2.5 10 1" />
          <path d="M 7 -53 q 5 1.5 10 -2" />
        </g>
      )}
      {/* wing — right side with scallops */}
      <path d="M 11 -40 C 20 -37 26 -28 25 -16 C 24 -9 20 -6 16 -7 C 12 -15 10 -27 11 -40 Z" fill={a.wing} {...o} />
      <g fill="none" stroke={LINE} strokeWidth="1.5" strokeLinecap="round" opacity=".45">
        <path d="M 15 -28 q 4 1 7 -1" />
        <path d="M 16 -20 q 3.5 1 6.5 -1" />
      </g>
      {/* blush cheeks — the whole point */}
      <circle cx="-14.5" cy="-40" r="5.8" fill={a.cheek} opacity=".9" />
      <circle cx="14.5" cy="-40" r="5.8" fill={a.cheek} opacity=".9" />
      {/* eyes — simple dots with a sparkle */}
      {sleepy ? (
        <g stroke={LINE} strokeWidth="2.2" strokeLinecap="round" fill="none">
          <path d="M -12 -48 q 3.5 3 7 0" />
          <path d="M 5 -48 q 3.5 3 7 0" />
        </g>
      ) : (
        <g>
          <circle cx="-8.5" cy="-48" r="3.4" fill="#2b2018" />
          <circle cx="8.5" cy="-48" r="3.4" fill="#2b2018" />
          <circle cx="-7.4" cy="-49.2" r="1.15" fill="#ffffff" />
          <circle cx="9.6" cy="-49.2" r="1.15" fill="#ffffff" />
        </g>
      )}
      {/* beak — tiny rounded triangle */}
      <path
        d="M -4 -45.5 C -1.5 -44.2 1.5 -44.2 4 -45.5 C 3.6 -40.8 1.8 -38 0 -37.5 C -1.8 -38 -3.6 -40.8 -4 -45.5 Z"
        fill="#ff9d3b"
        {...o}
        strokeWidth="1.7"
      />
      {/* feet — little orange nubs on the branch */}
      <g fill="#ff9d3b" stroke={LINE} strokeWidth="1.5">
        <ellipse cx="-7" cy="-1.5" rx="4.2" ry="2.7" />
        <ellipse cx="7" cy="-1.5" rx="4.2" ry="2.7" />
      </g>
    </g>
  );
}

function Leaf({ x, y, r = 0, s = 1, color = '#3da35d' }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path
        d="M 0 0 C 9 -13 26 -17 40 -11 C 32 2 15 7 0 0 Z"
        fill={color}
        stroke={LINE}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M 3 -1.5 C 15 -6 26 -8.5 36 -10" stroke={LINE} strokeWidth="1.3" fill="none" opacity=".4" strokeLinecap="round" />
    </g>
  );
}

function Branch({ d, w = 8 }) {
  return (
    <>
      <path d={d} fill="none" stroke={LINE} strokeWidth={w + 3} strokeLinecap="round" />
      <path d={d} fill="none" stroke="#9c6b45" strokeWidth={w} strokeLinecap="round" />
    </>
  );
}

/* ---------- arrangements ---------- */

/* three friends: macaw, cockatiel, budgie */
export function PerchTrio(props) {
  return (
    <svg viewBox="0 0 440 150" className="perch-art" aria-hidden="true" {...props}>
      <Branch d="M 20 100 C 130 91 320 89 424 98" />
      <Leaf x={38} y={97} r={-155} s={0.85} />
      <Leaf x={404} y={95} r={-18} s={0.9} color="#63b45f" />
      <Birdy kind="macaw" x={140} y={94} s={1.02} />
      <Birdy kind="cockatiel" x={243} y={91} s={0.98} flip />
      <Birdy kind="budgie" x={345} y={93} s={0.9} />
    </svg>
  );
}

/* the serious-talk pair: cockatoo + african grey */
export function PerchHang(props) {
  return (
    <svg viewBox="0 0 330 150" className="perch-art" aria-hidden="true" {...props}>
      <Branch d="M 14 100 C 110 91 220 91 316 99" />
      <Leaf x={294} y={96} r={-16} s={0.8} />
      <Leaf x={34} y={97} r={-158} s={0.75} color="#63b45f" />
      <Birdy kind="cockatoo" x={116} y={93} s={1} />
      <Birdy kind="grey" x={222} y={93} s={0.97} flip />
    </svg>
  );
}

/* a sleepy lovebird on a twig */
export function PerchSleepy(props) {
  return (
    <svg viewBox="0 0 200 120" className="perch-art" aria-hidden="true" {...props}>
      <Branch d="M 12 96 C 70 90 140 90 190 95" w={6} />
      <Leaf x={28} y={93} r={-152} s={0.65} />
      <Birdy kind="lovebird" x={104} y={89} s={0.92} sleepy />
    </svg>
  );
}

/* a single bird, no branch — sits on top of things (like the seal) */
export function PerchSitter({ kind = 'conure', ...props }) {
  return (
    <svg viewBox="-34 -96 68 100" className="perch-art perch-sitter" aria-hidden="true" {...props}>
      <Birdy kind={kind} s={0.9} />
    </svg>
  );
}
