import type { Automation } from '../types';

export const initialAutomations: Automation[] = [
  {
    id: 'ac_sleep',
    name: 'Switch AC to WindFree/Sleep Mode overnight',
    desc: 'Switches the AC to WindFree/Sleep mode during its flat, unmodulated overnight draw window.',
    why: 'Overnight cooling runs at full, unmodulated power with no adjustment for reduced nighttime cooling needs.',
    evidence: 'Flat ~1,040W draw every night, 12am-6am, all 7 nights — 43.9 kWh/week, 21% of the AC\'s total weekly use.',
    confidence: '100% — consistent across all 7 nights.',
    tradeoff: 'Maintains safe cooling for Indian summer heat; this is a mode change, not a shutoff. Savings % is an industry estimate, not directly measured — no outdoor temperature data in this dataset.',
    savingVal: '43.9 kWh/week exposure (21% of AC\'s weekly use)', // TODO: ₹ saving pending real tariff rate
    active: false,
  },
  {
    id: 'heater_stagger',
    name: 'Shift water heater 30-60 min off AC\'s peak hours',
    desc: 'Shifts water heater cycles 30-60 minutes away from AC\'s peak hours.',
    why: 'Water heater and AC hit their daily peaks in the exact same hours, every day.',
    evidence: 'Heater fires 6-8am (~2,770W) and 7-9pm (~1,777W) daily — same windows as AC\'s own peak draw.',
    confidence: '100% — same pattern all 7 days.',
    tradeoff: 'Minor shift in hot water availability timing.',
    savingVal: 'No added kWh — reduces peak-hour overlap (~2,770W morning / ~1,777W evening)', // TODO: ₹ saving pending real tariff rate
    active: false,
  },
  {
    id: 'laundry_stagger',
    name: 'Schedule laundry outside active water heater hours',
    desc: 'Avoids scheduling laundry loads during active water heater cycles.',
    why: 'The week\'s two highest simultaneous demand spikes both come from this exact overlap.',
    evidence: 'May 8 and May 11 laundry loads overlapped an active heater cycle — 6,777W and 6,703W vs a typical peak of ~4,700W, a ~40% spike.',
    confidence: '2 of 2 observed laundry days — small sample, but the mechanism is direct load-stacking, not correlation.',
    tradeoff: 'Reduces laundry scheduling flexibility.',
    savingVal: '~40% peak-demand spike avoided (6,777W/6,703W vs ~4,700W typical)', // TODO: ₹ saving pending real tariff rate
    active: false,
  },
  {
    id: 'lights_daylight',
    name: 'Add daylight/motion sensor for 10am-4pm',
    desc: 'Adds a daylight/motion sensor to cut unnecessary lighting during full-daylight hours.',
    why: 'Lights draw steadily through full daylight hours with no adjustment for available natural light.',
    evidence: '38-42W consistently, every day, 10am-4pm.',
    confidence: '100% — same pattern all 7 days.',
    tradeoff: 'Small individual saving; low-cost, easy automation.',
    savingVal: '14.27 kWh/week exposure (38-42W, 10am-4pm daily)', // TODO: ₹ saving pending real tariff rate
    active: false,
  },
  {
    id: 'fridge_alert',
    name: 'Monitor for abnormal refrigerator draw',
    desc: 'Monitors refrigerator draw for spikes above its normal 150-180W baseline.',
    why: 'Different category — this is fault detection, not scheduling.',
    evidence: 'Baseline 150-180W with an occasional spike (e.g. 349W).',
    confidence: 'Low — plausibly a normal defrost cycle in this 7-day sample, not a confirmed fault.',
    tradeoff: 'None — alert only, explicitly not a savings claim.',
    savingVal: 'N/A — alert only, not a savings claim',
    active: false,
  },
];

// Hard rule (CLAUDE.md): no automation may propose full shutoff of the AC or
// refrigerator (heat-safety constraint — India, 40°C+ summers). Mode/setpoint
// changes only. Enforced here, not just documented, so a future rule that
// violates it fails fast instead of silently reaching the UI.
const FULL_SHUTOFF_PATTERNS = [/turn off (the )?(ac|air conditioner|refrigerator|fridge)\b/i, /shut ?off.*(ac|air conditioner|refrigerator|fridge)/i, /disable.*(ac|air conditioner|refrigerator|fridge).*(power|permanently|entirely)/i];

initialAutomations.forEach((auto) => {
  const text = [auto.name, auto.why, auto.evidence, auto.tradeoff].join(' ');
  const violation = FULL_SHUTOFF_PATTERNS.find((pattern) => pattern.test(text));
  if (violation) {
    throw new Error(`Automation "${auto.id}" appears to propose a full AC/refrigerator shutoff, which violates the heat-safety hard rule in CLAUDE.md.`);
  }
});
