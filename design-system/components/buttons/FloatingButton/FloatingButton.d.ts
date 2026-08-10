import * as React from 'react';

/**
 * FloatingButton — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/buttons/floating-button/floating-button.stories.tsx).
 */
export interface FloatingButtonProps {
  /** Button axis */
  axis?: "horizontal" | "vertical";
  /** Button visual type */
  visualType?: "primary" | "secondary";
  /** Button size */
  size?: "large" | "medium";
  /** Button position */
  position?: "sticky" | "fixed" | "unset" | "static" | "-moz-initial" | "inherit" | "initial" | "revert" | "revert-layer" | "-webkit-sticky" | "absolute" | "relative";
  /** Button placement */
  placement?: FloatingButtonPlacement;
  /** Button offset */
  offset?: FloatingButtonOffset;
  /** Button z-index */
  zIndex?: number;
  ref?: React.Ref;
  sm?: Partial<ButtonContentProps<"button", IInternalButtonProps, "button">>;
  md?: Partial<ButtonContentProps<"button", IInternalButtonProps, "button">>;
  lg?: Partial<ButtonContentProps<"button", IInternalButtonProps, "button">>;
  xl?: Partial<ButtonContentProps<"button", IInternalButtonProps, "button">>;
  xxl?: Partial<ButtonContentProps<"button", IInternalButtonProps, "button">>;
  /** Render as custom component */
  as?: "button";
  /** Button children */
  children: React.ReactNode;
  /** Additional custom class name. */
  className?: string;
  /** Name of the icon when button only has an icon in it. */
  icon?: string | IconWithoutBackgroundProps;
  /** Name of the icon we want to show on the left. */
  iconLeft?: string | IconWithoutBackgroundProps;
  /** Name of the icon we want to show on the right. */
  iconRight?: string | IconWithoutBackgroundProps;
  /** Underline the button text */
  underline?: boolean;
  /** If button is active and should keep its hover state. */
  isHovered?: boolean;
  /** If button is active and should keep it's active state. */
  isActive?: boolean;
  /** Automatically show tooltip for icon-only buttons. */
  showTooltip?: boolean;
  /** Button type */
  type?: "button" | "submit" | "reset";
  /** Skips form's browser validation */
  formNoValidate?: boolean;
  style?: CSSProperties;
  id?: string;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
}

// Referenced types, resolved one level deep (see the story source for the rest).
type FloatingButtonOffset = {
    top?: number | string;
    bottom?: number | string;
    left?: number | string;
    right?: number | string;
};

type FloatingButtonPlacement = {
    vertical: 'top' | 'bottom' | 'center';
    horizontal: 'left' | 'right' | 'center';
};

interface IInternalButtonProps {
    /**
     * Button type
     * @default button
     */
    type?: 'submit' | 'button' | 'reset';
    /**
     * Skips form's browser validation
     * @default true when type="submit"
     */
    formNoValidate?: boolean;
}

interface IconWithoutBackgroundProps extends IconSharedProps {
    background?: undefined;
    /**
     * Type of display
     * @default block
     */
    display?: 'block' | 'inline';
}

export declare const FloatingButton: React.ComponentType<FloatingButtonProps>;
