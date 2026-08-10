import * as React from 'react';

/**
 * Breadcrumbs — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/navigation/breadcrumbs/breadcrumbs.stories.tsx).
 */
export interface BreadcrumbsProps {
  /** Crumbs in order from the root page to the current page. Each child becomes one crumb; chevron separators are inserted between them. Use a `Link` (or any anchor) for navigable crumbs and a plain element (e.g. `<span>`) for the current page — add `aria-current="page"` to it yourself. */
  children: React.ReactNode;
  /** Accessible label for the wrapping `<nav>` landmark. Falls back to the `breadcrumbs` entry from `LabelProvider`. */
  ariaLabel?: string;
  /** Accessible label for the ellipsis button that opens the collapsed-crumbs dropdown. Only used when `maxItems` causes a collapse. Falls back to the `breadcrumbs.show-more` entry from `LabelProvider`. */
  showMoreLabel?: string;
  /** Node rendered between crumbs. Pass a string (e.g. `'/'`, `'›'`) for text separators or any React node for custom markup. Hidden from assistive technology — screen readers announce only the crumbs themselves. */
  separator?: React.ReactNode;
  /** Additional class name applied to the `<nav>` element. */
  className?: string;
  /** - `'long'` — full trail of crumbs separated by chevrons. - `'short'` — only the second-to-last child rendered as a back-link with a left-pointing arrow. Useful on narrow viewports. Renders nothing when fewer than two crumbs are supplied. */
  variant?: "long" | "short";
  /** Maximum number of crumbs to render before collapsing the middle into an ellipsis button. Clicking the button opens a dropdown listing the hidden crumbs. Only applies in the `'long'` variant. When omitted, all crumbs are rendered. */
  maxItems?: number;
  /** Number of crumbs to keep visible at the start of the trail when collapsed. */
  itemsBeforeCollapse?: number;
  /** Number of crumbs to keep visible at the end of the trail when collapsed. The current page (last crumb) should normally stay visible — keep this ≥ 1. */
  itemsAfterCollapse?: number;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<BreadcrumbsBreakpointProps>;
  md?: Partial<BreadcrumbsBreakpointProps>;
  lg?: Partial<BreadcrumbsBreakpointProps>;
  xl?: Partial<BreadcrumbsBreakpointProps>;
  xxl?: Partial<BreadcrumbsBreakpointProps>;
}

export declare const Breadcrumbs: React.ComponentType<BreadcrumbsProps>;
