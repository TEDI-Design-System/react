---
name: tedi-react
description: >
  Build UIs with @tedi-design-system/react — the official Estonian government React component
  library (`@tedi-design-system/react`). Use whenever the user is integrating, importing, or
  composing TEDI components in a downstream React app: `Button`, `Alert`, `TextField`, `Select`,
  `Card`, `Tooltip`, `Dropdown`, `Tabs`, `Toggle`, `Pagination`, `EmptyState`, `Table`, `Modal`,
  etc. Triggers on theming with TEDI design tokens, switching dark/light theme via
  `ThemeProvider`, wiring `LabelProvider` / `StyleProvider` / `AccessibilityProvider`, form
  validation with the `helper` prop, responsive `xs` / `md` / `lg` breakpoint props, and
  polymorphic `as`-prop usage. Do NOT use when contributing to the TEDI library repo itself —
  use `tedi-react-contributing` for that.
---

# TEDI Design System — React

React component library with 50+ accessible components. Built on React 18/19 with TypeScript, CSS Modules, and design tokens from `@tedi-design-system/core`.

## Installation

```bash
npm install @tedi-design-system/react @tedi-design-system/core
```

### Peer Dependencies

```
react: 18.3.1 || ^19.0.0
react-dom: 18.3.1 || ^19.0.0
dayjs: ^1.11.10
```

## Setup

### 1. Wrap your app with providers

```tsx
import {
  ThemeProvider,
  LabelProvider,
  StyleProvider,
  AccessibilityProvider,
} from '@tedi-design-system/react/tedi';

function App() {
  return (
    <ThemeProvider>
      <LabelProvider>
        <StyleProvider>
          <AccessibilityProvider>
            <YourApp />
          </AccessibilityProvider>
        </StyleProvider>
      </LabelProvider>
    </ThemeProvider>
  );
}
```

`AccessibilityProvider` exposes `useDeclareLoader` and other a11y hooks; omit it only if you have no loaders/announcements. `PrintingProvider` is also available — wrap it inside `AccessibilityProvider` when you need the `usePrint` context.

### 2. Import core styles

```tsx
import '@tedi-design-system/react/index.css';
```

Or in SCSS:
```scss
@use '@tedi-design-system/core/scss' as tedi;
```

### 3. Use components

```tsx
import { Button, TextField, Alert } from '@tedi-design-system/react/tedi';

function MyPage() {
  return (
    <div>
      <Alert type="info" title="Welcome">Getting started with TEDI</Alert>
      <TextField id="name" label="Name" onChange={setName} />
      <Button visualType="primary">Submit</Button>
    </div>
  );
}
```

## Component Patterns

### Polymorphic components
Many components accept an `as` prop to render as different elements:

```tsx
import { Link, Label } from '@tedi-design-system/react/tedi';
import { NavLink } from 'react-router-dom';

<Link as={NavLink} to="/profile">Profile</Link>
<Label as="span">Not a form label</Label>
```

### Breakpoint support
Components with breakpoint support accept responsive prop overrides:

```tsx
import { Text, Collapse } from '@tedi-design-system/react/tedi';

<Text modifiers="small" md={{ modifiers: 'normal' }} lg={{ modifiers: 'bold' }}>
  Responsive text
</Text>

<Collapse id="info" defaultOpen md={{ defaultOpen: true }}>
  Content
</Collapse>
```

Breakpoints: `xs` (< 576px), `sm` (≥ 576px), `md` (≥ 768px), `lg` (≥ 992px), `xl` (≥ 1200px), `xxl` (≥ 1400px).

### Compound components
Some components use sub-component pattern:

```tsx
import { Card, Dropdown, Tooltip } from '@tedi-design-system/react/tedi';

<Card>
  <Card.Header>Title</Card.Header>
  <Card.Content>Body</Card.Content>
</Card>

<Dropdown>
  <Dropdown.Trigger><Button>Menu</Button></Dropdown.Trigger>
  <Dropdown.Content>
    <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>
    <Dropdown.Separator />
    <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
  </Dropdown.Content>
</Dropdown>
```

## Forms

TEDI form controls support both **controlled** and **uncontrolled** modes:

```tsx
import { TextField, Select, Checkbox, ChoiceGroup } from '@tedi-design-system/react/tedi';

// Controlled
const [email, setEmail] = useState('');
<TextField id="email" label="Email" value={email} onChange={setEmail} />

// Uncontrolled
<TextField id="name" label="Name" defaultValue="John" />

// Select
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

// Checkbox
<Checkbox id="agree" label="I agree" value="agree" onChange={(val, checked) => setAgreed(checked)} />
```

Form controls: `TextField`, `Select`, `TextArea`, `NumberField`, `Checkbox`, `Radio`, `ChoiceGroup`, `Search`, `FileUpload`, `FileDropzone`.

## Theming

TEDI uses CSS custom properties (design tokens) from `@tedi-design-system/core`:

```tsx
import { ThemeProvider } from '@tedi-design-system/react/tedi';

// Wrap app
<ThemeProvider defaultTheme="default">
  <App />
</ThemeProvider>
```

Themes apply via CSS class on `<html>`: `tedi-theme--default`, `tedi-theme--dark`.

## Notifications

```tsx
import { Alert, sendNotification, ToastContainer } from '@tedi-design-system/react/tedi';

// Inline alert
<Alert type="success" title="Saved" onClose={() => setShow(false)}>
  Changes saved successfully.
</Alert>

// Toast notification (add ToastContainer to root)
<ToastContainer />
sendNotification({ type: 'success', title: 'Done', children: 'Task completed' });
```

## Common Pitfalls

A handful of mistakes account for most TEDI integration issues. Avoid them up front:

- **Import from `/tedi` or `/community`, never the package root.** `@tedi-design-system/react` is not a valid import path — the package has explicit entry points (`@tedi-design-system/react/tedi`, `@tedi-design-system/react/community`, `@tedi-design-system/react/index.css`). Importing from the root will fail or silently miss types.
- **Prefer TEDI-Ready over Community whenever possible.** Several Community components (`Button`, `Anchor`, `Check`, `Radio`, `Tabs`, `Toggle`, `Tooltip`, `Dropdown`, `Tag`) are deprecated in favor of TEDI-Ready equivalents. Reach into Community only when no TEDI-Ready alternative exists (e.g. `Modal`, `Stepper`, `Table`, `DateTimePicker`).
- **Always pass `id` to form controls.** `TextField`, `Select`, `Checkbox`, `Radio`, etc. require it — it's how the label/helper/aria wiring works. There is no auto-generated fallback.
- **Use design tokens, not hardcoded colors.** Reach for `var(--tedi-color-*)`, `var(--tedi-spacing-*)`, etc. from `@tedi-design-system/core` instead of hex codes. This is what makes theme switching and brand overrides work.
- **Do not add CSS `var()` fallbacks.** Write `var(--tedi-spacing-4)`, not `var(--tedi-spacing-4, 16px)` — fallbacks defeat token-driven theming.
- **Support both controlled and uncontrolled.** When wrapping a TEDI form control with your own, accept `value`/`defaultValue` and forward both — don't force consumers into one mode.
- **Mock `useBreakpointProps` in tests** for any component you wrote that uses breakpoint support; jsdom won't respond to media queries.

## Additional References

Load based on your task — **do not load all at once**:

- [references/components.md](references/components.md) — All components by category with props and usage
- [references/theming.md](references/theming.md) — Design tokens, SCSS customization, theme provider
- [references/forms.md](references/forms.md) — Form controls, controlled/uncontrolled modes, validation
