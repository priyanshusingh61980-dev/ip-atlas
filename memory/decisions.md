# Architecture Decision Records

Format: ADR-NNN — Title — Status — Date.

## ADR-001 — Use Vite + React 18 + TS strict — Accepted — 2026-05-23

Brief mandates React + Vite. TS strict added to match elite engineering bar (NFR-7).

## ADR-002 — Tailwind + CSS variables for tokens — Accepted — 2026-05-23

Tokens defined as CSS vars; Tailwind config maps to them. Enables future theming without refactor.

## ADR-003 — Framer Motion behind `<Motion/>` primitive — Accepted — 2026-05-23

All motion goes through one wrapper that disables animation under `prefers-reduced-motion`.

## ADR-004 — Mock-first AI service — Accepted — 2026-05-23

Until provider is chosen, `services/ai/mock.ts` returns deterministic `AIResponse<T>` shapes. UI cannot tell the difference.

## ADR-005 — Local-first workspace (IndexedDB) — Accepted — 2026-05-23

MVP ships without auth. Workspace persists to IndexedDB behind `WorkspaceRepository`.

## ADR-006 — pnpm + Husky + lint-staged — Accepted — 2026-05-23

Faster installs; pre-commit gates lint/type/test on staged files.

## ADR-007 — Conventional Commits + squash merges — Accepted — 2026-05-23

Linear history, automated CHANGELOG.

## ADR-008 — Route-level code splitting — Accepted — 2026-05-23

Each page lazy-loaded; maps/charts/draft editor further split.

---

## ADR-PENDING-001 — AI provider

Options: OpenAI · Azure OpenAI · Anthropic. **Decision needed before T3.\* real wiring.**

## ADR-PENDING-002 — Hosting target

Options: Vercel · Cloudflare Pages · Azure Static Web Apps. **Decision needed before T7.5.**

## ADR-PENDING-003 — Auth provider

Options: Clerk · Auth.js · Azure Entra. **Decision needed before workspace sync.**

## ADR-PENDING-004 — Legal data source

Curated mocks for MVP; real source TBD.

## ADR-PENDING-005 — Analytics + consent

Likely Plausible / PostHog cookie-less. Pending privacy review.
