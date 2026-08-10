import * as React from 'react';

/**
 * Checkbox — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/form/checkbox/checkbox.stories.tsx).
 * @replaces input[type=checkbox]
 */
export interface CheckboxProps {
  /** If the check is in indeterminate state. (Not checked or unchecked) When this is true then the checked prop is ignored */
  indeterminate?: boolean;
  /** ID property */
  id: string;
  /** Label text */
  label: React.ReactNode;
  /** Additional classes. */
  className?: string;
  /** Value property */
  value: string;
  /** name of the input */
  name: string;
  /** is the label hidden */
  hideLabel?: boolean;
  /** If the option is disabled */
  disabled?: boolean;
  /** onChange handler */
  onChange?: (value: string, checked: boolean) => void;
  /** Helper text displayed below the input. */
  helper?: FeedbackTextProps;
  /** If the check is controlled from outside the components */
  checked?: boolean;
  /** If the check is checked by default */
  defaultChecked?: boolean;
  /** If the item should be in hover state */
  hover?: boolean;
  /** Provide content for tooltip. Accepts rich content (e.g. bold text, links), not just a plain string. */
  tooltip?: React.ReactNode;
  /** Input size */
  size?: "default" | "large";
  /** Whether the input is marked as invalid. */
  invalid?: boolean;
  /** Whether the input is marked as required. */
  required?: boolean;
}

// Referenced types, resolved one level deep (see the story source for the rest).
interface FeedbackTextProps {
    /**
     * Helper text
     */
    text: React.ReactNode | React.ReactNode[];
    /**
     * ID to reference the helper from aria-describedby attributes.
     * If omitted, then the id might be set through a parent component.
     */
    id?: string;
    /**
     * Additional custom class.
     */
    className?: string;
    /**
     * Type of form-helper.
     * @default hint
     */
    type?: FeedbackTextType;
    /**
     * Position of the helper.
     * @default left
     */
    position?: FeedbackTextPosition;
}

export declare const Checkbox: React.ComponentType<CheckboxProps>;
