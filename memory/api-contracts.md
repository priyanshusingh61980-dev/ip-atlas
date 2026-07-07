# API Contracts

All contracts live in `src/shared/contracts/` as zod schemas; TS types are inferred.

## Common Envelope

```ts
export const Citation = z.object({
  id: z.string(),
  title: z.string(),
  source: z.string().url().optional(),
  jurisdiction: Jurisdiction.optional(),
  date: z.string().optional(),
});

export const AIResponse = <T extends z.ZodTypeAny>(data: T) =>
  z.object({
    id: z.string(),
    status: z.enum(["streaming", "complete", "error"]),
    data,
    citations: z.array(Citation).default([]),
    jurisdiction: Jurisdiction.optional(),
    disclaimer: z.string(),
  });
```

## Jurisdictions

`"IN" | "US" | "EU" | "UK" | "SG" | "JP" | "AE" | "TH"`.

## Feature Contracts (initial sketches)

### Search (FR-2)

```
POST /api/search        { query, jurisdictions[], topics[] }
→ AIResponse<{ summary: string; precedents: PrecedentRef[]; timeline: TimelineEvent[]; }>
```

### Compare (FR-3)

```
POST /api/compare       { topic, jurisdictions[] }
→ AIResponse<{ matrix: ComparisonRow[]; heatmap: HeatCell[]; }>
```

### Draft (FR-4)

```
POST /api/draft         { kind, facts, parties, jurisdiction }
→ AIResponse<{ document: { html: string; markdown: string }; clauses: ClauseRef[]; }>
```

### Case (FR-5)

```
POST /api/case/analyze  { text | url }
→ AIResponse<{ summary; ratio; precedents; reasoning; timeline; }>
```

### Theory (FR-6)

```
POST /api/theory        { topic, mode: "beginner"|"academic"|"advanced" }
→ AIResponse<{ explanation: string; thinkers: ThinkerRef[]; schools: string[]; }>
```

### Workspace (local-first)

```
WorkspaceRepository {
  listFolders(): Promise<Folder[]>;
  saveItem(item): Promise<Item>;
  annotate(itemId, ann): Promise<Annotation>;
  exportCitations(folderId, fmt): Promise<Blob>;
}
```

> All endpoints stream when `Accept: text/event-stream` is sent. SSE frames are `{ delta, status }` until a final `{ status: "complete", data }` frame.
