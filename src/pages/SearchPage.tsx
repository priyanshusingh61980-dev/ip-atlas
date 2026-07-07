import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Motion } from "@/shared/ui/Motion";
import { jurisdictions, type Jurisdiction } from "@/shared/design/tokens";
import { SearchForm } from "@/features/search/SearchForm";
import { SearchResult } from "@/features/search/SearchResult";
import { SearchEmpty } from "@/features/search/SearchEmpty";
import { SearchError } from "@/features/search/SearchError";
import { SearchSkeleton } from "@/features/search/SearchSkeleton";
import { useAISearch } from "@/features/search/useAISearch";
import type { SearchRequest } from "@/shared/contracts/ai";

const JURISDICTION_SET = new Set<string>(jurisdictions);

function parseJurisdictions(value: string | null): Jurisdiction[] {
  if (!value) return [];
  return value
    .split(",")
    .map((v) => v.trim().toUpperCase())
    .filter((v): v is Jurisdiction => JURISDICTION_SET.has(v));
}

export function SearchPage() {
  const [params, setParams] = useSearchParams();
  const { state, submit, cancel, reset } = useAISearch();

  const initialQuery = params.get("q") ?? "";
  const initialJurisdictions = useMemo(() => parseJurisdictions(params.get("j")), [params]);

  const runSearch = useCallback(
    (req: SearchRequest) => {
      const next = new URLSearchParams();
      next.set("q", req.query);
      if (req.jurisdictions.length > 0) next.set("j", req.jurisdictions.join(","));
      setParams(next, { replace: true });
      submit(req);
    },
    [setParams, submit],
  );

  // Run an initial query if URL carries one.
  useEffect(() => {
    if (initialQuery.trim().length > 0 && state.status === "idle") {
      submit({ query: initialQuery, jurisdictions: initialJurisdictions, topics: [] });
    }
    // Run only once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loading = state.status === "loading" || state.status === "streaming";

  return (
    <section className="relative">
      <div className="container max-w-4xl py-16 md:py-24">
        <Motion variant="rise">
          <header className="mb-8 flex flex-col gap-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-ink-tertiary">AI Research</p>
            <h1 className="text-balance font-display text-headline font-medium tracking-tight">
              Ask any question of global law.
            </h1>
            <p className="max-w-2xl text-base text-ink-secondary">
              Streaming answers grounded in case law, statutes, and AI regulation — with precedent
              chains, jurisdictional context, and citations.
            </p>
          </header>
        </Motion>

        <Motion variant="rise" delay="fast">
          <SearchForm
            initialQuery={initialQuery}
            initialJurisdictions={initialJurisdictions}
            loading={loading}
            onSubmit={runSearch}
            onCancel={cancel}
          />
        </Motion>

        <div className="mt-12">
          <ResultRegion
            state={state}
            onRetry={() => {
              if (state.status === "error") runSearch(state.request);
            }}
            onPick={(q) => runSearch({ query: q, jurisdictions: [], topics: [] })}
            onReset={reset}
          />
        </div>
      </div>
    </section>
  );
}

interface ResultRegionProps {
  state: ReturnType<typeof useAISearch>["state"];
  onRetry: () => void;
  onPick: (q: string) => void;
  onReset: () => void;
}

function ResultRegion({ state, onRetry, onPick, onReset }: ResultRegionProps) {
  switch (state.status) {
    case "idle":
      return <SearchEmpty variant="idle" onPick={onPick} />;
    case "loading":
      return <SearchSkeleton query={state.request.query} />;
    case "streaming":
      return <SearchResult response={state.response} streaming />;
    case "success":
      return <SearchResult response={state.response} />;
    case "empty":
      return (
        <div className="flex flex-col gap-6">
          <SearchEmpty variant="no-results" query={state.request.query} />
          <button
            type="button"
            onClick={onReset}
            className="self-start text-sm text-ink-secondary underline-offset-4 hover:text-ink-primary hover:underline"
          >
            Clear and start over
          </button>
        </div>
      );
    case "error":
      return (
        <SearchError code={state.error.code} message={state.error.message} onRetry={onRetry} />
      );
    default:
      return null;
  }
}
