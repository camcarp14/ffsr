/* Layered ocean-wave divider. `color` is the color of the section the
   wave belongs to (the one it visually pours into). */
export default function Wave({ color = 'var(--cream)', flip = false, className = '' }) {
  return (
    <svg
      className={`wave ${className}`}
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ transform: flip ? 'scaleY(-1)' : undefined, color }}
    >
      <path
        d="M0,62 C180,90 360,30 560,52 C760,74 900,20 1100,44 C1260,63 1360,50 1440,58 L1440,100 L0,100 Z"
        fill="currentColor"
        opacity="0.25"
      />
      <path
        d="M0,74 C200,96 420,44 640,62 C860,80 1020,36 1220,56 C1330,67 1400,60 1440,66 L1440,100 L0,100 Z"
        fill="currentColor"
        opacity="0.45"
      />
      <path
        d="M0,84 C240,102 480,60 720,74 C960,88 1160,56 1440,78 L1440,100 L0,100 Z"
        fill="currentColor"
      />
    </svg>
  );
}
