
export type PresetKey = 'CENTURY' | 'CUSTOM' | 'UNLIMITED';

export interface DhikrPreset {
  id: PresetKey;
  label: string;
  arabic: string;
  meaning: string;
  virtue: string;
  target: number | null;
}

export interface AppState {
  count: number;
  selectedPresetId: PresetKey;
  customTarget: number;
  isDarkMode: boolean;
  hapticsEnabled: boolean;
}
