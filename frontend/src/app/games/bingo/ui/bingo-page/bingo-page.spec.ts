import { TestBed } from '@angular/core/testing';
import { BingoPage } from './bingo-page';

describe('BingoPage', () => {
  afterEach(() => vi.useRealTimers());

  it('shows the 25 squares of one card by default', async () => {
    const fixture = TestBed.createComponent(BingoPage);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelectorAll('.cell').length).toBe(25);
  });

  it('shows 25 squares for every chosen card', async () => {
    const fixture = TestBed.createComponent(BingoPage);
    fixture.componentInstance.store.choose(3);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelectorAll('.cell').length).toBe(75);
  });

  it('celebrates each winning card once', async () => {
    const fixture = TestBed.createComponent(BingoPage);
    const store = fixture.componentInstance.store;
    store.choose(2);
    const rows = [0, 1].map((card) => store.deal()[card].slice(0, 5) as number[]);
    store.draws.set(rows.flat());
    for (let index = 0; index < 10; index++) store.draw();
    rows.forEach((row, card) => row.forEach((ball) => store.daub(card, ball)));
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelectorAll('ft-bingo-celebration').length).toBe(2);
  });

  it('draws a ball every three seconds with a single timer', () => {
    vi.useFakeTimers();
    const fixture = TestBed.createComponent(BingoPage);
    const page = fixture.componentInstance;
    page.start();
    page.start();
    vi.advanceTimersByTime(6000);
    expect(page.store.drawn().length).toBe(3);
  });});
