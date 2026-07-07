import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { Globe2, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Search", to: "/search" },
  { label: "Theory", to: "/theory" },
  { label: "Maps", to: "/maps" },
  { label: "Compare", to: "/#compare" },
  { label: "Workspace", to: "/#workspace" },
] as const;

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled || undefined}
      className="sticky top-0 z-40 border-b border-transparent transition-colors duration-base data-[scrolled]:border-hairline data-[scrolled]:bg-bg-obsidian/70 data-[scrolled]:backdrop-blur-glass"
    >
      <div className="container flex h-16 items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2.5" aria-label="Novatrix IP — home">
          <span className="grid h-8 w-8 place-items-center rounded-md border border-hairline bg-surface-1">
            <Globe2 className="h-4 w-4 text-accent-electric" strokeWidth={1.5} aria-hidden="true" />
          </span>
          <span className="font-display text-lg font-medium tracking-tight">Novatrix IP</span>
        </NavLink>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.label} to={item.to}>
              {item.label}
            </NavItem>
          ))}
          <NavLink
            to="/search"
            className="rounded-md border border-hairline bg-surface-1/60 px-3.5 py-1.5 text-sm text-ink-primary transition-colors duration-fast hover:bg-surface-1"
          >
            Launch
          </NavLink>
        </nav>

        <button
          type="button"
          className="grid h-9 w-9 place-items-center rounded-md border border-hairline bg-surface-1/60 text-ink-primary md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X className="h-4 w-4" strokeWidth={1.75} />
          ) : (
            <Menu className="h-4 w-4" strokeWidth={1.75} />
          )}
        </button>
      </div>

      {open && (
        <div className="border-t border-hairline bg-bg-obsidian/95 backdrop-blur-glass md:hidden">
          <nav aria-label="Mobile" className="container flex flex-col gap-1 py-3">
            {NAV_ITEMS.map((item) => (
              <NavItem
                key={item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-sm"
              >
                {item.label}
              </NavItem>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

interface NavItemProps {
  to: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

function NavItem({ to, className, onClick, children }: NavItemProps) {
  const base = "text-sm text-ink-secondary transition-colors duration-fast hover:text-ink-primary";
  const cls = [base, className].filter(Boolean).join(" ");

  // Hash-fragment links remain plain anchors so the browser handles scrolling.
  if (to.startsWith("/#")) {
    return (
      <a href={to} className={cls} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        [cls, isActive ? "text-ink-primary" : ""].filter(Boolean).join(" ")
      }
    >
      {children}
    </NavLink>
  );
}
