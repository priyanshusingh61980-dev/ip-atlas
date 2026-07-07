import type { Jurisdiction } from "@/shared/design/tokens";

export interface MapTopic {
  id: string;
  label: string;
  eyebrow: string;
  description: string;
  /** Jurisdictions emphasized for this topic. */
  highlight: Jurisdiction[];
  /** Relative intensity per jurisdiction (heatmap). Values in [0, 1]. */
  intensity: Partial<Record<Jurisdiction, number>>;
  /** Notable doctrines or instruments per jurisdiction. */
  notes: Array<{ jurisdiction: Jurisdiction; note: string }>;
}

export const TOPICS: MapTopic[] = [
  {
    id: "copyright",
    label: "Copyright regimes",
    eyebrow: "Doctrine",
    description:
      "Authorship, exhaustion, fair use vs fair dealing, and the doctrinal centre of gravity across the eight jurisdictions Novatrix IP tracks.",
    highlight: ["US", "UK", "EU", "IN", "SG", "JP", "AE", "TH"],
    intensity: { US: 1, EU: 0.95, UK: 0.85, IN: 0.7, JP: 0.75, SG: 0.6, AE: 0.4, TH: 0.45 },
    notes: [
      { jurisdiction: "US", note: "Fair use (§107) — four-factor test, Authors Guild v. Google." },
      { jurisdiction: "EU", note: "InfoSoc Directive — narrow exceptions, no general fair use." },
      { jurisdiction: "UK", note: "CDPA 1988 — fair dealing for criticism, review, news, parody." },
      {
        jurisdiction: "IN",
        note: "Copyright Act 1957 §52 — fair dealing; R.G. Anand v. Delux Films.",
      },
      {
        jurisdiction: "JP",
        note: "Article 30-4 — flexible exception for data analysis, including AI training.",
      },
    ],
  },
  {
    id: "ai-regulation",
    label: "AI regulation",
    eyebrow: "Statutes",
    description:
      "Where binding AI rules already apply, where they're imminent, and where the doctrine is still being written.",
    highlight: ["EU", "UK", "US", "SG", "JP", "IN", "AE"],
    intensity: { EU: 1, UK: 0.7, US: 0.65, SG: 0.55, JP: 0.5, IN: 0.45, AE: 0.4, TH: 0.2 },
    notes: [
      { jurisdiction: "EU", note: "EU AI Act — risk-tiered obligations; in force from 2024." },
      { jurisdiction: "US", note: "EO 14110 (rescinded); state-level (CO AI Act, NYC LL 144)." },
      {
        jurisdiction: "UK",
        note: "Pro-innovation, sector-led framework; AI bill consultations ongoing.",
      },
      {
        jurisdiction: "SG",
        note: "Model AI Governance Framework v2; Generative AI companion guide.",
      },
      { jurisdiction: "JP", note: "Soft-law AI guidelines; emphasis on guidelines over hard law." },
      { jurisdiction: "AE", note: "National AI Strategy 2031; UAE Charter for AI Development." },
    ],
  },
  {
    id: "trademark",
    label: "Trademark systems",
    eyebrow: "Registration",
    description:
      "Madrid system reach, first-to-file vs first-to-use, and the practical contours of enforcement across the index.",
    highlight: ["US", "EU", "UK", "IN", "SG", "JP", "AE", "TH"],
    intensity: { US: 0.9, EU: 1, UK: 0.85, IN: 0.75, JP: 0.7, SG: 0.65, AE: 0.55, TH: 0.5 },
    notes: [
      { jurisdiction: "US", note: "First-to-use; Lanham Act §43(a) — unfair competition." },
      { jurisdiction: "EU", note: "EUTM via EUIPO — unitary right across all member states." },
      {
        jurisdiction: "IN",
        note: "Trade Marks Act 1999; well-known marks doctrine well-developed.",
      },
      { jurisdiction: "JP", note: "First-to-file; JPO opposition window narrow but rigorous." },
    ],
  },
  {
    id: "ai-disputes",
    label: "AI litigation hotspots",
    eyebrow: "Risk",
    description:
      "Where generative-AI disputes are concentrating — by volume, by doctrinal stakes, by speed of judicial development.",
    highlight: ["US", "UK", "EU", "IN"],
    intensity: { US: 1, UK: 0.7, EU: 0.65, IN: 0.45, JP: 0.25, SG: 0.2, AE: 0.1, TH: 0.1 },
    notes: [
      {
        jurisdiction: "US",
        note: "Andersen v. Stability AI, NYT v. OpenAI, Authors Guild v. OpenAI.",
      },
      {
        jurisdiction: "UK",
        note: "Getty Images v. Stability AI — training-data infringement test case.",
      },
      { jurisdiction: "EU", note: "Robert Kneschke v. LAION — TDM exception scope." },
      { jurisdiction: "IN", note: "ANI v. OpenAI (Delhi HC) — training-data dispute." },
    ],
  },
];
