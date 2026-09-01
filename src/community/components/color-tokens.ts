import { TColorsBackground, TColorsBorder } from './commonTypes';

/**
 * Maps a legacy community colour name to its TEDI-Ready (core) CSS value.
 *
 * Used where a colour is chosen dynamically from a prop (e.g. `Card`'s
 * `border` / `background`, and `Tooltip`'s arrow) instead of a static class.
 * Strong fills use the core primitive scale (there is no semantic "strong
 * status fill" token — the `--general-status-*-background-*` tokens are pale
 * surfaces), matching the legacy appearance. Community is deprecated; do not
 * use this in new code.
 */
export const LEGACY_COLOR_TO_CORE: Record<TColorsBackground | TColorsBorder, string> = {
  'primary-main': 'var(--general-surface-brand-primary)',
  'primary-active': 'var(--general-surface-brand-secondary)',
  'primary-active-subtle': 'var(--tedi-primary-400)',
  'primary-highlight': 'var(--general-surface-brand-tertiary)',
  'primary-highlight-subtle': 'var(--general-surface-brand-quaternary)',
  'accent-main': 'var(--tedi-accent-600)',
  'accent-highlight': 'var(--tedi-accent-200)',
  'bg-default': 'var(--general-surface-primary)',
  'bg-muted': 'var(--general-surface-secondary)',
  'bg-subtle': 'var(--general-surface-tertiary)',
  'bg-disabled': 'var(--general-surface-disabled)',
  'bg-inverted': 'var(--general-surface-inverted-primary)',
  'bg-inverted-contrast': 'var(--general-surface-inverted-secondary)',
  black: 'var(--tedi-neutral-900)',
  white: 'var(--general-surface-primary)',
  'positive-main': 'var(--tedi-green-600)',
  'positive-active': 'var(--tedi-green-700)',
  'positive-highlight': 'var(--tedi-green-100)',
  'important-main': 'var(--tedi-red-600)',
  'important-active': 'var(--tedi-red-700)',
  'important-highlight': 'var(--tedi-red-100)',
  'info-main': 'var(--tedi-primary-600)',
  'info-active': 'var(--tedi-primary-700)',
  'info-highlight': 'var(--tedi-primary-100)',
  'warning-main': 'var(--tedi-yellow-700)',
  'warning-highlight': 'var(--tedi-yellow-200)',
  transparent: 'transparent',
  'border-default': 'var(--general-border-primary)',
  'border-contrast': 'var(--general-border-secondary)',
};

/** Returns the core CSS value for a legacy colour name. */
export const legacyColorToCore = (name: TColorsBackground | TColorsBorder): string => LEGACY_COLOR_TO_CORE[name];
