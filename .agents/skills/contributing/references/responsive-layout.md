# Responsive Layout

Choose a component's layout with CSS media queries, not with `useBreakpoint`. The server does not know
the viewport, so a layout picked in JS is always the mobile one on the server: it flashes, shifts the
page (CLS) and never changes without JavaScript. Hooks are for behaviour (opening a menu, focus), not
for picking which layout to render.

`useBreakpointProps` (responsive props such as `md={{ color: 'red' }}`) is a separate mechanism and is
not covered here.

## Switching at a breakpoint prop (`mobileBreakpoint`, `iconBreakpoint`)

A media query cannot read a prop, so the stylesheet generates one class per breakpoint and the component
picks the class.

```scss
@use '../../../styles/breakpoint-classes';

// .tedi-thing--below-sm … .tedi-thing--below-xxl, each wrapping its rules in a max-width query
@include breakpoint-classes.below-modifiers('.tedi-thing') {
  flex-direction: column;
}
```

```tsx
<div className={cn(styles['tedi-thing'], styles[`tedi-thing--below-${mobileBreakpoint}`])} />
```

`xs` has no class, because nothing is below it.

## Responsive props with a few allowed values

For a prop that takes breakpoint keys and has a closed set of values (e.g. `placement`), generate
`<name>-<value>` and `<name>-<value>-from-<bp>`, and build the class list in the component. `Footer.Side`
(`footer-responsive.ts`) is the example; move that helper to `helpers/` when a second component needs it.

- One class per breakpoint with a single value (e.g. `HideAt`): `from-modifiers` generates them.
- Several values per prop: use `each-from` with the breakpoints as the outer loop, smallest first, and the
  values inside it. Classes of equal specificity apply by source order, so a larger breakpoint has to come
  after a smaller one for every value (see the `placement` and `vertical` rules in `footer.module.scss`).

For a number (e.g. `columns`) set one custom property per breakpoint on the element and read it in
`each-from` (see `Footer.Body`).

## When the markup differs between layouts

Prefer one markup that CSS restyles. Where that is not possible (a nav bar versus a drawer), render both
and hide one with `display: none` in a media query. The hidden copy is out of the accessibility tree.
Keep state shared between the two in the component, not in either copy.

## Testing

- jsdom does not evaluate media queries. Assert the class names and that both layouts are in the markup.
- Add one server-render test per component: `renderToString` (import from `react-dom/server.node`; the
  default `react-dom/server` needs `TextEncoder`, which jsdom lacks) and assert the output does not depend
  on the viewport.
- Check the real behaviour in Storybook at a narrow, a medium and a wide viewport. Stories that embed a
  device frame use an iframe, so media queries follow the frame width.
- SCSS is not compiled by Jest or Stylelint. Compile it (`npx sass` or the Storybook build) after editing a
  mixin.
