import { Compass, Sparkles, Scale, Brain } from "lucide-react";

const SUGGESTIONS = [
  { icon: Sparkles, text: "Is training generative AI on copyrighted text fair use?" },
  { icon: Scale, text: "Compare trademark dilution doctrine across US, EU, and India." },
  { icon: Brain, text: "Summarise the ratio in Andersen v. Stability AI in plain English." },
  { icon: Compass, text: "Which jurisdictions have enforceable AI-disclosure rules in 2025?" },
];

interface SearchEmptyProps {
  variant: "idle" | "no-results";
  query?: string;
  onPick?: (q: string) => void;
}

export function SearchEmpty({ variant, query, onPick }: SearchEmptyProps) {
  if (variant === "no-results") {
    return (
      <div className="rounded-xl border border-hairline bg-surface-1/40 p-8 text-center">
        <p className="font-display text-title font-medium tracking-tight">
          No authorities surfaced.
        </p>
        <p className="mt-2 text-sm text-ink-secondary">
          {query
            ? `Novatrix IP couldn't synthesize a response for "${query}". Try broader phrasing or a different jurisdiction set.`
            : "Try a broader query or a different jurisdiction set."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <p className="text-[11px] uppercase tracking-[0.18em] text-ink-tertiary">Try</p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {SUGGESTIONS.map((s, i) => {
          const Icon = s.icon;
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => onPick?.(s.text)}
                className="group flex w-full items-start gap-3 rounded-lg border border-hairline bg-surface-1/40 p-4 text-left transition-colors duration-fast hover:bg-surface-1"
              >
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md border border-hairline bg-surface-1 text-accent-electric">
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span className="text-sm text-ink-secondary group-hover:text-ink-primary">
                  {s.text}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
