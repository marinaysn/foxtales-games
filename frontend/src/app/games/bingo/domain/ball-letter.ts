const LETTERS = ['B', 'I', 'N', 'G', 'O'];

export function letterOf(ball: number): string {
  return LETTERS[Math.floor((ball - 1) / 15)];
}
