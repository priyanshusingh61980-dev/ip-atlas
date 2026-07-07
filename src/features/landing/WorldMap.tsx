import { m, useReducedMotion } from "framer-motion";
import { jurisdictions, type Jurisdiction } from "@/shared/design/tokens";

interface NodePosition {
  id: Jurisdiction;
  label: string;
  /** Equirectangular projection x-coord (0–1000). */
  x: number;
  /** Equirectangular projection y-coord (0–500). */
  y: number;
}

const NODES: NodePosition[] = [
  { id: "US", label: "United States", x: 228, y: 142 },
  { id: "UK", label: "United Kingdom", x: 497, y: 100 },
  { id: "EU", label: "European Union", x: 527, y: 111 },
  { id: "AE", label: "United Arab Emirates", x: 650, y: 184 },
  { id: "IN", label: "India", x: 716, y: 189 },
  { id: "SG", label: "Singapore", x: 786, y: 247 },
  { id: "TH", label: "Thailand", x: 778, y: 209 },
  { id: "JP", label: "Japan", x: 883, y: 151 },
];

// Sanity check: keep the node list aligned with the canonical jurisdiction set.
if (process.env.NODE_ENV !== "production") {
  const missing = jurisdictions.filter((j) => !NODES.some((n) => n.id === j));
  if (missing.length > 0) {
    console.warn(`[WorldMap] missing nodes for jurisdictions: ${missing.join(", ")}`);
  }
}

const ARCS: Array<[Jurisdiction, Jurisdiction]> = [
  ["US", "UK"],
  ["UK", "EU"],
  ["EU", "AE"],
  ["AE", "IN"],
  ["IN", "SG"],
  ["SG", "JP"],
  ["JP", "US"],
  ["EU", "JP"],
];

const VIEWBOX_W = 1000;
const VIEWBOX_H = 500;

export interface WorldMapProps {
  /**
   * Jurisdictions to emphasize. Non-highlighted nodes dim. When omitted, all
   * eight nodes render at full strength (default landing behavior).
   */
  highlight?: Jurisdiction[];
  /** Override the descriptive label used by assistive tech. */
  ariaLabel?: string;
  /** Optional per-jurisdiction intensity values in `[0, 1]` (heatmap mode). */
  intensity?: Partial<Record<Jurisdiction, number>>;
}

/**
 * Stylized world-map placeholder.
 *
 * - Pure SVG; no vendor map dependency until ADR for map vendor lands.
 * - Latitude grid + longitude grid drawn as faint dotted lines.
 * - Eight jurisdiction nodes pulse softly; reduced-motion users see static dots.
 * - Connecting arcs animate their dash offset to suggest data flow.
 * - `highlight` and `intensity` adapt the same SVG to topic overlays.
 */
export function WorldMap({ highlight, ariaLabel, intensity }: WorldMapProps = {}) {
  const reduce = useReducedMotion() ?? false;
  const highlightSet = highlight && highlight.length > 0 ? new Set(highlight) : null;
  const isEmphasized = (id: Jurisdiction) => !highlightSet || highlightSet.has(id);

  return (
    <div
      role="img"
      aria-label={
        ariaLabel ?? "Animated world map highlighting eight jurisdictions tracked by Novatrix IP"
      }
      className="relative aspect-[2/1] w-full"
    >
      {/* Soft radial backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl bg-[radial-gradient(60%_60%_at_50%_40%,rgb(var(--accent-electric)/0.10),transparent_70%)]"
      />
      <svg
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="atlas-node" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgb(37 99 235)" stopOpacity="1" />
            <stop offset="60%" stopColor="rgb(37 99 235)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="rgb(37 99 235)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="atlas-arc" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(37 99 235)" stopOpacity="0" />
            <stop offset="50%" stopColor="rgb(37 99 235)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="rgb(37 99 235)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Longitude grid */}
        <g stroke="rgb(17 24 39 / 0.06)" strokeWidth="0.5">
          {Array.from({ length: 11 }).map((_, i) => {
            const x = (i / 10) * VIEWBOX_W;
            return <line key={`v${i}`} x1={x} y1={0} x2={x} y2={VIEWBOX_H} strokeDasharray="2 6" />;
          })}
          {Array.from({ length: 6 }).map((_, i) => {
            const y = (i / 5) * VIEWBOX_H;
            return <line key={`h${i}`} x1={0} y1={y} x2={VIEWBOX_W} y2={y} strokeDasharray="2 6" />;
          })}
        </g>

        {/* Dotted "land" cloud — rough continent silhouettes via point-in-polygon fill */}
        <g fill="rgb(17 24 39 / 0.28)">
          {DOTS.map((d, i) => (
            <circle key={i} cx={d[0]} cy={d[1]} r="0.9" />
          ))}
        </g>

        {/* Arcs */}
        {ARCS.map(([from, to], i) => {
          const a = NODES.find((n) => n.id === from);
          const b = NODES.find((n) => n.id === to);
          if (!a || !b) return null;
          const arcEmphasized = isEmphasized(from) && isEmphasized(to);
          const mx = (a.x + b.x) / 2;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          const my = (a.y + b.y) / 2 - Math.min(120, dist * 0.25);
          const path = `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
          const targetOpacity = arcEmphasized ? 0.7 : 0.15;

          return (
            <m.path
              key={`arc-${i}`}
              d={path}
              fill="none"
              stroke="url(#atlas-arc)"
              strokeWidth={1}
              strokeLinecap="round"
              strokeDasharray="6 10"
              initial={{ strokeDashoffset: 0, opacity: 0 }}
              animate={
                reduce
                  ? { opacity: arcEmphasized ? 0.5 : 0.12 }
                  : { strokeDashoffset: -160, opacity: targetOpacity }
              }
              transition={
                reduce
                  ? { duration: 0.6, delay: i * 0.05 }
                  : { duration: 6, ease: "linear", repeat: Infinity, delay: i * 0.4 }
              }
            />
          );
        })}

        {/* Nodes */}
        {NODES.map((n, i) => {
          const emph = isEmphasized(n.id);
          const heat = intensity?.[n.id];
          const haloScale = heat !== undefined ? 0.8 + heat * 1.4 : 1;
          return (
            <g key={n.id} transform={`translate(${n.x} ${n.y})`} opacity={emph ? 1 : 0.35}>
              {!reduce && emph && (
                <m.circle
                  r={6 * haloScale}
                  fill="url(#atlas-node)"
                  initial={{ scale: 0.6, opacity: 0.5 }}
                  animate={{ scale: [0.6, 1.4, 0.6], opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 3.2, repeat: Infinity, delay: i * 0.25 }}
                />
              )}
              <circle r={2.2} fill="rgb(17 24 39)" />
              <circle
                r={emph ? 4 : 3}
                fill="none"
                stroke="rgb(37 99 235 / 0.7)"
                strokeWidth={0.75}
              />
              <text
                x={8}
                y={-6}
                fill="rgb(75 85 99)"
                fontSize={9}
                fontFamily="ui-monospace, SFMono-Regular, monospace"
                letterSpacing="0.18em"
              >
                {n.id}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Edge mask to fade the map into the page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl [mask-image:radial-gradient(75%_70%_at_50%_50%,black,transparent)]"
      />
    </div>
  );
}

/**
 * Pre-baked decorative "land" dots. Each polygon below is defined in real
 * geographic coordinates `[longitude, latitude]` and converted to the SVG
 * viewBox (equirectangular 1000×500) at module load. Vertex sequences trace
 * actual coastlines coarsely so the resulting dot-field reads as a
 * recognizable world map (continents, peninsulas, archipelagos).
 */
type Pt = [number, number];

/** Convert [lon, lat] (°) to viewBox pixel coords (equirectangular). */
function geo(lon: number, lat: number): Pt {
  return [((lon + 180) * 1000) / 360, ((90 - lat) * 500) / 180];
}

/** Raw continent outlines as longitude/latitude polygons. */
const GEO_POLYGONS: Array<Array<[number, number]>> = [
  // North America (Alaska → Arctic → E. Canada → Atlantic → Gulf → Panama → Pacific → back)
  [
    [-168, 65],
    [-160, 71],
    [-140, 70],
    [-125, 70],
    [-110, 73],
    [-95, 73],
    [-82, 70],
    [-72, 62],
    [-65, 60],
    [-58, 53],
    [-53, 49],
    [-58, 46],
    [-65, 44],
    [-70, 42],
    [-74, 40],
    [-76, 37],
    [-80, 32],
    [-81, 27],
    [-83, 25],
    [-83, 29],
    [-89, 30],
    [-94, 29],
    [-97, 26],
    [-95, 22],
    [-92, 19],
    [-88, 17],
    [-83, 15],
    [-78, 8],
    [-83, 11],
    [-90, 14],
    [-96, 16],
    [-103, 18],
    [-108, 21],
    [-112, 25],
    [-115, 30],
    [-118, 32],
    [-121, 35],
    [-124, 40],
    [-124, 48],
    [-132, 55],
    [-145, 60],
    [-160, 62],
    [-168, 65],
  ],
  // Greenland
  [
    [-55, 60],
    [-40, 60],
    [-22, 70],
    [-18, 76],
    [-30, 83],
    [-55, 82],
    [-65, 78],
    [-65, 68],
    [-55, 60],
  ],
  // South America
  [
    [-78, 8],
    [-72, 12],
    [-62, 10],
    [-52, 4],
    [-44, 0],
    [-38, -5],
    [-35, -8],
    [-37, -14],
    [-39, -22],
    [-44, -23],
    [-48, -28],
    [-55, -33],
    [-58, -38],
    [-62, -41],
    [-66, -45],
    [-68, -50],
    [-71, -54],
    [-69, -56],
    [-74, -52],
    [-75, -45],
    [-73, -38],
    [-72, -30],
    [-71, -22],
    [-71, -16],
    [-76, -12],
    [-78, -6],
    [-80, -3],
    [-80, 0],
    [-77, 4],
    [-78, 8],
  ],
  // Africa
  [
    [-9, 33],
    [-2, 36],
    [10, 37],
    [11, 33],
    [20, 32],
    [30, 31],
    [33, 28],
    [35, 23],
    [37, 17],
    [40, 15],
    [44, 12],
    [49, 12],
    [51, 10],
    [46, 3],
    [42, -5],
    [40, -10],
    [40, -16],
    [38, -22],
    [33, -28],
    [25, -34],
    [18, -34],
    [14, -28],
    [13, -20],
    [11, -10],
    [9, -2],
    [9, 4],
    [3, 5],
    [-5, 5],
    [-9, 6],
    [-13, 11],
    [-16, 14],
    [-17, 20],
    [-15, 26],
    [-12, 30],
    [-9, 33],
  ],
  // Madagascar
  [
    [44, -16],
    [50, -20],
    [49, -25],
    [44, -22],
    [43, -18],
    [44, -16],
  ],
  // Eurasia mainland (Iberia → N. Europe → Arctic Siberia → E. China → SE Asia → India → Arabia → Mediterranean)
  [
    [-9, 36],
    [-9, 43],
    [-2, 44],
    [0, 49],
    [-2, 50],
    [4, 51],
    [8, 54],
    [10, 58],
    [14, 65],
    [22, 70],
    [30, 71],
    [42, 68],
    [55, 70],
    [70, 73],
    [85, 75],
    [105, 76],
    [125, 73],
    [140, 73],
    [155, 70],
    [170, 67],
    [178, 67],
    [175, 62],
    [165, 60],
    [160, 55],
    [150, 48],
    [142, 46],
    [135, 43],
    [130, 40],
    [127, 37],
    [122, 31],
    [121, 28],
    [118, 24],
    [113, 22],
    [109, 18],
    [109, 12],
    [105, 11],
    [104, 8],
    [101, 3],
    [100, 6],
    [99, 12],
    [97, 16],
    [94, 16],
    [91, 22],
    [88, 22],
    [83, 18],
    [80, 13],
    [78, 8],
    [75, 12],
    [73, 17],
    [72, 21],
    [69, 23],
    [66, 25],
    [62, 25],
    [57, 23],
    [56, 26],
    [53, 25],
    [50, 22],
    [48, 18],
    [45, 13],
    [43, 13],
    [42, 16],
    [39, 19],
    [36, 23],
    [34, 28],
    [34, 31],
    [33, 36],
    [27, 37],
    [21, 38],
    [17, 41],
    [13, 38],
    [10, 37],
    [4, 37],
    [-5, 36],
    [-9, 36],
  ],
  // Great Britain
  [
    [-5, 50],
    [-1, 51],
    [1, 53],
    [0, 56],
    [-3, 59],
    [-5, 58],
    [-5, 54],
    [-5, 50],
  ],
  // Ireland
  [
    [-10, 52],
    [-6, 52],
    [-6, 55],
    [-10, 55],
    [-10, 52],
  ],
  // Iceland
  [
    [-24, 64],
    [-14, 64],
    [-13, 66],
    [-22, 67],
    [-24, 64],
  ],
  // Italy boot
  [
    [7, 44],
    [13, 46],
    [17, 41],
    [18, 40],
    [15, 38],
    [10, 43],
    [7, 44],
  ],
  // Japan
  [
    [130, 33],
    [133, 34],
    [136, 35],
    [139, 36],
    [142, 43],
    [144, 45],
    [141, 41],
    [136, 37],
    [132, 34],
    [130, 33],
  ],
  // Korean peninsula
  [
    [125, 38],
    [127, 38],
    [129, 36],
    [129, 34],
    [127, 34],
    [126, 36],
    [125, 38],
  ],
  // Sumatra
  [
    [95, 5],
    [99, 3],
    [105, -5],
    [102, -6],
    [98, -2],
    [95, 5],
  ],
  // Java
  [
    [105, -6],
    [115, -8],
    [114, -9],
    [105, -8],
    [105, -6],
  ],
  // Borneo
  [
    [109, 4],
    [118, 5],
    [119, 0],
    [115, -4],
    [110, -3],
    [108, 1],
    [109, 4],
  ],
  // Sulawesi
  [
    [119, 2],
    [124, 1],
    [125, -3],
    [121, -5],
    [119, -2],
    [119, 2],
  ],
  // Philippines
  [
    [120, 18],
    [124, 18],
    [125, 11],
    [122, 7],
    [120, 10],
    [120, 18],
  ],
  // New Guinea
  [
    [131, -2],
    [141, -3],
    [148, -6],
    [150, -10],
    [142, -10],
    [134, -8],
    [131, -2],
  ],
  // Australia
  [
    [114, -22],
    [122, -18],
    [130, -12],
    [138, -12],
    [142, -10],
    [145, -16],
    [149, -21],
    [153, -28],
    [150, -34],
    [144, -38],
    [140, -38],
    [135, -34],
    [125, -32],
    [115, -34],
    [114, -22],
  ],
  // Tasmania
  [
    [144, -40],
    [148, -40],
    [148, -43],
    [144, -43],
    [144, -40],
  ],
  // New Zealand
  [
    [170, -34],
    [174, -36],
    [177, -40],
    [175, -46],
    [167, -46],
    [170, -34],
  ],
];

const CONTINENT_POLYGONS: Pt[][] = GEO_POLYGONS.map((poly) =>
  poly.map(([lon, lat]) => geo(lon, lat)),
);

function pointInPolygon(pt: Pt, poly: Pt[]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const pi = poly[i]!;
    const pj = poly[j]!;
    const xi = pi[0];
    const yi = pi[1];
    const xj = pj[0];
    const yj = pj[1];
    const intersect =
      yi > pt[1] !== yj > pt[1] && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi + 1e-9) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function buildLandDots(): Pt[] {
  const dots: Pt[] = [];
  const stepX = 6;
  const stepY = 6;
  for (let y = 30; y <= 470; y += stepY) {
    // Stagger every other row by half a step for a more organic look
    const offset = (y / stepY) % 2 === 0 ? 0 : stepX / 2;
    for (let x = 20; x <= 980; x += stepX) {
      const px = x + offset;
      for (const poly of CONTINENT_POLYGONS) {
        if (pointInPolygon([px, y], poly)) {
          dots.push([px, y]);
          break;
        }
      }
    }
  }
  return dots;
}

const DOTS: Array<[number, number]> = buildLandDots();
