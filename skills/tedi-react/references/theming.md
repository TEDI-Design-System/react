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

Wrap your app with `ThemeProvider`:

```tsx
import { ThemeProvider } from '@tedi-design-system/react/tedi';

<ThemeProvider defaultTheme="default">
  <App />
</ThemeProvider>
```

## Theme Switching

Themes are applied as a CSS class on `<html>` (e.g. `tedi-theme--default`, `tedi-theme--dark`). The ThemeProvider manages theme state and persists the selected theme across reloads — in both `localStorage` and a cookie, with `localStorage` taking precedence on read.

The available theme names and cookie name are implementation details — verify the current set against the `ThemeProvider` source / Storybook (see SKILL.md → Authoritative Sources).

## Design Tokens

Tokens follow the naming pattern `--tedi-{category}-{name}`:

| Category | Example (illustrative) |
|----------|------------------------|
| Color | `--tedi-color-primary` |
| Spacing | `--tedi-spacing-4` |
| Typography | `--tedi-font-size-sm` |
| Border | `--tedi-border-radius-sm` |
| Shadow | `--tedi-shadow-sm` |

The examples above illustrate the **pattern** — they are not the full set. The authoritative list of token names lives in `@tedi-design-system/core`; look them up there (or via a browser devtools inspection of the rendered CSS custom properties) rather than assuming a specific token exists.

Use tokens in your own SCSS:

```scss
.my-custom-section {
  padding: var(--tedi-spacing-4);
  background-color: var(--tedi-color-bg-default);
  border-radius: var(--tedi-border-radius-sm);
}
```

**Important:** Do NOT use fallback values in `var()`. Write `var(--tedi-spacing-4)`, not `var(--tedi-spacing-4, 16px)`.

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
  --tedi-color-primary: #1a73e8;
  --tedi-color-bg-default: #fafafa;
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
  padding: var(--tedi-spacing-2);

  @include bp.media-breakpoint-up(md) {
    padding: var(--tedi-spacing-4);
  }
}
```
