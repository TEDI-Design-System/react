Col from @tedi-design-system/react. Use via `window.Tedi.Col` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Col.html`): Default.

## Props

```ts
interface ColProps {
  /** Col children. */
  children?: React.ReactNode;
  /** Base element. */
  element?: "dd" | "dt";
  /** Additional class. */
  className?: string;
  /** ColSpec object to change Row behavior on xs devices (<576px). Or number of column width. */
  xs?: 1 | 2 | 3 | 4 | 5 | 6 | ColSpec | "auto" | 7 | 8 | 9 | 10 | 11 | 12;
  /** ColSpec object to change Row behavior on sm devices (≥576px). Or number of column width. */
  sm?: 1 | 2 | 3 | 4 | 5 | 6 | ColSpec | "auto" | 7 | 8 | 9 | 10 | 11 | 12;
  /** ColSpec object to change Row behavior on md devices (≥768px). Or number of column width. */
  md?: 1 | 2 | 3 | 4 | 5 | 6 | ColSpec | "auto" | 7 | 8 | 9 | 10 | 11 | 12;
  /** ColSpec object to change Row behavior on lg devices (≥992px). Or number of column width. */
  lg?: 1 | 2 | 3 | 4 | 5 | 6 | ColSpec | "auto" | 7 | 8 | 9 | 10 | 11 | 12;
  /** ColSpec object to change Row behavior on xl devices (≥1200px). Or number of column width. */
  xl?: 1 | 2 | 3 | 4 | 5 | 6 | ColSpec | "auto" | 7 | 8 | 9 | 10 | 11 | 12;
  /** ColSpec object to change Row behavior on xxl devices (≥1400px). Or number of column width. */
  xxl?: 1 | 2 | 3 | 4 | 5 | 6 | ColSpec | "auto" | 7 | 8 | 9 | 10 | 11 | 12;
  /** Onclick function handler */
  onClick?: (e: React.MouseEvent<HTMLDivElement | HTMLSpanElement | HTMLLinkElement>) => void;
  /** Number of column width. Use `auto` to give columns their natural widths. */
  width?: 1 | 2 | 3 | 4 | 5 | 6 | "auto" | 7 | 8 | 9 | 10 | 11 | 12;
  /** Move columns to the right 1-11 columns. https://getbootstrap.com/docs/5.1/layout/columns/#offsetting-columns */
  offset?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /** Use for controlling the visual order of your Cols. https://getbootstrap.com/docs/5.1/layout/columns/#order-classes */
  order?: number | "1" | "2" | "3" | "4" | "5" | "first" | "last";
  /** Use to vertically align columns individually. https://getbootstrap.com/docs/5.1/layout/columns/#alignment */
  align?: "center" | "end" | "start";
  /** Use to toggle a flex item’s ability to grow to fill available space. https://getbootstrap.com/docs/5.1/utilities/flex/#grow-and-shrink */
  grow?: 0 | 1;
  /** Use to toggle a flex item’s ability to shrink if necessary. https://getbootstrap.com/docs/5.1/utilities/flex/#grow-and-shrink */
  shrink?: 0 | 1;
  id?: string;
  style?: React.CSSProperties;
}
```

## Examples

```jsx
// Default
export const Default: StoryFn = () => (
  <VerticalSpacing size={2}>
    <VerticalSpacing size={0.5}>
      <Heading element="h4">Label/Value pairs</Heading>
      <Row>
        <Col>
          <dl>
            <Row>
              <Col element="dt" width={2}>
                <strong>Label</strong>
              </Col>
              <Col element="dd">Value</Col>
            </Row>
            <Row>
              <Col element="dt" width={2}>
                <strong>Label</strong>
              </Col>
              <Col element="dd">Value</Col>
            </Row>
          </dl>
        </Col>
      </Row>
    </VerticalSpacing>

    <VerticalSpacing size={0.5}>
      <Heading element="h4">Lists</Heading>
      <Row element="ul" direction="column">
        <Col>Item 1</Col>
        <Col>Item 2</Col>
      </Row>
    </VerticalSpacing>
  </VerticalSpacing>
);
```

### Default

```jsx
/* Default */ compose(S, "Default")
```
