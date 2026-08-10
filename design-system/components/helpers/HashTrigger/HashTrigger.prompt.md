HashTrigger from @tedi-design-system/react. Use via `window.Tedi.HashTrigger` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `HashTrigger.html`): Default, Tabs With Hash Trigger.

## Props

```ts
interface HashTriggerProps {
  /** HashTrigger content. */
  children: React.ReactNode;
  /** Id, which is passed to first child element/component.<br /> Child component has to inject id to DOM itself.<br /> It's used to detect element on page where to scroll. */
  id: string;
  /** Callback called when hash matches. */
  onMatch?: (id: string) => void;
  /** Scroll to element on match. */
  scrollOnMatch?: boolean;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: Template,

  args: {
    id: 'test-1',
    scrollOnMatch: true,
  },
};

const TabsTemplate: StoryFn<HashTriggerProps> = () => (
  <VerticalSpacing size={2}>
    <Heading id="tabs-heading" className="visually-hidden">
      Tabs title
    </Heading>
    <div>
      <Link href="#tab-1">Tab 1</Link>
      <br />
      <Link href="#tab-2">Tab 2</Link>
      <br />
      <Link href="#tab-3">Tab 3</Link>
    </div>
    <VerticalSpacing size={1}>
      {Array.from(Array(7).keys()).map((i) => (
        <p key={i}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at gravida mi, id convallis augue. Donec
          hendrerit sit amet quam a vehicula. Vestibulum ligula turpis, tempor non lacus et, vestibulum congue massa.
          Maecenas a sollicitudin dui. Mauris dictum fringilla nibh, sit amet egestas lectus feugiat id. Cras ac felis
          porttitor, blandit lorem id, gravida felis. Vivamus in tortor vitae neque viverra sodales. Phasellus suscipit,
          leo et aliquam aliquet, arcu justo pulvinar neque, sit amet vehicula sapien arcu eget lorem. Sed in sem velit.
          Nam scelerisque massa vitae ullamcorper congue. Nam accumsan tellus sit amet commodo tempor. Maecenas dapibus
          sagittis purus quis luctus. Duis sodales imperdiet ex, et congue lectus pulvinar in. Morbi urna ante, mattis
          eu turpis et, sagittis efficitur felis.
        </p>
      ))}
    </VerticalSpacing>
    <Tabs defaultCurrentTab="tab-1" aria-labelledby="tabs-heading">
      <TabsItem id="tab-1" label="Tab 1">
        <VerticalSpacing>
          <Heading element="h2">Tab 1</Heading>
          <p>Content 1</p>
// …

// Tabs With Hash Trigger
export const TabsWithHashTrigger: Story = {
  render: TabsTemplate,

  args: {
    id: 'tab',
    scrollOnMatch: true,
  },
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### TabsWithHashTrigger

```jsx
/* Tabs With Hash Trigger */ compose(S, "TabsWithHashTrigger")
```
