# Patterns

## Component Anatomy

```
features/<feature>/
  index.ts            // public exports (a Page or main component)
  routes.tsx          // optional route definitions
  components/         // feature-private components
  hooks/              // feature-private hooks
  state.ts            // optional Zustand store
  contracts.ts        // zod schemas for this feature
  *.test.tsx
```

## Async State Pattern

Every async surface renders one of: `idle | loading | streaming | success | error | empty`.
Use a `useAsyncState<T>()` hook that returns a discriminated union.

## Motion Pattern

```tsx
import { Motion } from "@/shared/ui/Motion";

<Motion variant="rise" delay="fast">
  <Card />
</Motion>;
```

Variants live in `shared/design/motion.ts`. Reduced-motion users get `opacity` only.

## Safe HTML Pattern

Never use `dangerouslySetInnerHTML` directly. Use `<SafeHTML html={…} />` which runs DOMPurify with a strict allowlist.

## AI Response Pattern

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

UI binds to `status` to pick state; never inspects provider-specific fields.

## Form Pattern

`react-hook-form` + zod resolver. One schema in `contracts.ts`; same schema validates server-side.

## Disclaimer Pattern

Every legal output renders `<LegalDisclaimer/>` either inline or as a footer band. Non-removable.

## Empty / Error States

Always illustrated, always include a primary recovery action. Copy lives in `shared/copy/`.
