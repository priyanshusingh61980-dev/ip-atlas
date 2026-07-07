import {
  AIResponseSchema,
  DEFAULT_DISCLAIMER,
  SearchPayloadSchema,
  SearchRequestSchema,
  TheoryPayloadSchema,
  TheoryRequestSchema,
  type AIResponse,
  type SearchPayload,
  type SearchRequest,
  type TheoryDepth,
  type TheoryPayload,
  type TheoryRequest,
} from "@/shared/contracts/ai";
import { AIServiceError, type AICallOptions, type AIService } from "./types";

const ResponseSchema = AIResponseSchema(SearchPayloadSchema);
const TheoryResponseSchema = AIResponseSchema(TheoryPayloadSchema);

/**
 * Deterministic mock AI service used until a real provider is wired.
 * Returns envelopes that pass schema validation so swap-in is trivial.
 */
class MockAIService implements AIService {
  async search(
    request: SearchRequest,
    options?: AICallOptions,
  ): Promise<AIResponse<SearchPayload>> {
    const parsed = SearchRequestSchema.parse(request);
    await wait(180, options?.signal);
    const envelope = buildEnvelope(parsed, "complete");
    // Validate to ensure mock stays contract-compliant.
    return ResponseSchema.parse(envelope) as AIResponse<SearchPayload>;
  }

  async *searchStream(
    request: SearchRequest,
    options?: AICallOptions,
  ): AsyncGenerator<AIResponse<SearchPayload>, void, void> {
    const parsed = SearchRequestSchema.parse(request);
    const final = buildEnvelope(parsed, "complete");

    // Emit two streaming frames with partial summary, then the complete frame.
    const fullSummary = final.data.summary;
    const partials = [
      fullSummary.slice(0, Math.ceil(fullSummary.length * 0.35)),
      fullSummary.slice(0, Math.ceil(fullSummary.length * 0.75)),
    ];

    for (const summary of partials) {
      await wait(120, options?.signal);
      yield ResponseSchema.parse({
        ...final,
        status: "streaming",
        data: { ...final.data, summary, precedents: [], timeline: [] },
      }) as AIResponse<SearchPayload>;
    }

    await wait(120, options?.signal);
    yield ResponseSchema.parse(final) as AIResponse<SearchPayload>;
  }

  async theory(
    request: TheoryRequest,
    options?: AICallOptions,
  ): Promise<AIResponse<TheoryPayload>> {
    const parsed = TheoryRequestSchema.parse(request);
    await wait(220, options?.signal);
    const envelope = buildTheoryEnvelope(parsed);
    return TheoryResponseSchema.parse(envelope) as AIResponse<TheoryPayload>;
  }
}

export const mockAIService: AIService = new MockAIService();

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

function buildEnvelope(
  req: SearchRequest,
  status: "streaming" | "complete",
): AIResponse<SearchPayload> {
  const jurisdictionLine =
    req.jurisdictions.length > 0 ? ` across ${req.jurisdictions.join(", ")}` : "";

  const summary =
    `Novatrix IP synthesized authorities${jurisdictionLine} relevant to "${req.query}". ` +
    `Comparative analysis surfaces convergent doctrine on protectable subject matter, ` +
    `exhaustion, and AI-era exceptions, with notable jurisdictional divergence in fair-use and ` +
    `transformative-use standards.`;

  return {
    id: `mock-${hash(req.query)}-${req.jurisdictions.join("") || "ALL"}`,
    status,
    disclaimer: DEFAULT_DISCLAIMER,
    jurisdiction: req.jurisdictions[0],
    citations: [
      {
        id: "c-001",
        title: "Authors Guild v. Google, Inc.",
        jurisdiction: "US",
        date: "2015",
        source: "https://www.courtlistener.com/opinion/2812572/authors-guild-v-google-inc/",
      } as never,
      {
        id: "c-002",
        title: "Andersen v. Stability AI Ltd.",
        jurisdiction: "US",
        date: "2023",
        source: "https://www.courtlistener.com/docket/66732129/andersen-v-stability-ai-ltd/",
      } as never,
      {
        id: "c-003",
        title: "Getty Images v. Stability AI",
        jurisdiction: "UK",
        date: "2024",
        source: "https://www.bailii.org/ew/cases/EWHC/Ch/2023/3090.html",
      } as never,
    ],
    data: {
      summary,
      precedents: [
        {
          id: "p-001",
          caption: "Campbell v. Acuff-Rose Music, Inc.",
          year: 1994,
          jurisdiction: "US",
          source: "https://supreme.justia.com/cases/federal/us/510/569/",
        },
        {
          id: "p-002",
          caption: "Infopaq International A/S v. Danske Dagblades Forening",
          year: 2009,
          jurisdiction: "EU",
          source: "https://curia.europa.eu/juris/liste.jsf?num=C-5/08",
        },
        {
          id: "p-003",
          caption: "R.G. Anand v. Delux Films",
          year: 1978,
          jurisdiction: "IN",
          source: "https://indiankanoon.org/doc/1734007/",
        },
      ],
      timeline: [
        { date: "1994", label: "Transformative-use doctrine articulated (Campbell)" },
        { date: "2015", label: "Mass-digitization fair use upheld (Authors Guild v. Google)" },
        { date: "2023", label: "First wave of generative-AI training suits filed" },
        { date: "2024", label: "EU AI Act enters into force" },
      ],
    },
  };
}

function buildTheoryEnvelope(req: TheoryRequest): AIResponse<TheoryPayload> {
  const facets = THEORY_BY_DEPTH[req.depth];
  return {
    id: `mock-theory-${hash(req.query)}-${req.depth}`,
    status: "complete",
    disclaimer: DEFAULT_DISCLAIMER,
    citations: facets.citations,
    data: {
      depth: req.depth,
      thesis: `${facets.eyebrow}: ${facets.thesis(req.query)}`,
      explanation: facets.explain(req.query),
      thinkers: facets.thinkers,
      furtherReading: facets.furtherReading,
    },
  };
}

interface TheoryFacet {
  eyebrow: string;
  thesis: (q: string) => string;
  explain: (q: string) => string;
  thinkers: TheoryPayload["thinkers"];
  furtherReading: TheoryPayload["furtherReading"];
  citations: AIResponse<unknown>["citations"];
}

const THEORY_BY_DEPTH: Record<TheoryDepth, TheoryFacet> = {
  beginner: {
    eyebrow: "Start here",
    thesis: (q) =>
      `"${q}" is a question about who gets to control ideas — and why the law decides to step in.`,
    explain: (q) =>
      `At the most basic level, "${q}" touches on a bargain society makes: creators get a limited monopoly so the rest of us get more ideas, faster. ` +
      `Think of it as a public deal — protection in exchange for eventual sharing. Different countries strike that bargain differently, which is why the same act can be legal in one place and forbidden in another.`,
    thinkers: [
      { name: "John Locke", era: "17th c.", contribution: "Labour-mixing theory of property." },
      {
        name: "Thomas Jefferson",
        era: "18th c.",
        contribution: "Skeptical, utilitarian view of patents.",
      },
    ],
    furtherReading: [
      {
        label: "Lawrence Lessig, Free Culture (2004) — accessible primer.",
        url: "https://www.free-culture.cc/freeculture.pdf",
      },
      {
        label: "WIPO, Understanding Copyright and Related Rights — free PDF.",
        url: "https://www.wipo.int/edocs/pubdocs/en/wipo_pub_909_2016.pdf",
      },
    ],
    citations: [],
  },
  intermediate: {
    eyebrow: "Doctrine in context",
    thesis: (q) =>
      `"${q}" sits at the intersection of incentive theory and natural-rights justifications for IP.`,
    explain: (q) =>
      `The doctrinal question behind "${q}" is whether to ground IP in utilitarian incentives (Anglo-American tradition) or in personality and moral rights (continental European tradition). ` +
      `That choice shapes everything downstream — duration, exceptions, transferability, and the contours of fair use vs fair dealing. Modern AI cases force courts to revisit which frame applies to non-human or assistive authorship.`,
    thinkers: [
      { name: "Friedrich Hegel", era: "19th c.", contribution: "Personality theory of property." },
      { name: "Wendy Gordon", era: "20th–21st c.", contribution: "Economic analysis of fair use." },
      {
        name: "James Boyle",
        era: "21st c.",
        contribution: "Public-domain and 'second enclosure' critique.",
      },
    ],
    furtherReading: [
      {
        label: "James Boyle, The Public Domain (2008).",
        url: "https://thepublicdomain.org/thepublicdomain1.pdf",
      },
      {
        label: "Wendy J. Gordon, 'Fair Use as Market Failure', 82 Colum. L. Rev. 1600 (1982).",
        url: "https://scholarship.law.bu.edu/faculty_scholarship/648/",
      },
      {
        label: "Peter Drahos, A Philosophy of Intellectual Property (1996).",
        url: "https://anupress.anu.edu.au/files/A_Philosophy_of_Intellectual_Property.pdf",
      },
    ],
    citations: [
      {
        id: "ct-001",
        title: "Campbell v. Acuff-Rose Music, Inc.",
        jurisdiction: "US",
        date: "1994",
        source: "https://supreme.justia.com/cases/federal/us/510/569/",
      },
    ],
  },
  advanced: {
    eyebrow: "Jurisprudential edge",
    thesis: (q) =>
      `"${q}" exposes the limits of any single justificatory frame — incentive, labour, or personality — once authorship itself becomes contested.`,
    explain: (q) =>
      `Advanced treatment of "${q}" reads contemporary IP doctrine as a layered compromise: Lockean intuitions about labour, Hegelian intuitions about expressive selfhood, and law-and-economics modelling of dynamic efficiency. ` +
      `Generative AI destabilises all three: there is no Lockean labour in the human sense, no Hegelian self extending into the work, and the incentive calculus shifts when training corpora externalise costs onto upstream authors. ` +
      `The cutting-edge literature — Sag, Lemley, Samuelson, Ginsburg — re-asks the foundational question: what is the unit of protection, and who is its bearer?`,
    thinkers: [
      {
        name: "Matthew Sag",
        era: "21st c.",
        contribution: "Non-expressive use and machine reading.",
      },
      {
        name: "Mark Lemley",
        era: "21st c.",
        contribution: "Generative-AI authorship and infringement.",
      },
      { name: "Jane Ginsburg", era: "21st c.", contribution: "Comparative authorship doctrine." },
      {
        name: "Pamela Samuelson",
        era: "20th–21st c.",
        contribution: "Software, fair use, and TDM exceptions.",
      },
    ],
    furtherReading: [
      {
        label: "Matthew Sag, 'Copyright Safety for Generative AI', 61 Hous. L. Rev. 295 (2023).",
        url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4438105",
      },
      {
        label: "Mark A. Lemley & Bryan Casey, 'Fair Learning', 99 Tex. L. Rev. 743 (2021).",
        url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3528447",
      },
      {
        label:
          "Jane C. Ginsburg, 'AI Authorship and the Originality Requirement' (2024 working paper).",
        url: "https://scholarship.law.columbia.edu/faculty_scholarship/",
      },
    ],
    citations: [
      {
        id: "ct-101",
        title: "Authors Guild v. Google, Inc.",
        jurisdiction: "US",
        date: "2015",
        source: "https://www.courtlistener.com/opinion/2812572/authors-guild-v-google-inc/",
      },
      {
        id: "ct-102",
        title: "Andersen v. Stability AI Ltd.",
        jurisdiction: "US",
        date: "2023",
        source: "https://www.courtlistener.com/docket/66732129/andersen-v-stability-ai-ltd/",
      },
      {
        id: "ct-103",
        title: "Getty Images v. Stability AI",
        jurisdiction: "UK",
        date: "2024",
        source: "https://www.bailii.org/ew/cases/EWHC/Ch/2023/3090.html",
      },
    ],
  },
};

function wait(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new AIServiceError("aborted", "Request aborted"));
      return;
    }
    const id = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    const onAbort = () => {
      clearTimeout(id);
      reject(new AIServiceError("aborted", "Request aborted"));
    };
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

function hash(input: string): string {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h).toString(36);
}
