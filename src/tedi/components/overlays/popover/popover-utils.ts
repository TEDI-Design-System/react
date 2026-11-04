import { OffsetOptions } from '@floating-ui/react';

/** A number or `{ mainAxis, crossAxis, alignmentAxis }` — `OffsetOptions` minus its function variant. */
type OffsetValue = Exclude<OffsetOptions, (...args: never[]) => unknown>;

const addToMainAxis = (value: OffsetValue, extra: number): OffsetValue =>
  typeof value === 'number' ? value + extra : { ...value, mainAxis: (value.mainAxis ?? 0) + extra };

/**
 * Adds the arrow's height to the gap, whatever form `offset` takes.
 */
export const addArrowGap = (offset: OffsetOptions, arrowHeight: number): OffsetOptions => {
  if (arrowHeight === 0) return offset;
  if (typeof offset === 'function') return (state) => addToMainAxis(offset(state), arrowHeight);
  return addToMainAxis(offset, arrowHeight);
};
