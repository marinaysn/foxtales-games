import { Component } from '@angular/core';

@Component({
  selector: 'ft-bingo-scene',
  styleUrl: './bingo-scene.scss',
  templateUrl: './bingo-scene.html',
})
export class BingoScene {
  readonly leaves = [0, 1, 2, 3, 4, 5];
}
