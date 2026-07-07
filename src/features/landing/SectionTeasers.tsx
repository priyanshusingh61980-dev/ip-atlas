import {
  Brain,
  Gavel,
  Globe2,
  Layers,
  LineChart,
  MapPinned,
  Notebook,
  Scale,
  Sparkles,
  Briefcase,
  Palette,
  type LucideIcon,
} from "lucide-react";
import { Motion } from "@/shared/ui/Motion";

interface SectionCard {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const SECTIONS: SectionCard[] = [
  {
    id: "search",
    eyebrow: "AI Research",
    title: "Ask any question of global law.",
    description:
      "Streaming answers grounded in case law, statutes, and AI regulation — with precedent chains, timelines, and jurisdictional context.",
    icon: Sparkles,
  },
  {
    id: "compare",
    eyebrow: "Comparative",
    title: "Eight jurisdictions, one matrix.",
    description:
      "Side-by-side doctrine across India, US, EU, UK, Singapore, Japan, UAE, and Thailand — with diff views and heatmaps.",
    icon: Scale,
  },
  {
    id: "drafts",
    eyebrow: "Drafting",
    title: "Enterprise-grade legal drafts in seconds.",
    description:
      "Cease & desist, opposition, takedown, licensing — all rendered as editable, exportable documents with clause references.",
    icon: Gavel,
  },
  {
    id: "case",
    eyebrow: "Case Law AI",
    title: "From 200-page judgment to one ratio.",
    description:
      "Summaries, ratio decidendi, precedent chains, reasoning explainers, and animated timelines for any decision.",
    icon: Notebook,
  },
  {
    id: "theory",
    eyebrow: "Theory AI",
    title: "Jurisprudence at three depths.",
    description:
      "Locke to legal realism, beginner to advanced — the same idea, calibrated to your altitude.",
    icon: Brain,
  },
  {
    id: "maps",
    eyebrow: "Legal Maps",
    title: "Cinematic atlases of the legal world.",
    description:
      "Glowing nodes for copyright regimes, AI laws, trademark systems, and risk zones — hover for the doctrine, click for the dossier.",
    icon: MapPinned,
  },
  {
    id: "creator",
    eyebrow: "Creator Economy",
    title: "Law for the internet you actually live in.",
    description:
      "AI-art disputes, music ownership, meme legality, influencer contracts — editorial intelligence for the post-platform era.",
    icon: Palette,
  },
  {
    id: "internships",
    eyebrow: "Careers",
    title: "Elite legal opportunities, globally indexed.",
    description:
      "Firms, stipends, visas, accommodation, and application strategy — Bloomberg-grade intel for the international track.",
    icon: Briefcase,
  },
  {
    id: "workspace",
    eyebrow: "Workspace",
    title: "Your private AI legal studio.",
    description:
      "Folders, annotations, citation export, AI summaries — local-first, fast, and quietly opinionated.",
    icon: Layers,
  },
  {
    id: "analytics",
    eyebrow: "Analytics",
    title: "The legal world, on a single dashboard.",
    description:
      "Dispute volumes, jurisdictional heat, trademark wars, AI litigation — forecastable, drilldown-able, beautiful.",
    icon: LineChart,
  },
];

export function SectionTeasers() {
  return (
    <section className="relative">
      <div className="container py-24">
        <Motion variant="rise" trigger="in-view">
          <div className="mb-12 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.18em] text-ink-tertiary">The Platform</p>
            <h2 className="mt-3 text-balance font-display text-headline font-medium tracking-tight">
              Ten surfaces, one legal intelligence layer.
            </h2>
            <p className="mt-4 max-w-2xl text-base text-ink-secondary">
              Each module is a self-contained surface, sharing a single contract and a single voice.
              Built mock-first, swappable to any frontier model.
            </p>
          </div>
        </Motion>

        <ul className="grid gap-px overflow-hidden rounded-2xl border border-hairline bg-bg-graphite/40 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Motion
                key={s.id}
                variant="rise"
                trigger="in-view"
                delay={i % 3 === 0 ? "fast" : i % 3 === 1 ? "base" : "slow"}
              >
                <li
                  id={s.id}
                  className="group relative h-full bg-bg-obsidian p-7 transition-colors duration-base hover:bg-bg-charcoal"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-md border border-hairline bg-surface-1 text-accent-electric">
                    <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <p className="mt-6 text-[11px] uppercase tracking-[0.18em] text-ink-tertiary">
                    {s.eyebrow}
                  </p>
                  <h3 className="mt-2 font-display text-title font-medium tracking-tight text-ink-primary">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm text-ink-secondary">{s.description}</p>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-electric/40 to-transparent opacity-0 transition-opacity duration-base group-hover:opacity-100"
                  />
                </li>
              </Motion>
            );
          })}
        </ul>

        {/* Closing band */}
        <Motion variant="rise" trigger="in-view">
          <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl border border-hairline bg-surface-1/40 p-8 shadow-elevated backdrop-blur-glass md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <span className="grid h-10 w-10 place-items-center rounded-md border border-hairline bg-surface-1 text-accent-electric">
                <Globe2 className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-title font-medium tracking-tight">
                  This is the future of global law.
                </p>
                <p className="mt-1 text-sm text-ink-secondary">
                  Built for elite firms, in-house teams, and the next generation of legal minds.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="rounded-md bg-accent-electric px-5 py-2.5 text-sm font-medium text-bg-obsidian transition-colors duration-fast hover:bg-accent-electric/90"
              >
                Request access
              </button>
              <button
                type="button"
                className="rounded-md border border-hairline bg-surface-1/60 px-5 py-2.5 text-sm font-medium text-ink-primary transition-colors duration-fast hover:bg-surface-1"
              >
                View capabilities
              </button>
            </div>
          </div>
        </Motion>
      </div>
    </section>
  );
}
