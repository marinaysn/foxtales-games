import { letterOf } from './ball-letter';

describe('letterOf', () => {
  it('maps 46 to G', () => {
    expect(letterOf(46)).toBe('G');
  });

  it('maps 15 to B', () => {
    expect(letterOf(15)).toBe('B');
  });

  it('maps 75 to O', () => {
    expect(letterOf(75)).toBe('O');
  });
});
