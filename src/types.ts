export type Vibe = 'kawaii' | 'cool' | 'villain' | 'samurai' | 'mage';

export type Element = 'fire' | 'water' | 'wind' | 'shadow' | 'light';

export type MeaningCategory =
  | 'light'
  | 'love'
  | 'strength'
  | 'wisdom'
  | 'victory'
  | 'beauty'
  | 'peace'
  | 'star'
  | 'flower'
  | 'fortune'
  | 'devotion'
  | 'fire'
  | 'water'
  | 'sky';

export interface NameEntry {
  name: string;
  meaning: string;
  category: MeaningCategory;
  gender?: 'm' | 'f' | 'u';
}

export interface JapaneseName {
  romaji: string;
  kana: string;
  kanji: string;
  meaning: string;
}

export interface Stats {
  power: number;
  spirit: number;
  speed: number;
  wisdom: number;
}

export interface AnimeRec {
  title: string;
  reason: string;
}

export interface Persona {
  indianName: string;
  meaning: string;
  category: MeaningCategory;
  animeName: string;
  kana: string;
  kanji: string;
  japaneseMeaning: string;
  tagline: string;
  element: Element;
  archetype: string;
  vibe: Vibe;
  stats: Stats;
  avatar: string;
  recommendation: AnimeRec;
  source: 'dataset' | 'algorithm' | 'ai';
}

export type GenerateStatus = 'idle' | 'loading' | 'revealed' | 'error';
