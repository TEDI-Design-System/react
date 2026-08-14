import { FeedbackTextProps } from './feedback-text/feedback-text';

export type ChoiceInputVariant = 'default' | 'card';
export type ChoiceInputCardVariant = 'primary' | 'secondary';

export interface ChoiceInputProps {
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
   * Visual variant.
   * - `default` — standard indicator + label.
   * - `card` — the whole control renders as a selectable card (indicator, label, optional icon/description).
   * @default default
   */
  variant?: ChoiceInputVariant;
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
   * Provide content for tooltip. Accepts rich content (e.g. bold text, links),
   * not just a plain string.
   */
  tooltip?: React.ReactNode;
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
