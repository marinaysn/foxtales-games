import { Component, inject, input, output } from '@angular/core';
import { DEMO_CALLS_DONE, POOL_SIZE, ROUND_CALLS } from '../../demo/demo-round';
import { BingoDemoStore, MAX_CARDS } from '../../state/bingo-demo.store';

@Component({
  selector: 'ft-bingo-controls',
  styleUrl: './bingo-controls.scss',
  templateUrl: './bingo-controls.html',
})
export class BingoControls {
  readonly store = inject(BingoDemoStore);
  readonly running = input(false);
  readonly start = output();
  readonly restart = output();
  readonly pool = POOL_SIZE;
  readonly calls = ROUND_CALLS;
  readonly done = DEMO_CALLS_DONE;
  readonly choices = Array.from({ length: MAX_CARDS }, (_, index) => index + 1);
}
