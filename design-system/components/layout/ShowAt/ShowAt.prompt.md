ShowAt from @tedi-design-system/react. Use via `window.Tedi.ShowAt` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `ShowAt.html`): Default, Multiple Breakpoints, Breakpoint Overview.

## Props

```ts
interface ShowAtProps {
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
        The colored box below is wrapped in ShowAt md. It is only visible at the md breakpoint and above. Resize the
        viewport below md to see it disappear.
      </Description>
      <ShowAt md>
        <Box>This content is only visible at md and above.</Box>
      </ShowAt>
    </div>
  ),
};

// Multiple Breakpoints
export const MultipleBreakpoints: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Description>
        The colored box below is wrapped in ShowAt sm lg. It is visible at sm and above, or at lg and above. It is
        hidden below sm (xs).
      </Description>
      <ShowAt sm lg>
        <Box>This content is visible at sm and above, or at lg and above.</Box>
      </ShowAt>
    </div>
  ),
};

const BreakpointOverviewTemplate: StoryFn = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
    <Description>
      Each colored box is visible at the specified breakpoint and above. Resize the viewport to see boxes disappear as
      you go below their threshold.
    </Description>
    <ShowAt xs>
      <Box color="#fde8e8">Visible at xs and above</Box>
    </ShowAt>
    <ShowAt sm>
      <Box color="#fef3e2">Visible at sm and above</Box>
    </ShowAt>
    <ShowAt md>
      <Box color="#fefce8">Visible at md and above</Box>
    </ShowAt>
    <ShowAt lg>
      <Box color="#e8fde8">Visible at lg and above</Box>
    </ShowAt>
    <ShowAt xl>
      <Box color="#e8f4fd">Visible at xl and above</Box>
    </ShowAt>
    <ShowAt xxl>
      <Box color="#f0e8fd">Visible at xxl and above</Box>
    </ShowAt>
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
