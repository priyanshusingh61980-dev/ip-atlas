import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Motion } from "./Motion";

describe("Motion", () => {
  it("renders its children", () => {
    render(
      <Motion>
        <p>hello atlas</p>
      </Motion>,
    );
    expect(screen.getByText("hello atlas")).toBeInTheDocument();
  });

  it("supports each variant name without throwing", () => {
    for (const variant of ["rise", "fade", "scale"] as const) {
      render(
        <Motion variant={variant}>
          <span>{variant}</span>
        </Motion>,
      );
      expect(screen.getByText(variant)).toBeInTheDocument();
    }
  });

  it("honors the reducedMotion override", () => {
    render(
      <Motion reducedMotion variant="rise">
        <p>quiet</p>
      </Motion>,
    );
    expect(screen.getByText("quiet")).toBeInTheDocument();
  });
});
