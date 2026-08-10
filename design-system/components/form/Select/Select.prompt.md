Select from @tedi-design-system/react. Use via `window.Tedi.Select` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Select.html`): Default, Sizes, Type, States, Value Type, Ellipsis Tags, Examples, Multiple Handled, Async Select, Editable Select, Defer Keyboard On Touch.

## Props

```ts
interface SelectProps {
  /** Unique HTML id for the input. Also used as react-select's `instanceId` for SSR-stable internal IDs. When omitted, falls back to the surrounding `InputGroup`'s id or a generated `useId()`. */
  id?: string;
  /** Visible label. May be omitted when the surrounding `InputGroup` provides its own label. */
  label?: string;
  /** The list of selectable options. Pass a flat `ISelectOption[]` for a simple list, or an array of `IGroupedOptions` (each with its own `options` array) for a grouped menu. */
  options?: OptionsOrGroups<ISelectOption<unknown>, IGroupedOptions<ISelectOption<unknown>>>;
  /** Used in async mode (`async: true`). - `true` — call `loadOptions` once on mount with an empty input string and use the result as the initial option list. - An array — show these options before the user types anything. - Omit — start with no options until the user types. */
  defaultOptions?: boolean | OptionsOrGroups<ISelectOption<unknown>, IGroupedOptions<ISelectOption<unknown>>>;
  /** Text shown in the field when no value is selected. */
  placeholder?: string;
  /** Extra class on the root wrapper. Use `classNames` for per-subcomponent overrides. */
  className?: string;
  /** Icon shown on the right of the field as the dropdown indicator. - `"arrow_drop_down"` (default) — standard select chevron. - `"search"` — magnifier; useful for combobox-style search fields. */
  iconName?: "search" | "arrow_drop_down";
  /** Fires whenever the selection changes. Receives the new value: a single `ISelectOption` (single-select), an array (multi-select), or `null` when cleared. */
  onChange?: (value: TSelectValue) => void;
  /** Fires whenever the user types in the search input. Receives the new input string and a `react-select` action descriptor (e.g. `'input-change'`, `'menu-close'`). Use this to drive controlled search. */
  onInputChange?: (value: string, actionMeta: InputActionMeta) => void;
  /** Controlled search input string. Pair with `onInputChange` to manage it from the parent. */
  inputValue?: string;
  /** Async option loader. Called with the current search string; resolve the `callback` with the matching options. Only invoked when `async: true`. */
  loadOptions?: (inputValue: string, callback: (options: OptionsOrGroups<ISelectOption, IGroupedOptions<ISelectOption>>) => void) => void;
  /** When `true`, shows a loading spinner in the indicator area. Useful while async results are pending. */
  isLoading?: boolean;
  /** Uncontrolled initial selection. Ignored when `value` is provided. */
  defaultValue?: ISelectOption<unknown> | readonly ISelectOption<unknown>[];
  /** Controlled selection. When set, the parent owns the value and must update it via `onChange`. Use `defaultValue` for uncontrolled usage. */
  value?: ISelectOption<unknown> | readonly ISelectOption<unknown>[];
  /** Disables interaction and applies disabled styling. */
  disabled?: boolean;
  /** Form field name; rendered onto the underlying hidden input for form submission. */
  name?: string;
  /** Forces error styling. Also set automatically when `helper.type === 'error'`. */
  invalid?: boolean;
  /** Forces valid (success) styling. Also set automatically when `helper.type === 'valid'`. */
  valid?: boolean;
  /** Helper / feedback text rendered below the field. Set `type` to `'hint'`, `'error'`, or `'valid'` — the latter two also drive the field's invalid / valid visual state. */
  helper?: FeedbackTextProps;
  /** Visual size variant. - omit — default (40px tall). - `"small"` — compact (32px tall) for dense layouts. */
  size?: "small";
  /** Switches the underlying component to `react-select`'s `AsyncSelect`. Pair with `loadOptions` (and optionally `defaultOptions`) to fetch options on the fly. */
  async?: boolean;
  /** Custom renderer for the content of each option in the dropdown. Receives the full option props from `react-select`; return any React node. Use `renderValue` if you also want to customise how the selected value appears in the trigger. */
  renderOption?: (props: OptionProps<ISelectOption, boolean>) => JSX.Element;
  /** Message shown when the option list is empty (no matches for the search, or no options at all). Defaults to the localised `select.no-options` label from `LabelProvider`. */
  noOptionsMessage?: (obj: { inputValue: string; }) => React.ReactNode;
  /** Message shown while async options are loading. Defaults to the localised `select.loading` label from `LabelProvider`. */
  loadingMessage?: (obj: { inputValue: string; }) => React.ReactNode;
  /** Renders custom content underneath the option list, inside the dropdown (e.g. a "Show more" button or a "powered by" footer). */
  renderMessageListFooter?: (props: MenuListProps<ISelectOption, boolean>) => JSX.Element;
  /** Enables multi-select mode: the field renders selections as removable tags and `onChange` receives an array. */
  multiple?: boolean;
  /** Layout for selected tags in multi-select mode. - `"stack"` (default) — tags wrap onto multiple rows. - `"row"` — tags stay on one row; overflow tags collapse into a `+N` counter, just like the Angular `multiRow=false` mode. */
  tagsDirection?: "row" | "stack";
  /** Truncate each selected tag's label when it is width-constrained, revealing the full text in a popover on hover/focus. `end` shows a trailing ellipsis (`Long label…`); `start` a leading one (`…label`). `false` never truncates — long labels wrap. Forwarded to each tag's `ellipsis` prop. */
  tagsEllipsis?: false | "end" | "start";
  /** Layout for the dropdown menu. - `"menu"` (default): vertical list of options. - `"grid"`: swatch grid for color / icon pickers and similar compact pickers. Grid sizing is customizable via the `--tedi-swatch-size`, `--tedi-swatch-gap`, and `--tedi-swatch-columns` CSS variables on the menu list element. */
  dropdownType?: "menu" | "grid";
  /** Custom renderer for the trigger value (single-select). Receives the currently selected option and may return any React node — useful for color swatches, icons, or any non-text representation in the field. Ignored in multi-select mode (use `renderOption` for tag rendering). */
  renderValue?: (option: ISelectOption) => React.ReactNode;
  /** In multi-select mode, prepends a "Select all" toggle to the menu list. Toggles every enabled option (or, when filtering, every visible enabled option) on/off. Indeterminate when only some are selected. Ignored when `multiple` is false. */
  showSelectAll?: boolean;
  /** In multi-select mode with grouped options, makes each group heading a checkbox that toggles the whole group. Indeterminate when only some options in the group are selected. Ignored when `multiple` is false or `options` is not grouped. */
  selectableGroups?: boolean;
  /** Open the menu automatically when the input first receives focus. */
  openMenuOnFocus?: boolean;
  /** Open the menu when the trigger area is clicked. */
  openMenuOnClick?: boolean;
  /** Treat the Tab key as a confirm-and-move-on for the currently focused option (otherwise Tab simply moves focus out of the menu without selecting). */
  tabSelectsValue?: boolean;
  /** Close the menu after each successful selection. Default depends on `multiple`: `true` for single-select, `false` for multi-select so the user can pick several options without re-opening. */
  closeMenuOnSelect?: boolean;
  /** Blur the search input after each selection. Useful if you want to collapse the cursor immediately on pick. */
  blurInputOnSelect?: boolean;
  /** Focus the input on initial mount. */
  autoFocus?: boolean;
  /** Whether the value can be cleared via the "×" indicator. The visible "×" button only appears if `isClearIndicatorVisible` is also `true` (that prop is now deprecated; see its docstring for migration plans). Backspace deletion is controlled separately by `backspaceRemovesValue` (default `false`). */
  isClearable?: boolean;
  isClearIndicatorVisible?: boolean;
  /** Allow filtering the option list by typing. Set to `false` for a pure dropdown with no search input (e.g. color/icon pickers). */
  isSearchable?: boolean;
  /** Touch-only UX for searchable selects. When `false`, tapping the field on a touch or pen device opens the menu for browsing **without** raising the on-screen keyboard (the input is marked `inputMode="none"`). The keyboard appears only once the user explicitly taps the search input — so a quick-pick dropdown doesn't immediately cover the screen with a keyboard. Has no effect for mouse/keyboard users and never blocks hardware-keyboard typing, so the combobox stays fully operable (WCAG 2.1.1 Keyboard). */
  openKeyboardOnTouch?: boolean;
  /** In multi-select mode, render an "×" remove button on each selected tag so the user can deselect single options without re-opening the menu. */
  isTagRemovable?: boolean;
  /** If `true`, pressing Backspace while the input is empty removes the last selected value (single-mode: clears it; multi-mode: pops the last tag). Disabled by default because react-select's upstream default (`true`) leads to accidental deletions, especially in multi-select with no visual cue for the affected tag. */
  backspaceRemovesValue?: boolean;
  /** Controlled menu open state. When set, the parent owns whether the menu is showing — pair with `onMenuOpen` / `onMenuClose`. */
  menuIsOpen?: boolean;
  /** Fires when the menu opens (uncontrolled or controlled). */
  onMenuOpen?: () => void;
  /** Fires when the menu closes (uncontrolled or controlled). */
  onMenuClose?: () => void;
  /** Fires when the input loses focus. */
  onBlur?: () => void;
  /** Hide the underlying text input (its width collapses to 0). Useful when the field is a pure picker with no typing — the value display still shows, but the cursor caret area is removed. */
  inputIsHidden?: boolean;
  /** Typography overrides applied to group headings (when `options` is grouped). `text` on an individual `IGroupedOptions` entry takes precedence over this default. */
  optionGroupHeadingText?: Pick<TextProps, "color" | "modifiers">;
  /** In async mode, cache the result of each `loadOptions` call by input string so the same query isn't re-fetched. */
  cacheOptions?: boolean;
  /** In single-select mode, render each option with a leading radio button for a more explicit "pick one" UI. Has no effect in multi-select mode. */
  showRadioButtons?: boolean;
  /** Per-subcomponent class overrides forwarded to react-select's `classNames` map. Each entry adds an extra class onto the corresponding internal subcomponent; use this for one-off styling without losing the default `tedi-select__*` BEM classes. */
  classNames?: unknown;
  /** Indicates whether the input field is required. If set to `true`, the required indicator (if provided) will be displayed next to the label. */
  required?: boolean;
  /** Controls the visibility of the label. Use `true` to hide the label visually while maintaining its space in the layout, or use 'keep-space' to hide it without collapsing the space it occupies. */
  hideLabel?: boolean | "keep-space";
  /** Renders the label as a `<span>` instead of a `<label>` element. This is useful when the `Form` component already handles labels internally. */
  renderWithoutLabel?: boolean;
  /** Tooltip content to display when hovering over the info button. If provided, an info button with a tooltip will be rendered. */
  tooltip?: React.ReactNode;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  args: {
    id: 'example-1',
    label: 'Label',
    defaultValue: options[1],
    options: options,
  },
};

// Sizes
export const Sizes: StoryObj<typeof TemplateSizes> = {
  render: TemplateSizes,
  args: {
    label: 'Label',
    options: options,
  },
};

// Type
export const Type: Story = {
  args: {
    options: options,
    label: 'Label',
  },
  render: (args) => (
    <VerticalSpacing>
      <Select {...args} id="type-default" label="Default" />
      <Select
        {...args}
        id="type-hint"
        label="With hint"
        helper={{ text: 'Hint text', type: 'hint', position: 'left' }}
      />
    </VerticalSpacing>
  ),
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

### Type

```jsx
/* Type */ compose(S, "Type")
```

### States

```jsx
/* States */ compose(S, "States")
```

### ValueType

```jsx
/* Value Type */ compose(S, "ValueType")
```

### EllipsisTags

```jsx
/* Ellipsis Tags */ compose(S, "EllipsisTags")
```

### Examples

```jsx
/* Examples */ compose(S, "Examples")
```

### MultipleHandled

```jsx
/* Multiple Handled */ compose(S, "MultipleHandled")
```

### AsyncSelect

```jsx
/* Async Select */ compose(S, "AsyncSelect")
```

### EditableSelect

```jsx
/* Editable Select */ compose(S, "EditableSelect")
```

### DeferKeyboardOnTouch

```jsx
/* Defer Keyboard On Touch */ compose(S, "DeferKeyboardOnTouch")
```
