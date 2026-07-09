export function FeatherMeter({ level, max = 5 }) {
  return (
    <span className="feathers" role="img" aria-label={`Level ${level} of ${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <svg viewBox="0 0 14 20" key={i} aria-hidden="true">
          <path
            d="M7 1 C11 5 13 10 12 15 C10 18 8 19 7 19 C6 19 4 18 2 15 C1 10 3 5 7 1 Z M7 4 L7 19"
            fill={i < level ? 'currentColor' : 'transparent'}
            stroke="currentColor"
            strokeWidth="1.1"
            opacity={i < level ? 1 : 0.35}
          />
        </svg>
      ))}
    </span>
  );
}
