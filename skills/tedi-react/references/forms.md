# Form Controls

TEDI form controls support both **controlled** and **uncontrolled** modes, following standard React patterns.

## Available Form Controls

| Component | Value Type | Key Features |
|-----------|-----------|--------------|
| TextField | `string` | Icon, clearable, size variants |
| TextArea | `string` | Character limit counter |
| NumberField | `number` | Min/max, step, suffix, increment buttons |
| Select | `ISelectOption \| ISelectOption[] \| null` | Async, multi-select, searchable |
| Checkbox | `boolean` (via onChange) | Indeterminate state |
| Radio | `boolean` (via onChange) | Used in ChoiceGroup |
| ChoiceGroup | `ChoiceGroupValue` | Radio/checkbox groups, segmented variant |
| Search | `string` | Search button, onSearch callback |
| DateField | `Date \| Date[] \| DateRange` | Single/multiple/range, manual input, min/max, native picker, breakpoint-aware |
| TimeField | `string` (`"HH:mm"`) | Wheel / grid picker, native fallback, stepMinutes, availableTimes |
| DateTimeField | `Date \| DateTimeRange` | Calendar + time wheel / slots, side-by-side or multi-step layout, range mode, native fallback |
| FileUpload | `FileUploadFile[]` | Multi-file, validation, loading states |
| FileDropzone | `FileUploadFile[]` | Drag-and-drop |

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

Key props: `icon`, `isClearable`, `onClear`, `size` ('default' | 'small' | 'large'), `helper` (FeedbackTextProps), `hideLabel`, `readOnly`.

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

## DateTimeField

Combines a `DateField` calendar with a `TimePicker` in one input. The popover shows them either side-by-side (default) or as a two-step flow (`layout='multi-step'`). The committed value is a single `Date` (carrying both date and time) — or a `DateTimeRange` (`{ from, to }`) in `mode='range'`.

```tsx
import { DateTimeField } from '@tedi-design-system/react/tedi';

// Default — side-by-side calendar + time wheel
<DateTimeField
  id="meeting"
  label="Meeting"
  placeholder="pp.kk.aaaa hh:mm"
  stepMinutes={15}
  value={value}
  onChange={(v) => setValue(v instanceof Date ? v : undefined)}
/>

// Predefined time slots rendered as a button grid
<DateTimeField
  id="slot"
  label="Available slot"
  availableTimes={['09:30', '10:00', '11:30', '15:30']}
  timeGridVariant="button"
  value={slot}
  onChange={setSlot}
/>

// Multi-step layout — pick the day first, then a slot
<DateTimeField
  id="appointment"
  label="Appointment"
  layout="multi-step"
  availableTimes={['09:30', '10:00', '11:30']}
  timeGridVariant="radio"
/>

// Range mode — two-month calendar + `from` / `to` time pickers
<DateTimeField
  id="period"
  label="Booking period"
  mode="range"
  value={range}
  onChange={(v) => setRange(v && 'from' in v ? v : undefined)}
/>

// Native fallback (`<input type="datetime-local">`) — `mode='single'` only
<DateTimeField id="alarm" label="Alarm" useNativePicker md={{ useNativePicker: false }} />
```

Constraints (`minDate` / `maxDate` / `disablePast` / `disableFuture`) apply to the **calendar only** — the time wheel still allows every minute inside the allowed days.

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

// Segmented choice group
<ChoiceGroup
  id="view"
  name="view"
  label="View"
  variant="segmented"
  layout="segmented"
  items={viewOptions}
  value={view}
  onChange={setView}
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

- **Text inputs:** `onChange?: (value: string) => void` + `onChangeEvent?: React.ChangeEventHandler`
- **Choice inputs:** `onChange?: (value: string, checked: boolean) => void`
- **Select:** `onChange?: (value: ISelectOption | ISelectOption[] | null) => void`
- **NumberField:** `onChange?: (value: number) => void`
- **DateField:** `onSelect?: OnSelectHandler<Date | Date[] | DateRange | undefined>` — value shape depends on `mode` (`'single'` → `Date`, `'multiple'` → `Date[]`, `'range'` → `DateRange`)
- **TimeField / TimePicker:** `onChange?: (time: string) => void` — value is always `"HH:mm"` 24-hour format (empty string when cleared)
- **DateTimeField:** `onChange?: (value: Date | DateTimeRange | undefined) => void` — value shape depends on `mode` (`'single'` → `Date`, `'range'` → `{ from, to }`)

## Disabled State

```tsx
<TextField id="name" label="Name" disabled />
<Select id="country" label="Country" disabled />
<Checkbox id="agree" label="Agree" value="agree" disabled />
```
