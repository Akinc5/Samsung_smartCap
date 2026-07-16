// ─────────────────────────────────────────────────────────────
// Coach Agent — client-side Gemini wrapper (no backend proxy).
//
// VITE_-prefixed env vars are baked into the client bundle at build time, so this
// key is visible in the shipped JS via devtools — the same known tradeoff as the
// Kiri Engine key (see KiriScanner.jsx). Skipping a backend proxy here is a
// deliberate scope tradeoff for a 5-day capstone, not an oversight — see
// CLAUDE.md's Planned Architecture note before adding one without asking.
//
// When VITE_GEMINI_API_KEY is unset, every exported function below falls back to
// a deterministic mock/stub instead of making a network call, so build/dev/verify
// all work with zero live calls or billing until a real key is supplied at deploy.
// ─────────────────────────────────────────────────────────────

import { checkShutoffGuard } from './guardrail';
import type { KnowledgeChunk } from '../data/knowledgeBase';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL = 'gemini-2.5-flash';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const TIMEOUT_MS = 12000;

// Single standardized outcome shape for every call site. `didFail` is true
// ONLY when a live call was actually attempted (a key is configured) and
// failed for any reason — network error, non-2xx status, timeout, or an
// empty/blocked response. It is deliberately false when no key is configured
// at all (that's expected mock mode, not a failure) so callers can tell "no
// key" apart from "key configured but this call didn't work" and only show a
// user-facing notice for the latter. This function never throws — every
// failure mode funnels into the same `{ text: null, didFail: true }` result,
// so callers all fall back through the identical mock/generic code path
// instead of each needing their own error handling.
interface GeminiCallResult {
  text: string | null;
  didFail: boolean;
}

async function callGemini(prompt: string, useSearch: boolean): Promise<GeminiCallResult> {
  if (!API_KEY) return { text: null, didFail: false }; // expected mock mode

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        ...(useSearch ? { tools: [{ google_search: {} }] } : {}),
        generationConfig: { temperature: 0.3 },
      }),
      signal: controller.signal,
    });

    if (!res.ok) return { text: null, didFail: true };

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
    return { text, didFail: text === null }; // empty/safety-blocked response counts as a failure too
  } catch (err) {
    console.error('Coach Agent call failed:', err); // network error or timeout abort
    return { text: null, didFail: true };
  } finally {
    clearTimeout(timeoutId);
  }
}

function parseJson<T>(text: string | null): T | null {
  if (!text) return null;
  const stripped = text.trim().replace(/^```json\s*/i, '').replace(/^```\s*/, '').replace(/```$/, '');
  try {
    return JSON.parse(stripped) as T;
  } catch {
    return null;
  }
}

// ── Product-lookup mode (web search enabled) ──────────────────

export interface ProductLookupResult {
  status: 'specific' | 'generic';
  matchedProductName: string | null;
  category: string;
  estimatedWattsLow: number;
  estimatedWattsHigh: number;
  typicalUsagePattern: string;
  /** True only when a live call was attempted and failed — false in mock mode too. */
  liveCallFailed: boolean;
}

interface CategoryGuess {
  keywords: string[];
  category: string;
  wattsLow: number;
  wattsHigh: number;
}

const CATEGORY_KEYWORDS: CategoryGuess[] = [
  { keywords: ['fan', 'exhaust'], category: 'fan', wattsLow: 40, wattsHigh: 90 },
  { keywords: ['heater', 'geyser', 'boiler'], category: 'water/space heater', wattsLow: 1500, wattsHigh: 3000 },
  { keywords: ['cooler', 'ac', 'air conditioner', 'conditioner'], category: 'cooling appliance', wattsLow: 800, wattsHigh: 1800 },
  { keywords: ['fridge', 'refrigerator'], category: 'refrigerator', wattsLow: 100, wattsHigh: 250 },
  { keywords: ['light', 'lamp', 'bulb', 'led'], category: 'lighting', wattsLow: 5, wattsHigh: 60 },
  { keywords: ['tv', 'television'], category: 'television', wattsLow: 60, wattsHigh: 200 },
  { keywords: ['washer', 'washing', 'laundry'], category: 'washing machine', wattsLow: 500, wattsHigh: 2500 },
  { keywords: ['oven', 'microwave'], category: 'kitchen appliance', wattsLow: 800, wattsHigh: 1500 },
  { keywords: ['router', 'modem', 'wifi'], category: 'networking device', wattsLow: 5, wattsHigh: 20 },
];

function guessCategory(name: string): Omit<CategoryGuess, 'keywords'> {
  const lower = name.toLowerCase();
  const match = CATEGORY_KEYWORDS.find((c) => c.keywords.some((k) => lower.includes(k)));
  return match
    ? { category: match.category, wattsLow: match.wattsLow, wattsHigh: match.wattsHigh }
    : { category: 'small appliance', wattsLow: 20, wattsHigh: 150 };
}

export async function lookupProduct(name: string, notes?: string): Promise<ProductLookupResult> {
  const prompt = `You are the Coach Agent for SmartCap, a home energy dashboard. A user is adding
a new appliance card named: "${name}"${notes ? ` (notes: ${notes})` : ''}.

Search for this specific product's published power specifications (wattage, typical usage
pattern). Respond with ONLY valid JSON, no markdown fences, matching this schema:

{
  "status": "specific" | "generic",
  "matchedProductName": string | null,
  "category": string,
  "estimatedWattsLow": number,
  "estimatedWattsHigh": number,
  "typicalUsagePattern": string
}

Rules:
- If you find a specific, unambiguous product matching the name, set status "specific",
  matchedProductName to the exact product you found, and base the wattage range on its
  published specs.
- If you find MULTIPLE plausible/ambiguous matches, or NOTHING specific, set status "generic",
  matchedProductName null, and give typical wattage/usage for the general appliance category
  instead.
- Never state or imply full shutoff of an AC or refrigerator as usage guidance.
- Do not fabricate a specific product's specs if you are not confident you found it — prefer
  "generic" over a guess.`;

  const { text, didFail } = await callGemini(prompt, true);
  const parsed = parseJson<Omit<ProductLookupResult, 'liveCallFailed'>>(text);
  if (parsed) return { ...parsed, liveCallFailed: false };

  // Mock mode (no key), a real call failure, or a malformed response all land
  // here — resolve honestly as "generic, nothing found" rather than guessing.
  // `didFail` distinguishes "no key configured" (false, expected, silent) from
  // "key configured but this call didn't produce usable JSON" (true — the
  // caller shows a small non-blocking notice for this case, not the former).
  const guess = guessCategory(name);
  return {
    status: 'generic',
    matchedProductName: null,
    category: guess.category,
    estimatedWattsLow: guess.wattsLow,
    estimatedWattsHigh: guess.wattsHigh,
    typicalUsagePattern: 'No specific usage pattern available — estimate based on category only.',
    liveCallFailed: didFail || (text !== null), // text!==null but parseJson failed => malformed response
  };
}

// ── Setup mode (no search) — generates 1-2 rules for a NEW card only.
// Never used to regenerate the 5 real, hardened measured automations. ──────────

export interface GeneratedAutomation {
  name: string;
  desc: string;
  why: string;
  evidence: string;
  tradeoff: string;
  savingVal: string;
}

function mockAutomation(applianceName: string, spec: ProductLookupResult): GeneratedAutomation {
  return {
    name: `Monitor ${applianceName} usage`,
    desc: `Tracks ${applianceName}'s draw against its estimated ${spec.estimatedWattsLow}-${spec.estimatedWattsHigh}W range to flag unusual spikes.`,
    why: 'No measured usage history exists yet for this card — monitoring builds a baseline before suggesting a schedule change.',
    evidence: `Estimated ${spec.estimatedWattsLow}-${spec.estimatedWattsHigh}W range (${spec.category} category).`,
    tradeoff: 'Alert only — not a scheduling or savings action yet.',
    savingVal: 'N/A — monitoring only, no measured usage yet',
  };
}

export interface GenerateAutomationsResult {
  automations: GeneratedAutomation[];
  /** True only when a live call was attempted and failed — false in mock mode too. */
  liveCallFailed: boolean;
}

export async function generateAutomations(spec: ProductLookupResult, applianceName: string): Promise<GenerateAutomationsResult> {
  const confidenceNote = spec.status === 'specific'
    ? `based on published specs for ${spec.matchedProductName}`
    : 'generic category guidance, no specific product found';

  const prompt = `You are the Coach Agent for SmartCap. Generate 1-2 energy-saving automation
suggestions for this appliance card:

Name: ${applianceName}
Category: ${spec.category}
Estimated wattage: ${spec.estimatedWattsLow}-${spec.estimatedWattsHigh}W
Usage pattern: ${spec.typicalUsagePattern}
Data confidence: ${confidenceNote}

Respond with ONLY valid JSON, an array of 1-2 objects matching this schema:
[{
  "name": string,
  "desc": string,
  "why": string,
  "evidence": string,
  "tradeoff": string,
  "savingVal": string
}]

Rules:
- Never propose fully shutting off an air conditioner or refrigerator — mode/schedule changes
  only.
- Do not invent a specific kWh/₹ savings number you cannot justify from the wattage/usage
  pattern above — describe the mechanism (e.g. "reduces peak overlap") rather than a fabricated
  ₹ figure.
- Do not include a "confidence" field — the app sets that separately.`;

  const { text, didFail } = await callGemini(prompt, false);
  const parsed = parseJson<GeneratedAutomation[]>(text);
  const gotUsableParse = parsed && Array.isArray(parsed) && parsed.length > 0;
  const candidates = gotUsableParse ? parsed! : [mockAutomation(applianceName, spec)];
  const liveCallFailed = didFail || (text !== null && !gotUsableParse);

  // Guardrail-check every candidate at runtime; drop violations rather than throw —
  // a bad generated rule must not crash a live user session.
  const safe = candidates.filter(
    (a) => checkShutoffGuard([a.name, a.why, a.evidence, a.tradeoff, a.savingVal, a.desc]).passed
  );
  return {
    automations: safe.length > 0 ? safe.slice(0, 2) : [mockAutomation(applianceName, spec)],
    liveCallFailed,
  };
}

// ── Chatbot mode (no search) — final-answer synthesis from live context ────────

export async function chatbotSynthesize(userQuery: string, liveChunks: KnowledgeChunk[]): Promise<string | null> {
  const contextBlock = liveChunks.map((c) => `- ${c.title}: ${c.content}`).join('\n');

  const prompt = `You are Galaxy.AI, SmartCap's in-app energy assistant. Answer the user's
question using ONLY the context below — do not use outside knowledge, do not invent numbers.

Context (live data currently in the deck):
${contextBlock}

User question: ${userQuery}

Rules:
- Keep the answer conversational, under ~120 words.
- Every number you state must come from the context above — never invent kWh/₹/watt figures
  not present there.
- If the context doesn't actually answer the question, say so plainly rather than guessing.
- Never suggest fully turning off an AC or refrigerator.`;

  // Reference pattern for the other two modes: null covers both "no key" and
  // "call failed" — the caller (Chatbot.tsx) already treats null as "fall back
  // to the local template answer" either way, silently, with no distinction
  // needed here since there's no prior state to preserve or notice to show.
  const { text } = await callGemini(prompt, false);
  return text;
}
