import { describe, expect, it } from "vitest";
import { mockAIService } from "./mock";
import { AIResponseSchema, SearchPayloadSchema } from "@/shared/contracts/ai";

const Envelope = AIResponseSchema(SearchPayloadSchema);

describe("mockAIService.search", () => {
  it("returns an envelope that satisfies the AIResponse<SearchPayload> schema", async () => {
    const res = await mockAIService.search({
      query: "fair use in generative AI",
      jurisdictions: ["US", "EU"],
      topics: ["copyright"],
    });
    expect(Envelope.safeParse(res).success).toBe(true);
    expect(res.status).toBe("complete");
    expect(res.disclaimer.length).toBeGreaterThan(0);
    expect(res.data.summary).toContain("fair use in generative AI");
    expect(res.data.precedents.length).toBeGreaterThan(0);
  });

  it("rejects an empty query at the contract boundary", async () => {
    await expect(
      mockAIService.search({ query: "", jurisdictions: [], topics: [] }),
    ).rejects.toThrow();
  });
});

describe("mockAIService.searchStream", () => {
  it("yields streaming frames culminating in a complete frame", async () => {
    const frames: string[] = [];
    for await (const frame of mockAIService.searchStream({
      query: "trademark dilution",
      jurisdictions: ["IN"],
      topics: [],
    })) {
      expect(Envelope.safeParse(frame).success).toBe(true);
      frames.push(frame.status);
    }
    expect(frames[frames.length - 1]).toBe("complete");
    expect(frames.filter((s) => s === "streaming").length).toBeGreaterThanOrEqual(1);
  });

  it("aborts when the signal is triggered", async () => {
    const controller = new AbortController();
    controller.abort();
    await expect(
      mockAIService.search(
        { query: "anything", jurisdictions: [], topics: [] },
        { signal: controller.signal },
      ),
    ).rejects.toMatchObject({ code: "aborted" });
  });
});
