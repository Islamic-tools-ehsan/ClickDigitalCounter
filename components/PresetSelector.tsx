
import React from 'react';
import { DHIKR_PRESETS } from '../constants.tsx';
import { PresetKey } from '../types.ts';

interface PresetSelectorProps {
  selectedId: PresetKey;
  onSelect: (id: PresetKey) => void;
  isDarkMode: boolean;
}

export const PresetSelector: React.FC<PresetSelectorProps> = ({ selectedId, onSelect, isDarkMode }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 px-4 max-w-sm">
      {(Object.keys(DHIKR_PRESETS) as PresetKey[]).map((key) => {
        const isActive = selectedId === key;
        const preset = DHIKR_PRESETS[key];
        return (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wide uppercase transition-all duration-300 ${
              isActive 
                ? (isDarkMode ? 'bg-emerald-500 text-slate-900 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-emerald-700 text-white shadow-lg') 
                : (isDarkMode ? 'bg-slate-900 text-slate-400 border border-slate-800' : 'bg-slate-100 text-slate-500 border border-slate-200')
            }`}
          >
            {preset.label}
          </button>
        );
      })}
    </div>
  );
};
