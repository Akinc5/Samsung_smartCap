import { Home, Award, Box, ScanLine, MessageSquare } from 'lucide-react';
import type { TabId } from '../types';

const TABS: { id: TabId; icon: typeof Home; label: string }[] = [
  { id: 'dashboard', icon: Home, label: 'Dashboard' },
  { id: 'rank', icon: Award, label: 'Energy Rank' },
  { id: '3dhome', icon: Box, label: '3D Home' },
  { id: 'kiri', icon: ScanLine, label: 'Kiri Scan' },
  { id: 'chatbot', icon: MessageSquare, label: 'AI Chat' },
];

interface BottomNavProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
}

export function BottomNav({ activeTab, onSelectTab }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 w-full p-4 z-40 bg-gradient-to-t from-[#F0F4F8] via-[#F0F4F8] to-transparent">
      <div className="max-w-md mx-auto bg-white border-4 border-[#2D3436] rounded-full p-2 flex justify-between items-center shadow-[0_12px_0_0_#2D3436]">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`nav-btn flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-full border-2 border-transparent transition-all duration-200 ${
              activeTab === tab.id ? 'active' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            <tab.icon className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-black uppercase tracking-wider">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
