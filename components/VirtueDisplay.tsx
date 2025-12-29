
import React from 'react';

interface VirtueDisplayProps {
  meaning: string;
  virtue: string;
  isDarkMode: boolean;
}

export const VirtueDisplay: React.FC<VirtueDisplayProps> = ({ meaning, virtue, isDarkMode }) => {
  return (
    <div className="text-center px-8 space-y-2 max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-700">
      <p className={`text-xs font-medium italic transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
        "{meaning}"
      </p>
      <p className={`text-[10px] leading-relaxed opacity-60 transition-colors ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
        {virtue}
      </p>
    </div>
  );
};
