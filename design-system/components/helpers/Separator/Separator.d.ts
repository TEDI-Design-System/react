import * as React from 'react';

/**
 * Separator — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/misc/separator/separator.stories.tsx).
 */
export interface SeparatorProps {
  /** Must be set to 'horizontal' or left undefined (defaults to horizontal) */
  axis?: "horizontal" | "vertical";
  /** Vertical height is not used in horizontal mode */
  height?: number;
  /** Display is forced to 'block' in horizontal mode */
  display?: "inline-block" | "inline" | "block";
  /** Additional class names */
  className?: string;
  /** HTML element to render — most common are 'hr', 'div', 'span' */
  element?: "div" | "hr" | "span";
  /** When true, the separator stretches to fill available space (100%) */
  isStretched?: boolean;
  /** Semantic color token */
  color?: "primary" | "secondary" | "accent";
  /** Visual style — line with dots vs standalone centered dot(s) */
  variant?: "dotted" | "dot-only";
  /** Line thickness in pixels (1 or 2) — affects outlined & solid lines */
  thickness?: 1 | 2;
  /** Spacing (margin) around the separator */
  spacing?: number | { top?: number; bottom?: number; left?: number; right?: number; };
  dotSize?: "small" | "large" | "medium" | "extra-small";
  dotStyle?: "filled" | "outlined";
  /** Position of the single dot */
  dotPosition?: number | "center" | "end" | "start";
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<SeparatorHorizontalProps & DottedSeparatorProps> | Partial<SeparatorHorizontalProps & DotOnlySeparatorProps> | Partial<SeparatorVerticalProps & DottedSeparatorProps> | Partial<SeparatorVerticalProps & DotOnlySeparatorProps>;
  md?: Partial<SeparatorHorizontalProps & DottedSeparatorProps> | Partial<SeparatorHorizontalProps & DotOnlySeparatorProps> | Partial<SeparatorVerticalProps & DottedSeparatorProps> | Partial<SeparatorVerticalProps & DotOnlySeparatorProps>;
  lg?: Partial<SeparatorHorizontalProps & DottedSeparatorProps> | Partial<SeparatorHorizontalProps & DotOnlySeparatorProps> | Partial<SeparatorVerticalProps & DottedSeparatorProps> | Partial<SeparatorVerticalProps & DotOnlySeparatorProps>;
  xl?: Partial<SeparatorHorizontalProps & DottedSeparatorProps> | Partial<SeparatorHorizontalProps & DotOnlySeparatorProps> | Partial<SeparatorVerticalProps & DottedSeparatorProps> | Partial<SeparatorVerticalProps & DotOnlySeparatorProps>;
  xxl?: Partial<SeparatorHorizontalProps & DottedSeparatorProps> | Partial<SeparatorHorizontalProps & DotOnlySeparatorProps> | Partial<SeparatorVerticalProps & DottedSeparatorProps> | Partial<SeparatorVerticalProps & DotOnlySeparatorProps>;
}

// Referenced types, resolved one level deep (see the story source for the rest).
type DotOnlySeparatorProps = {
    variant: 'dot-only';
    dotSize: DotSize;
    dotStyle?: DotStyle;
    dotPosition?: never;
};

type DottedSeparatorProps = {
    variant?: 'dotted';
    dotSize?: DotSize;
    dotStyle?: DotStyle;
    /**
     * Position of the single dot
     * @example
     * 'center' | 'start' | 'end' | 2.5  // 2.5rem from start
     */
    dotPosition?: DotPosition;
};

interface SeparatorHorizontalProps extends SeparatorSharedProps {
    /**
     * Must be set to 'horizontal' or left undefined (defaults to horizontal)
     */
    axis?: 'horizontal';
    /**
    Vertical height is not used in horizontal mode
    */
    height?: undefined;
    /**
     * Display is forced to 'block' in horizontal mode
     */
    display?: 'block';
}

interface SeparatorVerticalProps extends SeparatorSharedProps {
    /**
     * Must be set to 'vertical'
     */
    axis: 'vertical';
    /**
     * Height of the vertical separator in rem units
     */
    height?: number;
    /**
     * CSS display value — usually 'block' or 'inline-block'
     */
    display?: 'block' | 'inline' | 'inline-block';
}

export declare const Separator: React.ComponentType<SeparatorProps>;
