# Theming

TEDI uses design tokens from `@tedi-design-system/core` exposed as CSS custom properties. Components use CSS Modules with BEM naming and the `tedi-` prefix.

## Setup

Import TEDI styles:

```tsx
// In your entry file
import '@tedi-design-system/react/index.css';
```

Or in SCSS:
```scss
@use '@tedi-design-system/core/scss' as tedi;
```

Wrap your app with the three TEDI providers, in this order — `ThemeProvider` (theme tokens), `LabelProvider` (translatable component labels), `StyleProvider` (runtime style injection):

```tsx
import { ThemeProvider, LabelProvider, StyleProvider } from '@tedi-design-system/react/tedi';

<ThemeProvider defaultTheme="default">
  <LabelProvider>
    <StyleProvider>
      <App />
    </StyleProvider>
  </LabelProvider>
</ThemeProvider>
```

`StyleProvider` is documented on its own below; it must sit inside the other two. Do not skip `LabelProvider` — components with built-in labels (close buttons, pagination, etc.) rely on it.

## Theme Switching

Themes are applied as a CSS class on `<html>`: `tedi-theme--default`, `tedi-theme--dark`.

The ThemeProvider manages theme state and persistence (via cookie `tedi-theme`).

## Design Tokens

Tokens come in two layers: **semantic** `--general-*` tokens (role-based — text / surface / border / status), and **primitive** `--tedi-*` tokens (the raw scale). Prefer semantic tokens; reach for a primitive only when no semantic token fits.

| Category | Examples |
|----------|---------|
| Text | `--general-text-primary`, `--general-text-secondary`, `--general-text-disabled` |
| Surface | `--general-surface-primary`, `--general-surface-secondary`, `--general-surface-brand-primary` |
| Border | `--general-border-primary`, `--general-border-secondary`, `--general-border-brand` |
| Status | `--general-status-danger-text`, `--general-status-success-border`, `--general-status-warning-background-primary` |
| Primitives | `--tedi-primary-600`, `--tedi-neutral-900`, `--tedi-green-600` |
| Spacing | `--tedi-dimensions-02`, `--tedi-dimensions-04`, `--layout-grid-gutters-16` |
| Radius | `--tedi-radius-02-default`, `--tedi-radius-08` |
| Typography | `--family-default`, `--heading-h3-size`, `--heading-h3-weight` |

Use tokens in your own SCSS:

```scss
.my-custom-section {
  padding: var(--tedi-dimensions-04);
  background-color: var(--general-surface-primary);
  border-radius: var(--tedi-radius-02-default);
}
```

**Important:** Do NOT use fallback values in `var()`. Write `var(--general-surface-primary)`, not `var(--general-surface-primary, #fff)`.

## Migrating off legacy `--color-*` tokens (breaking change)

The old `--color-*` palette and the standalone `design-tokens` package have been **removed**.
Everything now uses `@tedi-design-system/core` tokens: semantic `--general-*` tokens where a
role fits (text / surface / border / status), and `--tedi-*` primitives for strong fills that
have no semantic equivalent.

**Not affected:** normal component usage. Props and classes are unchanged — e.g. `Card`'s
`background="bg-muted"` / `border="primary-main"`, `Tag`'s `color`, and
`getBackgroundColorClass('bg-muted')` all still work; they now resolve to core tokens
internally.

**Affected:** any code that referenced a legacy `--color-*` CSS variable directly, imported
`@tedi-design-system/react/design-tokens`, or deep-imported a removed community SCSS partial
(`styles/_variables`, `_fonts`, `_helpers`, `_mixins`).

Mapping for direct token references (pick the role that matches the usage):

| Legacy | Core |
|--------|------|
| `--color-text-default` / `-muted` / `-subtle` / `-disabled` | `--general-text-primary` / `-secondary` / `-tertiary` / `-disabled` |
| `--color-text-inverted` | `--general-text-white` |
| `--color-bg-default` / `-muted` / `-subtle` / `-disabled` | `--general-surface-primary` / `-secondary` / `-tertiary` / `-disabled` |
| `--color-bg-inverted` / `-inverted-contrast` | `--general-surface-inverted-primary` / `-secondary` |
| `--color-border-default` / `-contrast` | `--general-border-primary` / `-secondary` |
| `--color-primary-main` | text `--general-text-brand` · surface `--general-surface-brand-primary` · border `--general-border-brand` |
| `--color-primary-highlight` / `-highlight-subtle` | `--general-surface-brand-tertiary` / `-quaternary` |
| `--color-positive-main` / `-active` / `-highlight` | `--tedi-green-600` / `-700` / `-100` (text/border: `--general-status-success-text` / `-border`) |
| `--color-important-main` / `-active` / `-highlight` | `--tedi-red-600` / `-700` / `-100` (text/border: `--general-status-danger-text` / `-border`) |
| `--color-warning-main` / `-active` / `-highlight` | `--tedi-yellow-700` / `-800` / `-200` (text/border: `--general-status-warning-text` / `-border`) |
| `--color-accent-main` / `-highlight` / `-active` | `--tedi-accent-600` / `-200` / `-700` |
| `--color-black` | `--tedi-neutral-900` |
| `--color-white` | `--general-surface-primary` (bg) / `--general-text-white` (text) |
| `--color-transparent` | the `transparent` keyword |
| `--font-family` | `--family-default` |
| `--font-size-h{1..6}` / `--font-weight-h{1..6}` / `--font-line-height-h{1..6}` | `--heading-h{1..6}-size` / `-weight` / `-line-height` |

Removed imports → replacements: `@tedi-design-system/react/design-tokens` → core tokens;
community `styles/_fonts` / `_helpers` / `_mixins` → `@tedi-design-system/core/_fonts.scss` /
`_helpers.scss` / `mixins`.

Note: strong status fills use `--tedi-*` primitives, which (unlike semantic tokens) do not
re-theme automatically — this matches the previous fixed-hex behaviour. The full guide lives in
Storybook under **Documentation → Migration → Legacy color tokens**.

## Overriding Component Styles

TEDI components use CSS Modules with BEM naming. The class names are hashed at build time, but the BEM structure is consistent. To override styles, target the BEM classes:

```scss
// Override button primary color
.tedi-button--primary {
  background-color: var(--my-brand-primary);
}
```

## Custom Themes

Create a custom theme by defining token values under a theme class:

```scss
.tedi-theme--my-brand {
  --general-surface-brand-primary: #1a73e8;
  --general-surface-primary: #fafafa;
  // ... override tokens as needed
}
```

## StyleProvider

The `StyleProvider` wraps components that need runtime style injection:

```tsx
import { StyleProvider } from '@tedi-design-system/react/tedi';

<StyleProvider>
  <App />
</StyleProvider>
```

## Responsive Styles

For responsive breakpoints in SCSS:

```scss
@use '@tedi-design-system/core/bootstrap-utility/breakpoints' as bp;

.my-component {
  padding: var(--tedi-dimensions-02);

  @include bp.media-breakpoint-up(md) {
    padding: var(--tedi-dimensions-04);
  }
}
```
