# Implementation Roadmap

## Milestone M0 — Foundations (Wave 0–1)

Scaffold, tooling, design tokens, motion primitive, mock AI service, folder architecture, CI skeleton.

- Exit: `pnpm validate` green on empty scaffold; CI green; tokens in place.

## Milestone M1 — Marketing Shell (Wave 2–3)

App shell, navigation, footer, hero (FR-1) with placeholder world map, scroll reveals.

- Exit: Landing route hits NFR-1/2/3; a11y clean; Lighthouse perf ≥ 90.

## Milestone M2 — AI Surfaces (mock) (Wave 4, Cluster A)

AI Search (FR-2), Case Law AI (FR-5), Theory AI (FR-6), Trademark Draft (FR-4) — all on `services/ai/mock.ts`.

- Exit: All four routes ship with full state matrix (idle/loading/streaming/success/error/empty), disclaimers visible.

## Milestone M3 — Data & Content (Wave 4, Clusters B + C)

Comparative (FR-3), Maps (FR-9), Analytics (FR-11), Creator Hub (FR-7), Internships (FR-8).

- Exit: Each route renders mock data with interactive states; perf budgets hold; maps use placeholder GeoJSON.

## Milestone M4 — Workspace (Wave 4 tail → 5)

`WorkspaceRepository` interface + IndexedDB impl (FR-10); workspace UI (folders, bookmarks, notes, citation export).

- Exit: Persisted across reloads; citation export to BibTeX/CSL JSON works.

## Milestone M5 — Quality Bar (Wave 5)

A11y sweep, perf hardening, SEO/SSG decision + meta system, visual regression on hero + workspace.

- Exit: All NFRs green across all routes; Lighthouse CI thresholds enforced.

## Milestone M6 — Launch (Wave 6)

ADR-PENDING-001 (AI provider) & ADR-PENDING-002 (hosting) land. Real AI adapter behind env flag. Deploy.

- Exit: Production URL live; preview deploys on PR; analytics + consent live.

## Parallel Workstreams

- **A (AI):** mock → contracts → real adapter swap.
- **B (Visuals):** tokens → motion → maps → charts.
- **C (Workspace):** repository iface → storage impl → UI.

## Dependency Chains

M0 → M1 → (M2 ∥ M3 ∥ M4) → M5 → M6.

## Highest-Risk Items First

1. Cinematic hero performance (M1).
2. World-map performance (M3).
3. AI envelope contract (M0/M2) — gates all swap-in work.
4. Reduced-motion fallback design (M0/M1).

## Fastest Feedback Loops

- Vite HMR + Vitest watch.
- Playwright trace viewer on e2e failures.
- Lighthouse CI on PR with budget deltas.
- Storybook _(optional, deferred)_.

## MVP Path

M0 → M1 → M2 (Search + Draft only) → M4 (Workspace).
Everything else is post-MVP.

## Stabilization Phase

- Quarantine flaky tests.
- Bundle audit.
- Lighthouse CI baseline lock.
- Doc/memory consistency review.

## Production Hardening Phase

- Real AI provider integration.
- Auth + workspace sync.
- SSG for marketing routes.
- Observability + error reporting.
- Cost/quota guardrails on AI calls.

## Status Tracker

| Milestone | Status      | Notes                         |
| --------- | ----------- | ----------------------------- |
| M0        | Not started | Awaiting scaffolding go-ahead |
| M1        | Not started | —                             |
| M2        | Not started | —                             |
| M3        | Not started | —                             |
| M4        | Not started | —                             |
| M5        | Not started | —                             |
| M6        | Blocked     | ADR-PENDING-001, -002         |
