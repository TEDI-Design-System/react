StretchContent from @tedi-design-system/react. Use via `window.Tedi.StretchContent` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `StretchContent.html`): Default, Cards Example.

## Props

```ts
interface StretchContentProps {
  /** Element that will be stretched within the container. */
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  /** Accessibility role for the container. */
  role?: "button" | "link" | "article" | "dialog" | "figure" | "form" | "img" | "main" | "menu" | "menuitem" | "option" | "search" | "table" | "switch" | "alert" | "status" | (string & {}) /* +54 more */;
  /** An optional additional CSS class name to customize the styling of the container. This will be appended to the default BEM class generated for the component. */
  className?: string;
  /** Specifies the axis along which the child element should be stretched. - `both` (default): Stretches the child element both horizontally and vertically. - `horizontal`: Stretches the child element only horizontally (width). - `vertical`: Stretches the child element only vertically (height). */
  direction?: "horizontal" | "vertical" | "both";
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<StretchContentBreakpointProps>;
  md?: Partial<StretchContentBreakpointProps>;
  lg?: Partial<StretchContentBreakpointProps>;
  xl?: Partial<StretchContentBreakpointProps>;
  xxl?: Partial<StretchContentBreakpointProps>;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: Template,
};

// Cards Example
export const CardsExample: StoryObj<Partial<StretchContentProps>> = {
  render: (_args) => {
    const lorem = (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad expedita iste itaque laborum magnam non nulla
        tempora ullam! A consequuntur dicta et incidunt nisi pariatur sapiente, temporibus unde voluptatem?
      </p>
    );

    const card = (title: string, content: JSX.Element) => {
      return (
        <Card>
          <CardHeader background="brand-primary">
            <Heading element="h2">{title}</Heading>
          </CardHeader>
          <CardContent>
            <StretchContent>
              <Row direction="column" gap={4}>
                <Col>
                  <VerticalSpacing>{content}</VerticalSpacing>
                </Col>
                <Col width="auto">
                  <Button>Click me</Button>
                </Col>
              </Row>
            </StretchContent>
          </CardContent>
        </Card>
      );
    };

    return (
      <Row>
        <Col>
          <StretchContent>
            {card(
              'Card with longer content',
              <>
                {lorem}
                {lorem}
// …
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### CardsExample

```jsx
/* Cards Example */ compose(S, "CardsExample")
```
