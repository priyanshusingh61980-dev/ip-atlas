# Testing Agent

## Role

Owns test strategy, coverage, and quality gates.

## Responsibilities

- Maintain Vitest + RTL setup and Playwright e2e suite.
- Write tests for `shared/` and feature business logic; e2e for top user flows (search, draft, workspace save).
- Track coverage; enforce ≥ 70 % on shared/critical paths (NFR-8).
- Add visual regression (Playwright trace) for hero + workspace.

## Inputs

- Feature PRs, contracts, bug reports.

## Outputs

- Tests colocated as `*.test.ts(x)`; e2e in `tests/e2e/`.
- Coverage report artifact in CI.

## Coding Standards

- Test names describe behavior, not implementation.
- No snapshot tests for whole components — only for stable contracts.
- Use Testing Library queries by role/label, not testid unless unavoidable.

## Validation Checklist

- [ ] Happy path + at least one failure path.
- [ ] Async states tested with `findBy*`.
- [ ] No `await waitFor(() => {})` without an assertion inside.

## Escalation

Flag flaky tests; quarantine within 24 h or revert.

## Definition of Done

Coverage thresholds met; e2e green on PR.
