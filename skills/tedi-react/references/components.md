# Discovering Components

**This is a discovery guide, not a component snapshot.** The list of components and their exact props change on every release, so this file deliberately does **not** enumerate them. Instead it tells you how to read the always-current roster and prop specs from the authoritative sources.

> For _where_ to fetch (version-pinned GitHub tags, live Storybook) and _how_ to pin to the consumer's installed version, see **SKILL.md → Authoritative Sources**. Don't guess prop names or defaults from memory — fetch them.

## Two namespaces

`@tedi-design-system/react` ships components under two entry points:

- **`/tedi`** — TEDI-Ready components. Production-grade, stricter rules. **Prefer these.**
- **`/community`** — Community/extended components. Relaxed linting, not a reference for TEDI patterns.

Several Community components are **deprecated** in favor of TEDI-Ready equivalents, and the set that has no TEDI-Ready alternative yet shifts over time. Don't rely on a memorized list — check the barrel export / component JSDoc / Storybook for the current deprecation status and whether a TEDI-Ready alternative exists before reaching into `/community`.

## Category map

TEDI-Ready components are organized by category under `src/tedi/components/`. Current top-level categories (verify against the repo tree — categories can be added):

`base` · `buttons` · `content` · `filter` · `form` · `layout` · `loaders` · `misc` · `navigation` · `notifications` · `overlays` · `tags`

This tells you _where_ to look; it does not enumerate what's inside.

## Enumerate the current components

The barrel exports are the authoritative, machine-readable component lists — one `export *` line per component, so they double as a source-path index:

- TEDI-Ready: `src/tedi/index.ts`
- Community: `src/community/index.ts`

Fetch the barrel **at the consumer's pinned tag** (see SKILL.md → Authoritative Sources) to get the exact roster for their version.

**Resolving a source path from a barrel line** — two shapes exist:

- Most: `export * from './components/<category>/<name>/<name>'` → the `.tsx` is `src/tedi/components/<category>/<name>/<name>.tsx` (folder + repeated filename).
- Some: a directory-index barrel with **no** repeated filename segment, e.g. `./components/content/table`, `./components/overlays/modal`, `./components/navigation/tabs`, `./components/layout/grid`, `./components/content/carousel`. Here the entry point is the folder's `index.ts`; the implementation lives in a differently-named file inside it.

## Read a component's real props

1. **Source JSDoc (canonical).** Open the component `.tsx` and read the JSDoc on its exported `interface <Name>Props`. Props are **frequently inherited** — interfaces commonly `extends BreakpointSupport<...>`, `FormLabelProps`, `ButtonProps<C>`, etc. — so the full prop surface spans base types, not just the one interface. Follow the `extends` chain.
2. **Storybook ArgTypes (rendered).** The live Storybook generates its props tables from that same JSDoc via `react-docgen-typescript`, with default values and enum members resolved. Good for a quick, readable view of one component.

## Capability patterns

Components commonly opt into shared capabilities — polymorphic `as`, per-breakpoint prop overrides, `forwardRef`, and compound sub-components (`Card.Header`, `Dropdown.Item`). See **SKILL.md → Component Patterns** for how each works; the component's JSDoc/types tell you which a given component supports.

## Data-table accessibility

When building data tables, the durable guidance (independent of exact prop names):

- Give interactive cells and controls accessible names — don't rely on visual position alone.
- Don't signal errors or state by color only; pair color with text/icon so it survives for screen-reader and low-vision users.
- Provide labels for sorting, pagination, row expansion, and reordering controls.

For the exact props, option names, and default label keys that wire this up, read the Table source/story (`content/table`) at the pinned tag — they change across versions.
