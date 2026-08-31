import { FeedbackTextProps } from './feedback-text/feedback-text';

export type ChoiceInputVariant = 'default' | 'card';
export type ChoiceInputCardVariant = 'primary' | 'secondary';

interface ChoiceInputBaseProps {
  /**
   * ID property. When omitted a stable id is generated (useful inside `Radio.Group` / `Checkbox.Group`).
   */
  id?: string;
  /**
   * Label text
   */
  label: React.ReactNode;
  /**
   * Additional classes.
   */
  className?: string;
  /**
   * Value property
   */
  value: string;
  /**
   * name of the input. Provided automatically when rendered inside `Radio.Group` / `Checkbox.Group`.
   */
  name?: string;
  /**
   * Card colour variant. Only applies when `variant="card"`.
   * @default primary
   */
  cardVariant?: ChoiceInputCardVariant;
  /**
   * Secondary description text shown under the label. Primarily used with `variant="card"`.
   */
  description?: React.ReactNode;
  /**
   * Leading icon (Material icon name) shown before the label. Primarily used with `variant="card"`.
   */
  icon?: string;
  /**
   * is the label hidden
   */
  hideLabel?: boolean;
  /**
   * If the option is disabled
   */
  disabled?: boolean;
  /**
   * onChange handler
   */
  onChange?: (value: string, checked: boolean) => void;
  /**
   * Helper text displayed below the input.
   */
  helper?: FeedbackTextProps;
  /**
   * If the check is controlled from outside the components
   */
  checked?: boolean;
  /**
   * If the check is checked by default
   */
  defaultChecked?: boolean;
  /**
   * If the item should be in hover state
   */
  hover?: boolean;
  /**
   *  Input size
   */
  size?: 'default' | 'large';
  /**
   * Whether the input is marked as invalid.
   */
  invalid?: boolean;
  /**
   * Whether the input is marked as required.
   */
  required?: boolean;
}

/**
 * Base choice-input props with `variant` and `tooltip` freely combinable. Kept as a
 * flat interface so it can be `extends`-ed (e.g. by the deprecated `ChoiceGroup`).
 * Checkbox / Radio expose {@link ChoiceInputExclusiveProps} instead, which forbids
 * combining the two.
 */
export interface ChoiceInputProps extends ChoiceInputBaseProps {
  /**
   * Visual variant.
   * - `default` — standard indicator + label.
   * - `card` — the whole control renders as a selectable card (indicator, label, optional icon/description).
   * @default default
   */
  variant?: ChoiceInputVariant;
  /**
   * Provide content for tooltip. Accepts rich content (e.g. bold text, links),
   * not just a plain string.
   */
  tooltip?: React.ReactNode;
}

/**
 * Checkbox / Radio public props: identical to {@link ChoiceInputProps} except that
 * `variant="card"` and `tooltip` are mutually exclusive. The card variant carries
 * supplementary content through its own `description` slot, so an info tooltip on the
 * same control is redundant and unsupported — passing both is a type error.
 *
 * The type guard only catches the combination when `variant` is set on the control
 * itself; when the variant is inherited from a `Checkbox.Group` / `Radio.Group`, the
 * components additionally warn at runtime (dev only) and ignore the tooltip.
 */
export type ChoiceInputExclusiveProps =
  | (ChoiceInputBaseProps & {
      /**
       * Visual variant.
       * - `default` — standard indicator + label.
       * - `card` — the whole control renders as a selectable card (indicator, label, optional icon/description).
       * @default default
       */
      variant?: 'default';
      /**
       * Provide content for tooltip. Accepts rich content (e.g. bold text, links),
       * not just a plain string. Not available on `variant="card"` — use `description` instead.
       */
      tooltip?: React.ReactNode;
    })
  | (ChoiceInputBaseProps & {
      variant: 'card';
      tooltip?: never;
    });
