import * as React from 'react';

/**
 * Text — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/base/typography/text/text.stories.tsx).
 */
export interface TextProps {
  /** Children of the text */
  children: React.ReactNode;
  /** ID attribute */
  id?: string;
  /** Allows to focus the element */
  tabIndex?: number;
  /** Additional class */
  className?: string;
  /** Base element */
  element?: "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "label" | "li" | "p" | "span";
  /** Single or multiple modifiers to change the text behavior */
  modifiers?: "center" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "small" | "left" | "right" | "normal" | "extra-small" | "bold" | "thin" | "italic" | "nowrap" | (string & {}) /* +13 more */;
  /** Color of the text Use 'success', 'important' or 'warning' with caution, usually they should not be in application UI */
  color?: "primary" | "secondary" | "neutral" | "danger" | "success" | "disabled" | "info" | "warning" | "tertiary" | "brand" | "white";
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<TextBreakpointProps>;
  md?: Partial<TextBreakpointProps>;
  lg?: Partial<TextBreakpointProps>;
  xl?: Partial<TextBreakpointProps>;
  xxl?: Partial<TextBreakpointProps>;
}

// Referenced types, resolved one level deep (see the story source for the rest).
type TextBreakpointProps = {
    /**
     * Additional class
     */
    className?: string;
    /**
     * Base element
     * @default p
     */
    element?: TextElement;
    /**
     * Single or multiple modifiers to change the text behavior
     */
    modifiers?: TextModifiers[] | TextModifiers;
    /**
     * Color of the text
     * Use 'success', 'important' or 'warning' with caution, usually they should not be in application UI
     * @default primary
     */
    color?: TextColor;
};

export declare const Text: React.ComponentType<TextProps>;
