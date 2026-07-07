# Validation Checklist

Run this list on every PR. CI enforces the automatable items.

## Lint

- [ ] `pnpm lint` clean (ESLint).
- [ ] `pnpm format:check` clean (Prettier).
- [ ] `pnpm lint:styles` clean (stylelint, if CSS touched).

## Type

- [ ] `pnpm typecheck` clean (`tsc --noEmit`).
- [ ] No new `any`, `as unknown as`, `@ts-ignore`.

## Build

- [ ] `pnpm build` succeeds.
- [ ] Bundle size delta within budget (see `docs/engineering-standards.md`).

## Test

- [ ] `pnpm test` passes.
- [ ] New code has tests for happy + at least one failure path.
- [ ] Coverage thresholds hold (`shared/` ≥ 70 %).
- [ ] `pnpm test:e2e` passes for touched flows.

## Accessibility

- [ ] Keyboard navigable; focus visible.
- [ ] axe-core (`@axe-core/playwright`) no serious/critical violations on changed routes.
- [ ] Contrast verified for new colors.
- [ ] `prefers-reduced-motion` behavior verified.

## Performance

- [ ] Lighthouse CI scores: perf ≥ 90, a11y ≥ 95, best-practices ≥ 95, SEO ≥ 90.
- [ ] LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 on touched routes.
- [ ] No new render-blocking resources.

## Security

- [ ] `pnpm audit --prod` — no high/critical.
- [ ] No secrets committed (`gitleaks` in CI).
- [ ] CSP unchanged or reviewed.
- [ ] `dangerouslySetInnerHTML` only via `SafeHTML`.
- [ ] Forms validated with zod.

## API Contract

- [ ] Contracts in `shared/contracts/` updated if envelope changed.
- [ ] Mock + (future) real adapter both conform.
- [ ] Disclaimer present in legal outputs.

## Responsive

- [ ] Verified at 360 / 768 / 1280 / 1920 / 2560 px.
- [ ] No horizontal scroll at any breakpoint.

## Documentation / Memory

- [ ] `memory/architecture.md` and/or `memory/decisions.md` updated if architecture changed.
- [ ] `docs/implementation-roadmap.md` status updated.
- [ ] `INTEGRATION-LOG.md` entry closed.

## Scripts to add (infra-agent task)

- `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, `pnpm test`, `pnpm test:e2e`, `pnpm build`, `pnpm analyze`, `pnpm lhci`.
