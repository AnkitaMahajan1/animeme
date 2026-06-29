import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Vibe } from '../types';

interface VibeOption {
  id: Vibe;
  label: string;
  symbol: string;
}

const VIBES: VibeOption[] = [
  { id: 'kawaii', label: 'Cute', symbol: '\u2728' },
  { id: 'cool', label: 'Cool', symbol: '\u2744' },
  { id: 'villain', label: 'Villain', symbol: '\uD83D\uDD25' },
  { id: 'samurai', label: 'Samurai', symbol: '\u2694' },
  { id: 'mage', label: 'Wizard', symbol: '\uD83D\uDD2E' },
];

interface Props {
  initialName?: string;
  loading: boolean;
  error: string | null;
  onGenerate: (name: string, vibe: Vibe) => void;
}

export default function NameForm({ initialName = '', loading, error, onGenerate }: Props) {
  const [name, setName] = useState(initialName);
  const [vibe, setVibe] = useState<Vibe>('cool');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(name, vibe);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass mx-auto w-full max-w-md rounded-3xl p-5 shadow-glow sm:p-8"
    >
      <label htmlFor="name" className="mb-2 block text-xs font-medium text-fg/80 sm:text-sm">
        Enter your name
      </label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Ankita"
        autoComplete="off"
        className="w-full rounded-2xl border border-fg/15 bg-fg/5 px-4 py-2.5 text-base text-fg outline-none transition placeholder:text-fg/40 focus:border-neon-pink focus:ring-2 focus:ring-neon-pink/40 sm:py-3 sm:text-lg"
      />

      <p className="mb-2 mt-5 text-xs font-medium text-fg/80 sm:mt-6 sm:text-sm">Choose your vibe</p>
      <div className="flex flex-wrap gap-2">
        {VIBES.map((v) => {
          const active = v.id === vibe;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => setVibe(v.id)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition sm:px-4 sm:py-2 sm:text-sm ${
                active
                  ? 'border-transparent bg-gradient-to-r from-neon-pink to-neon-purple text-white shadow-glow-pink'
                  : 'border-fg/15 bg-fg/5 text-fg/70 hover:border-fg/30'
              }`}
            >
              <span aria-hidden>{v.symbol}</span>
              {v.label}
            </button>
          );
        })}
      </div>

      {error && (
        <p className="mt-4 text-sm text-rose-400" role="alert">
          {error}
        </p>
      )}

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.03 }}
        whileTap={{ scale: loading ? 1 : 0.97 }}
        className="mt-6 w-full rounded-2xl bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan bg-[length:200%_auto] py-3 text-base font-semibold text-white shadow-glow transition hover:bg-right disabled:cursor-not-allowed disabled:opacity-60 sm:py-3.5 sm:text-lg"
      >
        {loading ? 'Summoning...' : 'Reveal My Anime Persona'}
      </motion.button>
    </motion.form>
  );
}
