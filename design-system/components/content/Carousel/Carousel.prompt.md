Carousel from @tedi-design-system/react. Use via `window.Tedi.Carousel` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Sub-components: `Carousel.Header`, `Carousel.Content`, `Carousel.Footer`, `Carousel.Navigation`, `Carousel.Indicators`. See the DS docs for composition — e.g. items like `Carousel.Item` go inside `<Carousel>`; containers like `Carousel.Group` wrap multiple `<Carousel>`s.

Variants (see `Carousel.html`): Default, Top pagination - arrows only, Separated bottom pagination - has dots, Separated bottom pagination - has numbers, Centered bottom pagination - has dots, Centered bottom pagination - has numbers, Combinations - top navigation, bottom dots, Centered - has dots, Centered - has numbers, Faded, Faded - both sides, Peeking, Peeking - both sides (centered), Bounded - overlay arrows (no loop), Examples.

## Props

```ts
interface CarouselProps {
  /** Carousel composition — `Carousel.Header`, `Carousel.Content` and `Carousel.Footer`. */
  children?: React.ReactNode;
  /** Additional class name applied to the carousel root. */
  className?: string;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: () => (
    <Carousel>
      <Carousel.Header>
        <div>
          <Text element="h2" modifiers="h1">
            Pealkiri
          </Text>
        </div>
        <Carousel.Navigation />
      </Carousel.Header>
      <Carousel.Content slidesPerView={RESPONSIVE_SLIDES}>{slides(5)}</Carousel.Content>
      <Carousel.Footer style={{ justifyContent: 'center' }}>
        <Carousel.Indicators />
      </Carousel.Footer>
    </Carousel>
  ),
};

// Top pagination - arrows only
export const TopPaginationArrowsOnly: Story = {
  name: 'Top pagination - arrows only',
  render: () => (
    <Carousel>
      <Carousel.Header>
        <Text element="h2" modifiers="h1">
          Pealkiri
        </Text>
        <Carousel.Navigation />
      </Carousel.Header>
      <Carousel.Content slidesPerView={RESPONSIVE_SLIDES}>{slides(5)}</Carousel.Content>
    </Carousel>
  ),
};

// Separated bottom pagination - has dots
export const SeparatedBottomPaginationHasDots: Story = {
  name: 'Separated bottom pagination - has dots',
  render: () => (
    <Carousel>
      <Carousel.Header>
        <Text element="h2" modifiers="h1">
          Pealkiri
        </Text>
      </Carousel.Header>
      <Carousel.Content slidesPerView={RESPONSIVE_SLIDES}>{slides(5)}</Carousel.Content>
      <Carousel.Footer>
        <HideAt md>
          <Carousel.Indicators variant="numbers" />
        </HideAt>
        <ShowAt md>
          <Carousel.Indicators />
        </ShowAt>
        <Carousel.Navigation />
      </Carousel.Footer>
    </Carousel>
  ),
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### TopPaginationArrowsOnly

```jsx
/* Top pagination - arrows only */ compose(S, "TopPaginationArrowsOnly")
```

### SeparatedBottomPaginationHasDots

```jsx
/* Separated bottom pagination - has dots */ compose(S, "SeparatedBottomPaginationHasDots")
```

### SeparatedBottomPaginationHasNumbers

```jsx
/* Separated bottom pagination - has numbers */ compose(S, "SeparatedBottomPaginationHasNumbers")
```

### CenteredBottomPaginationHasDots

```jsx
/* Centered bottom pagination - has dots */ compose(S, "CenteredBottomPaginationHasDots")
```

### CenteredBottomPaginationHasNumbers

```jsx
/* Centered bottom pagination - has numbers */ compose(S, "CenteredBottomPaginationHasNumbers")
```

### CombinationsTopNavigationBottomDots

```jsx
/* Combinations - top navigation, bottom dots */ compose(S, "CombinationsTopNavigationBottomDots")
```

### CenteredHasDots

```jsx
/* Centered - has dots */ compose(S, "CenteredHasDots")
```

### CenteredHasNumbers

```jsx
/* Centered - has numbers */ compose(S, "CenteredHasNumbers")
```

### Faded

```jsx
/* Faded */ compose(S, "Faded")
```

### FadedBothSides

```jsx
/* Faded - both sides */ compose(S, "FadedBothSides")
```

### Peeking

```jsx
/* Peeking */ compose(S, "Peeking")
```

### PeekingBothSides

```jsx
/* Peeking - both sides (centered) */ compose(S, "PeekingBothSides")
```

### BoundedOverlayNavigation

```jsx
/* Bounded - overlay arrows (no loop) */ compose(S, "BoundedOverlayNavigation")
```

### Examples

```jsx
/* Examples */ compose(S, "Examples")
```

## Related

`Carousel.Header`, `Carousel.Content`, `Carousel.Footer`, `Carousel.Navigation`, `Carousel.Indicators`
