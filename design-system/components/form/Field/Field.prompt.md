Field from @tedi-design-system/react. Use via `window.Tedi.Field` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Field.html`): Default.

## Props

```ts
interface FieldProps {
  /** Unique identifier for the field element. */
  id?: string;
  /** Name attribute used in forms and form submissions. */
  name?: string;
  /** Controlled value of the field. */
  value?: string;
  /** The type of the input element (e.g. 'text', 'email', 'password', 'number', 'tel', 'url', etc.). **Note**: This prop is ignored when `isTextArea={true}`. */
  type?: unknown;
  /** Default value for uncontrolled usage. */
  defaultValue?: string;
  /** Callback fired when value changes (returns string value only). */
  onChange?: (value: string) => void;
  /** Native change event callback (full event access). */
  onChangeEvent?: React.ChangeEventHandler<FieldElement>;
  /** Disables the field and prevents user interaction. */
  disabled?: boolean;
  /** Makes the field read-only (user cannot edit but can focus/select). */
  readOnly?: boolean;
  /** Marks the field as required in form validation. */
  required?: boolean;
  /** Marks the field visually and semantically as invalid. */
  invalid?: boolean;
  /** Placeholder text displayed when the field is empty. */
  placeholder?: string;
  /** Custom CSS class for the input/textarea element. */
  className?: string;
  /** ARIA description reference (used for helper/error text association). */
  "aria-describedby"?: string;
  /** Accessible label for screen readers when no visible label exists. */
  "aria-label"?: string;
  /** Focus event handler. */
  onFocus?: React.FocusEventHandler<FieldElement>;
  /** Blur event handler. */
  onBlur?: React.FocusEventHandler<FieldElement>;
  /** Renders a textarea instead of an input element. */
  isTextArea?: boolean;
  /** Native input element props override (input only). */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /** Native textarea element props override (textarea only). */
  textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  args: {
    id: 'field-1',
  },
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```
