---
name: tedi-react
description: >
  Build UIs with @tedi-design-system/react — 50+ accessible React components with design token
  theming. Use when creating interfaces, integrating form controls, customizing themes, or working
  with TEDI components in a React application.
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
import { ThemeProvider, LabelProvider, StyleProvider } from '@tedi-design-system/react/tedi';

function App() {
  return (
    <ThemeProvider>
      <LabelProvider>
        <StyleProvider>
          <YourApp />
        </StyleProvider>
      </LabelProvider>
    </ThemeProvider>
  );
}
```

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

## Additional References

Load based on your task — **do not load all at once**:

- [references/components.md](references/components.md) — All components by category with props and usage
- [references/theming.md](references/theming.md) — Design tokens, SCSS customization, theme provider
- [references/forms.md](references/forms.md) — Form controls, controlled/uncontrolled modes, validation
