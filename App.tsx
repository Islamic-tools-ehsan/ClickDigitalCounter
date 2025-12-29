
import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { DHIKR_PRESETS } from './constants';
import { PresetKey, AppState } from './types';
import { Header } from './components/Header';
import { CounterDisplay } from './components/CounterDisplay';
import { PresetSelector } from './components/PresetSelector';
import { VirtueDisplay } from './components/VirtueDisplay';
import { Controls } from './components/Controls';

const STORAGE_KEY = 'zen_tasbih_state_v2';

const App: React.FC = () => {
  const [completionMessage, setCompletionMessage] = useState<string | null>(null);

  // Initialize state from localStorage
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const validPresets: PresetKey[] = ['CENTURY', 'CUSTOM', 'UNLIMITED'];
        const presetId = validPresets.includes(parsed.selectedPresetId) ? parsed.selectedPresetId : 'CENTURY';
        
        return {
          ...parsed,
          selectedPresetId: presetId,
          count: parsed.count || 0,
          customTarget: parsed.customTarget || 1000,
        };
      } catch (e) {
        console.error("Failed to parse saved state", e);
      }
    }
    return {
      count: 0,
      selectedPresetId: 'CENTURY',
      customTarget: 1000,
      isDarkMode: false,
      hapticsEnabled: true,
    };
  });

  // Persist state on changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Handle completion message timer
  useEffect(() => {
    if (completionMessage) {
      const timer = setTimeout(() => {
        setCompletionMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [completionMessage]);

  const currentPreset = DHIKR_PRESETS[state.selectedPresetId];
  const effectiveTarget = state.selectedPresetId === 'CUSTOM' ? state.customTarget : (currentPreset?.target ?? null);
  const isTargetReached = effectiveTarget !== null && state.count >= effectiveTarget;

  const triggerCelebration = useCallback(() => {
    const duration = 2 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 40 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  }, []);

  const handleIncrement = useCallback(() => {
    setState(prev => {
      const nextCount = prev.count + 1;
      const target = prev.selectedPresetId === 'CUSTOM' ? prev.customTarget : DHIKR_PRESETS[prev.selectedPresetId].target;
      
      if (prev.hapticsEnabled && window.navigator.vibrate) {
        window.navigator.vibrate(40);
      }

      if (target && nextCount === target) {
        if (prev.hapticsEnabled && window.navigator.vibrate) {
           window.navigator.vibrate([100, 50, 100]);
        }
        setCompletionMessage("Alhamdulillah! Target Achieved");
        triggerCelebration();
      }

      return { ...prev, count: nextCount };
    });
  }, [triggerCelebration]);

  const handleRestartAction = useCallback(() => {
    // Instantly reset count to 0 without confirmation prompt as requested
    setState(prev => ({ ...prev, count: 0 }));
    setCompletionMessage(null);
    
    // Haptic feedback for reset action
    if (state.hapticsEnabled && window.navigator.vibrate) {
      window.navigator.vibrate(80);
    }
  }, [state.hapticsEnabled]);

  const handlePresetChange = (id: PresetKey) => {
    setState(prev => ({ ...prev, selectedPresetId: id, count: 0 }));
    setCompletionMessage(null);
  };

  const handleCustomTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || 0;
    setState(prev => ({ ...prev, customTarget: val }));
  };

  const toggleDarkMode = () => {
    setState(prev => ({ ...prev, isDarkMode: !prev.isDarkMode }));
  };

  const toggleHaptics = () => {
    setState(prev => ({ ...prev, hapticsEnabled: !prev.hapticsEnabled }));
  };

  return (
    <div className={`h-screen w-full transition-colors duration-700 flex flex-col items-center justify-between overflow-hidden ${state.isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#FDFCFB] text-slate-800'}`}>
      
      <Header 
        isDarkMode={state.isDarkMode} 
        onToggleTheme={toggleDarkMode} 
        hapticsEnabled={state.hapticsEnabled}
        onToggleHaptics={toggleHaptics}
      />

      {/* Main Interaction Area */}
      <div className="flex-1 w-full flex flex-col items-center justify-center relative">
        <div 
          onClick={handleIncrement}
          className="absolute inset-0 z-10 cursor-pointer active:opacity-90 transition-opacity"
          aria-label="Tap to count"
        />

        <div className="z-20 pointer-events-none flex flex-col items-center">
          <CounterDisplay 
            count={state.count} 
            target={effectiveTarget} 
            isDarkMode={state.isDarkMode} 
            arabic={currentPreset?.arabic || ''}
            isTargetReached={isTargetReached}
          />
          
          <div className="mt-8 text-center px-6">
            <h2 className={`text-sm font-medium tracking-widest uppercase mb-1 transition-colors duration-500 ${isTargetReached ? 'text-emerald-500' : (state.isDarkMode ? 'text-emerald-400' : 'text-emerald-700')}`}>
              {currentPreset?.label || ''}
            </h2>
            {state.selectedPresetId === 'CUSTOM' ? (
              <div className="flex items-center justify-center space-x-2 pointer-events-auto">
                <span className="text-xs opacity-60 font-poppins">{state.count} / </span>
                <input 
                  type="number"
                  value={state.customTarget}
                  onChange={handleCustomTargetChange}
                  className={`bg-transparent border-b border-dashed text-xs w-24 text-center focus:outline-none focus:border-emerald-500 transition-colors font-poppins ${state.isDarkMode ? 'border-slate-700 text-slate-300' : 'border-slate-300 text-slate-600'}`}
                  placeholder="Set target..."
                  min="1"
                />
              </div>
            ) : (
              <p className={`text-xs opacity-60 font-poppins`}>
                {state.count} / {effectiveTarget || '∞'}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="w-full z-30 flex flex-col items-center pb-8 pt-4 space-y-6 relative">
        {/* Completion Message Overlay */}
        <div className={`absolute top-0 -translate-y-20 left-0 right-0 flex justify-center px-6 transition-all duration-700 ease-out ${completionMessage ? 'opacity-100 transform translate-y-[-80px]' : 'opacity-0 pointer-events-none transform translate-y-[-60px]'}`}>
          <div className={`px-8 py-3 rounded-2xl shadow-2xl backdrop-blur-md font-poppins font-semibold text-sm tracking-wide border ${state.isDarkMode ? 'bg-emerald-500/90 text-slate-950 border-emerald-400' : 'bg-emerald-600/90 text-white border-emerald-500'}`}>
            {completionMessage || "Alhamdulillah!"}
          </div>
        </div>

        <PresetSelector 
          selectedId={state.selectedPresetId} 
          onSelect={handlePresetChange}
          isDarkMode={state.isDarkMode}
        />
        
        <VirtueDisplay 
          meaning={currentPreset?.meaning || ''} 
          virtue={currentPreset?.virtue || ''} 
          isDarkMode={state.isDarkMode}
        />

        <Controls onReset={handleRestartAction} isDarkMode={state.isDarkMode} />
      </div>

    </div>
  );
};

export default App;
