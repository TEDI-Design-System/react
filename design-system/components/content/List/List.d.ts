import * as React from 'react';

/**
 * List — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/content/list/list.stories.tsx).
 * @replaces ul
 */
export interface ListProps {
  /** List children should be ListItem components */
  children: boolean | React.ReactNode;
  /** The HTML element to use for rendering the list. Can either be 'ul' for an unordered list or 'ol' for an ordered list. */
  element?: "ol" | "ul";
  /** Adds a custom CSS class to the List element for additional styling or theming purposes */
  className?: string;
  /** This prop is used to set the color of the bullet points in the list. Uses same color values as TEDI Icon */
  color?: "primary" | "secondary" | "danger" | "success" | "warning" | "tertiary" | "brand" | "white" | "inherit" | "brand-dark" | "warning-dark";
  /** Props for controlling vertical spacing between list items. If provided, the List will be wrapped inside a VerticalSpacing component. */
  verticalSpacing?: Omit<VerticalSpacingProps, "children" | "element">;
  /** Determines whether the list should have default styling (with bullets or numbers). */
  style?: "none" | "styled";
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<ListBreakpointProps>;
  md?: Partial<ListBreakpointProps>;
  lg?: Partial<ListBreakpointProps>;
  xl?: Partial<ListBreakpointProps>;
  xxl?: Partial<ListBreakpointProps>;
}

// Referenced types, resolved one level deep (see the story source for the rest).
type ListBreakpointProps = {
    /**
     * Props for controlling vertical spacing between list items. If provided,
     * the List will be wrapped inside a VerticalSpacing component.
     */
    verticalSpacing?: Omit<VerticalSpacingProps, 'element' | 'children'>;
    /**
     * Determines whether the list should have default styling (with bullets or numbers).
     * @default 'none'
     */
    style?: 'styled' | 'none';
};

interface VerticalSpacingProps extends BreakpointSupport<VerticalSpacingBreakpointProps> {
    /**
     * Any content to be rendered within the spacing component
     */
    children: React.ReactNode | React.ReactNode[];
    /**
     * The HTML element to render, such as `div`, `section`, `article`, etc
     * @default div
     */
    element?: keyof JSX.IntrinsicElements;
    /**
     * Additional class name(s) to apply to the element
     */
    className?: string;
}

export declare const List: React.ComponentType<ListProps> & {
  Item: React.ComponentType<any>;
};
