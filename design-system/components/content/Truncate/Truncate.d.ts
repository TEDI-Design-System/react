import * as React from 'react';

/**
 * Truncate — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/content/truncate/truncate.stories.tsx).
 */
export interface TruncateProps {
  /** Text that will be truncated */
  children: string;
  /** Custom content to display at the end of truncated text */
  ellipsis?: React.ReactNode;
  /** Whether the truncated text should be expandable */
  expandable?: boolean;
  /** Override default button properties */
  button?: Partial<Omit<ButtonProps, "onClick"> & { onClick: (e: React.MouseEvent<HTMLButtonElement>, isTruncated: boolean) => void; }>;
  /** Additional class name */
  className?: string;
  /** Maximum number of characters to display */
  maxLength?: number;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<TruncateBreakpointProps>;
  md?: Partial<TruncateBreakpointProps>;
  lg?: Partial<TruncateBreakpointProps>;
  xl?: Partial<TruncateBreakpointProps>;
  xxl?: Partial<TruncateBreakpointProps>;
}

// Referenced types, resolved one level deep (see the story source for the rest).
type ButtonProps<C extends React.ElementType = 'button'> = BreakpointSupport<ButtonContentProps<C, IInternalButtonProps, AllowedTags>>;

type TruncateBreakpointProps = {
    /**
     * Additional class name
     */
    className?: string;
    /**
     * Maximum number of characters to display
     * @default 200
     */
    maxLength?: number;
};

export declare const Truncate: React.ComponentType<TruncateProps>;
