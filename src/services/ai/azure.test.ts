import { describe, expect, it } from "vitest";
import { azureAIService } from "./azure";
import {
  AIResponseSchema,
  SearchPayloadSchema,
  TheoryPayloadSchema,
} from "@/shared/contracts/ai";

const SearchEnvelope = AIResponseSchema(SearchPayloadSchema);
const TheoryEnvelope = AIResponseSchema(TheoryPayloadSchema);

describe("azureAIService (stub)", () => {
  it("search() returns a schema-valid envelope tagged with the provider", async () => {
    const res = await azureAIService.search({
      query: "patent eligibility for AI inventions",
      jurisdictions: ["EU", "UK"],
      topics: ["patent"],
    });
    expect(SearchEnvelope.safeParse(res).success).toBe(true);
    expect(res.id.startsWith("azure-stub:")).toBe(true);
    expect(res.status).toBe("complete");
  });

  it("searchStream() yields tagged frames ending in complete", async () => {
    const statuses: string[] = [];
    for await (const frame of azureAIService.searchStream({
      query: "design rights",
      jurisdictions: ["SG"],
      topics: [],
    })) {
      expect(SearchEnvelope.safeParse(frame).success).toBe(true);
      expect(frame.id.startsWith("azure-stub:")).toBe(true);
      statuses.push(frame.status);
    }
    expect(statuses[statuses.length - 1]).toBe("complete");
  });

  it("theory() returns a schema-valid envelope tagged with the provider", async () => {
    const res = await azureAIService.theory({
      query: "moral rights",
      depth: "beginner",
    });
    expect(TheoryEnvelope.safeParse(res).success).toBe(true);
    expect(res.id.startsWith("azure-stub:")).toBe(true);
  });
});
