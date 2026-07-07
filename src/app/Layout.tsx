import { Outlet } from "react-router-dom";
import { Navigation } from "@/shared/ui/Navigation";
import { Footer } from "@/shared/ui/Footer";

export function Layout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-bg-obsidian text-ink-primary">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent-electric focus:px-3 focus:py-1.5 focus:text-sm focus:text-bg-obsidian"
      >
        Skip to content
      </a>
      <Navigation />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
