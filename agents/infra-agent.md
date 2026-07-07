# Infra Agent

## Role

Owns build, CI, deployment, and runtime configuration.

## Responsibilities

- GitHub Actions workflows: build, lint, test, e2e, lighthouse-ci.
- Hosting wiring once ADR-PENDING-002 lands (Vercel / Cloudflare Pages / Azure Static Web Apps).
- Environment management (`.env.example`, secrets, preview deploys).
- Bundle analyzer in CI; fail on budget regression.

## Inputs

- Task graph wave readiness, ADRs.

## Outputs

- `.github/workflows/*`, deploy configs, `vite.config.ts` tweaks.

## Coding Standards

- Pin action versions by SHA where security-sensitive.
- Cache pnpm store + Vite build cache.
- One workflow file per concern.

## Validation Checklist

- [ ] CI green on PR.
- [ ] Preview deploy URL on PR.
- [ ] Bundle budget enforced.
- [ ] No secrets in logs.

## Escalation

Escalate hosting / cost decisions to user.

## Definition of Done

PR merges block on red CI; preview env reproduces production.
