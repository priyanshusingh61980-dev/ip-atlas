import { ExternalLink, Sparkles } from "lucide-react";
import type { AIResponse, SearchPayload } from "@/shared/contracts/ai";
import { Motion } from "@/shared/ui/Motion";

interface SearchResultProps {
  response: AIResponse<SearchPayload>;
  streaming?: boolean;
}

export function SearchResult({ response, streaming = false }: SearchResultProps) {
  const { data, citations, disclaimer } = response;
  return (
    <article aria-live="polite" aria-busy={streaming} className="flex flex-col gap-10">
      {/* Summary */}
      <Motion variant="rise" duration="base">
        <section aria-labelledby="result-summary" className="flex flex-col gap-4">
          <header className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ink-tertiary">
            <Sparkles
              className="h-3.5 w-3.5 text-accent-electric"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span>Synthesis</span>
            {streaming && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-electric/40 bg-accent-electric/10 px-2 py-0.5 text-[10px] font-medium text-accent-electric">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-electric" />
                Streaming
              </span>
            )}
          </header>
          <h2 id="result-summary" className="sr-only">
            Summary
          </h2>
          <p className="text-balance text-lg leading-relaxed text-ink-primary">
            {data.summary}
            {streaming && (
              <span
                className="ml-1 inline-block h-4 w-1.5 translate-y-0.5 animate-pulse bg-accent-electric/70"
                aria-hidden="true"
              />
            )}
          </p>
        </section>
      </Motion>

      {/* Precedents */}
      {data.precedents.length > 0 && (
        <Motion variant="rise" duration="base" delay="fast">
          <section aria-labelledby="result-precedents" className="flex flex-col gap-4">
            <h3
              id="result-precedents"
              className="text-[11px] uppercase tracking-[0.18em] text-ink-tertiary"
            >
              Precedents
            </h3>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {data.precedents.map((p) => (
                <li
                  key={p.id}
                  className="rounded-lg border border-hairline bg-surface-1/40 p-4 transition-colors duration-fast hover:bg-surface-1"
                >
                  {p.source ? (
                    <a
                      href={p.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="decoration-hairline group flex items-start gap-1.5 font-display text-base font-medium tracking-tight text-ink-primary underline decoration-1 underline-offset-4 transition-colors duration-fast hover:text-accent-electric hover:decoration-accent-electric/60"
                    >
                      <span>{p.caption}</span>
                      <ExternalLink
                        className="mt-1 h-3 w-3 shrink-0 text-ink-tertiary transition-colors duration-fast group-hover:text-accent-electric"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    <p className="font-display text-base font-medium tracking-tight text-ink-primary">
                      {p.caption}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-ink-tertiary">
                    {[p.jurisdiction, p.year].filter(Boolean).join(" · ")}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </Motion>
      )}

      {/* Timeline */}
      {data.timeline.length > 0 && (
        <Motion variant="rise" duration="base" delay="base">
          <section aria-labelledby="result-timeline" className="flex flex-col gap-4">
            <h3
              id="result-timeline"
              className="text-[11px] uppercase tracking-[0.18em] text-ink-tertiary"
            >
              Timeline
            </h3>
            <ol className="relative ml-3 border-l border-hairline pl-6">
              {data.timeline.map((t, i) => (
                <li key={i} className="relative pb-5 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[27px] top-1.5 grid h-3 w-3 place-items-center rounded-full bg-bg-obsidian"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-electric" />
                  </span>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-tertiary">
                    {t.date}
                  </p>
                  <p className="mt-1 text-sm text-ink-secondary">{t.label}</p>
                </li>
              ))}
            </ol>
          </section>
        </Motion>
      )}

      {/* Citations */}
      {citations.length > 0 && (
        <Motion variant="rise" duration="base" delay="slow">
          <section aria-labelledby="result-citations" className="flex flex-col gap-3">
            <h3
              id="result-citations"
              className="text-[11px] uppercase tracking-[0.18em] text-ink-tertiary"
            >
              Citations
            </h3>
            <ul className="flex flex-col gap-2">
              {citations.map((c) => (
                <li key={c.id} className="flex flex-wrap items-baseline gap-2 text-sm">
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
                  <span className="text-xs text-ink-tertiary">
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
