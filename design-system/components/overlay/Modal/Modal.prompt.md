Modal from @tedi-design-system/react. Use via `window.Tedi.Modal` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Sub-components: `Modal.Trigger`, `Modal.Content`, `Modal.Header`, `Modal.Body`, `Modal.Footer`, `Modal.Closer`. See the DS docs for composition — e.g. items like `Modal.Item` go inside `<Modal>`; containers like `Modal.Group` wrap multiple `<Modal>`s.

Variants (see `Modal.html`): Default, Position, Size, Width, Custom width, Fullscreen, Scrollable Content, With header description, No backdrop close, No close button, Footer Variants, Responsive Props, Alert Dialog, Controlled.

## Props

```ts
interface ModalProps {
  /** `<Modal.Trigger>` and `<Modal.Content>` children. */
  children: React.ReactNode;
  /** Open state for uncontrolled mode. Use `open` + `onToggle` for controlled mode. */
  defaultOpen?: boolean;
  /** Open state for controlled mode. Pair with `onToggle`. */
  open?: boolean;
  /** Called whenever the modal opens or closes. Pair with `open` for controlled mode. */
  onToggle?: (open: boolean) => void;
  /** Close the modal when the backdrop is clicked. */
  closeOnBackdropClick?: boolean;
  /** Close the modal when the Escape key is pressed. */
  closeOnEscape?: boolean;
  /** ARIA role for the dialog. Use `'alertdialog'` for destructive confirmations (delete, cancel subscription) — screen readers announce alertdialogs with higher urgency and require an explicit user action to dismiss. Affects both the trigger's `aria-haspopup` and the floating element's `role`. */
  role?: "dialog" | "alertdialog";
}
```

## Examples

```jsx
// Default
export const Default: StoryObj = {
  argTypes: {
    ...subcomponentArgTypes(Modal.Content, {
      category: 'Modal.Content',
      prefix: 'content',
      exclude: ['children', 'initialFocus', 'aria-labelledby', 'aria-describedby', 'aria-label'],
    }),
  },
  render: (args: Record<string, unknown>) => {
    const { heading = 'Modal title', description, closeButton = true, ...rest } = args;
    return (
      <Modal {...getPrimaryComponentProps<ModalProps>(rest)}>
        <Modal.Trigger>
          <Button visualType="secondary">Open modal</Button>
        </Modal.Trigger>
        <Modal.Content {...getSubcomponentProps(args, 'content')}>
          <Modal.Header
            title={heading as string}
            description={description as string | undefined}
            closeButton={closeButton as boolean}
          />
          <Modal.Body>
            <SampleForm />
          </Modal.Body>
          <DefaultFooter />
        </Modal.Content>
      </Modal>
    );
  },
};

// Position
export const Position: Story = {
  render: () => (
    <Row gutterY={2}>
      {(['center', 'top', 'right', 'left'] as const).map((p) => (
        <Col key={p} xs="auto">
          <Modal>
            <Modal.Trigger>
              <Button visualType="secondary">
                {p === 'center' ? 'Center' : p === 'top' ? 'Top-aligned' : `Side (${p})`}
              </Button>
            </Modal.Trigger>
            <Modal.Content position={p} width={p === 'right' || p === 'left' ? 'sm' : 'md'}>
              <Modal.Header
                title={p === 'center' ? 'Center modal' : p === 'top' ? 'Top-aligned modal' : `Side modal (${p})`}
              />
              <Modal.Body>
                <SampleForm />
              </Modal.Body>
              <DefaultFooter />
            </Modal.Content>
          </Modal>
        </Col>
      ))}
    </Row>
  ),
};

// Size
export const Size: Story = {
  render: () => (
    <Row gutterY={2}>
      <Col xs="auto">
        <Modal>
          <Modal.Trigger>
            <Button visualType="secondary">Open small modal</Button>
          </Modal.Trigger>
          <Modal.Content size="small" width="sm">
            <Modal.Header title="Small modal" />
            <Modal.Body>
              <SampleForm />
            </Modal.Body>
            <DefaultFooter />
          </Modal.Content>
        </Modal>
      </Col>
      <Col xs="auto">
        <Modal>
          <Modal.Trigger>
            <Button visualType="secondary">Open default modal</Button>
          </Modal.Trigger>
          <Modal.Content size="default" width="sm">
            <Modal.Header title="Default modal" />
            <Modal.Body>
              <SampleForm />
            </Modal.Body>
            <DefaultFooter />
          </Modal.Content>
        </Modal>
      </Col>
    </Row>
  ),
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Position

```jsx
/* Position */ compose(S, "Position")
```

### Size

```jsx
/* Size */ compose(S, "Size")
```

### Width

```jsx
/* Width */ compose(S, "Width")
```

### CustomWidth

```jsx
/* Custom width */ compose(S, "CustomWidth")
```

### Fullscreen

```jsx
/* Fullscreen */ compose(S, "Fullscreen")
```

### ScrollableContent

```jsx
/* Scrollable Content */ compose(S, "ScrollableContent")
```

### WithDescription

```jsx
/* With header description */ compose(S, "WithDescription")
```

### NoBackdropClose

```jsx
/* No backdrop close */ compose(S, "NoBackdropClose")
```

### NoCloseButton

```jsx
/* No close button */ compose(S, "NoCloseButton")
```

### FooterVariants

```jsx
/* Footer Variants */ compose(S, "FooterVariants")
```

### ResponsiveProps

```jsx
/* Responsive Props */ compose(S, "ResponsiveProps")
```

### AlertDialog

```jsx
/* Alert Dialog */ compose(S, "AlertDialog")
```

### Controlled

```jsx
/* Controlled */ compose(S, "Controlled")
```

## Related

`Modal.Trigger`, `Modal.Content`, `Modal.Header`, `Modal.Body`, `Modal.Footer`, `Modal.Closer`
