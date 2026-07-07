# Constraints

## Product

- Product name is **Novatrix IP** (rebranded from the working title "IP Atlas").
- Light theme is the v1 default (paper-white palette, editorial-blue accent). A dark variant is not shipped in v1.
- 11 product modules — none may be silently dropped; deferral requires ADR.
- All legal output must carry a disclaimer.

## Engineering

- React + Vite + Tailwind + Framer Motion + lucide-react (mandated).
- TypeScript strict; no `any` in committed code.
- No cross-feature imports.
- No new top-level dependency without architect approval.

## Performance (NFR)

- LCP ≤ 2.5 s on mid-tier 4G.
- INP ≤ 200 ms.
- Initial JS ≤ 200 KB gz for landing route.
- CLS ≤ 0.1.

## Accessibility

- WCAG 2.2 AA.
- `prefers-reduced-motion` honored everywhere.

## Security

- No secrets in client bundle.
- CSP restricts inline scripts.
- All AI HTML output sanitized.
- All form inputs zod-validated.

## Privacy

- No tracking before consent.
- Cookie-less analytics preferred.

## Legal

- Demo data must not impersonate a real legal opinion.
- Each generated document includes "Not legal advice" disclaimer.

## Process

- Conventional Commits.
- Squash merges.
- Wave-ordered task execution (see `docs/task-graph.md`).
- Memory files updated as part of the PR that changes architecture.
