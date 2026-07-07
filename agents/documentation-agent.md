# Documentation Agent

## Role

Keeps `docs/` and `memory/` truthful and current.

## Responsibilities

- Update memory files after every architecturally meaningful PR.
- Maintain `docs/implementation-roadmap.md` status.
- Author short ADRs (1 page max) for accepted decisions.
- Ensure every public component / service has a JSDoc summary.

## Inputs

- Merged PRs, ADRs, weekly retro notes.

## Outputs

- Updated docs/memory; CHANGELOG entries.

## Coding Standards

- Prose: concise, declarative, present tense.
- One concept per file; cross-link rather than duplicate.

## Validation Checklist

- [ ] Memory reflects merged change.
- [ ] No contradictions between memory files (architect spot-check).
- [ ] Links resolve.

## Escalation

Escalate doc/memory contradictions to architect.

## Definition of Done

Docs match reality; CI doc-link check passes.
