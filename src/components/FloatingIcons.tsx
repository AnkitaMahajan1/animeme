import { motion } from 'framer-motion';

interface FloatingIcon {
  symbol: string;
  className: string;
  delay: number;
  duration: number;
}

const ICONS: FloatingIcon[] = [
  { symbol: '\u2694\uFE0F', className: 'left-[6%] top-[14%] text-3xl sm:text-4xl', delay: 0, duration: 7 },
  { symbol: '\uD83C\uDF38', className: 'right-[8%] top-[10%] text-2xl sm:text-3xl', delay: 1.2, duration: 8 },
  { symbol: '\u2728', className: 'left-[14%] top-[42%] text-xl sm:text-2xl', delay: 0.6, duration: 6 },
  { symbol: '\uD83D\uDD2E', className: 'right-[10%] top-[46%] text-2xl sm:text-3xl', delay: 1.8, duration: 7.5 },
  { symbol: '\u26E9\uFE0F', className: 'left-[4%] bottom-[18%] text-2xl sm:text-3xl', delay: 0.9, duration: 9 },
  { symbol: '\uD83D\uDC09', className: 'right-[5%] bottom-[14%] text-3xl sm:text-4xl', delay: 0.3, duration: 8.5 },
  { symbol: '\uD83C\uDF8C', className: 'right-[18%] bottom-[34%] text-xl sm:text-2xl', delay: 1.5, duration: 6.5 },
  { symbol: '\uD83C\uDF65', className: 'left-[18%] bottom-[10%] text-2xl sm:text-3xl', delay: 0.4, duration: 7.2 },
];

export default function FloatingIcons() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden sm:block" aria-hidden>
      {ICONS.map((icon, i) => (
        <motion.span
          key={i}
          className={`absolute select-none opacity-30 drop-shadow-[0_0_10px_rgb(var(--color-neon-purple)/0.6)] ${icon.className}`}
          initial={{ y: 0, rotate: -8, opacity: 0 }}
          animate={{
            y: [0, -18, 0],
            rotate: [-8, 8, -8],
            opacity: [0.18, 0.4, 0.18],
          }}
          transition={{
            duration: icon.duration,
            delay: icon.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {icon.symbol}
        </motion.span>
      ))}
    </div>
  );
}
