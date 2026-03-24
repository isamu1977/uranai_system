import type { Locale } from '$lib/stores/locale';

export interface TarotCard {
  id: number;
  name_jp: string;
  name_en: string;
  number: number;
  meaning_upright: string;
  meaning_reversed: string;
  love_context_upright: string;
  love_context_reversed: string;
  arcana_type: 'major' | 'minor';
  suit: 'wands' | 'cups' | 'swords' | 'pentacles' | null;
  slug: string;
}

export type Suit = 'wands' | 'cups' | 'swords' | 'pentacles';
export type ArcanaType = 'major' | 'minor';

export interface CardGlowColor {
  primary: string;
  secondary: string;
}

const CARD_GLOW_COLORS: Record<string, CardGlowColor> = {
  'the-fool': { primary: '#90EE90', secondary: '#98FB98' },
  'the-magician': { primary: '#FFD700', secondary: '#FFA500' },
  'the-high-priestess': { primary: '#9370DB', secondary: '#8A2BE2' },
  'the-empress': { primary: '#FF69B4', secondary: '#98FB98' },
  'the-emperor': { primary: '#B22222', secondary: '#8B0000' },
  'the-hierophant': { primary: '#DAA520', secondary: '#CD853F' },
  'the-lovers': { primary: '#FF6B6B', secondary: '#FF69B4' },
  'the-chariot': { primary: '#C0C0C0', secondary: '#4169E1' },
  'strength': { primary: '#FF8C00', secondary: '#FF6347' },
  'the-hermit': { primary: '#708090', secondary: '#2F4F4F' },
  'wheel-of-fortune': { primary: '#FFD700', secondary: '#9370DB' },
  'justice': { primary: '#00CED1', secondary: '#4682B4' },
  'the-hanged-man': { primary: '#87CEEB', secondary: '#4682B4' },
  'death': { primary: '#2F2F2F', secondary: '#4B0082' },
  'temperance': { primary: '#00CED1', secondary: '#98FB98' },
  'the-devil': { primary: '#8B0000', secondary: '#FF4500' },
  'the-tower': { primary: '#FF4500', secondary: '#FFD700' },
  'the-star': { primary: '#87CEEB', secondary: '#FFD700' },
  'the-moon': { primary: '#C0C0C0', secondary: '#9370DB' },
  'the-sun': { primary: '#FFD700', secondary: '#FFA500' },
  'judgement': { primary: '#FFD700', secondary: '#FF6B6B' },
  'the-world': { primary: '#98FB98', secondary: '#00CED1' },
};

export function getCardGlowColor(card: TarotCard): CardGlowColor {
  return CARD_GLOW_COLORS[card.slug] || { primary: '#C5A880', secondary: '#DCAE96' };
}

export function getCardImageUrl(card: TarotCard): string {
  return `/images/cards/${card.slug}.jpg`;
}

export function checkCardImageExists(card: TarotCard): boolean {
  return true;
}

function generateSlug(nameEn: string): string {
  return nameEn
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function determineArcanaType(card: Partial<TarotCard>): 'major' | 'minor' {
  if (card.arcana_type === 'minor') return 'minor';
  if (card.suit) return 'minor';
  return 'major';
}

let cardsCache: TarotCard[] | null = null;

export async function getAllCards(): Promise<TarotCard[]> {
  if (cardsCache) return cardsCache;

  const response = await fetch('/tarot_cards.json');
  const rawData = await response.json();

  cardsCache = rawData.map((card: any) => ({
    ...card,
    arcana_type: determineArcanaType(card),
    slug: generateSlug(card.name_en)
  }));

  return cardsCache!;
}

export function getCardBySlug(cards: TarotCard[], slug: string): TarotCard | undefined {
  return cards.find(card => card.slug === slug);
}

export function filterCards(
  cards: TarotCard[],
  searchTerm: string,
  arcanaFilter: ArcanaType | 'all',
  suitFilter: Suit | 'all'
): TarotCard[] {
  return cards.filter(card => {
    const matchesSearch = searchTerm === '' ||
      card.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.name_jp.includes(searchTerm);

    const matchesArcana = arcanaFilter === 'all' || card.arcana_type === arcanaFilter;
    const matchesSuit = suitFilter === 'all' || card.suit === suitFilter;

    return matchesSearch && matchesArcana && matchesSuit;
  });
}

export function getCardName(card: TarotCard, locale: Locale): string {
  if (locale === 'ja') return card.name_jp;
  return card.name_en;
}

export function getSuitName(suit: Suit, locale: Locale): string {
  const suitNames: Record<Suit, Record<'en' | 'ja', string>> = {
    wands: { en: 'Wands', ja: 'ワンド' },
    cups: { en: 'Cups', ja: 'カップ' },
    swords: { en: 'Swords', ja: '剣' },
    pentacles: { en: 'Pentacles', ja: '(金貨)' }
  };
  return suitNames[suit][locale === 'ja' ? 'ja' : 'en'];
}

export function getArcanaName(type: ArcanaType, locale: Locale): string {
  return locale === 'ja'
    ? (type === 'major' ? '大牌 (Major)' : '小牌 (Minor)')
    : type === 'major' ? 'Major Arcana' : 'Minor Arcana';
}
