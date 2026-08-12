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

Full machine-readable data: `design-tokens/tokens.json`. Semantic tokens (default theme) — reach
for these, never raw `--tedi-*` primitives:

<!-- tokens:start -->
| Semantic token | Default value |
| --- | --- |
| `form-checkbox-radio-card-disabled-text` | `rgb(146 147 164)` |
| `form-checkbox-radio-card-primary-default-background` | `rgb(240 240 242)` |
| `form-checkbox-radio-card-primary-default-border-group` | `rgb(146 147 164)` |
| `form-checkbox-radio-card-primary-default-border-separate` | `rgb(240 240 242)` |
| `form-checkbox-radio-card-primary-default-text` | `rgb(75 78 98)` |
| `form-checkbox-radio-card-primary-disabled-default-background` | `rgb(240 240 242)` |
| `form-checkbox-radio-card-primary-disabled-default-text` | `rgb(146 147 164)` |
| `form-checkbox-radio-card-primary-disabled-selected-background` | `rgb(153 189 218)` |
| `form-checkbox-radio-card-primary-disabled-selected-text` | `rgb(255 255 255)` |
| `form-checkbox-radio-card-primary-hover-background` | `rgb(0 66 119)` |
| `form-checkbox-radio-card-primary-hover-border` | `rgb(0 66 119)` |
| `form-checkbox-radio-card-primary-hover-text` | `rgb(255 255 255)` |
| `form-checkbox-radio-card-primary-selected-background` | `rgb(0 90 163)` |
| `form-checkbox-radio-card-primary-selected-border-group` | `rgb(0 54 98)` |
| `form-checkbox-radio-card-primary-selected-border-separate` | `rgb(0 90 163)` |
| `form-checkbox-radio-card-primary-selected-text` | `rgb(255 255 255)` |
| `form-checkbox-radio-card-secondary-default-background` | `rgb(255 255 255)` |
| `form-checkbox-radio-card-secondary-default-border` | `rgb(146 147 164)` |
| `form-checkbox-radio-card-secondary-default-text` | `rgb(75 78 98)` |
| `form-checkbox-radio-card-secondary-disabled-default-background` | `rgb(255 255 255)` |
| `form-checkbox-radio-card-secondary-disabled-default-border` | `rgb(225 226 229)` |
| `form-checkbox-radio-card-secondary-disabled-default-text` | `rgb(146 147 164)` |
| `form-checkbox-radio-card-secondary-disabled-selected-background` | `rgb(255 255 255)` |
| `form-checkbox-radio-card-secondary-disabled-selected-border` | `rgb(153 189 218)` |
| `form-checkbox-radio-card-secondary-disabled-selected-text` | `rgb(153 189 218)` |
| `form-checkbox-radio-card-secondary-hover-background` | `rgb(231 240 246)` |
| `form-checkbox-radio-card-secondary-hover-border` | `rgb(0 90 163)` |
| `form-checkbox-radio-card-secondary-hover-text` | `rgb(0 90 163)` |
| `form-checkbox-radio-card-secondary-selected-background` | `rgb(255 255 255)` |
| `form-checkbox-radio-card-secondary-selected-border` | `rgb(0 90 163)` |
| `form-checkbox-radio-card-secondary-selected-text` | `rgb(0 90 163)` |
| `form-checkbox-radio-default-background-active` | `rgb(0 66 119)` |
| `form-checkbox-radio-default-background-default` | `rgb(255 255 255)` |
| `form-checkbox-radio-default-background-error` | `rgb(255 255 255)` |
| `form-checkbox-radio-default-background-focus` | `rgb(255 255 255)` |
| `form-checkbox-radio-default-background-hover` | `rgb(255 255 255)` |
| `form-checkbox-radio-default-background-inverted` | `rgb(0 90 163)` |
| `form-checkbox-radio-default-background-selected` | `rgb(0 90 163)` |
| `form-checkbox-radio-default-background-selected-disabled` | `rgb(153 189 218)` |
| `form-checkbox-radio-default-background-selected-inverted` | `rgb(255 255 255)` |
| `form-checkbox-radio-default-border-active` | `rgb(0 66 119)` |
| `form-checkbox-radio-default-border-default` | `rgb(131 132 148)` |
| `form-checkbox-radio-default-border-focus` | `rgb(131 132 148)` |
| `form-checkbox-radio-default-border-hover` | `rgb(0 90 163)` |
| `form-checkbox-radio-default-border-inverted` | `rgb(255 255 255)` |
| `form-checkbox-radio-default-border-selected` | `rgb(0 90 163)` |
| `form-checkbox-radio-default-border-selected-disabled` | `rgb(153 189 218)` |
| `form-checkbox-radio-default-border-selected-inverted` | `rgb(255 255 255)` |
| `form-checkbox-radio-default-check-indicator-active` | `rgb(255 255 255)` |
| `form-checkbox-radio-default-check-indicator-default` | `rgb(255 255 255)` |
| `form-datepicker-date-active` | `rgb(208 225 238)` |
| `form-datepicker-date-available` | `rgb(234 243 238)` |
| `form-datepicker-date-default` | `rgb(255 255 255)` |
| `form-datepicker-date-hover` | `rgb(231 240 246)` |
| `form-datepicker-date-selected` | `rgb(0 90 163)` |
| `form-datepicker-date-selected-hover` | `rgb(0 66 119)` |
| `form-datepicker-date-text-available` | `rgb(38 107 66)` |
| `form-datepicker-date-text-muted` | `rgb(146 147 164)` |
| `form-datepicker-date-text-selected` | `rgb(255 255 255)` |
| `form-datepicker-today-border` | `rgb(0 90 163)` |
| `form-datepicker-today-border-secondary` | `rgb(255 255 255)` |
| `form-general-background-action-background` | `rgb(249 249 249)` |
| `form-general-background-default` | `rgb(255 255 255)` |
| `form-general-background-disabled` | `rgb(240 240 242)` |
| `form-general-border-default` | `rgb(131 132 148)` |
| `form-general-border-disabled` | `rgb(225 226 229)` |
| `form-general-feedback-error-border` | `rgb(172 50 50)` |
| `form-general-feedback-error-text` | `rgb(172 50 50)` |
| `form-general-feedback-success-border` | `rgb(48 134 83)` |
| `form-general-feedback-success-text` | `rgb(38 107 66)` |
| `form-hidden-default` | `rgb(0 0 0 / 0.1%)` |
| `form-hidden-hover` | `rgb(240 240 242)` |
| `form-input-background-default` | `rgb(255 255 255)` |
| `form-input-background-disabled` | `rgb(240 240 242)` |
| `form-input-border-active` | `rgb(0 90 163)` |
| `form-input-border-default` | `rgb(131 132 148)` |
| `form-input-border-disabled` | `rgb(225 226 229)` |
| `form-input-border-focus` | `rgb(0 90 163)` |
| `form-input-border-hover` | `rgb(0 90 163)` |
| `form-input-text-disabled` | `rgb(75 78 98)` |
| `form-input-text-filled` | `rgb(21 25 38)` |
| `form-input-text-placeholder` | `rgb(115 116 130)` |
| `form-label` | `rgb(75 78 98)` |
| `form-slider-active-background-active` | `rgb(0 54 98)` |
| `form-slider-active-background-default` | `rgb(0 90 163)` |
| `form-slider-active-background-disabled` | `rgb(210 211 216)` |
| `form-slider-active-background-focus` | `rgb(0 90 163)` |
| `form-slider-active-background-hover` | `rgb(0 66 119)` |
| `form-slider-border-default` | `rgb(131 132 148)` |
| `form-slider-passive-background-default` | `rgb(249 249 249)` |
| `form-slider-range-label-text` | `rgb(93 96 113)` |
| `form-slider-thumb-background-active` | `rgb(208 225 238)` |
| `form-slider-thumb-background-default` | `rgb(255 255 255)` |
| `form-slider-thumb-background-disabled` | `rgb(255 255 255)` |
| `form-slider-thumb-background-focus` | `rgb(255 255 255)` |
| `form-slider-thumb-background-hover` | `rgb(208 225 238)` |
| `form-slider-thumb-border-active` | `rgb(0 54 98)` |
| `form-slider-thumb-border-default` | `rgb(0 90 163)` |
| `form-slider-thumb-border-disabled` | `rgb(210 211 216)` |
| `form-slider-thumb-border-focus` | `rgb(0 90 163)` |
| `form-slider-thumb-border-hover` | `rgb(0 66 119)` |
| `form-slider-track` | `rgb(255 255 255)` |
| `form-toggle-colored-active-active` | `rgb(29 80 50)` |
| `form-toggle-colored-active-default` | `rgb(48 134 83)` |
| `form-toggle-colored-active-hover` | `rgb(38 107 66)` |
| `form-toggle-colored-active-icon` | `rgb(38 107 66)` |
| `form-toggle-colored-active-icon-outlined` | `rgb(255 255 255)` |
| `form-toggle-colored-active-indicator` | `rgb(255 255 255)` |
| `form-toggle-colored-inactive-active` | `rgb(129 37 37)` |
| `form-toggle-colored-inactive-default` | `rgb(215 62 62)` |
| `form-toggle-colored-inactive-hover` | `rgb(172 50 50)` |
| `form-toggle-colored-inactive-icon` | `rgb(172 50 50)` |
| `form-toggle-colored-inactive-icon-outlined` | `rgb(255 255 255)` |
| `form-toggle-colored-inactive-indicator` | `rgb(255 255 255)` |
| `form-toggle-outlined-background` | `rgb(0 0 0 / 0.1%)` |
| `form-toggle-primary-active-active` | `rgb(0 54 98)` |
| `form-toggle-primary-active-default` | `rgb(0 90 163)` |
| `form-toggle-primary-active-hover` | `rgb(0 66 119)` |
| `form-toggle-primary-active-icon` | `rgb(0 90 163)` |
| `form-toggle-primary-active-icon-outlined` | `rgb(255 255 255)` |
| `form-toggle-primary-active-indicator` | `rgb(255 255 255)` |
| `form-toggle-primary-inactive-active` | `rgb(115 116 130)` |
| `form-toggle-primary-inactive-default` | `rgb(146 147 164)` |
| `form-toggle-primary-inactive-hover` | `rgb(131 132 148)` |
| `form-toggle-primary-inactive-icon` | `rgb(146 147 164)` |
| `form-toggle-primary-inactive-icon-outlined` | `rgb(255 255 255)` |
| `form-toggle-primary-inactive-indicator` | `rgb(255 255 255)` |
| `general-border-accent` | `rgb(231 116 0)` |
| `general-border-brand` | `rgb(0 90 163)` |
| `general-border-primary` | `rgb(225 226 229)` |
| `general-border-secondary` | `rgb(146 147 164)` |
| `general-border-transparent-white` | `rgb(255 255 255 / 30%)` |
| `general-border-white` | `rgb(255 255 255)` |
| `general-icon-accent` | `rgb(153 77 0)` |
| `general-icon-background-brand-primary` | `rgb(0 90 163)` |
| `general-icon-background-brand-secondary` | `rgb(208 225 238)` |
| `general-icon-background-primary` | `rgb(255 255 255)` |
| `general-icon-background-secondary` | `rgb(255 255 255 / 30%)` |
| `general-icon-brand` | `rgb(0 90 163)` |
| `general-icon-brand-dark` | `rgb(0 66 119)` |
| `general-icon-danger` | `rgb(172 50 50)` |
| `general-icon-primary` | `rgb(21 25 38)` |
| `general-icon-secondary` | `rgb(75 78 98)` |
| `general-icon-success` | `rgb(38 107 66)` |
| `general-icon-tertiary` | `rgb(146 147 164)` |
| `general-icon-warning` | `rgb(148 105 13)` |
| `general-icon-warning-dark` | `rgb(102 72 7)` |
| `general-icon-white` | `rgb(255 255 255)` |
| `general-separator-primary` | `rgb(225 226 229)` |
| `general-status-danger-background-primary` | `rgb(251 236 236)` |
| `general-status-danger-background-secondary` | `rgb(215 62 62)` |
| `general-status-danger-background-tertiary` | `rgb(172 50 50)` |
| `general-status-danger-border` | `rgb(223 101 101)` |
| `general-status-danger-text` | `rgb(172 50 50)` |
| `general-status-info-background-dark` | `rgb(0 90 163)` |
| `general-status-info-background-light` | `rgb(208 225 238)` |
| `general-status-info-border` | `rgb(51 123 181)` |
| `general-status-info-text` | `rgb(0 66 119)` |
| `general-status-neutral-background-dark` | `rgb(146 147 164)` |
| `general-status-neutral-background-light` | `rgb(240 240 242)` |
| `general-status-neutral-border` | `rgb(146 147 164)` |
| `general-status-neutral-text` | `rgb(21 25 38)` |
| `general-status-success-background-primary` | `rgb(234 243 238)` |
| `general-status-success-background-secondary` | `rgb(48 134 83)` |
| `general-status-success-background-tertiary` | `rgb(38 107 66)` |
| `general-status-success-border` | `rgb(89 158 117)` |
| `general-status-success-text` | `rgb(38 107 66)` |
| `general-status-warning-background-dark` | `rgb(186 131 13)` |
| `general-status-warning-background-light` | `rgb(255 240 207)` |
| `general-status-warning-background-primary` | `rgb(255 248 231)` |
| `general-status-warning-border` | `rgb(186 131 13)` |
| `general-status-warning-text` | `rgb(102 72 7)` |
| `general-surface-accent` | `rgb(255 230 204)` |
| `general-surface-active` | `rgb(0 66 119)` |
| `general-surface-brand-primary` | `rgb(0 90 163)` |
| `general-surface-brand-quaternary` | `rgb(231 240 246)` |
| `general-surface-brand-secondary` | `rgb(0 66 119)` |
| `general-surface-brand-tertiary` | `rgb(208 225 238)` |
| `general-surface-disabled` | `rgb(210 211 216)` |
| `general-surface-hover` | `rgb(231 240 246)` |
| `general-surface-inverted-primary` | `rgb(93 96 113)` |
| `general-surface-inverted-secondary` | `rgb(52 57 76)` |
| `general-surface-inverted-tertiary` | `rgb(38 43 59)` |
| `general-surface-overlay` | `rgb(23 23 23 / 40%)` |
| `general-surface-primary` | `rgb(255 255 255)` |
| `general-surface-secondary` | `rgb(249 249 249)` |
| `general-surface-selected` | `rgb(0 90 163)` |
| `general-surface-success` | `rgb(234 243 238)` |
| `general-surface-tertiary` | `rgb(240 240 242)` |
| `general-text-brand` | `rgb(0 90 163)` |
| `general-text-dark` | `rgb(21 25 38)` |
| `general-text-disabled` | `rgb(146 147 164)` |
| `general-text-primary` | `rgb(21 25 38)` |
| `general-text-secondary` | `rgb(75 78 98)` |
| `general-text-tertiary` | `rgb(93 96 113)` |
| `general-text-text-inverted-tehik` | `rgb(255 255 255)` |
| `general-text-white` | `rgb(255 255 255)` |
| `form-calendar-date-width` | `40px` |
| `form-checkbox-radio-card-checkbox-icon-padding-y` | `0.375rem` |
| `form-checkbox-radio-card-checkbox-indicator-padding-y` | `11px` |
| `form-checkbox-radio-card-checkbox-padding-x` | `0.5rem` |
| `form-checkbox-radio-card-checkbox-padding-y` | `0.5rem` |
| `form-checkbox-radio-card-gutter` | `0.5rem` |
| `form-checkbox-radio-card-inner-spacing` | `0.375rem` |
| `form-checkbox-radio-card-radio-icon-padding-y` | `0.375rem` |
| `form-checkbox-radio-card-radio-indicator-padding-y` | `0.625rem` |
| `form-checkbox-radio-card-radio-padding-x` | `0.5rem` |
| `form-checkbox-radio-card-radio-padding-y` | `0.5rem` |
| `form-checkbox-radio-card-radius` | `0.25rem` |
| `form-checkbox-radio-gutter-x` | `0.75rem` |
| `form-checkbox-radio-gutter-y` | `0.5rem` |
| `form-checkbox-radio-indicator-container-height` | `1.5rem` |
| `form-checkbox-radio-indicator-radius-checkbox` | `0.125rem` |
| `form-checkbox-radio-indicator-radius-radio` | `22.5rem` |
| `form-checkbox-radio-inner-spacing` | `0.5rem` |
| `form-checkbox-radio-label-gutter-y` | `0.25rem` |
| `form-checkbox-radio-size-fixed` | `1.125rem` |
| `form-checkbox-radio-size-large` | `1.5rem` |
| `form-checkbox-radio-size-responsive` | `1.5rem` |
| `form-checkbox-radio-subitem-padding-left` | `2rem` |
| `form-field-button-height` | `2rem` |
| `form-field-button-height-sm` | `1.5rem` |
| `form-field-height` | `2.75rem` |
| `form-field-height-lg` | `3.5rem` |
| `form-field-height-sm` | `2.75rem` |
| `form-field-inner-spacing` | `0.5rem` |
| `form-field-inner-spacing-sm` | `0.25rem` |
| `form-field-outer-spacing` | `0.25rem` |
| `form-field-padding-x-lg` | `1rem` |
| `form-field-padding-x-md-default` | `0.5rem` |
| `form-field-padding-x-sm` | `0.25rem` |
| `form-field-padding-y-lg` | `1rem` |
| `form-field-padding-y-md-default` | `0.625rem` |
| `form-field-padding-y-md-has-button` | `0.375rem` |
| `form-field-padding-y-sm` | `0.625rem` |
| `form-field-padding-y-sm-has-button` | `0.375rem` |
| `form-field-padding-y-xs` | `0.125rem` |
| `form-field-padding-y-xxs` | `0.375rem` |
| `form-field-radius` | `0.25rem` |
| `form-number-input-min-width` | `5rem` |
| `form-number-min-width` | `168px` |
| `form-select-area-max-height` | `300px` |
| `form-select-area-radius` | `0.25rem` |
| `form-slider-height` | `0.5rem` |
| `form-slider-inner-spacing` | `0.75rem` |
| `form-slider-radius` | `0.25rem` |
| `form-slider-thumb-size` | `1.5rem` |
| `form-textarea-min-height` | `2.75rem` |
| `form-toggle-default-height` | `28px` |
| `form-toggle-default-indicator` | `1.5rem` |
| `form-toggle-default-margin-y` | `0` |
| `form-toggle-default-width` | `56px` |
| `form-toggle-large-height` | `28px` |
| `form-toggle-large-indicator` | `24px` |
| `form-toggle-large-width` | `56px` |
| `form-toggle-padding` | `0.125rem` |
| `form-toggle-radius` | `1rem` |
| `general-selected-border-width` | `0.125rem` |
<!-- tokens:end -->

## Colors, Typography, Shapes, Layout

<!-- prose:foundations -->
**Token layers.** Tokens come in two layers. **Primitive** tokens (`--tedi-*`, e.g.
`--tedi-color-blue-700`) are the raw scale and are an internal implementation detail — never
reference them directly. Always consume the **semantic** tokens (the `general-*` and `form-*`
roles listed in the table above and defined in `design-tokens/tokens.json`), which map a role to a
primitive and are what re-theme cleanly. The single exception is the `--tedi-dimensions-*` spacing
scale, which the semantic spacing roles are themselves built from — see *Typography, spacing,
radius, dimensions* below for when to reach for it directly.

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
`design-tokens/tokens.json`. Because you only ever reference semantic tokens, correctly built UI
follows the active theme automatically. For the how-to (provider setup, custom themes, SCSS token
usage) see `skills/tedi-react/references/theming.md`.
<!-- /prose:foundations -->

## Components

Authoritative catalog: `design-tokens/component.manifest.json` (tedi-ready, importable from
`@tedi-design-system/react/tedi`). For usage patterns see the `tedi-react` skill.

<!-- prose:components -->
The authoritative, machine-readable catalog of tedi-ready components (with categories and source
paths) is `design-tokens/component.manifest.json`; all of them import from
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
