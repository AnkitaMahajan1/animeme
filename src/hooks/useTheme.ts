import { useEffect, useState } from 'react';

export const THEMES = ['neon', 'sakura', 'cyberpunk', 'matrix', 'sunset', 'light'] as const;

export type Theme = (typeof THEMES)[number];

export const THEME_META: Record<Theme, { label: string; swatch: string }> = {
  neon: { label: 'Neon', swatch: 'linear-gradient(135deg,#ff2e88,#a855f7,#22d3ee)' },
  sakura: { label: 'Sakura', swatch: 'linear-gradient(135deg,#ff8fab,#d67ab8,#ffc8dd)' },
  cyberpunk: { label: 'Cyberpunk', swatch: 'linear-gradient(135deg,#fcee21,#00e5ff,#ff006e)' },
  matrix: { label: 'Matrix', swatch: 'linear-gradient(135deg,#00ff66,#00c853,#66ff99)' },
  sunset: { label: 'Sunset', swatch: 'linear-gradient(135deg,#ff8a4c,#f4599b,#8a63f0)' },
  light: { label: 'Light', swatch: 'linear-gradient(135deg,#ffffff,#ede9fe,#ec407a)' },
};

const DEFAULT_THEME: Theme = 'neon';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return { theme, setTheme };
}
