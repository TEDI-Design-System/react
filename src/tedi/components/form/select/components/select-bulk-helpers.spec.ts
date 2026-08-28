import { IGroupedOptions, ISelectOption } from '../select';
import {
  areAllSelected,
  getEnabledOptions,
  getGroupEnabledOptions,
  isGroupedOptions,
  isIndeterminate,
  toggleBulkSelection,
} from './select-bulk-helpers';

const flat: ISelectOption[] = [
  { value: 'a', label: 'A' },
  { value: 'b', label: 'B' },
  { value: 'c', label: 'C', isDisabled: true },
];

const grouped: IGroupedOptions<ISelectOption>[] = [
  {
    label: 'Letters',
    options: [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B', isDisabled: true },
    ],
  },
  {
    label: 'Numbers',
    options: [
      { value: '1', label: 'One' },
      { value: '2', label: 'Two' },
    ],
  },
];

describe('select-bulk-helpers', () => {
  describe('isGroupedOptions', () => {
    it('returns true for grouped options', () => {
      expect(isGroupedOptions(grouped)).toBe(true);
    });

    it('returns false for flat options', () => {
      expect(isGroupedOptions(flat)).toBe(false);
    });

    it('returns false for empty list', () => {
      expect(isGroupedOptions([])).toBe(false);
    });
  });

  describe('getEnabledOptions', () => {
    it('returns all enabled options from a flat list', () => {
      expect(getEnabledOptions(flat).map((o) => o.value)).toEqual(['a', 'b']);
    });

    it('flattens grouped options and excludes disabled ones', () => {
      expect(getEnabledOptions(grouped).map((o) => o.value)).toEqual(['a', '1', '2']);
    });

    it('handles empty list', () => {
      expect(getEnabledOptions([])).toEqual([]);
    });
  });

  describe('getGroupEnabledOptions', () => {
    it('returns enabled options of the passed group', () => {
      expect(getGroupEnabledOptions(grouped[1]).map((o) => o.value)).toEqual(['1', '2']);
    });

    it('filters out disabled options within the group', () => {
      // grouped[0] = { label: 'Letters', options: [a, b (disabled)] }
      expect(getGroupEnabledOptions(grouped[0]).map((o) => o.value)).toEqual(['a']);
    });

    it('returns [] when group is null/undefined', () => {
      expect(getGroupEnabledOptions(null)).toEqual([]);
      expect(getGroupEnabledOptions(undefined)).toEqual([]);
    });

    it('returns [] when group has no options array', () => {
      expect(getGroupEnabledOptions({ label: 'No options' } as never)).toEqual([]);
    });

    it('targets the correct group when two groups share the same label', () => {
      // Regression: looking groups up by label would have always resolved to
      // the first match, returning the wrong options for the second group.
      const a: IGroupedOptions<ISelectOption> = {
        label: 'Shared',
        options: [{ value: 'a-1', label: 'A1' }],
      };
      const b: IGroupedOptions<ISelectOption> = {
        label: 'Shared',
        options: [
          { value: 'b-1', label: 'B1' },
          { value: 'b-2', label: 'B2' },
        ],
      };

      expect(getGroupEnabledOptions(a).map((o) => o.value)).toEqual(['a-1']);
      expect(getGroupEnabledOptions(b).map((o) => o.value)).toEqual(['b-1', 'b-2']);
    });
  });

  describe('areAllSelected', () => {
    it('returns true when every enabled option is selected', () => {
      const enabled = getEnabledOptions(flat);
      expect(areAllSelected(enabled, enabled)).toBe(true);
    });

    it('returns false when some are missing', () => {
      const enabled = getEnabledOptions(flat);
      expect(areAllSelected([enabled[0]], enabled)).toBe(false);
    });

    it('returns false when target is empty', () => {
      expect(areAllSelected([{ value: 'a', label: 'A' }], [])).toBe(false);
    });
  });

  describe('isIndeterminate', () => {
    it('returns true when some — but not all — enabled options are selected', () => {
      const enabled = getEnabledOptions(flat);
      expect(isIndeterminate([enabled[0]], enabled)).toBe(true);
    });

    it('returns false when none are selected', () => {
      expect(isIndeterminate([], getEnabledOptions(flat))).toBe(false);
    });

    it('returns false when all are selected', () => {
      const enabled = getEnabledOptions(flat);
      expect(isIndeterminate(enabled, enabled)).toBe(false);
    });

    it('returns false for empty target', () => {
      expect(isIndeterminate([], [])).toBe(false);
    });
  });

  describe('toggleBulkSelection', () => {
    it('removes the target options when all are selected', () => {
      const enabled = getEnabledOptions(flat);
      const result = toggleBulkSelection(enabled, enabled);
      expect(result).toEqual([]);
    });

    it('preserves selections outside the target group when removing', () => {
      const target: ISelectOption[] = [{ value: 'a', label: 'A' }];
      const selected: ISelectOption[] = [
        { value: 'a', label: 'A' },
        { value: 'extra', label: 'Extra' },
      ];
      const result = toggleBulkSelection(selected, target);
      expect(result.map((o) => o.value)).toEqual(['extra']);
    });

    it('adds missing target options to the selection', () => {
      const enabled = getEnabledOptions(flat);
      const result = toggleBulkSelection([], enabled);
      expect(result.map((o) => o.value)).toEqual(['a', 'b']);
    });

    it('does not duplicate already-selected items when adding', () => {
      const enabled = getEnabledOptions(flat);
      const result = toggleBulkSelection([enabled[0]], enabled);
      expect(result.map((o) => o.value)).toEqual(['a', 'b']);
    });
  });
});
