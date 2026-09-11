# Discovering Components

**This is a discovery guide, not a component snapshot.** The roster and the exact props change
every release, so this file does not enumerate them. It tells you where to read the always-current
catalog, and then documents the behaviour that reading the types *won't* tell you.

Read in this order:

1. **The manifest**: the generated catalog. What exists, what it's for.
2. **The `.d.ts`**: the exact prop surface of the one component you're using.
3. **[Behaviour the types don't tell you](#behaviour-the-types-dont-tell-you)**: the traps, below.

Everything in steps 1 and 2 lives in the consumer's own `node_modules`, so it is version-exact by
construction and needs no network. Reach for GitHub or Storybook only when there is no install to
read (see SKILL.md → Authoritative Sources).

## Two namespaces

`@tedi-design-system/react` ships components under two entry points:

- **`/tedi`**: TEDI-Ready components. Production-grade, stricter rules. **Prefer these.**
- **`/community`**: Community/extended components. Relaxed linting, not a reference for TEDI patterns.

Several Community components are **deprecated** in favour of TEDI-Ready equivalents, and the set
with no TEDI-Ready alternative shifts over time. Don't rely on a memorised list. The manifest's
`status` field and the component's JSDoc carry the current deprecation state.

## 1. Enumerate: the generated manifest

```
node_modules/@tedi-design-system/react/component.manifest.json
```

This is the authoritative machine-readable catalog of TEDI-Ready components. It is **generated**
from the source tree (`npm run design:build` in the library repo) and guarded by a drift test, so
unlike a hand-written list it cannot silently fall behind the code. Shape:

```json
{
  "import": "@tedi-design-system/react/tedi",
  "components": [
    {
      "id": "buttons/card-button/card-button",
      "name": "CardButton",
      "category": "buttons",
      "sourcePath": "src/tedi/components/buttons/card-button/card-button",
      "status": [],
      "description": "Polymorphic interactive wrapper that turns a single Card into a clickable button or navigation link.",
      "keyProps": ["as", "children", "onClick"]
    }
  ]
}
```

Use it to answer "what is there / which component do I want", by `description` and `category`:

```bash
M=node_modules/@tedi-design-system/react/component.manifest.json
# the whole catalog, one line each
python3 -c "import json,sys;[print(f\"{c['name']:24} {c['category']:14} {c['description']}\") for c in json.load(open(sys.argv[1]))['components']]" $M
# which component handles a concern?
python3 -c "import json,sys;[print(c['name'],'-',c['description']) for c in json.load(open(sys.argv[1]))['components'] if 'step' in c['description'].lower()]" $M
# anything deprecated or otherwise flagged
python3 -c "import json,sys;[print(c['name'],c['status']) for c in json.load(open(sys.argv[1]))['components'] if c['status']]" $M
```

`keyProps` is the 2–5 props you'll most likely need, not the full set. `description` is one line.
Neither is a substitute for step 2: never write a prop you have not seen in the types.

**If the manifest is absent** (older installed version), fall back to the barrel export
`node_modules/@tedi-design-system/react/src/tedi/index.d.ts`: one `export *` line per component,
which is still an authoritative roster, just without descriptions.

## 2. Read the real props: the shipped `.d.ts`

The package publishes a per-component `.d.ts` tree with **JSDoc preserved**, including defaults and
worked examples. Resolve a component's types from its manifest `sourcePath`:

```
node_modules/@tedi-design-system/react/<sourcePath>.d.ts        # most components
node_modules/@tedi-design-system/react/<sourcePath>/index.d.ts  # directory-index components
```

Try the first; if it doesn't exist, the component is a directory barrel and the second one does.
(As of writing, roughly a third are the directory shape: `Table`, `Card`, `Grid`, `TopNav`,
`Carousel`, `List`, `EmptyState`, …)

Two things to expect when reading them:

- **Props are inherited.** Interfaces routinely `extends BreakpointSupport<...>`, `FormLabelProps`,
  `TextFieldProps`, `ButtonProps<C>`. The full surface spans the `extends` chain, not one
  interface. `Button`'s own file, for instance, is a three-line re-export, and its props live in
  `button-content.d.ts`.
- **The JSDoc is the spec, and it is usually generous.** `table.d.ts` alone carries defaults,
  rationale, and runnable examples. Read it before reaching for any other source.

Storybook (`storybook.tedi.ee`) renders these same types as args tables with resolved defaults.
Convenient for a human, but it tracks `main`, so the installed `.d.ts` wins on any disagreement.

## Category map

Categories under `src/tedi/components/` (the manifest's `category` field): `base` · `buttons` ·
`content` · `filter` · `form` · `layout` · `loaders` · `misc` · `navigation` · `notifications` ·
`overlays` · `tags`. Useful for orientation; the manifest is the list.

## Capability patterns

Components opt into shared capabilities: polymorphic `as`, per-breakpoint prop overrides,
`forwardRef`, and compound sub-components (`Card.Header`, `Dropdown.Item`). See
**SKILL.md → Component Patterns** for how each works; the types tell you which a given component
supports.

## Behaviour the types don't tell you

Props, defaults and enum members are all in the `.d.ts`, so go read them. What follows is the
opposite: behaviour that is invisible in the type signature, contradicted by it, or spread across
files. This is the part of this document worth maintaining by hand.

### Picking the right component

- **`DateField` / `TimeField`, not `Calendar` / `TimePicker`.** The latter two are lower-level
  primitives. Reach for them only for an always-visible inline calendar or time selector
  (scheduling grid, availability picker), or when building a custom control on top.
- **`VerticalStepper` for desktop, `CardStepper` for mobile.** They're a pair; swap on a breakpoint
  via `useBreakpoint`. `CardStepper` renders the full list in a `Modal` as a `VerticalStepper`.
- **`OptionContent` is a template, not an item.** It has no role, click or focus handling by design.
  It must go inside an interactive parent (`DropdownItem`, a `Select` option) that owns the role,
  selection and keyboard handling.
- **`Sheet` is the bottom sheet; `Modal` is the centred dialog.** Reach for `Sheet` on mobile-first
  surfaces — it anchors to the bottom and adds a drag handle, snap points and collapse-to-header that
  `Modal` has no concept of. It is bottom-only by design (no side/drawer variant). `SheetModal` is a
  *separate*, Modal-backed variant used internally by `CardStepper` and
  `TableOfContents.Collapsible`; it is **not** a sub-component of `Sheet`, so don't reach for it when
  composing one.

### Composition constraints

- **`CardButton` wraps exactly one `Card`.** Avoid nested interactive elements inside it, or you get
  a button inside a button.
- **`Collapse`'s `title` does not toggle.** Only the chevron button does. The title is a sibling of
  the button, not inside it, precisely so it can hold its own links and buttons. Pass
  `fullRowToggle` to make the whole header row a mouse target (the chevron stays the keyboard and
  screen-reader control, and clicks on interactive elements inside the title still work).
  *Note: `collapse.tsx`'s JSDoc on `title` claims it is "rendered inside the toggle button". That
  is wrong; trust this entry.*
- **`TopNav` top-level items either link or toggle.** `href` for a link; omit `href` and pass
  `submenu` for a mega-menu parent. Don't pass an anchor parent to `submenu`, because the mega-menu
  renders below the trigger, not inside it. Only one mega-menu is open at a time.
- **`CardStepper` takes steps two ways**: compound `CardStepper.Step` children or the `steps` data
  prop. Children win when both are given.
- **`TableOfContents.Item` children must be direct children.** Don't wrap them in another
  component. Pass `underline={false}` on the `Link` inside an item to match the design.
- **`Sheet` is a compound with an auto-wired title.** Compose `Sheet.Trigger` / `.Content` /
  `.Header` / `.Body` / `.Footer` / `.Closer`. `Sheet.Header`'s `title` is wired to the dialog's
  `aria-labelledby` for you; set `Sheet.Content`'s `aria-label` only when there is no visible title.
- **`Sheet`'s `keepMounted` preserves state, invisibly.** By default the panel is removed from the
  DOM when closed; `keepMounted` keeps it mounted-but-`hidden`, so form values and scroll position
  survive a close→reopen. Nothing in the type signals that state-preservation difference — and the
  kept panel is inert while closed, not just off-screen.
- **`Sheet` `snapPoints` resize the panel; they don't translate it.** With `snapPoints={[0.4, 0.9]}`
  the bottom sheet's height *is* the active snap, so the body scrolls and the footer stays visible at
  every rest position, and dragging below the lowest snap dismisses. `collapsible` is the lighter
  relative: it peeks the sheet down to just its header (toggled by the `CollapseButton`). From that
  peek the drag handle is direction-sensitive — drag up to expand, swipe down to dismiss.
- **`Sheet.Content`'s `radius` drives both the panel and header corners.** `radius="card" | "none" |
  "default"` overrides the top-corner radius via a single `--tedi-sheet-radius` variable the panel
  and header both read, so it's a sheet-level concern, not a `Sheet.Header` prop — and the panel's
  `overflow: hidden` clips to its own radius, so a header-only override would be invisible anyway.
  It's breakpoint-aware (`radius="none" md={{ radius: 'card' }}`); for any value outside the three
  keywords, set `--tedi-sheet-radius` through `style`.

### Responsive behaviour that isn't a prop

- **Wide `Table`s already scroll.** The Table wraps itself in an `overflow-x: auto` container, so
  horizontal scrolling needs no props. There is deliberately **no** `responsive` prop, so compose a
  stacked layout at the call site if you want one.
- **Per-breakpoint carousel controls need `ShowAt` / `HideAt`.** `Carousel.Navigation` and
  `Carousel.Indicators` are context consumers, so to show dots on mobile and arrows on desktop you
  wrap them in the layout helpers (which unmount rather than hide). `slidesPerView` and `gap` are
  themselves breakpoint-aware and take a per-breakpoint object.
- **`Accordion` icon-cards restack, not resize.** Below `md`, items with `showIconCard` put the
  icon-card *above* the header instead of in a left column; both won't fit side-by-side on a phone
  without truncating one of them.
- **`DateField`'s `numberOfMonths` is clamped to 1 below `md` in the popover** but kept in the
  modal, where months stack vertically.

### Form field details

- **Native input attributes go through `input`, not the top level.** `type`, `autoComplete`, `min`,
  `maxLength` and friends are not TextField props. Pass `input={{ type: 'password',
  autoComplete: 'current-password' }}`. There is no `PasswordField`; a password field is a
  `TextField` with `input={{ type: 'password' }}`. The `input` prop's own JSDoc ("Additional
  attributes for the input element") does not tell you this is the *only* route.
- **`Textarea`, not `TextArea`.** Renamed; the old casing is gone.
- **File rejections are observable.** A file failing `accept` or `maxSize` surfaces a localised
  message whether it was dragged or picked, and `onChange` fires even for a fully-rejected drop
  (with the unchanged list), so single-file rejections aren't silent. Don't re-implement validation
  to detect them.

### Accessibility that props alone won't get right

- **Icon-only `Table.HeaderButton` requires `aria-label`.** With visible `children` the text
  supplies the accessible name and `aria-label` is optional (still worth passing for a richer name).
  An icon-only button (a filter trigger, say) has no text and *must* have one.
- **Put the column label inside `Table.HeaderButton`.** It renders `children` before the icon so
  the whole "label + icon" area is one sort target. An icon-only toggle next to inert text is the
  wrong shape.
- **Non-string headers need `meta.label`.** String headers (`header: 'Teenus'`) are used
  automatically; anything else has no text to derive a filter/sort name from.
- **Table filter validation goes through `TextField`'s `invalid` + `helper`**, never a custom
  red-bordered div, which is the only WCAG 3.3.1-compliant path. The label keys
  `table.filter.validation.min-length` and `table.filter.validation.no-spaces` already exist in the
  LabelProvider. Max-length and pattern rules belong on `TextField` directly via the native
  attributes.
- **Announce "no results" with `emptyStateRole="status"`** when a filter can empty the table.
- **Give a stepper's `<nav>` an `aria-label`.** `VerticalStepper` and `CardStepper` both render a
  landmark; unnamed landmarks are noise when a page has more than one.
- **Don't signal state by colour alone**, and give every sort, pagination, expansion and reorder
  control a name. These outlive any specific prop.

### Browser and data caveats

- **`List.Item`'s `value` needs Safari 17.2+** to reseed the visible counter. Older browsers keep
  sequential numbering. The numbers are a CSS counter, which is also why `List` reseeds it for
  `start` / `reversed` and why `style` is not forwarded to the element.
- **`reorderableRows` doesn't mutate your data.** It emits
  `onRowDrop({ fromId, toId, fromIndex, toIndex })` on every move (keyboard included) and expects
  you to apply it and pass the new array back. Stepping through several moves requires applying
  each emit.
