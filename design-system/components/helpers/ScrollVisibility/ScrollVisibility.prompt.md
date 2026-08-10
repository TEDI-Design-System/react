ScrollVisibility from @tedi-design-system/react. Use via `window.Tedi.ScrollVisibility` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `ScrollVisibility.html`): Default, Toggle Visibility, Animation Direction.

## Props

```ts
interface ScrollVisibilityProps {
  /** Content to hide/show */
  children: React.ReactNode;
  /** Additional class name which applies to first child element */
  className?: string;
  /** Conditionally enable the functionality */
  enabled?: boolean;
  /** Determines wheter to hide or show when scrolled past scrollDistance */
  visibility?: "show" | "hide";
  /** Determines if the component's visibility toggles when scrolling opposite direction after crossing scrollDistance */
  toggleVisibility?: boolean;
  /** Distance in px user has to scroll for the component to show/hide */
  scrollDistance?: number;
  /** Direction used to calculate `scrollDistance`: - down: Measured from the top of the page. - up: Measured from the bottom of the page. */
  scrollDirection?: "up" | "down";
  /** Detect scroll based on this element */
  scrollContainer?: HTMLElement;
  /** Direction the component animates to */
  animationDirection?: "center" | "left" | "right" | "up" | "down";
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: FloatingButtonTemplate,
  args: {
    children: (
      <FloatingButton
        position="fixed"
        placement={{ vertical: 'bottom', horizontal: 'right' }}
        offset={{ right: 32, bottom: 32 }}
        onClick={() => scrollTo({ top: 0 })}
        icon="arrow_upward"
      >
        Scroll Up
      </FloatingButton>
    ),
    enabled: true,
    visibility: 'show',
    toggleVisibility: false,
    scrollDirection: 'down',
    scrollDistance: 30,
    animationDirection: 'down',
  },
  parameters: {
    docs: { story: { inline: false, iframeHeight: CONTAINER_HEIGHT } },
    layout: 'fullscreen',
  },
};

// Toggle Visibility
export const ToggleVisibility: Story = {
  render: NavigationTemplate,
  args: {
    children: (
      <nav
        style={{
          position: 'sticky',
          top: 0,
          background: 'rgb(0, 72, 130)',
          color: 'white',
          borderBottom: '1px solid black',
          height: NAVIGATION_HEIGHT,
          alignContent: 'center',
          padding: '0 16px',
        }}
      >
        Navigation
      </nav>
    ),
    enabled: true,
    visibility: 'hide',
    toggleVisibility: true,
    scrollDirection: 'down',
    scrollDistance: NAVIGATION_HEIGHT,
    animationDirection: 'up',
  },
};

// Animation Direction
export const AnimationDirection: Story = {
  render: AnimationDirectionTemplate,
  args: {
    visibility: 'hide',
    scrollDistance: NAVIGATION_HEIGHT,
  },
  parameters: {
    docs: { story: { inline: false, iframeHeight: CONTAINER_HEIGHT } },
    layout: 'fullscreen',
  },
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### ToggleVisibility

```jsx
/* Toggle Visibility */ compose(S, "ToggleVisibility")
```

### AnimationDirection

```jsx
/* Animation Direction */ compose(S, "AnimationDirection")
```
