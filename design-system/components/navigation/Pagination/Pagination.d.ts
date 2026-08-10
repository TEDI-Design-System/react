import * as React from 'react';

/**
 * Pagination — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/navigation/pagination/pagination.stories.tsx).
 */
export interface PaginationProps {
  /** Total number of pages. */
  pageCount: number;
  /** Controlled current page (1-based). Pair with `onPageChange`. */
  page?: number;
  /** Initial page for uncontrolled mode (1-based). */
  defaultPage?: number;
  /** Fires whenever the user navigates to a different page. */
  onPageChange?: (page: number) => void;
  /** Total number of items across all pages. Renders a "{count} results" label to the left of the nav when set. */
  totalItems?: number;
  /** Current page size. Shown in the page-size select when `pageSizeOptions` is provided. */
  pageSize?: number;
  /** Options for the page-size select. Omit to hide the select. Accepts plain numbers, or `{ value, label }` objects when the visible text should differ from the value — e.g. a "Show all" entry `{ value: totalItems, label: 'Show all' }`. Selecting an option emits its `value` via `onPageSizeChange`; the pager collapses once the consumer recomputes `pageCount` to 1. */
  pageSizeOptions?: (number | PaginationPageSizeOption)[];
  /** Fires when the user picks a different page size. */
  onPageSizeChange?: (pageSize: number) => void;
  /** Override any of the default text labels / aria labels. */
  labels?: Partial<PaginationLabels>;
  /** Hide the "X results" label even when `totalItems` is set. Pass a breakpoint name (e.g. `"md"`) to hide only below that breakpoint. */
  hideResults?: boolean | "sm" | "md" | "lg" | "xl" | "xxl";
  /** Hide the page-size dropdown even when `pageSizeOptions` is non-empty. Pass a breakpoint name to hide only below that breakpoint. */
  hidePageSize?: boolean | "sm" | "md" | "lg" | "xl" | "xxl";
  /** Hide the pager (prev/next + page list). Pass a breakpoint name to hide only below that breakpoint. */
  hidePager?: boolean | "sm" | "md" | "lg" | "xl" | "xxl";
  /** Additional class name on the root element. */
  className?: string;
  /** Number of pages always shown at the start and end of the range before ellipsis kicks in. */
  boundaryCount?: number;
  /** Number of sibling pages shown on either side of the current page. */
  siblingCount?: number;
  /** Background variant. `transparent` removes the surface fill — use it when pagination sits on a non-white container. Border behaviour is controlled separately via `borders`. */
  background?: "white" | "transparent";
  /** Where the separator border is drawn around the pagination strip: - `'top'` (default) — separator above only (typical "table then pager" layout). - `'both'` — separator above and below (split layout where the pager is sandwiched between content rows, e.g. a fixed header table + a footer beneath the pager). - `'none'` — borderless, for embedded contexts where the outer container already provides framing. Ignored when `background='transparent'` — that variant is always borderless. */
  borders?: "none" | "top" | "bottom" | "both";
  /** Keep the Previous / Next buttons visible even when they would be disabled (Previous on the first page, Next on the last). Default `false` drops the disabled edge button entirely — compact layout. Set `true` to keep both buttons rendered (disabled) at the edges so the pager width stays stable. */
  showPrevNextButtons?: boolean;
  /** Show the textual `previous` / `next` labels alongside the arrow icons on the edge nav buttons. The labels are sourced from `labels.previous` / `labels.next` (or the corresponding i18n keys). Default keeps the icon-only Figma variant. When set, the arrows render as small text links (label + icon, link colour, underline on hover) rather than circular icon buttons — `arrowVariant` is ignored in this mode. */
  showEdgeNavLabels?: boolean;
  /** Material icon name for the Previous arrow. Override to swap the default chevron (e.g. `'first_page'`, `'chevron_left'`). */
  previousIcon?: string;
  /** Material icon name for the Next arrow. */
  nextIcon?: string;
  /** Visual treatment of the prev/next arrow buttons: - `'default'` — brand-coloured icon on a transparent circle (light tint on hover); pair with `showEdgeNavLabels` for the small-link style. - `'primary'` — a primary small `Button` with the label text and a leading (previous) / trailing (next) arrow icon, for prominent navigation. The text label is always shown, so `showEdgeNavLabels` has no effect here. */
  arrowVariant?: "primary" | "default";
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<PaginationBreakpointProps>;
  md?: Partial<PaginationBreakpointProps>;
  lg?: Partial<PaginationBreakpointProps>;
  xl?: Partial<PaginationBreakpointProps>;
  xxl?: Partial<PaginationBreakpointProps>;
}

// Referenced types, resolved one level deep (see the story source for the rest).
interface PaginationPageSizeOption {
    value: number;
    label: string;
}

export declare const Pagination: React.ComponentType<PaginationProps>;
