import * as React from 'react';

/**
 * Toggle — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/form/toggle/toggle.stories.tsx).
 */
export interface ToggleProps {
  /** Unique identifier for the toggle input. Required for accessibility and to link the label with the input. */
  id: string;
  /** Label text or element displayed next to the toggle. This is shown to users and should clearly describe what the toggle does. */
  label: React.ReactNode;
  /** Visually hides the label while keeping it accessible to screen readers. Useful when the toggle's purpose is clear from context (e.g., in a settings row). */
  hideLabel?: boolean;
  /** Position of the label relative to the toggle switch. */
  labelPosition?: "left" | "right";
  /** Optional helper text displayed below the toggle. Can be used to provide additional context or validation messages. */
  helper?: FeedbackTextProps;
  /** Additional CSS class name(s) to apply to the toggle wrapper. Useful for custom styling or theming from parent components. */
  className?: string;
  /** Controlled state of the toggle. Use this together with `onChange` for full control over the checked state. */
  checked?: boolean;
  /** Initial checked state for uncontrolled usage. Ignored if `checked` prop is provided. */
  defaultChecked?: boolean;
  /** Callback fired when the toggle state changes. */
  onChange?: (value: boolean) => void;
  /** Size of the toggle switch. */
  size?: "default" | "large";
  /** Color variant of the toggle. - `primary`: Standard toggle (usually blue/brand color) - `colored`: Alternative accent color (e.g. for special settings) */
  color?: "primary" | "colored";
  /** Visual style variant of the toggle. */
  type?: "filled" | "outlined";
  /** Shows a lock icon inside the toggle knob. Typically used with `size="large"` to indicate secure/private settings. */
  icon?: boolean;
  /** Disables the toggle, preventing user interaction. */
  disabled?: boolean;
  /** Shows a loading spinner inside the toggle instead of the icon or dot. Useful for async operations (e.g. saving settings). When `true`, `onChange` will not be triggered. */
  isLoading?: boolean;
  /** Tooltip content shown when hovering over the label. Useful for providing extra explanation without cluttering the UI. */
  tooltip?: string;
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

export declare const Toggle: React.ComponentType<ToggleProps>;
