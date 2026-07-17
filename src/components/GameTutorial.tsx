import { useState } from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';

interface GameTutorialProps {
  onClose: () => void;
}

const STEPS = [
  'Each round is one real day from this household\'s data.',
  'You have 2 control points per round — spend them to activate power-ups (WindFree, stagger, delay, daylight cutoff). You can\'t cover everything, so choose carefully.',
  'Leaving overlapping appliances unmanaged triggers a combo penalty — a real demand spike from this household\'s data.',
  'Lower total kWh than the baseline (341.39 kWh, no power-ups) = you win the week.',
  'XP and achievements are earned from real match results, not random.',
];

export function GameTutorial({ onClose }: GameTutorialProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const isLastStep = stepIndex === STEPS.length - 1;

  return (
    <div className="fixed inset-0 bg-[#2D3436]/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="pop-in w-full max-w-md bg-white border-4 border-[#2D3436] rounded-[32px] shadow-[0_16px_0_0_#2D3436] relative overflow-hidden flex flex-col max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-white border-4 border-[#2D3436] rounded-full flex items-center justify-center shadow-[0_4px_0_0_#2D3436] hover:translate-y-1 hover:shadow-[0_2px_0_0_#2D3436] transition-all z-10"
          title="Skip tutorial"
        >
          <X className="w-5 h-5 text-[#2D3436]" strokeWidth={4} />
        </button>

        <div className="p-6 md:p-8 flex flex-col items-center text-center">
          <h2 className="text-2xl font-black text-[#2D3436] tracking-tight mb-2">How to Play</h2>

          <div className="flex gap-1.5 mb-6">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full border-2 border-[#2D3436] ${
                  i === stepIndex ? 'bg-[#3498DB]' : i < stepIndex ? 'bg-[#2ECC71]' : 'bg-white'
                }`}
              />
            ))}
          </div>

          <div className="w-full bg-white/80 border-4 border-[#2D3436] rounded-2xl p-6 shadow-inner mb-6 min-h-[100px] flex items-center justify-center">
            <p className="text-base font-bold text-[#2D3436] leading-relaxed">
              {STEPS[stepIndex]}
            </p>
          </div>

          <div className="flex gap-2 w-full">
            {stepIndex > 0 && (
              <button
                onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
                className="flex-1 py-3 rounded-2xl border-4 border-[#2D3436] text-sm font-black uppercase bg-white flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            )}
            <button
              onClick={() => (isLastStep ? onClose() : setStepIndex((i) => i + 1))}
              className="flex-1 py-3 rounded-2xl border-4 border-[#2D3436] text-sm font-black uppercase bg-[#2ECC71] text-white flex items-center justify-center gap-2 shadow-[0_6px_0_0_#2D3436] hover:translate-y-1 hover:shadow-[0_4px_0_0_#2D3436] transition-all"
            >
              {isLastStep ? "Let's Play" : 'Next'}
              {!isLastStep && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
