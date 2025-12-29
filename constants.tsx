
import { DhikrPreset } from './types';

export const DHIKR_PRESETS: Record<string, DhikrPreset> = {
  CENTURY: {
    id: 'CENTURY',
    label: '100 Mode',
    arabic: 'لا إِلَهَ إِلا اللهُ',
    meaning: 'There is no god but Allah',
    virtue: 'Whoever says this 100 times in a day, his sins are forgiven even if they are like the foam of the sea.',
    target: 100,
  },
  CUSTOM: {
    id: 'CUSTOM',
    label: 'Custom',
    arabic: 'ذِكْر مُخَصَّص',
    meaning: 'Custom Remembrance',
    virtue: 'Set your own goal for consistent remembrance.',
    target: 0, 
  },
  UNLIMITED: {
    id: 'UNLIMITED',
    label: 'Unlimited',
    arabic: 'ذِكْر',
    meaning: 'Remembrance',
    virtue: 'The hearts find rest in the remembrance of Allah.',
    target: null,
  },
};
