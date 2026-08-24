import BaseRadio from './radio';
import RadioGroup from './radio-group/radio-group';

// Attach the compound `Group` here rather than in `radio.tsx`. The base
// component must not import `radio-group`, because `radio-group` imports `Radio`
// back (for its grouped options) — that pair formed a circular import.
const Radio = Object.assign(BaseRadio, { Group: RadioGroup });

export { Radio, RadioGroup };
export type { RadioProps } from './radio';
export type { RadioGroupProps } from './radio-group/radio-group';

export default Radio;
