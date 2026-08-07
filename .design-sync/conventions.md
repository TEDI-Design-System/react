# Building with TEDI Design System (React)

TEDI is the Estonian health-and-social-services design system. Everything below is
verified against this build — every class, token, prop and component named here exists.

## 1. Wrap the app in the provider chain — without it components are unstyled or throw

```jsx
import { ThemeProvider, PrintingProvider, LabelProvider } from '@tedi-design-system/react/tedi';
import '@tedi-design-system/react/index.css';

<ThemeProvider theme="default">        {/* also stamps tedi-theme--default on <html> */}
  <PrintingProvider>                    {/* usePrint(); Print/Collapse/Footer read it */}
    <LabelProvider locale="et">         {/* REQUIRED — see below */}
      <App />
    </LabelProvider>
  </PrintingProvider>
</ThemeProvider>
```

- **`LabelProvider` is not optional.** Component default labels come from it. Without it
  the fallback returns the *key*, so a FileUpload button literally renders
  `file-upload.add` instead of "Lisa manus". It also drives locale-derived formatting —
  NumberField's decimal separator is `,` under `locale="et"`. Locales: `et`, `en`, `ru`.
- `theme` is `"default"` or `"dark"`. Themed surfaces resolve from `tedi-theme--*` on the
  root element, so set the theme on `ThemeProvider`, never by hand-picking colours.
- `StyleProvider` and `AccessibilityProvider` are also exported; add them only when you
  need their specific features.

## 2. Style with props first, then the shipped utility classes — never invent class names

Component styling is CSS Modules with **hashed** class names (`tedi-btn-f8b478d7`), so
DS class names are not part of the public API and cannot be written by hand. There are
exactly two legitimate levers:

**a) Component props** carry the design language. Prefer them always:

```jsx
<Button visualType="secondary" color="danger" size="small" iconRight="arrow_forward">Kustuta</Button>
<Text color="secondary" element="p">…</Text>
<Card background="brand-primary">…</Card>
```

Note the two independent Button axes — do not conflate them:

| Prop | Real values |
|---|---|
| `visualType` | `primary` \| `secondary` \| `neutral` \| `link` |
| `color` | `default` \| `danger` \| `success` \| `inverted` \| `text` |

Other enums worth knowing verbatim:

- `Text` / `Heading` `color`: `primary secondary tertiary neutral brand danger success info warning disabled white`
- `Card` `background`: `primary secondary tertiary accent brand-primary brand-secondary brand-tertiary brand-quaternary danger-primary danger-secondary success-* info-* warning-* neutral-*`
- `VerticalSpacing` `size`: `0 0.25 0.5 0.75 1 1.25 1.5 1.75 2 2.5 3 4 5` (rem-ish scale, not px)
- `Card` `borderRadius` is **not** a keyword — it is `false | { top?, bottom?, ... }`

**b) Shipped layout utilities** for your own glue between components. These are real
classes in the shipped stylesheet:

| Family | Real names |
|---|---|
| flex | `flex`, `flex-row`, `flex-column`, `flex-wrap`, `flex-grow-1`, `flex-shrink-0` |
| gap | `gap-0` … `gap-5` |
| align | `align-items-start\|center\|end\|baseline\|stretch`, `align-self-*` |
| justify | `justify-content-start\|center\|end\|between\|around\|evenly` |
| text | `text-center`, `text-bold`, `text-capitalize`, `text-break-word`, `text-extra-small` |
| order / a11y | `order-*`, `sr-only` |

Responsive infixes exist for the layout families: `align-items-lg-center`,
`justify-content-md-between`, `flex-lg-row`. Breakpoints: `sm md lg xl xxl`.

**Do not use `display-flex`** — it was a Storybook-only helper, removed in favour of
`flex`. It is not in the shipped stylesheet and silently does nothing.

## 3. Responsive props beat media queries

Most components accept per-breakpoint overrides as `BreakpointSupport<Props>` — pass a
partial props object under a breakpoint key, plus `defaultServerBreakpoint` for SSR:

```jsx
<Button fullWidth lg={{ fullWidth: false, size: 'small' }} defaultServerBreakpoint="lg">
  Salvesta
</Button>
```

## 4. Tokens for your own CSS — `var(--…)`, never literals, never a fallback

2925 custom properties ship. Use them for any colour, spacing or radius you write
yourself. Never hardcode a hex value, and **never** add a `var()` fallback
(`var(--x, #fff)` is against house style — write `var(--x)`).

Real families, in rough order of usefulness:

| Family | Purpose | Example real names |
|---|---|---|
| `--general-*` | semantic surfaces/borders/text | `--general-border-primary`, `--general-border-brand` |
| `--layout-*` | grid gutters, container widths | `--layout-grid-gutters-08`, `--layout-container-max-width-lg` |
| `--tedi-*` | raw palette scales (last resort) | `--tedi-primary-600`, `--tedi-accent-300` |
| per-component | `--button-*`, `--form-*`, `--card-*`, `--alert-*`, `--navigation-*`, `--heading-*`, `--body-*`, `--stepper-*`, `--filter-*` | `--card-background-brand-primary` |

Prefer `--general-*` and per-component tokens over raw `--tedi-*` scales: the semantic
ones re-theme correctly in dark mode, raw palette values do not.

## 5. Where the truth lives

Read these before styling anything — they beat this summary:

- `_ds/<folder>/styles.css` and its `@import` closure (`tokens/index.css` for every
  token, `fonts/fonts.css`, `_ds_bundle.css` for component CSS).
- `components/<group>/<Name>/<Name>.d.ts` — the real prop contract (`<Name>Props`).
- `components/<group>/<Name>/<Name>.prompt.md` — per-component usage.

Fonts ship with the bundle: **Roboto** (body/headings) and **Material Symbols** for
icons. `<Icon name="arrow_forward" />` takes a Material Symbols ligature name.

## 6. Idiomatic example

Library components for the controls, shipped utilities for your own layout glue:

```jsx
import { Card, Heading, Text, Button, TextField, Row, Col, VerticalSpacing }
  from '@tedi-design-system/react/tedi';

<Card>
  <VerticalSpacing size={1}>
    <Heading element="h2">Esita taotlus</Heading>
    <Text color="secondary">Täida vormi väljad ja kinnita.</Text>

    <Row>
      <Col md={6}><TextField id="name" label="Nimi" /></Col>
      <Col md={6}><TextField id="code" label="Isikukood" helper="11 numbrit" /></Col>
    </Row>

    <div className="flex justify-content-end gap-2">
      <Button visualType="neutral">Katkesta</Button>
      <Button iconRight="arrow_forward">Jätka</Button>
    </div>
  </VerticalSpacing>
</Card>
```

Use `Row`/`Col` (12-column, breakpoint props) for page grids and `VerticalSpacing` for
vertical rhythm rather than ad-hoc margins.

## 7. Notes

- `InputGroup` is a compound: `InputGroup.Prefix`, `InputGroup.Input`,
  `InputGroup.Suffix`. Use it for inputs with attached addons (currency, country code,
  unit, a trailing button) rather than faking them with adjacent elements.
- Toasts are imperative: call `sendNotification(alertProps)` and mount `ToastContainer`
  once at the app root. There is no `<Toast>` component.
- Other compounds follow the same namespace shape: `Table.Toolbar` /
  `Table.ColumnsMenu` / `Table.HeaderButton`, `Accordion.Item`, `ChoiceGroup.Item`.
