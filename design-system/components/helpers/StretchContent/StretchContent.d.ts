import * as React from 'react';

/**
 * StretchContent — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/misc/stretch-content/stretch-content.stories.tsx).
 */
export interface StretchContentProps {
  /** Element that will be stretched within the container. */
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  /** Accessibility role for the container. */
  role?: "button" | "link" | "article" | "dialog" | "figure" | "form" | "img" | "main" | "menu" | "menuitem" | "option" | "search" | "table" | "switch" | "alert" | "status" | (string & {}) /* +54 more */;
  /** An optional additional CSS class name to customize the styling of the container. This will be appended to the default BEM class generated for the component. */
  className?: string;
  /** Specifies the axis along which the child element should be stretched. - `both` (default): Stretches the child element both horizontally and vertically. - `horizontal`: Stretches the child element only horizontally (width). - `vertical`: Stretches the child element only vertically (height). */
  direction?: "horizontal" | "vertical" | "both";
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<StretchContentBreakpointProps>;
  md?: Partial<StretchContentBreakpointProps>;
  lg?: Partial<StretchContentBreakpointProps>;
  xl?: Partial<StretchContentBreakpointProps>;
  xxl?: Partial<StretchContentBreakpointProps>;
}

// Referenced types, resolved one level deep (see the story source for the rest).
interface StretchContentBreakpointProps {
    /**
     * An optional additional CSS class name to customize the styling of the container.
     * This will be appended to the default BEM class generated for the component.
     */
    className?: string;
    /**
     * Specifies the axis along which the child element should be stretched.
     * - `both` (default): Stretches the child element both horizontally and vertically.
     * - `horizontal`: Stretches the child element only horizontally (width).
     * - `vertical`: Stretches the child element only vertically (height).
     * @default 'both'
     */
    direction?: StretchContentDirection;
}

export declare const StretchContent: React.ComponentType<StretchContentProps>;
