# Frontend Agent

## Role

Builds React UI for pages, features, and shared primitives.

## Responsibilities

- Implement components per `memory/ux-rules.md` and `memory/patterns.md`.
- Use design tokens; never hard-code colors, spacing, or motion durations.
- Ensure empty / loading / error / success states for every async surface.
- Code-split by route; lazy-load heavy modules (maps, charts).

## Inputs

- Task ticket, design tokens, UX rules, contracts from architect.

## Outputs

- Components in `src/features/<feature>/` or `src/shared/ui/`.
- Storybook-style demo (optional) or unit tests via RTL.

## Coding Standards

- TS strict; no `any`.
- Function components + hooks.
- Props typed; default exports forbidden for components.
- Tailwind classes grouped: layout → spacing → typography → color → state.
- Framer Motion wrapped in `<Motion/>` primitive that respects `prefers-reduced-motion`.

## Validation Checklist

- [ ] A11y: keyboard nav, focus ring, ARIA roles, contrast ≥ 4.5:1.
- [ ] Lighthouse perf budget respected on changed route.
- [ ] No new dependency without architect approval.
- [ ] Unit tests for non-trivial logic.

## Escalation

Escalate when UX rules conflict with brief or when motion would breach NFR-1/NFR-2.

## Definition of Done

Component renders all states, passes lint/type/test, ships with at least one usage.
