import namesRaw from '../data/names.json';
import type { MeaningCategory, NameEntry, Persona, Vibe } from '../types';
import { buildPersona } from './personaBuilder';

const names = namesRaw as NameEntry[];

const nameIndex = new Map<string, NameEntry>(
  names.map((entry) => [entry.name.toLowerCase(), entry]),
);

const ALL_CATEGORIES: MeaningCategory[] = [
  'light',
  'love',
  'strength',
  'wisdom',
  'victory',
  'beauty',
  'peace',
  'star',
  'flower',
  'fortune',
  'devotion',
  'fire',
  'water',
  'sky',
];

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function normalizeName(raw: string): string {
  return raw.trim().replace(/\s+/g, ' ').toLowerCase();
}

interface AiResponse {
  meaning: string;
  category: MeaningCategory;
}

async function fetchAiMeaning(name: string): Promise<AiResponse | null> {
  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as Partial<AiResponse>;
    if (!data.meaning || !data.category) return null;
    if (!ALL_CATEGORIES.includes(data.category)) return null;
    return { meaning: data.meaning, category: data.category };
  } catch {
    return null;
  }
}

function algorithmicGuess(name: string): { meaning: string; category: MeaningCategory } {
  const seed = hashString(name);
  const category = ALL_CATEGORIES[seed % ALL_CATEGORIES.length];
  return {
    meaning: `a soul aligned with ${category}`,
    category,
  };
}

export async function resolveName(rawName: string, vibe: Vibe): Promise<Persona> {
  const normalized = normalizeName(rawName);

  const entry = nameIndex.get(normalized);
  if (entry) {
    return buildPersona({
      indianName: normalized,
      meaning: entry.meaning,
      category: entry.category,
      vibe,
      source: 'dataset',
    });
  }

  const ai = await fetchAiMeaning(normalized);
  if (ai) {
    return buildPersona({
      indianName: normalized,
      meaning: ai.meaning,
      category: ai.category,
      vibe,
      source: 'ai',
    });
  }

  const guess = algorithmicGuess(normalized);
  return buildPersona({
    indianName: normalized,
    meaning: guess.meaning,
    category: guess.category,
    vibe,
    source: 'algorithm',
  });
}
