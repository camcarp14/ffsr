/* ============================================================
   PERCH FLOCK — cute cartoon parrots on tropical branches,
   sprinkled across the site. Flat, round, big-eyed — friendly
   without trying to be realistic.
   ============================================================ */

const PALETTES = {
  blue: { body: '#1d7fbf', belly: '#6cc4e8', wing: '#155f92', tail: ['#1d7fbf', '#ffb547'], cheek: '#ff8b74' },
  coral: { body: '#ff6f61', belly: '#ffd06b', wing: '#e04e3f', tail: ['#ff6f61', '#1d7fbf'], cheek: '#ffb547' },
  tiel: { body: '#f6e7c6', belly: '#fdf4e0', wing: '#e8d3a4', tail: ['#d9bd8a', '#b9a06a'], cheek: '#ff9556', crest: '#ffb547' },
  green: { body: '#3da35d', belly: '#a5d98a', wing: '#2e8b57', tail: ['#3da35d', '#ffd06b'], cheek: '#ff8b74' },
  mango: { body: '#ffb547', belly: '#ffd06b', wing: '#e8912d', tail: ['#ffb547', '#ff6f61'], cheek: '#ff6f61' },
};

/* One bird, feet at (0,0), standing on a branch that runs under y=0.
   ~56 wide, ~70 tall. */
function Birdy({ x = 0, s = 1, p, crest = false, sleepy = false, flip = false, lean = 0 }) {
  const pal = PALETTES[p] || PALETTES.coral;
  return (
    <g transform={`translate(${x} 0) rotate(${lean}) scale(${flip ? -s : s} ${s})`}>
      {/* tail — two rounded feathers sweeping down-back */}
      <path d="M -14 -14 C -26 -6 -30 6 -30 16 C -24 14 -18 10 -14 4 Z" fill={pal.tail[0]} />
      <path d="M -11 -12 C -20 -2 -22 10 -21 20 C -16 16 -11 10 -8 2 Z" fill={pal.tail[1]} />
      {/* body — plump egg */}
      <path d="M -21 -28 C -21 -52 -9 -62 0 -62 C 9 -62 21 -52 21 -28 C 21 -11 12 -1 0 -1 C -12 -1 -21 -11 -21 -28 Z" fill={pal.body} />
      {/* belly */}
      <path d="M -12 -20 C -12 -32 -6 -38 0 -38 C 6 -38 12 -32 12 -20 C 12 -10 6 -4 0 -4 C -6 -4 -12 -10 -12 -20 Z" fill={pal.belly} />
      {/* wings — little rounded drops held at the sides */}
      <path d="M -21 -34 C -27 -30 -29 -20 -26 -12 C -21 -14 -17 -20 -16 -28 Z" fill={pal.wing} />
      <path d="M 21 -34 C 27 -30 29 -20 26 -12 C 21 -14 17 -20 16 -28 Z" fill={pal.wing} />
      {/* crest (cockatiel-style) */}
      {crest && (
        <g fill={pal.crest || pal.wing}>
          <path d="M -3 -60 C -7 -68 -6 -76 -1 -81 C 1 -74 1 -67 2 -61 Z" />
          <path d="M 2 -61 C 2 -70 6 -77 12 -80 C 10 -72 8 -66 6 -60 Z" />
        </g>
      )}
      {/* cheeks */}
      <circle cx="-13" cy="-38" r="4.2" fill={pal.cheek} opacity=".75" />
      <circle cx="13" cy="-38" r="4.2" fill={pal.cheek} opacity=".75" />
      {/* eyes */}
      {sleepy ? (
        <g stroke="#173038" strokeWidth="2.2" strokeLinecap="round" fill="none">
          <path d="M -11 -45 q 4 3.5 8 0" />
          <path d="M 3 -45 q 4 3.5 8 0" />
        </g>
      ) : (
        <g>
          <circle cx="-7" cy="-45" r="5.6" fill="#ffffff" />
          <circle cx="7" cy="-45" r="5.6" fill="#ffffff" />
          <circle cx="-6" cy="-44" r="3.1" fill="#173038" />
          <circle cx="8" cy="-44" r="3.1" fill="#173038" />
          <circle cx="-4.9" cy="-45.4" r="1.1" fill="#ffffff" />
          <circle cx="9.1" cy="-45.4" r="1.1" fill="#ffffff" />
        </g>
      )}
      {/* beak — tiny rounded hook */}
      <path d="M -3.5 -39.5 C -1 -38 1 -38 3.5 -39.5 C 3.5 -34.5 1.5 -31 0 -30.5 C -1.5 -31 -3.5 -34.5 -3.5 -39.5 Z" fill="#e8912d" />
      <path d="M -3.5 -39.5 C -1 -38 1 -38 3.5 -39.5 C 2.5 -37.5 1 -36.5 0 -36.5 C -1 -36.5 -2.5 -37.5 -3.5 -39.5 Z" fill="#c96f15" />
      {/* feet — little gripping toes */}
      <g stroke="#8a5a3b" strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path d="M -7 -2 l 0 3 m -3 -3 l -1.5 3 m 4.5 -3 l 1.5 3" />
        <path d="M 7 -2 l 0 3 m -3 -3 l -1.5 3 m 4.5 -3 l 1.5 3" />
      </g>
    </g>
  );
}

function Leaf({ x, y, r = 0, s = 1, color = '#2e8b57' }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M 0 0 C 10 -14 28 -18 42 -12 C 34 2 16 8 0 0 Z" fill={color} />
      <path d="M 2 -1 C 16 -6 28 -9 38 -11" stroke="#1e6b3f" strokeWidth="1.6" fill="none" opacity=".5" strokeLinecap="round" />
    </g>
  );
}

function Flower({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="#e05780">
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse key={r} cx="0" cy="-6" rx="4" ry="6.5" transform={`rotate(${r})`} />
      ))}
      <circle r="3" fill="#ffd06b" />
    </g>
  );
}

/* ---------- arrangements ---------- */

/* three friends on a branch that enters from the right */
export function PerchTrio(props) {
  return (
    <svg viewBox="0 0 440 130" className="perch-art" aria-hidden="true" {...props}>
      <path d="M 440 66 C 380 60 300 62 220 70 C 160 76 110 80 70 78" fill="none" stroke="#8a5a3b" strokeWidth="7" strokeLinecap="round" />
      <path d="M 118 78 C 104 70 96 60 94 50" fill="none" stroke="#8a5a3b" strokeWidth="4" strokeLinecap="round" />
      <Leaf x={94} y={50} r={-40} s={0.8} />
      <Leaf x={430} y={64} r={-165} s={0.9} color="#3da35d" />
      <Flower x={168} y={74} s={0.9} />
      <g transform="translate(230 70)"><Birdy p="blue" s={0.98} lean={-3} /></g>
      <g transform="translate(300 66)"><Birdy p="coral" s={1.06} flip /></g>
      <g transform="translate(374 63)"><Birdy p="tiel" crest s={0.94} lean={3} /></g>
    </svg>
  );
}

/* one perched + one hanging upside-down, branch from the left */
export function PerchHang(props) {
  return (
    <svg viewBox="0 0 360 150" className="perch-art" aria-hidden="true" {...props}>
      <path d="M 0 44 C 70 38 150 40 230 48 C 280 53 320 56 356 54" fill="none" stroke="#8a5a3b" strokeWidth="7" strokeLinecap="round" />
      <Leaf x={330} y={54} r={-15} s={0.85} />
      <Leaf x={70} y={40} r={-160} s={0.75} color="#3da35d" />
      <g transform="translate(120 42)"><Birdy p="green" s={1} lean={-2} /></g>
      {/* the upside-down one — living her best life */}
      <g transform="translate(236 50) scale(1 -1)"><Birdy p="mango" s={0.95} flip /></g>
    </svg>
  );
}

/* a sleepy little one on a twig */
export function PerchSleepy(props) {
  return (
    <svg viewBox="0 0 190 100" className="perch-art" aria-hidden="true" {...props}>
      <path d="M 6 78 C 50 72 120 70 184 74" fill="none" stroke="#8a5a3b" strokeWidth="6" strokeLinecap="round" />
      <Leaf x={22} y={74} r={-150} s={0.7} />
      <g transform="translate(104 72)"><Birdy p="coral" sleepy s={0.92} lean={2} /></g>
    </svg>
  );
}

/* a single bird, no branch — sits on top of things (like the seal) */
export function PerchSitter({ palette = 'blue', ...props }) {
  return (
    <svg viewBox="-32 -88 64 92" className="perch-art perch-sitter" aria-hidden="true" {...props}>
      <Birdy p={palette} s={0.9} />
    </svg>
  );
}
