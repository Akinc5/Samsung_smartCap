// Hard rule (CLAUDE.md): no automation/agent output may propose full shutoff of the
// AC or refrigerator (heat-safety constraint — India, 40°C+ summers). Mode/setpoint
// changes only. Generalized so it's callable at runtime against dynamically
// generated content (Coach Agent output, chatbot answers), not just the static
// automations array at module-load time.
// Device word must appear immediately after the shutoff verb (not `.*` — an
// unbounded span let "not a shutoff" in one field falsely match an unrelated
// "AC" appearing many words later, once savingVal/desc joined the concatenated
// check string and could carry the match across what used to be field boundaries).
export const FULL_SHUTOFF_PATTERNS = [
  /(turn|switch) off (the )?(ac|air conditioner|refrigerator|fridge)\b/i,
  /shut ?off\s+(the\s+)?(ac|air conditioner|refrigerator|fridge)\b/i,
  /disable\s+(the\s+)?(ac|air conditioner|refrigerator|fridge)\b/i,
];

export interface GuardrailResult {
  passed: boolean;
  matchedText?: string;
}

export function checkShutoffGuard(fields: (string | undefined)[]): GuardrailResult {
  const text = fields.filter(Boolean).join(' ');
  const violated = FULL_SHUTOFF_PATTERNS.some((pattern) => pattern.test(text));
  return violated ? { passed: false, matchedText: text } : { passed: true };
}
