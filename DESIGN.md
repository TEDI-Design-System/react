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
| `form-checkbox-*` | 72 | `form-checkbox-radio-card-checkbox-icon-padding-y`, `form-checkbox-radio-card-checkbox-indicator-padding-y` |
| `form-datepicker-*` | 11 | `form-datepicker-date-active`, `form-datepicker-date-available` |
| `form-field-*` | 18 | `form-field-button-height`, `form-field-button-height-sm` |
| `form-general-*` | 9 | `form-general-background-action-background`, `form-general-background-default` |
| `form-hidden-*` | 2 | `form-hidden-default`, `form-hidden-hover` |
| `form-input-*` | 10 | `form-input-background-default`, `form-input-background-disabled` |
| `form-label-*` | 1 | `form-label` |
| `form-number-*` | 2 | `form-number-input-min-width`, `form-number-min-width` |
| `form-select-*` | 2 | `form-select-area-max-height`, `form-select-area-radius` |
| `form-slider-*` | 23 | `form-slider-active-background-active`, `form-slider-active-background-default` |
| `form-textarea-*` | 1 | `form-textarea-min-height` |
| `form-toggle-*` | 34 | `form-toggle-colored-active-active`, `form-toggle-colored-active-default` |
| `general-border-*` | 8 | `general-border-accent`, `general-border-brand` |
| `general-effect-*` | 10 | `general-effect-colors-elevation-dropdown-area-drop-shadow`, `general-effect-colors-elevation-general-primary` |
| `general-icon-*` | 15 | `general-icon-accent`, `general-icon-background-brand-primary` |
| `general-separator-*` | 1 | `general-separator-primary` |
| `general-status-*` | 23 | `general-status-danger-background-primary`, `general-status-danger-background-secondary` |
| `general-surface-*` | 17 | `general-surface-accent`, `general-surface-active` |
| `general-text-*` | 8 | `general-text-brand`, `general-text-dark` |
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
spacing scale, which the semantic spacing roles are themselves built from — see *Typography,
spacing, radius, dimensions* below for when to reach for it directly.

**Colour, by role.** Semantic colours are grouped by intent, so pick the role that matches meaning,
not appearance:

- **Text** — `general-text-*` (`primary`, `secondary`, `tertiary`, `brand`, `disabled`, `white`).
- **Surface / background** — `general-surface-*` for panels and fills, `general-icon-background-*`
  for icon chips.
- **Border & separators** — `general-border-*` and `general-separator-primary`.
- **Icons** — `general-icon-*` (`primary`, `brand`, `danger`, `success`, `warning`, …).
- **Status** — `general-status-{info,success,warning,danger,neutral}-*` for feedback surfaces,
  borders and text.
- **Forms** — `form-*` roles (`form-input-*`, `form-field-*`, `form-label`, `form-checkbox-radio-*`,
  `form-toggle-*`, `form-slider-*`, `form-datepicker-*`) already drive the built-in form controls;
  reuse them only when building form-adjacent UI.

**Typography, spacing, radius, dimensions.** These also come from tokens — sizing/spacing/radius
values such as `form-field-height`, `form-field-radius` and role-level spacing like
`form-field-inner-spacing` rather than hardcoded pixels. The underlying scale is
`--tedi-dimensions-00` … `--tedi-dimensions-25` (`0` → `24rem`); prefer a semantic role token where
one exists, and fall back to the dimensions scale for layout spacing that has no role. Use the
token; do not invent a value.

**Theming.** A theme is a CSS class on `<html>` (`tedi-theme--default`, `tedi-theme--dark`) set by
`ThemeProvider`. Dark mode is a semantic-token override subset — see `themes.dark` in
`@tedi-design-system/core/tokens.json`. Because you only ever reference semantic tokens, correctly built UI
follows the active theme automatically. For the how-to (provider setup, custom themes, SCSS token
usage) see `skills/tedi-react/references/theming.md`.
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
  polymorphic via an `as` prop — assemble from the provided parts rather than rebuilding markup.
- **Prefer tedi-ready over community.** Only reach for `@tedi-design-system/react/community` when no
  tedi-ready equivalent exists.
- **Forms follow standard React.** Every form control supports both **controlled** (`value` +
  `onChange`) and **uncontrolled** (`defaultValue`) modes; use inline feedback via the `helper` prop
  rather than custom error markup. See the forms reference for the full control list.
<!-- /prose:components -->

## Do's and Don'ts

<!-- prose:dosdonts -->
**Do**

- Import components from `@tedi-design-system/react/tedi`.
- Wrap the app in `ThemeProvider` → `LabelProvider` → `StyleProvider`, and import the base styles
  with `import '@tedi-design-system/react/index.css'` (or `@use '@tedi-design-system/core/scss'`).
- Use semantic tokens (`general-*` / `form-*`) for every colour, spacing, radius and dimension.
- Prefer tedi-ready components; assemble from compound/polymorphic parts instead of custom markup.
- Wire forms as controlled or uncontrolled per `skills/tedi-react/references/forms.md`, and show
  validation via the `helper` prop.
- Defer to the `tedi-react` skill for setup, theming and forms details.
- In scaffolds that also ship a utility CSS framework (Tailwind in Figma Make), reach for a TEDI
  component first and fall back to utilities only where TEDI has no equivalent — see
  *Using TEDI in Figma Make*.

**Don't**

- Don't import from `@tedi-design-system/react/community` when a tedi-ready component exists.
- Don't hardcode hex/rgb colours or pixel values, and don't reference raw `--tedi-*` primitive
  tokens — go through the semantic layer. The one exception is the `--tedi-dimensions-*` scale,
  which semantic spacing roles are themselves built from: use it directly only for spacing that has
  no semantic role.
- Don't add `var()` fallbacks — write `var(--token-name)`, not `var(--token-name, #fff)`.
- Don't hand-roll inputs, dropdowns, modals or date/time pickers that TEDI already provides.
- Don't skip the providers or the stylesheet import — components render unstyled or without theming.
- Don't rebuild a TEDI component out of utility classes, and don't restyle one with utility colour,
  spacing or typography classes — both bypass the semantic token layer and drift from the system.
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

## Using TEDI in Claude Design

[claude.ai/design](https://claude.ai/design) can host TEDI as a design system, so
prototypes are built from real TEDI components rather than approximations.

> **Creating the design system from this repository's URL does not work.** It produces
> token-level styling and approximated markup, not working TEDI components — TEDI's class
> names are hashed CSS Modules, so there is no class contract an importer can target from
> source. Committing the compiled bundle to the repo was tested (2026-08-11) and did not
> close the gap either. Use the flow below.

**You cannot be given access to the TEHIK-owned project.** Design-system projects are
org-scoped — sharing is `invited` or `org`, and neither crosses an organisation boundary.
Each organisation runs its own. That is also the better outcome: you own a project you can
refresh on your own schedule rather than waiting on someone else.

### The flow

```bash
git clone https://github.com/TEDI-Design-System/react.git
cd react
nvm use            # Node >= 24, npm >= 11
npm ci
```

Then, in Claude Code inside the repo:

```text
/design-sync
```

The skill runs the library build, builds the reference Storybook, converts, renders and
grades every component, and uploads — you do not run those steps yourself.

**There is nothing to configure.** The committed config pins the TEHIK-owned project; the
sync checks whether it can write there and, when it can't, creates a design system in your
own organisation instead. You will not be asked to edit a config file or supply an id.

### What you get

**82 TEDI-Ready components**, each with its real TypeScript prop contract (including the
shapes of referenced types), a live preview rendering the actual compiled component, and
per-component usage docs with the silent-failure gotchas. Designs the agent produces are
made of real TEDI parts and map to code your engineers can ship.

Everything repo-specific is already committed under `.design-sync/` — converter config,
provider chain, per-component overrides, adapter forks, the conventions header and
per-component docs — so you inherit the setup rather than rediscovering it. This is
verified, not assumed: rebuilding `dist/` and the reference Storybook from source and
re-running the converter reproduces a byte-identical result.

### Timing

The mechanical pipeline is about **two minutes** (library build ~1–1.5 min, Storybook
~1 min, converter ~35 s). The rest of a first run is the verification pass — every
component rendered and compared against Storybook — which is the part to budget for.
Later refreshes only touch what changed.

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

**Bare utility classes for spacing and flex layout are unsafe.** `index.css` ships 261 of TEDI's own
Bootstrap-style utilities (`gap-*`, `flex-*`, `order-*`, `justify-content-*`, `align-items-*`), all
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
  (`ThemeProvider` → `LabelProvider` → `StyleProvider`). Without these, components render unstyled
  or unthemed — which pushes an agent toward rebuilding them in Tailwind.
- **Keep the kit's version pin current.** A caret range cannot cross a major boundary, so a kit
  pinned to an older major silently loses every component added since — and Make will invent
  Tailwind substitutes for them rather than fail. Bump the pin as part of the release checklist.
