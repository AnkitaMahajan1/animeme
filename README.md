# AnimeMe — Anime Persona Generator

Turn an Indian name into a meaning-based anime persona, rendered as an animated, shareable character card.

## How it works

1. You enter a name and pick a vibe (Kawaii, Cool, Villain, Samurai, Mage).
2. The app resolves the name's meaning using a **hybrid** strategy:
   - First it checks a curated dataset of popular Indian names (`src/data/names.json`).
   - If the name is unknown and an AI key is configured, it asks a serverless function (`api/generate.ts`).
   - Otherwise it falls back to a built-in algorithmic generator (always works, offline).
3. The meaning's theme category maps to a Japanese name (`src/data/meaningMap.json`), and a persona is assembled with katakana/kanji, an element, an archetype, stats, and a tagline.
4. You can download the card as an image or copy a share link that auto-generates the persona.

## Tech stack

- React + Vite + TypeScript
- Tailwind CSS for styling
- Framer Motion for animation
- tsParticles for the ambient background
- wanakana for romaji → katakana
- html-to-image for card export

## Getting started

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## AI fallback (optional)

The app is fully functional without any API key. To enable dynamic meaning lookup for
names outside the curated dataset, deploy on Vercel (or any platform supporting the
`api/` serverless function) and set:

```
OPENAI_API_KEY=...
```

See `.env.example`.

## Project structure

```
api/generate.ts            Serverless AI fallback (key stays server-side)
src/data/names.json        Curated Indian names -> meaning + category
src/data/meaningMap.json   Category -> Japanese name pool
src/services/resolveName   Hybrid resolution (dataset -> AI -> algorithm)
src/services/personaBuilder Assembles the final persona
src/hooks/useGenerate      idle -> loading -> revealed/error state machine
src/components/*            UI: particles, form, reveal, card, share bar
```

## Note

This is a playful homage to anime culture. Japanese transliterations are approximate and meant for fun.
