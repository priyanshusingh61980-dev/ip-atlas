# Agent Execution Playbook

## Communication

- Agents communicate via files in `agents/`, `memory/`, and `docs/` — never out-of-band.
- Each PR description names the agent role (`role: frontend-agent`) and links the task ID from `docs/task-graph.md`.
- `INTEGRATION-LOG.md` (root) records cross-feature touches; integration-agent owns it.

## Task Claiming

1. Pick the **lowest-numbered unclaimed task in the current wave**.
2. Open a branch `task/<id>-<slug>`.
3. Add an entry to `INTEGRATION-LOG.md` with task ID, owner agent, files expected to touch.
4. Begin work.

## Merge Conflict Avoidance

- Wave ordering is mandatory; do not start wave N+1 work until wave N landed.
- Within a wave, two agents may not touch the same `shared/` file in parallel.
- For shared touch points, integration-agent issues a coordination ticket.

## Context Preservation

- Read relevant `memory/*` and the task entry before coding.
- Update `memory/*` in the same PR as the change.
- Never duplicate facts across memory files; cross-link.

## Stop & Ask Triggers

An agent **must stop and surface a question** when:

- An ADR-PENDING is reached.
- The change requires a new top-level dependency.
- The brief and accessibility/security conflict.
- A perf budget cannot be met without scope change.

## Retry Logic

- Lint/type/test failure: fix in same branch (no force-push after review).
- Flaky test: quarantine via `test.skip` + open follow-up; do not delete.
- CI infra failure: re-run once; if persistent, escalate to infra-agent.

## Validation Gates (in order)

1. Lint clean.
2. Type-check clean.
3. Unit tests pass.
4. Integration / e2e relevant to change pass.
5. A11y check on touched routes.
6. Perf budget not regressed.
7. Security review if PR touches auth/network/user content.
8. Memory + docs updated.

## Deployment Gates

- All validation gates green.
- Preview URL reproduces the change.
- Performance + a11y reports attached.
- ADR-PENDING-002 (hosting) resolved.

## Rollback Rules

- Production rollback via re-deploy of last green build.
- Database/workspace migrations must be reversible (when backend lands).
- Feature flags preferred over hard reverts for in-flight features.

## Preferences

- Small commits.
- Isolated changes.
- Strongly typed interfaces.
- Reusable abstractions only after the second concrete use-case.
- Incremental validation; never batch.

## Escalation Path

1. Same-agent retry.
2. Integration-agent if cross-cutting.
3. Architect-agent if contract or layering.
4. User if scope, budget, vendor, legal.
