import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useAITheory } from "./useAITheory";
import type { TheoryDepth } from "@/shared/contracts/ai";

describe("useAITheory", () => {
  it("starts idle and resolves to success with depth-tagged payload", async () => {
    const { result } = renderHook(() => useAITheory());
    expect(result.current.state.status).toBe("idle");

    act(() => {
      result.current.submit({ query: "Why does copyright exist?", depth: "beginner" });
    });

    expect(result.current.state.status).toBe("loading");

    await waitFor(
      () => {
        expect(result.current.state.status).toBe("success");
      },
      { timeout: 2000 },
    );
    if (result.current.state.status === "success") {
      expect(result.current.state.response.data.depth).toBe("beginner" satisfies TheoryDepth);
      expect(result.current.state.response.data.thinkers.length).toBeGreaterThan(0);
      expect(result.current.state.response.disclaimer).toMatch(/not legal advice/i);
    }
  });

  it("resets to idle on reset()", async () => {
    const { result } = renderHook(() => useAITheory());
    act(() => {
      result.current.submit({ query: "x", depth: "advanced" });
    });
    await waitFor(
      () => {
        expect(result.current.state.status).toBe("success");
      },
      { timeout: 2000 },
    );

    act(() => {
      result.current.reset();
    });
    expect(result.current.state.status).toBe("idle");
  });
});
