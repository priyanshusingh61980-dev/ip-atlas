interface SearchSkeletonProps {
  query: string;
}

export function SearchSkeleton({ query }: SearchSkeletonProps) {
  return (
    <div aria-busy="true" aria-live="polite" className="flex flex-col gap-8">
      <p className="text-[11px] uppercase tracking-[0.18em] text-ink-tertiary">
        Synthesising for{" "}
        <span className="normal-case text-ink-secondary">&ldquo;{query}&rdquo;</span>
      </p>
      <div className="space-y-3">
        <Bar widthClass="w-11/12" />
        <Bar widthClass="w-10/12" />
        <Bar widthClass="w-9/12" />
        <Bar widthClass="w-7/12" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 rounded-lg border border-hairline bg-surface-1/40">
            <div className="h-full w-full animate-pulse rounded-lg bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Bar({ widthClass }: { widthClass: string }) {
  return (
    <div className={`h-3 overflow-hidden rounded-full bg-surface-1/40 ${widthClass}`}>
      <div className="h-full w-full animate-pulse bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </div>
  );
}
