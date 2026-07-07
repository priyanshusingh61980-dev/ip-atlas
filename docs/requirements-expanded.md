# Requirements — Expanded

Source: `requirement.md` (Novatrix IP — "Global Legal Intelligence for the AI Era").

## A. Functional Requirements

### FR-1 Landing / Hero

- Animated futuristic world map (interactive, glowing nodes).
- AI-powered global search bar (entry to FR-2).
- Floating analytics tiles (live-look data, mocked OK).
- Primary CTAs: **Explore AI Research**, **Launch Workspace**.
- Cinematic scroll-driven transitions.

### FR-2 AI Legal Search Engine

- Search across: global case law, statutes, AI regs, trademark disputes, copyright, creator economy, intl. principles.
- Result card includes: AI summary, precedent chain, timeline, citations, jurisdiction comparison, related cases, insights.
- UX target: "Perplexity for global law" — single column, streaming answer + source sidebar.

### FR-3 Comparative Law Engine

- Compare 8 jurisdictions: IN, US, EU, UK, SG, JP, AE, TH.
- Topics: copyright, patents, trademarks, fair use, AI regulation, creator rights, contracts, data privacy, media law.
- Views: split-screen diff, interactive matrix, animated heatmap.

### FR-4 Trademark Draft AI

- Generate: cease & desist, infringement warning, opposition, settlement, license, takedown, response.
- Output: editable rich text + export (PDF/DOCX) + version history.

### FR-5 Case Law AI

- Per-judgment: summary, ratio decidendi, precedents, reasoning explainer, timeline, insights.
- Dashboard of recently analyzed cases.

### FR-6 Theory AI (Jurisprudence)

- Coverage: Locke, Hegel, legal realism, utilitarianism, constitutional theory, IP philosophy, schools.
- Modes: **beginner / academic / advanced research** (changes depth + citation density).

### FR-7 Creator Economy Law Hub

- Editorial magazine layout.
- Topics: AI art disputes, music ownership, influencer contracts, gaming copyright, fashion law, anime piracy, meme legality, internet culture.

### FR-8 International Internship Intelligence Hub

- Listings + intelligence cards: firms, stipends, visas, accommodation, city guides, application strategy, cold-email templates.
- Filter by city / practice area / stipend / visa-friendliness.

### FR-9 Interactive Legal Maps

- World maps overlaying: copyright systems, AI laws, trademark frameworks, creator regs, risk zones, internship destinations.
- Hover → node detail card; click → drill-down panel.

### FR-10 Research Workspace

- Per-user: bookmarks, saved research, notes, annotations, folders, citation export, AI summaries.
- Local-first persistence (IndexedDB) with future sync.

### FR-11 Global Legal Analytics

- Dashboards: IP disputes, trademark wars, AI lawsuits, creator economy growth, heatmaps, jurisdiction analytics, trend forecasting.

## B. Non-Functional Requirements

| Code   | Requirement       | Target                                                             |
| ------ | ----------------- | ------------------------------------------------------------------ |
| NFR-1  | Performance — LCP | ≤ 2.5s on 4G mid-tier device                                       |
| NFR-2  | Performance — INP | ≤ 200 ms                                                           |
| NFR-3  | Bundle (initial)  | ≤ 200 KB gz JS for landing route                                   |
| NFR-4  | Accessibility     | WCAG 2.2 AA; respect `prefers-reduced-motion`                      |
| NFR-5  | Browser support   | Last 2 versions of evergreen + Safari 16+                          |
| NFR-6  | Responsive        | 360 px → 2560 px fluidly                                           |
| NFR-7  | Type safety       | TS strict, no `any` in committed code                              |
| NFR-8  | Test coverage     | ≥ 70 % stmts on `shared/` + critical feature logic                 |
| NFR-9  | Security          | No secrets in client; CSP; sanitized rich-text outputs             |
| NFR-10 | Privacy           | Cookie-free analytics by default; consent gate before any tracking |
| NFR-11 | I18n-ready        | Strings extracted; no hard-coded copy in components                |
| NFR-12 | SEO               | Pre-rendered marketing routes (SSG path)                           |

## C. Implicit Assumptions

- AI responses are **mocked** until a provider decision is recorded (see `memory/decisions.md`).
- Legal text shown is illustrative — every output carries a disclaimer.
- Workspace persistence is local-only in MVP-1.
- Dark theme is canonical; a light theme is non-goal for v1.

## D. Missing Definitions (block real implementation until resolved)

- AI provider + auth model.
- Hosting target.
- Auth/identity provider for workspace.
- Source of legal data (curated / partnerships / scraped public domain).
- Brand kit (typography licenses, logo).

## E. Dependencies

- External: AI provider SDK, map data (Natural Earth GeoJSON OK), font licenses.
- Internal: design tokens must land before any feature component.

## F. Edge Cases

- Empty search / zero results.
- Streaming AI failure mid-response.
- Map rendering on low-power devices → static fallback.
- Reduced-motion users → all Framer Motion animations gated.
- Long judgments (>50 pages) — chunked summarization.
- Workspace storage quota exceeded.
- Offline mode for workspace.

## G. UX Expectations

- Cinematic but never blocking — animations never delay first interaction.
- Keyboard navigable; visible focus rings (luxury-tuned, not default blue).
- Empty / loading / error / success states for every async surface.
- "Slow-AI" affordance: skeleton + streaming token feel.

## H. API / Data Expectations

All AI endpoints conform to a common envelope:

```ts
type AIResponse<T> = {
  id: string;
  status: "streaming" | "complete" | "error";
  data: T;
  citations: Citation[];
  jurisdiction?: Jurisdiction;
  disclaimer: string;
};
```

Mock layer must already return this shape so swap-in is trivial.

## I. Scaling Expectations

- Routes are code-split.
- AI provider behind adapter; switch via env flag.
- Workspace storage abstracted (IndexedDB → API) behind a `WorkspaceRepository` interface.

## J. Security Concerns

- HTML rendered from AI output runs through DOMPurify.
- No tokens in client; AI calls proxied via backend (when added).
- CSP header restricts inline scripts; no `dangerouslySetInnerHTML` outside the sanitizer.
- All form inputs validated with zod.
- Disclaimer surface on every legal output (NFR-9 / legal liability).
