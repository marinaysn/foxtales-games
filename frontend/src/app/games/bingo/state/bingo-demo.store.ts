import { Injectable, computed, signal } from '@angular/core';
import { CARD_COUNT, newDemoCards } from '../demo/demo-cards';
import { MAX_LINES } from '../domain/bingo-level';
import { LINES, POOL_SIZE, ROUND_CALLS, newDemoDraws } from '../demo/demo-round';

export const MAX_CARDS = CARD_COUNT;

export interface Achievement {
  id: number;
  card: number;
  lines: number;
}

/** Demo store over scripted data. A server-backed store with the same shape replaces it later. */
@Injectable()
export class BingoDemoStore {
  readonly count = signal(1);
  readonly deal = signal(newDemoCards());
  readonly cards = computed(() => this.deal().slice(0, this.count()));
  readonly draws = signal(newDemoDraws(this.deal()));
  readonly drawn = signal<readonly number[]>([]);
  readonly marked = signal<readonly ReadonlySet<number>[]>(this.emptyMarks());
  readonly achievements = signal<readonly Achievement[]>([]);
  readonly completed = computed(() => this.cards().map((_, card) => this.linesOf(card)));
  readonly lines = computed(() => this.completed().map((lines) => lines.length));
  readonly total = computed(() => this.lines().reduce((sum, count) => sum + count, 0));
  readonly winning = computed(() => this.completed().map((lines) => [...new Set(lines.flat())]));
  readonly locked = computed(() => this.lines().map((count) => count >= MAX_LINES));
  readonly current = computed(() => this.drawn().at(-1));
  readonly poolRemaining = computed(() => POOL_SIZE - this.drawn().length);
  readonly callsRemaining = computed(() => ROUND_CALLS - this.drawn().length);
  readonly won = computed(() => this.winners().length > 0);
  readonly winners = computed(() => this.lines().flatMap((count, index) => (count > 0 ? [index + 1] : [])));
  readonly canDraw = computed(() => this.callsRemaining() > 0);
  readonly canChooseCount = computed(() => this.drawn().length === 0);

  choose(count: number): void {
    if (!this.canChooseCount() || count < 1 || count > MAX_CARDS) return;
    this.count.set(count);
  }

  draw(): void {
    if (!this.canDraw()) return;
    this.drawn.update((balls) => [...balls, this.draws()[balls.length]]);
  }

  daub(card: number, ball: number): void {
    if (!this.drawn().includes(ball) || this.locked()[card]) return;
    const before = this.lines()[card];
    this.marked.update((marks) => marks.map((set, index) => (index === card ? new Set(set).add(ball) : set)));
    const after = this.lines()[card];
    if (after > before) this.achievements.update((list) => [...list, { id: list.length, card: card + 1, lines: after }]);
  }

  restart(): void {
    this.deal.set(newDemoCards());
    this.draws.set(newDemoDraws(this.deal()));
    this.drawn.set([]);
    this.marked.set(this.emptyMarks());
    this.achievements.set([]);
  }

  private emptyMarks(): readonly ReadonlySet<number>[] {
    return Array.from({ length: MAX_CARDS }, () => new Set<number>());
  }

  private linesOf(card: number): readonly (readonly number[])[] {
    return LINES.filter((line) => line.every((index) => this.covered(card, index))).slice(0, MAX_LINES);
  }

  private covered(card: number, index: number): boolean {
    const ball = this.deal()[card][index];
    return ball === null || this.marked()[card].has(ball);
  }
}
