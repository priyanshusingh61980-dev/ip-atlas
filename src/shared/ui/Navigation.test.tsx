import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Navigation } from "./Navigation";

function renderNav() {
  return render(
    <MemoryRouter>
      <Navigation />
    </MemoryRouter>,
  );
}

describe("Navigation", () => {
  it("renders the brand and primary nav links", () => {
    renderNav();
    expect(screen.getByLabelText(/Novatrix IP — home/i)).toBeInTheDocument();
    const primary = screen.getByRole("navigation", { name: /primary/i });
    expect(primary).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^Search$/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^Compare$/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^Workspace$/ })).toBeInTheDocument();
  });

  it("exposes a mobile menu toggle with accessible name", () => {
    renderNav();
    expect(screen.getByRole("button", { name: /open menu/i })).toBeInTheDocument();
  });
});
