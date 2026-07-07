# Task Graph

Legend: **[P]** parallelizable · **→** depends-on · **★** critical path

## Epics

- **E1 Foundations** — repo, tooling, design system.
- **E2 Marketing Shell** — hero, navigation, footer, motion system.
- **E3 AI Surfaces** — search, case, theory, draft.
- **E4 Data Surfaces** — comparative, maps, analytics.
- **E5 Content Surfaces** — creator hub, internships.
- **E6 Workspace** — bookmarks, notes, export.
- **E7 Quality & Launch** — perf, a11y, SEO, deploy.

## Tasks

### E1 Foundations ★

1. **T1.1** Scaffold Vite + React + TS strict.
2. **T1.2** Tailwind config + design tokens (colors, type, spacing, motion). → T1.1
3. **T1.3** ESLint + Prettier + stylelint + Husky + lint-staged. → T1.1 [P with T1.2]
4. **T1.4** Vitest + RTL + Playwright skeleton. → T1.1 [P]
5. **T1.5** Folder architecture (`app/`, `pages/`, `features/`, `shared/`, `services/`). → T1.1
6. **T1.6** Mock service layer (`services/ai/mock.ts`) implementing AIResponse envelope. → T1.5
7. **T1.7** Motion primitives + `prefers-reduced-motion` wrapper. → T1.2

### E2 Marketing Shell ★

8. **T2.1** App shell, router, layout. → T1.5
9. **T2.2** Navigation + footer. → T2.1 [P with T2.3]
10. **T2.3** Hero section (animated world map placeholder, search bar, CTAs). → T1.7, T2.1
11. **T2.4** Scroll-driven section reveals. → T1.7

### E3 AI Surfaces

12. **T3.1** AI Search page (FR-2) using mock service. → T1.6, T2.1
13. **T3.2** Case Law AI (FR-5). → T1.6 [P with T3.1]
14. **T3.3** Theory AI (FR-6) + mode switcher. → T1.6 [P]
15. **T3.4** Trademark Draft AI (FR-4) + export stubs. → T1.6, T2.1

### E4 Data Surfaces

16. **T4.1** Comparative Law dashboard (FR-3). → T1.5 [P]
17. **T4.2** Interactive Legal Maps (FR-9). → T1.5
18. **T4.3** Global Analytics dashboards (FR-11). → T1.5 [P]

### E5 Content Surfaces

19. **T5.1** Creator Economy Hub (FR-7) editorial layout. → T2.1 [P]
20. **T5.2** Internship Intelligence Hub (FR-8) + filters. → T2.1 [P]

### E6 Workspace

21. **T6.1** Workspace repository interface + IndexedDB impl. → T1.5
22. **T6.2** Workspace UI (folders, bookmarks, notes, citations). → T6.1, T2.1

### E7 Quality & Launch ★

23. **T7.1** A11y audit + reduced-motion sweep. → all UI tasks
24. **T7.2** Performance budget + Lighthouse CI. → T1.3
25. **T7.3** SEO/SSG decision + meta system. → T2.1
26. **T7.4** CI pipeline (build, lint, test, e2e). → T1.3, T1.4
27. **T7.5** Deploy target wiring. → T7.4

## Execution Order (waves)

```
Wave 0  T1.1
Wave 1  T1.2 ∥ T1.3 ∥ T1.4 ∥ T1.5
Wave 2  T1.6 ∥ T1.7 ∥ T2.1
Wave 3  T2.2 ∥ T2.3 ∥ T2.4 ∥ T7.4
Wave 4  T3.1 ∥ T3.2 ∥ T3.3 ∥ T3.4 ∥ T4.1 ∥ T4.2 ∥ T4.3 ∥ T5.1 ∥ T5.2 ∥ T6.1
Wave 5  T6.2 ∥ T7.1 ∥ T7.2 ∥ T7.3
Wave 6  T7.5
```

## Parallelizable Clusters

- **Cluster A (AI):** T3.1, T3.2, T3.3, T3.4 — share only mock service contract.
- **Cluster B (Data):** T4.1, T4.2, T4.3 — independent routes.
- **Cluster C (Content):** T5.1, T5.2 — independent routes.

## Blockers

- All AI tasks blocked until **T1.6 (mock service)** is in.
- Workspace UI blocked until **T6.1 (repository interface)** ships.
- Deploy blocked until **hosting decision** (ADR-PENDING-002).

## Validation Requirements (per task)

Every task must satisfy `docs/validation-checklist.md` before marking done.
