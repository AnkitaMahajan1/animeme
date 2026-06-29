import { motion } from 'framer-motion';
import { THEMES, THEME_META, type Theme } from '../hooks/useTheme';

interface Props {
  theme: Theme;
  onChange: (theme: Theme) => void;
}

export default function ThemeSwitcher({ theme, onChange }: Props) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 backdrop-blur-sm">
      {THEMES.map((t) => {
        const active = t === theme;
        return (
          <motion.button
            key={t}
            type="button"
            onClick={() => onChange(t)}
            title={THEME_META[t].label}
            aria-label={`${THEME_META[t].label} theme`}
            aria-pressed={active}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className={`h-5 w-5 rounded-full ring-2 transition ${
              active ? 'ring-white' : 'ring-transparent hover:ring-white/40'
            }`}
            style={{ backgroundImage: THEME_META[t].swatch }}
          />
        );
      })}
    </div>
  );
}
