import BaseCheckbox, { type CheckboxProps } from './checkbox';
import CheckboxGroup from './checkbox-group/checkbox-group';

// Attach the compound `Group` here rather than in `checkbox.tsx`. The base
// component must not import `checkbox-group`, because `checkbox-group` imports
// `Checkbox` back (for its select-all box) — that pair formed a circular import.
// The explicit type keeps the emitted declaration from referencing checkbox.tsx's
// private `CheckboxComponent` interface (TS4023 during `.d.ts` generation).
const Checkbox: {
  (props: CheckboxProps): JSX.Element;
  displayName?: string;
  Group: typeof CheckboxGroup;
} = Object.assign(BaseCheckbox, { Group: CheckboxGroup });

export { Checkbox, CheckboxGroup };
export type { CheckboxBaseProps, CheckboxProps } from './checkbox';
export type { CheckboxGroupProps } from './checkbox-group/checkbox-group';

export default Checkbox;
