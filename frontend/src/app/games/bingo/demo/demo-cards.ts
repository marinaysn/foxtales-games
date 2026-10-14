/**
 * DEMONSTRATION DATA ONLY. Not server-authoritative.
 * Random demo cards, one set per round, until the C# CardGenerator is connected. Delete this file then.
 * Row-major 5x5 cards. null is the FREE center.
 */
export type DemoCard = readonly (number | null)[];

export const CARD_COUNT = 6;

const CENTER = 12;

export function shuffled(values: readonly number[], random: () => number): number[] {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index--) {
    const swap = Math.floor(random() * (index + 1));
    [result[index], result[swap]] = [result[swap], result[index]];
  }
  return result;
}

export function range(first: number, last: number): number[] {
  return Array.from({ length: last - first + 1 }, (_, offset) => first + offset);
}

function newCard(random: () => number): DemoCard {
  const columns = range(0, 4).map((column) => shuffled(range(column * 15 + 1, column * 15 + 15), random).slice(0, 5));
  return range(0, 24).map((index) => (index === CENTER ? null : columns[index % 5][Math.floor(index / 5)]));
}

export function newDemoCards(random: () => number = Math.random): DemoCard[] {
  return range(1, CARD_COUNT).map(() => newCard(random));
}
