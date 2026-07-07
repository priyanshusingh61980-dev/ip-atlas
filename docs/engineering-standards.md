# Engineering Standards

## Naming

- **Files:** kebab-case for non-components (`use-async-state.ts`); PascalCase for components (`HeroSection.tsx`).
- **Components:** PascalCase, named exports only.
- **Hooks:** `useX`.
- **Types:** PascalCase, `T`/`I` prefixes forbidden.
- **Boolean props:** `isX / hasX / canX`.
- **Event handlers:** `onX` on props, `handleX` inside components.

## Folders

```
src/
  app/        providers, router, error boundary
  pages/      one folder per route
  features/   one folder per product module
  shared/
    ui/         primitives (Button, Card, Motion, SafeHTML…)
    hooks/
    contracts/  zod schemas
    design/     tokens, motion, easings
    utils/
  services/
    ai/         AIService interface + adapters
    workspace/
    analytics/
  styles/     globals.css, tailwind layers
  test/       setup, helpers
```

## Component Structure

1. Imports (ext → int).
2. Types.
3. Component declaration.
4. Hooks at top of function.
5. Derived state.
6. Effects.
7. Handlers.
8. Render (early returns for empty/error states).

## API / Service Structure

- Interface in `shared/contracts/` or `services/<svc>/types.ts`.
- Mock + real adapter implement the interface.
- Boundary validates inputs/outputs with zod.

## Error Handling

- Never swallow errors.
- Render an `<ErrorState />` with a recovery action.
- Log structured errors via `services/observability/log.ts`.
- Throw `DomainError` subclasses with codes — never strings.

## Logging

- Levels: debug, info, warn, error.
- Production builds strip debug/info.
- Include `correlationId` for AI requests.

## State Management

- Local: `useState/useReducer`.
- Feature-wide: Zustand store, namespaced.
- Server cache: React Query (when backend lands).
- Avoid Context for high-frequency updates.

## Accessibility

- All interactive elements reachable by keyboard.
- Visible focus ring (token: `--focus-ring`).
- `aria-label` for icon-only buttons.
- Forms: label + description + error wired with `aria-describedby`.
- Respect `prefers-reduced-motion` via `<Motion/>`.

## Security

- No `dangerouslySetInnerHTML` outside `SafeHTML`.
- All inputs zod-validated.
- No secrets in client; `.env` not committed.
- CSP delivered via meta tag for SPA dev; via headers in prod.

## Testing Strategy

- Unit (Vitest + RTL): pure logic, hooks, components with branching.
- Integration: feature page + mocked service.
- E2E (Playwright): top user flows (search, draft, workspace).
- Coverage ≥ 70 % on `shared/` and feature logic.
- No tests against implementation details.

## Performance Rules

- Lazy-load routes (`React.lazy` + `Suspense`).
- Lazy-load maps, charts, draft editor.
- Use `LazyMotion` + `domAnimation` for Framer Motion.
- Memoize only when measured to help.
- Images: AVIF/WebP with `srcset`.

## PR Rules

- Conventional Commits (`feat: …`, `fix: …`, `chore: …`, `docs: …`).
- One concern per PR.
- Description includes: linked task, validation checklist results, perf delta.
- Squash on merge.

## Documentation Requirements

- Every public component / service has a JSDoc header.
- Architectural changes update `memory/architecture.md` in the same PR.
- New decisions land as an ADR in `memory/decisions.md`.

## Frontend / Design System

- Composition over configuration; primitives accept a `className` and a constrained variant prop only.
- Tokens via Tailwind theme + CSS variables; no inline hex.
- Responsive utilities used over hand-rolled media queries.

## Backend / Service Boundaries (when added)

- One service = one bounded responsibility.
- DTOs are zod-derived; never expose ORM models.
- Validation at every boundary; errors return typed envelopes.
