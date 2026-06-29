import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ParticlesBackground from './components/ParticlesBackground';
import FloatingIcons from './components/FloatingIcons';
import AnimeMarquee from './components/AnimeMarquee';
import NameForm from './components/NameForm';
import RevealSequence from './components/RevealSequence';
import CharacterCard from './components/CharacterCard';
import ShareBar from './components/ShareBar';
import ThemeSwitcher from './components/ThemeSwitcher';
import { useGenerate } from './hooks/useGenerate';
import { useTheme } from './hooks/useTheme';
import type { Vibe } from './types';

const VALID_VIBES: Vibe[] = ['kawaii', 'cool', 'villain', 'samurai', 'mage'];

export default function App() {
  const { status, persona, error, generate, reset } = useGenerate();
  const { theme, setTheme } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);

  const params = new URLSearchParams(window.location.search);
  const initialName = params.get('name') ?? '';

  useEffect(() => {
    const name = params.get('name');
    const vibeParam = params.get('vibe') as Vibe | null;
    const vibe = vibeParam && VALID_VIBES.includes(vibeParam) ? vibeParam : 'cool';
    if (name) {
      generate(name, vibe);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <ParticlesBackground theme={theme} />
      <FloatingIcons />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-start px-4 pb-12 pt-14 sm:pt-20">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex w-full justify-center sm:justify-end"
        >
          <ThemeSwitcher theme={theme} onChange={setTheme} />
        </motion.div>

        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6 flex w-full flex-col items-center text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
            className="flex items-center gap-3"
          >
            <motion.span
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-pink/30 to-neon-purple/30 ring-1 ring-fg/15 sm:h-14 sm:w-14"
            >
              <span className="absolute inset-0 animate-pulse rounded-2xl bg-neon-purple/30 blur-lg" />
              <img src="/torii.svg" alt="AnimeMe logo" className="relative h-7 w-7 sm:h-8 sm:w-8" />
            </motion.span>
            <span className="flex flex-col items-start leading-none">
              <span className="font-display text-3xl font-black tracking-tight text-gradient animate-shimmer sm:text-4xl">
                AnimeMe
              </span>
              <span className="mt-1 font-jp text-[10px] tracking-[0.35em] text-fg/50 sm:text-xs">
                アニメミー
              </span>
            </span>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-fg/10 bg-fg/5 px-4 py-1.5 text-xs font-medium text-fg/80 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-pink opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-pink" />
            </span>
            <span aria-hidden>{'\u2728'}</span> Your anime alter-ego awaits
          </motion.span>
          <h1 className="mx-auto mt-3 max-w-xs text-balance text-sm font-medium text-fg/80 sm:max-w-none sm:text-lg">
            Turn your name into a meaning-based anime persona.
          </h1>
          <div className="mt-6 w-full">
            <AnimeMarquee />
          </div>
        </motion.header>

        <div className="w-full">
          <AnimatePresence mode="wait">
            {status === 'loading' && <RevealSequence key="loading" />}

            {status === 'revealed' && persona && (
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <CharacterCard ref={cardRef} persona={persona} />
                <ShareBar cardRef={cardRef} persona={persona} onAgain={reset} />
                {persona.source === 'algorithm' && (
                  <p className="mx-auto mt-4 max-w-sm text-center text-xs text-fg/50">
                    We did not recognize this name, so we crafted a persona from its sound.
                  </p>
                )}
              </motion.div>
            )}

            {(status === 'idle' || status === 'error') && (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <NameForm
                  initialName={initialName}
                  loading={false}
                  error={error}
                  onGenerate={generate}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <footer className="mt-12 text-center text-xs text-fg/40">
          Made for fun. A playful homage to anime culture.
        </footer>
      </main>
    </div>
  );
}
