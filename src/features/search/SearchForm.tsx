import { useId, useState } from "react";
import type { FormEvent } from "react";
import { Search as SearchIcon } from "lucide-react";
import { jurisdictions, type Jurisdiction } from "@/shared/design/tokens";
import type { SearchRequest } from "@/shared/contracts/ai";

interface SearchFormProps {
  initialQuery?: string;
  initialJurisdictions?: Jurisdiction[];
  loading?: boolean;
  onSubmit: (request: SearchRequest) => void;
  onCancel?: () => void;
}

export function SearchForm({
  initialQuery = "",
  initialJurisdictions = [],
  loading = false,
  onSubmit,
  onCancel,
}: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery);
  const [selected, setSelected] = useState<Set<Jurisdiction>>(new Set(initialJurisdictions));
  const inputId = useId();
  const fieldsetId = useId();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = query.trim();
    if (q.length === 0 || loading) return;
    onSubmit({ query: q, jurisdictions: Array.from(selected), topics: [] });
  }

  function toggle(j: Jurisdiction) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(j)) next.delete(j);
      else next.add(j);
      return next;
    });
  }

  return (
    <form
      role="search"
      aria-label="AI legal research"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <label htmlFor={inputId} className="sr-only">
        Ask any question of global law
      </label>
      <div className="flex items-center gap-3 rounded-xl border border-hairline bg-surface-1/60 px-4 py-3 shadow-elevated backdrop-blur-glass focus-within:border-accent-electric/35">
        <SearchIcon className="h-4 w-4 text-ink-tertiary" strokeWidth={1.5} aria-hidden="true" />
        <input
          id={inputId}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. AI training data and fair use across jurisdictions"
          className="flex-1 bg-transparent text-base text-ink-primary placeholder:text-ink-tertiary focus:outline-none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
        {loading ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-hairline bg-surface-1 px-3.5 py-1.5 text-sm text-ink-primary transition-colors duration-fast hover:bg-bg-charcoal"
          >
            Cancel
          </button>
        ) : (
          <button
            type="submit"
            disabled={query.trim().length === 0}
            className="rounded-md bg-accent-electric px-3.5 py-1.5 text-sm font-medium text-bg-obsidian transition-colors duration-fast hover:bg-accent-electric/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Search
          </button>
        )}
      </div>

      <fieldset className="flex flex-wrap items-center gap-2" aria-describedby={fieldsetId}>
        <legend
          id={fieldsetId}
          className="mr-2 text-[11px] uppercase tracking-[0.18em] text-ink-tertiary"
        >
          Jurisdictions
        </legend>
        {jurisdictions.map((j) => {
          const active = selected.has(j);
          return (
            <label
              key={j}
              className={[
                "inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-fast",
                active
                  ? "border-accent-electric/60 bg-accent-electric/15 text-ink-primary"
                  : "border-hairline bg-surface-1/40 text-ink-secondary hover:text-ink-primary",
              ].join(" ")}
            >
              <input
                type="checkbox"
                checked={active}
                onChange={() => toggle(j)}
                className="sr-only"
              />
              {j}
            </label>
          );
        })}
      </fieldset>
    </form>
  );
}
