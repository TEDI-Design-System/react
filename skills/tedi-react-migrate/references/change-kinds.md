# Change kinds: how to find and apply them (React)

Release notes say _what_ changed. This file says how to find each kind of change in a React project and
how to apply it. Search with `rg` (or `grep -rn`) over the project's source, styles and tests; exclude
`node_modules`, `dist`, `build` and `.tedi-migrate`. The commands below search `src`: replace it with the
project's source roots (for example `apps packages` in a monorepo) and drop folders that don't exist.

Import paths: `@tedi-design-system/react/tedi` (TEDI-ready) and `@tedi-design-system/react/community`.
The installed package ships its types: read `node_modules/@tedi-design-system/react/src/**/*.d.ts` when a
note is unclear.

## Labels (translations)

TEDI copy is overridden with `<LabelProvider labels={{ ... }}>` and read with `useLabels().getLabel('key')`.
The full map with signatures is in
`node_modules/@tedi-design-system/react/src/tedi/providers/label-provider/labels-map.d.ts`.

- **Find:** `rg -n "LabelProvider|getLabel\(" src`, then the key itself, quoted and, for keys that are
  valid identifiers, unquoted: `rg -n "['\"]toast\.region['\"]" src`, `rg -n "\bcarousel\s*:" src`.
  Overrides may live in a separate labels file passed to `labels`.
- **Removed key:** when the notes give a replacement key, move the override (and any read of the key) to
  it, keeping the project's wording. If the project already overrides the replacement key too, don't
  create a duplicate: when the two values differ, ask which wording to keep (`assisted`), then drop the
  old entry. Delete the override only when no replacement applies. If the mapping is unclear, make it
  `manual`.
- **Reshaped key** (function ↔ string, arguments added or removed, object argument fields removed):
  rewrite the override to the new signature; keep the project's wording.
  The typecheck does not catch every reshape: an override that still declares a removed optional
  argument stays assignable. Find those by searching, not by compiling.
- **Meaning changed** (same key, new purpose, e.g. `carousel` became the role description): move the
  project's value to the new key the notes name, then set the old key only if the project wants to
  override the new meaning.
- **Tests:** a changed default string breaks tests that assert it. Take the old default from the unpacked
  `from` package (`.tedi-migrate/cache/packages/react@<from>/src/tedi/providers/label-provider/labels-map.es.js`; the `.d.ts` only has
  the types) and search tests for it.
  If the project overrides the key, the test sees the project's string, not the default: check which one
  the test setup uses before changing the assertion.
- **Verify:** every overridden key exists in the target package
  (`.tedi-migrate/cache/packages/react@<to>/src/tedi/providers/label-provider/labels-map.d.ts`, or `node_modules` after the install).

## Props

- **Find:** the component in JSX and its prop: `rg -n "<Search\b" src` then the prop in those files. Also
  props spread from objects (`{...searchProps}`) and wrapper components that forward props.
- **Renamed:** rename the prop. Keep the value.
- **Removed:** apply the replacement from the notes. No replacement → `manual`.
- **Meaning changed** (same name, different effect, e.g. ClosingButton `aria-label` now names the button):
  `assisted`. Show what the project relied on and propose the new combination.
- **Type changed:** let the typecheck find the call sites, then fix each one.

## Default value changed

- **Find:** every usage of the component that does **not** set the prop.
- `assisted`: ask once per change whether to keep the old behaviour (pass the old value explicitly) or take
  the new default. Apply the answer to all usages.

## Component replaced (community → TEDI-ready)

- **Find:** imports from `@tedi-design-system/react/community` and the component's JSX.
- Follow the guide's steps in order: import, composition (often `Component.Item` children instead of an
  `items` array), prop mapping, behaviour notes.
- Usually `assisted`: composition changes need a look at each usage. Heavy customisation of the old
  internals → `manual` for that usage.

## Providers and wrappers

Example: `ToastContainer` must render inside `LabelProvider`.

- **Find:** the app root where providers are composed (`rg -n "LabelProvider|ThemeProvider|ToastContainer" src`).
- Move or add the provider as the notes say. A missing provider usually throws at runtime, so check the
  tests too.
- **Hidden users.** A note may say only that a hook needs a provider, while TEDI components call that
  hook internally. Searching the project for the hook is not enough: list the components in the target
  package that import the provider, and cross-check them against the project's imports:
  `rg -l "printing-provider" .tedi-migrate/cache/packages/react@<to>/src -g "*.es.js"`. Any hit the
  project imports (directly or through community components) makes the item `auto`, not `n/a`.

## Markup, roles and accessible names

Example: Alert's `role` moved to an inner element; Calendar day buttons became `gridcell`.

- **Find:** tests and selectors that rely on the old markup:
  `rg -n "getByRole|getByLabelText|getByText|querySelector|\[role=|aria-label" src e2e cypress playwright`
  plus CSS that targets internal classes of TEDI components.
- Update test queries to the new role, name or element. Update CSS selectors that targeted moved elements.
- Text assertions on announcements change with the notes' new strings.

## CSS classes and CSS modules

TEDI styles are CSS modules with `tedi-` class names; projects sometimes target them globally.

- **Find:** `rg -n "tedi-old-class" src --glob "*.{scss,css,tsx,ts}"`.
- Rename where the notes give a new name. Selectors on TEDI internals are fragile: say so in the report.

## Removed or renamed exports, hooks and helpers

- **Find:** `rg -n "OldName" src`. The typecheck reports the rest.
- Rename the import and usages. No replacement → `manual`.

## Peer dependencies

- Compare `targetPeerDependencies` from `resolve-target.mjs` with the project's `react`, `react-dom` and
  other peers (`dayjs`).
- A required React major upgrade is **not** part of this skill: stop and tell the developer to upgrade
  React first, then continue.

## Core CSS variables (through the library)

Only when core comes in through `@tedi-design-system/react` (`coreRange` is null in `detect-version`).

- **Find:** the project's custom properties that set or read a removed or renamed core variable:
  `rg -n --glob "*.{scss,css,tsx,ts}" -e '--old-name([^A-Za-z0-9_-]|$)' src` for each name (inline
  `style` objects use the same names), and `rg -n '\$old-scss-var([^A-Za-z0-9_-]|$)' src` when the
  project `@use`s core SCSS. (`\b` would also match `--old-name-hover`.)
- Documented rename → `auto`. Value-matched rename candidate from `diff-core-vars.mjs` that the notes don't
  confirm → `assisted`. Removed with no replacement → `manual`.

## Choices that affect other items

Some `assisted` answers change what another item must do: choosing `role="none"` for an alert means a
test can no longer find it by `[role="alert"]`. Write `Depends on: <item>` on the dependent item and apply
it after the choice is made.

## Behaviour changes without code changes

Announcements, focus order, layout. Nothing to edit unless tests assert the old behaviour or the project
worked around the old behaviour (remove the workaround: `assisted`). Otherwise `n/a`, listed in the
report so the developer can check the UI.
