HideAt from @tedi-design-system/react. Use via `window.Tedi.HideAt` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `HideAt.html`): Default, Multiple Breakpoints, Breakpoint Overview.

## Props

```ts
interface HideAtProps {
  children: React.ReactNode;
  xs?: boolean;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
  xxl?: boolean;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Description>
        The colored box below is wrapped in HideAt md. It is hidden at the md breakpoint and above. Resize the viewport
        below md to see it appear.
      </Description>
      <HideAt md>
        <Box>This content is hidden at md and above.</Box>
      </HideAt>
    </div>
  ),
};

// Multiple Breakpoints
export const MultipleBreakpoints: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Description>
        The colored box below is wrapped in HideAt sm lg. It is hidden at sm and above, and also at lg and above. It is
        only visible below sm (xs).
      </Description>
      <HideAt sm lg>
        <Box>This content is hidden at sm and above, and also at lg and above.</Box>
      </HideAt>
    </div>
  ),
};

const BreakpointOverviewTemplate: StoryFn = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
    <Description>
      Each colored box is hidden at the specified breakpoint and above. Resize the viewport to see boxes appear as you
      go below their threshold.
    </Description>
    <HideAt xs>
      <Box color="#fde8e8">Hidden at xs and above</Box>
    </HideAt>
    <HideAt sm>
      <Box color="#fef3e2">Hidden at sm and above</Box>
    </HideAt>
    <HideAt md>
      <Box color="#fefce8">Hidden at md and above</Box>
    </HideAt>
    <HideAt lg>
      <Box color="#e8fde8">Hidden at lg and above</Box>
    </HideAt>
    <HideAt xl>
      <Box color="#e8f4fd">Hidden at xl and above</Box>
    </HideAt>
    <HideAt xxl>
      <Box color="#f0e8fd">Hidden at xxl and above</Box>
    </HideAt>
  </div>
);
// …

// Breakpoint Overview
export const BreakpointOverview: Story = {
  render: BreakpointOverviewTemplate,
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### MultipleBreakpoints

```jsx
/* Multiple Breakpoints */ compose(S, "MultipleBreakpoints")
```

### BreakpointOverview

```jsx
/* Breakpoint Overview */ compose(S, "BreakpointOverview")
```
