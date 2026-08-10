InputGroup from @tedi-design-system/react. Use via `window.Tedi.InputGroup` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Sub-components: `InputGroup.Prefix`, `InputGroup.Suffix`, `InputGroup.Input`. See the DS docs for composition — e.g. items like `InputGroup.Item` go inside `<InputGroup>`; containers like `InputGroup.Group` wrap multiple `<InputGroup>`s.

Variants (see `InputGroup.html`): Start Static, Start Dynamic, End Static, End Dynamic, States, With Button Addons, With Feedback Text.

## Props

```ts
interface InputGroupProps {
  /** Additional class name(s) applied to the root element of the InputGroup. Useful for custom styling or layout overrides. */
  className?: string;
  /** Enables merged styling between input and its prefix/suffix elements. When `true`, borders and radius are visually combined into a single control. Disable this when using non-standard addons (e.g. buttons) that should not visually merge. */
  addons?: boolean;
  /** Helper or feedback text displayed below the input group. Can be a single item or multiple messages (e.g. error + hint). Accepts the same props as `FeedbackText`. */
  helper?: FeedbackTextProps | FeedbackTextProps[];
  /** InputGroup composition slots. Typically includes `InputGroup.Input` and optionally `InputGroup.Prefix` and/or `InputGroup.Suffix`. */
  children: React.ReactNode;
  /** Disables the entire input group. Applies disabled styles to the group and propagates the disabled state to the input and any interactive prefix/suffix elements. */
  disabled?: boolean;
  /** Marks the whole group as invalid. Applies the error border to the prefix/suffix addons and propagates `invalid` down to the inner form control, so you don't have to set it on the child as well. Pair with an error `helper` message. */
  invalid?: boolean;
  /** The unique identifier for the input element that this label is associated with. This ID should match the input element's `id` attribute to ensure accessibility. */
  id: string;
  /** The text content of the label that describes the input field. */
  label: React.ReactNode;
  /** Controls the visibility of the label. Use `true` to hide the label visually while maintaining its space in the layout, or use 'keep-space' to hide it without collapsing the space it occupies. */
  hideLabel?: boolean | "keep-space";
  /** Indicates whether the input field is required. If set to `true`, the required indicator (if provided) will be displayed next to the label. */
  required?: boolean;
  /** Renders the label as a `<span>` instead of a `<label>` element. This is useful when the `Form` component already handles labels internally. */
  renderWithoutLabel?: boolean;
  /** Specifies the size of the label text. Options include 'small' for a smaller label size or 'default' for the standard size. */
  size?: "default" | "small";
  /** Tooltip content to display when hovering over the info button. If provided, an info button with a tooltip will be rendered. */
  tooltip?: React.ReactNode;
}
```

## Examples

```jsx
// Start Static
export const StartStatic: Story = {
  args: {
    label: 'Address',
  },
  render: (args) => (
    <InputGroup {...args} id="start-static">
      <InputGroup.Prefix>Street</InputGroup.Prefix>
      <InputGroup.Input>
        <Field />
      </InputGroup.Input>
    </InputGroup>
  ),
};

const COUNTRIES = [
  { code: 'EE', name: 'Estonia', dial: '372' },
  { code: 'LV', name: 'Latvia', dial: '371' },
  { code: 'LT', name: 'Lithuania', dial: '370' },
  { code: 'FI', name: 'Finland', dial: '358' },
];

const CURRENCIES = [
  { code: 'EUR', name: 'Euro' },
  { code: 'USD', name: 'US Dollar' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'SEK', name: 'Swedish Krona' },
];

const ACCOUNTS = [
  { label: 'Checking · EE38 2200 2210 2014 5685', value: 'checking' },
  { label: 'Savings · EE96 2200 2210 2014 7283', value: 'savings' },
  { label: 'Investment · EE27 2200 2210 2014 8120', value: 'investment' },
];

const FILE_FORMATS = ['PDF', 'XLSX', 'DOCX', 'CSV', 'TXT'];

const SEARCH_CATEGORIES = ['All', 'Articles', 'People', 'Files', 'Projects'];

const PhonePrefixRow = () => {
  const [country, setCountry] = useState(COUNTRIES[0]);
// …

// Start Dynamic
export const StartDynamic: Story = {
  render: () => (
    <VerticalSpacing>
      <PhonePrefixRow />
      <CurrencyPrefixSelectRow />
      <FileFormatPrefixRow />
      <SearchCategoryPrefixRow />
    </VerticalSpacing>
  ),
};

// End Static
export const EndStatic: Story = {
  args: {
    label: 'Cost',
  },
  render: (args) => (
    <InputGroup {...args} id="end-static">
      <InputGroup.Input>
        <Field />
      </InputGroup.Input>
      <InputGroup.Suffix>EUR</InputGroup.Suffix>
    </InputGroup>
  ),
};

const TIMEZONES = [
  { code: 'UTC', label: 'UTC' },
  { code: 'EET', label: 'EET (UTC+2)' },
  { code: 'CET', label: 'CET (UTC+1)' },
  { code: 'EST', label: 'EST (UTC−5)' },
];

const MEETINGS = [
  { label: 'Weekly sync · Mon 09:00', value: 'weekly-sync' },
  { label: 'Product review · Wed 14:00', value: 'product-review' },
  { label: 'All-hands · Fri 11:00', value: 'all-hands' },
];

const CostUnitSuffixRow = () => {
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  return (
    <Row>
      <Col lg={4} md={12}>
        <InputGroup label="Cost" id="end-cost-currency">
          <InputGroup.Input>
            <Field type="tel" />
          </InputGroup.Input>
          <InputGroup.Suffix>
            <Dropdown>
              <Dropdown.Trigger>
                <Button noStyle className="flex align-items-center">
// …
```

### StartStatic

```jsx
/* Start Static */ compose(S, "StartStatic")
```

### StartDynamic

```jsx
/* Start Dynamic */ compose(S, "StartDynamic")
```

### EndStatic

```jsx
/* End Static */ compose(S, "EndStatic")
```

### EndDynamic

```jsx
/* End Dynamic */ compose(S, "EndDynamic")
```

### States

```jsx
/* States */ compose(S, "States")
```

### WithButtonAddons

```jsx
/* With Button Addons */ compose(S, "WithButtonAddons")
```

### WithFeedbackText

```jsx
/* With Feedback Text */ compose(S, "WithFeedbackText")
```

## Related

`InputGroup.Prefix`, `InputGroup.Suffix`, `InputGroup.Input`
