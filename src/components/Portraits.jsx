/* ============================================================
   PORTRAITS — hand-drawn SVG busts of each species group,
   framed in an arched aviary window. One consistent style:
   soft radial atmosphere, layered feather sweeps, a living eye.
   ============================================================ */

const Frame = ({ id, glowA, glowB, children }) => (
  <svg viewBox="0 0 240 280" className="portrait" role="img" aria-hidden="true">
    <defs>
      <clipPath id={`arch-${id}`}>
        <path d="M 16 280 L 16 116 A 104 104 0 0 1 224 116 L 224 280 Z" />
      </clipPath>
      <radialGradient id={`glow-${id}`} cx="50%" cy="38%" r="75%">
        <stop offset="0%" stopColor={glowA} />
        <stop offset="100%" stopColor={glowB} />
      </radialGradient>
    </defs>
    <g clipPath={`url(#arch-${id})`}>
      <rect width="240" height="280" fill={`url(#glow-${id})`} />
      {children}
    </g>
    <path
      d="M 16 280 L 16 116 A 104 104 0 0 1 224 116 L 224 280 Z"
      fill="none"
      stroke="rgba(13,38,34,.22)"
      strokeWidth="2.5"
    />
  </svg>
);

/* ---------- Blue & Gold Macaw ---------- */
const Macaw = () => (
  <Frame id="macaw" glowA="#f5e3bd" glowB="#dfc17e">
    {/* back + wing sweep */}
    <path d="M 150 96 C 196 118, 216 176, 210 280 L 118 280 C 120 200, 124 140, 150 96 Z" fill="#2456a8" />
    <path d="M 168 130 C 196 158, 206 210, 204 280 L 168 280 C 170 222, 168 168, 156 138 Z" fill="#1a3f7e" />
    <path d="M 186 170 C 198 204, 202 240, 201 280 L 184 280 C 186 238, 184 200, 176 176 Z" fill="#7fa8e0" opacity=".55" />
    {/* gold chest */}
    <path d="M 116 150 C 144 162, 156 200, 154 280 L 74 280 C 70 220, 84 168, 116 150 Z" fill="#e8a33d" />
    <path d="M 112 190 C 130 200, 138 232, 137 280 L 108 280 C 104 244, 102 210, 112 190 Z" fill="#d18a26" opacity=".5" />
    {/* head */}
    <path d="M 132 44 C 168 44, 190 70, 188 102 C 186 132, 164 150, 136 150 C 106 150, 88 128, 88 100 C 88 68, 102 44, 132 44 Z" fill="#2456a8" />
    {/* teal forecrown */}
    <path d="M 108 50 C 122 42, 146 40, 160 48 C 144 48, 122 52, 110 58 Z" fill="#2e6b5e" />
    {/* white face patch */}
    <path d="M 98 80 C 112 72, 130 76, 134 92 C 138 110, 126 124, 110 124 C 96 124, 88 112, 88 98 C 88 91, 92 84, 98 80 Z" fill="#faf5ea" />
    {/* eye */}
    <circle cx="114" cy="92" r="7" fill="#101820" />
    <circle cx="116.5" cy="89.5" r="2.4" fill="#fff" />
    {/* beak: strong macaw hook */}
    <path d="M 96 70 C 72 60, 50 72, 47 94 C 45 114, 55 130, 69 138 C 73 140, 76 136, 73 132 C 64 120, 63 106, 69 97 C 76 87, 85 82, 97 84 Z" fill="#101820" />
    <path d="M 74 134 C 81 145, 95 150, 106 144 C 98 138, 88 133, 82 126 Z" fill="#2e3a36" />
  </Frame>
);

/* ---------- African Grey ---------- */
const Grey = () => (
  <Frame id="grey" glowA="#e9e4e1" glowB="#bfc4c8">
    {/* body */}
    <path d="M 146 100 C 190 124, 208 180, 204 280 L 92 280 C 88 200, 100 136, 146 100 Z" fill="#8e9296" />
    {/* scalloped chest */}
    <path d="M 112 160 C 136 170, 148 210, 146 280 L 80 280 C 76 224, 86 178, 112 160 Z" fill="#a9adb1" />
    <g fill="none" stroke="#83878b" strokeWidth="2" opacity=".6" strokeLinecap="round">
      <path d="M 94 200 q 12 8 26 2 M 100 226 q 12 8 26 2 M 92 252 q 12 8 26 2 M 118 214 q 12 8 24 2 M 116 244 q 12 8 24 2" />
    </g>
    {/* scarlet tail flash */}
    <path d="M 176 230 C 194 240, 204 258, 206 280 L 170 280 C 168 260, 170 244, 176 230 Z" fill="#c0432b" />
    {/* head */}
    <path d="M 128 48 C 162 48, 184 72, 182 102 C 180 130, 160 148, 132 148 C 104 148, 86 126, 86 100 C 86 70, 98 48, 128 48 Z" fill="#9ea2a6" />
    {/* pale mask */}
    <path d="M 98 74 C 112 62, 134 64, 140 82 C 146 102, 134 120, 114 120 C 98 120, 88 108, 88 94 C 88 86, 92 79, 98 74 Z" fill="#e6e3df" />
    {/* eye */}
    <circle cx="116" cy="90" r="7" fill="#26221f" />
    <circle cx="118.5" cy="87.5" r="2.3" fill="#fff" />
    <circle cx="116" cy="90" r="9.5" fill="none" stroke="#c9c5c0" strokeWidth="2" opacity=".8" />
    {/* beak */}
    <path d="M 96 76 C 74 68, 54 80, 52 100 C 50 118, 59 132, 72 139 C 76 141, 79 137, 76 133 C 68 122, 67 109, 73 101 C 79 91, 87 87, 98 89 Z" fill="#26221f" />
    <path d="M 77 135 C 84 145, 97 149, 107 144 C 100 138, 91 134, 85 127 Z" fill="#3d3835" />
  </Frame>
);

/* ---------- Cockatiel ---------- */
const Cockatiel = () => (
  <Frame id="tiel" glowA="#f7eecf" glowB="#dccf9a">
    {/* body */}
    <path d="M 142 104 C 184 126, 200 182, 196 280 L 92 280 C 90 202, 102 140, 142 104 Z" fill="#b9bdbf" />
    <path d="M 112 164 C 134 176, 144 214, 142 280 L 82 280 C 78 226, 88 182, 112 164 Z" fill="#cdd0d2" />
    {/* wing bar */}
    <path d="M 160 150 C 180 176, 188 224, 186 280 L 158 280 C 160 230, 158 186, 148 160 Z" fill="#f4f1e6" opacity=".8" />
    {/* crest — three sweeping quills */}
    <path d="M 118 58 C 112 34, 118 14, 132 4 C 128 22, 128 40, 132 56 Z" fill="#f2e27a" />
    <path d="M 128 56 C 128 32, 138 12, 154 6 C 146 24, 142 42, 142 58 Z" fill="#e8d55e" />
    <path d="M 138 58 C 142 38, 154 22, 168 18 C 158 34, 152 48, 150 62 Z" fill="#d9c64f" />
    {/* head — yellow */}
    <path d="M 128 52 C 158 52, 178 74, 176 100 C 174 126, 156 142, 130 142 C 104 142, 88 122, 88 98 C 88 70, 100 52, 128 52 Z" fill="#f2e27a" />
    {/* orange cheek */}
    <circle cx="114" cy="108" r="13" fill="#f0a24a" />
    <circle cx="114" cy="108" r="13" fill="none" stroke="#e08c2e" strokeWidth="1.5" opacity=".5" />
    {/* eye */}
    <circle cx="112" cy="82" r="6" fill="#26221f" />
    <circle cx="114" cy="80" r="2" fill="#fff" />
    {/* small beak */}
    <path d="M 90 82 C 78 78, 67 86, 66 97 C 65 107, 71 116, 81 119 C 84 120, 86 117, 84 114 C 79 108, 79 100, 84 95 C 87 91, 89 87, 90 82 Z" fill="#c9b8a2" />
    <path d="M 84 116 C 89 122, 98 124, 104 120 C 98 117, 92 113, 89 109 Z" fill="#b3a28c" />
  </Frame>
);

/* ---------- Umbrella Cockatoo ---------- */
const Cockatoo = () => (
  <Frame id="too" glowA="#fdf6e4" glowB="#e4cf9c">
    {/* body */}
    <path d="M 144 100 C 190 124, 208 182, 204 280 L 86 280 C 84 198, 98 136, 144 100 Z" fill="#f4f1e6" />
    <path d="M 108 164 C 132 176, 142 216, 140 280 L 76 280 C 72 226, 82 184, 108 164 Z" fill="#faf8f0" />
    <path d="M 168 150 C 186 180, 194 226, 192 280 L 164 280 C 166 232, 162 190, 152 162 Z" fill="#e7e0c8" />
    {/* crest — grand backswept fan */}
    <path d="M 116 56 C 104 36, 104 14, 116 0 C 116 20, 122 38, 132 52 Z" fill="#faf8f0" />
    <path d="M 128 52 C 122 30, 128 10, 144 0 C 138 20, 138 38, 144 54 Z" fill="#f2ecd8" />
    <path d="M 140 54 C 140 34, 152 14, 170 8 C 158 26, 152 44, 152 60 Z" fill="#eee3c4" />
    <path d="M 150 60 C 156 42, 170 28, 188 24 C 174 40, 166 56, 162 70 Z" fill="#f2d46a" opacity=".75" />
    {/* head */}
    <path d="M 128 48 C 160 48, 182 72, 180 102 C 178 130, 158 148, 130 148 C 102 148, 84 126, 84 98 C 84 70, 98 48, 128 48 Z" fill="#f4f1e6" />
    {/* eye with pale ring */}
    <circle cx="112" cy="90" r="10" fill="#dbeaf5" opacity=".8" />
    <circle cx="112" cy="90" r="6.6" fill="#26221f" />
    <circle cx="114.5" cy="87.5" r="2.2" fill="#fff" />
    {/* beak — dark, powerful */}
    <path d="M 94 74 C 70 64, 48 76, 45 98 C 43 118, 53 134, 67 142 C 71 144, 74 140, 71 136 C 62 124, 61 110, 67 101 C 74 91, 83 86, 95 88 Z" fill="#3a3d3f" />
    <path d="M 72 138 C 79 148, 93 153, 104 147 C 96 141, 86 136, 80 129 Z" fill="#54585a" />
  </Frame>
);

/* ---------- Green-Cheek Conure ---------- */
const Conure = () => (
  <Frame id="conure" glowA="#e9edc9" glowB="#b8cc8e">
    {/* body */}
    <path d="M 142 102 C 186 126, 202 182, 198 280 L 90 280 C 88 200, 100 138, 142 102 Z" fill="#3e8e4b" />
    {/* maroon chest scallops */}
    <path d="M 110 160 C 134 172, 146 212, 144 280 L 78 280 C 74 226, 84 178, 110 160 Z" fill="#7a4438" />
    <g fill="none" stroke="#94574a" strokeWidth="2.2" opacity=".7" strokeLinecap="round">
      <path d="M 92 198 q 13 9 28 2 M 98 224 q 13 9 28 2 M 90 250 q 13 9 28 2 M 118 212 q 12 8 24 2" />
    </g>
    {/* wing + tail flash */}
    <path d="M 164 148 C 184 178, 192 226, 190 280 L 160 280 C 162 232, 158 188, 148 160 Z" fill="#2e6b3a" />
    <path d="M 178 226 C 192 240, 198 260, 199 280 L 174 280 C 173 260, 174 242, 178 226 Z" fill="#c0432b" />
    {/* head — dusky */}
    <path d="M 126 52 C 158 52, 178 74, 176 102 C 174 128, 156 144, 130 144 C 104 144, 88 124, 88 98 C 88 72, 100 52, 126 52 Z" fill="#4a4440" />
    {/* green cheek */}
    <path d="M 100 118 C 110 108, 128 108, 136 120 C 128 132, 108 134, 100 126 Z" fill="#3e8e4b" />
    {/* white eye ring */}
    <circle cx="112" cy="86" r="9.4" fill="#f2ede2" />
    <circle cx="112" cy="86" r="6" fill="#26221f" />
    <circle cx="114" cy="84" r="2" fill="#fff" />
    {/* beak */}
    <path d="M 94 80 C 76 73, 60 83, 58 100 C 57 114, 64 126, 75 132 C 79 134, 81 130, 79 127 C 72 117, 72 106, 77 99 C 82 91, 88 87, 96 88 Z" fill="#3a3633" />
    <path d="M 80 128 C 86 136, 97 139, 105 134 C 99 130, 91 126, 86 120 Z" fill="#514c48" />
  </Frame>
);

/* ---------- Yellow-Naped Amazon ---------- */
const Amazon = () => (
  <Frame id="amazon" glowA="#eef0c8" glowB="#c3d089">
    {/* body */}
    <path d="M 142 100 C 188 124, 204 182, 200 280 L 88 280 C 86 198, 100 136, 142 100 Z" fill="#3e8e4b" />
    <path d="M 110 162 C 134 174, 146 214, 144 280 L 78 280 C 74 226, 84 180, 110 162 Z" fill="#54a35f" />
    {/* wing with red shoulder */}
    <path d="M 162 146 C 184 176, 192 226, 190 280 L 158 280 C 160 230, 156 186, 146 158 Z" fill="#2e7a3c" />
    <path d="M 158 152 C 170 160, 176 176, 174 190 C 164 180, 156 168, 152 156 Z" fill="#c0432b" />
    {/* head */}
    <path d="M 126 50 C 158 50, 180 74, 178 102 C 176 130, 156 146, 130 146 C 102 146, 86 124, 86 98 C 86 70, 98 50, 126 50 Z" fill="#4d9c58" />
    {/* yellow nape */}
    <path d="M 148 56 C 164 64, 174 80, 174 98 C 166 84, 154 70, 140 62 Z" fill="#f2e27a" />
    {/* eye with orange iris */}
    <circle cx="112" cy="86" r="7.4" fill="#e07b2e" />
    <circle cx="112" cy="86" r="4.6" fill="#26221f" />
    <circle cx="114" cy="84" r="1.8" fill="#fff" />
    <circle cx="112" cy="86" r="9.8" fill="none" stroke="#e9ecdd" strokeWidth="2" opacity=".85" />
    {/* horn beak */}
    <path d="M 94 78 C 72 70, 52 82, 50 102 C 48 120, 58 134, 71 141 C 75 143, 78 139, 75 135 C 67 124, 66 111, 72 103 C 79 93, 87 89, 97 91 Z" fill="#c9b8a2" />
    <path d="M 76 137 C 83 146, 96 150, 106 145 C 99 139, 90 135, 84 128 Z" fill="#af9d86" />
  </Frame>
);

/* ---------- Parakeet / Budgie ---------- */
const Parakeet = () => (
  <Frame id="keet" glowA="#dff2e4" glowB="#a4d8c0">
    {/* body */}
    <path d="M 140 104 C 182 128, 198 184, 194 280 L 88 280 C 86 202, 100 140, 140 104 Z" fill="#4bae5a" />
    <path d="M 108 166 C 132 178, 142 216, 140 280 L 78 280 C 74 228, 84 184, 108 166 Z" fill="#63c072" />
    {/* wing scalloping */}
    <path d="M 160 148 C 182 178, 190 226, 188 280 L 156 280 C 158 230, 154 188, 144 160 Z" fill="#3c9a4b" />
    <g fill="none" stroke="#2c303a" strokeWidth="2" opacity=".55" strokeLinecap="round">
      <path d="M 158 176 q 10 6 20 1 M 164 200 q 10 6 20 1 M 168 226 q 10 6 20 1 M 170 252 q 10 6 20 1" />
    </g>
    {/* head — yellow with barring */}
    <path d="M 124 54 C 156 54, 176 76, 174 102 C 172 128, 154 144, 128 144 C 102 144, 86 124, 86 98 C 86 72, 98 54, 124 54 Z" fill="#f2e27a" />
    <g fill="none" stroke="#2c303a" strokeWidth="2" opacity=".5" strokeLinecap="round">
      <path d="M 128 58 q 12 4 22 14 M 140 64 q 10 6 18 16 M 150 74 q 8 6 14 16 M 158 88 q 6 6 10 14" />
    </g>
    {/* blue cheek dot + throat spots */}
    <circle cx="104" cy="112" r="7" fill="#5a7fd6" />
    <circle cx="118" cy="122" r="3" fill="#2c303a" opacity=".75" />
    <circle cx="106" cy="126" r="3" fill="#2c303a" opacity=".55" />
    {/* eye */}
    <circle cx="112" cy="84" r="5.6" fill="#26221f" />
    <circle cx="114" cy="82" r="1.9" fill="#fff" />
    {/* tiny beak with cere */}
    <path d="M 92 88 C 84 86, 78 92, 79 100 C 80 108, 88 112, 95 109 C 91 104, 91 98, 95 95 C 90 93, 90 88, 96 89 Z" fill="#c9b8a2" />
    <path d="M 96 84 C 92 82, 88 84, 87 88 C 90 90, 95 90, 98 88 Z" fill="#7f9fd9" />
  </Frame>
);

const REGISTRY = {
  Macaw,
  'African Grey': Grey,
  Cockatiel,
  Cockatoo,
  Conure,
  Amazon,
  Parakeet,
};

export default function Portrait({ group }) {
  const C = REGISTRY[group] || Conure;
  return <C />;
}
