# Technical Debt Ledger

Track items intentionally deferred. Each entry: ID · description · created · owner · trigger to repay.

| ID     | Item                                                   | Created    | Owner     | Repay When                    |
| ------ | ------------------------------------------------------ | ---------- | --------- | ----------------------------- |
| TD-001 | AI service is mock-only                                | 2026-05-23 | backend   | ADR-PENDING-001 resolved      |
| TD-002 | No SSR/SSG; SPA only                                   | 2026-05-23 | infra     | SEO traffic targets set       |
| TD-003 | No real auth; workspace is local-first                 | 2026-05-23 | backend   | ADR-PENDING-003 resolved      |
| TD-004 | Legal corpus is curated mocks                          | 2026-05-23 | architect | Data partnership lands        |
| TD-005 | No i18n runtime; strings extracted but English only    | 2026-05-23 | frontend  | First non-EN locale committed |
| TD-006 | No visual regression coverage on maps                  | 2026-05-23 | testing   | Maps stabilize                |
| TD-007 | World map uses placeholder GeoJSON until vendor chosen | 2026-05-23 | frontend  | Map vendor ADR                |
