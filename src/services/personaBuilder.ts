import { toKatakana } from 'wanakana';
import meaningMapRaw from '../data/meaningMap.json';
import type {
  AnimeRec,
  Element,
  JapaneseName,
  MeaningCategory,
  Persona,
  Stats,
  Vibe,
} from '../types';

const meaningMap = meaningMapRaw as Record<MeaningCategory, JapaneseName[]>;

const CATEGORY_ELEMENT: Record<MeaningCategory, Element> = {
  light: 'light',
  love: 'light',
  strength: 'fire',
  wisdom: 'water',
  victory: 'fire',
  beauty: 'light',
  peace: 'water',
  star: 'light',
  flower: 'wind',
  fortune: 'light',
  devotion: 'shadow',
  fire: 'fire',
  water: 'water',
  sky: 'wind',
};

const VIBE_ARCHETYPE: Record<Vibe, string> = {
  kawaii: 'The Cheerful Spirit',
  cool: 'The Lone Wanderer',
  villain: 'The Fallen Sovereign',
  samurai: 'The Blade Master',
  mage: 'The Arcane Sage',
};

const TAGLINES: Record<Vibe, string[]> = {
  kawaii: ['Heart of Sunshine', 'Sweet but Unstoppable', 'Sparkle of the Squad'],
  cool: ['The Silent Blade', 'Calm Before the Storm', 'Shadow of Few Words'],
  villain: ['Born from the Abyss', 'No Mercy, No Chains', 'The Throne of Ruin'],
  samurai: ['One Cut, One Soul', 'Bound by the Bushido', 'Edge of Honor'],
  mage: ['Weaver of Forbidden Spells', 'Keeper of Ancient Truths', 'Voice of the Stars'],
};

const VIBE_AVATAR: Record<Vibe, string> = {
  kawaii: '/avatars/kawaii.svg',
  cool: '/avatars/cool.svg',
  villain: '/avatars/villain.svg',
  samurai: '/avatars/samurai.svg',
  mage: '/avatars/mage.svg',
};

const VIBE_ANIME: Record<Vibe, AnimeRec[]> = {
  kawaii: [
    { title: 'K-On!', reason: 'Pure cozy, feel-good energy' },
    { title: 'Toradora!', reason: 'Sweet, heartfelt and a little chaotic' },
    { title: 'Spy x Family', reason: 'Charming, warm and adorable' },
  ],
  cool: [
    { title: 'Cowboy Bebop', reason: 'Stylish lone-wanderer vibes' },
    { title: 'Samurai Champloo', reason: 'Calm, cool and effortlessly slick' },
    { title: 'Jujutsu Kaisen', reason: 'Composed power under pressure' },
  ],
  villain: [
    { title: 'Death Note', reason: 'For the mastermind in you' },
    { title: 'Code Geass', reason: 'Grand ambition and bold schemes' },
    { title: 'Attack on Titan', reason: 'Ruthless resolve, no limits' },
  ],
  samurai: [
    { title: 'Demon Slayer', reason: 'Blade, honor and relentless resolve' },
    { title: 'Rurouni Kenshin', reason: 'A warrior bound by a code' },
    { title: 'Vagabond', reason: 'The path of the true swordsman' },
  ],
  mage: [
    { title: 'Frieren', reason: 'Quiet wisdom and ancient magic' },
    { title: 'Fate/stay night', reason: 'Spellcraft and arcane battles' },
    { title: 'Mushoku Tensei', reason: 'A scholar of the mystic arts' },
  ],
};

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function buildStats(seed: number, vibe: Vibe): Stats {
  const base = (offset: number) => 55 + ((seed >> offset) % 46); // 55-100
  const stats: Stats = {
    power: base(0),
    spirit: base(3),
    speed: base(6),
    wisdom: base(9),
  };
  if (vibe === 'villain') stats.power = Math.min(100, stats.power + 10);
  if (vibe === 'mage') stats.wisdom = Math.min(100, stats.wisdom + 10);
  if (vibe === 'samurai') stats.speed = Math.min(100, stats.speed + 10);
  if (vibe === 'kawaii') stats.spirit = Math.min(100, stats.spirit + 10);
  return stats;
}

export interface BuildInput {
  indianName: string;
  meaning: string;
  category: MeaningCategory;
  vibe: Vibe;
  source: Persona['source'];
}

export function buildPersona({
  indianName,
  meaning,
  category,
  vibe,
  source,
}: BuildInput): Persona {
  const seed = hashString(indianName.toLowerCase() + vibe);
  const pool = meaningMap[category] ?? meaningMap.light;
  const jp = pick(pool, seed);
  const tagline = pick(TAGLINES[vibe], seed >> 2);

  const display = indianName.charAt(0).toUpperCase() + indianName.slice(1).toLowerCase();

  return {
    indianName: display,
    meaning,
    category,
    animeName: jp.romaji,
    kana: jp.kana || toKatakana(jp.romaji),
    kanji: jp.kanji,
    japaneseMeaning: jp.meaning,
    tagline,
    element: CATEGORY_ELEMENT[category],
    archetype: VIBE_ARCHETYPE[vibe],
    vibe,
    stats: buildStats(seed, vibe),
    avatar: VIBE_AVATAR[vibe],
    recommendation: pick(VIBE_ANIME[vibe], seed >> 4),
    source,
  };
}
