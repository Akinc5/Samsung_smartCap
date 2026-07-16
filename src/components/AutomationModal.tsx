import { X, CheckCircle2, Power } from 'lucide-react';
import type { Automation } from '../types';
import { RuleSourceBadge } from './RuleSourceBadge';

interface AutomationModalProps {
  automation: Automation;
  onClose: () => void;
  onToggle: (id: string) => void;
}

export function AutomationModal({ automation, onClose, onToggle }: AutomationModalProps) {
  return (
    <div className="fixed inset-0 bg-[#2D3436]/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="pop-in w-full max-w-md bg-white border-4 border-[#2D3436] rounded-[32px] shadow-[0_16px_0_0_#2D3436] relative overflow-hidden flex flex-col max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-white border-4 border-[#2D3436] rounded-full flex items-center justify-center shadow-[0_4px_0_0_#2D3436] hover:translate-y-1 hover:shadow-[0_2px_0_0_#2D3436] transition-all z-10"
        >
          <X className="w-5 h-5 text-[#2D3436]" strokeWidth={4} />
        </button>

        <div className="p-6 md:p-8 overflow-y-auto no-scrollbar flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border-4 border-[#2D3436] flex items-center justify-center bg-white shadow-[0_8px_0_0_#2D3436] mb-4 shrink-0">
            <CheckCircle2 className="w-12 h-12" style={{ color: automation.active ? '#9B59B6' : '#A4B0BE' }} />
          </div>

          <span
            className={`text-xs font-black uppercase px-4 py-1 rounded-full border-4 border-[#2D3436] bg-white shadow-[0_4px_0_0_#2D3436] mb-3 ${
              automation.active ? 'text-[#2ECC71]' : 'text-slate-400'
            }`}
          >
            {automation.active ? 'Active' : 'Inactive'}
          </span>

          <div className="flex items-center gap-2 mb-2">
            <RuleSourceBadge source={automation.ruleSource} />
          </div>

          <h2 className="text-2xl font-black text-[#2D3436] tracking-tight text-center mb-6 leading-tight">
            {automation.name}
          </h2>

          <div className="w-full bg-white/80 border-4 border-[#2D3436] rounded-2xl p-4 shadow-inner mb-6 flex flex-col gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-slate-400">Why</span>
              <span className="text-sm font-bold text-[#2D3436]">{automation.why}</span>
            </div>
            <div className="flex flex-col border-t-2 border-slate-200 pt-3">
              <span className="text-[10px] font-black uppercase text-slate-400">Evidence</span>
              <span className="text-sm font-bold text-[#2D3436]">{automation.evidence}</span>
            </div>
            <div className="flex flex-col border-t-2 border-slate-200 pt-3">
              <span className="text-[10px] font-black uppercase text-slate-400">Confidence</span>
              <span className="text-sm font-bold text-[#2D3436]">{automation.confidence}</span>
            </div>
            <div className="flex flex-col border-t-2 border-slate-200 pt-3">
              <span className="text-[10px] font-black uppercase text-slate-400">Trade-off</span>
              <span className="text-sm font-bold text-[#2D3436]">{automation.tradeoff}</span>
            </div>
          </div>

          <div className="w-full bg-[#D5F5E3] border-4 border-[#2D3436] rounded-2xl p-4 mb-6 text-center">
            <span className="text-xs font-black uppercase text-slate-500">Est. Saving</span>
            <p className="text-lg font-black text-[#2ECC71]">{automation.savingVal}</p>
          </div>

          <button
            onClick={() => onToggle(automation.id)}
            className={`w-full py-4 rounded-2xl border-4 border-[#2D3436] text-xl font-black uppercase flex items-center justify-center gap-3 transition-all shrink-0 ${
              automation.active
                ? 'bg-[#E74C3C] text-white shadow-[0_8px_0_0_#2D3436] hover:translate-y-1 hover:shadow-[0_4px_0_0_#2D3436] active:translate-y-2 active:shadow-none'
                : 'bg-[#2ECC71] text-white shadow-[0_8px_0_0_#2D3436] hover:translate-y-1 hover:shadow-[0_4px_0_0_#2D3436] active:translate-y-2 active:shadow-none'
            }`}
          >
            <Power className="w-6 h-6" />
            {automation.active ? 'Disable Automation' : 'Enable Automation'}
          </button>
        </div>
      </div>
    </div>
  );
}
