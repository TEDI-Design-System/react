import * as React from 'react';

/**
 * TextField — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/form/textfield/textfield.stories.tsx).
 * @replaces input
 */
export interface TextFieldProps {
  /** Unique identifier for the text field. Required for accessibility (associates label, helper text, and input). Also used to generate `aria-describedby` and helper IDs automatically. */
  id?: string;
  /** The text or React node that serves as the label for the text field. If `hideLabel` is `true`, the label will be visually hidden but still accessible to screen readers. If `hideLabel` is `'keep-space'`, the label will be hidden but the space it occupies will be preserved. */
  label?: React.ReactNode;
  /** Name attribute for the underlying input/textarea element. Important for form submission and integration with form libraries (React Hook Form, Formik, etc.). */
  name?: string;
  /** Custom CSS class applied directly to the `<input>` or `<textarea>` element (via the internal `Field` component). Use this when you need to style the input itself (e.g. text alignment, font, custom focus styles). Note: The root container uses `className`. */
  inputClassName?: string;
  /** Callback fired when the value changes. Receives the new value as a plain string. Preferred for most use cases (simpler than `onChangeEvent`). */
  onChange?: (value: string) => void;
  /** Native `onChange` event handler. Gives you access to the full `ChangeEvent` object (useful if you need `event.target`, `event.preventDefault()`, etc.). Note: Both `onChange` and `onChangeEvent` are called when the value changes. */
  onChangeEvent?: React.ChangeEventHandler<FieldElement>;
  /** Keyboard event handlers attached to the inner wrapper `<div>`. Useful for handling Enter key submission, arrow key navigation, or custom keyboard shortcuts. Note: These are **not** attached to the input/textarea directly, but to the surrounding container. */
  onKeyPress?: React.KeyboardEventHandler<HTMLDivElement>;
  /** Key-down handler attached to the field's surrounding container (not the input directly). */
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  /** Key-up handler attached to the field's surrounding container (not the input directly). */
  onKeyUp?: React.KeyboardEventHandler<HTMLDivElement>;
  /** Default value for **uncontrolled** usage. Use this when you don't want to manage state yourself. The component will manage its internal state. */
  defaultValue?: string;
  /** Controlled value of the text field. When provided, the component becomes **fully controlled**. You must update this value via `onChange` to reflect user input. */
  value?: string;
  /** Called when the user clicks on the icon (only works if `icon` is provided). The icon is automatically wrapped in a `<button>` when this prop is present. */
  onIconClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  /** Extra HTML attributes spread on the icon `<button>` element. Use this to wire ARIA state (e.g. `aria-expanded`, `aria-controls`, `aria-haspopup`) directly to the icon trigger, so screen readers announce disclosure state correctly when the icon opens a popover / dialog. Only applied when `onIconClick` is set (i.e. the icon is rendered as a `<button>`). */
  iconButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  /** Click handler for the entire inner container (the area around the input). Can be used to focus the input when clicking anywhere in the field area, or to trigger custom behavior. */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /** Disables the entire text field. When `true`: - Input becomes non-editable and non-focusable - Clear button and icon are disabled - Visual disabled styles are applied */
  disabled?: boolean;
  /** Marks the field as invalid and triggers error styling. Also affects `aria-invalid` attribute. Note: The `helper` prop can override this if it contains items with `type: 'error'`. */
  invalid?: boolean;
  /** Makes the field read-only. User can focus and select text, but cannot modify the value. Useful for pre-filled data that should not be changed. */
  readOnly?: boolean;
  /** Helper text, success message, or error message displayed below the field. Accepts either: - A single `FeedbackTextProps` object - An array of `FeedbackTextProps` (useful for multiple messages or mixed error/success states) The component automatically detects error states from helper items. */
  helper?: FeedbackTextProps | FeedbackTextProps[];
  /** Fired when the input/textarea receives focus. */
  onFocus?: React.FocusEventHandler<FieldElement>;
  /** Fired when the input/textarea loses focus. */
  onBlur?: React.FocusEventHandler<FieldElement>;
  /** Hides the spinner/arrows for number inputs (`type="number"`). Only has effect when the underlying input has `type="number"`. */
  isArrowsHidden?: boolean;
  /** Callback fired when the clear button (×) is clicked. Useful if you need to perform additional actions besides clearing the value (e.g. analytics, resetting related fields, etc.). Note: The field value is automatically cleared regardless of this callback. */
  onClear?: () => void;
  /** Additional attributes for the input element. */
  input?: React.InputHTMLAttributes<HTMLInputElement> | React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  /** Optional start slot element to render inside the input container, before the input field. */
  startSlot?: React.ReactNode;
  /** Optional end slot element to render inside the input container, after the input field. */
  endSlot?: React.ReactNode;
  /** Controls the visual size of the text field. - `'small'` → Compact version (smaller height, padding, and font size) - `'default'` → Standard size (most commonly used) - `'large'` → Larger touch target, bigger text and padding */
  size?: "default" | "small" | "large";
  /** Icon displayed inside the text field on the right side. Accepts either: - A simple string (icon name) → e.g. `'search'`, `'user'`, `'calendar'` - A full `IconWithoutBackgroundProps` object for advanced configuration (size, color, className, etc.) When `onIconClick` is provided, the icon becomes a clickable button. Otherwise, it is rendered as a non-interactive decorative element. */
  icon?: string | IconWithoutBackgroundProps;
  /** If `true`, renders a `<textarea>` instead of a regular `<input>`. Useful for multi-line text input (comments, descriptions, addresses, etc.). Note: When using `isTextArea`, the component still behaves like a text field (same styling, clear button, icon support, validation, etc.). */
  isTextArea?: boolean;
  /** Placeholder text shown when the field is empty. Recommended to be short and descriptive. Avoid using placeholder as a label. */
  placeholder?: string;
  /** When `true`, displays a clear (×) button on the right side when the field has a value. Clicking the button clears the input and calls `onClear` (if provided). */
  isClearable?: boolean;
  /** Additional CSS class name applied to the root container (`<div>`). Use this for layout adjustments, custom spacing, or theming the entire text field wrapper. */
  className?: string;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<TextFieldBreakpointProps>;
  md?: Partial<TextFieldBreakpointProps>;
  lg?: Partial<TextFieldBreakpointProps>;
  xl?: Partial<TextFieldBreakpointProps>;
  xxl?: Partial<TextFieldBreakpointProps>;
  /** Indicates whether the input field is required. If set to `true`, the required indicator (if provided) will be displayed next to the label. */
  required?: boolean;
  /** Controls the visibility of the label. Use `true` to hide the label visually while maintaining its space in the layout, or use 'keep-space' to hide it without collapsing the space it occupies. */
  hideLabel?: boolean | "keep-space";
  /** Renders the label as a `<span>` instead of a `<label>` element. This is useful when the `Form` component already handles labels internally. */
  renderWithoutLabel?: boolean;
  /** Tooltip content to display when hovering over the info button. If provided, an info button with a tooltip will be rendered. */
  tooltip?: React.ReactNode;
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

type FieldElement = HTMLInputElement | HTMLTextAreaElement;

interface IconWithoutBackgroundProps extends IconSharedProps {
    background?: undefined;
    /**
     * Type of display
     * @default block
     */
    display?: 'block' | 'inline';
}

export declare const TextField: React.ComponentType<TextFieldProps>;
