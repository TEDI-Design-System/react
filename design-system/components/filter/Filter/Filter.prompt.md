Filter from @tedi-design-system/react. Use via `window.Tedi.Filter` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Filter.html`): Default, Size, Single Value Filter, Multi Value Filter, Customize Content, States, Custom Dropdown Content, Examples.

## Props

```ts
interface FilterProps {
  /** Trigger label. In single-select mode it's replaced by the picked option (or prefixed when `preserveLabel`). */
  text: string;
  /** Identifier for participating in a managed `<FilterGroup>`. Unused outside a group. */
  value?: string;
  disabled?: boolean;
  /** Class on the root wrapper `<div>` (not the inner `<button>`). */
  className?: string;
  /** Trigger `<button>` id. Auto-generated when omitted; also used as a prefix for sub-element ids. */
  id?: string;
  /** Selected appearance. - Toggle mode (no `options`, no `children`): controlled or uncontrolled (`defaultSelected`). - Custom-content mode (`children`): controlled-only — derive it from your own state. - Dropdown mode (`options`): ignored; derived from `selectedValue` / `selectedValues`. */
  selected?: boolean;
  /** Toggle-mode initial state. Ignored when `selected` is set. */
  defaultSelected?: boolean;
  /** Toggle-mode change callback. Not fired in custom-content or dropdown modes. */
  onSelectedChange?: (selected: boolean) => void;
  /** Single-select controlled value (`''` = nothing selected). Pair with `options`. */
  selectedValue?: string;
  /** Single-select initial value. Ignored when `selectedValue` is set. */
  defaultSelectedValue?: string;
  /** Single-select change callback — fires on commit or clear (`''`). */
  onSelectedValueChange?: (value: string) => void;
  /** Switch the dropdown to multi-select (checkboxes). Requires `options`. */
  multiselect?: boolean;
  /** Multi-select controlled values. */
  selectedValues?: string[];
  /** Multi-select initial values. Ignored when `selectedValues` is set. */
  defaultSelectedValues?: string[];
  /** Multi-select change callback — fires on toggle, "Select all", or clear. */
  onSelectedValuesChange?: (values: string[]) => void;
  /** Dropdown options. Mutually exclusive with `children` (children wins if both). */
  options?: FilterOption[];
  /** Search input that filters `options` by label (case-insensitive substring). */
  searchable?: boolean;
  /** Multi-select "Select all" toggle; targets enabled + visible options. */
  showSelectAll?: boolean;
  /** Override the `filter.select-all` i18n label. */
  selectAllLabel?: string;
  /** "Clear selection" button below the panel. Dropdown modes clear automatically; custom-content mode delegates to `onClear`. */
  showClear?: boolean;
  /** Override the `filter.clear-selection` i18n label. */
  clearLabel?: string;
  /** Single-select: keep `text` as a prefix once a value is picked ("Teenus: …"). */
  preserveLabel?: boolean;
  /** Custom dropdown content. Switches the filter into controlled custom-content mode. */
  children?: React.ReactNode;
  /** Fires when "Clear" is clicked in custom-content mode — reset your own state here. */
  onClear?: () => void;
  /** Slot before `text` (icon, status). Auto-replaced by a check icon when toggle-mode selected — disable via `hidePrependWhenSelected={false}`. */
  prepend?: React.ReactNode;
  /** Hide `prepend` while selected so the check icon can take its place. */
  hidePrependWhenSelected?: boolean;
  /** Slot after `text`. In multi-select sits alongside the built-in count badge. */
  append?: React.ReactNode;
  /** Floating UI placement; flips when room is tight. */
  placement?: "top" | "left" | "right" | "bottom" | "top-end" | "top-start" | "left-end" | "left-start" | "right-end" | "right-start" | "bottom-end" | "bottom-start";
  /** Accessible label for the search input. Falls back to `text`. */
  searchLabel?: string;
  /** Visual variant of the filter. */
  variant?: "primary" | "secondary";
  /** Visual size of the filter. */
  size?: "default" | "large";
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<FilterBreakpointProps>;
  md?: Partial<FilterBreakpointProps>;
  lg?: Partial<FilterBreakpointProps>;
  xl?: Partial<FilterBreakpointProps>;
  xxl?: Partial<FilterBreakpointProps>;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: Template,
  args: { text: 'Teenused' },
};

const sizeArray: FilterProps['size'][] = ['default', 'large'];

// Size
export const Size: Story = {
  render: () => (
    <div className="example-list">
      {sizeArray.map((value, key) => (
        <Row className={`${key === sizeArray.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
          <Col width={2}>
            <Text modifiers="bold">{value ? value.charAt(0).toUpperCase() + value.slice(1) : ''}</Text>
          </Col>
          <Col className="flex gap-2 flex-wrap">
            <Filter text="Text" size={value} selected />
            <Filter text="Text" size={value} />
            <Filter text="Text" size={value} />
            <Filter text="Text" size={value} />
          </Col>
        </Row>
      ))}
    </div>
  ),
};

/**
 * Single value filters include boolean toggles (separate and grouped) and single-select dropdown
 * filters. The grouped variant shares a `FilterGroup` to coordinate selection.
 */

// Single Value Filter
export const SingleValueFilter: Story = {
  render: () => (
    <VerticalSpacing>
      <VerticalSpacing size={1}>
        <Text modifiers="bold">Separate</Text>
        <div className="flex gap-2 flex-wrap">
          <Filter text="Vastuvõtud" defaultSelected />
          <Filter text="Analüüsid" defaultSelected />
          <Filter text="Uuringud" />
          <Filter text="Vaktsineerimised" />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Filter text="Vastuvõtud" variant="secondary" defaultSelected />
          <Filter text="Analüüsid" variant="secondary" defaultSelected />
          <Filter text="Uuringud" variant="secondary" />
          <Filter text="Vaktsineerimised" variant="secondary" />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Filter
            text="Vastuvõtud"
            variant="secondary"
            defaultSelected
            prepend={<Icon name="medical_services" size={18} color="inherit" />}
          />
          <Filter text="Analüüsid" variant="secondary" prepend={<Icon name="science" size={18} color="inherit" />} />
          <Filter text="Uuringud" variant="secondary" prepend={<Icon name="biotech" size={18} color="inherit" />} />
          <Filter
            text="Vaktsineerimised"
            variant="secondary"
            prepend={<Icon name="vaccines" size={18} color="inherit" />}
          />
        </div>
      </VerticalSpacing>

      <VerticalSpacing size={1}>
        <Text modifiers="bold">Grouped</Text>
        <div className="flex gap-2 flex-wrap">
          <FilterGroup>
            <Filter text="Kooskõlastatud" />
            <Filter text="Tagasilükatud" />
// …
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Size

```jsx
/* Size */ compose(S, "Size")
```

### SingleValueFilter

```jsx
/* Single Value Filter */ compose(S, "SingleValueFilter")
```

### MultiValueFilter

```jsx
/* Multi Value Filter */ compose(S, "MultiValueFilter")
```

### CustomizeContent

```jsx
/* Customize Content */ compose(S, "CustomizeContent")
```

### States

```jsx
/* States */ compose(S, "States")
```

### CustomDropdownContent

```jsx
/* Custom Dropdown Content */ compose(S, "CustomDropdownContent")
```

### Examples

```jsx
/* Examples */ compose(S, "Examples")
```
