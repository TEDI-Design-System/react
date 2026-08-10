import * as React from 'react';

/**
 * VerticalSpacing — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/layout/vertical-spacing/vertical-spacing.stories.tsx).
 */
export interface VerticalSpacingProps {
  /** Any content to be rendered within the spacing component */
  children: boolean | ReactNode[] | React.ReactNode;
  /** The HTML element to render, such as `div`, `section`, `article`, etc */
  element?: "symbol" | "object" | "button" | "link" | "text" | "a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | "b" | "base" | "bdi" | "bdo" | (string & {}) /* +162 more */;
  /** Additional class name(s) to apply to the element */
  className?: string;
  /** The size of the vertical spacing, applied as `margin-bottom` The value corresponds to `em` units */
  size?: 0 | 0.5 | 1 | 1.5 | 2 | 3 | 4 | 5 | 0.75 | 2.5 | 0.25 | 1.25 | 1.75;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<VerticalSpacingBreakpointProps>;
  md?: Partial<VerticalSpacingBreakpointProps>;
  lg?: Partial<VerticalSpacingBreakpointProps>;
  xl?: Partial<VerticalSpacingBreakpointProps>;
  xxl?: Partial<VerticalSpacingBreakpointProps>;
}

// Referenced types, resolved one level deep (see the story source for the rest).
type VerticalSpacingBreakpointProps = {
    /**
     * The size of the vertical spacing, applied as `margin-bottom`
     * The value corresponds to `em` units
     * @default 1
     */
    size?: VerticalSpacingSize;
};

export declare const VerticalSpacing: React.ComponentType<VerticalSpacingProps> & {
  Item: React.ComponentType<any>;
};
