import { addArrowGap } from './popover-utils';

describe('addArrowGap', () => {
  it('returns the offset unchanged without an arrow', () => {
    expect(addArrowGap(4, 0)).toBe(4);
  });

  it('adds the arrow height to a numeric offset', () => {
    expect(addArrowGap(4, 17)).toBe(21);
  });

  it('adds the arrow height to mainAxis of an object offset', () => {
    expect(addArrowGap({ crossAxis: 8 }, 17)).toEqual({ crossAxis: 8, mainAxis: 17 });
    expect(addArrowGap({ mainAxis: 4, alignmentAxis: 2 }, 17)).toEqual({ mainAxis: 21, alignmentAxis: 2 });
  });

  it('adds the arrow height to the value a function offset returns', () => {
    const offset = addArrowGap(() => 4, 17);
    expect(typeof offset).toBe('function');
    expect((offset as (state: never) => number)({} as never)).toBe(21);
  });
});
