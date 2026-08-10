import * as React from 'react';

/**
 * Link — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/navigation/link/link.stories.tsx).
 * @replaces a
 */
export interface LinkProps<C extends React.ElementType = 'a'> {
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
  /** If true, the icon will be placed in a separate column */
  iconStandalone?: boolean;
  /** Render as custom component */
  as?: AllowedHTMLTags<C, AllowedTags>;
  ref?: PolymorphicRef<AllowedHTMLTags<C, AllowedTags>>;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: unknown;
  md?: unknown;
  lg?: unknown;
  xl?: unknown;
  xxl?: unknown;
}

// Referenced types, resolved one level deep (see the story source for the rest).
type AllowedHTMLTags<C extends React.ElementType, V> = C extends V ? C : never;

type AllowedTags = 'button';

interface IconWithoutBackgroundProps extends IconSharedProps {
    background?: undefined;
    /**
     * Type of display
     * @default block
     */
    display?: 'block' | 'inline';
}

type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

export declare const Link: React.ComponentType<LinkProps>;
