import { DemoCard, range, shuffled } from './demo-cards';

/**
 * DEMONSTRATION DATA ONLY. Not server-authoritative.
 * A random draw order, scripted so the first card can reach Bingo, used until the
 * C# BallDrawer and WinDetector are connected. Delete this file then.
 */
export const LINES: readonly (readonly number[])[] = [
  [0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 17, 18, 19], [20, 21, 22, 23, 24],
  [0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22], [3, 8, 13, 18, 23], [4, 9, 14, 19, 24],
  [0, 6, 12, 18, 24], [4, 8, 12, 16, 20],
];

export function newDemoDraws(cards: readonly DemoCard[], random: () => number = Math.random): number[] {
  const line = LINES[Math.floor(random() * LINES.length)];
  const needed = line.map((index) => cards[0][index]).filter((ball): ball is number => ball !== null);
  const others = shuffled(range(1, POOL_SIZE).filter((ball) => !needed.includes(ball)), random);
  return shuffled([...needed, ...others.slice(0, ROUND_CALLS - needed.length)], random);
}

export const DEMO_LABEL = 'Demo round - not server-authoritative';

export const POOL_SIZE = 75;

export const ROUND_CALLS = 45;

export const DEMO_CALLS_DONE = 'All 45 calls completed.';
