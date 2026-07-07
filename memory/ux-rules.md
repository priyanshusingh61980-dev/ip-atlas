# UX Rules

## Brand

Product name: **Novatrix IP** — Global Legal Intelligence for the AI Era.

## Brand Voice

Cinematic, confident, restrained. Avoid hyperbole copy — let the typography and motion do the talking.

## Color Tokens (light canonical, v1 default)

Values are RGB triplets in `src/styles/globals.css` consumed via `rgb(var(--token) / <alpha>)`. Token names are preserved from the original dark palette so existing Tailwind utilities (`bg-bg-obsidian`, `text-ink-primary`, etc.) keep working.

- `--bg-obsidian` rgb(252 252 250) — canonical page background (warm paper)
- `--bg-graphite` rgb(246 246 242) — section background
- `--bg-charcoal` rgb(238 238 232) — hover / elevated panel
- `--surface-1` rgb(255 255 255) — card / form surface
- `--surface-2` rgb(248 248 244) — subtle inset surface
- `--border-hairline` rgb(17 24 39) — dark slate, used at 0.06–0.10 alpha
- `--text-primary` rgb(17 24 39) — near-black slate
- `--text-secondary` rgb(75 85 99)
- `--text-tertiary` rgb(130 138 152)
- `--accent-electric` rgb(37 99 235) — editorial blue
- `--accent-silver` rgb(100 110 125)
- `--danger` rgb(220 38 38)
- `--success` rgb(22 163 74)

`color-scheme: light`. Body uses a soft radial accent wash at 0.10 alpha over `--bg-obsidian`.

## Typography

- Display: Editorial (e.g., **Fraunces** or **Söhne Breit**). For OSS: _Fraunces_ / _Inter Display_.
- UI: **Inter** variable.
- Mono: **JetBrains Mono**.

Scale (rem): `display 4.5 / headline 3 / title 2 / body 1 / caption 0.875 / mono 0.875`.

## Spacing

4-pt base. Use 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.

## Motion

Durations (ms): `instant 80, fast 160, base 240, slow 400, cinematic 800`.
Easings: `standard cubic-bezier(.2,.0,.2,1)`, `decelerate (.0,.0,.2,1)`, `accelerate (.4,.0,1,1)`, `spring 250-22`.

## Layout

- 12-col grid, 1440 max content, 96 px gutters desktop.
- Glassmorphism (light): `backdrop-blur: 24px; bg: rgba(255,255,255,0.65); border: hairline at 0.08 alpha;`. Use sparingly.
- Elevation via soft slate shadow (`shadow.elevated = 0 1px 0 hairline/0.06, 0 12px 32px rgba(17,24,39,0.08)`).

## Required States

Every surface ships **all five**: empty, loading, streaming, success, error.

## Accessibility

- Contrast ≥ 4.5:1 for body, ≥ 3:1 for large text/UI.
- Focus ring: 2 px `--accent-electric`, 2 px offset, never removed.
- All interactive elements reachable by Tab; logical order matches visual.
- `prefers-reduced-motion` disables transforms; only opacity remains.
- All icons that convey meaning have `aria-label`.

## Iconography

`lucide-react`, 1.5 stroke, 20 px default. No filled icons.

## Imagery

Photography or generative art: paper-white base, high contrast, restrained editorial-blue accent. No stock-looking imagery.

## Responsive Breakpoints

`sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536 / 3xl 1920`. Fluid type via `clamp()`.

## Disclaimers

All legal outputs carry a non-removable disclaimer band.
