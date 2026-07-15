import type { LucideIcon } from 'lucide-react';

export type ApplianceStatus = 'ON' | 'OFF';

export interface AppliancePosition {
  top: string;
  left: string;
}

export interface Appliance {
  id: string;
  name: string;
  type: string;
  efficiency: number;
  color: string;
  accent: string;
  baseWatts: number;
  todayKwh: number;
  monthlyKwh: number;
  costMonthly: number;
  icon: LucideIcon;
  recommendation: string;
  status: ApplianceStatus;
  voltage: string;
  runtime: string;
  carbon: string;
  savings: string;
  pos: AppliancePosition;
}

export interface Automation {
  id: string;
  name: string;
  desc: string;
  savingVal: string;
  active: boolean;
  why: string;
  evidence: string;
  confidence: string;
  tradeoff: string;
}

export interface Insight {
  id: number;
  title: string;
  desc: string;
  saving: string;
  icon: LucideIcon;
  color: string;
}

export type TabId = 'dashboard' | 'rank' | '3dhome' | 'kiri' | 'chatbot';
