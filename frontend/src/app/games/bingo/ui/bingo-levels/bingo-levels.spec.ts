import { TestBed } from '@angular/core/testing';
import { BingoLevels } from './bingo-levels';

function levels(): BingoLevels {
  return TestBed.createComponent(BingoLevels).componentInstance;
}

describe('BingoLevels', () => {
  it('adds one distinct line per step', () => {
    const page = levels();
    const counts = [1, 2, 3, 4, 5].map(() => {
      page.advance();
      return page.store.lines()[0];
    });
    expect(counts).toEqual([1, 2, 3, 4, 5]);
  });

  it('locks the card at the fifth line', () => {
    const page = levels();
    for (let step = 0; step < 5; step++) page.advance();
    expect(page.store.locked()[0]).toBe(true);
  });

  it('refuses the spare called number once locked', () => {
    const page = levels();
    for (let step = 0; step < 5; step++) page.advance();
    page.store.daub(0, page.store.deal()[0][21]!);
    expect(page.store.marked()[0].has(page.store.deal()[0][21]!)).toBe(false);
  });

  it('starts over on reset', () => {
    const page = levels();
    page.advance();
    page.reset();
    expect(page.store.lines()[0]).toBe(0);
  });
});