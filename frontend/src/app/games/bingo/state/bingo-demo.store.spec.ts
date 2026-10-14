import { ROUND_CALLS } from '../demo/demo-round';
import { BingoDemoStore } from './bingo-demo.store';

function drawn(count: number): BingoDemoStore {
  const store = new BingoDemoStore();
  for (let index = 0; index < count; index++) store.draw();
  return store;
}

function markFirstRow(store: BingoDemoStore, card: number): void {
  const deal = store.deal();
  store.draws.set(deal[card].slice(0, 5) as number[]);
  for (let index = 0; index < 5; index++) store.draw();
  deal[card].slice(0, 5).forEach((ball) => store.daub(card, ball!));
}

function rowBalls(store: BingoDemoStore, card: number, rows: number[]): number[] {
  return rows.flatMap((row) => store.deal()[card].slice(row * 5, row * 5 + 5)).filter((ball): ball is number => ball !== null);
}

function markRows(store: BingoDemoStore, card: number, rows: number[]): void {
  const balls = rowBalls(store, card, rows);
  store.draws.set(balls);
  balls.forEach(() => store.draw());
  balls.forEach((ball) => store.daub(card, ball));
}

function lockCard(store: BingoDemoStore, card: number): number {
  const spare = store.deal()[card][21]!;
  const balls = [...rowBalls(store, card, [0, 1, 2, 3]), store.deal()[card][20]!, spare];
  store.draws.set([...balls, 75]);
  balls.forEach(() => store.draw());
  balls.slice(0, -1).forEach((ball) => store.daub(card, ball));
  return spare;
}
describe('BingoDemoStore', () => {
  it('starts with one card', () => {
    expect(new BingoDemoStore().cards().length).toBe(1);
  });

  it('shows the chosen number of cards', () => {
    const store = new BingoDemoStore();
    store.choose(6);
    expect(store.cards().length).toBe(6);
  });

  it('refuses card counts outside 1 to 6', () => {
    const store = new BingoDemoStore();
    store.choose(7);
    expect(store.count()).toBe(1);
  });

  it('keeps the card count once drawing has started', () => {
    const store = drawn(1);
    store.choose(3);
    expect(store.count()).toBe(1);
  });

  it('allows a new card count after restart', () => {
    const store = drawn(2);
    store.restart();
    store.choose(3);
    expect(store.count()).toBe(3);
  });

  it('counts calls left in the round', () => {
    expect(drawn(3).callsRemaining()).toBe(ROUND_CALLS - 3);
  });

  it('counts balls left in the pool', () => {
    expect(drawn(3).poolRemaining()).toBe(72);
  });

  it('ignores daubs on uncalled numbers', () => {
    const store = drawn(1);
    store.daub(0, store.drawn()[0] === 75 ? 74 : 75);
    expect(store.marked()[0].size).toBe(0);
  });

  it('marks only the card that was daubed', () => {
    const store = new BingoDemoStore();
    store.choose(2);
    store.draws.set([store.deal()[0][0]!]);
    store.draw();
    store.daub(0, store.deal()[0][0]!);
    expect(store.marked()[1].size).toBe(0);
  });

  it('wins when a row of one card is fully marked', () => {
    const store = new BingoDemoStore();
    markFirstRow(store, 0);
    expect(store.won()).toBe(true);
  });

  it('reports the winning line only for the card that won', () => {
    const store = new BingoDemoStore();
    store.choose(2);
    markFirstRow(store, 1);
    expect(store.winning().map((line) => line.length)).toEqual([0, 5]);
  });

  it('does not win with only the four corners marked', () => {
    const store = new BingoDemoStore();
    const corners = [0, 4, 20, 24].map((index) => store.deal()[0][index]!);
    store.draws.set(corners);
    for (let index = 0; index < 4; index++) store.draw();
    corners.forEach((ball) => store.daub(0, ball));
    expect(store.won()).toBe(false);
  });

  it('keeps drawing after a win', () => {
    const store = new BingoDemoStore();
    markFirstRow(store, 0);
    store.draws.set([...store.deal()[0].slice(0, 5), 75] as number[]);
    store.draw();
    expect(store.drawn().length).toBe(6);
  });

  it('lets a second card win in the same round', () => {
    const store = new BingoDemoStore();
    store.choose(2);
    const rows = [0, 1].map((card) => store.deal()[card].slice(0, 5) as number[]);
    store.draws.set(rows.flat());
    for (let index = 0; index < 10; index++) store.draw();
    rows.forEach((row, card) => row.forEach((ball) => store.daub(card, ball)));
    expect(store.winners()).toEqual([1, 2]);
  });

  it('keeps a card winning after later draws', () => {
    const store = new BingoDemoStore();
    markFirstRow(store, 0);
    store.draws.set([...store.deal()[0].slice(0, 5), 75] as number[]);
    store.draw();
    expect(store.winners()).toEqual([1]);
  });

  it('stops drawing after all calls', () => {
    const store = drawn(ROUND_CALLS);
    store.draw();
    expect(store.drawn().length).toBe(ROUND_CALLS);
  });

  it('still allows marking after the final call', () => {
    const store = drawn(ROUND_CALLS);
    const ball = store.drawn()[0];
    store.daub(0, ball);
    expect(store.marked()[0].has(ball)).toBe(true);
  });

  it('keeps the card count on restart', () => {
    const store = new BingoDemoStore();
    store.choose(3);
    store.draw();
    store.restart();
    expect(store.count()).toBe(3);
  });

  it('clears wins on restart', () => {
    const store = new BingoDemoStore();
    markFirstRow(store, 0);
    store.restart();
    expect(store.winners()).toEqual([]);
  });

  it('clears the round on restart', () => {
    const store = drawn(5);
    store.restart();
    expect(store.drawn().length).toBe(0);
  });

  it('counts each completed line once', () => {
    const store = new BingoDemoStore();
    markRows(store, 0, [0, 1]);
    expect(store.lines()[0]).toBe(2);
  });

  it('tracks different line counts per card', () => {
    const store = new BingoDemoStore();
    store.choose(2);
    markRows(store, 0, [0, 1]);
    expect(store.lines()).toEqual([2, 0]);
  });

  it('adds the lines of every card to the total', () => {
    const store = new BingoDemoStore();
    store.choose(2);
    markRows(store, 0, [0, 1]);
    expect(store.total()).toBe(2);
  });

  it('caps a card at five lines when one mark completes several', () => {
    const store = new BingoDemoStore();
    markRows(store, 0, [0, 1, 2, 3, 4]);
    expect(store.lines()[0]).toBe(5);
  });

  it('locks a card at five lines', () => {
    const store = new BingoDemoStore();
    lockCard(store, 0);
    expect(store.locked()[0]).toBe(true);
  });

  it('refuses marks on a locked card', () => {
    const store = new BingoDemoStore();
    const ball = lockCard(store, 0);
    store.daub(0, ball);
    expect(store.marked()[0].has(ball)).toBe(false);
  });

  it('keeps marking on the other cards after one is locked', () => {
    const store = new BingoDemoStore();
    store.choose(2);
    lockCard(store, 0);
    store.draws.set([...store.drawn(), store.deal()[1][0]!]);
    store.draw();
    store.daub(1, store.deal()[1][0]!);
    expect(store.marked()[1].size).toBe(1);
  });

  it('keeps drawing after a card is locked', () => {
    const store = new BingoDemoStore();
    lockCard(store, 0);
    const calls = store.drawn().length;
    store.draw();
    expect(store.drawn().length).toBe(calls + 1);
  });

  it('records one achievement per increase in lines', () => {
    const store = new BingoDemoStore();
    markRows(store, 0, [0, 1]);
    expect(store.achievements().map((item) => item.lines)).toEqual([1, 2]);
  });

  it('records no achievement for a mark that adds no line', () => {
    const store = new BingoDemoStore();
    markRows(store, 0, [0]);
    store.daub(0, rowBalls(store, 0, [0])[0]);
    expect(store.achievements().length).toBe(1);
  });

  it('resets lines and locks on restart', () => {
    const store = new BingoDemoStore();
    lockCard(store, 0);
    store.restart();
    expect(store.lines()).toEqual([0]);
  });

  it('unlocks the card on restart', () => {
    const store = new BingoDemoStore();
    lockCard(store, 0);
    store.restart();
    expect(store.locked()).toEqual([false]);
  });});
