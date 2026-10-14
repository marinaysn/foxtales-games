export const MAX_LINES = 5;

const TITLES = ['', 'BINGO!', 'DOUBLE BINGO!', 'TRIPLE BINGO!', 'GRANDE BINGO!', 'SUPER BINGO!'];
const TIERS = ['none', 'bingo', 'double', 'triple', 'grande', 'super'];

export function titleOf(lines: number): string {
  return TITLES[Math.min(lines, MAX_LINES)];
}

export function tierOf(lines: number): string {
  return TIERS[Math.min(lines, MAX_LINES)];
}
