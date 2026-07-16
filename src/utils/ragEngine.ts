// ─────────────────────────────────────────────────────────────
// SmartCap RAG Engine
//
// Pipeline:
//   1. Tokenise query (lowercase, strip punctuation, remove stopwords)
//   2. Score every knowledge chunk via TF-IDF-inspired Jaccard + keyword boost
//   3. Guardrail Layer 1  — domain vocabulary check (fast reject)
//   4. Guardrail Layer 2  — relevance threshold check (soft reject)
//   5. Synthesise an answer from the top-K retrieved chunks
// ─────────────────────────────────────────────────────────────

import { knowledgeBase, KnowledgeChunk } from '../data/knowledgeBase';

// ── Constants ──────────────────────────────────────────────
const TOP_K = 3;
const RELEVANCE_THRESHOLD = 0.018; // below this → off-topic refusal

// ── Stopwords ─────────────────────────────────────────────
const STOPWORDS = new Set([
  'a', 'an', 'the', 'is', 'it', 'in', 'on', 'at', 'to', 'for', 'of',
  'and', 'or', 'but', 'with', 'my', 'i', 'me', 'can', 'do', 'does',
  'how', 'what', 'why', 'when', 'where', 'which', 'who', 'that', 'this',
  'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
  'will', 'would', 'could', 'should', 'may', 'might', 'shall', 'do',
  'did', 'about', 'up', 'out', 'if', 'its', 'than', 'then', 'so', 'as',
  'not', 'no', 'by', 'from', 'any', 'all', 'more', 'some', 'also',
  'just', 'get', 'tell', 'show', 'give', 'please', 'thanks', 'ok',
]);

// ── Domain vocabulary for Guardrail Layer 1 ──────────────
const DOMAIN_VOCAB = new Set([
  // energy & power
  'energy', 'power', 'electricity', 'electric', 'watt', 'watts', 'kwh',
  'consumption', 'usage', 'bill', 'cost', 'monthly', 'daily', 'save',
  'saving', 'savings', 'carbon', 'co2', 'emission', 'footprint',
  // app & brand
  'smartcap', 'samsung', 'smartthings', 'app', 'dashboard', 'screen', 'page',
  // appliances
  'appliance', 'appliances', 'device', 'devices', 'connected', 'ac',
  'air', 'conditioner', 'conditioning', 'heater', 'water', 'geyser',
  'washer', 'washing', 'machine', 'fridge', 'refrigerator', 'freezer',
  'tv', 'television', 'qled', 'lights', 'lighting', 'led', 'bulb',
  'bespoke', 'windfree', 'neo',
  // controls
  'toggle', 'turn', 'on', 'off', 'switch', 'control', 'enable', 'disable',
  'start', 'stop', 'activate', 'deactivate',
  // features
  'automation', 'automations', 'automatic', 'schedule', 'night', 'mode',
  'dark', 'light', '3d', 'home', 'model', 'room', 'apartment', 'view',
  'rank', 'rewards', 'reward', 'xp', 'experience', 'points', 'level',
  'achievement', 'achievements', 'upgrade', 'eco', 'champion',
  'insight', 'insights', 'recommendation', 'tip',
  // navigation
  'navigate', 'navigation', 'tab', 'tabs', 'menu', 'bottom', 'bar',
  // data
  'temperature', 'voltage', 'runtime', 'efficiency', 'star', 'rating',
  'today', 'week', 'solar', 'peak', 'standby', 'idle', 'upload', 'model',
  // chatbot
  'chatbot', 'bot', 'assistant', 'help', 'answer', 'question',
]);

// ── Utility: tokenise ─────────────────────────────────────
function tokenise(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

// ── Scoring: Jaccard + keyword boost ─────────────────────
function scoreChunk(queryTokens: string[], chunk: KnowledgeChunk): number {
  const qSet = new Set(queryTokens);
  const cSet = new Set(tokenise(chunk.content));
  const kSet = new Set(chunk.keywords);

  // Jaccard similarity between query and chunk content
  const intersection = [...qSet].filter((t) => cSet.has(t)).length;
  const union = new Set([...qSet, ...cSet]).size;
  const jaccard = union > 0 ? intersection / union : 0;

  // Keyword hits (direct match against curated keyword list)
  const keywordHits = [...qSet].filter((t) => kSet.has(t)).length;
  const keywordBoost = keywordHits * 0.12;

  // Title match bonus
  const titleTokens = new Set(tokenise(chunk.title));
  const titleHits = [...qSet].filter((t) => titleTokens.has(t)).length;
  const titleBoost = titleHits * 0.08;

  return jaccard + keywordBoost + titleBoost;
}

// ── Off-topic refusal pool ────────────────────────────────
const REFUSALS = [
  "I'm Chammak — I can only help with questions about the SmartCap app, like managing appliances, energy usage, automations, or the 3D home view. Try asking me something like \"How do I save money on my energy bill?\"",
  "That's outside my area! I'm specialised in SmartCap — things like your energy dashboard, appliance controls, XP rewards, or 3D home features. What would you like to know about those?",
  "Hmm, that doesn't seem to be about SmartCap. I can answer questions about your connected appliances, automations, energy rank, or how to use the app. Give one of those a try!",
  "I'm built specifically to assist with SmartCap features. For general questions, a general-purpose assistant would serve you better. Ask me about your energy usage, appliances, or 3D home — I'll know!",
];

// ── Response synthesis ────────────────────────────────────
// Combines the content of the top-K chunks into a coherent reply.
function synthesise(query: string, chunks: KnowledgeChunk[]): string {
  if (chunks.length === 0) return REFUSALS[0];

  const primary = chunks[0];
  const secondary = chunks.slice(1).filter((c) => c.id !== primary.id);

  // Build the base answer from primary chunk content
  let answer = primary.content;

  // Append supplementary info from secondary chunks if they add unique value
  if (secondary.length > 0 && secondary[0].topic !== primary.topic) {
    answer += `\n\n${secondary[0].content}`;
  }

  // Add a follow-up hint if there's a clearly related chunk
  const queryLower = query.toLowerCase();
  if (queryLower.includes('save') || queryLower.includes('money') || queryLower.includes('cost')) {
    const faqSave = knowledgeBase.find((c) => c.id === 'faq_save_money');
    if (faqSave && !chunks.find((c) => c.id === 'faq_save_money')) {
      answer += '\n\n💡 Tip: ' + faqSave.content;
    }
  }

  return answer.trim();
}

// ── Public API ────────────────────────────────────────────
export interface RAGResult {
  answer: string;
  sources: KnowledgeChunk[];
  confidence: number;
  isOffTopic: boolean;
}

export function ragQuery(userQuery: string): RAGResult {
  const queryTokens = tokenise(userQuery);

  // ── Guardrail Layer 1: Domain vocabulary check ───────
  const domainHits = queryTokens.filter((t) => DOMAIN_VOCAB.has(t)).length;
  if (queryTokens.length > 0 && domainHits === 0) {
    return {
      answer: REFUSALS[Math.floor(Math.random() * REFUSALS.length)],
      sources: [],
      confidence: 0,
      isOffTopic: true,
    };
  }

  // ── Retrieve: score all chunks ────────────────────────
  const scored = knowledgeBase
    .map((chunk) => ({ chunk, score: scoreChunk(queryTokens, chunk) }))
    .sort((a, b) => b.score - a.score);

  const topChunks = scored.slice(0, TOP_K);
  const maxScore = topChunks[0]?.score ?? 0;

  // ── Guardrail Layer 2: Relevance threshold ───────────
  if (maxScore < RELEVANCE_THRESHOLD) {
    return {
      answer: REFUSALS[Math.floor(Math.random() * REFUSALS.length)],
      sources: [],
      confidence: maxScore,
      isOffTopic: true,
    };
  }

  const relevantChunks = topChunks.filter((t) => t.score > 0).map((t) => t.chunk);
  const answer = synthesise(userQuery, relevantChunks);

  return {
    answer,
    sources: relevantChunks,
    confidence: maxScore,
    isOffTopic: false,
  };
}
