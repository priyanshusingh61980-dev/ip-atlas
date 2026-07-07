# Glossary

- **ADR** — Architecture Decision Record.
- **AI Envelope** — the `AIResponse<T>` shape returned by every AI endpoint.
- **Cinematic motion** — long-form (800 ms) hero-class animation; reserved for hero + section reveals.
- **Comparative matrix** — table view contrasting a topic across jurisdictions.
- **Disclaimer band** — non-removable strip on any legal output reading "Not legal advice".
- **Feature module** — self-contained product surface under `features/`.
- **Glassmorphism** — translucent surface with backdrop blur, hairline border, subtle glow.
- **Jurisdiction** — one of `IN US EU UK SG JP AE TH`.
- **Mock-first** — UI built against `services/ai/mock.ts` until a real provider lands.
- **Motion primitive** — `<Motion/>` wrapper that gates Framer Motion by reduced-motion preference.
- **Ratio decidendi** — the binding legal reasoning of a case (Case Law AI output field).
- **Reduced motion** — user preference disabling transforms; only opacity remains.
- **SafeHTML** — sanitized HTML rendering primitive (DOMPurify).
- **Streaming response** — SSE-delivered `{delta,status}` frames culminating in `{status:"complete"}`.
- **Token** — design value (color, type, spacing, motion) referenced indirectly by components.
- **Wave** — a parallelizable batch in `docs/task-graph.md`.
- **Workspace** — per-user research surface (folders, notes, citations) persisted locally in v1.
