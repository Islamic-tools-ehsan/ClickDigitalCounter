
import React from 'react';

interface ControlsProps {
  onReset: () => void;
  isDarkMode: boolean;
}

export const Controls: React.FC<ControlsProps> = ({ onReset, isDarkMode }) => {
  const handleClick = (e: React.MouseEvent) => {
    // Stop propagation to prevent the background tap-area from incrementing the count
    e.stopPropagation();
    // Explicitly call reset
    onReset();
  };

  return (
    <div className="flex items-center justify-center space-x-8 mt-2 relative z-50">
      <button 
        type="button"
        onClick={handleClick}
        className="flex flex-col items-center space-y-2 group transition-all active:scale-95 cursor-pointer touch-none"
        aria-label="Restart counter"
      >
        {/* Solid Red Button for high visibility */}
        <div className="p-4 rounded-full bg-red-600 text-white shadow-lg shadow-red-900/20 group-hover:bg-red-700 transition-colors border-2 border-transparent group-active:border-red-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <span className={`text-[11px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-red-400' : 'text-red-700'} opacity-80`}>
          Restart Count
        </span>
      </button>
    </div>
  );
};
