import { CheckCircle2, Sparkles } from 'lucide-react';
import type { RuleSource } from '../types';

interface RuleSourceBadgeProps {
  source: RuleSource;
  className?: string;
}

// Unmissable measured-vs-generic indicator — deliberately not text alone, since
// confidence text is easy to skim past.
export function RuleSourceBadge({ source, className = '' }: RuleSourceBadgeProps) {
  const isMeasured = source === 'measured';
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border-2 border-[#2D3436] px-2 py-0.5 text-[10px] font-black uppercase tracking-wide ${
        isMeasured ? 'bg-[#2ECC71] text-white' : 'bg-[#F1C40F] text-[#2D3436]'
      } ${className}`}
    >
      {isMeasured ? <CheckCircle2 className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
      {isMeasured ? 'Measured' : 'Generic'}
    </span>
  );
}
