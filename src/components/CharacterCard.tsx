import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import type { Element, Persona, Stats } from '../types';

const ELEMENT_THEME: Record<
  Element,
  { label: string; symbol: string; from: string; to: string; ring: string }
> = {
  fire: { label: 'Fire', symbol: '\uD83D\uDD25', from: 'from-orange-500', to: 'to-rose-600', ring: 'ring-orange-400/40' },
  water: { label: 'Water', symbol: '\uD83C\uDF0A', from: 'from-cyan-500', to: 'to-blue-600', ring: 'ring-cyan-400/40' },
  wind: { label: 'Wind', symbol: '\uD83C\uDF43', from: 'from-emerald-400', to: 'to-teal-600', ring: 'ring-emerald-400/40' },
  shadow: { label: 'Shadow', symbol: '\uD83C\uDF11', from: 'from-violet-600', to: 'to-indigo-800', ring: 'ring-violet-400/40' },
  light: { label: 'Light', symbol: '\u2728', from: 'from-amber-300', to: 'to-pink-500', ring: 'ring-amber-300/40' },
};

const STAT_LABELS: Record<keyof Stats, string> = {
  power: 'Power',
  spirit: 'Spirit',
  speed: 'Speed',
  wisdom: 'Wisdom',
};

interface Props {
  persona: Persona;
}

const CharacterCard = forwardRef<HTMLDivElement, Props>(({ persona }, ref) => {
  const theme = ELEMENT_THEME[persona.element];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, rotateX: -10 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 14 }}
      className={`relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl bg-gradient-to-br ${theme.from} ${theme.to} p-[2px] shadow-glow`}
    >
      <div className="relative rounded-3xl bg-[#0b0a17]/95 p-5 sm:p-7">
        <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium text-white sm:px-3 sm:text-xs">
          <span aria-hidden>{theme.symbol}</span>
          {theme.label}
        </div>

        <div className={`mx-auto mb-4 h-28 w-28 overflow-hidden rounded-2xl bg-white/5 ring-2 ${theme.ring} sm:h-32 sm:w-32`}>
          <img
            src={persona.avatar}
            alt={`${persona.archetype} portrait`}
            crossOrigin="anonymous"
            className="h-full w-full object-cover"
          />
        </div>

        <p className="text-center text-[10px] uppercase tracking-[0.3em] text-violet-200/70 sm:text-xs">{persona.archetype}</p>

        <div className="mt-3 flex items-end justify-between gap-3">
          <h2 className="font-display text-3xl font-black leading-none text-gradient sm:text-4xl">
            {persona.animeName}
          </h2>
          <span className="font-jp text-3xl font-black text-white/90 sm:text-4xl">{persona.kanji}</span>
        </div>
        <p className="mt-1 font-jp text-base text-violet-200/80 sm:text-lg">
          {persona.kana} <span className="text-violet-200/50">| {persona.japaneseMeaning}</span>
        </p>

        <p className="mt-4 text-base italic text-white/90 sm:text-lg">&ldquo;{persona.tagline}&rdquo;</p>

        <div className="mt-5 rounded-2xl bg-white/5 p-3.5 text-xs sm:p-4 sm:text-sm">
          <p className="text-violet-200/70">
            From <span className="font-semibold text-white">{persona.indianName}</span>
          </p>
          <p className="text-violet-200/60">meaning &ldquo;{persona.meaning}&rdquo;</p>
        </div>

        <div className="mt-5 space-y-2.5">
          {(Object.keys(persona.stats) as (keyof Stats)[]).map((key) => (
            <div key={key} className="flex items-center gap-3">
              <span className="w-16 shrink-0 text-xs uppercase tracking-wide text-violet-200/70">
                {STAT_LABELS[key]}
              </span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${theme.from} ${theme.to}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${persona.stats[key]}%` }}
                  transition={{ duration: 0.9, delay: 0.2 }}
                />
              </div>
              <span className="w-8 text-right text-xs font-semibold text-white">
                {persona.stats[key]}
              </span>
            </div>
          ))}
        </div>

        <div className={`mt-5 rounded-2xl border border-white/10 bg-gradient-to-br ${theme.from} ${theme.to} p-[1px]`}>
          <div className="rounded-2xl bg-[#0b0a17]/90 p-3.5 sm:p-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-violet-200/60">Watch Next</p>
            <p className="mt-1 font-display text-base font-bold text-white sm:text-lg">
              {persona.recommendation.title}
            </p>
            <p className="text-xs text-violet-200/60 sm:text-sm">{persona.recommendation.reason}</p>
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] uppercase tracking-[0.25em] text-violet-200/40">
          animeme.app
        </p>
      </div>
    </motion.div>
  );
});

CharacterCard.displayName = 'CharacterCard';

export default CharacterCard;
