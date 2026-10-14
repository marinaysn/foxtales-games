import { REMINDER_DELAY, BingoReminders } from './bingo-reminders';

describe('BingoReminders', () => {
  beforeEach(() => vi.useFakeTimers());

  afterEach(() => vi.useRealTimers());

  it('does not remind before the delay', () => {
    const reminders = new BingoReminders();
    reminders.watch(53);
    vi.advanceTimersByTime(REMINDER_DELAY - 1);
    expect(reminders.missed().has(53)).toBe(false);
  });

  it('reminds after the delay', () => {
    const reminders = new BingoReminders();
    reminders.watch(53);
    vi.advanceTimersByTime(REMINDER_DELAY);
    expect(reminders.missed().has(53)).toBe(true);
  });

  it('keeps earlier reminders when another ball is watched', () => {
    const reminders = new BingoReminders();
    reminders.watch(53);
    vi.advanceTimersByTime(REMINDER_DELAY);
    reminders.watch(7);
    vi.advanceTimersByTime(REMINDER_DELAY);
    expect(reminders.missed().size).toBe(2);
  });

  it('cancels pending timers on reset', () => {
    const reminders = new BingoReminders();
    reminders.watch(53);
    reminders.reset();
    vi.advanceTimersByTime(REMINDER_DELAY);
    expect(reminders.missed().size).toBe(0);
  });
});
