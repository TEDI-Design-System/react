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

Themes are applied as a CSS class on `<html>`: `tedi-theme--default`, `tedi-theme--dark`.

The ThemeProvider manages theme state and persistence (via cookie `tedi-theme`).

## Design Tokens

Tokens follow the naming pattern `--tedi-{category}-{name}`:

| Category | Examples |
|----------|---------|
| Color | `--tedi-color-primary`, `--tedi-color-bg-default`, `--tedi-color-text-secondary` |
| Spacing | `--tedi-spacing-1`, `--tedi-spacing-2`, `--tedi-spacing-4` |
| Typography | `--tedi-font-size-sm`, `--tedi-font-weight-bold`, `--tedi-line-height-default` |
| Border | `--tedi-border-radius-sm`, `--tedi-border-width-default` |
| Shadow | `--tedi-shadow-sm`, `--tedi-shadow-md` |

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
