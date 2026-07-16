import React, { useState } from 'react';
import { X, Play, Square, Sparkles, Pencil, Trash2, ImagePlus } from 'lucide-react';
import type { Appliance } from '../types';
import { RuleSourceBadge } from './RuleSourceBadge';

interface ApplianceModalProps {
  appliance: Appliance;
  onClose: () => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: { name?: string; notes?: string; photo?: string }) => void | Promise<void>;
}

export function ApplianceModal({ appliance, onClose, onToggle, onDelete, onEdit }: ApplianceModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [draftName, setDraftName] = useState(appliance.name);
  const [draftNotes, setDraftNotes] = useState(appliance.notes ?? '');
  const [draftPhoto, setDraftPhoto] = useState(appliance.photo);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (draftPhoto) URL.revokeObjectURL(draftPhoto);
    setDraftPhoto(URL.createObjectURL(file));
  };

  const handleSaveEdit = async () => {
    setIsSaving(true);
    try {
      // For a generic card this may await a Coach Agent re-lookup/regeneration
      // (bounded by coachAgent.ts's own 12s timeout, never hangs indefinitely).
      await onEdit(appliance.id, { name: draftName, notes: draftNotes, photo: draftPhoto });
    } finally {
      setIsSaving(false);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setDraftName(appliance.name);
    setDraftNotes(appliance.notes ?? '');
    setDraftPhoto(appliance.photo);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(appliance.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#2D3436]/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div
        className="pop-in w-full max-w-md bg-white border-4 border-[#2D3436] rounded-[32px] shadow-[0_16px_0_0_#2D3436] relative overflow-hidden flex flex-col max-h-[90vh]"
        style={{ backgroundColor: appliance.color || '#FFF' }}
      >
        <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
          <button
            onClick={() => setIsEditing((v) => !v)}
            className="w-10 h-10 bg-white border-4 border-[#2D3436] rounded-full flex items-center justify-center shadow-[0_4px_0_0_#2D3436] hover:translate-y-1 hover:shadow-[0_2px_0_0_#2D3436] transition-all"
            title="Edit card"
          >
            <Pencil className="w-4 h-4 text-[#2D3436]" strokeWidth={3} />
          </button>
          <button
            onClick={handleDelete}
            className="w-10 h-10 bg-white border-4 border-[#2D3436] rounded-full flex items-center justify-center shadow-[0_4px_0_0_#2D3436] hover:translate-y-1 hover:shadow-[0_2px_0_0_#2D3436] hover:bg-red-50 transition-all"
            title="Delete card"
          >
            <Trash2 className="w-4 h-4 text-[#E74C3C]" strokeWidth={3} />
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-white border-4 border-[#2D3436] rounded-full flex items-center justify-center shadow-[0_4px_0_0_#2D3436] hover:translate-y-1 hover:shadow-[0_2px_0_0_#2D3436] transition-all z-10"
        >
          <X className="w-5 h-5 text-[#2D3436]" strokeWidth={4} />
        </button>

        <div className="p-6 md:p-8 overflow-y-auto no-scrollbar flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border-4 border-[#2D3436] flex items-center justify-center bg-white shadow-[0_8px_0_0_#2D3436] mb-4 shrink-0 overflow-hidden">
            {appliance.photo ? (
              <img src={appliance.photo} alt={appliance.name} className="w-full h-full object-cover" />
            ) : (
              React.createElement(appliance.icon, {
                className: 'w-12 h-12',
                style: { color: appliance.status === 'ON' ? appliance.accent : '#A4B0BE' },
              })
            )}
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span
              className={`text-xs font-black uppercase px-4 py-1 rounded-full border-4 border-[#2D3436] bg-white shadow-[0_4px_0_0_#2D3436] ${
                appliance.status === 'ON' ? 'text-[#2ECC71]' : 'text-slate-400'
              }`}
            >
              {appliance.status === 'ON' ? 'Running' : 'Standby Mode'}
            </span>
            <RuleSourceBadge source={appliance.ruleSource} />
          </div>

          {isEditing ? (
            <div className="w-full space-y-3 mb-6">
              <div>
                <label className="text-xs font-black uppercase text-slate-400">Name</label>
                <input
                  type="text"
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  className="mt-1 w-full rounded-xl border-4 border-[#2D3436] px-3 py-2 text-sm font-bold text-[#2D3436] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-black uppercase text-slate-400">Notes</label>
                <textarea
                  value={draftNotes}
                  onChange={(e) => setDraftNotes(e.target.value)}
                  rows={2}
                  className="mt-1 w-full rounded-xl border-4 border-[#2D3436] px-3 py-2 text-sm font-bold text-[#2D3436] focus:outline-none resize-none"
                />
              </div>
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-4 border-dashed border-[#2D3436] px-3 py-2 text-sm font-bold text-[#2D3436]">
                <ImagePlus className="w-4 h-4" />
                {draftPhoto ? 'Change photo' : 'Choose photo'}
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </label>
              <div className="flex gap-2">
                <button
                  onClick={handleCancelEdit}
                  disabled={isSaving}
                  className="flex-1 py-2 rounded-xl border-4 border-[#2D3436] text-sm font-black uppercase bg-white disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={isSaving}
                  className="flex-1 py-2 rounded-xl border-4 border-[#2D3436] text-sm font-black uppercase bg-[#2ECC71] text-white disabled:opacity-70"
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-black text-[#2D3436] tracking-tight text-center mb-1 leading-tight">
                {appliance.name}
              </h2>
              {appliance.notes && (
                <p className="text-sm font-bold text-slate-500 text-center mb-6">{appliance.notes}</p>
              )}
              {!appliance.notes && <div className="mb-5" />}
            </>
          )}

          {/* Extensive Details Grid */}
          <div className="w-full bg-white/80 border-4 border-[#2D3436] rounded-2xl p-4 shadow-inner mb-6 grid grid-cols-2 gap-y-4 gap-x-2">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-slate-400">Power Draw</span>
              <span className="text-lg font-black text-[#2D3436]">
                {appliance.status === 'ON' ? appliance.baseWatts : 0} W
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-slate-400">Voltage</span>
              <span className="text-lg font-black text-[#2D3436]">{appliance.voltage}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-slate-400">Today</span>
              <span className="text-lg font-black text-[#3498DB]">{appliance.todayKwh} kWh</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-slate-400">Monthly Est.</span>
              <span className="text-lg font-black text-[#3498DB]">{appliance.monthlyKwh} kWh</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-slate-400">Est. Cost</span>
              <span className="text-lg font-black text-[#E74C3C]">₹{appliance.costMonthly}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-slate-400">Runtime Today</span>
              <span className="text-lg font-black text-[#2D3436]">{appliance.runtime}</span>
            </div>
            <div className="flex flex-col col-span-2 border-t-2 border-slate-200 pt-2 mt-1">
              <span className="text-[10px] font-black uppercase text-slate-400">Carbon Footprint</span>
              <span className="text-lg font-black text-[#2D3436]">{appliance.carbon} CO₂ / mo</span>
            </div>
          </div>

          {/* AI Recommendation Panel */}
          <div className="w-full bg-[#FFF3CD] border-4 border-[#FFE69C] rounded-2xl p-4 mb-6 relative text-left">
            <div className="absolute -top-3 -left-3 bg-[#F1C40F] border-2 border-[#2D3436] p-1 rounded-full text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-black text-[#856404] uppercase mb-1">AI Recommendation</h4>
            <p className="text-[#856404] font-bold text-sm mb-2">{appliance.recommendation}</p>
            <span className="inline-block bg-[#F1C40F] text-[#2D3436] border-2 border-[#2D3436] px-2 py-1 rounded font-black text-[10px] uppercase shadow-sm">
              Est. Savings: {appliance.savings}
            </span>
          </div>

          {/* Big Action Button */}
          <button
            onClick={() => onToggle(appliance.id)}
            className={`w-full py-4 rounded-2xl border-4 border-[#2D3436] text-xl font-black uppercase flex items-center justify-center gap-3 transition-all shrink-0 ${
              appliance.status === 'ON'
                ? 'bg-[#E74C3C] text-white shadow-[0_8px_0_0_#2D3436] hover:translate-y-1 hover:shadow-[0_4px_0_0_#2D3436] active:translate-y-2 active:shadow-none'
                : 'bg-[#2ECC71] text-white shadow-[0_8px_0_0_#2D3436] hover:translate-y-1 hover:shadow-[0_4px_0_0_#2D3436] active:translate-y-2 active:shadow-none'
            }`}
          >
            {appliance.status === 'ON' ? (
              <>
                <Square className="w-6 h-6" fill="currentColor" /> Turn Off
              </>
            ) : (
              <>
                <Play className="w-6 h-6" fill="currentColor" /> Turn On
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
