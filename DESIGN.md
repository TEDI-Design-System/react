---
version: "alpha"
name: "TEDI Design System (React)"
description: "Tokens and tedi-ready component rules for @tedi-design-system/react."
---

# TEDI Design System — React

> Scope: **tedi-ready** components only, imported from `@tedi-design-system/react/tedi`.
> Detailed usage, setup, providers, theming and forms live in the **`tedi-react` skill**
> (`skills/tedi-react/`, references `components.md` / `theming.md` / `forms.md`). This file is
> the token- and rule-level ground truth AI agents read before generating UI; it does not
> duplicate the skill.

## Overview

<!-- prose:overview -->
TEDI is the accessible design system for Estonian public-sector services, published for React as
`@tedi-design-system/react`. Components ship under two namespaces: **tedi-ready** (reviewed,
production-grade, imported from `@tedi-design-system/react/tedi`) and **community**
(contributed, imported from `@tedi-design-system/react/community`). Generate against tedi-ready
only. The system's personality is clear, calm and trustworthy — a restrained blue-led palette,
generous spacing and strong WCAG-compliant contrast, favouring legibility over decoration. This
file is the token- and rule-level ground truth an AI agent reads before generating UI; the
detailed usage, setup, props and examples live in the **`tedi-react` skill**
(`skills/tedi-react/`). When the two overlap, follow this file for tokens and rules and the skill
for how to wire components together.
<!-- /prose:overview -->

## Design tokens

**Look token values up; do not read them from this file.** They live in
`@tedi-design-system/core/tokens.json`, generated in core from Figma and published with the
stylesheet it describes, so it ships to every consumer:

```bash
T=node_modules/@tedi-design-system/core/tokens.json
# one token: both the var() chain and the computed value
python3 -c "import json,sys;print(json.load(open(sys.argv[1]))['themes']['default']['semantic']['general-surface-primary'])" $T
# every member of a family
python3 -c "import json,sys;print([k for k in json.load(open(sys.argv[1]))['themes']['default']['semantic'] if k.startswith('general-text-')])" $T
```

That file is also the only place the **dark theme** (`themes.dark`) and the **per-breakpoint**
(`breakpoints.mobile`, `breakpoints.tablet`) overrides exist. A default-theme value is not the
value: treat every role token as theme-dependent unless you have checked.

The table below is a map of the vocabulary, not a data source. It groups the `general-*` and
`form-*` **role** tokens of the semantic tier into families so you can see which roles exist and
roughly how granular each is. Reach for these, never raw `--tedi-*` primitives. Note that the
heavily-populated `form-<component>-*` families (`form-checkbox-*`, `form-toggle-*`,
`form-slider-*`) are component internals; an application author normally writes `general-*`,
`form-field-*`, `form-input-*` and `form-general-*`.

<!-- tokens:start -->
| Role family | Tokens | Example members |
| --- | --- | --- |
| `form-calendar-*` | 1 | `form-calendar-date-width` |
| `form-checkbox-*` | 22 | `form-checkbox-radio-card-checkbox-icon-padding-y`, `form-checkbox-radio-card-checkbox-indicator-padding-y` |
| `form-choice-*` | 111 | `form-choice-card-primary-selected-background-active`, `form-choice-card-primary-selected-background-default` |
| `form-datepicker-*` | 11 | `form-datepicker-date-active`, `form-datepicker-date-available` |
| `form-field-*` | 18 | `form-field-button-height`, `form-field-button-height-sm` |
| `form-general-*` | 9 | `form-general-background-action-background`, `form-general-background-default` |
| `form-hidden-*` | 2 | `form-hidden-default`, `form-hidden-hover` |
| `form-input-*` | 10 | `form-input-background-default`, `form-input-background-disabled` |
| `form-label-*` | 1 | `form-label` |
| `form-number-*` | 2 | `form-number-input-min-width`, `form-number-min-width` |
| `form-rating-*` | 18 | `form-rating-selected-background-default`, `form-rating-selected-background-disabled` |
| `form-select-*` | 2 | `form-select-area-max-height`, `form-select-area-radius` |
| `form-slider-*` | 23 | `form-slider-active-background-active`, `form-slider-active-background-default` |
| `form-textarea-*` | 1 | `form-textarea-min-height` |
| `form-toggle-*` | 34 | `form-toggle-colored-selected-active`, `form-toggle-colored-selected-default` |
| `general-border-*` | 10 | `general-border-accent`, `general-border-brand` |
| `general-effect-*` | 10 | `general-effect-colors-elevation-dropdown-area-drop-shadow`, `general-effect-colors-elevation-general-primary` |
| `general-icon-*` | 15 | `general-icon-accent`, `general-icon-background-brand-primary` |
| `general-state-*` | 4 | `general-state-active`, `general-state-hover` |
| `general-status-*` | 22 | `general-status-danger-background-primary`, `general-status-danger-background-secondary` |
| `general-surface-*` | 15 | `general-surface-accent`, `general-surface-brand-primary` |
| `general-text-*` | 7 | `general-text-brand`, `general-text-dark` |
<!-- tokens:end -->

## Colors, Typography, Shapes, Layout

<!-- prose:foundations -->
**Token layers.** Tokens come in exactly two layers, the same two the design system defines in
Figma. **Base** tokens (`--tedi-*`, e.g. `--tedi-color-blue-700`) are the raw scale and are an
internal implementation detail — never reference them directly. **Semantic** tokens map a role to a
base token and are what re-theme cleanly, so always consume those. The semantic layer holds both
the general-purpose roles (`general-*`, `form-*`) and component-scoped ones (`button-*`, `card-*`,
`separator-*`, …); the component-scoped tokens are consumed by the components themselves, so in
your own CSS reach for the `general-*` / `form-*` roles listed in the table above. Everything is in
`@tedi-design-system/core/tokens.json` under `themes.default.semantic` if you need a value the
table does not list. The single exception to "never touch base" is the `--tedi-dimensions-*`
spacing scale, from which the semantic spacing roles are built: see *Typography, spacing, radius,
dimensions* below for when to reach for it directly.

**Colour, by role.** Semantic colours are grouped by intent, so pick the role that matches meaning,
not appearance:

- **Text**: `general-text-*` (`primary`, `secondary`, `tertiary`, `brand`, `dark`, `disabled`,
  `white`).
- **Surface / background**: `general-surface-*` for panels and fills, `general-icon-background-*`
  for icon chips.
- **Border**: `general-border-*`, also for dividers (there is no separate separator colour role;
  prefer the `Separator` component).
- **Interaction states**: `general-state-*` (`hover`, `active`, `selected`, `selected-hover`) for
  hover and selection fills on your own interactive surfaces.
- **Icons**: `general-icon-*` (`primary`, `brand`, `danger`, `success`, `warning`, …).
- **Status**: `general-status-{info,success,warning,danger,neutral}-*` for feedback surfaces,
  borders and text.
- **Forms**: `form-*` roles (`form-input-*`, `form-field-*`, `form-label`, `form-choice-*`,
  `form-checkbox-*`, `form-toggle-*`, `form-slider-*`, `form-datepicker-*`, `form-rating-*`)
  already drive the built-in form controls; reuse them only when building form-adjacent UI.

**Typography, spacing, radius, dimensions.** These also come from tokens — sizing/spacing/radius
values such as `form-field-height`, `form-field-radius` and role-level spacing like
`form-field-inner-spacing` rather than hardcoded pixels. The underlying scale is
`--tedi-dimensions-00` … `--tedi-dimensions-26` (`0` → `24rem`); prefer a semantic role token where
one exists, and fall back to the dimensions scale for layout spacing that has no role. Use the
token; do not invent a value.

**Theming.** A theme is a CSS class on `<html>`, `tedi-theme--<theme>`, set by `ThemeProvider`
(which removes any other `tedi-theme--*` class, so exactly one is active). TEDI ships `default`
and `dark`; dark mode overrides colours only (see `themes.dark` in
`@tedi-design-system/core/tokens.json`). `theme` also accepts any other name, so an organisation
theme loaded after TEDI's CSS (for example from the Figma TEDI Variables Exporter) is
`theme="<brand>"` and `theme="<brand>-dark"`. Because you only ever reference semantic tokens,
correctly built UI follows the active theme automatically. For the how-to (provider setup,
custom themes, SCSS token usage) see `skills/tedi-react/references/theming.md`.
<!-- /prose:foundations -->

## Components

Authoritative catalog: `component.manifest.json` (tedi-ready, importable from
`@tedi-design-system/react/tedi`). For usage patterns see the `tedi-react` skill.

<!-- prose:components -->
The authoritative, machine-readable catalog of tedi-ready components (with categories and source
paths) is `component.manifest.json`; all of them import from
`@tedi-design-system/react/tedi`. Detailed props, variants and copy-paste examples live in
`skills/tedi-react/references/components.md`, with form controls covered in
`skills/tedi-react/references/forms.md`. High-level rules for generation:

- **Prefer composition.** Many components are compound (e.g. `Card.Header`, `Dropdown.Item`) or
  polymorphic via an `as` prop; assemble from the provided parts rather than rebuilding markup.
- **Prefer tedi-ready over community.** Only reach for `@tedi-design-system/react/community` when no
  tedi-ready equivalent exists.
- **Forms follow standard React.** Every form control supports both **controlled** (`value` +
  `onChange`) and **uncontrolled** (`defaultValue`) modes; use inline feedback via the `helper` prop
  (`{ text, type: 'hint' | 'valid' | 'error' }`) rather than custom error markup. See the forms
  reference for the full control list.
- **Responsive props, not media queries.** Most components read their direct props as the `xs`
  (smallest) values and take a partial props object for each larger breakpoint (`sm`, `md`, `lg`,
  `xl`, `xxl`; there is no `xs` prop), e.g. `<Button fullWidth lg={{ fullWidth: false }}>`.
- **You own the page shell.** There is no `Layout` component and `SideNav` does not position
  itself: it is `height: 100%`, so its row must be a stretching flex row and `main` must own
  scrolling (`overflow-y: auto`, `min-width: 0`). Breaking this gives a wrong-looking page with no
  error.
- **The same concept has different prop names.** Open/close is `onToggle` (`Modal`, `Collapse`),
  `onOpenChange` (`Dropdown`) or `onMenuToggle` (`SideNav`, `TopNav`); visual style is
  `visualType` (`Button`, `Link`), `variant` (`StatusBadge`, `Checkbox`) or `type` (`Alert`).
  Check the prop contract instead of guessing from a sibling. `Button`'s colour is a separate
  `color` prop: `visualType="danger"` does not exist.
- **Icon-only buttons still take `children`**: with `icon` set the label is visually hidden and is
  the accessible name, so never pass an empty label.
- **Toasts are imperative**: call `sendNotification()` and mount `ToastContainer` once; there is no
  `Toast` component.

The full version of these rules, with the page-shell template and a worked example, is the
overview the Claude Design System artifact ships (`build/conventions.md` on the `rc` branch
of [TEDI-Design-System/claude-design-system](https://github.com/TEDI-Design-System/claude-design-system/tree/rc/build)).
<!-- /prose:components -->

## Do's and Don'ts

<!-- prose:dosdonts -->
**Do**

- Import components from `@tedi-design-system/react/tedi`.
- Wrap the app in `ThemeProvider` → `PrintingProvider` → `LabelProvider`, and import the base
  styles with `import '@tedi-design-system/react/index.css'` (or `@use '@tedi-design-system/core/scss'`).
  `PrintingProvider` is required: `Collapse` and `SideNav` throw without it, and so does anything
  that renders a `Collapse`. `LabelProvider` is required too: without it built-in labels render as
  keys (`file-upload.add`). Add `AccessibilityProvider` when you use its loader hooks;
  `StyleProvider` currently renders nothing and is optional.
- Use semantic tokens (`general-*` / `form-*`) for every colour, spacing, radius and dimension.
- Prefer tedi-ready components; assemble from compound/polymorphic parts instead of custom markup.
- For layout glue between components, use `Row` / `Col` and `VerticalSpacing` first, then TEDI's
  shipped utilities (`flex`, `gap-0` … `gap-5`, `align-items-*`, `justify-content-*`, with
  breakpoint infixes such as `flex-lg-row`).
- Wire forms as controlled or uncontrolled per `skills/tedi-react/references/forms.md`, and show
  validation via the `helper` prop.
- Defer to the `tedi-react` skill for setup, theming and forms details.
- In scaffolds that also ship a utility CSS framework (Tailwind in Figma Make), reach for a TEDI
  component first and fall back to utilities only where TEDI has no equivalent; see
  *Using TEDI in Figma Make*.

**Don't**

- Don't import from `@tedi-design-system/react/community` when a tedi-ready component exists.
- Don't hardcode hex/rgb colours or pixel values, and don't reference raw `--tedi-*` primitive
  tokens; go through the semantic layer. The one exception is the `--tedi-dimensions-*` scale, from
  which the semantic spacing roles are built: use it directly only for spacing that has no semantic
  role.
- Don't add `var()` fallbacks: write `var(--token-name)`, not `var(--token-name, #fff)`.
- Don't hand-roll inputs, dropdowns, modals or date/time pickers that TEDI already provides.
- Don't skip the providers or the stylesheet import: components render unstyled, show label keys
  or throw.
- Don't write or target TEDI's component class names: they are hashed CSS Modules
  (`tedi-btn-f8b478d7`), not an API. Utilities that don't exist (`fixed`, `sticky`, `h-full`,
  `display-flex`) do nothing.
- Don't style bare elements in app CSS (`a:hover { ... }`): element selectors beat TEDI's hashed
  classes and recolour components such as `SideNav` and `Footer`. Scope them to your own container.
- Don't rebuild a TEDI component out of utility classes, and don't restyle one with utility colour,
  spacing or typography classes; both bypass the semantic token layer and drift from the system.
<!-- /prose:dosdonts -->

## Where to look things up

In priority order. **Story source wins** when this file, an agent's memory, and generated
summaries disagree:

1. **Story source** — `src/tedi/components/**/<name>.stories.tsx`. Real, compiling usage
   code; authoritative, and readable by both humans and agents.
2. **`*.d.ts`** — the prop contract.
3. **Live Storybook** — for a **human** to look at rendered output:
   - `rc` (current development line): https://storybook.tedi.ee/react/rc/
   - `main` (latest stable release): https://storybook.tedi.ee/react/main/
   - Deep links: `?path=/docs/tedi-ready-<group>-<component>--docs`, e.g.
     [SideNav](https://storybook.tedi.ee/react/rc/?path=/docs/tedi-ready-layout-sidenav--docs).
   - The bare `https://storybook.tedi.ee` is a framework picker, not the React build.

> **AI agents: do not fetch Storybook URLs as a reference.** Storybook is a
> client-rendered app — fetching a `?path=/docs/…` URL returns an empty shell with no
> props and no examples. Read the story source instead. The only machine-readable
> endpoint is `/react/rc/index.json` (story ids and titles), which helps you *find* a
> story, not read one.

Generated summaries are lossy in two specific ways worth knowing: prop descriptions are
truncated in some tooling, and types referenced by props are often not expanded. When a
description ends mid-sentence, assume there is more and go to the source.

## Using TEDI as a design system in Claude

Claude can host TEDI as a design system, so designs, prototypes and slide decks are built
from real TEDI components rather than approximations. Design systems live in Claude as
**Design System artifacts**: Claude Design moved into Claude, and the standalone
claude.ai/design site closes on 14 December 2026.

**Each organisation keeps its own copy.** Design System artifacts are shared inside an
organisation, and nothing documents a design system shared from another organisation showing
up in the design-system picker. If your organisation already has a TEDI Design System
artifact, pick it under **+ › Design system** in a Claude chat, or let Claude use it when it
is the organisation default; Claude Code reads it too. If not, publish one from
[TEDI-Design-System/claude-design-system](https://github.com/TEDI-Design-System/claude-design-system).

> **Do not run `/design-sync`.** It uploads only to standalone Claude Design projects and
> stops once a system has moved to Claude.
>
> **Do not import the design system from this repository's URL.** TEDI's class names are
> hashed CSS Modules, so an importer reading source produces token-level styling and
> approximated markup. Claude's own "from code" flow works when it is allowed to run the
> build (it then ships the compiled components), but its previews and docs are generic.

### Publishing it

[TEDI-Design-System/claude-design-system](https://github.com/TEDI-Design-System/claude-design-system)
holds the artifact's files, built from each release of this library: `main` has each
stable release (tagged `react-<version>`), `rc` only the latest release candidate. No build
is needed:

```bash
git clone --depth 1 --branch main https://github.com/TEDI-Design-System/claude-design-system.git
cd claude-design-system
claude
```

Then ask Claude Code to "publish this TEDI design system to Claude", or, for a later release,
to "update our TEDI design system: <artifact link>". It follows the repository's `AGENTS.md`;
you approve the publishes. Pick the release line your applications are on. Until the first
stable release after the move, only `rc` exists: clone with `--branch rc`.

The artifact is **read-only on its page** (`"editing": "code"`): every update replaces its
files, so changes belong in the source: the components and stories in this repository, the
overview and per-component docs in claude-design-system's `build/` (on `rc`). They reach the
artifact with the next release.

### Organisation themes

An organisation that themes TEDI in Figma can publish its artifact in that theme. Export the
theme with the **TEDI Variables Exporter** plugin (the ZIP of `_*-variables__<theme>*.css`
files your applications load after TEDI's CSS) and give it to Claude Code when it asks during
publishing. The distribution repository's `apply-theme.mjs` writes the theme's colours,
dimensions and type into the files before they are published: the light colours become the
artifact's defaults, the dark colours its dark mode, and `tokens.json` and the README record
the theme's name and a hash of the export. Its report lists theme variables TEDI doesn't know,
references to variables the theme doesn't define, and text colours below 4.5:1 contrast on the
primary surface, so check it before approving the publish.

- **One artifact carries one theme.** Its title is `TEDI Design System · <brand>`, so
  organisations with several brands publish one artifact per brand.
- **Keep the export.** Every update starts from clean files and applies the theme again.
- **Some component tints stay TEDI's.** A few translucent hover and selected tints are literal
  colours in the component CSS rather than tokens, so they don't follow a theme.
- In application code the same theme is `ThemeProvider theme="<theme>"` and
  `theme="<theme>-dark"`, not `default` and `dark`.

### What you get

**Every TEDI-Ready component** (plus the providers), each with its real TypeScript prop contract (including the
shapes of referenced types), a live preview rendering the actual compiled component in
light and dark, and per-component usage docs with the silent-failure gotchas. Tokens
(colours in both themes, type styles, spacing, radius, borders, containers, z-index) come
from `@tedi-design-system/core`. Designs Claude produces are made of real TEDI parts and
map to code your engineers can ship.

### How the files are made

The build lives in claude-design-system's [`build/`](https://github.com/TEDI-Design-System/claude-design-system/tree/rc/build) on its `rc` branch, not here. When this repository's
release workflow tags a release, it sends claude-design-system a `react-release` dispatch with
the tag; claude-design-system checks this repository out at that tag, builds it, writes the
artifact's files from `dist/`, the stories and core, renders every card and pushes the result
to `rc` or (after a reviewer has compared the cards with Storybook) `main`.
`build/NOTES.md` there covers the details. The build reads the story files, `.storybook/preview.tsx`, `public/` and
`dist/` as they are, so a change to their shape here can break the next release there.

## Using TEDI in Figma Make

Figma Make consumes TEDI through a **Make kit** (`@make-kits/tedi-kit`, published to TEHIK's private
Figma npm registry), which installs `@tedi-design-system/react` from npm. Prototypes are therefore
built from real TEDI components, not approximations. Note that Make installs packages fresh from
npm and does **not** read this repository — Code Connect mappings play no part here either, they
serve Dev Mode and the MCP server only.

> **This section is the source of truth, but Make does not read it.** Make reads the markdown
> guidelines bundled in the kit. The rules below only affect generated output once they are
> mirrored into those guidelines; changing this file alone changes nothing in Make.

### Styling precedence

TEDI does not dictate a consuming project's toolchain — teams integrate it alongside whatever
styling tools they already use, and that is fine. What matters is precedence, not which libraries
are installed. Where a generating agent has utility classes available it will reach for them instead
of a component, silently, and the result looks plausible — the drift only surfaces when someone
tries to implement the prototype. Order of preference:

1. **A tedi-ready component's own props**, from `@tedi-design-system/react/tedi`.
2. **A community component**, from `@tedi-design-system/react/community`, only when no tedi-ready
   equivalent exists.
3. **TEDI layout primitives** — `Row` / `Col`, `VerticalSpacing`, `ShowAt` / `HideAt`.
4. **Whatever the project already uses** for the remainder — plain CSS, CSS modules, a utility
   framework — driven by real TEDI tokens: semantic roles for colour
   (`var(--general-border-primary)`), the dimensions scale for spacing
   (`var(--tedi-dimensions-10)`). Another library's own palette and scale are not TEDI's and will
   not follow the active theme.

**Bare utility classes for spacing and flex layout are unsafe next to another utility
framework.** (Without one, TEDI's own utilities are the intended layout glue; see *Do's and
Don'ts*.) `index.css` ships 261 of TEDI's own Bootstrap-style utilities (`gap-*`, `flex-*`, `order-*`, `justify-content-*`, `align-items-*`), all
declared `!important`, and the names overlap common utility frameworks at different values — TEDI's
`gap-3`/`gap-4`/`gap-5` are `1rem`/`1.5rem`/`3rem` against Tailwind's `0.75rem`/`1rem`/`1.25rem`,
while `gap-0`–`gap-2` coincide. TEDI wins every collision regardless of import order, so the
mismatch only surfaces at larger spacing. Prefer `Row` / `Col` and `VerticalSpacing`; where you need
raw spacing, write token-backed values that cannot collide (`gap: var(--tedi-dimensions-10)`) rather
than a bare utility class.

Two rules hold whatever the stack: never rebuild something TEDI already provides, and never restyle
a TEDI component from outside it. Reach for the component's own props first, and treat the absence
of a prop as a signal that the design is off-system rather than a reason to override it.

### Keeping a kit healthy

- **Import `@tedi-design-system/react/index.css`** and wrap the app in the provider chain
  (`ThemeProvider` → `PrintingProvider` → `LabelProvider`). Without these, components render
  unstyled, show label keys or throw, which pushes an agent toward rebuilding them in Tailwind.
- **Keep the kit's version pin current.** A caret range cannot cross a major boundary, so a kit
  pinned to an older major silently loses every component added since — and Make will invent
  Tailwind substitutes for them rather than fail. Bump the pin as part of the release checklist.
