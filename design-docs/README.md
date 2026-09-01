# design-docs

Tooling for this repo's AI-facing design documentation. `npm run design:build` (→ `build.js`)
produces two things:

| Output | What it is |
| --- | --- |
| `component.manifest.json` (repo root) | one entry per component in the `src/tedi` barrel, next to `design-system-spec.json` |
| the token table in `DESIGN.md` | injected between the `<!-- tokens:start -->` / `<!-- tokens:end -->` markers |

## Tokens are core's, not ours

This repo does **not** generate, transform or commit token data. `@tedi-design-system/core`
generates `tokens.json` from Figma in its own `variable-exporter` and publishes it alongside the
stylesheet it describes, so the two can never disagree about a released version. `build.js` only
reads `@tedi-design-system/core/tokens.json`, and fails with an actionable message if the installed
core predates it.

Two consequences worth knowing:

- **There are exactly two tiers, `base` and `semantic` — Figma's own collections.** Never
  re-derive tiers from name prefixes: the semantic tier holds component-scoped roles
  (`button-*`, `card-*`, …) right alongside `general-*` / `form-*`, and splitting it by prefix
  invents a distinction the design system does not make.
- **The table is a curated subset**, not the whole tier: the `general-*` / `form-*` roles an
  application author writes in their own CSS. The component-scoped tokens are consumed by the
  components themselves, so listing all 1192 would bury the useful rows. The filter is
  `ROLE_PREFIXES` in `build.js`.

The legacy `design-tokens/` folder is unrelated to any of this and is being retired separately —
see [#769](https://github.com/TEDI-Design-System/react/issues/769). Nothing here reads it.

## The manifest: derived vs. prose

`id` / `category` / `sourcePath` / `status` are **derived** from the barrel and the stories, and are
overwritten on every build. `name`, `description` and `keyProps` are **prose**: `mergeManifest()`
preserves them across regeneration, so they are safe to write by hand (the `update-design-docs`
skill authors them). A newly exported component therefore appears with `name: null` until someone
fills it in.

`drift.spec.js` fails if the committed manifest's ids/categories no longer match a fresh
generation — i.e. if the barrel changed without re-running the build. There is no token drift test,
because no token data is committed here.

```bash
npm run design:build      # regenerate
npx jest design-docs      # prove the committed manifest is current
```
