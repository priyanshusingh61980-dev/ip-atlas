import { Search, ArrowUpRight, Sparkles } from "lucide-react";
import { Motion } from "@/shared/ui/Motion";
import { WorldMap } from "./WorldMap";

const ANALYTICS = [
  { label: "Jurisdictions", value: "8" },
  { label: "AI surfaces", value: "11" },
  { label: "Avg. response", value: "240 ms" },
  { label: "Disputes tracked", value: "12.4 k" },
] as const;

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[80vh] bg-[radial-gradient(60%_60%_at_50%_0%,rgb(var(--accent-electric)/0.12),transparent_70%)]"
      />

      <div className="container relative pb-24 pt-12 md:pt-20">
        <Motion variant="rise" delay="fast">
          <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-1/60 px-3 py-1 text-xs text-ink-secondary">
            <Sparkles
              className="h-3.5 w-3.5 text-accent-electric"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            Now in private preview — M1 foundation online
          </div>
        </Motion>

        <Motion variant="rise" delay="base">
          <h1 className="mt-6 max-w-4xl text-balance font-display text-display font-medium tracking-tight">
            Global Legal Intelligence
            <br />
            <span className="text-ink-secondary">for the AI Era.</span>
          </h1>
        </Motion>

        <Motion variant="rise" delay="slow">
          <p className="mt-6 max-w-2xl text-balance text-lg text-ink-secondary">
            AI-powered comparative law, intellectual property intelligence, legal drafting, creator
            economy law, and international legal opportunities — unified into one elite platform.
          </p>
        </Motion>

        {/* Search bar */}
        <Motion variant="rise" delay="slow">
          <form
            className="mt-10 flex max-w-2xl items-center gap-2 rounded-xl border border-hairline bg-surface-1/60 p-2 shadow-elevated backdrop-blur-glass focus-within:border-accent-electric/35"
            onSubmit={(e) => e.preventDefault()}
            role="search"
            aria-label="Global legal intelligence search"
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-surface-2/80 text-accent-electric">
              <Search className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <label className="sr-only" htmlFor="hero-search">
              Ask Novatrix IP
            </label>
            <input
              id="hero-search"
              type="search"
              autoComplete="off"
              placeholder="Ask anything — case law, comparative doctrine, AI regulation…"
              className="min-w-0 flex-1 bg-transparent px-1 text-base text-ink-primary placeholder:text-ink-tertiary focus:outline-none"
            />
            <button
              type="submit"
              className="group inline-flex items-center gap-1.5 rounded-lg bg-accent-electric px-4 py-2 text-sm font-medium text-bg-obsidian transition-colors duration-fast hover:bg-accent-electric/90"
            >
              Search
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-fast group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </button>
          </form>
        </Motion>

        <Motion variant="rise" delay="cinematic">
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="group inline-flex items-center gap-2 rounded-md bg-ink-primary px-5 py-2.5 text-sm font-medium text-bg-obsidian transition-colors duration-fast hover:bg-ink-primary/90"
            >
              Explore AI Research
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-fast group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md border border-hairline bg-surface-1/60 px-5 py-2.5 text-sm font-medium text-ink-primary transition-colors duration-fast hover:bg-surface-1"
            >
              Launch Workspace
            </button>
          </div>
        </Motion>

        {/* World map + floating analytics */}
        <div className="relative mt-16">
          <Motion variant="scale" delay="cinematic" duration="cinematic">
            <div className="relative">
              <WorldMap />
            </div>
          </Motion>

          <ul
            aria-label="Live platform metrics"
            className="pointer-events-none absolute inset-x-0 bottom-2 mx-auto grid w-full max-w-3xl grid-cols-2 gap-2 px-2 sm:grid-cols-4"
          >
            {ANALYTICS.map((tile, i) => (
              <Motion
                key={tile.label}
                variant="rise"
                trigger="in-view"
                delay={i === 0 ? "fast" : i === 1 ? "base" : i === 2 ? "slow" : "cinematic"}
              >
                <li className="glass pointer-events-auto rounded-lg px-3 py-2.5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-tertiary">
                    {tile.label}
                  </div>
                  <div className="mt-1 font-display text-xl text-ink-primary">{tile.value}</div>
                </li>
              </Motion>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
