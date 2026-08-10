Search from @tedi-design-system/react. Use via `window.Tedi.Search` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Search.html`): Default, Sizes, States, Placeholder, Clearable, Clearable with button, With Hint, With suggestions, With result and actions, Typeahead (live filtering), Async suggestions (loading), Accessibility: No Visible Label.

## Props

```ts
interface SearchProps {
  /** Callback triggered when the search is executed (Enter key pressed or button clicked). */
  onSearch?: (value: string) => void;
  /** Custom icon for the search input. */
  searchIcon?: string | IconWithoutBackgroundProps;
  /** Optional button properties. */
  button?: Partial<ButtonProps>;
  /** For accessibility: search field name (accessible name). Recommended to always set. E.g., "Search products" or "Search site". */
  ariaLabel?: string;
  sm?: Partial<{ size?: "default" | "small" | "large"; icon?: string | IconWithoutBackgroundProps; isTextArea?: boolean; placeholder?: string; isClearable?: boolean; className?: string; }>;
  md?: Partial<{ size?: "default" | "small" | "large"; icon?: string | IconWithoutBackgroundProps; isTextArea?: boolean; placeholder?: string; isClearable?: boolean; className?: string; }>;
  lg?: Partial<{ size?: "default" | "small" | "large"; icon?: string | IconWithoutBackgroundProps; isTextArea?: boolean; placeholder?: string; isClearable?: boolean; className?: string; }>;
  xl?: Partial<{ size?: "default" | "small" | "large"; icon?: string | IconWithoutBackgroundProps; isTextArea?: boolean; placeholder?: string; isClearable?: boolean; className?: string; }>;
  xxl?: Partial<{ size?: "default" | "small" | "large"; icon?: string | IconWithoutBackgroundProps; isTextArea?: boolean; placeholder?: string; isClearable?: boolean; className?: string; }>;
  /** Additional CSS class name applied to the root container (`<div>`). Use this for layout adjustments, custom spacing, or theming the entire text field wrapper. */
  className?: string;
  /** Controls the visual size of the text field. - `'small'` → Compact version (smaller height, padding, and font size) - `'default'` → Standard size (most commonly used) - `'large'` → Larger touch target, bigger text and padding */
  size?: "default" | "small" | "large";
  /** Additional attributes for the input element. */
  input?: React.InputHTMLAttributes<HTMLInputElement> | React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  /** The text or React node that serves as the label for the text field. If `hideLabel` is `true`, the label will be visually hidden but still accessible to screen readers. If `hideLabel` is `'keep-space'`, the label will be hidden but the space it occupies will be preserved. */
  label?: React.ReactNode;
  /** Disables the entire text field. When `true`: - Input becomes non-editable and non-focusable - Clear button and icon are disabled - Visual disabled styles are applied */
  disabled?: boolean;
  /** Name attribute for the underlying input/textarea element. Important for form submission and integration with form libraries (React Hook Form, Formik, etc.). */
  name?: string;
  /** Controlled value of the text field. When provided, the component becomes **fully controlled**. You must update this value via `onChange` to reflect user input. */
  value?: string;
  /** Default value for **uncontrolled** usage. Use this when you don't want to manage state yourself. The component will manage its internal state. */
  defaultValue?: string;
  /** Unique identifier for the text field. Required for accessibility (associates label, helper text, and input). Also used to generate `aria-describedby` and helper IDs automatically. */
  id?: string;
  /** Fired when the input/textarea receives focus. */
  onFocus?: React.FocusEventHandler<FieldElement>;
  /** Fired when the input/textarea loses focus. */
  onBlur?: React.FocusEventHandler<FieldElement>;
  /** Callback fired when the value changes. Receives the new value as a plain string. Preferred for most use cases (simpler than `onChangeEvent`). */
  onChange?: (value: string) => void;
  /** Key-down handler attached to the field's surrounding container (not the input directly). */
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  /** Key-up handler attached to the field's surrounding container (not the input directly). */
  onKeyUp?: React.KeyboardEventHandler<HTMLDivElement>;
  /** Click handler for the entire inner container (the area around the input). Can be used to focus the input when clicking anywhere in the field area, or to trigger custom behavior. */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  /** Indicates whether the input field is required. If set to `true`, the required indicator (if provided) will be displayed next to the label. */
  required?: boolean;
  /** Placeholder text shown when the field is empty. Recommended to be short and descriptive. Avoid using placeholder as a label. */
  placeholder?: string;
  /** Makes the field read-only. User can focus and select text, but cannot modify the value. Useful for pre-filled data that should not be changed. */
  readOnly?: boolean;
  /** Controls the visibility of the label. Use `true` to hide the label visually while maintaining its space in the layout, or use 'keep-space' to hide it without collapsing the space it occupies. */
  hideLabel?: boolean | "keep-space";
  /** Renders the label as a `<span>` instead of a `<label>` element. This is useful when the `Form` component already handles labels internally. */
  renderWithoutLabel?: boolean;
  /** Tooltip content to display when hovering over the info button. If provided, an info button with a tooltip will be rendered. */
  tooltip?: React.ReactNode;
  /** Helper text, success message, or error message displayed below the field. Accepts either: - A single `FeedbackTextProps` object - An array of `FeedbackTextProps` (useful for multiple messages or mixed error/success states) The component automatically detects error states from helper items. */
  helper?: FeedbackTextProps | FeedbackTextProps[];
  /** Marks the field as invalid and triggers error styling. Also affects `aria-invalid` attribute. Note: The `helper` prop can override this if it contains items with `type: 'error'`. */
  invalid?: boolean;
  /** Custom CSS class applied directly to the `<input>` or `<textarea>` element (via the internal `Field` component). Use this when you need to style the input itself (e.g. text alignment, font, custom focus styles). Note: The root container uses `className`. */
  inputClassName?: string;
  /** Native `onChange` event handler. Gives you access to the full `ChangeEvent` object (useful if you need `event.target`, `event.preventDefault()`, etc.). Note: Both `onChange` and `onChangeEvent` are called when the value changes. */
  onChangeEvent?: React.ChangeEventHandler<FieldElement>;
  /** Called when the user clicks on the icon (only works if `icon` is provided). The icon is automatically wrapped in a `<button>` when this prop is present. */
  onIconClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  /** Extra HTML attributes spread on the icon `<button>` element. Use this to wire ARIA state (e.g. `aria-expanded`, `aria-controls`, `aria-haspopup`) directly to the icon trigger, so screen readers announce disclosure state correctly when the icon opens a popover / dialog. Only applied when `onIconClick` is set (i.e. the icon is rendered as a `<button>`). */
  iconButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  /** Hides the spinner/arrows for number inputs (`type="number"`). Only has effect when the underlying input has `type="number"`. */
  isArrowsHidden?: boolean;
  /** Callback fired when the clear button (×) is clicked. Useful if you need to perform additional actions besides clearing the value (e.g. analytics, resetting related fields, etc.). Note: The field value is automatically cleared regardless of this callback. */
  onClear?: () => void;
  /** Optional start slot element to render inside the input container, before the input field. */
  startSlot?: React.ReactNode;
  /** Optional end slot element to render inside the input container, after the input field. */
  endSlot?: React.ReactNode;
  /** When `true`, displays a clear (×) button on the right side when the field has a value. Clicking the button clears the input and calls `onClear` (if provided). */
  isClearable?: boolean;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  args: {
    id: 'search-default',
    label: 'Otsing',
    placeholder: 'Otsi nime või märksõna järgi',
  },
};

// Sizes
export const Sizes: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    id: 'search-sizes',
    label: 'Otsing',
    property: 'size',
    array: sizeArray,
  },
};

// States
export const States: StoryObj<TemplateStateProps> = {
  render: TemplateColumnWithStates,
  args: {
    array: stateArray,
    label: 'Otsing',
    id: 'search-states',
  },
  parameters: {
    pseudo: {
      hover: '#search-states-hover',
      focus: '#search-states-focus',
      active: '#search-states-active',
    },
  },
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Sizes

```jsx
/* Sizes */ compose(S, "Sizes")
```

### States

```jsx
/* States */ compose(S, "States")
```

### Placeholder

```jsx
/* Placeholder */ compose(S, "Placeholder")
```

### Clearable

```jsx
/* Clearable */ compose(S, "Clearable")
```

### ClearableWithButton

```jsx
/* Clearable with button */ compose(S, "ClearableWithButton")
```

### WithHint

```jsx
/* With Hint */ compose(S, "WithHint")
```

### WithSuggestions

```jsx
/* With suggestions */ compose(S, "WithSuggestions")
```

### WithResultAndActions

```jsx
/* With result and actions */ compose(S, "WithResultAndActions")
```

### Typeahead

```jsx
/* Typeahead (live filtering) */ compose(S, "Typeahead")
```

### AsyncSuggestions

```jsx
/* Async suggestions (loading) */ compose(S, "AsyncSuggestions")
```

### AccessibilityFocused

```jsx
/* Accessibility: No Visible Label */ compose(S, "AccessibilityFocused")
```
