# Building with TEDI Design System (React)

TEDI is the Estonian health-and-social-services design system. Everything below is
verified against this build — every class, token, prop and component named here exists.

## 0. Package, version and sources

```
npm install @tedi-design-system/react
```

| | |
|---|---|
| Package | [`@tedi-design-system/react`](https://www.npmjs.com/package/@tedi-design-system/react) |
| This bundle corresponds to | **19.0.0-rc.2** (npm `rc` tag) |
| Also published | **18.1.0** (npm `latest`) |
| Source | https://github.com/TEDI-Design-System/react |
| **Live Storybook (React)** | **https://storybook.tedi.ee/react/rc** — rendered examples + prop tables |
| Design source of truth | [Figma — TEDI Design System](https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/) |
| Human docs | https://www.tedi.ee/1ee8444b7/ (Zeroheight) |

> Always use the **`/react/rc/`** build — this bundle is built from `rc`. The bare
> `storybook.tedi.ee` is a framework picker, and `/react/main/` is the stable line, which
> can lag this bundle. Deep links follow
> `https://storybook.tedi.ee/react/rc/?path=/docs/tedi-ready-<group>-<component>--docs`
> (verified: `…-layout-sidenav--docs`, `…-layout-header--docs`, `…-layout-footer--docs`,
> `…-content-table--docs`, `…-components-navigation-link--docs`).

**Ignore the `@0.0.0-semantic-version` in the generated title below.** That is a
placeholder committed in `package.json`; semantic-release substitutes the real version
only when publishing to npm, so any locally-built bundle carries the placeholder. The
table above is authoritative.

**Two version-sensitive APIs:**

- `TextArea` was renamed to **`Textarea`** in **19.0.0** (this bundle). The old casing is
  gone, so `import { TextArea }` is `undefined` here — always write `Textarea`.
- `InputGroup` became a named export in **18.1.1-rc.1** (before that it was default-only
  and `export *` did not forward it, so `import { InputGroup }` was `undefined`). If the
  target app is pinned to **18.1.0 or earlier**, use `TextField` / `NumberField` inside
  `Field` instead of `InputGroup`.

Only the **`/tedi`** namespace (TEDI-Ready, production-grade) is included here. The
package also ships `/community`, which is deliberately excluded — it is community-
contributed and not a reference for TEDI patterns.

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

`danger`, `success`, `inverted` and `text` are **`color`** values — `visualType="danger"` is the
most common way to get this wrong.

**An icon-only button still takes `children`, and that is its accessible name.** `children` is
required (`children: React.ReactNode`), and setting `icon` adds `tedi-btn--icon-only`, whose
stylesheet rule clips the label rather than removing it (`@include mixins.visually-hidden`). The
text stays in the accessibility tree:

```jsx
<Button icon="delete" visualType="neutral">Kustuta</Button>   // ✓ label is the accessible name
<Button icon="delete">{null}</Button>                          // ✗ no accessible name at all
<Button icon="delete" aria-label="Kustuta" />                  // ✗ children is required, and
                                                               //   aria-label would override it
```

Satisfying the required prop with `null` / `''` / empty children is the exact WCAG failure the
label exists to prevent. `showTooltip` reuses the same string as hover text when children is a
string. `Link` and `FloatingButton` share this contract; `ClosingButton` does not — it extends
`ButtonHTMLAttributes` and takes `title`.

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

## 5. Where to look things up — in priority order

When this summary, your memory, and the generated per-component docs disagree,
**the story source wins.** Generated summaries are lossy: prop descriptions are truncated
at 120 characters and referenced types are not expanded (see §8, §9).

1. **Story source** — `src/tedi/components/**/<name>.stories.tsx` in the repo. Real,
   compiling usage code; authoritative and readable.
2. **`<Name>.d.ts`** — the prop contract, here in this bundle.
3. **Live Storybook** — https://storybook.tedi.ee/react/rc — for a **human** to look at
   rendered output.

> **Do not fetch Storybook URLs as a reference.** It is a client-rendered app: fetching
> `?path=/docs/…` returns an empty shell with no props and no examples (verified). The
> deep links in this bundle are for humans. The one machine-readable part is
> `/react/rc/index.json`, which lists story ids and titles — useful for finding a story,
> not for reading one.

Within this bundle specifically:

- `components/<group>/<Name>/<Name>.d.ts` — the prop contract (`<Name>Props`).
- `components/<group>/<Name>/<Name>.prompt.md` — per-component usage and gotchas.
- `_ds/<folder>/styles.css` and its `@import` closure (`tokens/index.css` for every
  token, `fonts/fonts.css`, `_ds_bundle.css` for component CSS).

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

## 7. Custom rendering — capabilities the per-component docs cut off

Each component's `.d.ts` / `.prompt.md` truncates every prop description at ~110
characters and never expands referenced types (`ISelectOption`, `ColumnDef`). Two
capabilities lose their key sentence that way. Both are supported — do not hand-roll
replacements for them.

### Select options are arbitrary React — `renderOption` + `renderValue`

`ISelectOption` has a fourth field the generated props block never shows:

```ts
interface ISelectOption<CustomData = unknown> {
  value: string;
  label: string | React.ReactNode;
  isDisabled?: boolean;
  customData?: CustomData;   // typed escape hatch, read back inside the renderers
}
```

So a colour chip, icon, status dot or two-line option is one prop away:

```jsx
const chip = (v) => ({ width: 14, height: 14, borderRadius: 2, flexShrink: 0, background: `var(${v})` });

<Select
  id="category" label="Kategooria" options={levelOptions}
  renderOption={({ data }) => (
    <span className="flex align-items-center gap-2">
      <span style={chip(data.customData.colorVar)} aria-hidden="true" />
      {data.label}
    </span>
  )}
  renderValue={(option) => (/* same shape — renders inside the closed trigger */)}
/>
```

- Both renderers **replace** the option / trigger body rather than composing with the
  default label, so render the label yourself.
- `renderValue` is **single-select only**; under `multiple` use `renderOption` for tags.
- Keep `label` a **string** when the select is searchable — a React-node label renders
  as-is but is not matched by search. Put the visuals in `customData`.
- `dropdownType="grid"` turns the menu into a swatch grid for colour / icon pickers,
  sized by `--tedi-swatch-size`, `--tedi-swatch-gap`, `--tedi-swatch-columns`.
- Reference: the `ValueType` story (colour and icon pickers).

### Table cells are arbitrary React — including form controls

`Table` is TanStack-backed and renders every cell through
`flexRender(columnDef.cell, …)`, so a column's `cell` may return anything, form controls
included. **Editable rows do not need a hand-built CSS grid of inputs:**

```jsx
const columns = [
  { accessorKey: 'name', header: 'Nimi',
    cell: ({ row }) => <EditableTextCell row={row.original} field="nimi" label="Nimi" /> },
];
```

where the cell renders plain text normally and swaps to
`<TextField id={…} label={…} hideLabel value={…} onChange={…} />` (or `Select`,
`DatePicker`, a remove `Button`) for the row currently being edited. Staying inside real
`<td>`s keeps header association and per-cell labelling that a `div` grid throws away.

> `useEditableRows` and `EditableRowsProvider` appear in Table's generated examples but
> are **story-local helpers, not library exports** — importing them from the package
> fails. They are a small `useState` row-draft hook (rows / editingId / draft /
> beginEdit / cancelEdit / commitEdit); write your own.

Adding and removing rows is your own state on the array passed as `data`. Reference: the
`EditableValues` story.

## 8. Shapes and names the per-component docs never define

### Same concept, different prop name

The per-component docs show one component at a time, so cross-component naming inconsistency is
invisible in them. TEDI names the same concept differently in several places, and the wrong name is
either a type error or is passed to the DOM and silently ignored. Never transfer a prop name from a
sibling component — or from another design system — without checking the `.d.ts`.

**Open / close callback — three names:**

| Name | Components |
|---|---|
| `onToggle` | `Modal`, `Collapse`, `Accordion.Item`, `Header.Language` |
| `onOpenChange` | `Dropdown`, `CollapseButton`, `SideNav.Dropdown` |
| `onMenuToggle` | `SideNav`, `TopNav` — `SideNav` also has `onCollapseToggle` |

`Modal` is `onToggle`; `Dropdown` is `onOpenChange`. Radix/shadcn's universal `onOpenChange` does
not transfer.

**Open state:** `open` / `defaultOpen` on `Modal`, `Dropdown`, `Collapse` — but `isMobileOpen` on
`SideNav` and `TopNav`, and `isOpen` on `MobileNav`.

**Visual-style axis — four names, none universal:**

| Name | Components |
|---|---|
| `variant` | `StatusBadge`, `Filter`, `ChoiceGroup`, `Breadcrumbs`, `Separator`, `TableOfContents`, `Dropdown`, `Carousel.Indicators`, `MobileNavToggle` |
| `visualType` | `Button`, `Link`, `FloatingButton` |
| `type` | `Alert`, `StatusIndicator`, `Toggle`, `Field`, `Pagination`, `ButtonGroup`, `EmptyState`, `OptionContent`, `TextGroup` |
| `color` | `Icon`, `Text`, `Button`, `Link`, `Tag`, `List`, `Spinner`, `Separator`, `StatusBadge`, `ClosingButton`, `InfoButton`, `Toggle`, `ChoiceGroup` |

`variant` is correct on nine components and **wrong on `Button`**, the one used most. `StatusBadge`
has no `type` prop — it carries three independent axes: `variant`
(`filled` / `filled-bordered` / `bordered`), `color` (`neutral` `brand` `accent` `success` `danger`
`warning` `transparent`) and `status` (`danger` `success` `warning` `inactive`).

### Shared type shapes

These type names appear in many components' props with no definition anywhere in the
bundle. Their real shapes:

```ts
// `helper` — 15 components
interface FeedbackTextProps {
  text: React.ReactNode | React.ReactNode[];
  type?: 'hint' | 'valid' | 'error';   // 'error' / 'valid' also flip the field's styling
  position?: 'left' | 'right';
  id?: string; className?: string;
}

// object form of `icon` / `iconLeft` / `iconRight` — 10 components
interface IconWithoutBackgroundProps {
  name: string;                        // Material Symbols ligature
  size?: IconSize; color?: IconColor; type?: IconType;
  filled?: boolean; label?: string; className?: string;
}
```

**Only `TextField`, `Textarea`, `Search` and `InputGroup` accept an array** of
`FeedbackTextProps` (several messages at once, e.g. an error plus a hint). On `Select`,
`NumberField`, `Checkbox`, `Radio`, `ChoiceGroup`, `Toggle`, `Slider`, `FileUpload`,
`FileDropzone` and `ProgressBar`, `helper` takes a single object only.

Date components (`Calendar`, `DateField`, `DateTimeField`) type `disabled`,
`disabledMatchers`, `hidden` and `modifiers` as a react-day-picker matcher union. The
union is spelled out in the props, but these object forms are not:

```ts
{ before: Date }                    // DateBefore — everything earlier
{ after: Date }                     // DateAfter
{ before: Date, after: Date }       // DateInterval — strictly between
{ from: Date, to?: Date }           // DateRange — inclusive
{ dayOfWeek: number | number[] }    // DayOfWeek — 0 = Sunday, e.g. weekends: [0, 6]
```

So `disabled={{ before: new Date() }}` blocks past dates and
`disabled={{ dayOfWeek: [0, 6] }}` blocks weekends — no per-day predicate needed (though
`(date) => boolean` and `Matcher[]` are also accepted).

## 9. Capabilities cut off past the 120-character mark

Prop descriptions are truncated at 120 characters, which hides the second half of ~400
props. The ones most likely to cause you to hand-roll a workaround:

| Prop | What the cut-off half says |
|---|---|
| `Collapse.controlsId` | Points the trigger at **your** element id and does **not** render the internal panel — for a disclosed region that must live outside Collapse's DOM subtree (e.g. details in a sibling `<tr>`). |
| `DateTimeField.availableTimes` | Accepts a static array **or a function** `(date: Date) => string[]`, evaluated per selected date — for slot lists that differ by day. |
| `Calendar/DateField.selectionLevel` | `'years'` / `'months'` / `'days'` — a year- or month-only picker, opening straight on that grid. |
| `DateField.modal` | `true` / `false` / **a breakpoint name** — modal below that breakpoint, popover above it. |
| `DateField.footer` | Renders your node inside the calendar popover, below the grid. |
| `Table.activeRowId` | Master-detail anchoring with `aria-current="true"` — distinct from checkbox selection and from `:hover`. |
| `Table.expandTrigger` | `'row'` makes a click (and Enter/Space) anywhere on an expandable row toggle it. |
| `Table.rowProps` / `columnProps` | Per-row / per-column `className` **and** `style`, for conditional tinting or drop indicators. Row event handlers are **not** accepted — Table owns row click/keyboard. |
| `Table.reorderableRows` / `reorderableColumns` | Full keyboard drag-and-drop (Space/Enter to lift, arrows to move, Escape to cancel) with live-region announcements — not mouse-only. |
| `Table.emptyStateRole` | `'status'` (polite) or `'alert'` (assertive); omit when the empty state never changes. |
| `Alert.action` | A reserved, aligned action slot that replaces the close button — use it **instead of** squeezing buttons into `children`. |
| `Footer.children` | An ordered contract: `Footer.Side placement="start"` → exactly one `Footer.Body` → `Footer.Side placement="end"` → optional `Footer.Bottom`. |
| `SideNav.isMobileOpen` | Pair with `SideNav.Toggle` (`menuOpen` / `toggleMenu`) to drive the mobile menu from your own state. |
| `Breadcrumbs.maxItems` | Collapses overflow crumbs into a dropdown (`'long'` variant only); `variant="short"` renders a single back link. |
| `Pagination.showEdgeNavLabels` | Renders the arrows as labelled text links instead of circular icon buttons (`arrowVariant` is then ignored). |
| `TextField/Textarea.onKeyPress` | Bound to the **surrounding container**, not the input element. |
| `*.iconButtonProps` | Forwards `aria-expanded` / `aria-controls` / `aria-haspopup` to the icon trigger — only applies when `onIconClick` is set, which is also what turns the icon into a `<button>`. |
| `Tag.role` | Defaults to `'status'`; pass `role="presentation"` for static tags in a list, or some screen readers announce them twice. |
| `TopNav.submenuFit` | `'full'` (mega-menu width) vs `'content'` (shrink to content). |
| `Select.openKeyboardOnTouch` | `false` opens the menu on touch **without** raising the on-screen keyboard. |

When a prop's description ends mid-sentence, assume there is more and check
`src/tedi/**` or Storybook before building around it.

## 10. Page shell / app layout — read this before building any page

There is **no `Layout` component**, and `SideNav` is deliberately decoupled: it does not
position itself. You own the shell. Every mistake below produces a wrong-looking page
with **no error and no console warning**, so it is worth copying the structure exactly.

### The canonical shell

Header full width → a row holding the sidenav column and main → footer.

```jsx
import { Header, SideNav, Footer, Link, Text,
         useBreakpoint, isBreakpointBelow } from '@tedi-design-system/react/tedi';

function AppShell({ navItems, children }) {
  const [navOpen, setNavOpen] = useState(false);
  const isMobile = isBreakpointBelow(useBreakpoint(), 'lg');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header toggle={<SideNav.Toggle menuOpen={navOpen} toggleMenu={() => setNavOpen(!navOpen)} />}>
        <Header.Logo logo={<Text modifiers="bold">Minu rakendus</Text>} />
        <Header.Actions>
          <Header.Language languages={languages} />
          <Header.Profile>…</Header.Profile>
        </Header.Actions>
      </Header>

      {/* THE ROW: must stretch, must not be padded */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0, alignItems: 'stretch' }}>
        {/* Sidenav column: no padding, no align-self, no sticky */}
        <div style={{ display: 'flex' }}>
          <SideNav
            ariaLabel="Peamenüü"
            navItems={navItems}
            mobileBreakpoint="mobile"
            isMobileOpen={navOpen}
          />
        </div>

        {/* Main: owns its own scrolling and padding */}
        <main style={{ flex: 1, minWidth: 0, overflowY: 'auto', padding: '1.5rem' }}>
          {children}
        </main>
      </div>

      <Footer>…</Footer>
    </div>
  );
}
```

### Why each rule exists

`SideNav` is `height: 100%` — **its parent decides how tall it is.** That single fact
explains every failure mode below.

| Rule | If you break it |
|---|---|
| The row is `display: flex` with `align-items: stretch` (the default — do not override) | The sidenav column collapses to content height; white gap below the nav down to the footer |
| The sidenav column has **no padding** | A coloured strip of page background appears around the nav |
| The sidenav column is not `align-self: flex-start` | Same as above — the column stops at content height |
| The row is `flex: 1` | The shell does not reach the footer; both nav and main end early |
| `main` owns `overflow-y: auto`, not the row or body | The whole page scrolls, taking the header and nav with it |
| `main` has `min-width: 0` | Wide content (tables!) forces the row wider and breaks the layout |

### Wrong / right

```jsx
// ✗ padded wrapper — background strip around the nav
<div style={{ padding: '1rem' }}><SideNav … /></div>
// ✓
<div style={{ display: 'flex' }}><SideNav … /></div>

// ✗ content-height column — nav stops short, white gap to the footer
<div style={{ alignSelf: 'flex-start' }}><SideNav … /></div>
// ✓ let it stretch (default)
<div style={{ display: 'flex' }}><SideNav … /></div>

// ✗ sticky wrapper — nav detaches, leaves a gap and scrolls oddly
<div style={{ position: 'sticky', top: 0 }}><SideNav … /></div>
// ✓ make the ROW full height and let main scroll instead
<div style={{ display: 'flex', flex: 1, minHeight: 0 }}>…</div>
```

### No positioning utilities ship

`fixed`, `absolute`, `relative`, `sticky`, `top-0`, `h-full`, `w-full`, `z-50` are **not**
in the TEDI stylesheet — only the flex / gap / align / justify / text / order families in
§2. Use inline styles or your own CSS for the shell. (The SideNav Storybook page shows
`className="fixed left-0 top-0 h-full z-50"`; those classes do nothing here.)

### Don't do this — app-level element resets break DS components

TEDI components rely on **inherited colour** in places, and their own class names are
hashed. A bare element selector in your app therefore beats them:

```css
/* ✗ turns SideNav item hover black and makes footer links dark-on-dark */
a:hover { color: #000; }
```

Scope such rules to your own container (`.my-content a:hover`), or set colours through
component props (`<Link color="inverted">`) instead. This class of bug is invisible in
Storybook and only appears once the design system is dropped into a real app.

`Header` and `SideNav` are internally wrapped in `Print visibility="hide"`, so they drop
out of print output on their own. **`Footer` is not** — wrap it yourself in
`<Print visibility="hide">` if it should not print.
## 11. Notes

- `InputGroup` is a compound: `InputGroup.Prefix`, `InputGroup.Input`,
  `InputGroup.Suffix`. Use it for inputs with attached addons (currency, country code,
  unit, a trailing button) rather than faking them with adjacent elements.
- Toasts are imperative: call `sendNotification(alertProps)` and mount `ToastContainer`
  once at the app root. There is no `<Toast>` component.
- Other compounds follow the same namespace shape: `Table.Toolbar` /
  `Table.ColumnsMenu` / `Table.HeaderButton`, `Accordion.Item`, `ChoiceGroup.Item`.
