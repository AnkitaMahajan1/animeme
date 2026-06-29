import { motion } from 'framer-motion';

const GLYPHS = ['\u5149', '\u5922', '\u9b42', '\u661f', '\u5263', '\u82b1', '\u96f7', '\u5fc3'];

export default function RevealSequence() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center gap-8 py-10"
    >
      <div className="relative h-40 w-40">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-neon-pink/60"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-3 rounded-full border-2 border-dashed border-neon-cyan/60"
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-8 rounded-full border-2 border-neon-purple/70"
          animate={{ rotate: 360 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            key="glyph"
            className="font-jp text-5xl text-gradient"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            {GLYPHS.map((g, i) => (
              <motion.span
                key={i}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
              >
                {g}
              </motion.span>
            ))}
          </motion.span>
        </div>
      </div>
      <motion.p
        className="font-display text-lg tracking-widest text-fg/80"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        SUMMONING YOUR PERSONA...
      </motion.p>
    </motion.div>
  );
}
