Skeleton from @tedi-design-system/react. Use via `window.Tedi.Skeleton` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Sub-components: `Skeleton.Block`. See the DS docs for composition — e.g. items like `Skeleton.Item` go inside `<Skeleton>`; containers like `Skeleton.Group` wrap multiple `<Skeleton>`s.

Variants (see `Skeleton.html`): Default, Skeleton Height, Skeleton Width, Accessibility.

## Props

```ts
interface SkeletonProps {
  /** The content to be rendered inside the skeleton placeholder. */
  children?: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.ReactNode[];
  /** Custom class names to apply to the skeleton component for styling purposes. */
  className?: string;
  /** The accessibility label announced by screen readers when the skeleton component mounts. This message informs users that content is loading. If omitted, all skeletons on the page are combined into a single status message. */
  label?: string;
  /** The accessibility label announced by screen readers when the skeleton component unmounts. This message informs users that content has finished loading. This label is only announced if the delay specified by `labelDelay` is met. */
  completedLabel?: string;
  /** The delay, in milliseconds, before the screen reader announces the `label` when the component mounts. If the content loads faster than this delay, the label may not be announced to avoid unnecessary interruptions. */
  labelDelay?: number;
}
```

## Examples

```jsx
// Default
export const Default: StoryObj = {
  argTypes: {
    ...subcomponentArgTypes(Skeleton.Block, {
      category: 'Skeleton.Block',
      prefix: 'block',
      exclude: ['children'],
    }),
  },
  args: {
    label: 'Loading something',
    block__width: 50,
    block__height: 'h2',
  },
  render: (args: Record<string, unknown>) => (
    <Skeleton {...getPrimaryComponentProps<SkeletonProps>(args)}>
      <Skeleton.Block {...getSubcomponentProps(args, 'block')} />
    </Skeleton>
  ),
};

// Skeleton Height
export const SkeletonHeight: Story = {
  render: Template,

  args: {
    label: 'Loading something',
  },
};

// Skeleton Width
export const SkeletonWidth: Story = {
  render: TemplateWidth,

  args: {
    label: 'Loading something',
  },
};

interface AccessibilitySkeletonObj {
  id: string;
  remove: (id: string) => void;
  delay?: number;
  style?: React.CSSProperties;
}
type AccessibilityTemplateProps = AccessibilitySkeletonObj & SkeletonProps;

const AccessibilityTemplate: StoryFn<AccessibilityTemplateProps> = ({ style, id, remove, delay = 3000, ...args }) => {
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      remove(id);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [delay, id, remove]);

  return (
    <Skeleton {...args}>
      <VerticalSpacing>
        <Skeleton.Block width={100} height="p" style={style} />
        <Skeleton.Block width={75} height={29} style={style} />
        <Skeleton.Block width={40} height={50} style={style} />
        <Skeleton.Block width={80} style={style} />
      </VerticalSpacing>
    </Skeleton>
  );
};

/**
// …
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### SkeletonHeight

```jsx
/* Skeleton Height */ compose(S, "SkeletonHeight")
```

### SkeletonWidth

```jsx
/* Skeleton Width */ compose(S, "SkeletonWidth")
```

### Accessibility

```jsx
/* Accessibility */ compose(S, "Accessibility")
```

## Related

`Skeleton.Block`
