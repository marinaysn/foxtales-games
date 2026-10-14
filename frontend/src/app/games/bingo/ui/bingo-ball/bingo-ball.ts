import { Component, computed, input } from '@angular/core';
import { letterOf } from '../../domain/ball-letter';

@Component({
  selector: 'ft-bingo-ball',
  styleUrl: './bingo-ball.scss',
  templateUrl: './bingo-ball.html',
  host: {
    role: 'img',
    '[attr.aria-label]': 'letter() + " " + ball()',
    '[attr.data-letter]': 'letter()',
    '[attr.data-size]': 'size()',
  },
})
export class BingoBall {
  readonly ball = input.required<number>();
  readonly size = input<'large' | 'small'>('small');
  readonly letter = computed(() => letterOf(this.ball()));
}
