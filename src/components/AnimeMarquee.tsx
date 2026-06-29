interface Tag {
  symbol: string;
  label: string;
}

const TAGS: Tag[] = [
  { symbol: '\u2728', label: 'Kawaii' },
  { symbol: '\u2744\uFE0F', label: 'Cool' },
  { symbol: '\uD83D\uDD25', label: 'Villain' },
  { symbol: '\u2694\uFE0F', label: 'Samurai' },
  { symbol: '\uD83D\uDD2E', label: 'Mage' },
  { symbol: '\uD83C\uDF38', label: 'Sakura Spirit' },
  { symbol: '\uD83D\uDC09', label: 'Dragon Soul' },
  { symbol: '\uD83C\uDF8C', label: 'Senpai' },
  { symbol: '\uD83C\uDF65', label: 'Ramen Lover' },
  { symbol: '\u26E9\uFE0F', label: 'Shrine Keeper' },
];

export default function AnimeMarquee() {
  const items = [...TAGS, ...TAGS];

  return (
    <div className="group relative w-full overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused]">
        {items.map((tag, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-fg/10 bg-fg/5 px-3.5 py-1.5 text-xs font-medium text-fg/70 backdrop-blur-sm transition hover:border-neon-pink/50 hover:text-fg"
          >
            <span aria-hidden className="text-sm">
              {tag.symbol}
            </span>
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  );
}
