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

- **Text inputs:** `onChange?: (value: string) => void` + `onChangeEvent?: React.ChangeEventHandler`
- **Choice inputs:** `onChange?: (value: string, checked: boolean) => void`
- **Select:** `onChange?: (value: ISelectOption | ISelectOption[] | null) => void`
- **NumberField:** `onChange?: (value: number) => void`

## Disabled State

```tsx
<TextField id="name" label="Name" disabled />
<Select id="country" label="Country" disabled />
<Checkbox id="agree" label="Agree" value="agree" disabled />
```
