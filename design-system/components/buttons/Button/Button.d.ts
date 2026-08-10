import * as React from 'react';

/**
 * Button — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/buttons/button/button.stories.tsx).
 * @replaces button
 */
export interface ButtonProps<C extends React.ElementType = 'button'> {
  /** Button children */
  children: React.ReactNode;
  /** Additional custom class name. */
  className?: string;
  /** Button visual type */
  visualType?: "primary" | "secondary" | "neutral" | "link";
  /** If button should take all the space it has */
  fullWidth?: boolean;
  /** Color scheme of the button. The 'text' value is only supported when visualType is 'link'. */
  color?: "default" | "danger" | "success" | "inverted" | "text";
  /** Button size */
  size?: "default" | "small" | "large";
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
  /** If button is in loading state and should show spinner. When isLoading is true, button does not trigger onClick event. */
  isLoading?: boolean;
  /** Skip applying button/link styles Useful when you just want to use Button or Link logic without the styles In this case icon, iconLeft and iconRight are ignored */
  noStyle?: boolean;
  /** Internal use only */
  renderWrapperElement?: unknown;
  /** Automatically show tooltip for icon-only buttons. */
  showTooltip?: boolean;
  /** Button type */
  type?: "button" | "submit" | "reset";
  /** Skips form's browser validation */
  formNoValidate?: boolean;
  /** Render as custom component */
  as?: AllowedHTMLTags<C, "button">;
  style?: React.PropsWithoutRef<React.ComponentProps<AllowedHTMLTags<C, "button">>>["style"];
  id?: React.PropsWithoutRef<React.ComponentProps<AllowedHTMLTags<C, "button">>>["id"];
  ref?: PolymorphicRef<AllowedHTMLTags<C, "button">>;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<ButtonContentProps<C, IInternalButtonProps, "button">>;
  md?: Partial<ButtonContentProps<C, IInternalButtonProps, "button">>;
  lg?: Partial<ButtonContentProps<C, IInternalButtonProps, "button">>;
  xl?: Partial<ButtonContentProps<C, IInternalButtonProps, "button">>;
  xxl?: Partial<ButtonContentProps<C, IInternalButtonProps, "button">>;
}

// Referenced types, resolved one level deep (see the story source for the rest).
type AllowedHTMLTags<C extends React.ElementType, V> = C extends V ? C : never;

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

type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

export declare const Button: React.ComponentType<ButtonProps>;
