import type { LucideIcon } from 'lucide-react';

export type ApplianceStatus = 'ON' | 'OFF';

export interface AppliancePosition {
  top: string;
  left: string;
}

export type RuleSource = 'measured' | 'generic';

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
  weeklyKwh: number;
  costMonthly: number;
  icon: LucideIcon;
  recommendation: string;
  status: ApplianceStatus;
  voltage: string;
  runtime: string;
  carbon: string;
  savings: string;
  pos: AppliancePosition;
  ruleSource: RuleSource;
  notes?: string;
  photo?: string;
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
  ruleSource: RuleSource;
  applianceIds: string[];
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
