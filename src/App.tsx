
import React, { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Components
import Header from './components/Header';
import ToolsSection from './components/ToolsSection';
import Footer from './components/Footer';
import CounterDisplay from './components/CounterDisplay';

// Types
type PresetKey = 'THIRTY_THREE' | 'CENTURY' | 'CUSTOM' | 'UNLIMITED';

interface DhikrPreset {
  id: PresetKey;
  label: string;
  arabic: string;
  meaning: string;
  virtue: string;
  target: number | null;
}

const PRESETS: Record<PresetKey, DhikrPreset> = {
  THIRTY_THREE: { id: 'THIRTY_THREE', label: '33 Mode', arabic: 'سُبْحَانَ اللهِ', meaning: 'Glory be to Allah', virtue: 'A quick round of 33 remembrance.', target: 33 },
  CENTURY: { id: 'CENTURY', label: '100 Mode', arabic: 'لا إِلَهَ إِلا اللهُ', meaning: 'There is no god but Allah', virtue: 'A powerful sunnah goal for daily dhikr.', target: 100 },
  CUSTOM: { id: 'CUSTOM', label: 'Custom', arabic: 'ذِكْر مُخَصَّص', meaning: 'Personal Target', virtue: 'Focus on your specific goal.', target: 1000 },
  UNLIMITED: { id: 'UNLIMITED', label: 'Unlimited', arabic: 'ذِكْر', meaning: 'Infinite Remembrance', virtue: 'The hearts find rest in Allah.', target: null }
};

const STORAGE_KEY = 'tasbeeh_counter_v3';

export default function App() {
  // State
  const [count, setCount] = useState(0);
  const [presetId, setPresetId] = useState<PresetKey>('CENTURY');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [customTarget, setCustomTarget] = useState(1000);
  const [showToast, setShowToast] = useState(false);

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setCount(parsed.count || 0);
      setPresetId(parsed.presetId || 'CENTURY');
      setIsDarkMode(parsed.isDarkMode || false);
      setHapticsEnabled(parsed.hapticsEnabled ?? true);
      setCustomTarget(parsed.customTarget || 1000);
    }
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      count, presetId, isDarkMode, hapticsEnabled, customTarget
    }));
  }, [count, presetId, isDarkMode, hapticsEnabled, customTarget]);

  const currentPreset = PRESETS[presetId];
  const targetValue = presetId === 'CUSTOM' ? customTarget : currentPreset.target;
  const isTargetReached = targetValue !== null && count >= targetValue;

  // Sound Helper
  const playBeep = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.3);
    } catch (e) {
      console.warn('Audio failed:', e);
    }
  }, []);

  // Actions
  const increment = useCallback(() => {
    setCount(prev => prev + 1);
    
    // Haptics
    if (hapticsEnabled && navigator.vibrate) {
      navigator.vibrate(15);
    }

    // Check target reach
    const nextCount = count + 1;
    if (targetValue !== null && nextCount === targetValue) {
      playBeep();
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#6ee7b7']
      });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  }, [count, hapticsEnabled, targetValue, playBeep]);

  const resetCount = useCallback(() => {
    setCount(0);
    if (hapticsEnabled && navigator.vibrate) navigator.vibrate(50);
  }, [hapticsEnabled]);

  return (
    <div className={`min-h-screen transition-colors duration-700 flex flex-col items-center select-none ${isDarkMode ? 'bg-[#0f172a] text-slate-100' : 'bg-[#FDFCFB] text-slate-800'}`}>
      
      <Header 
        isDarkMode={isDarkMode} 
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        hapticsEnabled={hapticsEnabled}
        onToggleHaptics={() => setHapticsEnabled(!hapticsEnabled)}
      />

      <main className="flex-1 w-full flex flex-col items-center justify-center relative px-6 mt-16 overflow-hidden">
        {/* Visible Tap Area */}
        <div 
          className={`absolute inset-x-4 top-4 bottom-2 z-10 cursor-pointer rounded-[2.5rem] border-2 transition-all duration-300 flex flex-col items-center group
            ${isDarkMode 
              ? 'border-emerald-500/30 hover:border-emerald-500/50 hover:bg-emerald-500/5' 
              : 'border-emerald-600/30 hover:border-emerald-600/50 hover:bg-emerald-600/5'
            }`} 
          onClick={increment}
          aria-label="Increment counter"
        >
          {/* Arabic Text in Corner */}
          <div className={`absolute top-6 right-8 transition-all duration-1000 font-poppins text-xl text-right transition-all pointer-events-none ${isTargetReached ? 'opacity-100 scale-110 text-emerald-500 translate-y-[2px]' : 'opacity-40'}`}>
            {currentPreset.arabic}
          </div>

          <div className="flex-1" />

          <span className={`text-[10px] uppercase tracking-[0.4em] font-bold opacity-40 group-hover:opacity-100 transition-opacity pointer-events-none font-poppins mb-2 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
            Tap anywhere to count
          </span>
        </div>
        
        <div className="z-20 pointer-events-none flex flex-col items-center max-w-sm w-full">
          <CounterDisplay 
            count={count} 
            target={targetValue} 
            isDarkMode={isDarkMode}
            isTargetReached={isTargetReached}
          />
          
          <div className="mt-8 mb-12 text-center flex flex-col items-center">
            <h2 className={`text-sm font-medium tracking-widest uppercase mb-1 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
              {currentPreset.label}
            </h2>
            <div className="flex items-center justify-center space-x-1">
                <span className="text-xs opacity-60 font-poppins">
                  {count} / {targetValue || '∞'}
                </span>
                {presetId === 'CUSTOM' && (
                   <div className="pointer-events-auto ml-2">
                      <input 
                        type="number" 
                        value={customTarget} 
                        onChange={(e) => setCustomTarget(Math.max(1, parseInt(e.target.value) || 1))}
                        className={`bg-transparent border-b-2 border-emerald-500/50 text-sm w-20 text-center focus:outline-none font-bold text-emerald-600 pb-1`} 
                      />
                   </div>
                )}
            </div>
          </div>
        </div>

        {/* Floating Toast */}
        <AnimatePresence>
          {showToast && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-32 bg-emerald-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-2xl z-50 flex items-center space-x-2"
            >
              <span>Ma Sha Allah! Target Reached</span>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Preset Selector & Controls */}
      <div className="w-full max-w-md px-6 pb-6 z-30 pt-10">
        <div className="flex flex-wrap justify-center gap-2 mb-6">
            {(Object.keys(PRESETS) as PresetKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setPresetId(key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all transform active:scale-95 ${
                  presetId === key 
                    ? 'bg-emerald-600 text-white shadow-lg' 
                    : (isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600')
                }`}
              >
                {PRESETS[key].label}
              </button>
            ))}
        </div>

        <div className="flex justify-center mb-8">
            <button 
              onClick={resetCount} 
              className="flex flex-row items-center space-x-3 group active:scale-95 transition-all px-6 py-3 rounded-full bg-red-600/10 text-red-600 hover:bg-red-600 hover:text-white"
            >
              <RefreshCw className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Restart Count</span>
            </button>
        </div>

        <div className="text-center space-y-2 mb-4 opacity-80 min-h-[60px]">
          <p className="text-xs font-medium italic">{currentPreset.meaning}</p>
          <p className="text-[10px] leading-relaxed max-w-xs mx-auto">{currentPreset.virtue}</p>
        </div>
      </div>

      <ToolsSection isDarkMode={isDarkMode} />
      
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
