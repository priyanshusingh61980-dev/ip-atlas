import { describe, expect, it } from "vitest";
import { openaiAIService } from "./openai";
import {
  AIResponseSchema,
  SearchPayloadSchema,
  TheoryPayloadSchema,
} from "@/shared/contracts/ai";

const SearchEnvelope = AIResponseSchema(SearchPayloadSchema);
const TheoryEnvelope = AIResponseSchema(TheoryPayloadSchema);

describe("openaiAIService (stub)", () => {
  it("search() returns a schema-valid envelope tagged with the provider", async () => {
    const res = await openaiAIService.search({
      query: "fair use in generative AI",
      jurisdictions: ["US"],
      topics: ["copyright"],
    });
    expect(SearchEnvelope.safeParse(res).success).toBe(true);
    expect(res.id.startsWith("openai-stub:")).toBe(true);
    expect(res.status).toBe("complete");
  });

  it("searchStream() yields tagged frames ending in complete", async () => {
    const statuses: string[] = [];
    for await (const frame of openaiAIService.searchStream({
      query: "trademark dilution",
      jurisdictions: ["IN"],
      topics: [],
    })) {
      expect(SearchEnvelope.safeParse(frame).success).toBe(true);
      expect(frame.id.startsWith("openai-stub:")).toBe(true);
      statuses.push(frame.status);
    }
    expect(statuses[statuses.length - 1]).toBe("complete");
  });

  it("theory() returns a schema-valid envelope tagged with the provider", async () => {
    const res = await openaiAIService.theory({
      query: "fair use doctrine",
      depth: "intermediate",
    });
    expect(TheoryEnvelope.safeParse(res).success).toBe(true);
    expect(res.id.startsWith("openai-stub:")).toBe(true);
  });
});
