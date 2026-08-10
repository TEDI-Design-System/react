import * as React from 'react';

/**
 * Row — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/layout/grid/row.stories.tsx).
 */
export interface RowProps {
  /** Row children. Row direct children should always be Col components */
  children?: unknown;
  /** Additional class. */
  className?: string;
  /** Base element. */
  element?: "div" | "dl" | "ol" | "span" | "ul";
  /** RowSpec object to change Row behavior on xs devices (<576px). Or number of columns that will fit next to each other. */
  xs?: 1 | 2 | 3 | 4 | 5 | 6 | RowSpec | "auto" | 7 | 8 | 9 | 10 | 11 | 12;
  /** RowSpec object to change Row behavior on sm devices (≥576px). Or number of columns that will fit next to each other. */
  sm?: 1 | 2 | 3 | 4 | 5 | 6 | RowSpec | "auto" | 7 | 8 | 9 | 10 | 11 | 12;
  /** RowSpec object to change Row behavior on md devices (≥768px). Or number of columns that will fit next to each other. */
  md?: 1 | 2 | 3 | 4 | 5 | 6 | RowSpec | "auto" | 7 | 8 | 9 | 10 | 11 | 12;
  /** RowSpec object to change Row behavior on lg devices (≥992px). Or number of columns that will fit next to each other. */
  lg?: 1 | 2 | 3 | 4 | 5 | 6 | RowSpec | "auto" | 7 | 8 | 9 | 10 | 11 | 12;
  /** RowSpec object to change Row behavior on xl devices (≥1200px). Or number of columns that will fit next to each other. */
  xl?: 1 | 2 | 3 | 4 | 5 | 6 | RowSpec | "auto" | 7 | 8 | 9 | 10 | 11 | 12;
  /** RowSpec object to change Row behavior on xxl devices (≥1400px). Or number of columns that will fit next to each other. */
  xxl?: 1 | 2 | 3 | 4 | 5 | 6 | RowSpec | "auto" | 7 | 8 | 9 | 10 | 11 | 12;
  /** The number of columns that will fit next to each other. Use `auto` to give columns their natural widths. */
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | "auto" | 7 | 8 | 9 | 10 | 11 | 12;
  /** Use justify-content utilities to change the alignment of items on the main axis. https://getbootstrap.com/docs/5.1/utilities/flex/#justify-content */
  justifyContent?: "center" | "around" | "end" | "start" | "between" | "evenly";
  /** Use align-items utilities to change the alignment of items on the cross axis. https://getbootstrap.com/docs/5.1/utilities/flex/#align-items */
  alignItems?: "center" | "end" | "start" | "baseline" | "stretch";
  /** Add gap between items. https://getbootstrap.com/docs/5.1/utilities/spacing/#gap */
  gap?: 0 | 1 | 2 | 3 | 4 | 5;
  /** Change gutter between items. https://getbootstrap.com/docs/5.0/layout/gutters/ */
  gutter?: 0 | 1 | 2 | 3 | 4 | 5;
  gutterX?: 0 | 1 | 2 | 3 | 4 | 5;
  gutterY?: 0 | 1 | 2 | 3 | 4 | 5;
  /** Set the direction of flex items in a flex container with direction utilities. https://getbootstrap.com/docs/5.1/utilities/flex/#direction */
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  /** Change how flex items wrap in a flex container. https://getbootstrap.com/docs/5.1/utilities/flex/#wrap */
  wrap?: "wrap" | "nowrap" | "wrap-reverse";
  id?: string;
  style?: React.CSSProperties;
}

export declare const Row: React.ComponentType<RowProps>;
