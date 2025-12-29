
import React, { useEffect, useState } from 'react';

interface CounterDisplayProps {
  count: number;
  target: number | null;
  isDarkMode: boolean;
  arabic: string;
  isTargetReached?: boolean;
}

export const CounterDisplay: React.FC<CounterDisplayProps> = ({ count, target, isDarkMode, arabic, isTargetReached }) => {
  const [scale, setScale] = useState(1);

  // Animation effect on count change
  useEffect(() => {
    setScale(1.15);
    const timeout = setTimeout(() => setScale(1), 100);
    return () => clearTimeout(timeout);
  }, [count]);

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progress = target ? Math.min(count / target, 1) : 0;
  const offset = circumference - progress * circumference;

  return (
    <div className="relative flex items-center justify-center w-64 h-64">
      {/* Background Glow Effect when Target Reached */}
      {isTargetReached && (
        <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-3xl animate-pulse scale-110 transition-opacity duration-1000" />
      )}

      {/* Arabic Text Layer */}
      <div className={`absolute top-0 transition-all duration-1000 font-poppins text-lg text-center w-full ${isTargetReached ? 'opacity-100 scale-110 text-emerald-500 translate-y-[-10px]' : 'opacity-40 text-current'}`}>
        {arabic}
      </div>

      {/* Progress Circle */}
      <svg className="absolute w-full h-full -rotate-90 filter drop-shadow-sm">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          className={`fill-none stroke-current opacity-5 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}
          strokeWidth="4"
        />
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          className={`fill-none transition-all duration-500 ease-out stroke-current ${isTargetReached ? 'text-emerald-400 stroke-[8px] animate-[pulse_2s_infinite]' : (isDarkMode ? 'text-emerald-400' : 'text-emerald-600')}`}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={target ? offset : circumference}
          strokeLinecap="round"
          style={{ 
            filter: isTargetReached ? 'drop-shadow(0 0 12px rgba(52, 211, 153, 0.8))' : 'none'
          }}
        />
      </svg>

      {/* Actual Count - Now explicitly Green */}
      <div 
        className={`text-7xl font-semibold tabular-nums font-poppins transition-all duration-300 ease-out ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}
        style={{ transform: `scale(${scale})`, textShadow: isTargetReached ? '0 0 20px rgba(16, 185, 129, 0.4)' : 'none' }}
      >
        {count}
      </div>
    </div>
  );
};
