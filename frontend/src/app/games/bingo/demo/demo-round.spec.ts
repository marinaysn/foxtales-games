import { DemoCard, newDemoCards } from './demo-cards';
import { LINES, ROUND_CALLS, newDemoDraws } from './demo-round';

describe('newDemoDraws', () => {
  it('draws 45 distinct balls', () => {
    expect(new Set(newDemoDraws(newDemoCards())).size).toBe(ROUND_CALLS);
  });

  it('lets the first card complete a line', () => {
    const cards = newDemoCards();
    const draws = newDemoDraws(cards);
    expect(LINES.some((line) => line.every((index) => cards[0][index] === null || draws.includes(cards[0][index]!)))).toBe(true);
  });

  it('varies the order between rounds', () => {
    const orders = Array.from({ length: 5 }, () => newDemoDraws(newDemoCards()).join());
    expect(new Set(orders).size).toBeGreaterThan(1);
  });
});

describe('newDemoCards', () => {
  it('deals six cards', () => {
    expect(newDemoCards().length).toBe(6);
  });

  it('keeps FREE in the center of every card', () => {
    expect(newDemoCards().every((card) => card[12] === null)).toBe(true);
  });

  it('keeps every column inside its letter range', () => {
    expect(newDemoCards().every((card) => card.every((ball, index) => ball === null || Math.ceil(ball / 15) === (index % 5) + 1))).toBe(true);
  });

  it('never repeats a number on a card', () => {
    expect(newDemoCards().every((card) => new Set(card).size === 25)).toBe(true);
  });

  it('gives every card different numbers', () => {
    const cards: DemoCard[] = newDemoCards();
    expect(new Set(cards.map((card) => card.join())).size).toBe(6);
  });

  it('deals different cards every round', () => {
    expect(newDemoCards()[0].join()).not.toBe(newDemoCards()[0].join());
  });
});
