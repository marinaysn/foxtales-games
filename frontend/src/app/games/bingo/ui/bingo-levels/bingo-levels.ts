import { Component, computed, inject, signal } from '@angular/core';
import { MAX_LINES, titleOf } from '../../domain/bingo-level';
import { BingoDemoStore } from '../../state/bingo-demo.store';
import { BingoCard } from '../bingo-card/bingo-card';
import { BingoCelebration } from '../bingo-celebration/bingo-celebration';
import { BingoScene } from '../bingo-scene/bingo-scene';

const STEPS: readonly (readonly number[])[] = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21],
];

const SPARE = 21;

/** Scripted preview of the five Bingo levels on one card. Separate from normal rounds, with its own store. */
@Component({
  imports: [BingoCard, BingoCelebration, BingoScene],
  providers: [BingoDemoStore],
  selector: 'ft-bingo-levels',
  styleUrl: './bingo-levels.scss',
  templateUrl: './bingo-levels.html',
})
export class BingoLevels {
  readonly store = inject(BingoDemoStore);
  readonly step = signal(0);
  readonly none: ReadonlySet<number> = new Set();
  readonly finished = computed(() => this.step() >= STEPS.length);
  readonly next = computed(() => (this.finished() ? '' : titleOf(this.step() + 1)));

  constructor() {
    this.script();
  }

  advance(): void {
    if (this.finished()) return;
    const cells = STEPS[this.step()];
    cells.forEach(() => this.store.draw());
    cells.filter((cell) => cell !== SPARE).forEach((cell) => this.store.daub(0, this.store.deal()[0][cell]!));
    this.step.update((step) => step + 1);
  }

  reset(): void {
    this.store.restart();
    this.script();
    this.step.set(0);
  }

  private script(): void {
    const balls = STEPS.flat().map((cell) => this.store.deal()[0][cell]!);
    this.store.draws.set(balls);
  }

  readonly maximum = MAX_LINES;
}
