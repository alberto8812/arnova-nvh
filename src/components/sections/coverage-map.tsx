import { motion } from "motion/react";
import { EASE } from "@/components/motion";
import { useCountryStore, type Country } from "@/stores/country-store";

type LonLat = [number, number];

// GEOGRAFÍA APROXIMADA: las siluetas de El Salvador y Guatemala son polígonos
// simplificados (lon/lat redondeados a mano, sin fuente cartográfica). Sirven
// para reconocer el país en una retícula de puntos; NO son un mapa oficial ni
// representan límites exactos. Los puntos pulsantes son decorativos (no
// indican sedes ni datos) y no llevan etiquetas.
const GEO: Record<Country, { poly: LonLat[]; pts: LonLat[] }> = {
  SV: {
    poly: [[-89.35,14.42],[-88.9,14.35],[-88.5,14.15],[-88.15,13.98],[-87.7,13.88],[-87.8,13.42],[-88.1,13.2],[-88.5,13.18],[-89.0,13.5],[-89.35,13.5],[-89.8,13.52],[-90.1,13.73],[-89.95,13.87],[-89.8,14.05],[-89.55,14.2]],
    pts: [[-89.19,13.69],[-89.56,14.0],[-88.18,13.48],[-89.72,13.72],[-87.9,13.45],[-88.43,13.4],[-88.94,14.04],[-88.75,13.9]],
  },
  GT: {
    poly: [[-90.99,17.81],[-89.15,17.81],[-89.15,16.1],[-88.6,15.95],[-88.22,15.73],[-88.6,15.45],[-89.15,15.07],[-89.35,14.42],[-89.55,14.2],[-89.85,14.05],[-90.1,13.73],[-91.0,13.92],[-91.7,14.1],[-92.2,14.53],[-92.2,14.95],[-91.73,16.07],[-90.45,16.07],[-90.7,16.5],[-90.98,17.25]],
    pts: [[-90.51,14.63],[-91.52,14.84],[-90.37,15.47],[-88.9,15.72],[-90.78,14.3],[-89.89,16.93],[-89.53,14.97],[-91.47,15.32]],
  },
};

const W = 460;
const H = 400;
const PAD = 22;
const STEP = 9.6;

type Built = {
  shape: string;
  dots: { x: number; y: number; r: number }[];
  locs: { x: number; y: number }[];
};

function inside(P: LonLat[], x: number, y: number) {
  let c = false;
  for (let i = 0, j = P.length - 1; i < P.length; j = i++) {
    const a = P[i];
    const b = P[j];
    if (a[1] > y !== b[1] > y && x < ((b[0] - a[0]) * (y - a[1])) / (b[1] - a[1]) + a[0]) c = !c;
  }
  return c;
}

const f1 = (n: number) => Math.round(n * 10) / 10;

function build({ poly, pts }: { poly: LonLat[]; pts: LonLat[] }): Built {
  const mid = poly.reduce((a, p) => a + p[1], 0) / poly.length;
  const cs = Math.cos((mid * Math.PI) / 180);
  const xs = poly.map((p) => p[0] * cs);
  const ys = poly.map((p) => -p[1]);
  const minx = Math.min(...xs);
  const maxx = Math.max(...xs);
  const miny = Math.min(...ys);
  const maxy = Math.max(...ys);
  const s = Math.min((W - 2 * PAD) / (maxx - minx), (H - 2 * PAD) / (maxy - miny));
  const ox = (W - (maxx - minx) * s) / 2 - minx * s;
  const oy = (H - (maxy - miny) * s) / 2 - miny * s;
  const proj = (p: LonLat): LonLat => [p[0] * cs * s + ox, -p[1] * s + oy];
  const P = poly.map(proj);
  const bx0 = minx * s + ox;
  const bw = (maxx - minx) * s;
  const by0 = miny * s + oy;
  const bh = (maxy - miny) * s;

  const dots: Built["dots"] = [];
  let row = 0;
  for (let y = PAD / 2; y < H; y += STEP * 0.866, row++) {
    for (let x = PAD / 2 + (row % 2 ? STEP / 2 : 0); x < W; x += STEP) {
      if (!inside(P, x, y)) continue;
      // Halftone: grande arriba-izquierda, pequeño abajo-derecha
      const t = Math.min(1, Math.max(0, ((x - bx0) / bw) * 0.55 + ((y - by0) / bh) * 0.45));
      dots.push({ x: f1(x), y: f1(y), r: Math.round((3.2 - 1.7 * t) * 100) / 100 });
    }
  }
  return {
    shape: P.map((p) => `${f1(p[0])},${f1(p[1])}`).join(" "),
    dots,
    locs: pts.map((p) => {
      const q = proj(p);
      return { x: f1(q[0]), y: f1(q[1]) };
    }),
  };
}

// Computed once at module load; rendering is a static SVG.
const BUILT: Record<Country, Built> = { SV: build(GEO.SV), GT: build(GEO.GT) };

const GRAD = "coverage-map-grad";

// Pulse is pure CSS (no per-frame JS) and switched off for reduced motion.
const CSS = `
.cm-ring{transform-box:fill-box;transform-origin:center;animation:cm-ping 3s cubic-bezier(.2,.8,.2,1) infinite;animation-delay:calc(var(--i)*.55s)}
.cm-ring-b{animation-delay:calc(var(--i)*.55s + 1.5s)}
.cm-core{transform-box:fill-box;transform-origin:center;animation:cm-breathe 3s ease-in-out infinite;animation-delay:calc(var(--i)*.55s)}
@keyframes cm-ping{0%{transform:scale(.5);opacity:.75}75%,100%{transform:scale(3.6);opacity:0}}
@keyframes cm-breathe{50%{transform:scale(1.18)}}
@media (prefers-reduced-motion:reduce){
.cm-ring{animation:none;transform:scale(2.2);opacity:.28}
.cm-ring-b{display:none}
.cm-core{animation:none}
}`;

export function CoverageMap() {
  const country = useCountryStore((s) => s.country) ?? "SV";
  const { shape, dots, locs } = BUILT[country];

  return (
    <motion.div
      key={country}
      aria-hidden="true"
      className="relative mx-auto w-full max-w-[430px]"
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <style>{CSS}</style>
      <div
        className="absolute inset-x-[4%] inset-y-[6%] rounded-full opacity-80"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-brand-100), transparent)",
        }}
      />
      <svg
        viewBox={`0 0 ${W} ${H}`}
        focusable="false"
        className="relative block h-auto w-full max-h-[340px] md:max-h-[430px]"
      >
        <defs>
          <linearGradient id={GRAD} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2="0">
            <stop offset="0" stopColor="var(--color-accent-700)" />
            <stop offset="1" stopColor="var(--color-accent-500)" />
          </linearGradient>
        </defs>
        <polygon points={shape} fill="var(--color-brand-100)" opacity={0.7} />
        <g fill="var(--color-brand-300)">
          {dots.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={d.r} />
          ))}
        </g>
        <g>
          {locs.map((p, i) => (
            <g key={i} style={{ "--i": i } as React.CSSProperties}>
              <circle className="cm-ring" cx={p.x} cy={p.y} r={5} fill="none" stroke={`url(#${GRAD})`} strokeWidth={2} vectorEffect="non-scaling-stroke" />
              <circle className="cm-ring cm-ring-b" cx={p.x} cy={p.y} r={5} fill="none" stroke={`url(#${GRAD})`} strokeWidth={2} vectorEffect="non-scaling-stroke" />
              <circle className="cm-core" cx={p.x} cy={p.y} r={5.5} fill={`url(#${GRAD})`} stroke="#fff" strokeWidth={2} />
            </g>
          ))}
        </g>
      </svg>
    </motion.div>
  );
}
