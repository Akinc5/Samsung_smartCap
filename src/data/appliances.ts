import { Wind, Flame, Droplet, ShieldCheck, Lightbulb } from 'lucide-react';
import type { Appliance } from '../types';

// costMonthly, savings, and carbon below are still PLACEHOLDER values.
// They require a ₹/kWh tariff rate and a kg CO2/kWh emissions factor,
// neither of which is defined yet — see CLAUDE.md. Do not recompute
// these until a real rate/factor is provided.
export const initialAppliances: Appliance[] = [
  {
    id: 'ac',
    name: 'Samsung WindFree AI AC',
    type: 'Air Conditioner',
    efficiency: 5,
    color: '#FEEAA0', // Soft Yellow background
    accent: '#3498DB', // Blue glow/icon
    baseWatts: 1040, // flat overnight draw, 12am-5am
    todayKwh: 29.78, // 208.48 kWh/week ÷ 7
    monthlyKwh: 893.5, // 208.48 kWh/week ÷ 7 × 30
    costMonthly: 2140, // TODO: placeholder, pending real tariff rate
    icon: Wind,
    recommendation: 'Draws a flat ~1,040W every night from 12am-5am — 43.9 kWh/week, 21% of its weekly total.',
    status: 'ON',
    voltage: '230V',
    runtime: '6 hours',
    carbon: '182 kg', // TODO: placeholder, pending real emissions factor
    savings: '₹240/mo', // TODO: placeholder, pending real tariff rate
    pos: { top: '15%', left: '15%' }, // For 3D Map
  },
  {
    id: 'heater',
    name: 'Smart Water Heater',
    type: 'Water Heater',
    efficiency: 3,
    color: '#FFD3E0', // Soft Pink
    accent: '#E74C3C', // Red
    baseWatts: 2775, // morning peak average ~2,770W (higher of its two daily peaks); evening peak averages lower, ~1,777W
    todayKwh: 10.71, // 74.99 kWh/week ÷ 7
    monthlyKwh: 321.4, // 74.99 kWh/week ÷ 7 × 30
    costMonthly: 1033, // TODO: placeholder, pending real tariff rate
    icon: Flame,
    recommendation: 'Peaks daily at 6-7am (2,600-2,950W) and 6-8pm (1,700-1,850W) — the same hours as other high-draw appliances.',
    status: 'OFF',
    voltage: '230V',
    runtime: '4 hours (2h morning ~2,770W + 2h evening ~1,777W daily; +2h on laundry days)',
    carbon: '88 kg', // TODO: placeholder, pending real emissions factor
    savings: '₹180/mo', // TODO: placeholder, pending real tariff rate
    pos: { top: '80%', left: '20%' },
  },
  {
    id: 'washer',
    name: 'Bespoke AI Washing Machine',
    type: 'Washing Machine',
    efficiency: 5,
    color: '#D4E6F1', // Soft Blue
    accent: '#3498DB',
    baseWatts: 2200, // measured average of 2,220/2,227/2,186/2,169W samples
    todayKwh: 1.26, // 8.80 kWh/week ÷ 7
    monthlyKwh: 37.7, // 8.80 kWh/week ÷ 7 × 30
    costMonthly: 270, // TODO: placeholder, pending real tariff rate
    icon: Droplet,
    recommendation: 'Ran May 8 (11am-12pm) and May 11 (9-10am), overlapping the water heater — produced the week\'s two highest demand spikes (6,777W / 6,703W vs ~4,700W typical).',
    status: 'OFF',
    voltage: '220V',
    runtime: '1 hour (2x this week)',
    carbon: '23 kg', // TODO: placeholder, pending real emissions factor
    savings: '₹95/mo', // TODO: placeholder, pending real tariff rate
    pos: { top: '80%', left: '80%' },
  },
  {
    id: 'fridge',
    name: 'Bespoke Family Hub™',
    type: 'Refrigerator',
    efficiency: 4,
    color: '#D4E6F1',
    accent: '#3498DB',
    baseWatts: 165, // midpoint of 150-180W baseline
    todayKwh: 4.98, // 34.85 kWh/week ÷ 7
    monthlyKwh: 149.4, // 34.85 kWh/week ÷ 7 × 30
    costMonthly: 688, // TODO: placeholder, pending real tariff rate
    icon: ShieldCheck,
    recommendation: 'Runs continuously at a 150-180W baseline — 34.85 kWh/week, no on/off cycling.',
    status: 'ON',
    voltage: '220V',
    runtime: '24 hours',
    carbon: '58 kg', // TODO: placeholder, pending real emissions factor
    savings: '₹45/mo', // TODO: placeholder, pending real tariff rate
    pos: { top: '20%', left: '80%' },
  },
  {
    id: 'lights',
    name: 'Smart LED Ecosystem',
    type: 'Lighting',
    efficiency: 5,
    color: '#D5F5E3',
    accent: '#F1C40F',
    baseWatts: 40, // midpoint of 38-42W
    todayKwh: 2.04, // 14.27 kWh/week ÷ 7
    monthlyKwh: 61.2, // 14.27 kWh/week ÷ 7 × 30
    costMonthly: 98, // TODO: placeholder, pending real tariff rate
    icon: Lightbulb,
    recommendation: 'Draws a steady 38-42W every day from 10am-4pm (daylight hours) — 14.27 kWh/week total.',
    status: 'ON',
    voltage: '220V',
    runtime: '6 hours', // 10am-4pm
    carbon: '8 kg', // TODO: placeholder, pending real emissions factor
    savings: '₹30/mo', // TODO: placeholder, pending real tariff rate
    pos: { top: '50%', left: '50%' },
  },
];
