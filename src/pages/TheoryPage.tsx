import { useEffect, useId, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { Brain, BookOpen, ExternalLink, Sparkles } from "lucide-react";
import { Motion } from "@/shared/ui/Motion";
import { useAITheory } from "@/features/theory/useAITheory";
import { TheoryDepthSchema, type TheoryDepth } from "@/shared/contracts/ai";
import { SearchError } from "@/features/search/SearchError";

const DEPTHS: Array<{ id: TheoryDepth; label: string; sub: string }> = [
  { id: "beginner", label: "Beginner", sub: "Plain English" },
  { id: "intermediate", label: "Intermediate", sub: "Doctrine + context" },
  { id: "advanced", label: "Advanced", sub: "Jurisprudential edge" },
];

function parseDepth(value: string | null): TheoryDepth {
  const result = TheoryDepthSchema.safeParse(value ?? "intermediate");
  return result.success ? result.data : "intermediate";
}

export function TheoryPage() {
  const [params, setParams] = useSearchParams();
  const initialQuery = params.get("q") ?? "";
  const initialDepth = useMemo(() => parseDepth(params.get("d")), [params]);

  const [query, setQuery] = useState(initialQuery);
  const [depth, setDepth] = useState<TheoryDepth>(initialDepth);
  const { state, submit, reset } = useAITheory();
  const inputId = useId();

  function runTheory(nextQuery: string, nextDepth: TheoryDepth) {
    const trimmed = nextQuery.trim();
    if (trimmed.length === 0) return;
    const next = new URLSearchParams();
    next.set("q", trimmed);
    next.set("d", nextDepth);
    setParams(next, { replace: true });
    submit({ query: trimmed, depth: nextDepth });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    runTheory(query, depth);
  }

  function pickDepth(next: TheoryDepth) {
    setDepth(next);
    // Re-run with the new depth if there's an active query.
    const activeQuery =
      state.status === "success" || state.status === "loading" || state.status === "error"
        ? state.request.query
        : query.trim();
    if (activeQuery.length > 0) runTheory(activeQuery, next);
  }

  // Auto-run from URL on mount.
  useEffect(() => {
    if (initialQuery.trim().length > 0 && state.status === "idle") {
      submit({ query: initialQuery.trim(), depth: initialDepth });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative">
      <div className="container max-w-4xl py-16 md:py-24">
        <Motion variant="rise">
          <header className="mb-8 flex flex-col gap-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-ink-tertiary">Theory AI</p>
            <h1 className="text-balance font-display text-headline font-medium tracking-tight">
              Jurisprudence at three depths.
            </h1>
            <p className="max-w-2xl text-base text-ink-secondary">
              Locke to legal realism, beginner to advanced — the same idea, calibrated to your
              altitude. Toggle depth without retyping the question.
            </p>
          </header>
        </Motion>

        <Motion variant="rise" delay="fast">
          <form
            role="search"
            aria-label="Theory AI"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <label htmlFor={inputId} className="sr-only">
              Ask a question of legal theory
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-hairline bg-surface-1/60 px-4 py-3 shadow-elevated backdrop-blur-glass focus-within:border-accent-electric/35">
              <Brain className="h-4 w-4 text-ink-tertiary" strokeWidth={1.5} aria-hidden="true" />
              <input
                id={inputId}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Why does copyright exist?"
                className="flex-1 bg-transparent text-base text-ink-primary placeholder:text-ink-tertiary focus:outline-none"
                autoComplete="off"
                spellCheck={false}
              />
              <button
                type="submit"
                disabled={query.trim().length === 0 || state.status === "loading"}
                className="rounded-md bg-accent-electric px-3.5 py-1.5 text-sm font-medium text-bg-obsidian transition-colors duration-fast hover:bg-accent-electric/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {state.status === "loading" ? "Thinking…" : "Ask"}
              </button>
            </div>

            <fieldset
              className="flex flex-wrap items-center gap-2"
              aria-label="Depth"
              role="radiogroup"
            >
              <legend className="mr-2 text-[11px] uppercase tracking-[0.18em] text-ink-tertiary">
                Depth
              </legend>
              {DEPTHS.map((d) => {
                const active = d.id === depth;
                return (
                  <button
                    key={d.id}
                    role="radio"
                    aria-checked={active}
                    type="button"
                    onClick={() => pickDepth(d.id)}
                    className={[
                      "flex flex-col items-start gap-0.5 rounded-md border px-3 py-1.5 text-left transition-colors duration-fast",
                      active
                        ? "border-accent-electric/60 bg-accent-electric/15 text-ink-primary"
                        : "border-hairline bg-surface-1/40 text-ink-secondary hover:text-ink-primary",
                    ].join(" ")}
                  >
                    <span className="text-xs font-medium">{d.label}</span>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-ink-tertiary">
                      {d.sub}
                    </span>
                  </button>
                );
              })}
            </fieldset>
          </form>
        </Motion>

        <div className="mt-12">
          <TheoryRegion state={state} onRetry={() => runTheory(query, depth)} onReset={reset} />
        </div>
      </div>
    </section>
  );
}

interface TheoryRegionProps {
  state: ReturnType<typeof useAITheory>["state"];
  onRetry: () => void;
  onReset: () => void;
}

function TheoryRegion({ state, onRetry, onReset }: TheoryRegionProps) {
  if (state.status === "idle") {
    return (
      <div className="rounded-xl border border-hairline bg-surface-1/40 p-8 text-center">
        <p className="font-display text-title font-medium tracking-tight">
          Ask a question. Pick a depth.
        </p>
        <p className="mt-2 text-sm text-ink-secondary">
          Try <em>&ldquo;Why does copyright exist?&rdquo;</em> or{" "}
          <em>&ldquo;What is the labour theory of property?&rdquo;</em>
        </p>
        <button
          type="button"
          onClick={onReset}
          className="sr-only"
          aria-hidden="true"
          tabIndex={-1}
        >
          reset
        </button>
      </div>
    );
  }

  if (state.status === "loading") {
    return (
      <div aria-busy="true" aria-live="polite" className="flex flex-col gap-4">
        <p className="text-[11px] uppercase tracking-[0.18em] text-ink-tertiary">
          Reasoning at <span className="normal-case text-ink-secondary">{state.request.depth}</span>{" "}
          depth…
        </p>
        <div className="space-y-3">
          <Bar widthClass="w-11/12" />
          <Bar widthClass="w-10/12" />
          <Bar widthClass="w-9/12" />
          <Bar widthClass="w-7/12" />
        </div>
      </div>
    );
  }

  if (state.status === "error") {
    return <SearchError code={state.error.code} message={state.error.message} onRetry={onRetry} />;
  }

  const { response } = state;
  const { data, citations, disclaimer } = response;

  return (
    <article aria-live="polite" className="flex flex-col gap-10">
      <Motion variant="rise" duration="base">
        <section className="flex flex-col gap-4">
          <header className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ink-tertiary">
            <Sparkles
              className="h-3.5 w-3.5 text-accent-electric"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span>Thesis · {data.depth}</span>
          </header>
          <p className="text-balance font-display text-title font-medium tracking-tight text-ink-primary">
            {data.thesis}
          </p>
          <p className="text-base leading-relaxed text-ink-secondary">{data.explanation}</p>
        </section>
      </Motion>

      {data.thinkers.length > 0 && (
        <Motion variant="rise" duration="base" delay="fast">
          <section className="flex flex-col gap-4">
            <h2 className="text-[11px] uppercase tracking-[0.18em] text-ink-tertiary">Thinkers</h2>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {data.thinkers.map((t) => (
                <li
                  key={t.name}
                  className="rounded-lg border border-hairline bg-surface-1/40 p-4 transition-colors duration-fast hover:bg-surface-1"
                >
                  <p className="font-display text-base font-medium tracking-tight text-ink-primary">
                    {t.name}
                  </p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-ink-tertiary">
                    {t.era}
                  </p>
                  <p className="mt-2 text-sm text-ink-secondary">{t.contribution}</p>
                </li>
              ))}
            </ul>
          </section>
        </Motion>
      )}

      {data.furtherReading.length > 0 && (
        <Motion variant="rise" duration="base" delay="base">
          <section className="flex flex-col gap-3">
            <h2 className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ink-tertiary">
              <BookOpen className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
              Further reading
            </h2>
            <ul className="flex flex-col gap-2">
              {data.furtherReading.map((r, i) => (
                <li key={i} className="text-sm text-ink-secondary">
                  {r.url ? (
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="decoration-hairline group inline-flex items-baseline gap-1.5 underline decoration-1 underline-offset-4 transition-colors duration-fast hover:text-accent-electric hover:decoration-accent-electric/60"
                    >
                      <span>· {r.label}</span>
                      <ExternalLink
                        className="h-3 w-3 self-center text-ink-tertiary transition-colors duration-fast group-hover:text-accent-electric"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    <>· {r.label}</>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </Motion>
      )}

      {citations.length > 0 && (
        <Motion variant="rise" duration="base" delay="slow">
          <section className="flex flex-col gap-3">
            <h2 className="text-[11px] uppercase tracking-[0.18em] text-ink-tertiary">Citations</h2>
            <ul className="flex flex-col gap-2">
              {citations.map((c) => (
                <li key={c.id} className="text-sm">
                  {c.source ? (
                    <a
                      href={c.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="decoration-hairline group inline-flex items-center gap-1 text-ink-primary underline decoration-1 underline-offset-4 transition-colors duration-fast hover:text-accent-electric hover:decoration-accent-electric/60"
                    >
                      {c.title}
                      <ExternalLink
                        className="h-3 w-3 text-ink-tertiary transition-colors duration-fast group-hover:text-accent-electric"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    <span className="text-ink-primary">{c.title}</span>
                  )}
                  <span className="ml-2 text-xs text-ink-tertiary">
                    {[c.jurisdiction, c.date].filter(Boolean).join(" · ")}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </Motion>
      )}

      <p className="border-t border-hairline pt-5 text-xs text-ink-tertiary">{disclaimer}</p>
    </article>
  );
}

function Bar({ widthClass }: { widthClass: string }) {
  return (
    <div className={`h-3 overflow-hidden rounded-full bg-surface-1/40 ${widthClass}`}>
      <div className="h-full w-full animate-pulse bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </div>
  );
}
