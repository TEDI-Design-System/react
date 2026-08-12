Navigational link. Renders an `<a>` by default; polymorphic via `as` for router links
(`<Link as={NextLink} href="/x">`). `linkAs` is not a `Link` prop — it belongs to the
containers that render links for you (`SideNav`, `MobileNav`), which pass it down as
their inner links' `as`.

**Live Storybook:** https://storybook.tedi.ee/react/rc/?path=/docs/tedi-ready-components-navigation-link--docs

Stories (see `Link.html`): `Default`, `Sizes`, `Colors`, `DefaultUnderlined`,
`DefaultNoUnderline`, `InvertedUnderline`, `InvertedNoUnderline`, `AsPrimaryButton`,
`CustomComponent`, `NoStyleLink`, `FullWidth`, `LongTextIconInline`, `LinkIconFlexed`.

## Two independent axes — do not conflate them

`Link` shares `Button`'s visual contract, so the same two props apply:

| Prop | Real values | Meaning |
|---|---|---|
| `visualType` | `link` (default) \| `primary` \| `secondary` \| `neutral` | shape/weight — `link` is plain text, the others render button-shaped |
| `color` | `default` \| `danger` \| `success` \| `inverted` \| `text` | palette |

```jsx
<Link href="/x">Vaata lähemalt</Link>                          // plain text link
<Link href="/x" visualType="primary">Alusta</Link>             // looks like a button
<Link href="/x" color="danger">Kustuta konto</Link>
```

## Gotchas

**1. `color="inverted"` is the dark-surface variant.** On the footer — or any dark
background — the default colour is dark-on-dark and effectively invisible:

```jsx
// ✗ invisible inside <Footer>
<Link href="/privacy">Privaatsus</Link>

// ✓
<Link href="/privacy" color="inverted">Privaatsus</Link>
```

Plain `Text` on the same surface needs `color="white"` (`Text` has its own colour scale
and no `inverted` value).

**2. App-level element resets beat Link's own styles.** Link relies on inherited colour
in places and its class names are hashed, so a bare selector in your stylesheet wins:

```css
/* ✗ overrides Link and SideNav item states app-wide */
a:hover { color: #000; }
```

Scope such rules to your own container, or set colour through the `color` prop.

**3. Icons are props, not children:** `iconLeft` / `iconRight` take a Material Symbols
ligature name or an `IconWithoutBackgroundProps` object.

```jsx
<Link href="/report" iconRight="arrow_forward">Ava raport</Link>
```
