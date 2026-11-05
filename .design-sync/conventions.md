## Start here: wrap everything in the providers

Without the providers, components render unstyled, show translation keys instead of text, or
throw.

```jsx
import { ThemeProvider, PrintingProvider, LabelProvider } from '@tedi-design-system/react/tedi';
import '@tedi-design-system/react/index.css';

<ThemeProvider theme="default">        {/* also stamps tedi-theme--default on <html> */}
  <PrintingProvider>                    {/* Print, Collapse and Footer read it */}
    <LabelProvider locale="et">         {/* required: see below */}
      <App />
    </LabelProvider>
  </PrintingProvider>
</ThemeProvider>
```

- **`LabelProvider` is not optional.** Component default labels come from it; without it a
  `FileUpload` button renders `file-upload.add` instead of "Lisa manus". It also drives
  locale formatting (`NumberField` uses `,` as the decimal separator under `locale="et"`).
  Locales: `et`, `en`, `ru`.
- `theme` is `"default"` or `"dark"`. Themed surfaces follow the `tedi-theme--*` class on the
  root element, so switch themes on `ThemeProvider`, never by picking colours.
- `StyleProvider` and `AccessibilityProvider` are also exported; add them only for their
  specific features.

## Colour, type and spacing

Every colour, spacing and radius you write yourself comes from a token: `var(--name)`, never a
literal, and never with a fallback (`var(--x, #fff)` is against house style).

| Family | Purpose | Examples |
|---|---|---|
| `--general-*` | semantic surfaces, borders, text and icons; re-theme in dark mode | `--general-surface-primary`, `--general-border-primary`, `--general-text-secondary` |
| per-component | `--button-*`, `--card-*`, `--form-*`, `--alert-*`, `--heading-*`, `--body-*` | `--card-background-brand-primary` |
| `--layout-*` | grid gutters, container widths | `--layout-grid-gutters-08`, `--layout-container-max-width-lg` |
| `--tedi-*` | raw palette and scales; last resort, they don't re-theme | `--tedi-primary-600`, `--tedi-dimensions-10`, `--tedi-radius-02-default` |

Type is **Roboto**, set through `Heading` and `Text` rather than font sizes. Icons are
**Material Symbols**: `<Icon name="arrow_forward" />` takes a ligature name.

## Styling: props first, shipped utilities second, never invented classes

Component styles are CSS Modules with hashed class names (`tedi-btn-f8b478d7`), so they are not
an API and cannot be written by hand. There are exactly two levers.

**1. Component props** carry the design language. Prefer them always:

```jsx
<Button visualType="secondary" color="danger" size="small" iconRight="arrow_forward">Kustuta</Button>
<Text color="secondary" element="p">…</Text>
<Card background="brand-primary">…</Card>
```

`Button` has two independent axes. `visualType` is `primary` | `secondary` | `neutral` |
`link`; `color` is `default` | `danger` | `success` | `inverted` | `text`. `visualType="danger"`
is the most common mistake.

Other values worth knowing:

- `Text` and `Heading` `color`: `primary secondary tertiary neutral brand danger success info warning disabled white`
- `Card` `background`: `primary secondary tertiary accent brand-primary brand-secondary brand-tertiary brand-quaternary danger-primary danger-secondary success-* info-* warning-* neutral-*`
- `VerticalSpacing` `size`: `0 0.25 0.5 0.75 1 1.25 1.5 1.75 2 2.5 3 4 5` (rem)
- `Card` `borderRadius` is not a keyword: it is `false` or `{ top?, bottom?, ... }`

**Most components take per-breakpoint props** instead of media queries: pass a partial props
object under a breakpoint key (`sm md lg xl xxl`), plus `defaultServerBreakpoint` for SSR.

```jsx
<Button fullWidth lg={{ fullWidth: false, size: 'small' }} defaultServerBreakpoint="lg">Salvesta</Button>
```

**2. Shipped layout utilities**, for your own glue between components:

| Family | Real names |
|---|---|
| flex | `flex`, `flex-row`, `flex-column`, `flex-wrap`, `flex-grow-1`, `flex-shrink-0` |
| gap | `gap-0` … `gap-5` |
| align | `align-items-start`, `align-items-center`, `align-items-end`, `align-self-*` |
| justify | `justify-content-start`, `justify-content-center`, `justify-content-end`, `justify-content-between` |
| text | `text-center`, `text-bold`, `text-capitalize`, `text-break-word`, `text-extra-small` |
| other | `order-*`, `sr-only` |

The layout families have breakpoint infixes (`align-items-lg-center`,
`justify-content-md-between`, `flex-lg-row`). There are no positioning utilities (`fixed`,
`sticky`, `h-full`, `z-50` and the like do nothing), and no `display-flex`: use `flex`. Use
`Row` / `Col` (12 columns, breakpoint props) for grids and `VerticalSpacing` for vertical
rhythm instead of margins.

## Page layout

There is no `Layout` component, and `SideNav` does not position itself: you own the shell.
Every mistake here gives a wrong-looking page with no error, so copy the structure.

```jsx
import { Header, SideNav, Footer, Text, useBreakpoint, isBreakpointBelow } from '@tedi-design-system/react/tedi';

function AppShell({ navItems, children }) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header toggle={<SideNav.Toggle menuOpen={navOpen} toggleMenu={() => setNavOpen(!navOpen)} />}>
        <Header.Logo logo={<Text modifiers="bold">Minu rakendus</Text>} />
        <Header.Actions>
          <Header.Language languages={languages} />
          <Header.Profile>…</Header.Profile>
        </Header.Actions>
      </Header>

      {/* the row: stretches, never padded */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0, alignItems: 'stretch' }}>
        {/* the nav column: no padding, no align-self, no sticky */}
        <div style={{ display: 'flex' }}>
          <SideNav ariaLabel="Peamenüü" navItems={navItems} mobileBreakpoint="mobile" isMobileOpen={navOpen} />
        </div>
        {/* main owns scrolling and padding */}
        <main style={{ flex: 1, minWidth: 0, overflowY: 'auto', padding: '1.5rem' }}>{children}</main>
      </div>

      <Footer>…</Footer>
    </div>
  );
}
```

`SideNav` is `height: 100%`, so its parent decides how tall it is:

| Rule | If you break it |
|---|---|
| The row is `display: flex` and keeps `align-items: stretch` | The nav stops at its content; a white gap down to the footer |
| The nav column has no padding and no `align-self: flex-start` | A strip of page background around the nav, or the same gap |
| The row is `flex: 1` | Nav and main end before the footer |
| `main` owns `overflow-y: auto` | The whole page scrolls, header and nav with it |
| `main` has `min-width: 0` | Wide content (tables) pushes the row wider and breaks the layout |

Bare element selectors in your app CSS beat TEDI's hashed classes: `a:hover { color: #000 }`
turns `SideNav` hover black and footer links dark-on-dark. Scope such rules to your own
container, or use component props (`<Link color="inverted">`).

`Header` and `SideNav` hide themselves in print; `Footer` does not, so wrap it in
`<Print visibility="hide">` if it shouldn't print.

## Example

Library components for the controls, shipped utilities for the layout glue:

```jsx
import { Card, Heading, Text, Button, TextField, Row, Col, VerticalSpacing } from '@tedi-design-system/react/tedi';

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

## Gotchas and easy-to-miss capabilities

Each component's `components/<Name>/README.md` has its props and examples; read it before
hand-rolling a workaround. These cut across components:

**Icon-only buttons still take `children`; it is their accessible name.** With `icon` set, the
label is visually hidden, not removed: `<Button icon="delete" visualType="neutral">Kustuta</Button>`.
Never pass `null` or an empty string, and don't replace it with `aria-label`. `Link` and
`FloatingButton` work the same; `ClosingButton` takes `title` instead.

**The same concept has different prop names.** A name from a sibling component (or another
design system) is either a type error or silently ignored:

| Concept | Name | Components |
|---|---|---|
| open / close callback | `onToggle` | `Modal`, `Collapse`, `Accordion.Item`, `Header.Language` |
| | `onOpenChange` | `Dropdown`, `CollapseButton` |
| | `onMenuToggle` | `SideNav`, `TopNav` |
| open state | `open` / `defaultOpen` | `Modal`, `Dropdown`, `Collapse` |
| | `isMobileOpen` | `SideNav`, `TopNav` |
| visual style | `visualType` | `Button`, `Link`, `FloatingButton` |
| | `variant` | `StatusBadge`, `Filter`, `Radio`, `Checkbox`, `Breadcrumbs`, `Separator`, `TableOfContents`, `Dropdown` |
| | `type` | `Alert`, `StatusIndicator`, `Toggle`, `Pagination`, `ButtonGroup`, `EmptyState`, `TextGroup` |

`StatusBadge` has three axes: `variant` (`filled`, `filled-bordered`, `bordered`), `color`
(`neutral`, `brand`, `accent`, `success`, `danger`, `warning`, `transparent`) and `status`
(`danger`, `success`, `warning`, `inactive`).

**Choice groups.** `Radio.Group` and `Checkbox.Group` take `label` (required),
`value` / `defaultValue` / `onChange` (a string for Radio, a string array for Checkbox),
`helper`, `disabled`, `invalid`, `required`, `size`, `direction` (`row` | `column`) and
`variant="card"` with `cardVariant` (`primary` | `secondary`). Radio adds `layout`
(`separated` | `segmented`), Checkbox adds `indeterminateCheck` (a select-all row). Children
are plain `<Radio value label />` / `<Checkbox value label />`; the group supplies `name`.

**`helper`** takes `FeedbackTextProps`: `text`, `type` (`hint` | `valid` | `error`; the last two
also restyle the field) and `position`. Only `TextField`, `Textarea`, `Search` and `InputGroup`
accept an array of them.

**Icons in props.** `iconLeft` / `iconRight` take a Material Symbols name or
`IconWithoutBackgroundProps` (no background); `OptionContent`'s `icon` takes `IconProps`, which
may carry a background.

**Select options are any React.** `ISelectOption` has `value`, `label`, `isDisabled` and a typed
`customData`; render it with `renderOption` and `renderValue` (both replace the default body, so
render the label yourself; `renderValue` is single-select only). Keep `label` a string when the
select is searchable. `dropdownType="grid"` makes a swatch grid for colour or icon pickers.

**Table cells are any React**, form controls included: a column's `cell` can return a
`TextField` or `Select` for the row being edited, so editable rows need no hand-built grid of
inputs. Rows added and removed are your own state on `data`.

**Date matchers.** `disabled` on `Calendar`, `DateField` and `DateTimeField` takes
react-day-picker matchers: `{ before: Date }`, `{ after: Date }`, `{ from: Date, to?: Date }`,
`{ dayOfWeek: [0, 6] }` (weekends), a predicate or an array of them.

**Toasts are imperative:** call `sendNotification(alertProps)` and mount `ToastContainer` once
at the app root. There is no `Toast` component.

Props that are easy to miss:

| Prop | What it does |
|---|---|
| `Collapse.controlsId` | Points the trigger at your own element and renders no panel, for a region outside Collapse's DOM (details in a sibling `<tr>`) |
| `DateTimeField.availableTimes` | An array, or `(date) => string[]` for slots that differ by day |
| `DateField.selectionLevel` | `years` / `months` / `days`: a year- or month-only picker |
| `DateField.modal` | `true`, `false` or a breakpoint name: modal below it, popover above |
| `Table.activeRowId` | Master-detail highlight with `aria-current`, separate from selection |
| `Table.expandTrigger` | `row` makes a click or Enter anywhere on an expandable row toggle it |
| `Table.rowProps` | Per-row `className` and `style`; row click handlers are not accepted |
| `Table.reorderableRows` | Keyboard drag-and-drop with live-region announcements |
| `Alert.action` | An aligned action slot that replaces the close button |
| `Footer.children` | An ordered contract: `Footer.Side` (start), one `Footer.Body`, `Footer.Side` (end), optional `Footer.Bottom` |
| `TextField.onKeyPress` | Bound to the surrounding container, not the input element |
| `Breadcrumbs.maxItems` | Collapses overflow crumbs into a dropdown |
| `Pagination.showEdgeNavLabels` | Labelled text arrows instead of icon buttons |
| `Tag.role` | Defaults to `status`; use `presentation` for static tags in a list |
| `Select.openKeyboardOnTouch` | `false` opens the menu on touch without the on-screen keyboard |
