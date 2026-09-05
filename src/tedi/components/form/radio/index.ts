import BaseRadio, { type RadioProps } from './radio';
import RadioGroup from './radio-group/radio-group';

// Attach the compound `Group` here rather than in `radio.tsx`. The base
// component must not import `radio-group`, because `radio-group` imports `Radio`
// back (for its grouped options) — that pair formed a circular import.
// The explicit type keeps the emitted declaration from referencing radio.tsx's
// private `RadioComponent` interface (TS4023 during `.d.ts` generation).
const Radio: {
  (props: RadioProps): JSX.Element;
  displayName?: string;
  Group: typeof RadioGroup;
} = Object.assign(BaseRadio, { Group: RadioGroup });

export { Radio, RadioGroup };
export type { RadioProps } from './radio';
export type { RadioGroupProps } from './radio-group/radio-group';

export default Radio;
