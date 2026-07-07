# Repository Analysis — Novatrix IP

## 1. Current State

This is a **greenfield repository**. The workspace currently contains only:

- `readme.md` — the bootstrap orchestration prompt (Phases 1–10).
- `requirement.md` — the product brief for **Novatrix IP**, a luxury AI legal-intelligence platform.

There is no source code, build system, package manager, CI, or infrastructure yet. All architecture decisions below are **inferred from the product brief** rather than from existing code.

## 2. Architecture Summary (Target)

A single-page client application with progressive enhancement toward AI-backed services:

```
┌──────────────────────────────────────────────────────────┐
│   Browser (React 18 + Vite + Tailwind + Framer Motion)   │
│   - Marketing hero & cinematic sections                  │
│   - 11 product modules (Search, Comparative, Drafting…)  │
│   - Research workspace (local-first, then synced)        │
└───────────────┬──────────────────────────────────────────┘
                │ HTTPS / Fetch
                ▼
┌──────────────────────────────────────────────────────────┐
│   API Layer (deferred — mocked in Phase 1 MVP)           │
│   - /search  /compare  /draft  /case-analyze /theory     │
│   - Streaming SSE for AI completions                     │
└───────────────┬──────────────────────────────────────────┘
                │
                ▼
┌──────────────────────────────────────────────────────────┐
│   AI providers (pluggable) + Legal corpora (pluggable)   │
└──────────────────────────────────────────────────────────┘
```

MVP-1 ships **front-end only** with deterministic mock data; AI endpoints are introduced behind a thin `services/` abstraction so the UI never imports providers directly.

## 3. Detected / Recommended Tech Stack

| Layer           | Choice                                                  | Reason                             |
| --------------- | ------------------------------------------------------- | ---------------------------------- |
| Framework       | **React 18**                                            | Mandated by brief                  |
| Bundler         | **Vite 5**                                              | Mandated by brief; fast HMR        |
| Language        | **TypeScript (strict)**                                 | Required for elite engineering bar |
| Styling         | **Tailwind CSS 3**                                      | Mandated                           |
| Motion          | **Framer Motion 11**                                    | Mandated                           |
| Icons           | **lucide-react**                                        | Mandated                           |
| Routing         | **react-router-dom 6**                                  | Multi-section product              |
| State           | **Zustand** + React Query (later)                       | Lightweight, no Redux overhead     |
| Maps            | **react-simple-maps** or **mapbox-gl** (deferred)       | Cinematic world map                |
| Charts          | **visx** or **Recharts**                                | Analytics dashboards               |
| Forms           | **react-hook-form** + **zod**                           | Type-safe validation               |
| Testing         | **Vitest** + **React Testing Library** + **Playwright** | Unit + e2e                         |
| Lint/Format     | **ESLint** + **Prettier** + **stylelint**               | Standards                          |
| Hooks           | **Husky** + **lint-staged**                             | Pre-commit gates                   |
| Package manager | **pnpm**                                                | Speed, monorepo-ready              |

## 4. Risk Areas

1. **Visual ambition vs. performance** — heavy motion, world maps, glassmorphism risk LCP/CLS regressions on mid-tier devices.
2. **Scope sprawl** — 11 large product modules; without strict MVP gating this stalls.
3. **AI surface without backend** — every module promises AI features; we must mock convincingly before any real LLM wiring.
4. **Legal accuracy liability** — even demo data must carry a disclaimer; misuse risk is real.
5. **Accessibility under "cinematic" design** — dark themes + heavy motion conflict with WCAG; need `prefers-reduced-motion` and contrast tokens from day 1.
6. **SEO for an SPA** — eventual SSR/SSG via Next.js or Astro may be needed; design components framework-portable.

## 5. Missing Infrastructure

- No `package.json`, no `tsconfig`, no Vite config.
- No design tokens / theme system.
- No component library scaffolding.
- No CI pipeline (GitHub Actions recommended).
- No environment file convention.
- No analytics / observability decision.
- No deployment target chosen (Vercel / Cloudflare Pages / Azure Static Web Apps).

## 6. Probable Bottlenecks

- World-map rendering & animation cost.
- Bundle size if all Framer Motion variants ship eagerly → use route-level code splitting.
- Tailwind JIT class explosion if design tokens are not centralized.
- AI streaming responses without a back-pressure plan.

## 7. Coupling Analysis (target)

- Pages → **feature modules** → **shared primitives** (`ui/`) → **design tokens**.
- Feature modules MUST NOT import each other; cross-feature reuse goes through `shared/`.
- AI providers are accessed only through `services/ai/*` adapters; UI never imports vendor SDKs.

## 8. Scaling Concerns

- Future SSR / edge rendering for SEO.
- I18n (the brief targets 8 jurisdictions — copy will be jurisdiction-scoped, not yet translated).
- Multi-tenant workspaces (research workspace must namespace per user from day 1).

## 9. Unknowns / Open Questions

1. Which AI provider(s)? (OpenAI / Azure OpenAI / Anthropic) — affects streaming + auth shape.
2. Hosting target? (Affects SSR, edge functions, secrets.)
3. Auth provider? (Clerk / Auth.js / Azure Entra) — workspace section needs it.
4. Real legal corpus source vs. curated mock? (Liability question.)
5. Analytics + consent (GDPR/DPDP) — required before any tracking.
6. Brand assets / logotype — does any exist or do we generate?

These remain open and are tracked in `memory/decisions.md` as **ADR-PENDING**.
