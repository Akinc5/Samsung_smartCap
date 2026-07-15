import { Activity, Wind, Lightbulb } from 'lucide-react';
import type { Insight } from '../types';

// saving figures below are still PLACEHOLDER values pending a real
// ₹/kWh tariff rate — see CLAUDE.md. Do not recompute until defined.
export const insights: Insight[] = [
  {
    id: 1,
    title: 'AC Overnight Flat-Draw',
    desc: 'Your AC draws a flat ~1,040W every night from 12am-5am — 43.9 kWh/week, 21% of its 208.48 kWh weekly total.',
    saving: '₹240/month', // TODO: placeholder, pending real tariff rate
    icon: Wind,
    color: '#3498DB',
  },
  {
    id: 2,
    title: 'Lights Daytime Draw',
    desc: 'Your lights draw a steady 38-42W every day from 10am-4pm (daylight hours) — 14.27 kWh/week total.',
    saving: '₹30/month', // TODO: placeholder, pending real tariff rate
    icon: Lightbulb,
    color: '#F1C40F',
  },

  {
    id: 3,
    title: 'Standby Power Detection',
    desc: 'Your Smart TV consumed 2.1 kWh while idle this week.',
    saving: '₹180/month',
    icon: Activity,
    color: '#FF6B6B',
  },
  {
    id: 4,
    title: 'Air Conditioner Optimization',
    desc: 'Increasing the temperature from 22°C → 24°C can reduce energy consumption by 11%.',
    saving: '₹240/month',
    icon: Wind,
    color: '#3498DB',
  },
];
