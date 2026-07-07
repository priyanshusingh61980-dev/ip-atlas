import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useAISearch } from "./useAISearch";

describe("useAISearch", () => {
  it("starts in idle and transitions through streaming to success", async () => {
    const { result } = renderHook(() => useAISearch());
    expect(result.current.state.status).toBe("idle");

    act(() => {
      result.current.submit({
        query: "fair use and AI training",
        jurisdictions: ["US"],
        topics: [],
      });
    });

    // Loading or streaming immediately after submit
    await waitFor(() => {
      expect(["loading", "streaming"]).toContain(result.current.state.status);
    });

    // Eventually reaches success with a non-empty summary
    await waitFor(
      () => {
        expect(result.current.state.status).toBe("success");
      },
      { timeout: 2000 },
    );
    if (result.current.state.status === "success") {
      expect(result.current.state.response.data.summary.length).toBeGreaterThan(0);
      expect(result.current.state.response.disclaimer).toMatch(/not legal advice/i);
    }
  });

  it("returns to idle when cancelled mid-flight", async () => {
    const { result } = renderHook(() => useAISearch());

    act(() => {
      result.current.submit({ query: "anything", jurisdictions: [], topics: [] });
    });
    act(() => {
      result.current.cancel();
    });

    await waitFor(() => {
      expect(result.current.state.status).toBe("idle");
    });
  });

  it("reset returns to idle", async () => {
    const { result } = renderHook(() => useAISearch());
    act(() => {
      result.current.submit({ query: "x", jurisdictions: [], topics: [] });
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
