// ─────────────────────────────────────────────────────────────
// Live knowledge builder — replaces the appliance/automation-fact chunks that
// used to live as static entries in src/data/knowledgeBase.ts. Regenerated from
// the current appliances/automations arrays on every chatbot query, so the
// chatbot never drifts out of sync with the real deck (including user-created
// cards) the way the old static file needed manual re-syncing to keep up with.
// ─────────────────────────────────────────────────────────────

import type { Appliance, Automation } from '../types';
import type { KnowledgeChunk } from '../data/knowledgeBase';

function parseLeadingNumber(text: string): number {
  const match = text.match(/-?\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : 0;
}

export function buildLiveChunks(appliances: Appliance[], automations: Automation[]): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [];

  // ── Per-appliance fact chunks ──────────────────────────────
  for (const app of appliances) {
    chunks.push({
      id: `live_appliance_${app.id}`,
      topic: 'appliance',
      title: app.name,
      content:
        `${app.name} (${app.ruleSource === 'measured' ? 'measured' : 'generic/estimated'} data) draws ` +
        `${app.baseWatts} W, has a ${app.efficiency}-star efficiency rating, and is currently ${app.status}. ` +
        `Today it has used ${app.todayKwh} kWh (${app.monthlyKwh} kWh/month, ${app.weeklyKwh} kWh/week), ` +
        `costing ₹${app.costMonthly}/month and producing ${app.carbon} CO₂/month (both placeholders pending ` +
        `real tariff/emissions data). It runs at ${app.voltage}. Recommendation: ${app.recommendation}` +
        (app.notes ? ` Notes: ${app.notes}.` : ''),
      keywords: [app.id, app.type.toLowerCase(), ...app.name.toLowerCase().split(/\s+/)],
    });
  }

  // ── Roster + efficiency chunks ──────────────────────────────
  chunks.push({
    id: 'live_appliances_list',
    topic: 'appliance',
    title: 'Connected Appliances List',
    content:
      `SmartCap currently monitors ${appliances.length} appliance${appliances.length === 1 ? '' : 's'}: ` +
      appliances.map((a) => `${a.name} (${a.baseWatts} W, ${a.efficiency}-star, ${a.ruleSource})`).join(', ') + '.',
    keywords: ['appliances', 'devices', 'connected', 'list', 'all', 'which', 'how many'],
  });

  chunks.push({
    id: 'live_appliance_efficiency',
    topic: 'appliance',
    title: 'Efficiency Star Rating',
    content:
      `Each appliance card shows a 1-5 star efficiency rating in the top-left corner. Current ratings: ` +
      appliances.map((a) => `${a.name} (${a.efficiency} stars)`).join(', ') + '.',
    keywords: ['efficiency', 'star', 'rating', 'stars', 'eco', 'energy', 'efficient', 'score'],
  });

  // ── Per-automation fact chunks ──────────────────────────────
  for (const auto of automations) {
    chunks.push({
      id: `live_automation_${auto.id}`,
      topic: 'automation',
      title: auto.name,
      content:
        `${auto.name} (${auto.ruleSource === 'measured' ? 'measured, from real usage data' : 'generic/estimated'}). ` +
        `Why: ${auto.why} Evidence: ${auto.evidence} Confidence: ${auto.confidence} Trade-off: ${auto.tradeoff} ` +
        `Estimated saving: ${auto.savingVal}. Currently ${auto.active ? 'active' : 'inactive'}.`,
      keywords: [auto.id, ...auto.name.toLowerCase().split(/\s+/)],
    });
  }

  chunks.push({
    id: 'live_automations_overview',
    topic: 'automation',
    title: 'Smart Automations Overview',
    content:
      `The Dashboard's Smart Automations section currently shows ${automations.length} automation rule` +
      `${automations.length === 1 ? '' : 's'} you can toggle on or off. None of them propose fully shutting ` +
      `off the AC or refrigerator — only mode/schedule changes.`,
    keywords: ['automation', 'automations', 'automatic', 'rules', 'smart', 'schedule', 'trigger'],
  });

  // ── Cross-appliance aggregate chunks (the ones that used to hardcode "five") ──
  const totalMonthlyCost = appliances.reduce((acc, a) => acc + a.costMonthly, 0);
  chunks.push({
    id: 'live_dashboard_cost',
    topic: 'dashboard',
    title: 'Monthly Cost Calculation',
    content:
      `The estimated monthly cost shown on the dashboard is the sum of costMonthly values across all ` +
      `${appliances.length} current appliances. The current total is approximately ₹${totalMonthlyCost} per month ` +
      `(these per-appliance figures are still placeholders pending a real ₹/kWh tariff rate).`,
    keywords: ['cost', 'monthly', 'money', 'rupee', 'price', 'bill', 'estimate', 'spending', 'save', 'total'],
  });

  const totalCarbon = appliances.reduce((acc, a) => acc + parseLeadingNumber(a.carbon), 0);
  chunks.push({
    id: 'live_carbon_total',
    topic: 'modal',
    title: 'Carbon Footprint Data',
    content:
      `Inside each appliance's detail modal you can see the monthly carbon footprint in kg CO₂ (still a ` +
      `placeholder pending a real emissions factor). Per-appliance: ` +
      appliances.map((a) => `${a.name} ${a.carbon}`).join(', ') +
      `. Total household carbon from all ${appliances.length} appliances is approximately ${totalCarbon.toFixed(0)} kg CO₂/month.`,
    keywords: ['carbon', 'co2', 'footprint', 'emission', 'environment', 'greenhouse', 'planet', 'green', 'eco'],
  });

  chunks.push({
    id: 'live_faq_save_money',
    topic: 'faq',
    title: 'How can I save money on my bill?',
    content:
      automations.length > 0
        ? `The best ways to save energy right now: ` +
          automations.map((a, i) => `${i + 1}) ${a.name} (${a.desc})`).join(' ') +
          ` ₹-amount savings are still placeholders pending a real tariff rate — see each automation's card for details.`
        : `There are no automation rules in the deck yet — add a card to get personalized suggestions.`,
    keywords: ['save', 'money', 'bill', 'reduce', 'cost', 'cheaper', 'tips', 'how', 'cut', 'lower'],
  });

  const totalDailyKwh = appliances.reduce((acc, a) => acc + a.todayKwh, 0);
  const totalMonthlyKwh = appliances.reduce((acc, a) => acc + a.monthlyKwh, 0);
  const currentDrawWatts = appliances.reduce((acc, a) => acc + (a.status === 'ON' ? a.baseWatts : 0), 0);
  chunks.push({
    id: 'live_faq_total_energy',
    topic: 'faq',
    title: 'How much energy does the house use in total?',
    content:
      `Averaged across the week, daily usage is around ${totalDailyKwh.toFixed(2)} kWh across all ` +
      `${appliances.length} appliances (${appliances.map((a) => `${a.name} ~${a.todayKwh}`).join(', ')} kWh/day). ` +
      `Monthly total is roughly ${totalMonthlyKwh.toFixed(1)} kWh. The Live Power Draw panel shows the ` +
      `real-time wattage — currently around ${currentDrawWatts} W given which appliances are ON right now.`,
    keywords: ['total', 'how much', 'energy', 'house', 'home', 'kwh', 'monthly', 'daily', 'all', 'combined', 'together'],
  });

  chunks.push({
    id: 'live_faq_voltage',
    topic: 'faq',
    title: 'Voltage of connected appliances',
    content:
      `The voltage ratings of each appliance in SmartCap are: ` +
      appliances.map((a) => `${a.name} = ${a.voltage}`).join(', ') +
      `. You can view the voltage for any specific appliance by tapping its card to open the detail modal.`,
    keywords: ['voltage', 'volt', 'power', 'electrical', 'supply', 'current', 'rating'],
  });

  return chunks;
}
