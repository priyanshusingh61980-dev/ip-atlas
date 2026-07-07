import { Globe2 } from "lucide-react";

const COLUMNS = [
  {
    title: "Intelligence",
    links: [
      { label: "AI Search", href: "/#search" },
      { label: "Comparative Law", href: "/#compare" },
      { label: "Case Law AI", href: "/#case" },
      { label: "Theory AI", href: "/#theory" },
    ],
  },
  {
    title: "Practice",
    links: [
      { label: "Trademark Drafts", href: "/#drafts" },
      { label: "Creator Economy", href: "/#creator" },
      { label: "Internships", href: "/#internships" },
      { label: "Analytics", href: "/#analytics" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "Workspace", href: "/#workspace" },
      { label: "Legal Maps", href: "/#maps" },
      { label: "Disclaimers", href: "/#disclaimer" },
      { label: "Status", href: "/#status" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-hairline bg-bg-graphite/40">
      <div className="container grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-md border border-hairline bg-surface-1">
              <Globe2
                className="h-4 w-4 text-accent-electric"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </span>
            <span className="font-display text-lg font-medium tracking-tight">Novatrix IP</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-ink-secondary">
            Global Legal Intelligence for the AI Era. Comparative, computational, and
            uncompromising.
          </p>
          <p className="mt-6 text-xs text-ink-tertiary">
            © {new Date().getFullYear()} Novatrix IP. Generated content is not legal advice.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h2 className="text-xs uppercase tracking-[0.18em] text-ink-tertiary">{col.title}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-ink-secondary transition-colors duration-fast hover:text-ink-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div id="disclaimer" className="border-t border-hairline bg-bg-obsidian/60">
        <p className="container py-4 text-center text-[11px] uppercase tracking-[0.18em] text-ink-tertiary">
          Demonstration content. Not legal advice. No attorney–client relationship.
        </p>
      </div>
    </footer>
  );
}
