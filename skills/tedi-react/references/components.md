# Component Reference

Two component namespaces are available. **Always prefer TEDI-Ready** components — they are production-grade, follow stricter conventions, and are actively maintained. Use Community components only when no TEDI-Ready equivalent exists.

- `@tedi-design-system/react/tedi` — TEDI-Ready (preferred)
- `@tedi-design-system/react/community` — Community/extended

---

# TEDI-Ready Components

All components are TypeScript, use CSS Modules with BEM naming (`tedi-` prefix). Import from `@tedi-design-system/react/tedi`.

**Legend:** fRef = forwardRef, poly = polymorphic (`as` prop), bp = breakpoint support, form = controlled/uncontrolled

## Base

### Icon
**Props:** `IconProps` | fRef
- `name: string` (required)
- `size: IconSize = 24` — 8, 12, 16, 18, 24, 36, 48
- `color: IconColor = 'primary'`
- `background?: IconBackgroundColor`
- `filled: boolean = false`
- `type: IconType = 'outlined'` — outlined, sharp, rounded
- `label?: string` — screen reader label

### Text
**Props:** `TextProps` | bp
- `children: ReactNode` (required)
- `element: TextElement = 'p'` — div, p, span, li, label, h1-h6
- `modifiers?: TextModifiers | TextModifiers[]` — normal, small, bold, italic, h1-h6, uppercase, etc.
- `color: TextColor = 'primary'`

### Heading
**Props:** `HeadingProps` extends TextProps | bp
- `element: HeadingLevel = 'h1'` — h1-h6

## Buttons

### Button
**Props:** `ButtonProps<C>` | fRef, poly, bp
- `children: ReactNode` (required)
- `visualType: ButtonType = 'primary'` — primary, secondary, neutral, link
- `color: ButtonColor = 'default'` — default, danger, success, inverted, text
- `size?: 'default' | 'small' | 'large'`
- `icon?: string | IconProps` — icon-only button
- `iconLeft?: string | IconProps`
- `iconRight?: string | IconProps`
- `isLoading?: boolean`
- `fullWidth?: boolean`
- `type?: 'submit' | 'button' | 'reset' = 'button'`

```tsx
<Button visualType="primary">Save</Button>
<Button visualType="secondary" iconLeft="arrow_back">Back</Button>
<Button icon="favorite" isLoading={loading} />
```

### ButtonGroup
**Props:** `ButtonGroupProps`
- `children: ReactNode`
- `type: 'primary' | 'secondary' = 'primary'`
- `stretch?: boolean`
- `onSelectionChange?: (id: string) => void`

### ClosingButton
**Props:** `ClosingButtonProps`
- `size: 'default' | 'small' = 'default'`
- `color: 'primary' | 'brand' | 'white' = 'primary'`

### Collapse
**Props:** `CollapseProps` | bp
- `id: string` (required)
- `children: ReactNode`
- `open?: boolean` (controlled), `defaultOpen?: boolean`
- `onToggle?: (open: boolean) => void`
- `arrowType: 'default' | 'secondary' = 'default'`
- `iconOnly?: boolean`

### FloatingButton
**Props:** `FloatingButtonProps`
- `children: ReactNode`
- `axis: 'horizontal' | 'vertical' = 'horizontal'`
- `size: 'medium' | 'large' = 'medium'`
- `position?: CSSProperties['position']`
- `placement?: FloatingButtonPlacement`

### InfoButton
**Props:** `InfoButtonProps` | fRef
- `isSmall?: boolean`
- `color: 'default' | 'inverted' = 'default'`

## Cards

### Card
**Props:** `CardProps` | fRef, bp
- `children?: ReactNode`
- `padding: CardContentPadding = 1`
- `background: CardBackground = 'primary'`
- `borderless?: boolean`

Sub-components: `Card.Header`, `Card.Content`, `Card.Notification`

```tsx
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Content>Body</Card.Content>
</Card>
```

## Content

### Label
**Props:** `LabelProps` | fRef, poly, bp
- `children: ReactNode`
- `required?: boolean`
- `isBold?: boolean`
- `isSmall?: boolean`
- `tooltip?: string`
- `htmlFor?: string`

### TextGroup
**Props:** `TextGroupProps` | bp
- `label: ReactNode` (required)
- `value: ReactNode | ReactNode[]` (required)
- `type: 'horizontal' | 'vertical' = 'vertical'`
- `labelWidth?: string | number`

```tsx
<TextGroup type="horizontal" labelWidth="200px" label="Status" value="Active" />
```

### List
**Props:** `ListProps` | bp
- `children: ReactElement<ListItemProps>[]`
- `element: 'ul' | 'ol' = 'ul'`
- `style: 'styled' | 'none' = 'none'`
- `color: BulletColor = 'brand'`

Sub-component: `List.Item`

### Section
**Props:** `SectionProps`
- `as?: 'section' | 'article' | 'aside' | 'div' = 'section'`

### HeadingWithIcon
**Props:** `HeadingWithIconProps`
- `children: ReactNode` (required)
- `name: string` (icon name)
- `element?: HeadingLevel = 'h4'`

### Truncate
**Props:** `TruncateProps` | bp
- `children: string` (required)
- `maxLength?: number = 200`
- `expandable?: boolean = true`

### Calendar
> **For plain date inputs use `DateField`.** Calendar is the lower-level primitive — reach for it only when you need an always-visible inline calendar (scheduling grid, availability picker) or are building a custom date control on top.

**Props:** `CalendarProps` extends `DayPickerProps`
- `mode?: 'single' | 'multiple' | 'range' = 'single'`
- `value: Date | Date[] | DateRange | undefined` (required) — shape matches the active `mode`
- `handleSelect: OnSelectHandler<...>` (required) — fires when a day is clicked
- `applyValue: (date: Date) => void` (required) — invoked when a month / year cell commits a selection via `selectionLevel`
- `currentMonth: Date` (required), `setCurrentMonth: (date: Date) => void` (required) — controlled visible month
- `view?: 'days' | 'months' | 'years' = 'days'`, `setView?: (view) => void` — controlled visible grid (independent of `selectionLevel`)
- `selectionLevel?: 'days' | 'months' | 'years' = 'days'` — coarser commit level: `'years'` selects Jan 1 of the picked year, `'months'` selects day 1
- `disabledMatchers?: Matcher[]` — same shape as DayPicker's `disabled`
- `availableDays?: Date[] | ((date) => boolean)`, `unavailableDays?: Date[] | ((date) => boolean)` — overlay highlights without disabling neighbours
- `monthYearSelectType?: 'dropdown' | 'grid' = 'dropdown'` — header picker style
- `showOutsideDays?: boolean = true`, `showNavigation?: boolean = true`
- `locale?: Locale = et`, `localeCode?: string = 'et-EE'`
- `required?: boolean`, `footer?: ReactNode`, `className?: string`

```tsx
import { Calendar } from '@tedi-design-system/react/tedi';

const [view, setView] = useState<'days' | 'months' | 'years'>('days');
const [month, setMonth] = useState(new Date());
const [date, setDate] = useState<Date | undefined>();

<Calendar
  mode="single"
  view={view}
  setView={setView}
  currentMonth={month}
  setCurrentMonth={setMonth}
  value={date}
  handleSelect={(value) => setDate(value as Date)}
  applyValue={setDate}
/>
```

### Table
TanStack Table v8 wrapper. Sub-components: `Table.HeaderButton`. Sortable / filterable / selectable / pinnable / expandable. Built-in pagination announces both **page changes and the result count** via `aria-live`, so JAWS reports state changes (incl. filtering down to a single page) automatically.

```tsx
<Table<Person> id="people" data={rows} columns={columns} pagination={pagination} />
```

**Props (selection):** `id`, `data`, `columns` (TanStack `ColumnDef<T>[]`), `pagination`, `sorting`, `rowSelection`, `columnPinning`, `expandedRows`, `activeRowId`, `rowHover`, `verticalBorders`, `striped`, `size: 'default' | 'small'`, `caption`, `emptyState`, `emptyStateRole`, `getSubRows`, `renderSubComponent`, `expandTrigger`, `autoResetPageIndex`.

#### Pagination — `pageSize`, `pageSizeOptions`, and appearance
`pagination` accepts `true` (defaults) or an options object: `{ pageSize?, pageSizeOptions?, paginationProps? }`. `pageSizeOptions` is the page-size selector list (`false` hides it). **`paginationProps`** forwards extra props to the built-in `Pagination` to change its appearance/behaviour (e.g. `background`, `borders`, `hideResults`, `showPrevNextButtons`, `arrowVariant`, `labels`); the data/state props the Table owns (`pageCount`, `page`, `totalItems`, `pageSize`, `pageSizeOptions`, change handlers) are managed internally and can't be overridden.

```tsx
<Table
  data={rows} columns={columns}
  pagination={{ pageSize: 25, pageSizeOptions: [25, 50], paginationProps: { background: 'transparent', showPrevNextButtons: true } }}
/>
```

#### Inline editing — keep the page with `autoResetPageIndex={false}`

`autoResetPageIndex` maps to TanStack's option of the same name and **defaults to `true`** — any change to the `data` array snaps the table back to page 1, which is right after filtering/sorting but wrong for inline editing. If the consumer mutates `data` in place (e.g. a "Muuda"/"Salvesta" row editor that replaces the rows array on save), pass `autoResetPageIndex={false}` so saving a row on page 10 leaves the user on page 10.

```tsx
<Table<Booking> id="bookings" data={editor.rows} columns={columns} autoResetPageIndex={false} pagination={pagination} />
```

#### Sortable / filterable headers — accessibility (set `meta.label`!)

`Table.HeaderButton` renders optional `children` **before** the icon, so the whole "label + icon" area is one clickable sort target (matches the Angular table — not an icon-only toggle next to inert text). Put the column label inside the button.

**When a column's `header` is a render function (custom sort/filter controls), always set `meta.label` on the column.** The Table uses it as the `<th>`'s `aria-label`, so screen readers announce just the column name for each body cell — **without it, the th's accessible name is computed from its contents and JAWS reads the sort/filter controls' text** (e.g. "Number, sort ascending, filter") as the column header (WCAG 1.3.1 / 4.1.2). As a safety net the Table falls back to the column `id`, but `meta.label` gives the human-friendly name.

Give the sort/filter controls themselves a column-scoped accessible name. The built-in labels are column-aware: `getLabel('table.sort', direction, columnLabel)` → e.g. "Sort by Name ascending"; `getLabel('table.filter', columnLabel)` → "Filter Name". (The per-column built-in filter input already uses `table.filter-input` with the column.)

```tsx
{
  id: 'name',
  accessorKey: 'name',
  meta: { label: 'Name' }, // ← th accessible name; without it the sort/filter controls get read as the header
  header: ({ column }) => {
    const sorted = column.getIsSorted();
    const icon = sorted === 'asc' ? 'arrow_upward' : sorted === 'desc' ? 'arrow_downward' : 'unfold_more';
    return (
      <Table.HeaderButton icon={icon} selected={!!sorted}
        aria-label={getLabel('table.sort', sorted, 'Name')} onClick={column.getToggleSortingHandler()}>
        Name
      </Table.HeaderButton>
    );
  },
}
```

#### Row-click expansion — `expandTrigger`

`expandTrigger?: 'button' | 'row'` (default `'button'`) controls how an expandable row (`getSubRows` / `renderSubComponent`) toggles:
- `'button'` — only the chevron toggles; it renders in the bordered `secondary` arrow style.
- `'row'` — a click anywhere on an **expandable** row toggles it (Enter / Space too); the chevron renders in the neutral `default` arrow style as a plain indicator. Only rows that can expand become clickable (get `role="button"`), so non-expandable rows stay inert.

```tsx
<Table<Person> id="people" data={rows} columns={columns} getSubRows={(r) => r.subRows} expandTrigger="row" />
```

#### Responsive — default is horizontal scroll; opt into a stacked layout

The Table already wraps itself in an `overflow-x: auto` container, so **wide tables scroll horizontally by default** with no props. There's no built-in "responsive" prop (parity with Angular, which composes the pattern in its story). To opt into a stacked layout, drive it at the call site with primitives the Table already has: hide secondary columns below a breakpoint via controlled `columnVisibility`, then re-surface them inside the expandable detail row (`renderSubComponent` + `getRowCanExpand`, both gated on the breakpoint). Use `useBreakpoint()` + `isBreakpointBelow(bp, 'md')` for the breakpoint, and `TextGroup` (`type="horizontal"`) for the label/value pairs. Only `columnVisibility` is controlled — expansion state stays internal:

```tsx
const belowMd = isBreakpointBelow(useBreakpoint(), 'md');
const columnVisibility = { email: !belowMd, role: !belowMd, location: !belowMd };
<Table<Person>
  id="people" data={rows} columns={columns}
  state={{ columnVisibility }}
  getRowCanExpand={() => belowMd}
  renderSubComponent={belowMd ? (row) => (
    <VerticalSpacing size={0.5}>
      <TextGroup type="horizontal" labelWidth="6rem" label="E-post" value={row.original.email} />
      {/* …one per hidden column */}
    </VerticalSpacing>
  ) : undefined}
/>
```

When `renderSubComponent` is `undefined` (≥ md) the expand column isn't rendered at all — the full table shows. See the `Responsive` story.

#### Nested rows + pagination — `paginateExpandedRows`

`paginateExpandedRows` maps to TanStack's option but **defaults to `false`** (TanStack's own default is `true`), matching Angular: expanding a parent renders its children on the *same* page and only top-level rows count toward `pageSize`, so opening a row never pushes siblings to the next page or splits a parent's children across pages. Pass `true` to restore TanStack's behavior where sub-rows occupy page slots like any other row. Only relevant when the table is both expandable (`getSubRows`) and client-paginated.

#### Accessibility — required for column headers with non-text content

- **Icon-only `Table.HeaderButton` requires `aria-label`.** With visible `children` (sortable headers above) the text supplies the accessible name and `aria-label` is optional — keep it to give a richer name like "Sorteeri X järgi". An icon-only button (e.g. a filter trigger) has no text, so `aria-label` is mandatory. Always include the column name — JAWS otherwise reads only "Sorteeri kasvavalt, button" with no indication of *what* you're sorting:
  ```tsx
  <Table.HeaderButton icon="filter_alt" aria-label={`Filtreeri ${columnLabel}`} />  {/* icon-only → aria-label required */}
  ```
- **For columns with a function `header` (custom JSX containing sort / filter buttons, info icons, etc.), set `meta.label`**. The Table puts `aria-label={meta.label}` on the `<th>` so screen readers use the clean column name as the column header announcement for every cell. Without it, JAWS reads the full visible header text — including the button labels — for *every* data cell:
  ```tsx
  {
    id: 'teenus',
    accessorKey: 'teenus',
    header: ({ column }) => (
      <Table.HeaderButton icon="unfold_more" aria-label="Sorteeri Teenus järgi"
        onClick={column.getToggleSortingHandler()}>
        Teenus
      </Table.HeaderButton>
    ),
    meta: { label: 'Teenus' },  // ← required when `header` is a function
  }
  ```
  String headers (`header: 'Teenus'`) don't need `meta.label` — the string is used automatically.
- **Filter popovers with validation must use `TextField`'s `invalid` + `helper` props**, not a custom red-bordered div. The Table doesn't ship built-in filter validation today, but if you add min-length / format checks, the only WCAG 3.3.1-compliant path is to wire the error through `TextField`. `invalid` sets `aria-invalid`; `helper` with `type: 'error'` renders the message via `<FeedbackText>` and auto-wires it into the input's `aria-describedby`. A red border + red helper text alone (the Angular bug) fails error identification because screen readers can't see colour:
  ```tsx
  <TextField
    id={`filter-${column}`} label={column} value={draft} onChange={setDraft}
    invalid={hasError}
    helper={hasError ? { type: 'error', text: getLabel('table.filter.validation.min-length', 3) } : undefined}
  />
  ```
  The labels `table.filter.validation.min-length` / `table.filter.validation.no-spaces` already exist in `labels-map.ts` — use them as-is for parity with Angular. **Max length / pattern / any other validation rule** belongs on `TextField` directly — pass `maxLength={40}` and let the native HTML attribute enforce it, plus mirror the rule in `invalid` + `helper` if you want a visible error before submit. Don't invent a Table-level `validation: { minLength, maxLength }` config — the primitives already cover it.
- **For "no results after filter" announcements, set `emptyStateRole="status"` on the Table.** The Table wraps the empty state in `<div role={emptyStateRole}>` (an ARIA live region), so screen readers announce it when a filter empties the rows. `'status'` is polite (recommended); `'alert'` is assertive (interrupts the current SR utterance). Leave the prop undefined for tables that are empty on first mount and never change — otherwise the live region announces on every render. The empty-state content itself is the `emptyState` prop (a string or an `<EmptyState>` node).
  ```tsx
  <Table data={rows} columns={columns} emptyStateRole="status" />
  ```

## Form

### TextField
**Props:** `TextFieldProps` | fRef, bp, form
- `id: string` (required)
- `label?: string`
- `value?: string`, `defaultValue?: string`
- `onChange?: (value: string) => void`
- `icon?: string | IconProps`
- `isClearable?: boolean`
- `size?: 'default' | 'small' | 'large'`
- `helper?: FeedbackTextProps | FeedbackTextProps[]`
- `disabled?: boolean`, `readOnly?: boolean`, `invalid?: boolean`

```tsx
<TextField id="email" label="Email" icon="mail" isClearable value={email} onChange={setEmail} />
```

### Select
**Props:** `SelectProps` | fRef, bp, form
- `id: string` (required)
- `label?: string`
- `options?: OptionsOrGroups<ISelectOption>`
- `value?: TSelectValue`, `defaultValue?: TSelectValue`
- `onChange?: (value: TSelectValue) => void`
- `multiple?: boolean`
- `isSearchable?: boolean = true`
- `isClearable?: boolean = true`
- `async?: boolean`, `loadOptions?: Function`
- `tagsDirection?: 'stack' | 'row'`

```tsx
<Select id="country" label="Country" options={countries} value={sel} onChange={setSel} />
```

### TextArea
**Props:** `TextAreaProps` extends TextFieldProps | fRef, bp, form
- `characterLimit?: number`

### NumberField
**Props:** `NumberFieldProps` | form
- `id: string` (required)
- `label?: string`
- `value?: number`, `defaultValue?: number`
- `onChange?: (value: number) => void`
- `min?: number`, `max?: number`, `step?: number = 1`
- `suffix?: string`

### Slider
**Props:** `SliderProps` extends `BreakpointSupport` | fRef (HTMLInputElement)
- `id?: string`, `name?: string`
- `label?: ReactNode`, `hideLabel?: boolean | 'keep-space'`, `required?: boolean`
- `min?: number = 0`, `max?: number = 100`, `step?: number = 1`
- `value?: number`, `defaultValue?: number`
- `onChange?: (value: number) => void`
- `minLabel?: ReactNode`, `maxLabel?: ReactNode`
- `showCurrentValue?: boolean` — renders current value on the right instead of `maxLabel`
- `valueFormatter?: (value: number) => ReactNode` — also used for the thumb tooltip
- `tooltip?: boolean = true` — bubble above the thumb showing the current value
- `addonRight?: ReactNode` — slot for a companion input (e.g. `NumberField`)
- `disabled?: boolean`, `invalid?: boolean`
- `helper?: FeedbackTextProps`
- `'aria-label' | 'aria-labelledby' | 'aria-valuetext'?: string`

```tsx
<Slider id="volume" label="Volume" min={0} max={100} defaultValue={40} minLabel="0%" maxLabel="100%" />
```

### Checkbox
**Props:** `CheckboxProps` | form
- `id: string` (required)
- `label?: ReactNode`
- `value: string` (required)
- `checked?: boolean`, `defaultChecked?: boolean`
- `onChange?: (value: string, checked: boolean) => void`
- `indeterminate?: boolean`
- `size?: 'default' | 'small'`

### Radio
**Props:** `RadioProps` | form
Same as Checkbox (without indeterminate)

### ChoiceGroup
**Props:** `ChoiceGroupProps` | bp, form
- `id: string` (required), `name: string` (required)
- `label: ReactNode | string`
- `items: ExtendedChoiceGroupItemProps[]`
- `inputType?: 'radio' | 'checkbox' = 'radio'`
- `value?: ChoiceGroupValue`, `defaultValue?: ChoiceGroupValue`
- `variant?: 'default' | 'segmented'`

### Search
**Props:** `SearchProps` extends TextFieldProps | bp, form
- `onSearch?: (value: string) => void`
- `button?: Partial<ButtonProps>`

### DateField
**Props:** `DateFieldProps` extends `DayPickerProps` | fRef (`TextFieldForwardRef`), bp, form
- `id: string` (required), `label: string` (required)
- `mode?: 'single' | 'multiple' | 'range' = 'single'` — selection model
- `selected?: Date | Date[] | DateRange`, `defaultValue?: Date | Date[] | DateRange`
- `onSelect?: OnSelectHandler<Date | Date[] | DateRange | undefined>`
- `placeholder?: string`
- `required?: boolean`, `readOnly?: boolean`
- `formatDate?: (date) => string` — display formatter (default: `dd.MM.yyyy`, et-EE)
- `parseDate?: (value: string) => Date | Date[] | DateRange | undefined` — manual-input parser; without it the field is calendar-only
- `locale?: Locale = et`, `localeCode?: string = 'et-EE'`
- `initialMonth?: Date`
- `closeOnSelect?: boolean` — default: `true` for `'single'`, `false` otherwise
- `footer?: ReactNode` — slot below the calendar grid
- `monthYearSelectType?: 'dropdown' | 'grid' = 'dropdown'` — header pickers
- `selectionLevel?: 'days' | 'months' | 'years' = 'days'` — coarser commit level
- `showOutsideDays?: boolean = true`
- **Disabling:** `disabled?: Matcher | Matcher[]`, `minDate?: Date`, `maxDate?: Date`, `disablePast?: boolean`, `disableFuture?: boolean`, `shouldDisableMonth?: (date) => boolean`, `shouldDisableYear?: (date) => boolean`
- `availableDays?: Date[] | ((date) => boolean)` — opposite of `disabled`
- `inputProps?: Omit<TextFieldProps | MultiValueFieldProps, 'label' | 'id'>` — pass-through to the underlying input
- **Breakpoint-aware:** `enableCalendar?: boolean = true`, `calendarTrigger?: 'input' | 'button' = 'button'`, `useNativePicker?: boolean = false` (`'single'` mode only — swaps to `<input type="date">`), `numberOfMonths?: number` (clamped to 1 below `md`)

The ref shape mirrors TextField (`{ input, wrapper }`). In `'multiple'` mode the underlying control is `MultiValueField`, so `ref.current.input` is `null` there. The calendar trigger button carries `aria-haspopup="dialog"` + `aria-expanded`; when `calendarTrigger="input"` those land on the `<input>` instead.

```tsx
<DateField
  id="birthdate"
  label="Birth date"
  defaultValue={new Date(1990, 0, 1)}
  onSelect={(date) => console.log(date)}
  minDate={new Date(1900, 0, 1)}
  disableFuture
/>

// Range with manual input parsing
<DateField
  id="period"
  label="Period"
  mode="range"
  parseDate={(v) => /* return DateRange */}
  selected={range}
  onSelect={setRange}
  closeOnSelect={false}
/>

// Native picker on mobile, custom calendar on desktop
<DateField id="dob" label="Date of birth" useNativePicker md={{ useNativePicker: false }} />
```

### TimeField
**Props:** `TimeFieldProps` | bp, form
- `id: string` (required), `label: string` (required)
- `value?: string`, `defaultValue?: string` — `"HH:mm"` 24-hour format
- `onChange?: (time: string) => void`
- `placeholder?: string`
- `required?: boolean`, `readOnly?: boolean`
- `stepMinutes?: number = 1` — minute increment for the picker wheel / grid
- `availableTimes?: string[]` — limit selectable times to a fixed list (`["09:00", "09:30", …]`); switches the popover to grid mode
- `inputProps?: Omit<TextFieldProps, 'id' | 'label' | 'value' | 'onChange'>` — pass-through to the underlying input
- `className?: string`
- **Breakpoint-aware:** `useNativePicker?: boolean = false` (swap to `<input type="time">`; ignores `availableTimes`), `showPicker?: boolean = true`, `timePickerTrigger?: 'input' | 'button' = 'button'`, `availableTimesVariant?: 'grid-buttons' | 'grid-radio' | 'dropdown'` — which variant the picker renders when `availableTimes` is set

```tsx
<TimeField id="meeting" label="Meeting time" value={time} onChange={setTime} stepMinutes={15} />

// Constrain to specific slots, render as a radio-button grid
<TimeField
  id="slot"
  label="Available slot"
  availableTimes={['09:00', '09:30', '10:00', '14:00', '15:30']}
  availableTimesVariant="grid-radio"
  value={slot}
  onChange={setSlot}
/>

// Native picker on mobile, custom wheel on desktop
<TimeField id="alarm" label="Alarm" useNativePicker md={{ useNativePicker: false }} />
```

### TimePicker
> **For plain time inputs use `TimeField`.** TimePicker is the lower-level picker primitive — reach for it only when you need a standalone, always-visible time selector (scheduling UI, custom popover, side-by-side with a calendar in a DateTime composite).

**Props:** `TimePickerProps` | form
- `value?: string`, `defaultValue?: string` — `"HH:mm"`
- `onChange?: (time: string) => void`
- `stepMinutes?: number = 1` — minute increment for the wheel
- `availableTimes?: string[]` — switches from scroll-wheel mode to a predefined-slots grid
- `gridVariant?: 'button' | 'radio' = 'button'` — only used with `availableTimes`
- `bordered?: boolean = true` — set `false` when embedding inside a parent that already provides its own surface (e.g. alongside a Calendar)
- `className?: string`

The wheel column supports full keyboard navigation: `ArrowUp` / `ArrowDown` and `PageUp` / `PageDown` cycle through the column (wrap at both ends), `Home` / `End` jump to the bounds, `Enter` / `Space` commit the highlighted value.

```tsx
import { TimePicker } from '@tedi-design-system/react/tedi';

<TimePicker value={time} onChange={setTime} stepMinutes={5} />

// Predefined slots
<TimePicker
  availableTimes={['09:00', '10:00', '11:00', '14:00']}
  gridVariant="radio"
  value={slot}
  onChange={setSlot}
/>
```

### FileUpload
**Props:** `FileUploadProps` | form
- `id: string` (required), `name: string` (required)
- `accept?: string`
- `multiple?: boolean`
- `files?: FileUploadFile[]`, `defaultFiles?: FileUploadFile[]`
- `maxSize?: number`

### FileDropzone
**Props:** `FileDropzoneProps`
- `label: string` (required)
- `accept?: string`, `multiple?: boolean`, `maxSize?: number`

## Layout

### Row / Col (Grid)
```tsx
<Row cols={3} gutter={2} alignItems="center">
  <Col width={6}>Half</Col>
  <Col width={6}>Half</Col>
</Row>
```

**Row:** `cols`, `gutter` (0-5), `gutterX`, `gutterY`, `gap`, `justifyContent`, `alignItems`, `direction`, `wrap` + breakpoints
**Col:** `width` (1-12 or 'auto'), `offset`, `order`, `grow`, `shrink` + breakpoints

### VerticalSpacing
**Props:** `VerticalSpacingProps` | bp
- `children: ReactNode`
- `size?: VerticalSpacingSize = 1` — 0-5 in em
- `element?: keyof JSX.IntrinsicElements = 'div'`

Sub-component: `VerticalSpacing.Item`

### Header
**Props:** `HeaderProps`
- `children: ReactNode` (required)
- `toggle?: ReactNode` — mobile side navigation toggle
- `bottom?: ReactNode` — content below header on mobile

Sub-components: `Header.Logo`, `Header.Center`, `Header.Actions`, `Header.Language`, `Header.Login`, `Header.Logout`, `Header.Profile`, `Header.Role`, `Header.Search`

**Header.Logo:** `logo: ReactNode`, `logoDark?: ReactNode`, `href?: string`, `showLogo?: boolean = true`
- `showLogo` is a simple boolean for feature flags or custom media queries. For responsive hiding at standard breakpoints, wrap with `<ShowAt>`/`<HideAt>` instead (e.g. `<ShowAt md><Header.Logo ... /></ShowAt>`).

**Header.Center:** `children: ReactNode`, `alignment?: 'flex-start' | 'center' | 'space-between' = 'center'`
**Header.Actions:** `children: ReactNode`

**Header.Role:** `HeaderRoleProps`
- `representatives: Representative[]` (required) — `Representative` has `id: string` (required), `name: string`, `description?: string`, `icon?: string | IconProps`
- `label?: ReactNode` — descriptive label above the name
- `showDescription?: boolean = true` — show the selected representative's description in the header area
- `isOrganization?: boolean` — organization context (affects search label)
- `accordionLabels?: { open?: string; close?: string }` — custom toggle labels on mobile
- `searchLabel?: string` — search input label (falls back to i18n)
- `organizationSearchLabel?: string` — search label when `isOrganization` is true
- `searchId?: string` — id for the search input (falls back to `useId()`)
- `showSearch?: boolean = false` — show search input above the representative list
- `searchClearable?: boolean = false` — show clear button on search input
- `clearSearchOnSelect?: boolean = true` — clear search when a representative is selected
- `showRoleSwitch?: boolean` — show the role selection toggle (defaults to true when multiple representatives)
- `children?: ReactNode` — custom content replacing the default representative list
- `noResultsContent?: ReactNode` — custom content when filtered list is empty
- `onRepresentativeChange?: (representative: Representative) => void`
- `onRoleSelectionToggle?: (isOpen: boolean) => void`
- When multiple `Header.Role` components are inside a `Header.Profile`, opening one accordion automatically closes the others on mobile/tablet.

**Header.Language:** `HeaderLanguageProps`
- `languages: Language[]` (required) — `Language` has `label: string`, `locale?: TediLanguage`, `onClick?: (props: { onToggle }) => void`, `isSelected?: boolean`, `aria-label?: string`
- `currentLanguage?: string` — initially displayed label (falls back to matching locale or first item)
- `selectLabel?: string` — label for the selector (falls back to i18n)

**Header.Login:** bp — `size?: 'default' | 'small'` (auto `'small'` on mobile), `label?: string`, `onClick?: () => void`, `href?: string`
**Header.Logout:** bp — `size?: 'default' | 'small'` (auto `'small'` on mobile), `label?: string`, `onClick?: () => void`, `href?: string`
**Header.Profile:** bp — `showPopover?: Breakpoint = 'lg'`, `label?: string`, `showLabel?: boolean = false`, `disabled?: boolean = false`, `noStyle?: boolean = false`, `children: ReactNode`
- `noStyle` removes default padding, borders, and background from modal children. Does not affect `Header.Role`'s own 4px brand bottom border.

**Header.Search:** wrapper that accepts a Search child (and optional `mobileVariant`). `children: ReactNode`, `mobileVariant?: 'modal' | 'inline'`, `mobileLabels?: { button?, modalTitle? }`, `disabled?: boolean`

```tsx
<Header
  toggle={<SideNav.Toggle />}
  bottom={
    <Header.Search mobileVariant="inline">
      <Search label="Search" hideLabel id="header-search" />
    </Header.Search>
  }
>
  <Header.Logo logo={<img src="/logo.svg" alt="Logo" />} href="/" />
  <Header.Center><Link href="/about">About</Link></Header.Center>
  <Header.Actions>
    <Header.Search>
      <Search label="Search" hideLabel id="header-search" />
    </Header.Search>
    <Header.Language />
    <Header.Login />
  </Header.Actions>
</Header>
```

### SideNav
**Props:** `SideNavProps<C>` | poly
- `ariaLabel: string` (required)
- `navItems: SideNavItemProps<C>[]` (required)
- `linkAs?: ElementType` — polymorphic link component
- `collapsible?: boolean`
- `mobileBreakpoint?: 'mobile' | 'tablet'`

Sub-components: `SideNav.Toggle`, `SideNav.Item`, `SideNav.Dropdown`, `SideNav.Mobile`

## Loaders

### Spinner
**Props:** `SpinnerProps` | bp
- `size: SpinnerSize = 16` — 10, 16, 18, 48
- `color: 'primary' | 'secondary' = 'primary'`
- `label?: string`

### Skeleton
**Props:** `SkeletonProps`
- `children?: ReactNode`
- `label?: string`

Sub-component: `Skeleton.Block`

## Navigation

### Link
**Props:** `LinkProps<C>` | fRef, poly, bp
- `children: ReactNode`
- `underline?: boolean = true`
- `visualType?: ButtonType = 'link'`
- `icon?: string | IconProps`
- `iconLeft?: string | IconProps`
- `target?: string`, `href?: string`

```tsx
<Link href="/docs" target="_blank">Documentation</Link>
<Link as={NavLink} to="/profile">Profile</Link>
```

### Breadcrumbs
**Props:** `BreadcrumbsProps` | bp

> The community `Breadcrumbs` (`@tedi-design-system/react/community`) is **⚠️ DEPRECATED** in favour of this TEDI-Ready component (same name; import from `/tedi` instead of `/community`).

- `children: ReactNode` (required) — each top-level child becomes one crumb; chevron separators are inserted between them
- `ariaLabel?: string` — falls back to the `breadcrumbs` label from `LabelProvider`
- `showMoreLabel?: string` — sr-only label for the ellipsis button in collapsed mode; falls back to the `breadcrumbs.show-more` label from `LabelProvider`
- `separator?: ReactNode` — node rendered between crumbs (string like `'/'`, an `Icon`, or any markup); defaults to a chevron icon and is always hidden from assistive technology
- `className?: string`
- **Breakpoint-aware:**
  - `variant?: 'long' | 'short' = 'long'` — `'short'` renders only the second-to-last child as a back-link with an `arrow_back` icon (mobile pattern); renders nothing if fewer than two children are supplied
  - `maxItems?: number` — when set and the trail is longer, the middle crumbs collapse into a `…` button that opens a `Dropdown` listing the hidden crumbs (long variant only)
  - `itemsBeforeCollapse?: number = 1`, `itemsAfterCollapse?: number = 1` — how many crumbs stay visible on each side of the ellipsis

Children-as-data API (same shape as MUI's `Breadcrumbs`). Use `<Link>` (or any anchor) for navigable crumbs and a plain element (e.g. `<span>`) for the current page — add `aria-current="page"` to it yourself. The component wraps each child in an `<li>` inside an `<ol>`; separators are `<li aria-hidden="true">` so screen readers announce only the actual crumbs.

In short mode the component clones the second-to-last child to inject `iconLeft="arrow_back"` (works if that child is a TEDI `Link`; otherwise pass `iconLeft` explicitly or the clone is a no-op for unrecognised props).

```tsx
import { Breadcrumbs, Link } from '@tedi-design-system/react/tedi';

<Breadcrumbs>
  <Link href="/">Dashboard</Link>
  <Link href="/docs">Documents</Link>
  <Link href="/docs/mine">My documents</Link>
  <span aria-current="page">Application nr 506</span>
</Breadcrumbs>

// Short variant — renders only "← My documents"
<Breadcrumbs variant="short">{...}</Breadcrumbs>

// Short on mobile, full trail from md up
<Breadcrumbs variant="short" md={{ variant: 'long' }}>{...}</Breadcrumbs>

// Condensed — middle crumbs collapse into a "…" dropdown
<Breadcrumbs maxItems={4} itemsBeforeCollapse={1} itemsAfterCollapse={2}>
  <Link href="/">Dashboard</Link>
  <Link href="/patients">Patients</Link>
  <Link href="/patients/anna">Anna Tamm</Link>
  <Link href="/patients/anna/visits">Visits</Link>
  <Link href="/patients/anna/visits/2024-05-12">2024-05-12</Link>
  <span aria-current="page">Restrictions</span>
</Breadcrumbs>
```

## Notifications

### Alert
**Props:** `AlertProps` | bp
- `children?: ReactNode`
- `title?: ReactNode`
- `type: AlertType = 'info'` — info, success, warning, danger
- `icon?: string | IconProps`
- `onClose?: () => void` — adds close button
- `role?: 'alert' | 'status' | 'none' = 'alert'`

```tsx
<Alert type="success" title="Saved" onClose={dismiss}>Changes saved.</Alert>
```

### Toast
```tsx
import { sendNotification, ToastContainer } from '@tedi-design-system/react/tedi';

// In root
<ToastContainer />

// Trigger
sendNotification({ type: 'info', title: 'Update', children: 'New version available' });
```

## Overlays

### Tooltip
Sub-components: `Tooltip.Trigger`, `Tooltip.Content`

```tsx
<Tooltip>
  <Tooltip.Trigger><Icon name="info" /></Tooltip.Trigger>
  <Tooltip.Content>Help text</Tooltip.Content>
</Tooltip>
```

**Props:** `openWith?: 'hover' | 'click' | 'focus' | 'manual'`

### Dropdown
Sub-components: `Dropdown.Trigger`, `Dropdown.Content`, `Dropdown.Item`, `Dropdown.Separator`

```tsx
<Dropdown>
  <Dropdown.Trigger><Button>Menu</Button></Dropdown.Trigger>
  <Dropdown.Content>
    <Dropdown.Item onClick={edit}>Edit</Dropdown.Item>
    <Dropdown.Separator />
    <Dropdown.Item onClick={del}>Delete</Dropdown.Item>
  </Dropdown.Content>
</Dropdown>
```

**Props:** `width`, `placement`, `divided`, `open?` (controlled), `modal?: boolean`

### Popover
Sub-components: `Popover.Trigger`, `Popover.Content`

**Props:** `openWith?: 'click'`, `dismissible`, `role?: 'dialog'`

## Tags

### Tag
**Props:** `TagProps` | bp
- `children: ReactNode` (required)
- `color: TagColor = 'primary'`
- `onClose?: MouseEventHandler` — shows close button
- `isLoading?: boolean`

```tsx
<Tag color="primary" onClose={remove}>React</Tag>
```

### StatusBadge
**Props:** `StatusBadgeProps` | bp
- `children?: ReactNode`
- `color: StatusBadgeColor = 'neutral'`
- `variant: 'filled' | 'filled-bordered' | 'bordered' = 'filled'`
- `status?: 'danger' | 'success' | 'warning' | 'inactive'`
- `icon?: string`

```tsx
<StatusBadge color="success" status="success" icon="check">Active</StatusBadge>
```

## Misc

### Separator
**Props:** `SeparatorProps` | bp
- `axis: 'horizontal' | 'vertical' = 'horizontal'`
- `color: 'primary' | 'secondary' | 'accent' = 'primary'`
- `variant?: 'dotted' | 'dot-only'`
- `thickness?: 1 | 2`
- `spacing?: SeparatorSpacing`

---

# Community Components

Import from `@tedi-design-system/react/community`. These are community-contributed, have relaxed review standards, and are **not recommended** when a TEDI-Ready equivalent exists.

## Cards

### Accordion
- `openItem?: string[]`, `onToggleItem?: (id: string) => void`, `gutter?: VerticalSpacingSize`
- Sub-components: AccordionItem, AccordionItemHeader, AccordionItemContent

### Card
- `border?: CardBorderType`, `borderless?: boolean`, `padding?: number`, `background?: CardBackground`
- Sub-components: Card.Header, Card.Content, Card.Notification

## Buttons

### Button — **DEPRECATED** (use TEDI-Ready Button)
### Anchor — **DEPRECATED** (use TEDI-Ready Link)

## Form

### Check (Checkbox) — **DEPRECATED** (use TEDI-Ready Checkbox)
### Radio — **DEPRECATED** (use TEDI-Ready Radio via ChoiceGroup)

### Select
- `id: string`, `options`, `value?`, `defaultValue?`, `onChange?`
- `multiple?: boolean`, `async?: boolean`, `isSearchable?: boolean`, `isClearable?: boolean`

### Toggle
- `ariaLabel: string`, `label?`, `checked?`, `defaultChecked?`, `onChange?`
- `size?: 'medium' | 'large'`, `color?: 'default' | 'alternative'`, `icon?`, `disabled?`

### ChoiceGroup
- `id: string`, `items: ChoiceGroupItemProps[]`, `inputType?: 'radio' | 'checkbox'`
- `type?: 'light' | 'selector' | 'filter' | 'default'`, `value?`, `onChange?`

### FileUpload
- `id: string`, `name: string`, `accept?`, `multiple?`, `maxSize?`
- `files?`, `defaultFiles?`, `onChange?`, `onDelete?`

### TextEditor (Draft.js)
- `id: string`, `defaultValue?`, `onChange?`, `placeholder?`
- `inlineStyleControls?: string[]`, `blockStyleControls?: string[]`

### HiddenField (toggle-to-edit)
- `fieldType: 'textfield' | 'select' | 'datetime'`
- `fieldOptions: TextFieldProps | SelectProps | DateTimePickerProps`
- `content: ReactNode`

### DateTimePicker
- Date/time picker using MUI x-date-pickers

## Navigation

### Stepper
- `activeStep?`, `defaultActiveStep?: number`, `onActiveStepChange?`
- `allowStepLabelClick?: boolean`, `ariaLabel: string`, `card?: CardProps | boolean`

### Tabs
- `currentTab?: string`, `defaultCurrentTab?`, `onTabChange?`
- Sub-components: Tabs.Nav, Tabs.NavItem, Tabs.Item

### TableOfContents
- `items: TableOfContentsItemProps[]`, `heading?`, `open?`, `defaultOpen?`
- `showIcons?: boolean`, `breakToMobile?: boolean`

## Overlay

### Dropdown — **DEPRECATED** (use TEDI-Ready Dropdown)

### Modal
- `size?: 12 | 10 | 8 | 6`, `position?: 'center' | 'right' | 'bottom'`
- `lockScroll?: boolean`, `trapFocus?: boolean`, `returnFocus?: boolean`
- Sub-components: ModalProvider, ModalTrigger, ModalCloser

### Tooltip — **DEPRECATED** (use TEDI-Ready Tooltip)

### Feedback (modal-based)
- `triggerProps?: ButtonProps`, `fixedTrigger?: 'both' | 'desktop' | 'mobile'`

## Tags

### Tag — **DEPRECATED** (use TEDI-Ready Tag)

### Status
- `type: 'error' | 'success' | 'inactive' | 'warning'`
- `tooltipContent?: ReactNode`

## Table

### Table (TanStack React Table wrapper)
- `data: TData[]`, `columns: ColumnDef[]`
- `pagination?`, `sorting?`, `rowSelection?`, `columnPinning?`
- `onPaginationChange?`, `onSortingChange?`, `onRowSelectionChange?`
- `hidePagination?: boolean`, `size?: 'medium'`
- `getSubRows?`, `renderSubComponent?`, `expandTrigger?: 'button' | 'row'` (`'row'` = whole expandable row toggles, neutral chevron)
- `autoResetPageIndex?: boolean` (default `true`) — set `false` for inline-editing tables so saving a row doesn't jump back to page 1
- `paginateExpandedRows?: boolean` (default `false`, unlike TanStack's `true`) — keeps a parent's expanded children on its page instead of letting them consume page slots / split across pages
- `Table.HeaderButton` accepts `children` (label before icon) so the whole sort header is clickable; `aria-label` optional when `children` present, required for icon-only buttons
- Responsive: horizontal scroll is the default (built-in `overflow-x: auto`). For a stacked layout, hide columns below a breakpoint via controlled `columnVisibility` + reveal them in `renderSubComponent` (no dedicated prop — composed at the call site)

## Layout

### Header
- Sub-components: HeaderContent, HeaderActions, HeaderNavigation, HeaderLanguage, HeaderRole, HeaderSettings, HeaderNotifications, HeaderLogo
- **Note:** The TEDI-Ready Header is now available with a different sub-component API. Prefer the TEDI-Ready version for new work.

## Misc

### Placeholder (empty state)
- `icon?: string | IconProps | ReactNode`, `cardProps?`, `isNested?: boolean`

### VerticalStepper
- `isCompact?: boolean`
- Sub-components: StepItem, SubItem

### VerticalProgress
- `children: ReactNode`, `onItemOpen: (index: number) => void`

### ToggleOpen
- `openText: string`, `closeText: string`, `isOpen: boolean`

### Map Components
14 specialized components for map UI interactions (BaseMapSelection, Legend, MapLayer, Directions, Timeline, etc.)
