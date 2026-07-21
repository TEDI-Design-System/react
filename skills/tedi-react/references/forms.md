# Form Controls

TEDI form controls support both **controlled** and **uncontrolled** modes, following standard React patterns.

> The prop names, defaults, value shapes, and enum members in this file are **illustrative** — they teach the integration idiom, not the exact current API. Verify against the control's `.tsx` JSDoc / Storybook before relying on a specific prop (see SKILL.md → Authoritative Sources).

## Available Form Controls

Orientation only — verify the current roster against the barrel export (`src/tedi/index.ts`):

| Component | Purpose |
|-----------|---------|
| TextField | Single-line text; icon, clearable, size variants |
| TextArea | Multi-line text; character-limit counter |
| NumberField | Numeric input; min/max, step, suffix, increment buttons |
| Select | Dropdown; async, multi-select, searchable |
| Checkbox | Boolean toggle; indeterminate state |
| Radio | Single choice; used within ChoiceGroup |
| ChoiceGroup | Radio/checkbox groups; segmented and card variants |
| Search | Text with a search button / onSearch callback |
| DateField | Date picker; single/multiple/range, manual input, native picker, breakpoint-aware |
| TimeField | Time picker; wheel / grid picker, native fallback |
| Filter | Pill-shaped toggle / dropdown filter; pairs with `FilterGroup` |
| FileUpload | Button-based multi-file upload; validation, loading states |
| FileDropzone | Drag-and-drop file upload |

## Controlled vs Uncontrolled

```tsx
// Controlled — you manage state
const [value, setValue] = useState('');
<TextField id="name" label="Name" value={value} onChange={setValue} />

// Uncontrolled — component manages state internally
<TextField id="name" label="Name" defaultValue="John" />
```

**Rule:** Every form component must accept both `value` (controlled) and `defaultValue` (uncontrolled).

## TextField

```tsx
import { TextField } from '@tedi-design-system/react/tedi';

<TextField
  id="email"
  label="Email"
  type="email"
  icon="mail"
  isClearable
  value={email}
  onChange={setEmail}
  helper={{ type: 'error', text: 'Invalid email' }}
  required
/>
```

## Select

```tsx
import { Select } from '@tedi-design-system/react/tedi';

// Single select
<Select
  id="country"
  label="Country"
  options={[
    { label: 'Estonia', value: 'ee' },
    { label: 'Finland', value: 'fi' },
  ]}
  value={selected}
  onChange={setSelected}
  isClearable
  isSearchable
/>

// Multi-select
<Select
  id="tags"
  label="Tags"
  options={tagOptions}
  multiple
  value={selectedTags}
  onChange={setSelectedTags}
  tagsDirection="stack"
/>

// Async select
<Select
  id="search"
  label="Search users"
  async
  loadOptions={(input, callback) => {
    fetchUsers(input).then(callback);
  }}
/>
```

## NumberField

```tsx
import { NumberField } from '@tedi-design-system/react/tedi';

<NumberField
  id="quantity"
  label="Quantity"
  value={qty}
  onChange={setQty}
  min={0}
  max={100}
  step={1}
  suffix="pcs"
/>
```

## DateField

Three modes (`'single'`, `'multiple'`, `'range'`) sharing one calendar popover. `selected`/`defaultValue`/`onSelect` adapt their value shape to the active mode (`Date`, `Date[]`, or `DateRange`). Manual text input is **off** by default — supply a `parseDate` to enable it.

```tsx
import { DateField } from '@tedi-design-system/react/tedi';

// Single date (controlled)
const [date, setDate] = useState<Date>();
<DateField id="birthdate" label="Birth date" selected={date} onSelect={setDate} required />

// Range with manual input parsing
<DateField
  id="period"
  label="Period"
  mode="range"
  selected={range}
  onSelect={setRange}
  parseDate={(value) => parseDateRange(value)}
  closeOnSelect={false}
/>

// Multiple dates (renders MultiValueField as the input)
<DateField id="appointments" label="Appointments" mode="multiple" selected={dates} onSelect={setDates} />
```

**Constraining the calendar** — every option also greys out the corresponding entries in the month / year header dropdowns:
```tsx
<DateField
  id="future-only"
  label="Pick a future date"
  disablePast
  maxDate={new Date(2030, 11, 31)}
  shouldDisableYear={(year) => year.getFullYear() === 2026}
/>
```

**Native picker on small screens** — uses `<input type="date">` below `md`, custom calendar from `md` up. Only valid with `mode="single"`:
```tsx
<DateField id="dob" label="Date of birth" useNativePicker md={{ useNativePicker: false }} />
```

**Custom display formatting**:
```tsx
<DateField
  id="iso"
  label="ISO date"
  formatDate={(d) => (d instanceof Date ? d.toISOString().slice(0, 10) : '')}
/>
```

**Calendar selection granularity** — `selectionLevel="months"` or `"years"` commits at a coarser level (useful for "pick a year" UIs):
```tsx
<DateField id="year" label="Year" selectionLevel="years" />
```

**Forwarding to the inner input** — pass-through props (e.g. `helper`, `icon`, `isClearable`):
```tsx
<DateField
  id="end"
  label="End date"
  inputProps={{
    helper: { type: 'hint', text: 'Leave empty for "ongoing"' },
    isClearable: true,
  }}
/>
```

## TimeField

The value is always a `"HH:mm"` 24-hour string. The popover defaults to a wheel picker; set `availableTimes` to switch to a fixed-slot grid, or `useNativePicker` to drop the custom UI entirely.

```tsx
import { TimeField } from '@tedi-design-system/react/tedi';

// Wheel picker, 15-minute step
<TimeField
  id="meeting"
  label="Meeting time"
  value={time}
  onChange={setTime}
  stepMinutes={15}
  required
/>

// Constrain to predefined slots, render as a radio-button grid
<TimeField
  id="slot"
  label="Available slot"
  availableTimes={['09:00', '09:30', '10:00', '14:00', '15:30']}
  availableTimesVariant="grid-radio"
  value={slot}
  onChange={setSlot}
/>

// Native picker on mobile, custom wheel on desktop
<TimeField
  id="alarm"
  label="Alarm"
  useNativePicker
  md={{ useNativePicker: false }}
/>
```

For an always-visible time selector (e.g. side-by-side with a calendar, or inside a custom popover) use the lower-level `TimePicker` directly:

```tsx
import { TimePicker } from '@tedi-design-system/react/tedi';

<TimePicker value={time} onChange={setTime} stepMinutes={5} bordered={false} />
```

## Filter

Compact pill-shaped trigger for refining result sets. Renders one of four modes depending on
which props are present: **toggle** (no `options`/`children`), **single-select dropdown**
(`options`), **multi-select dropdown** (`options` + `multiselect`), or **custom dropdown
content** (`children`).

```tsx
import { Filter, FilterGroup } from '@tedi-design-system/react/tedi';

// Toggle
<Filter text="Active" selected={active} onSelectedChange={setActive} />

// Single-select — `preserveLabel` renders "Label: Selected value"
<Filter
  text="Service"
  options={serviceOptions}
  selectedValue={service}
  onSelectedValueChange={setService}
  preserveLabel
  showClear
  appendTo="body"
/>

// Multi-select with searchable + select all + clear
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

// Custom dropdown content
<Filter text={periodLabel} selected={!!period} showClear onClear={() => setPeriod('')}>
  <ChoiceGroup id="period" label="Period" inputType="radio" items={periodItems}
    value={period} onChange={setPeriod} />
</Filter>
```

Group filters with `FilterGroup` to coordinate selection — radio-like by default, checkbox-like
when `multiselect`:

```tsx
<FilterGroup label="Status" value={status} onValueChange={setStatus}>
  <Filter text="All" value="all" />
  <Filter text="Active" value="active" />
  <Filter text="Done" value="done" />
</FilterGroup>

<FilterGroup label="Tags" multiselect values={tags} onValuesChange={setTags}>
  <Filter text="Urgent" value="urgent" />
  <Filter text="Review" value="review" />
</FilterGroup>
```

A `FilterGroup` without any of `value` / `defaultValue` / `values` / `defaultValues` /
`onValueChange` / `onValuesChange` / `label` / `multiselect` is **unmanaged** — children
behave as standalone toggles and the wrapper exists only for visual grouping.

Variants and customisation (concepts — check the Filter source/story for exact prop names, enum members, and defaults): primary/secondary visual variants and size options; `prepend` / `append` slots for icons or badges; the dropdown can be portalled out of the trigger's stacking context; and select-all / clear labels default to Estonian copy and are overridable.


## Checkbox & Radio

```tsx
import { Checkbox, Radio, ChoiceGroup } from '@tedi-design-system/react/tedi';

// Single checkbox
<Checkbox
  id="agree"
  label="I agree to terms"
  value="agree"
  checked={agreed}
  onChange={(val, checked) => setAgreed(checked)}
/>

// Checkbox with indeterminate
<Checkbox id="all" label="Select all" value="all" indeterminate={someSelected} />

// Choice group (radio)
<ChoiceGroup
  id="size"
  name="size"
  label="Size"
  inputType="radio"
  items={[
    { id: 'sm', label: 'Small', value: 'sm' },
    { id: 'md', label: 'Medium', value: 'md' },
    { id: 'lg', label: 'Large', value: 'lg' },
  ]}
  value={size}
  onChange={setSize}
/>

// Segmented choice group (single visually-merged control)
<ChoiceGroup
  id="view"
  name="view"
  label="View"
  layout="segmented"
  items={viewOptions}
  value={view}
  onChange={setView}
/>

// Card-style choices (each item rendered as a selectable card)
<ChoiceGroup
  id="plan"
  name="plan"
  label="Plan"
  variant="card"
  layout="separated"
  items={planOptions}
  value={plan}
  onChange={setPlan}
/>
```

## Validation & Helper Text

All form controls accept a `helper` prop for feedback:

```tsx
<TextField
  id="email"
  label="Email"
  invalid={!!error}
  helper={error ? { type: 'error', text: error } : { type: 'hint', text: 'Enter your work email' }}
/>
```

Helper types: `'hint'`, `'error'`, `'valid'`.

Multiple helpers:
```tsx
<TextField
  id="password"
  label="Password"
  helper={[
    { type: 'hint', text: 'At least 8 characters' },
    { type: 'error', text: 'Password is too short' },
  ]}
/>
```

## File Upload

```tsx
import { FileUpload, FileDropzone } from '@tedi-design-system/react/tedi';

// Button-based upload
<FileUpload
  id="docs"
  name="documents"
  label="Upload documents"
  accept=".pdf,.doc"
  multiple
  maxSize={5 * 1024 * 1024}
  files={files}
  onChange={setFiles}
  onDelete={handleDelete}
/>

// Drag-and-drop
<FileDropzone
  label="Drop files here"
  accept=".pdf,.doc"
  multiple
  maxSize={10 * 1024 * 1024}
/>
```

## Event Handler Conventions

TEDI form controls hand you the **parsed value**, not the raw DOM event. The convention across controls (confirm the exact signature for any control against its `.tsx` / Storybook):

- **Text-like inputs** (TextField, TextArea, Search) call `onChange` with the string value; a raw-event variant (`onChangeEvent`) is also available.
- **NumberField** calls `onChange` with a number.
- **Checkbox / Radio** call `onChange` with the value and its checked state.
- **ChoiceGroup** calls `onChange` with the whole group's parsed value (`string | string[] | null`) — not the `(value, checked)` pair.
- **Select** calls `onChange` with the selected option object(s), or `null` when cleared.
- **DateField** uses `onSelect`; the value shape follows the active `mode` (single `Date`, `Date[]`, or a range).
- **TimeField / TimePicker** call `onChange` with a `"HH:mm"` 24-hour string (empty when cleared).

## Disabled State

```tsx
<TextField id="name" label="Name" disabled />
<Select id="country" label="Country" disabled />
<Checkbox id="agree" label="Agree" value="agree" disabled />
```
