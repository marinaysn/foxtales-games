import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { letterOf } from '../../domain/ball-letter';
import { MAX_LINES, tierOf, titleOf } from '../../domain/bingo-level';

type CellState = 'idle' | 'ready' | 'marked' | 'free';

interface Cell {
  index: number;
  ball: number | null;
  state: CellState;
  label: string;
  winning: boolean;
  missed: boolean;
}

@Component({
  imports: [NgTemplateOutlet],
  selector: 'ft-bingo-card',
  styleUrls: ['./bingo-card.scss', './bingo-card-tiers.scss'],
  templateUrl: './bingo-card.html',
})
export class BingoCard {
  readonly card = input.required<readonly (number | null)[]>();
  readonly called = input.required<readonly number[]>();
  readonly marked = input.required<ReadonlySet<number>>();
  readonly winning = input.required<readonly number[]>();
  readonly missed = input.required<ReadonlySet<number>>();
  readonly number = input.required<number>();
  readonly lines = input.required<number>();
  readonly won = computed(() => this.lines() > 0);
  readonly locked = computed(() => this.lines() >= MAX_LINES);
  readonly tier = computed(() => tierOf(this.lines()));
  readonly title = computed(() => titleOf(this.lines()));
  readonly extent = computed(() => this.title() + (this.lines() > 1 ? ' (' + this.lines() + ' lines)' : ''));
  readonly daub = output<number>();
  readonly letters = ['B', 'I', 'N', 'G', 'O'];
  readonly cells = computed(() => this.card().map((ball, index) => this.cellOf(ball, index)));

  private cellOf(ball: number | null, index: number): Cell {
    const state = this.stateOf(ball);
    const winning = this.winning().includes(index);
    const missed = state === 'ready' && this.missed().has(ball!);
    return { index, ball, state, winning, missed, label: this.labelOf(ball, state) };
  }

  private stateOf(ball: number | null): CellState {
    if (ball === null) return 'free';
    if (this.marked().has(ball)) return 'marked';
    return this.called().includes(ball) && !this.locked() ? 'ready' : 'idle';
  }

  private labelOf(ball: number | null, state: CellState): string {
    if (ball === null) return 'Free space, marked';
    const name = `${letterOf(ball)} ${ball}`;
    if (state === 'ready') return `${name}, called, awaiting marking. Press to mark`;
    if (state === 'marked') return `${name}, marked`;
    return this.locked() ? `${name}, card locked` : `${name}, not called yet`;
  }
}
