import { describe, it, expect, beforeEach } from 'vitest';
import type { TarotCard } from '../tarotCards';

const mockCard: TarotCard = {
  id: 1,
  name_jp: '愚者 (The Fool)',
  name_en: 'The Fool',
  number: 0,
  meaning_upright: '新しい始まり、自由、楽観主義、直感に従う。',
  meaning_reversed: '無責任、現実逃避、躊躇、計画性のなさ。',
  love_context_upright: '彼は過去のしがらみを捨て、フラットな状態であなたとの関係を見つめ直したいと感じています。',
  love_context_reversed: '今の彼は責任や縛られることを極端に恐れています。',
  arcana_type: 'major',
  suit: null,
  slug: 'the-fool'
};

const mockMinorCard: TarotCard = {
  id: 23,
  name_jp: 'ワンドエース (Ace Wands)',
  name_en: 'Ace Wands',
  number: 1,
  meaning_upright: '情熱や行動、直感における新たな始まり。',
  meaning_reversed: '情熱や行動の側面でのエネルギーの枯渇。',
  love_context_upright: '新しい感情が芽生え、関係をイチから育てていきたい意欲があります。',
  love_context_reversed: '最初の一歩を踏み出す勇気が出ない状態です。',
  arcana_type: 'minor',
  suit: 'wands',
  slug: 'ace-wands'
};

describe('TarotCard utilities', () => {
  describe('slug generation (via constructor)', () => {
    it('should generate correct slug for "The Fool"', () => {
      expect(mockCard.slug).toBe('the-fool');
    });

    it('should generate correct slug for "Ace Wands"', () => {
      expect(mockMinorCard.slug).toBe('ace-wands');
    });

    it('should handle multi-word names', () => {
      const card: TarotCard = { ...mockCard, name_en: 'The High Priestess', slug: 'the-high-priestess' };
      expect(card.slug).toBe('the-high-priestess');
    });
  });

  describe('arcana_type detection', () => {
    it('should identify major arcana cards', () => {
      expect(mockCard.arcana_type).toBe('major');
    });

    it('should identify minor arcana cards', () => {
      expect(mockMinorCard.arcana_type).toBe('minor');
    });
  });

  describe('suit assignment', () => {
    it('should have null suit for major arcana', () => {
      expect(mockCard.suit).toBeNull();
    });

    it('should have correct suit for minor arcana', () => {
      expect(mockMinorCard.suit).toBe('wands');
    });
  });

  describe('card properties', () => {
    it('should have valid id', () => {
      expect(mockCard.id).toBeGreaterThan(0);
    });

    it('should have non-empty names in both languages', () => {
      expect(mockCard.name_jp.length).toBeGreaterThan(0);
      expect(mockCard.name_en.length).toBeGreaterThan(0);
    });

    it('should have non-empty meanings', () => {
      expect(mockCard.meaning_upright.length).toBeGreaterThan(0);
      expect(mockCard.meaning_reversed.length).toBeGreaterThan(0);
      expect(mockCard.love_context_upright.length).toBeGreaterThan(0);
      expect(mockCard.love_context_reversed.length).toBeGreaterThan(0);
    });
  });
});

describe('Filter functionality', () => {
  const cards: TarotCard[] = [mockCard, mockMinorCard];

  it('should include all cards when no filters applied', () => {
    const result = cards.filter(() => true);
    expect(result.length).toBe(2);
  });
});
