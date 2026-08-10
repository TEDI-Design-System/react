import * as React from 'react';

/**
 * TextGroup — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/content/text-group/text-group.stories.tsx).
 */
export interface TextGroupProps {
  /** Type of text group layout */
  type?: "horizontal" | "vertical";
  /** Alignment for the label text */
  labelAlign?: "left" | "right";
  /** Width for the label (e.g., '200px', '30%', etc.) */
  labelWidth?: string | number;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<{ type?: "horizontal"; labelAlign?: TextAlign; labelWidth?: string | number; }> | Partial<{ type: "vertical"; labelAlign?: "left"; labelWidth?: string | number; }>;
  md?: Partial<{ type?: "horizontal"; labelAlign?: TextAlign; labelWidth?: string | number; }> | Partial<{ type: "vertical"; labelAlign?: "left"; labelWidth?: string | number; }>;
  lg?: Partial<{ type?: "horizontal"; labelAlign?: TextAlign; labelWidth?: string | number; }> | Partial<{ type: "vertical"; labelAlign?: "left"; labelWidth?: string | number; }>;
  xl?: Partial<{ type?: "horizontal"; labelAlign?: TextAlign; labelWidth?: string | number; }> | Partial<{ type: "vertical"; labelAlign?: "left"; labelWidth?: string | number; }>;
  xxl?: Partial<{ type?: "horizontal"; labelAlign?: TextAlign; labelWidth?: string | number; }> | Partial<{ type: "vertical"; labelAlign?: "left"; labelWidth?: string | number; }>;
  /** Label for the text group */
  label: React.ReactNode;
  /** Value displayed alongside the label */
  value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.ReactNode[];
  /** Additional class name(s) to apply to the element */
  className?: string;
}

// Referenced types, resolved one level deep (see the story source for the rest).
type TextAlign = 'left' | 'right';

export declare const TextGroup: React.ComponentType<TextGroupProps> & {
  List: React.ComponentType<any>;
};
