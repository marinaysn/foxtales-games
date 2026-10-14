import { Component, computed, input } from '@angular/core';

import { tierOf, titleOf } from '../../domain/bingo-level';

@Component({
  selector: 'ft-bingo-celebration',
  styleUrl: './bingo-celebration.scss',
  templateUrl: './bingo-celebration.html',
})
export class BingoCelebration {
  readonly card = input.required<number>();
  readonly lines = input.required<number>();
  readonly title = computed(() => titleOf(this.lines()));
  readonly tier = computed(() => tierOf(this.lines()));
  readonly sparks = Array.from({ length: 8 }, (_, index) => index);
}
