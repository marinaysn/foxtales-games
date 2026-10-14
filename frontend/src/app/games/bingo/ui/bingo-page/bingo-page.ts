import { Component, OnDestroy, computed, inject, signal } from '@angular/core';
import { DEMO_LABEL } from '../../demo/demo-round';
import { BingoDemoStore } from '../../state/bingo-demo.store';
import { BingoReminders } from '../../state/bingo-reminders';
import { BingoBall } from '../bingo-ball/bingo-ball';
import { BingoCard } from '../bingo-card/bingo-card';
import { BingoCelebration } from '../bingo-celebration/bingo-celebration';
import { BingoControls } from '../bingo-controls/bingo-controls';
import { BingoScene } from '../bingo-scene/bingo-scene';

const DRAW_INTERVAL = 3000;

@Component({
  imports: [BingoBall, BingoCard, BingoCelebration, BingoControls, BingoScene],
  providers: [BingoDemoStore, BingoReminders],
  selector: 'ft-bingo-page',
  styleUrl: './bingo-page.scss',
  templateUrl: './bingo-page.html',
})
export class BingoPage implements OnDestroy {
  readonly store = inject(BingoDemoStore);
  readonly reminders = inject(BingoReminders);
  readonly label = DEMO_LABEL;
  readonly latest = computed(() => this.store.drawn().slice(-1));
  readonly history = computed(() => [...this.store.drawn()].reverse());
  readonly running = signal(false);
  private timer?: ReturnType<typeof setInterval>;

  start(): void {
    if (this.timer) return;
    this.draw();
    this.timer = setInterval(() => this.tick(), DRAW_INTERVAL);
    this.running.set(true);
  }

  private draw(): void {
    this.store.draw();
    const ball = this.store.current();
    if (ball !== undefined && this.store.cards().some((card) => card.includes(ball))) this.reminders.watch(ball);
  }

  restart(): void {
    this.stop();
    this.store.restart();
    this.reminders.reset();
  }

  ngOnDestroy(): void {
    this.stop();
  }

  private tick(): void {
    if (this.store.canDraw()) this.draw();
    else this.stop();
  }

  private stop(): void {
    clearInterval(this.timer);
    this.timer = undefined;
    this.running.set(false);
  }
}
