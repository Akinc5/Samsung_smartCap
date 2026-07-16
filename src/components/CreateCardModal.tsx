import { useState, useEffect, useRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  X,
  Loader2,
  ImagePlus,
  Fan,
  Flame,
  Snowflake,
  ShieldCheck,
  Lightbulb,
  Tv,
  Droplet,
  Microwave,
  Router,
  Plug,
} from 'lucide-react';
import type { Appliance, Automation } from '../types';
import { lookupProduct, generateAutomations } from '../utils/coachAgent';

interface CreateCardModalProps {
  onClose: () => void;
  onCreate: (appliance: Appliance, autos: Automation[], liveCallFailed?: boolean) => void;
}

// If the Coach Agent call is still going after this long, swap the button
// label so the wait doesn't look like an indefinite/frozen spinner. The
// underlying fetch itself has a hard 12s timeout (src/utils/coachAgent.ts) and
// always resolves either way — this is purely a UX cue for the slower tail.
const SLOW_CALL_HINT_MS = 6000;

// Local, non-AI icon pick — the Coach Agent never supplies a component reference,
// only text (category/product name); this just maps that text to an existing
// lucide-react icon already used elsewhere in the app.
const ICON_KEYWORDS: { keywords: string[]; icon: LucideIcon }[] = [
  { keywords: ['fan', 'exhaust'], icon: Fan },
  { keywords: ['heater', 'geyser', 'boiler', 'water/space heater'], icon: Flame },
  { keywords: ['cooler', 'ac', 'air conditioner', 'conditioner', 'cooling'], icon: Snowflake },
  { keywords: ['fridge', 'refrigerator'], icon: ShieldCheck },
  { keywords: ['light', 'lamp', 'bulb', 'led', 'lighting'], icon: Lightbulb },
  { keywords: ['tv', 'television'], icon: Tv },
  { keywords: ['washer', 'washing', 'laundry'], icon: Droplet },
  { keywords: ['oven', 'microwave', 'kitchen'], icon: Microwave },
  { keywords: ['router', 'modem', 'wifi', 'networking'], icon: Router },
];

function pickIcon(category: string, name: string): LucideIcon {
  const haystack = `${category} ${name}`.toLowerCase();
  const match = ICON_KEYWORDS.find((entry) => entry.keywords.some((k) => haystack.includes(k)));
  return match ? match.icon : Plug;
}

export function CreateCardModal({ onClose, onCreate }: CreateCardModalProps) {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSlow, setIsSlow] = useState(false);
  const [error, setError] = useState('');
  const slowTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    setPhotoUrl(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => clearTimeout(slowTimerRef.current);
  }, []);

  const handleSubmit = async () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Give the card a name first.');
      return;
    }

    setIsSubmitting(true);
    setIsSlow(false);
    setError('');
    slowTimerRef.current = setTimeout(() => setIsSlow(true), SLOW_CALL_HINT_MS);

    // Coach Agent calls never throw for network/timeout/malformed-response
    // reasons anymore (src/utils/coachAgent.ts standardizes all of that into a
    // graceful generic/mock fallback + a liveCallFailed flag) — this try/catch
    // is just a last-resort net for a genuinely unexpected error, so creation
    // is never blocked by a live-call hiccup.
    try {
      const spec = await lookupProduct(trimmedName, notes.trim() || undefined);
      const genResult = await generateAutomations(spec, trimmedName);
      const liveCallFailed = spec.liveCallFailed || genResult.liveCallFailed;

      const confidenceText = spec.status === 'specific'
        ? `Based on published specs for ${spec.matchedProductName}, not measured from your usage`
        : `No specific data found — showing typical ${spec.category} guidance`;

      const id = `card-${Date.now()}`;
      const icon = pickIcon(spec.category, trimmedName);

      const appliance: Appliance = {
        id,
        name: trimmedName,
        type: spec.category,
        efficiency: 3,
        color: '#EAEAEA',
        accent: '#9B59B6',
        baseWatts: Math.round((spec.estimatedWattsLow + spec.estimatedWattsHigh) / 2),
        todayKwh: 0,
        monthlyKwh: 0,
        weeklyKwh: 0,
        costMonthly: 0, // TODO: no measured usage yet, pending real data
        icon,
        recommendation: genResult.automations[0]?.desc ?? 'No recommendation generated yet.',
        status: 'OFF',
        voltage: 'Unknown',
        runtime: 'Not yet measured',
        carbon: '— kg', // TODO: no measured usage yet, pending real data
        savings: '—',
        pos: { top: '50%', left: '50%' },
        ruleSource: 'generic',
        notes: notes.trim() || undefined,
        photo: photoUrl,
      };

      const autos: Automation[] = genResult.automations.map((g, i) => ({
        id: `${id}-auto-${i}`,
        name: g.name,
        desc: g.desc,
        savingVal: g.savingVal,
        active: false,
        why: g.why,
        evidence: g.evidence,
        confidence: confidenceText,
        tradeoff: g.tradeoff,
        ruleSource: 'generic',
        applianceIds: [id],
      }));

      onCreate(appliance, autos, liveCallFailed);
      onClose();
    } catch (err) {
      console.error(err);
      setError('Could not create the card — please try again.');
    } finally {
      clearTimeout(slowTimerRef.current);
      setIsSubmitting(false);
      setIsSlow(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#2D3436]/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="pop-in w-full max-w-md bg-white border-4 border-[#2D3436] rounded-[32px] shadow-[0_16px_0_0_#2D3436] relative overflow-hidden flex flex-col max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-white border-4 border-[#2D3436] rounded-full flex items-center justify-center shadow-[0_4px_0_0_#2D3436] hover:translate-y-1 hover:shadow-[0_2px_0_0_#2D3436] transition-all z-10"
        >
          <X className="w-5 h-5 text-[#2D3436]" strokeWidth={4} />
        </button>

        <div className="p-6 md:p-8 overflow-y-auto no-scrollbar space-y-4">
          <h2 className="text-2xl font-black text-[#2D3436] tracking-tight mb-2">Add a Card</h2>
          <p className="text-sm font-bold text-slate-500 -mt-2 mb-2">
            The Coach Agent will look up published specs for this product, or fall back to
            typical guidance for its category if nothing specific is found.
          </p>

          <div>
            <label className="text-xs font-black uppercase text-slate-400">Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Kitchen Exhaust Fan"
              className="mt-1 w-full rounded-xl border-4 border-[#2D3436] px-4 py-3 text-sm font-bold text-[#2D3436] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-black uppercase text-slate-400">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Brand, model, anything that helps identify it"
              rows={2}
              className="mt-1 w-full rounded-xl border-4 border-[#2D3436] px-4 py-3 text-sm font-bold text-[#2D3436] focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-black uppercase text-slate-400">
              Photo (optional, cosmetic only)
            </label>
            <label className="mt-1 flex cursor-pointer items-center justify-center gap-2 rounded-xl border-4 border-dashed border-[#2D3436] px-4 py-3 text-sm font-bold text-[#2D3436]">
              <ImagePlus className="w-4 h-4" />
              {photoUrl ? 'Change photo' : 'Choose photo'}
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            </label>
            {photoUrl && (
              <img src={photoUrl} alt="Card preview" className="mt-2 w-full h-32 object-cover rounded-xl border-4 border-[#2D3436]" />
            )}
          </div>

          {error && (
            <div className="rounded-xl border-2 border-[#E74C3C] bg-red-50 px-3 py-2 text-xs font-bold text-[#E74C3C]">
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl border-4 border-[#2D3436] text-lg font-black uppercase flex items-center justify-center gap-3 bg-[#9B59B6] text-white shadow-[0_8px_0_0_#2D3436] hover:translate-y-1 hover:shadow-[0_4px_0_0_#2D3436] active:translate-y-2 active:shadow-none transition-all disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {isSlow ? 'Taking longer than expected...' : 'Looking up specs...'}
              </>
            ) : (
              'Add Card'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
