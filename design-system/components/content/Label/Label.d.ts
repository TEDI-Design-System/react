import * as React from 'react';

/**
 * Label — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/content/label/label.stories.tsx).
 */
export interface LabelProps {
  /** The element type to render. This can be any valid HTML element, allowing flexibility in how the label is used. Defaults to 'label'. */
  as?: "symbol" | "object" | "button" | "link" | "text" | "a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | "b" | "base" | "bdi" | "bdo" | (string & {}) /* +164 more */;
  /** If true, displays a required symbol (*) after the label text, indicating that the associated input is mandatory. */
  required?: boolean;
  /** Tooltip content to display when hovering over the info button. Accepts rich content (e.g. bold text, links), not just a plain string. If provided, an info button with a tooltip will be rendered. */
  tooltip?: React.ReactNode;
  /** If true, applies a bold font weight to the label text. */
  isBold?: boolean;
  /** If true, applies a small font size to the label text. */
  isSmall?: boolean;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<LabelBreakpointProps>;
  md?: Partial<LabelBreakpointProps>;
  lg?: Partial<LabelBreakpointProps>;
  xl?: Partial<LabelBreakpointProps>;
  xxl?: Partial<LabelBreakpointProps>;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

// Referenced types, resolved one level deep (see the story source for the rest).
type LabelBreakpointProps = {
    /**
     * If true, applies a bold font weight to the label text.
     * @default false
     */
    isBold?: boolean;
    /**
     * If true, applies a small font size to the label text.
     * @default false
     */
    isSmall?: boolean;
};

export declare const Label: React.ComponentType<LabelProps>;
