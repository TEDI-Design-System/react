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
/>;
```

### Table
TanStack Table v8 wrapper. Sub-components: `Table.HeaderButton`. Sortable / filterable / selectable / pinnable / expandable. Built-in pagination announces both **page changes and the result count** via `aria-live`, so JAWS reports state changes (incl. filtering down to a single page) automatically.

```tsx
<Table<Person> id="people" data={rows} columns={columns} pagination={pagination} />
```

**Props (selection):** `id`, `data`, `columns` (TanStack `ColumnDef<T>[]`), `pagination`, `sorting`, `rowSelection`, `columnPinning`, `expandedRows`, `activeRowId`, `rowHover`, `verticalBorders`, `striped`, `size: 'default' | 'small'`, `caption`, `emptyState`, `emptyStateRole`, `getSubRows`, `renderSubComponent`, `expandTrigger`, `autoResetPageIndex`, `getRowId` (stable row id — set it when using `rowSelection`/`activeRowId`/`reorderableRows` with data that has a key, else ids fall back to the row index).

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
- **Customise the built-in per-column filter input via `meta.filterProps`.** When you use `enableColumnFilters` (the auto-rendered filter row), forward `TextField` props to a column's filter field through `meta.filterProps` — e.g. cap the length with `meta: { filterProps: { input: { maxLength: 40 } } }`, or set a custom `placeholder`/`helper`. The Table owns the field's identity and state (`id`, `name`, `label`, `hideLabel`, `value`, `onChange`), so those can't be overridden; everything else (incl. `input` HTML attributes, `size`, `invalid`) passes through.
  ```tsx
  const columns: ColumnDef<Row>[] = [
    { accessorKey: 'name', header: 'Name', meta: { filterProps: { input: { maxLength: 40 } } } },
  ];
  <Table data={rows} columns={columns} enableColumnFilters />
  ```
- **For "no results after filter" announcements, set `emptyStateRole="status"` on the Table.** The Table wraps the empty state in `<div role={emptyStateRole}>` (an ARIA live region), so screen readers announce it when a filter empties the rows. `'status'` is polite (recommended); `'alert'` is assertive (interrupts the current SR utterance). Leave the prop undefined for tables that are empty on first mount and never change — otherwise the live region announces on every render. The empty-state content itself is the `emptyState` prop (a string or an `<EmptyState>` node).
  ```tsx
  <Table data={rows} columns={columns} emptyStateRole="status" />
  ```

#### Reordering — `reorderableRows` / `reorderableColumns` (mouse + keyboard)

Both are accessible by **mouse and keyboard**. A grip handle (`≡`) is added to each row / draggable header; keyboard users Tab to it, press `Space`/`Enter` to pick up, arrow keys to move (`↑`/`↓` rows, `←`/`→` columns), `Space`/`Enter` to drop, `Escape` to cancel. Every move/drop/cancel is announced via a built-in `aria-live` region (i18n keys `table.reorder.*` / `table.row-reorder.*`).

- **`reorderableColumns`** is self-contained — it reorders TanStack's `columnOrder` internally (flows through `onStateChange` / `persist`). No extra wiring. Built-in (`__select__`/`__expand__`/`__drag__`) and grouped columns are skipped.
- **`reorderableRows`** emits **`onRowDrop({ fromId, toId, fromIndex, toIndex })`** on every move (keyboard too) — the consumer applies it to its data and passes the new array back. Stepping requires the consumer to apply each emit:
  ```tsx
  <Table id="t" data={rows} columns={columns} reorderableRows
    onRowDrop={({ fromIndex, toIndex }) => setRows((cur) => arrayMove(cur, fromIndex, toIndex))} />
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

### Filter / FilterGroup
**Props:** `FilterProps`, `FilterGroupProps` | form

Compact pill-shaped trigger used to refine result sets. Four modes — chosen at render time
by which props are present:

- **Toggle** — no `options`, no `children`. Acts like a sticky checkbox.
- **Single-select dropdown** — pass `options`. Selecting commits the value and closes the panel.
- **Multi-select dropdown** — `options` + `multiselect`. Clicking does not close. Supports
  `searchable`, `showSelectAll`, `showClear`.
- **Custom dropdown content** — pass `children` to embed any panel (date picker, radio group).

```tsx
import { Filter, FilterGroup } from '@tedi-design-system/react/tedi';

// Toggle
<Filter text="Active" selected={active} onSelectedChange={setActive} />

// Single-select with "Label: Value" trigger
<Filter
  text="Service"
  options={[{ label: 'Optometrist', value: '1' }, { label: 'Dentist', value: '2' }]}
  preserveLabel
  selectedValue={service}
  onSelectedValueChange={setService}
  showClear
  appendTo="body"
/>

// Multi-select with search & "select all"
<Filter
  text="Hospitals"
  multiselect
  options={hospitalOptions}
  selectedValues={hospitals}
  onSelectedValuesChange={setHospitals}
  searchable
  showSelectAll
  showClear
  appendTo="body"
/>

// Custom dropdown content — show clear action that resets consumer state
<Filter text={periodLabel} selected={!!period} showClear onClear={() => setPeriod('')}>
  <ChoiceGroup id="period" label="Period" inputType="radio" items={periodItems}
    value={period} onChange={setPeriod} />
</Filter>
```

Wrap related filters in `FilterGroup` to coordinate selection:

```tsx
// Single-select group (radio-like, role="radiogroup")
<FilterGroup label="Status" value={status} onValueChange={setStatus}>
  <Filter text="All" value="all" />
  <Filter text="Active" value="active" />
  <Filter text="Done" value="done" />
</FilterGroup>

// Multi-select group (checkbox-like, role="group")
<FilterGroup label="Tags" multiselect values={tags} onValuesChange={setTags}>
  <Filter text="Urgent" value="urgent" />
  <Filter text="Review" value="review" />
</FilterGroup>

// Visual-only group (no managed props — children stay independent)
<FilterGroup>
  <Filter text="Foo" defaultSelected />
  <Filter text="Bar" />
</FilterGroup>
```

Key props:
- `variant?: 'primary' | 'secondary'`, `size?: 'default' | 'large'`
- `prepend?: ReactNode`, `append?: ReactNode`, `hidePrependWhenSelected?: boolean`
- `appendTo?: 'body' | HTMLElement` — portal target for the dropdown
- `selectAllLabel?: string` (default `'Vali kõik'`), `clearLabel?: string` (default `'Tühjenda valik'`)


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
  <Header.Center>
    <Link href="/about">About</Link>
  </Header.Center>
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

### Footer
**Props:** `FooterProps`
- `children: ReactNode` — composition of `Footer.Side`, `Footer.Body` (with `Footer.Section` children), `Footer.Bottom`
- `mobileBreakpoint?: Breakpoint = 'sm'` — viewport at and below which the entire footer flips to stacked mobile layout (sections become accordions, sides stack, bottom strip wraps). Propagated to every sub-slot via context so they all agree on the threshold.
- `maxWidth?: number | string` — caps the inner content (the column row **and** the bottom strip's content) to a max width and centers it, while the dark backgrounds stay full-bleed. Pass any CSS length (`1280`, `'1280px'`, `'80rem'`). Read by `Footer.Bottom` via context so both align to the same width.
- `className?: string`

**Sub-components:**
- `Footer.Side` — logo slot, `placement?: 'start' | 'end' = 'start'`, `position?: 'start' | 'center' | 'end' = 'center'`
- `Footer.Body` — wraps `Footer.Section` columns; switches to stacked column layout below `mobileBreakpoint`. Accepts breakpoint-aware `columns?: number` — **mobile-first** (a value applies at that breakpoint and up), so raise the count as the viewport widens (e.g. `columns={2} lg={{ columns: 4 }}`). When set, lays the sections out as a CSS grid of that many equal-width tracks instead of the default content-sized `space-between` row; ignored below `mobileBreakpoint`, where the body always stacks into one column.
- `Footer.Section` — section column with `heading`, optional `icon`, `collapsible?` (accordion below `mobileBreakpoint`), `defaultOpen?`, `iconBreakpoint?: Breakpoint = 'lg'` (separate threshold for icon hiding)
- `Footer.Bottom` — bottom strip for legal / utility links; `separator?: boolean = false` inserts a dot between items (Figma "with separator" variant) instead of plain `gap` spacing
- All three content slots (`Footer.Body`, `Footer.Side`, `Footer.Bottom`) accept arbitrary nodes — the footer is a layout shell, so you can drop social-icon links in a right-hand `Footer.Side`, a centered brand logo in `Footer.Bottom`, etc.

```tsx
// Default: flips to mobile at `sm` (≤ 576px)
<Footer>
  <Footer.Side placement="start"><img src="/logo.svg" alt="" /></Footer.Side>
  <Footer.Body>
    <Footer.Section heading="Contact" icon="phone" collapsible>
      <Link href="/contact">Contact us</Link>
      <Link href="/help">Help center</Link>
    </Footer.Section>
    <Footer.Section heading="Legal" collapsible>
      <Link href="/privacy">Privacy</Link>
    </Footer.Section>
  </Footer.Body>
  <Footer.Bottom>
    <Link href="/terms">Terms</Link>
  </Footer.Bottom>
</Footer>

// Tablet-first: flips to mobile at `md` so tablets get the stacked layout
<Footer mobileBreakpoint="md">{/* … */}</Footer>

// Hide section icons earlier (at `xl` instead of the default `lg`)
<Footer.Section iconBreakpoint="xl" icon="mail" heading="Newsletter">…</Footer.Section>

// Cap + center the content on wide screens; fixed 4-col grid that steps to 2 at `lg`
<Footer maxWidth={1280}>
  <Footer.Body columns={2} lg={{ columns: 4 }}>{/* … */}</Footer.Body>
</Footer>
```

`mobileBreakpoint` is the single knob for layout flip — set it once on `<Footer>` and every sub-slot picks it up. `Footer.Section`'s `iconBreakpoint` is independent because design typically drops the section icons one tier earlier than the full mobile flip.

### TopNav

**Props:** `TopNavProps`

- `children: ReactNode` (required) — only `TopNav.Item` and `TopNav.Separator` children render; others are ignored. Fragments are flattened.
- `ariaLabel: string` (required) — accessible name for the `<nav>` landmark
- `mobileBreakpoint?: Breakpoint = 'md'` — below this, the bar collapses into a `SideNavMobile` drawer
- `isMobileOpen?: boolean`, `onMenuToggle?: (open: boolean) => void` — controlled mobile drawer state
- `showMobileOverlay?: boolean = true`
- `submenuFit?: 'full' | 'content' = 'full'` — `'full'` renders a centered full-width mega-menu panel below the bar; `'content'` makes the panel only as wide as its content, anchored under the active item (same padding — not a smaller/tighter variant)
- `maxWidth?: number | string | 'none' = 'xxl'` — clamps the inner content (bar items + mega-menu inner panel) to a max width and centers it inside the full-width blue bar. Accepts a CSS length (`1440`, `'90rem'`), a breakpoint name (`'sm'|'md'|'lg'|'xl'|'xxl'` → that breakpoint's min-width), or `'none'`/`0` to disable.
- `className?: string`, `id?: string`

Sub-components: `TopNav.Item`, `TopNav.Group`, `TopNav.SubItem`, `TopNav.Separator`

**`TopNav.Item` props**

- `children: ReactNode` (required) — visible label
- `href?: string` — omit + provide `submenu` for a toggle-only mega-menu parent (renders `<button type="button">` with `aria-haspopup`/`aria-expanded`)
- `submenu?: ReactNode` — mega-menu content, typically `TopNav.Group` children
- `icon?: string | IconWithoutBackgroundProps`
- `isActive?: boolean = false` — adds `aria-current="page"`, applies the active visual, and (when paired with `submenu`) opens the mega-menu panel
- `disabled?: boolean = false` — drops `href` and suppresses `onClick`; on toggle items sets native `disabled`
- `onClick?: (event) => void`
- `as?: C extends ElementType` — polymorphic `forwardRef` (defaults to the auto `<a>`/`<button>`); pass a routing component (e.g. `NavLink`) and its props + `ref` are typed. `TopNav.SubItem` is polymorphic the same way.
- `className?: string`

**`TopNav.Group` props** (mega-menu column)

- `children: ReactNode` (required) — `TopNav.SubItem` children only
- `title?: ReactNode` — uppercase section heading; when omitted, no heading renders (and the `icon` prop is ignored)
- `icon?: string | IconWithoutBackgroundProps` — leading icon next to the title
- `headingLevel?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h3'`
- `className?: string`

**`TopNav.SubItem` props** (mega-menu link)

- `children: ReactNode` (required), `href?: string`, `isActive?: boolean`, `onClick?`, `as?`, `className?`

**`TopNav.Separator`** — visual divider between bar items (no props)

Compound API. Below `mobileBreakpoint` the bar disappears and the items + mega-menu groups are projected into the same `SideNavMobile` drawer that Sidenav uses — apps that mix both navs get one consistent mobile experience instead of two competing drawers. The full-width blue bar background stops at the item row; the mega-menu opens below it as a true dropdown (white panel with shadow, clamped to `maxWidth`).

```tsx
import { TopNav } from '@tedi-design-system/react/tedi';

// Flat bar
<TopNav ariaLabel="Primary navigation">
  <TopNav.Item href="/" icon="home" isActive>Dashboard</TopNav.Item>
  <TopNav.Item href="/data" icon="folder_shared">My data</TopNav.Item>
  <TopNav.Separator />
  <TopNav.Item href="/settings" icon="settings">Settings</TopNav.Item>
</TopNav>

// Mega-menu (toggle-only parent: omit href, provide submenu)
<TopNav ariaLabel="Primary" maxWidth="xl">
  <TopNav.Item submenu={
    <>
      <TopNav.Group title="Marriage" icon="favorite">
        <TopNav.SubItem href="/m/apply">Get married</TopNav.SubItem>
        <TopNav.SubItem href="/m/cert">Marriage certificate</TopNav.SubItem>
      </TopNav.Group>
      <TopNav.Group title="Children">
        <TopNav.SubItem href="/c/birth">Birth registration</TopNav.SubItem>
      </TopNav.Group>
    </>
  }>Family</TopNav.Item>
</TopNav>

// Narrow mega-menu anchored to the item (single-column dropdown style)
<TopNav ariaLabel="Primary" submenuFit="item">…</TopNav>

// Controlled mobile drawer paired with an external hamburger
<TopNav ariaLabel="Primary" isMobileOpen={open} onMenuToggle={setOpen}>
  ...
</TopNav>
```

**Notes / gotchas**

- Only one item can open a mega-menu at a time — the component tracks `isActive` for link items and internal toggle state for `<button>` parents.
- Top-level items either link (`href`) or toggle (no `href` + `submenu`) — don't pass an `<a>` parent to `submenu`; the mega-menu lives below the trigger, not inside it.
- The `<nav>` blue background only paints the bar row, not the area behind the mega-menu. The mega-menu panel is white with a drop shadow and centers itself inside the `maxWidth` constraint.
- Pair an external hamburger (`SideNav.Toggle` or `MobileNavToggle`) with `isMobileOpen` + `onMenuToggle` to put a header-level toggle in charge of opening the mobile drawer. Wrap the toggle in `<HideAt md>` (or whichever breakpoint matches `mobileBreakpoint`) so it only appears in mobile mode.

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

### ProgressBar

**Props:** `ProgressBarProps` | bp

- `value?: number = 0` — clamped to `0..100`; `NaN` treated as `0`
- `id?: string` — forwarded to the bar (auto-generated when omitted)
- `small?: boolean = false` — 4px bar (default 8px)
- `label?: string`, `labelPosition?: 'top' | 'horizontal' = 'top'`, `required?: boolean = false`
- `showValue?: boolean = true`, `valuePosition?: 'horizontal' | 'bottom' = 'horizontal'`
- `valueLabel?: string` — override the rendered % (e.g. `"1 / 5"`); also exposed via `aria-valuetext`
- `ariaLabel?: string` — falls back to `label`
- `helper?: FeedbackTextProps` — hint or error row rendered below the bar
- `className?: string`

Renders `role="progressbar"` with `aria-valuenow / aria-valuemin / aria-valuemax`. Pair with `label` (or `ariaLabel`) for the accessible name. Error / hint rows use the shared `FeedbackText` component.

**Breakpoint support:** the layout props — `small`, `labelPosition`, `showValue`, `valuePosition`, `valueLabel`, `helper`, `className` — accept per-breakpoint overrides via `sm`/`md`/`lg`/`xl`/`xxl` (mobile-first: a bare value is the `xs` baseline; `defaultServerBreakpoint?` sets the SSR baseline). e.g. stack label/value below the bar on mobile, inline from `md` up. `value`, `label`, `required`, `ariaLabel`, `id` are not breakpoint-aware.

```tsx
<ProgressBar value={60} label="Upload progress" />
<ProgressBar value={20} label="Step" valueLabel="1 / 5" />
<ProgressBar value={50} label="Upload" helper={{ text: 'Upload failed', type: 'error' }} />

// Responsive: stacked on mobile, inline from md up
<ProgressBar value={40} label="Upload" valuePosition="bottom" md={{ labelPosition: 'horizontal', valuePosition: 'horizontal' }} />
```

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

### HorizontalStepper
**Props:** `HorizontalStepperProps` | fRef
- `children: ReactNode` (required) — `HorizontalStepper.Item` elements; the parent auto-numbers the steps
- `aria-label?: string` — accessible name for the `<nav>` landmark
- `background?: 'default' | 'transparent' = 'default'`
- `compact?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' = 'sm'` — collapse to indicators + the selected label (`true` = always; a breakpoint = collapse below it)
- `className?: string`

**`HorizontalStepper.Item`** — `HorizontalStepperItemProps` | fRef
- `label: string` (required), `description?: string`
- `completed?: boolean`, `error?: boolean` (error wins over completed), `selected?: boolean`, `disabled?: boolean`
- `onSelect?: () => void` — fires on click unless `selected` or `disabled`

```tsx
import { HorizontalStepper } from '@tedi-design-system/react/tedi';

<HorizontalStepper aria-label="Form progress">
  {steps.map((label, i) => (
    <HorizontalStepper.Item
      key={label}
      label={label}
      completed={i < current}
      selected={i === current}
      onSelect={() => setCurrent(i)}
    />
  ))}
</HorizontalStepper>
```

### Pagination
**Props:** `PaginationProps` | fRef | bp

Page-number list with prev/next arrows, an optional "X results" label, and an optional page-size `Select`. Announces page changes via a polite `aria-live` region. Below `md` **both** the number list **and** the page-size select collapse into compact triggers that open a mobile modal picker (radio-style list; opening it scrolls the active option to the top and focuses it).

- `pageCount: number` (required), `page?` (controlled, 1-based) + `onPageChange?`, or `defaultPage?` (uncontrolled)
- `totalItems?` → renders the results label; `pageSize?` + `pageSizeOptions?: (number | PaginationPageSizeOption)[]` + `onPageSizeChange?` → renders the page-size select. Options are plain numbers, or `{ value, label }` objects when the visible text should differ — most commonly a **"Show all"** entry `{ value: totalItems, label: 'Show all' }`. Selecting emits the option's numeric `value`; the consumer recomputes `pageCount` (a large value collapses it to 1, hiding the pager). Pass the label already translated.
- `boundaryCount? = 1`, `siblingCount? = 1` — how many page numbers stay visible at the ends / around the active page before `…`
- `background?: 'white' | 'transparent' = 'white'`, `borders?: 'top' | 'bottom' | 'both' | 'none' = 'top'`
- `hideResults?`, `hidePageSize?`, `hidePager?: boolean | Breakpoint` — hide a slot entirely, or only below the given breakpoint
- `labels?: Partial<PaginationLabels>` — override aria/text labels (`previous`, `next`, `results`, `pageSize`, `pageStatus`, …); otherwise sourced from `LabelProvider`

**Arrow variants** (harmonized with Angular):
- `showPrevNextButtons?: boolean = false` — keep the prev/next arrow visible-but-disabled at the first/last page instead of dropping it (stable footprint). Angular calls this `disableArrowsAtBoundary`.
- `showEdgeNavLabels?: boolean = false` — render the arrows as **small text links** (label + icon, link colour, underline on hover) instead of icon-only circles.
- `previousIcon? = 'arrow_back'`, `nextIcon? = 'arrow_forward'` — override the arrow glyphs (e.g. `'chevron_left'` / `'chevron_right'`).
- `arrowVariant?: 'default' | 'primary' = 'default'` — `'primary'` renders the arrows as **primary small `Button`s with the label text + a leading/trailing arrow icon** (always shows the label, so `showEdgeNavLabels` has no effect in this mode).

**Breakpoint support:** the visual props — `boundaryCount`, `siblingCount`, `background`, `borders`, `showPrevNextButtons`, `showEdgeNavLabels`, `previousIcon`, `nextIcon`, `arrowVariant` — accept per-breakpoint overrides via the `sm`/`md`/`lg`/`xl`/`xxl` keys (mobile-first: a bare value is the `xs` baseline; `defaultServerBreakpoint?` sets the SSR baseline). e.g. icon-only arrows on mobile, labelled primary buttons on desktop.

```tsx
const [page, setPage] = useState(1);
<Pagination
  pageCount={10} page={page} onPageChange={setPage}
  totalItems={97} pageSize={10} pageSizeOptions={[10, 25, 50, 100]} onPageSizeChange={setSize}
/>

// "Show all" — a labelled page-size option; recompute pageCount so it collapses to one page
<Pagination
  pageCount={Math.max(1, Math.ceil(total / size))} page={page} onPageChange={setPage}
  totalItems={total} pageSize={size}
  pageSizeOptions={[10, 25, 50, { value: total, label: 'Show all' }]}
  onPageSizeChange={setSize}
/>

// Prominent, labelled navigation
<Pagination pageCount={10} page={page} onPageChange={setPage} arrowVariant="primary" showPrevNextButtons />

// Responsive: compact icon-only arrows below md, prominent labelled buttons from md up
<Pagination pageCount={10} page={page} onPageChange={setPage} arrowVariant="default" showPrevNextButtons md={{ arrowVariant: 'primary' }} />
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
<Alert type="success" title="Saved" onClose={dismiss}>
  Changes saved.
</Alert>
```

### Toast

```tsx
import { sendNotification, ToastContainer } from '@tedi-design-system/react/tedi';

// In root
<ToastContainer />;

// Trigger
sendNotification({ type: 'info', title: 'Update', children: 'New version available' });
```

## Overlays

### Tooltip

Sub-components: `Tooltip.Trigger`, `Tooltip.Content`

```tsx
<Tooltip>
  <Tooltip.Trigger>
    <Icon name="info" />
  </Tooltip.Trigger>
  <Tooltip.Content>Help text</Tooltip.Content>
</Tooltip>
```

**Props:** `openWith?: 'hover' | 'click' | 'focus' | 'manual'`

### Dropdown

Sub-components: `Dropdown.Trigger`, `Dropdown.Content`, `Dropdown.Item`, `Dropdown.Separator`

```tsx
<Dropdown>
  <Dropdown.Trigger>
    <Button>Menu</Button>
  </Dropdown.Trigger>
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

### Modal
Portalled dialog with focus trapping, backdrop, and scroll locking (built on floating-ui).

Sub-components: `Modal.Trigger`, `Modal.Content`, `Modal.Header`, `Modal.Body`, `Modal.Footer`, `Modal.Closer`

```tsx
<Modal>
  <Modal.Trigger><Button>Open</Button></Modal.Trigger>
  <Modal.Content width="md" position="center">
    <Modal.Header title="Title" description="Optional supporting text" />
    <Modal.Body>{/* content */}</Modal.Body>
    <Modal.Footer>
      <Modal.Closer><Button visualType="secondary">Cancel</Button></Modal.Closer>
      <Modal.Closer><Button>Save</Button></Modal.Closer>
    </Modal.Footer>
  </Modal.Content>
</Modal>
```

**`Modal` props (provider — open/close state)**
- `defaultOpen?: boolean` — uncontrolled initial state
- `open?: boolean` + `onToggle?: (open: boolean) => void` — controlled mode
- `closeOnBackdropClick: boolean = true`
- `closeOnEscape: boolean = true`
- `role: 'dialog' | 'alertdialog' = 'dialog'` — use `'alertdialog'` for destructive confirmations (higher SR urgency, requires explicit dismissal)

**`Modal.Content` props** | bp (on `width`, `maxWidth`, `position`, `fullscreen`)
- `width: ModalWidth = 'md'` — preset (`xs|sm|md|lg|xl`) or any CSS length (`'800px'`, `'60vw'`)
- `maxWidth?: string` — cap for custom widths (lighter than overriding `width`)
- `size: 'default' | 'small' = 'default'` — header/body/footer padding density (`'small'` ≈ 42px header)
- `position: 'center' | 'top' | 'right' | 'left' | 'bottom' = 'center'` — side positions render drawers; flip per breakpoint, e.g. `position="right" md={{ position: 'center' }}` or `position="bottom"` for a mobile sheet
- `fullscreen: boolean | 'edge' = false` — `true` = padded fullscreen (16px backdrop stays), `'edge'` = edge-to-edge (no padding/border/radius); combine with bp keys for responsive (e.g. `fullscreen md={{ fullscreen: false }}`)
- `scrollBehavior: 'content' | 'page' = 'content'` — internal body scroll vs. overlay-level page scroll
- `trapFocus: boolean = true`, `returnFocus: boolean = true`
- `initialFocus?: number | RefObject<HTMLElement>` — element focused on open (tabbable index, `0` = first/default, `-1` = the dialog itself, or a ref to a specific element — e.g. focus the active option in a picker)
- `showOverlay: boolean = true` — toggle the dimmed backdrop
- `lockScroll: boolean = true`
- `visuallyHiddenDismiss?: boolean` — adds SR-only dismiss buttons for touch screen readers
- `aria-labelledby?`, `aria-describedby?` — usually wired automatically by `Modal.Header`
- `aria-label?: string` — plain-text accessible name when there's no visible title (icon-only / list-only dialogs); ignored when `aria-labelledby` is set

**`Modal.Header` props**
- `title?: ReactNode` — rendered as `<h3>`, auto-registered as `aria-labelledby`
- `description?: ReactNode` — auto-registered as `aria-describedby`
- `closeButton: boolean = true`
- `closeButtonProps?: Omit<ClosingButtonProps, 'onClick'>`
- `children?: ReactNode` — replaces the default title/description layout

**`Modal.Body` props**
- `noScroll?: boolean` — disable internal scroll (pair with `scrollBehavior="page"` on Content)
- Body padding is driven by the `--modal-body-padding` / `--modal-body-padding-sm` CSS custom properties — override them on `Modal.Content` (e.g. set to `0`) for an edge-to-edge body such as a full-bleed list or sheet

**`Modal.Footer` props**
- `children?: ReactNode` — right-aligned actions (default)
- `left?: ReactNode` — when set, footer splits into left + right halves

**`Modal.Closer`** — wraps any clickable element to close the modal on click. Preserves the wrapped element's `onClick`.

**`useModal()` hook** — read the public subset of Modal state from any descendant of `<Modal>`. **This is the hook to reach for as a consumer.** Returns:
- `open: boolean`
- `onOpenChange: (open: boolean) => void` — programmatically open / close
- `labelId: string`, `descriptionId: string` — for manual `aria-labelledby` / `aria-describedby` wiring when you replace `Modal.Header`

Throws if called outside a `<Modal>` subtree.

> `useModalContext` and `ModalContext` are also exported alongside `useModal`, but they're for the package's own sub-components — they expose floating-ui plumbing (`reference`, `floating`, `getReferenceProps`, …) which causes subtle focus / dismissal bugs when touched from outside the Modal package. **Always prefer `useModal()`** in consumer code.

```tsx
import { Modal, useModal, Button, ClosingButton } from '@tedi-design-system/react/tedi';

function CustomHeader({ title }: { title: string }) {
  const { labelId, onOpenChange } = useModal();
  return (
    <Modal.Header>
      <h2 id={labelId}>{title}</h2>
      <ClosingButton onClick={() => onOpenChange(false)} />
    </Modal.Header>
  );
}

function ConfirmButton({ onConfirm }: { onConfirm: () => void }) {
  const { onOpenChange } = useModal();
  return (
    <Button onClick={() => { onConfirm(); onOpenChange(false); }}>Confirm</Button>
  );
}
```

```tsx
// Responsive: side drawer on desktop, centered on mobile
<Modal.Content position="right" md={{ position: 'center' }} defaultServerBreakpoint="md">

// ScrollFade inside the body — modal hands scroll-ownership over automatically
<Modal.Body>
  <ScrollFade fadePosition="both" fadeSize={10}>
    <div style={{ padding: 'var(--modal-body-padding)' }}>{/* long content */}</div>
  </ScrollFade>
</Modal.Body>
```

## Tags

### Tag

**Props:** `TagProps` | bp

- `children: ReactNode` (required)
- `color: TagColor = 'primary'`
- `onClose?: MouseEventHandler` — shows close button
- `isLoading?: boolean`

```tsx
<Tag color="primary" onClose={remove}>
  React
</Tag>
```

### StatusBadge

**Props:** `StatusBadgeProps` | bp

- `children?: ReactNode`
- `color: StatusBadgeColor = 'neutral'`
- `variant: 'filled' | 'filled-bordered' | 'bordered' = 'filled'`
- `status?: 'danger' | 'success' | 'warning' | 'inactive'`
- `icon?: string`

```tsx
<StatusBadge color="success" status="success" icon="check">
  Active
</StatusBadge>
```

## Misc

### Separator

**Props:** `SeparatorProps` | bp

- `axis: 'horizontal' | 'vertical' = 'horizontal'`
- `color: 'primary' | 'secondary' | 'accent' = 'primary'`
- `variant?: 'dotted' | 'dot-only'`
- `thickness?: 1 | 2`
- `spacing?: SeparatorSpacing`

### Timeline
Vertical timeline for a sequence of events. **Compound API** — composed from `Timeline.Item` children, each with `Timeline.Title`, `Timeline.Description` and any extra content. Responsive: reflows below the `lg` breakpoint (timings stack above the marker on mobile). Mark the current step with `activeIndex` — earlier items render as completed (past), later ones as upcoming (future); the marker dot is filled for current/past, outlined for future, and the connecting line is accent up to the current item.

- `<Timeline activeIndex? variant? cardPadding? className?>` props:
  - `activeIndex?: number` — current item; omit for all-future.
  - `variant?: 'default' | 'card' = 'default'` — `card` wraps the timeline in card chrome.
  - `cardPadding?: number` — item padding in rem for the `card` variant (same scale as `Card`).
- `<Timeline.Item timings? timingsBottom? children>`:
  - `timings?: string[]` — timing labels (e.g. `['2024', '16. detsember']`); the first renders larger on desktop, inline on mobile.
  - `timingsBottom?: ReactNode` — pinned to the bottom of the timings column on desktop, rendered after the content on mobile (e.g. a "last modified" note).
  - Pass a leading icon by placing it inside `Timeline.Title`. Any non-title/description children render below the description (buttons, `Collapse`, etc.).
- `<Timeline.Title>` / `<Timeline.Description>` — title (secondary, bold-small) and muted description; wrap a heading element inside the title for heading semantics.

```tsx
<Timeline activeIndex={1}>
  <Timeline.Item timings={['2024', '16. detsember']}>
    <Timeline.Title>Taotluse esitamine</Timeline.Title>
    <Timeline.Description>Menetlemine võib võtta kuni 30 päeva.</Timeline.Description>
  </Timeline.Item>
  <Timeline.Item timings={['2025', '02. jaanuar']}>
    <Timeline.Title>Otsus</Timeline.Title>
  </Timeline.Item>
</Timeline>
```

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

### Footer — **DEPRECATED** (use TEDI-Ready Footer)
Data-driven legacy footer (`categories` array + `logo` + `bottomElement`). Responsive layout is hardcoded CSS — no consumer override of the mobile-switch breakpoint. Migrate to the composable TEDI-Ready `Footer` for `mobileBreakpoint` control, accordion sections, and slot-based sides.

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
