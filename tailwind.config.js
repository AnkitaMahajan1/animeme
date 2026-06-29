/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Orbitron"', 'sans-serif'],
        body: ['"Poppins"', 'sans-serif'],
        jp: ['"Noto Sans JP"', 'sans-serif'],
      },
      colors: {
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        fg: 'rgb(var(--color-fg) / <alpha-value>)',
        neon: {
          pink: 'rgb(var(--color-neon-pink) / <alpha-value>)',
          purple: 'rgb(var(--color-neon-purple) / <alpha-value>)',
          cyan: 'rgb(var(--color-neon-cyan) / <alpha-value>)',
          gold: 'rgb(var(--color-neon-gold) / <alpha-value>)',
        },
      },
      boxShadow: {
        glow: '0 0 40px -5px rgb(var(--color-neon-purple) / 0.6)',
        'glow-pink': '0 0 40px -5px rgb(var(--color-neon-pink) / 0.6)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 4s linear infinite',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
};
