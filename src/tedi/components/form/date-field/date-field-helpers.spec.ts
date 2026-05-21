import {
  buildDateRegexSource,
  buildDisabledMatchers,
  CALENDAR_POPOVER_OFFSET,
  CALENDAR_POPOVER_PADDING,
  getInitialMonth,
  getLocaleDateParts,
  SelectedValueLike,
} from './date-field-helpers';

describe('date-field-helpers', () => {
  describe('constants', () => {
    it('CALENDAR_POPOVER_OFFSET is a fixed numeric offset', () => {
      expect(typeof CALENDAR_POPOVER_OFFSET).toBe('number');
      expect(CALENDAR_POPOVER_OFFSET).toBeGreaterThan(0);
    });

    it('CALENDAR_POPOVER_PADDING is a fixed numeric padding', () => {
      expect(typeof CALENDAR_POPOVER_PADDING).toBe('number');
      expect(CALENDAR_POPOVER_PADDING).toBeGreaterThan(0);
    });
  });

  describe('getInitialMonth', () => {
    it('returns the date itself when value is a single Date', () => {
      const date = new Date(2024, 5, 15);
      expect(getInitialMonth(date)).toBe(date);
    });

    it('returns the earliest date when value is a non-empty array', () => {
      const earliest = new Date(2024, 0, 1);
      const middle = new Date(2024, 3, 1);
      const latest = new Date(2024, 11, 31);
      // Pass deliberately out of order — the helper must sort.
      expect(getInitialMonth([latest, earliest, middle])).toBe(earliest);
    });

    it('returns the fallback when value is an empty array', () => {
      const fallback = new Date(2030, 0, 1);
      expect(getInitialMonth([], fallback)).toBe(fallback);
    });

    it('returns range.from when value is a {from, to} range', () => {
      const from = new Date(2024, 2, 10);
      const to = new Date(2024, 2, 20);
      expect(getInitialMonth({ from, to })).toBe(from);
    });

    it('falls back to range.to when range.from is missing', () => {
      const to = new Date(2024, 2, 20);
      expect(getInitialMonth({ to } as unknown as SelectedValueLike)).toBe(to);
    });

    it('returns the fallback when range has neither from nor to', () => {
      const fallback = new Date(2030, 5, 1);
      expect(getInitialMonth({} as unknown as SelectedValueLike, fallback)).toBe(fallback);
    });

    it('returns the fallback when value is undefined', () => {
      const fallback = new Date(2030, 6, 1);
      expect(getInitialMonth(undefined, fallback)).toBe(fallback);
    });

    it('returns today when value is undefined and no fallback is given', () => {
      const before = Date.now();
      const result = getInitialMonth(undefined);
      const after = Date.now();
      expect(result.getTime()).toBeGreaterThanOrEqual(before);
      expect(result.getTime()).toBeLessThanOrEqual(after);
    });
  });

  describe('buildDisabledMatchers', () => {
    it('returns an empty array when nothing is configured', () => {
      expect(buildDisabledMatchers({})).toEqual([]);
    });

    it('passes through a single matcher unchanged', () => {
      const matcher = { dayOfWeek: [0, 6] };
      expect(buildDisabledMatchers({ disabled: matcher })).toEqual([matcher]);
    });

    it('spreads a matcher array so the caller gets a flat list', () => {
      const a = { dayOfWeek: [0] };
      const b = { before: new Date(2024, 0, 1) };
      const result = buildDisabledMatchers({ disabled: [a, b] });
      expect(result).toEqual([a, b]);
    });

    it('appends `{ before: minDate }` when minDate is set', () => {
      const minDate = new Date(2024, 5, 1);
      expect(buildDisabledMatchers({ minDate })).toEqual([{ before: minDate }]);
    });

    it('appends `{ after: maxDate }` when maxDate is set', () => {
      const maxDate = new Date(2024, 5, 30);
      expect(buildDisabledMatchers({ maxDate })).toEqual([{ after: maxDate }]);
    });

    it('appends a `{ before: <today> }` matcher when disablePast is true', () => {
      const before = new Date();
      const result = buildDisabledMatchers({ disablePast: true });
      const after = new Date();

      expect(result).toHaveLength(1);
      const entry = result[0] as { before: Date };
      expect(entry.before.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(entry.before.getTime()).toBeLessThanOrEqual(after.getTime());
    });

    it('appends a `{ after: <today> }` matcher when disableFuture is true', () => {
      const before = new Date();
      const result = buildDisabledMatchers({ disableFuture: true });
      const after = new Date();

      expect(result).toHaveLength(1);
      const entry = result[0] as { after: Date };
      expect(entry.after.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(entry.after.getTime()).toBeLessThanOrEqual(after.getTime());
    });

    it('wraps a shouldDisableMonth predicate as a function matcher', () => {
      const shouldDisableMonth = jest.fn(() => true);
      const [matcher] = buildDisabledMatchers({ shouldDisableMonth });
      expect(typeof matcher).toBe('function');

      const probe = new Date(2024, 0, 1);
      const result = (matcher as (d: Date) => boolean)(probe);
      expect(result).toBe(true);
      expect(shouldDisableMonth).toHaveBeenCalledWith(probe);
    });

    it('returns false from the function matcher when shouldDisableMonth omits a return', () => {
      const shouldDisableMonth = jest.fn(() => undefined as unknown as boolean);
      const [matcher] = buildDisabledMatchers({ shouldDisableMonth });
      expect((matcher as (d: Date) => boolean)(new Date())).toBe(false);
    });

    it('wraps a shouldDisableYear predicate as a function matcher', () => {
      const shouldDisableYear = jest.fn(() => true);
      const [matcher] = buildDisabledMatchers({ shouldDisableYear });

      const probe = new Date(2030, 0, 1);
      expect((matcher as (d: Date) => boolean)(probe)).toBe(true);
      expect(shouldDisableYear).toHaveBeenCalledWith(probe);
    });

    it('composes every input in input order', () => {
      const disabledMatcher = { dayOfWeek: [0] };
      const minDate = new Date(2024, 0, 1);
      const maxDate = new Date(2024, 11, 31);
      const shouldDisableMonth = () => false;
      const shouldDisableYear = () => false;

      const result = buildDisabledMatchers({
        disabled: disabledMatcher,
        minDate,
        maxDate,
        disablePast: true,
        disableFuture: true,
        shouldDisableMonth,
        shouldDisableYear,
      });

      expect(result).toHaveLength(7);
      expect(result[0]).toBe(disabledMatcher);
      expect(result[1]).toEqual({ before: minDate });
      expect(result[2]).toEqual({ after: maxDate });
      expect((result[3] as { before: Date }).before).toBeInstanceOf(Date);
      expect((result[4] as { after: Date }).after).toBeInstanceOf(Date);
      expect(typeof result[5]).toBe('function');
      expect(typeof result[6]).toBe('function');
    });
  });

  describe('getLocaleDateParts', () => {
    it('extracts day/month/year order for an `et-EE` formatter (dd.MM.yyyy)', () => {
      const formatter = new Intl.DateTimeFormat('et-EE', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const parts = getLocaleDateParts(formatter);
      expect(parts.fieldOrder).toEqual(['day', 'month', 'year']);
      expect(parts.separators).toHaveLength(2);
      expect(parts.separators[0]).toMatch(/^[.\u00a0\s/-]+$/);
    });

    it('extracts year/month/day order for an `sv-SE` formatter (yyyy-MM-dd)', () => {
      const formatter = new Intl.DateTimeFormat('sv-SE', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const parts = getLocaleDateParts(formatter);
      expect(parts.fieldOrder).toEqual(['year', 'month', 'day']);
      expect(parts.separators).toHaveLength(2);
    });

    it('caps the separators array at two entries even with verbose formatters', () => {
      const formatter = new Intl.DateTimeFormat('en-CA', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const parts = getLocaleDateParts(formatter);
      expect(parts.separators.length).toBeLessThanOrEqual(2);
    });
  });

  describe('buildDateRegexSource', () => {
    it('builds a dd.MM.yyyy regex source for day-first locales', () => {
      const source = buildDateRegexSource({ fieldOrder: ['day', 'month', 'year'], separators: ['.', '.'] });
      const regex = new RegExp(`^${source}$`);
      expect(regex.test('31.12.2099')).toBe(true);
      expect(regex.test('31/12/2099')).toBe(false);
    });

    it('builds a yyyy-MM-dd regex source for ISO locales', () => {
      const source = buildDateRegexSource({ fieldOrder: ['year', 'month', 'day'], separators: ['-', '-'] });
      const regex = new RegExp(`^${source}$`);
      expect(regex.test('2099-12-31')).toBe(true);
      expect(regex.test('2099/12/31')).toBe(false);
    });

    it('escapes regex meta-characters in the separator', () => {
      const source = buildDateRegexSource({ fieldOrder: ['day', 'month', 'year'], separators: ['+', '+'] });
      const regex = new RegExp(`^${source}$`);
      expect(regex.test('31+12+2099')).toBe(true);
      expect(regex.test('311 22099')).toBe(false);
    });

    it('emits a 4-digit slot for `year` and 2-digit for day/month', () => {
      const source = buildDateRegexSource({ fieldOrder: ['day', 'month', 'year'], separators: ['.', '.'] });
      const regex = new RegExp(`^${source}$`);
      expect(regex.test('31.12.99')).toBe(false);
    });

    it('handles a missing separator entry without crashing', () => {
      const source = buildDateRegexSource({ fieldOrder: ['year'], separators: [] });
      expect(new RegExp(`^${source}$`).test('2099')).toBe(true);
    });
  });
});
