import { Injectable, OnDestroy, signal } from '@angular/core';

export const REMINDER_DELAY = 3000;

/** Presentation only: remembers called balls that have been waiting longer than the delay. */
@Injectable()
export class BingoReminders implements OnDestroy {
  readonly missed = signal<ReadonlySet<number>>(new Set());
  private readonly timers = new Map<number, ReturnType<typeof setTimeout>>();

  watch(ball: number): void {
    this.timers.set(ball, setTimeout(() => this.remind(ball), REMINDER_DELAY));
  }

  reset(): void {
    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers.clear();
    this.missed.set(new Set());
  }

  ngOnDestroy(): void {
    this.reset();
  }

  private remind(ball: number): void {
    this.timers.delete(ball);
    this.missed.update((balls) => new Set(balls).add(ball));
  }
}
