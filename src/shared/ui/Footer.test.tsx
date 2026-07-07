import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders the Novatrix IP brand, tagline, and copyright", () => {
    render(<Footer />);
    expect(screen.getByText("Novatrix IP")).toBeInTheDocument();
    expect(screen.getByText(/Global Legal Intelligence for the AI Era/i)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`© ${new Date().getFullYear()} Novatrix IP`)),
    ).toBeInTheDocument();
  });

  it("renders the three nav column headings and sample links", () => {
    render(<Footer />);
    expect(screen.getByRole("heading", { name: /intelligence/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /practice/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /platform/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^AI Search$/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^Workspace$/ })).toBeInTheDocument();
  });

  it("renders the non-removable demo disclaimer band", () => {
    render(<Footer />);
    expect(
      screen.getByText(/Demonstration content\. Not legal advice\./i),
    ).toBeInTheDocument();
  });
});
